/**
 * Render smoke test — no browser, real React, server rendering.
 *
 * The calibrator's three surfaces must survive a render pass with the props
 * the DSH slot renderer hands them: the model seat over a shared directory
 * store, the effort slider over a combo list, and the configuration card the
 * Plugins page mounts. Effects do not run here, so this catches render-time
 * faults (missing props, bad element shapes, dead imports) rather than
 * animation behavior.
 *
 * Run: node scripts/test-render.mjs
 */
import { readFile } from 'node:fs/promises'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')

let factory
/** Style tags the bundle injects, captured so the shipped CSS can be asserted. */
const injectedCss = []
globalThis.window = {
  __ModuleLoader__: {
    load: ({ id, factory: loaded }) => { factory ??= { id, factory: loaded } },
  },
}
globalThis.document = {
  querySelectorAll: () => [],
  createElement: () => ({ dataset: {}, textContent: '' }),
  head: { appendChild: (tag) => { injectedCss.push(tag.textContent) } },
}
new Function(source)()

/** Minimal snapshot store matching the client-store contract the bundle uses. */
function createSnapshotStore(init) {
  let value = init
  const listeners = new Set()
  return {
    getSnapshot: () => value,
    subscribe: (fn) => { listeners.add(fn); return () => { listeners.delete(fn) } },
    set: (next) => { value = next; for (const fn of listeners) fn() },
    update: (mutator) => { mutator(value); for (const fn of listeners) fn() },
  }
}

const require = (specifier) => {
  switch (specifier) {
    case 'react':
      // Server rendering has no getServerSnapshot; the seat subscribes with the
      // two-argument form, so read the snapshot directly for this pass.
      return { ...React, useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot() }
    case 'react/jsx-runtime':
      // The runtime's third argument is the key; React.createElement takes it in
      // the config object instead.
      return {
        jsx: (type, props, key) => React.createElement(type, key === undefined ? props : { ...props, key }),
        jsxs: (type, props, key) => React.createElement(type, key === undefined ? props : { ...props, key }),
        Fragment: React.Fragment,
      }
    case '@deepseek-ai/dsh-client-ui-primitives':
      return new Proxy({}, { get: (_target, name) => (name === 'Toast' ? () => null : () => null) })
    case '@deepseek-ai/dsh-client-store':
      return { createSnapshotStore }
    default:
      throw new Error(`unexpected module request: ${specifier}`)
  }
}

const client = factory.factory(require)
const failures = []
const render = (label, element) => {
  try {
    const markup = renderToStaticMarkup(element)
    if (markup === '') failures.push(`${label}: rendered nothing`)
    return markup
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
    return ''
  }
}

const t = (key) => key

/** Six reachable combos: two models × off/high/max, positioned at 0/6/12/18/24/30. */
const combos = [
  { provider: 'deepseek-official', model: 'a', modelName: 'Flash', effort: 'off', effortName: 'Off', rank: 0, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'a', modelName: 'Flash', effort: 'high', effortName: 'High', rank: 1, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'a', modelName: 'Flash', effort: 'max', effortName: 'Max', rank: 2, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'b', modelName: 'Pro', effort: 'off', effortName: 'Off', rank: 0, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'b', modelName: 'Pro', effort: 'high', effortName: 'High', rank: 1, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'b', modelName: 'Pro', effort: 'max', effortName: 'Max', rank: 2, ranks: ['off', 'high', 'max'] },
]

// 1. The effort slider renders the codex-style surface: fill, nebula, sweep, stars, ticks, knob.
{
  const markup = render('effort slider', React.createElement(client.LiangEffortSlider, {
    combos, currentIndex: 5, busy: false, onChoose: () => {},
  }))
  for (const part of [
    'dsh-liang-slider', 'dsh-liang-fill', 'dsh-liang-energy', 'dsh-liang-sweep',
    'dsh-liang-stars', 'dsh-liang-star', 'dsh-liang-dot', 'dsh-liang-tick',
    'dsh-liang-knob', 'dsh-liang-input', 'dsh-liang-marker', '梁祖',
  ]) {
    if (!markup.includes(part)) failures.push(`effort slider: missing ${part}`)
  }
  // Full position: energy on, glow, the complete 22-particle field, and a deep-purple fill end.
  if (!markup.includes('--dsh-liang-energy:1')) failures.push('effort slider: energy not at full')
  if (!markup.includes('data-energy="true"')) failures.push('effort slider: energy layer not switched on')
  if ((markup.match(/class="dsh-liang-star"/g) ?? []).length !== 22) failures.push('effort slider: particle field not complete')
  if (!markup.includes('rgb(76,29,149)')) failures.push('effort slider: fill does not reach the deep end')
  // 位置 1 时彩条铺满管道
  if (!markup.includes('width:calc(28px + 1 * (100% - 28px))')) failures.push('effort slider: fill does not span the tube')
  if (markup.includes('0 1px 5px rgba(0,0,0,.34)')) failures.push('effort slider: knob still carries an outer shadow')
  // One tick per reachable combo, all reached at the last one.
  if ((markup.match(/class="dsh-liang-tick"/g) ?? []).length !== combos.length) failures.push('effort slider: wrong tick count')
  if (markup.includes('data-on="false"')) failures.push('effort slider: an unreached tick is left dark at the last combo')
}

// 2. The first combo stays clean blue: no nebula, no particles, no glow.
{
  const markup = render('effort slider at zero', React.createElement(client.LiangEffortSlider, {
    combos, currentIndex: 0, busy: false, onChoose: () => {},
  }))
  if (!markup.includes('--dsh-liang-energy:0')) failures.push('effort slider at zero: energy not zero')
  if (!markup.includes('data-energy="false"')) failures.push('effort slider at zero: energy layer not switched off')
  if ((markup.match(/class="dsh-liang-star"/g) ?? []).length !== 0) failures.push('effort slider at zero: particles rendered in the clean segment')
  if (!markup.includes('rgb(77,147,248)')) failures.push('effort slider at zero: fill is not the anchor blue')
  // 位置 0 时彩条宽度 = 2R = 28px，也就是一个正圆
  if (!markup.includes('width:calc(28px + 0 * (100% - 28px))')) failures.push('effort slider at zero: fill is not a circle')
  if ((markup.match(/data-on="true"/g) ?? []).length !== 1) failures.push('effort slider at zero: exactly one tick should read as reached')
}

// 3. The configuration card renders one editable row per configured alias.
{
  const snapshot = {
    status: 'ready', writable: true,
    rows: [{ provider: 'opencode-go', alias: 'OCG' }, { provider: 'opencode', alias: 'OC' }],
    providers: [{ id: 'opencode-go', name: 'OpenCode Go' }, { id: 'opencode', name: 'OpenCode Zen' }],
    dismissMs: 3000,
  }
  const markup = render('settings card', React.createElement(client.LiangSettingsCard, {
    view: 'page', t, save: async () => true,
    useLiangSettings: (selector) => selector(snapshot),
  }))
  for (const part of ['dsh-liang-cfg', 'opencode-go', 'OpenCode Go', 'OCG', 'liang-dismiss-delay', 'dsh-liang-cfg-title']) {
    if (!markup.includes(part)) failures.push(`settings card: missing ${part}`)
  }
  if ((markup.match(/class="dsh-liang-cfg-row"/g) ?? []).length !== 2) failures.push('settings card: wrong row count')
  if (markup.includes('settings.noAliases')) failures.push('settings card: empty-state hint shown with rows present')
  const summary = render('settings summary', React.createElement(client.LiangSettingsCard, {
    view: 'summary', t, save: async () => true, useLiangSettings: (selector) => selector(snapshot),
  }))
  if (summary !== 'settings.description') failures.push(`settings summary: unexpected text ${summary}`)
}

// 3b. An emptied map renders the empty-state hint instead of falling back to defaults.
{
  const empty = render('settings card empty', React.createElement(client.LiangSettingsCard, {
    view: 'page', t, save: async () => true, resetAliases: async () => true,
    useLiangSettings: (selector) => selector({ status: 'ready', writable: true, rows: [], providers: [], dismissMs: 3000 }),
  }))
  if (!empty.includes('settings.noAliases')) failures.push('settings card empty: no empty-state hint')
}

// 3c. A busy slider keeps its range focusable: aria-disabled, never a real disabled
//     attribute, because disabling a focused control drops focus and blurs the card shut.
{
  const markup = render('busy slider', React.createElement(client.LiangEffortSlider, {
    combos, currentIndex: 3, busy: true, onChoose: () => {},
  }))
  if (!markup.includes('aria-disabled="true"')) failures.push('busy slider: aria-disabled not set')
  if (/<input[^>]*\sdisabled/.test(markup)) failures.push('busy slider: the range is really disabled and would drop focus')
}

// 4. A read-only deployment still renders, with the editor disabled.
{
  const markup = render('settings card read-only', React.createElement(client.LiangSettingsCard, {
    view: 'page', t, save: async () => true,
    useLiangSettings: (selector) => selector({ status: 'ready', writable: false, rows: [{ provider: 'a', alias: 'A' }], providers: [], dismissMs: 3000 }),
  }))
  if (!markup.includes('disabled')) failures.push('settings card read-only: no disabled control')
}

// 5. The model seat renders over the shared directory store, aliases included.
{
  const directory = createSnapshotStore({
    current: { provider: 'opencode-go', model: 'muse-spark-1.3-contributor', reasoningEffort: 'xhigh' },
    routable: true,
    groups: [{
      id: 'opencode-go', name: 'OpenCode Go Muse',
      models: [{
        id: 'muse-spark-1.3-contributor', name: 'Muse Spark 1.3',
        reasoning: { defaultEffort: 'xhigh', efforts: [{ id: 'minimal', name: 'Minimal' }, { id: 'high', name: 'High' }, { id: 'xhigh', name: 'XHigh' }] },
      }],
    }],
    failures: [], status: 'ready', pending: null, error: null,
  })
  const aliases = createSnapshotStore({ status: 'ready', writable: true, rows: [{ provider: 'opencode-go', alias: 'GO' }] })
  const markup = render('model seat', React.createElement(client.LiangModelSelect, {
    locked: false, available: true, directory, aliases, t,
    load: () => {}, select: async () => true,
  }))
  if (!markup.includes('dsh-lm-trigger')) failures.push('model seat: trigger missing')
  if (!markup.includes('Muse Spark 1.3')) failures.push('model seat: model name missing')
}

// 7. Position and combo must invert each other for every catalog size the bar can
//    address. The component parks the knob on a combo canonical position after a
//    commit and re-derives the shown combo from it, so a position that does not map
//    back to its own combo makes the portrait disagree with the selection.
{
  const { comboIndexForPos, posForCombo } = client.__test
  const broken = []
  for (let count = 1; count <= 31; count += 1) {
    for (let index = 0; index < count; index += 1) {
      const position = posForCombo(index, count)
      const back = comboIndexForPos(position, count)
      if (back !== index) broken.push(`${count} combos: ${index} -> ${position} -> ${back}`)
    }
  }
  if (broken.length > 0) failures.push(`combo round-trip: ${broken.slice(0, 3).join(", ")}`)
  if (posForCombo(0, 6) !== 0 || posForCombo(5, 6) !== 30) failures.push("combo round-trip: the six anchors moved")
  if (comboIndexForPos(5, 6) !== 1) failures.push("combo round-trip: a release does not snap to the nearest stage")
}

// 8. The painted geometry comes from the JS constants, so the two cannot drift. The
//    stylesheet is built at runtime, so assert on what was actually injected.
{
  // A render triggers the injection; group 1 already rendered a slider.
  const sheet = injectedCss.join("")
  if (sheet === "") failures.push("geometry: no stylesheet was injected")
  const { TUBE_HEIGHT, KNOB_SIZE } = client.__test
  if (!sheet.includes(`--dsh-liang-tube:${TUBE_HEIGHT}px`)) failures.push("geometry: the tube height is not bound to its constant")
  if (!sheet.includes(`--dsh-liang-knob:${KNOB_SIZE}px`)) failures.push("geometry: the knob size is not bound to its constant")
  const sliderRule = sheet.match(/\.dsh-liang-slider\{[^}]*\}/)?.[0] ?? ""
  if (/height:\d+px/.test(sliderRule)) failures.push("geometry: the slider rule still hardcodes a tube height")
  const knobRule = sheet.match(/\.dsh-liang-knob\{[^}]*\}/)?.[0] ?? ""
  if (/width:\d+px/.test(knobRule)) failures.push("geometry: the knob rule still hardcodes a size")
  if (!sheet.includes("var(--dsh-liang-knob)")) failures.push("geometry: the knob does not read its variable")
  // Invariants the geometry depends on.
  if (!(KNOB_SIZE < TUBE_HEIGHT)) failures.push("geometry: the knob must be narrower than the tube")
}

if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: render smoke (8 groups)')
