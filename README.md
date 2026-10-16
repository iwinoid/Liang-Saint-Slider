# dsh-plugin-liang-calibrator

**滑动变祖器** — the [liang-intensity-calibrator](https://github.com/Lichtspektrum/liang-intensity-calibrator) as the DeepSeek Harness **model + thinking-effort selector**.

[![Preview](https://pbs.twimg.com/amplify_video_thumb/2087967285621542912/img/Vk2-2wdcV3s2ITIO.jpg)](https://x.com/BruzWJ/status/2087968145114120691)

Clicking the composer's model seat opens the 31-level calibrator directly. The six
stages map 1:1 onto the DeepSeek model catalog's combinations (2 models × 3
thinking levels = 6 = the six stages):

| Stage | Position | Model · Thinking level |
| --- | --- | --- |
| 小难梁 | 00 | DeepSeek-V4-Flash-Vision-Exp · Off |
| 牢梁 | 06 | DeepSeek-V4-Flash-Vision-Exp · High |
| 梁子 | 12 | DeepSeek-V4-Flash-Vision-Exp · Max |
| 梁圣 | 18 | DeepSeek-V4-Pro · Off |
| 梁神 | 24 | DeepSeek-V4-Pro · High |
| 梁祖 | 30 | DeepSeek-V4-Pro · Max |

第一档模型是实验性视觉模型 `deepseek-v4-flash-vision-exp`（比标准 flash 更强且支持多模态）；标准 flash 默认隐藏，改回 settings 的 models 列表即可恢复。

### Multiple backends (官方 API + OpenCode Go 订阅)

The slider is scoped to the **active backend** (provider), so the six stages keep
their meaning no matter how many providers the catalog holds. Each backend maps
its own 2 models × 3 stage efforts:

| Backend | Stage efforts (小难梁 → 梁祖) |
| --- | --- |
| 官方 `deepseek-official` | Off · High · Max |
| `opencode-go` (订阅) | Minimal · High · Max (订阅没有 Off，最低档顶替) |

后端切换行的按钮使用简称（悬浮 title 仍显示全名）：

| 后端 | 简称 |
| --- | --- |
| 官方 `deepseek-official` | DS |
| `opencode-go` | OCG |
| `opencode` | OC |

这三条简称只是**内置默认值**——它们是插件配置里的 `backendAliases` 字段，在
**侧边栏 → 插件 → 滑动变祖器** 那一页改（见下面的 Configure），改完即时生效，不用重启。

其他 provider 回退显示原名。实验模型改名、provider 删除都无需改插件——目录（settings.yaml）是唯一真源。

A quick **backend toggle row** beneath the slider switches between them while
**keeping the current stage** (e.g. 官方 Pro·Max 梁祖 ⇄ 订阅 Pro·Max 梁祖). The
trigger tooltip shows the active backend. With any other catalog the same rule
applies per provider (off/lowest, high, max/highest); a small **Model** row
beneath the slider still drills into the plain model list across all providers.

Configuring the subscription is a `settings.yaml` matter, not a plugin change —
the pi-ai adapter ships an `opencode-go` catalog route (`https://opencode.ai/zen/go/v1`):

```yaml
llm-pi-ai:
  providers:
    opencode-go:
      apiKeyEnv: OPENCODE_GO_API_KEY
      displayName: OpenCode Go   # optional, shown in the toggle row
      models:
        - id: deepseek-v4-flash-vision-exp
          name: DeepSeek V4 Flash Vision
          contextWindow: 1000000
          maxTokens: 384000
          input: ["text", "image"]
        - id: deepseek-v4-pro
          name: DeepSeek V4 Pro
          contextWindow: 1000000
          maxTokens: 384000
```

## Install

The package is a **bundle**: it ships `cordis.patch.yml`, so the profile
declares it once and the launcher inserts its row.

```sh
dsh plugin --profile web add dsh-plugin-liang-calibrator
```

The host half imports `@deepseek-ai/schemastery` for its `Config` schema, so a
`link:` checkout needs its own install first (a registry install pulls it
automatically):

```sh
cd /path/to/liang && pnpm install
```

then list the package in your profile's `package.json`
(`$DSH_HOME/profiles/web/package.json`) under `dsh.profile.bundles`:

```json
"dsh": { "profile": { "bundles": ["dsh-plugin-liang-calibrator"] } }
```

and restart `dsh web`.

> Do **not** also insert `- id: liang-calibrator` into `cordis.patch.yml` by
> hand: one entry id may be declared once, and a duplicate fails the load.

## Configure

Channel aliases (the short labels the backend toggle row prints) are edited on
the plugin's own page: **sidebar → Plugins → Liang Calibrator**. The map is a
volatile `Config` field, so the page writes through the stock settings form and
the value is persisted into the profile's Cordis patch; a provider missing from
the map falls back to its catalog display name. Changing it takes effect without
a restart.

The page only appears while the Host serves this plugin's namespace, i.e. when
the profile composes `@deepseek-ai/dsh-settings` and
`@deepseek-ai/dsh-client-ui-plugin-manager` (both ship with the default web
profile). Without them the calibrator still runs on its built-in aliases.

## How it works

- **Host half** (`lib/index.js`): serves the 31 portrait keyframes under
  `/liang-assets/frames/` through the profile's `webServer` service — no CDN,
  no patched static server. It also declares the volatile `backendAliases`
  `Config` field the browser half edits.
- **Browser half** (`lib/client.js`): a standard `dsh.client` bundle that
  registers the `conversation.input.model` slot at **priority −1**. Slot
  rendering is priority-based ("lowest renders"), so the calibrator shadows the
  stock selector without touching it — uninstalling the plugin restores the
  original UI.
- The portrait is drawn from per-level keyframes rather than a scrubbed video:
  the stock static server has no HTTP Range support, so media-element seeking
  silently fails; image keyframes work everywhere.
- The effort bar is a custom surface: a gradient track, a pixel-radiation canvas
  clipped left of the knob, a cross flare, and a glowing knob. Dragging follows
  the pointer continuously and commits the nearest stage on release; the
  visually hidden native range carries the combo positions so keyboard and
  assistive access step whole levels. The top stage adds track breathing, knob
  pulse, and flare pulse, and `prefers-reduced-motion` stops the animation loop.
- Requires `@deepseek-ai/dsh-client-ui-model-selection` (ships with the default
  web profile) for the shared model directory service. On DSH `0.1.2-rc.1`+
  the seat scope additionally injects `remote` / `remote.session`: the resolver
  runs `directoryFor` behind the caller-ctx tracker, and without them the seat
  entry crashes (`cannot get property "remote.session" without inject`),
  abdicates, and the stock selector silently renders instead.
- The Plugins-page entry, its title and description, and the 梁祖 icon come from
  the package manifest: `icon` points at a 128px WebP derived from `frame-30`,
  and `locale/{en,zh}.json` carry `meta.title` / `meta.description`.

## Uninstall

```sh
dsh plugin --profile web remove dsh-plugin-liang-calibrator
```

(and drop the package from `dsh.profile.bundles`).

## Development

Regenerate the browser bundle from an installed DSH checkout:

```sh
python3 scripts/assemble-client.py /path/to/node_modules/@deepseek-ai [region.js]
```

The ModelSelect region is hand-integrated with the slider; the script renames
and splices, then applies the multi-backend feature patches. Every patch must
match the assembled text exactly once — if the DSH bundle's ModelSelect region
has drifted, the script **aborts without writing** instead of silently dropping
the integration. In that case port the integration to the new bundle first.

Smoke tests (no browser needed for either):

```sh
node scripts/test-host.mjs
node scripts/test-settings.mjs   # channel-alias wiring: form -> store -> Plugins entry
node scripts/test-render.mjs     # server-renders the seat, the slider, and the settings card
```

`test-settings.mjs` and `test-render.mjs` need the package installed
(`pnpm install`), which is what pulls `@deepseek-ai/schemastery` and React.

## Portraits

`lib/assets/frames/frame-00.webp … frame-30.webp` derive from the
[liang-intensity-calibrator](https://github.com/Lichtspektrum/liang-intensity-calibrator)
project's `public/frames`; `lib/assets/liang-icon.webp` is a 128px WebP derived
from `frame-30.webp` (梁祖). Reuse or redistribution requires confirming you hold
the relevant portrait and asset rights (see that project's README).

## License

MIT. The calibrator concept and portrait assets belong to their original
authors — see above.
