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

// 2. There are no built-in aliases: an unanswered namespace starts empty.
{
  const { store } = mountSettings(undefined)
  check('an unanswered namespace starts with no aliases', store.getSnapshot().rows.length === 0)
}

// 2b. An empty map stays empty: deleting every row is a decision.
{
  const { store } = mountSettings({ backendAliases: {} })
  check('an emptied map stays empty', store.getSnapshot().rows.length === 0)
  const { store: gone } = mountSettings({ backendAliases: { a: 'A' } })
  check('a non-empty map is still read', gone.getSnapshot().rows.length === 1)
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

// 6b. Saving an emptied editor writes an empty map, which the toggle row reads as "no aliases".
{
  const { registrations, mutations } = mountSettings({ backendAliases: { a: 'A' } })
  await registrations[0].options.inject().save([], 3000)
  const ops = mutations.at(-1)
  check('clearing every row writes an empty map', JSON.stringify(ops?.[0].value) === JSON.stringify({}))
}

// 7. The seat registers the shadowing entry, and its select reports the directory's
//    own verdict. The directory RESOLVES a refusal, so collapsing the result to a
//    boolean would report every failure as a success and close the menu on it.
{
  const registrations = []
  const scope = {
    slots: {
      inject: (_name, register) => register(),
      register: (options, component) => { registrations.push({ options, component }); return () => {} },
    },
    sessions: { subagentAddress: () => undefined },
    modelDirectories: {
      directoryFor: () => ({
        store: { getSnapshot: () => ({}), subscribe: () => () => {} },
        load: async () => {},
        select: async (selection) => selection.model === 'refused' ? { ok: false, error: 'nope' } : { ok: true },
      }),
    },
    remote: {},
    effect: (fn) => fn(),
  }
  scopeOf(['slots', 'sessions', 'modelDirectories'])(scope)
  check('seat registers one entry', registrations.length === 1)
  const [entry] = registrations
  check('seat shadows the stock slot', entry.options.name === 'conversation.input.model')
  check('seat renders lowest priority', entry.options.priority === -1)
  const face = entry.options.inject('session-1')
  check('seat injects the shared directory store', typeof face.directory?.subscribe === 'function')
  check('seat injects the alias store', typeof face.aliases?.subscribe === 'function')
  const accepted = await face.select({ provider: 'p', model: 'ok' })
  check('an accepted select yields the directory result', accepted?.ok === true)
  const refused = await face.select({ provider: 'p', model: 'refused' })
  check('a refused select keeps ok:false', refused?.ok === false)
  check('a refusal keeps its error', refused?.error === 'nope')

  // An unavailable seat must refuse rather than resolve undefined.
  const blocked = scope
  blocked.sessions = { subagentAddress: () => 'subagent-address' }
  scopeOf(['slots', 'sessions', 'modelDirectories'])(blocked)
  const blockedFace = registrations.at(-1).options.inject('session-2')
  check('an unavailable seat reports available:false', blockedFace.available === false)
  const blockedResult = await blockedFace.select({ provider: 'p', model: 'ok' })
  check('an unavailable seat refuses with ok:false', blockedResult?.ok === false)
}


if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: settings card wiring (7 groups, incl. the seat face)')
