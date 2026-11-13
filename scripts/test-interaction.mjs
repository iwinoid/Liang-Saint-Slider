/**
 * Interaction lifecycle test — a minimal hook harness, no DOM.
 *
 * The seat's open/close path is state, not markup, so the static renderer
 * cannot see it. This harness runs the component against fake React hooks and
 * fake timers, then drives the same calls a person makes: open from the
 * trigger, select a combo, close. It pins the rule the animation must keep —
 * a close request that arrives after the card already closed is a no-op, not a
 * replay of the exit pass. A replay flashes a ghost card and its focus restore
 * pulls the pointer away from whatever the person moved on to.
 *
 * Run: node scripts/test-interaction.mjs
 */
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')

let factory
globalThis.window = {
  __ModuleLoader__: {
    load: ({ id, factory: loaded }) => { factory ??= { id, factory: loaded } },
  },
}
globalThis.document = {
  querySelectorAll: () => [],
  createElement: () => ({ dataset: {}, textContent: '' }),
  head: { appendChild: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  body: {},
  activeElement: null,
}
globalThis.Node = class Node {}
new Function(source)()

if (factory === undefined) throw new Error('the bundle registered no module factory')

/** Fake timers: the card schedules its exit and its linger through them. */
let timerSeq = 0
const timers = new Map()
window.setTimeout = (fn, delay) => {
  const id = ++timerSeq
  timers.set(id, { fn, delay })
  return id
}
window.clearTimeout = (id) => { timers.delete(id) }
const timersAt = (delay) => [...timers.values()].filter((timer) => timer.delay === delay).length
const fireDelay = (delay) => {
  for (const [id, timer] of [...timers]) {
    if (timer.delay !== delay) continue
    timers.delete(id)
    timer.fn()
  }
}

/** Fake React: enough hooks for the seat, re-rendered whenever state moves. */
const hooks = []
let cursor = 0
let dirty = false
const pendingCleanups = []
const pendingEffects = []
const sameDeps = (left, right) => Array.isArray(left) && Array.isArray(right)
  && left.length === right.length && left.every((value, at) => Object.is(value, right[at]))
const react = {
  useState(initial) {
    const at = cursor++
    if (hooks[at] === undefined) hooks[at] = { value: typeof initial === 'function' ? initial() : initial }
    const hook = hooks[at]
    return [hook.value, (next) => {
      const value = typeof next === 'function' ? next(hook.value) : next
      if (Object.is(value, hook.value)) return
      hook.value = value
      dirty = true
    }]
  },
  useRef(initial) {
    const at = cursor++
    if (hooks[at] === undefined) hooks[at] = { current: initial }
    return hooks[at]
  },
  useEffect(effect, deps) {
    const at = cursor++
    const previous = hooks[at]
    if (previous !== undefined && sameDeps(previous.deps, deps)) return
    if (previous?.cleanup !== undefined) pendingCleanups.push(previous.cleanup)
    const hook = { deps, cleanup: undefined }
    hooks[at] = hook
    pendingEffects.push(() => { hook.cleanup = effect() ?? undefined })
  },
  useMemo(factory, deps) {
    const at = cursor++
    const previous = hooks[at]
    if (previous !== undefined && sameDeps(previous.deps, deps)) return previous.value
    const value = factory()
    hooks[at] = { value, deps }
    return value
  },
  useId: () => 'liang-test',
  useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
}
const jsx = (type, props, key) => ({ type, props: key === undefined ? props ?? {} : { ...props, key } })
const requireModule = (specifier) => {
  switch (specifier) {
    case 'react':
      return react
    case 'react/jsx-runtime':
      return { jsx, jsxs: jsx, Fragment: 'Fragment' }
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

function createSnapshotStore(initial) {
  let value = initial
  const listeners = new Set()
  return {
    getSnapshot: () => value,
    subscribe: (fn) => { listeners.add(fn); return () => { listeners.delete(fn) } },
    set: (next) => { value = next; for (const fn of listeners) fn() },
  }
}

const client = factory.factory(requireModule)

/** Walk the element tree the component returned, including unmounted component elements. */
function find(tree, predicate) {
  if (tree === null || tree === undefined || typeof tree === 'string' || typeof tree === 'boolean') return undefined
  if (typeof tree !== 'object' || tree.props === undefined) return undefined
  if (predicate(tree)) return tree
  const children = tree.props.children
  for (const child of Array.isArray(children) ? children : [children]) {
    const hit = find(child, predicate)
    if (hit !== undefined) return hit
  }
  return undefined
}

const models = [{
  id: 'a', name: 'Flash',
  reasoning: { defaultEffort: 'off', efforts: [{ id: 'off', name: 'Off' }, { id: 'high', name: 'High' }, { id: 'max', name: 'Max' }] },
}]
const directory = createSnapshotStore({
  current: { provider: 'p', model: 'a', reasoningEffort: 'off' },
  routable: true,
  groups: [{ id: 'p', name: 'P', models }],
  failures: [], status: 'ready', pending: null, error: null,
})
const aliases = createSnapshotStore({ status: 'ready', writable: true, rows: [], dismissMs: 3000 })
const teamActions = createSnapshotStore({ setEnabled: async () => null, pending: false, error: null })
const props = {
  locked: false, available: true, directory, aliases,
  t: (key) => key, load: () => {}, select: async () => ({ ok: true }),
  sessionId: 's1', useProjection: (name) => name === 'agentTeam' ? { enabled: true } : undefined,
  useSessions: () => false, teamActions,
}

/** Render until state settles; returns the last element tree. */
function renderSeat() {
  let tree
  for (let pass = 0; pass < 20; pass += 1) {
    dirty = false
    cursor = 0
    pendingCleanups.length = 0
    pendingEffects.length = 0
    tree = client.LiangModelSelect(props)
    for (const cleanup of pendingCleanups.splice(0)) cleanup()
    for (const effect of pendingEffects.splice(0)) effect()
    if (!dirty) return tree
  }
  throw new Error('the seat did not settle')
}

const failures = []
const check = (label, condition) => { if (!condition) failures.push(label) }
const menuOf = (tree) => find(tree, (element) => String(element.props.className ?? '').includes('dsh-lm-menu'))
const triggerOf = (tree) => find(tree, (element) => element.props.className === 'dsh-lm-trigger')
const rootOf = (tree) => find(tree, (element) => element.props.className === 'dsh-lm-root')
const classOf = (tree) => String(menuOf(tree)?.props.className ?? '')
const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

// 1. The trigger opens the card, and the card enters with the animated class.
let tree = renderSeat()
check('the seat renders a trigger', triggerOf(tree) !== undefined)
triggerOf(tree).props.onClick()
tree = renderSeat()
check('the trigger opens the card', menuOf(tree) !== undefined)
const teamRow = find(tree, (element) => element.props.team !== undefined && typeof element.type === 'function')
check('the open card carries the agent-team switch', teamRow !== undefined && teamRow.props.team.enabled === true)
check('the card enters with the animated class', classOf(tree).includes('dsh-lm-menuIn'))

// 2. Closing runs one exit pass and then unmounts.
triggerOf(tree).props.onClick()
tree = renderSeat()
check('closing renders the exit class', classOf(tree).includes('dsh-lm-menuOut'))
check('closing schedules exactly one exit', timersAt(140) === 1)
fireDelay(140)
tree = renderSeat()
check('the card unmounts after the exit', menuOf(tree) === undefined)

// 3. A close request that arrives after the card closed is a no-op. The linger
//    timer and the focus restore both produce one; a replay flashes a ghost card.
rootOf(tree).props.onBlur({ relatedTarget: null })
tree = renderSeat()
check('a stray close after closing does not remount the card', menuOf(tree) === undefined)
check('a stray close after closing schedules no exit', timersAt(140) === 0)

// 4. Closing cancels the pending linger, so it cannot fire a second close later.
triggerOf(tree).props.onClick()
tree = renderSeat()
const slider = find(tree, (element) => typeof element.props.onChoose === 'function')
check('the card renders the slider', slider !== undefined)
slider.props.onChoose(1)
await flush()
check('a selection schedules the linger', timersAt(3000) === 1)
triggerOf(renderSeat()).props.onClick()
tree = renderSeat()
check('closing cancels the pending linger', timersAt(3000) === 0)
fireDelay(3000)
tree = renderSeat()
check('a cancelled linger cannot replay a close', menuOf(tree) !== undefined && classOf(tree).includes('dsh-lm-menuOut'))
fireDelay(140)
tree = renderSeat()
check('the card is gone after the exit', menuOf(tree) === undefined)

if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: interaction lifecycle (4 groups)')
