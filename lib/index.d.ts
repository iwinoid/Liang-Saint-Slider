/**
 * dsh-plugin-liang-calibrator — host half type surface.
 */
import z from "@deepseek-ai/schemastery";

/** Cordis plugin name; also the settings namespace the browser half reads. */
export declare const name: "liang-calibrator";
/** Services required before the asset route can be mounted. */
export declare const inject: ["webServer"];

/** The calibrator's configuration, as the settings form reads and writes it. */
export interface Config {
  /** Provider id to short label. Empty by default; an unmapped provider prints its catalog name. */
  backendAliases?: Record<string, string>;
  /** Milliseconds the menu stays open after a selection settles. Defaults to 3000. */
  dismissDelayMs?: number;
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
 * Mount the asset route and take this plugin's settings page policy.
 * @param ctx - host plugin context carrying the `webServer` service.
 */
export declare function apply(ctx: CalibratorContext): void;
