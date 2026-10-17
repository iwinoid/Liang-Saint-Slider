/**
 * Settings-card wiring smoke test — no browser, no React renderer.
 *
 * Loads the browser half the way the DSH module table does, drives `apply` with
 * a fake client context, and asserts what the configuration card promises: the
 * alias rows, the linger delay, and the provider list all come from their real
 * sources (the settings form and the model catalog), and the card lands in the
 * General settings list.
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

const failures = []
const check = (label, condition) => { if (!condition) failures.push(label) }

const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

/** Drive the settings scope against one form value and return what it registered. */
function mountSettings(formValue) {
  const registrations = []
  const mutations = []
  const form = {
    getSnapshot: () => ({ status: 'ready', writable: true, revision: 7, value: formValue }),
    subscribe: () => () => {},
    mutate: async (ops) => { mutations.push(ops); return true },
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
  return { registrations, mutations, store: registrations[0].options.inject().hooks.liangSettings }
}

// 1. A configured map reaches the alias store the card and the toggle row share.
{
  const { registrations, store } = mountSettings({ backendAliases: { 'opencode-go': 'GO', opencode: 'ZEN' } })
  check('exactly one Settings card', registrations.length === 1)
  const [entry] = registrations
  check('card lands in the General settings list', entry.options.name === 'settings.general.item')
  check('card id is the settings namespace', entry.options.id === 'liang-calibrator')
  check('card is ordered in the list', typeof entry.options.order === 'number')
  check('configured aliases seeded', JSON.stringify(store.getSnapshot().rows)
    === JSON.stringify([{ provider: 'opencode-go', alias: 'GO' }, { provider: 'opencode', alias: 'ZEN' }]))
}

// 2. An unanswered form falls back to the built-in aliases, never to an empty row list.
{
  const { store } = mountSettings(undefined)
  const rows = store.getSnapshot().rows
  check('fallback keeps the built-in aliases', rows.some((row) => row.provider === 'deepseek-official' && row.alias === 'DS'))
  check('fallback keeps the opencode-go alias', rows.some((row) => row.provider === 'opencode-go' && row.alias === 'OCG'))
}

// 3. A malformed section is dropped rather than rendered as a broken row.
{
  const { store } = mountSettings({ backendAliases: { good: 'G', bad: 5, worse: null } })
  check('malformed aliases dropped', JSON.stringify(store.getSnapshot().rows) === JSON.stringify([{ provider: 'good', alias: 'G' }]))
}

// 4. The linger delay comes from the form, and a missing one falls back to the shipped default.
{
  check('configured linger seeded', mountSettings({ backendAliases: { a: 'A' }, dismissDelayMs: 8000 }).store.getSnapshot().dismissMs === 8000)
  check('linger falls back to the default', mountSettings({ backendAliases: { a: 'A' } }).store.getSnapshot().dismissMs === 3000)
  check('linger is clamped to the accepted range', mountSettings({ backendAliases: { a: 'A' }, dismissDelayMs: 9e9 }).store.getSnapshot().dismissMs === 60000)
  check('at or below zero means close at once', mountSettings({ backendAliases: { a: 'A' }, dismissDelayMs: -1 }).store.getSnapshot().dismissMs === 0)
  check('a non-numeric linger falls back to the default', mountSettings({ backendAliases: { a: 'A' }, dismissDelayMs: 'soon' }).store.getSnapshot().dismissMs === 3000)
}

// 5. The provider list comes from the live catalog, not from typing.
{
  const { store } = mountSettings({ backendAliases: { a: 'A' } })
  check('providers start empty', store.getSnapshot().providers.length === 0)
  let subscribed
  const remoteScope = {
    remote: {
      $on: (_event, listener) => { subscribed = listener; return () => {} },
      session: {
        modelCatalog: async () => ({
          ok: true,
          value: {
            groups: [
              { id: 'deepseek-official', name: 'DeepSeek', models: [] },
              { id: 'opencode-go', name: 'OpenCode Go', models: [] },
            ],
            failures: [],
          },
        }),
      },
    },
    effect: (fn) => fn(),
  }
  scopeOf(['remote', 'remote.session'])(remoteScope)
  await flush()
  check('providers read from the catalog', store.getSnapshot().providers.length === 2)
  check('provider carries its display name', store.getSnapshot().providers[1]?.name === 'OpenCode Go')
  check('catalog refresh is subscribed', typeof subscribed === 'function')
  check('providers do not disturb the alias rows', store.getSnapshot().rows.length === 1)
}

// 6. Save writes both fields and drops blank provider rows.
{
  const { registrations, mutations } = mountSettings({ backendAliases: {} })
  await registrations[0].options.inject().save([{ provider: 'a', alias: 'A' }, { provider: '', alias: 'ignored' }], 4500)
  const ops = mutations.at(-1)
  check('save writes both fields', ops?.length === 2 && ops.every((op) => op.op === 'set'))
  check('aliases target their field', JSON.stringify(ops?.[0].path) === JSON.stringify(['backendAliases']))
  check('blank provider rows are not persisted', JSON.stringify(ops?.[0].value) === JSON.stringify({ a: 'A' }))
  check('save carries the linger', JSON.stringify(ops?.[1].path) === JSON.stringify(['dismissDelayMs']) && ops[1].value === 4500)
}

// 7. The seat scope still opens without the settings services present.
{
  check('seat scope opened', scopes.some(({ services }) => services.includes('modelDirectories')))
}

if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: settings card wiring (7 groups)')
