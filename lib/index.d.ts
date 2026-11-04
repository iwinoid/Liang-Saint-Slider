/**
 * dsh-plugin-liang-calibrator — host half type surface.
 */
import z from "@deepseek-ai/schemastery";

/** Cordis plugin name; also the settings namespace the browser half reads. */
export declare const name: "liang-calibrator";
/** Services required before the asset route can be mounted. */
export declare const inject: ["webServer", "llm"];

/** The calibrator's configuration, as the settings form reads and writes it. */
export interface Config {
  /** Provider id to short label. Empty by default; an unmapped provider prints its catalog name. */
  backendAliases?: Record<string, string>;
  /** Milliseconds the menu stays open after a selection settles. Defaults to 3000. */
  dismissDelayMs?: number;
  /** Provider id to the model ids that leave the host model catalog. Empty by default. */
  hideModels?: Record<string, string[]>;
}

/** Volatile schema DSH reads to build the plugin's settings card. */
export declare const Config: z<Config>;

/** The child context the settings service is configured through. */
export interface CalibratorSettingsScope {
  effect(callback: () => unknown): unknown;
  settings: {
    configure(options: { auto: boolean }, fiber: unknown): unknown;
  };
}

/**
 * The slice of the Cordis plugin context this plugin uses. Declared structurally rather
 * than imported from Cordis: a third-party plugin should not depend on a package the
 * host owns.
 */
export interface CalibratorContext {
  /** The plugin's own fiber, handed to the settings service. */
  fiber: unknown;
  /** The LLM runtime whose prototype carries `listModels`, read to find the filter seam. */
  llm: unknown;
  /** Host logger; every degradation is reported through it. */
  logger?: { warn(message: string): void } | undefined;
  /** Run `callback` once its services exist, and dispose its effects with this fiber. */
  inject(services: string[], callback: (scope: CalibratorSettingsScope) => void): unknown;
  /** Bind a disposer to this fiber. A bare register throws on a fiber restart. */
  effect(callback: () => (() => void) | void, label?: string): unknown;
  webServer: {
    register(route: {
      kind: "prefix";
      path: string;
      handler: (req: unknown, res: unknown) => unknown;
    }): () => void;
  };
}

/**
 * Mount the asset route, take this plugin's settings page policy, and hide the
 * configured models from the catalog.
 * @param ctx - host plugin context carrying `webServer` and `llm`.
 * @param config - the resolved plugin config.
 */
export declare function apply(ctx: CalibratorContext, config?: Config): void;
