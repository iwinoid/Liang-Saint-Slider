/**
 * Channel-alias wiring smoke test — no browser, no React renderer.
 *
 * Loads the browser half the way the DSH module table does, drives `apply`
 * with a fake client context, and asserts the two things the configuration
 * feature promises: the alias store is seeded from the settings form (falling
 * back to the built-in aliases when the form answers nothing), and the
 * Plugins page gets exactly one entry for this plugin's namespace.
 *
 * Run: node scripts/test-settings.mjs
 */
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')

let factory
globalThis.window = {
  __ModuleLoader__: {
    load: ({ id, factory: loaded }) => { factory ??= { id, factory: loaded } },
  },
}
// The bundle is a plain script with no imports; evaluating it registers the factory.
new Function(source)()

if (factory === undefined) throw new Error('the bundle registered no module factory')
if (factory.id !== 'dsh-plugin-liang-calibrator') throw new Error(`unexpected module id ${factory.id}`)

/** Minimal snapshot store matching the client-store contract the bundle uses. */
function createSnapshotStore(init) {
  let value = init
  const listeners = new Set()
  return {
    getSnapshot: () => value,
    subscribe: (fn) => { listeners.add(fn); return () => { listeners.delete(fn) } },
    set: (next) => { value = next; for (const fn of listeners) fn() },
  }
}

const require = (specifier) => {
  switch (specifier) {
    case 'react':
      return { useRef: () => ({}), useState: () => [undefined, () => {}], useEffect: () => {}, useMemo: (fn) => fn(), useId: () => 'x', useSyncExternalStore: () => undefined }
    case 'react/jsx-runtime':
      return { jsx: () => null, jsxs: () => null, Fragment: () => null }
    case '@deepseek-ai/dsh-client-ui-primitives':
      return {
        IconChevronDownOutlineRegular: () => null, IconChevronRightOutlineRegular: () => null,
        IconCheckOutlineRegular: () => null, IconWarningOutlineRegular: () => null, Toast: () => null,
      }
    case '@deepseek-ai/dsh-client-store':
      return { createSnapshotStore }
    default:
      throw new Error(`unexpected module request: ${specifier}`)
  }
}

const client = factory.factory(require)

/** Collect the nested scopes `apply` opens, so the test can drive them by hand. */
const scopes = []
const ctx = {
  locale: { register: () => () => {}, bind: () => (key) => key },
  effect: (fn) => fn(),
  inject: (services, callback) => { scopes.push({ services, callback }) },
}
client.apply(ctx)

const scopeOf = (wanted) => {
  const found = scopes.find(({ services }) => wanted.every((name) => services.includes(name)))
  if (found === undefined) throw new Error(`apply opened no scope injecting ${wanted.join(', ')}`)
  return found.callback
}

/** Drive the settings scope against one form snapshot and return what it registered. */
function mountSettings(formValue) {
  const registrations = []
  const subscribers = []
  const form = {
    getSnapshot: () => ({ status: 'ready', writable: true, revision: 7, value: formValue }),
    subscribe: (fn) => { subscribers.push(fn); return () => {} },
    mutate: async () => true,
  }
  const scope = {
    configForms: {
      get: (ns) => { if (ns !== 'liang-calibrator') throw new Error(`unexpected namespace ${ns}`); return form },
      whileServed: (namespaces, register) => register(new Set(namespaces)),
    },
    slots: {
      inject: (_name, register) => register(),
      register: (options, component) => { registrations.push({ options, component }); return () => {} },
    },
    effect: (fn) => fn(),
  }
  scopeOf(['configForms', 'slots'])(scope)
  return { registrations, subscribers, form }
}

const failures = []
const check = (label, condition) => { if (!condition) failures.push(label) }

// 1. A configured map reaches the alias store the page and the toggle row share.
{
  const { registrations } = mountSettings({ backendAliases: { 'opencode-go': 'GO', opencode: 'ZEN' } })
  check('exactly one Plugins-page entry', registrations.length === 1)
  const [entry] = registrations
  check('entry lands in plugins.item', entry.options.name === 'plugins.item')
  check('entry id is the settings namespace', entry.options.id === 'liang-calibrator')
  check('entry carries a label', entry.options.label() === 'settings.title')
  const face = entry.options.inject()
  check('entry injects the settings hooks compartment', face.hooks?.liangSettings !== undefined)
  check('configured aliases seeded', JSON.stringify(face.hooks.liangSettings.getSnapshot().rows)
    === JSON.stringify([{ provider: 'opencode-go', alias: 'GO' }, { provider: 'opencode', alias: 'ZEN' }]))
}

// 2. An unanswered form falls back to the built-in aliases, never to an empty row list.
{
  const { registrations } = mountSettings(undefined)
  const rows = registrations[0].options.inject().hooks.liangSettings.getSnapshot().rows
  check('fallback keeps the built-in aliases', rows.some((row) => row.provider === 'deepseek-official' && row.alias === 'DS'))
  check('fallback keeps the opencode-go alias', rows.some((row) => row.provider === 'opencode-go' && row.alias === 'OCG'))
}

// 3. A malformed section is dropped rather than rendered as a broken row.
{
  const { registrations } = mountSettings({ backendAliases: { good: 'G', bad: 5, worse: null } })
  const rows = registrations[0].options.inject().hooks.liangSettings.getSnapshot().rows
  check('malformed aliases dropped', JSON.stringify(rows) === JSON.stringify([{ provider: 'good', alias: 'G' }]))
}

// 4. Save writes the whole map under the volatile field name.
{
  let seen
  const registrations = []
  const scope = {
    configForms: {
      get: () => ({
        getSnapshot: () => ({ status: 'ready', writable: true, revision: 7, value: {} }),
        subscribe: () => () => {},
        mutate: async (ops) => { seen = ops; return true },
      }),
      whileServed: (_namespaces, register) => register(new Set(['liang-calibrator'])),
    },
    slots: { inject: (_name, register) => register(), register: (options) => { registrations.push({ options }); return () => {} } },
    effect: (fn) => fn(),
  }
  scopeOf(['configForms', 'slots'])(scope)
  await registrations[0].options.inject().save([{ provider: 'a', alias: 'A' }, { provider: '', alias: 'ignored' }])
  check('save writes one set op', seen?.length === 1 && seen[0].op === 'set')
  check('save targets the volatile field', JSON.stringify(seen?.[0].path) === JSON.stringify(['backendAliases']))
  check('blank provider rows are not persisted', JSON.stringify(seen?.[0].value) === JSON.stringify({ a: 'A' }))
}

// 5. The seat scope still opens without the settings services present.
{
  const seat = scopes.find(({ services }) => services.includes('modelDirectories'))
  check('seat scope opened', seat !== undefined)
}

if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: channel-alias wiring (5 groups)')
