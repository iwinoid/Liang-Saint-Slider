/**
 * dsh-plugin-liang-calibrator — host half.
 *
 * Serves the portrait keyframes (frame-00..frame-30.webp) under
 * `/liang-assets/` so the browser half never needs a CDN or a patched
 * static server, and declares the configuration the browser half edits in its
 * card under Settings → General. The UI itself lives in `./client`
 * (see package.json `dsh.client`).
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import z from "@deepseek-ai/schemastery";

/** Stable Cordis plugin name. */
const name = "liang-calibrator";
/** Services required before the asset route can be mounted. */
const inject = ["webServer", "llm"];

/**
 * The calibrator's own configuration.
 *
 * `backendAliases` holds the short labels the provider toggle row prints, keyed
 * by provider id. It starts empty: every alias is the user's own, and a
 * provider missing from the map prints its catalog display name.
 * `dismissDelayMs` is how long the menu stays open after a selection settles.
 * Both are volatile so the browser half reads and writes them through the
 * settings configuration form rather than the profile patch alone.
 */
const Config = z.object({
  backendAliases: z.dict(z.string()).default({}).volatile(),
  dismissDelayMs: z.number().min(0).max(60000).default(3000).volatile(),
  hideModels: z.dict(z.array(z.string())).default({}).volatile(),
});

/** Content types for the assets this package actually ships. */
const MIME = {
  ".webp": "image/webp",
};

/** The asset root this file owns: `<package>/lib/assets`. */
const assetsRoot = resolve(dirname(fileURLToPath(import.meta.url)), "assets");
/** The frame the browser half requests first; its presence proves the layout. */
const layoutProbe = join(assetsRoot, "frames", "frame-00.webp");


/**
 * The prototype patch key. It is the one dsh-model-filter used, so a profile
 * that still loads that plugin shares one wrapper instead of stacking two.
 */
const PATCH_STATE = Symbol.for("dsh-model-filter/patch-state");

/**
 * Normalize the configured hide map. Entries the schema cannot express (a bare
 * string, a non-string item, an empty list) are ignored with a warning rather
 * than aborting the catalog read.
 * @param raw - the `hideModels` config value.
 * @param warn - records an ignored entry.
 * @returns provider id to the model ids hidden on it.
 */
function normalizeHideModels(raw, warn) {
  const hide = new Map();
  if (raw === undefined || raw === null) return hide;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    warn("hideModels 必须是对象，已忽略");
    return hide;
  }
  for (const [provider, value] of Object.entries(raw)) {
    const id = String(provider).trim();
    if (id.length === 0) continue;
    if (!Array.isArray(value)) {
      warn(`hideModels["${id}"] 必须是字符串数组，已忽略`);
      continue;
    }
    const models = new Set(value.filter((item) => typeof item === "string" && item.trim().length > 0).map((item) => item.trim()));
    if (models.size === 0) {
      warn(`hideModels["${id}"] 是空列表，已忽略`);
      continue;
    }
    hide.set(id, models);
  }
  return hide;
}

/**
 * Find the object that carries `listModels`. `ctx.llm` is a traceable Proxy, so
 * the methods live on the real instance's prototype one level up.
 * @param service - the injected `ctx.llm`.
 * @returns the prototype owning `listModels`, if any.
 */
function findListModelsHolder(service) {
  if (service === null || (typeof service !== "object" && typeof service !== "function")) return undefined;
  let holder = Object.getPrototypeOf(service);
  while (holder !== null && holder !== Object.prototype) {
    const descriptor = Object.getOwnPropertyDescriptor(holder, "listModels");
    if (descriptor !== undefined && typeof descriptor.value === "function") return holder;
    holder = Object.getPrototypeOf(holder);
  }
  return undefined;
}

/**
 * Read the configured hide map on every call. The field is volatile, so a save
 * updates the reference in place and the loader emits no restart: a filter that
 * captured the map once would keep hiding the old models until the Host restarts.
 * @param config - the resolved plugin config handed to `apply`.
 * @returns a reader for the current map (or `undefined` when none is configured).
 */
function hideMapReader(config) {
  const source = config?.hideModels;
  if (source === null || typeof source !== "object") return undefined;
  if (typeof source.get === "function") return () => source.get();
  return () => source;
}

/**
 * One provider's rule. Absent or unmatched providers keep the array identity,
 * so an untouched directory is indistinguishable from an unhidden one.
 * @param read - current provider to model ids, read per call.
 * @param warn - records a malformed entry once.
 * @returns the filter the wrapper applies.
 */
function makeHideFilter(read, warn) {
  return (provider, models) => {
    const hide = normalizeHideModels(read(), warn);
    if (hide.size === 0 || !Array.isArray(models)) return models;
    const hidden = hide.get(provider);
    if (hidden === undefined) return models;
    const kept = models.filter((model) => !(model !== null && typeof model === "object" && typeof model.id === "string" && hidden.has(model.id)));
    return kept.length === models.length ? models : kept;
  };
}

/**
 * Patch `listModels` on its prototype. Every rule shares one wrapper, so HMR or
 * a repeated mount never stacks layers; the returned release only removes its
 * own rule and restores the original method when the last one goes.
 * @param holder - the prototype found by `findListModelsHolder`.
 * @param filter - the rule to register.
 * @param onError - called when the rule throws; the read falls back to the
 * untransformed result rather than failing.
 * @returns idempotent release function.
 */
function installModelFilter(holder, filter, onError) {
  let state = holder[PATCH_STATE];
  if (state === undefined) {
    const original = holder.listModels;
    if (typeof original !== "function") throw new TypeError("listModels 不是函数，拒绝打补丁");
    state = { original, filters: new Map(), wrapper: undefined };
    state.wrapper = async function (...args) {
      const models = await Reflect.apply(state.original, this, args);
      let result = models;
      for (const rule of state.filters.values()) {
        try {
          const next = rule.filter(args[0], result);
          if (next !== undefined) result = next;
        } catch (error) {
          rule.onError(error);
        }
      }
      return result;
    };
    Object.defineProperty(holder, PATCH_STATE, { value: state, enumerable: false, writable: true, configurable: true });
    holder.listModels = state.wrapper;
  }
  const token = Symbol("liang-calibrator");
  state.filters.set(token, { filter, onError });
  return () => {
    if (!state.filters.delete(token)) return;
    if (state.filters.size > 0) return;
    if (holder.listModels === state.wrapper) holder.listModels = state.original;
    if (holder[PATCH_STATE] === state) delete holder[PATCH_STATE];
  };
}

/**
 * Mount the hide filter when the config asks for one. A missing `listModels`
 * or a malformed map degrades to an unfiltered catalog, never a failed load.
 * @param ctx - host plugin context carrying `llm`.
 * @param config - the resolved plugin config.
 */
function installModelHiding(ctx, config) {
  const seen = new Set();
  const warn = (message) => {
    const logger = ctx.logger;
    if (logger === undefined || typeof logger.warn !== "function" || seen.has(message)) return;
    seen.add(message);
    logger.warn(`[liang-calibrator] ${message}`);
  };
  const read = hideMapReader(config);
  if (read === undefined) return;
  const holder = findListModelsHolder(ctx.llm);
  if (holder === undefined) {
    warn("ctx.llm 的原型链上找不到 listModels，模型隐藏跳过");
    return;
  }
  try {
    ctx.effect(() => installModelFilter(holder, makeHideFilter(read, warn), (error) => warn(`过滤出错，已退回原目录：${String(error)}`)), "liang-calibrator: model hiding");
  } catch (error) {
    warn(`模型隐藏挂载失败，目录保持原样：${String(error)}`);
  }
}

/**
 * Mount the asset route on the profile's web server, and keep the settings
 * page policy on this plugin: it ships its own configuration page, so the
 * settings service must not also generate one for the same fields.
 * @param ctx - host plugin context carrying the `webServer` service.
 */
function apply(ctx, config) {
  // Fail at load time, not as a silent stream of 404s, if the layout moved.
  if (!existsSync(layoutProbe)) {
    throw new Error(`liang-calibrator: asset layout is wrong, ${layoutProbe} does not exist`);
  }
  ctx.inject(["settings"], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber));
  });
  installModelHiding(ctx, config);
  // Effect-scoped: the web server rejects a second route on the same path, and a
  // fiber restart re-runs apply while the old route is still registered, so a bare
  // register would throw on every restart after the first.
  ctx.effect(() => ctx.webServer.register({
    kind: "prefix",
    path: "/liang-assets",
    handler: async (req, res) => {
      if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405);
        res.end();
        return;
      }
      /* v8 ignore next -- node:http always sets url on server requests. */
      const rawUrl = req.url ?? "/";
      let rawPath;
      try {
        rawPath = decodeURIComponent(new URL(rawUrl, "http://x").pathname);
      } catch {
        // A malformed percent-escape is the caller's error, not a crash: owning the
        // response here keeps the handler inside its own try/catch.
        res.writeHead(400);
        res.end();
        return;
      }
      const rel = rawPath.slice("/liang-assets".length).replace(/^\/+/, "");
      // join/resolve already normalize, so the containment check below is the whole
      // guard: every escape attempt lands outside the root and gets a 403.
      const target = resolve(join(assetsRoot, rel));
      if (target !== assetsRoot && !target.startsWith(assetsRoot + sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        const body = await readFile(target);
        res.writeHead(200, {
          "content-type": MIME[extname(target)] ?? "application/octet-stream",
          "cache-control": "public, max-age=31536000, immutable",
        });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end();
      }
    },
  }), "liang-calibrator: /liang-assets");

}

export { Config, apply, inject, name };
