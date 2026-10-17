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
const inject = ["webServer"];

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
 * Mount the asset route on the profile's web server, and keep the settings
 * page policy on this plugin: it ships its own configuration page, so the
 * settings service must not also generate one for the same fields.
 * @param ctx - host plugin context carrying the `webServer` service.
 */
function apply(ctx) {
  // Fail at load time, not as a silent stream of 404s, if the layout moved.
  if (!existsSync(layoutProbe)) {
    throw new Error(`liang-calibrator: asset layout is wrong, ${layoutProbe} does not exist`);
  }
  ctx.inject(["settings"], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber));
  });
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
