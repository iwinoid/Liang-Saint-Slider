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
globalThis.window = {
  __ModuleLoader__: {
    load: ({ id, factory: loaded }) => { factory ??= { id, factory: loaded } },
  },
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

// 1. The effort slider renders its glow, flare, knob, and native range for a real combo list.
const combos = [
  { provider: 'deepseek-official', model: 'a', modelName: 'Flash', effort: 'off', effortName: 'Off', rank: 0, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'a', modelName: 'Flash', effort: 'high', effortName: 'High', rank: 1, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'a', modelName: 'Flash', effort: 'max', effortName: 'Max', rank: 2, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'b', modelName: 'Pro', effort: 'off', effortName: 'Off', rank: 0, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'b', modelName: 'Pro', effort: 'high', effortName: 'High', rank: 1, ranks: ['off', 'high', 'max'] },
  { provider: 'deepseek-official', model: 'b', modelName: 'Pro', effort: 'max', effortName: 'Max', rank: 2, ranks: ['off', 'high', 'max'] },
]
{
  const markup = render('effort slider', React.createElement(client.LiangEffortSlider, {
    combos, currentIndex: 5, busy: false, onChoose: () => {},
  }))
  for (const part of ['dsh-liang-slider', 'dsh-liang-track', 'dsh-liang-glow', 'dsh-liang-flare', 'dsh-liang-knob', 'dsh-liang-input', 'dsh-liang-marker', '梁祖']) {
    if (!markup.includes(part)) failures.push(`effort slider: missing ${part}`)
  }
  if (!markup.includes('data-top="true"')) failures.push('effort slider: top of range not flagged')
  if (!markup.includes('--dsh-liang-p:1')) failures.push('effort slider: progress variable not set to the last combo')
}

// 2. The top-of-range flag follows the level, not the combo count.
{
  const markup = render('effort slider at zero', React.createElement(client.LiangEffortSlider, {
    combos, currentIndex: 0, busy: false, onChoose: () => {},
  }))
  if (markup.includes('data-top="true"')) failures.push('effort slider at zero: wrongly flagged top')
  if (!markup.includes('--dsh-liang-p:0')) failures.push('effort slider at zero: progress variable not zero')
}

// 3. The configuration card renders one editable row per configured alias.
{
  const snapshot = {
    status: 'ready', writable: true,
    rows: [{ provider: 'opencode-go', alias: 'OCG' }, { provider: 'opencode', alias: 'OC' }],
  }
  const markup = render('settings card', React.createElement(client.LiangSettingsCard, {
    view: 'page', t, save: async () => true,
    useLiangSettings: (selector) => selector(snapshot),
  }))
  for (const part of ['dsh-liang-cfg', 'opencode-go', 'OCG']) {
    if (!markup.includes(part)) failures.push(`settings card: missing ${part}`)
  }
  if ((markup.match(/class="dsh-liang-cfg-row"/g) ?? []).length !== 2) failures.push('settings card: wrong row count')
  const summary = render('settings summary', React.createElement(client.LiangSettingsCard, {
    view: 'summary', t, save: async () => true, useLiangSettings: (selector) => selector(snapshot),
  }))
  if (summary !== 'settings.description') failures.push(`settings summary: unexpected text ${summary}`)
}

// 4. A read-only deployment still renders, with the editor disabled.
{
  const markup = render('settings card read-only', React.createElement(client.LiangSettingsCard, {
    view: 'page', t, save: async () => true,
    useLiangSettings: (selector) => selector({ status: 'ready', writable: false, rows: [{ provider: 'a', alias: 'A' }] }),
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

if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: render smoke (5 groups)')
