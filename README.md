# dsh-plugin-liang-calibrator

滑动变祖器: the liang-intensity-calibrator as the DSH model and effort selector.

A 31-level slider opens from the model seat in the composer. Drag the bar to pick
a model and a reasoning effort in one gesture. The stage portrait changes as you
go.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Configure](#configure)
- [The slider](#the-slider)
- [Compatibility](#compatibility)
- [Development](#development)
- [Thanks](#thanks)
- [Contributing](#contributing)
- [License](#license)

## Background

[liang-intensity-calibrator](https://github.com/Lichtspektrum/liang-intensity-calibrator)
is a joke UI. One slider covers levels 0 to 30 and drives 31 portraits, from
小难梁 to 梁祖.

This package puts that slider on the model seat in the DSH composer. The same
slider also picks the model and the thinking effort.

The plugin uses six fixed stage names: 小难梁, 牢梁, 梁子, 梁圣, 梁神, 梁祖. The
DSH model catalog decides what each stage selects.

## Install

The package is a bundle. It ships `cordis.patch.yml`, so the profile declares
the package once and the launcher inserts the row.

```sh
dsh plugin --profile web add dsh-plugin-liang-calibrator
```

A registry install supplies the runtime dependency. A local `link:` checkout
does not, so install it first:

```sh
cd /path/to/liang && pnpm install
```

Then add the package to `dsh.profile.bundles` in
`$DSH_HOME/profiles/web/package.json`:

```json
"dsh": { "profile": { "bundles": ["dsh-plugin-liang-calibrator"] } }
```

Restart `dsh web`.

Do not also insert `- id: liang-calibrator` into `cordis.patch.yml` by hand.
Declare one entry id only once. A duplicate stops the load.

To remove the package, run
`dsh plugin --profile web remove dsh-plugin-liang-calibrator` and delete the
entry from `dsh.profile.bundles`.

## Usage

Click the model seat in the composer.

1. Drag the bar.
2. Release the bar.

The bar snaps to the nearest stage and applies it. The portrait and the readout
follow the pointer while you drag.

Press a provider button to switch backend. The stage stays the same. Click the
model row to open the plain list of all providers.

After a selection settles, the menu stays open for the configured delay. Drag
again to continue, or wait for it to close.

Keyboard: focus the bar and use the arrow keys, Home, or End. Each step moves one
stage.

## Configure

The plugin adds a card to **Settings → General**.

- `backendAliases` (渠道别名): one row for each provider. The left field picks a
  provider from the live model catalog. The right field sets the short label that
  the provider button prints.
- `dismissDelayMs` (选完后停留): delay in milliseconds after a selection settles.
  The default is 3000. The value 0 closes the menu at once.

The alias map starts empty. The package ships no default labels, so you add every
row yourself. Until you add a row, the provider buttons print the catalog names.
Click **新增一行**, pick a provider, then type the label. A provider that leaves
the catalog keeps its row.

Both fields are volatile `Config`. The card writes them into the Cordis patch of
the profile. The change applies without a restart.

The card appears only while the Host serves the settings namespace of the
plugin. That needs `@deepseek-ai/dsh-settings` and
`@deepseek-ai/dsh-client-ui-settings-general`. Without them the calibrator still
runs, and the provider buttons print the catalog names.

## The slider

The bar has three parts:

| Part | Size | Behavior |
| --- | --- | --- |
| Tube | 28px tall, radius 14 at each end | The background. The two end semi-circles set the travel range. |
| Colour bar | Same height as the tube | The left cap stays at the inner start of the tube. The right cap centre moves with the knob. |
| Knob | 24px, inner 1px stroke, no outer shadow | The centre moves between the two end semi-circle centres. |

The centre of the knob insets by the tube radius, not by its own radius. The
colour bar is a circle at position 0 and spans the whole tube at position 30. It
is wider than the knob, so it surrounds the knob at every position.

The palette comes from
[dsh-codex-effort-slider](https://www.npmjs.com/package/dsh-codex-effort-slider)
by Microqian2th. The fill goes from blue to violet to deep purple. A nebula layer
with a sweep and stardust particles appears with position. The readout takes the
same tint. With `prefers-reduced-motion`, the sweep does not show and the
particles move slowly.

The portrait uses 31 keyframe images instead of a video. The stock static server
answers no HTTP Range requests, so a video element cannot seek. Images work
everywhere.

## Compatibility

- The plugin runs on DSH `0.2.0-rc.2`.
- The shared model directory needs `@deepseek-ai/dsh-client-ui-model-selection`.
  The default web profile ships it.
- The seat scope injects `remote` and `remote.session`. The model directory
  resolver reads them behind the caller context tracker. Without them the seat
  entry stops and the stock selector shows instead.
- The selector shadows the stock seat at slot priority −1. Slot rules render the
  lowest priority, so the plugin needs no patch to the stock UI. Remove the
  plugin and the stock selector returns.
- The browser half reads the model catalog at `remote.session.modelCatalog`. It
  also listens for `llm/adapters-updated` to refresh the provider list.

## Development

Maintain `lib/client.js` by hand. There is no build step. Edit the file and
restart `dsh web`.

The earlier assembler, `scripts/assemble-client.py`, rebuilt `lib/client.js` from
a patched DSH checkout. It cannot reproduce the current file and it overwrites
it. Do not run it.

`scripts/test-client.cjs` and `scripts/test-host.mjs` are historical too. They
depend on a browser automation package and a fixed home directory path.

Install the package first. That supplies `@deepseek-ai/schemastery` and React:

```sh
pnpm install
```

Run the smoke tests:

```sh
node scripts/test-settings.mjs   # settings card wiring
node scripts/test-render.mjs     # renders the seat, the slider, and the settings card
node scripts/test-align.mjs      # slider palette against the reference bundle
```

`test-align.mjs` loads the bundle of `dsh-codex-effort-slider` and compares the
exported helpers. The package is not vendored. The test skips unless you point
it at a copy:

```sh
LIANG_REFERENCE=/path/to/dsh-codex-effort-slider/lib/client.js node scripts/test-align.mjs
```

`preview/slider.html` is a standalone page for the slider geometry. Open it in a
browser. It shows each part alone and lets you change the tube height, the knob
diameter, and the position.

## Thanks

- [liang-intensity-calibrator](https://github.com/Lichtspektrum/liang-intensity-calibrator)
  supplies the slider idea and the portraits.
- [dsh-codex-effort-slider](https://www.npmjs.com/package/dsh-codex-effort-slider)
  by Microqian2th supplies the palette and the particle design.

## Contributing

This is a personal fork. Open an issue for a question or a bug report.

Before you send a change, run the three smoke tests above. Keep the package
self-contained: the plugin must run with no build step.

## License

[MIT](LICENSE) © dsh-plugin-liang-calibrator contributors

The calibrator concept and the portrait assets belong to their original authors.
See [Thanks](#thanks). Confirm the asset rights before you redistribute the
frames in `lib/assets/frames/`.
