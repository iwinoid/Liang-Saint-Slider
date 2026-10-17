/**
 * Style-alignment test against the reference implementation itself.
 *
 * The calibrator's slider palette, energy curve, particle field, and geometry
 * are ported from `dsh-codex-effort-slider` (Microqian2th). Transcribing the
 * formulas is not evidence they still agree, so this loads the REFERENCE
 * package's own bundle and compares its exported helpers with the ported ones
 * on the same inputs, over the whole 0..1 track.
 *
 * The reference bundle is not vendored. Point the test at a checkout or an
 * unpacked tarball; without one it self-skips.
 *
 *   node scripts/test-align.mjs
 *   LIANG_REFERENCE=/path/to/dsh-codex-effort-slider/lib/client.js node scripts/test-align.mjs
 *
 * Run: node scripts/test-align.mjs
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const referencePath = process.env.LIANG_REFERENCE
  ?? fileURLToPath(new URL('../../dsh-codex-effort-slider/lib/client.js', import.meta.url))

if (!existsSync(referencePath)) {
  console.log(`SKIP: reference bundle not found at ${referencePath}`)
  console.log('      set LIANG_REFERENCE to dsh-codex-effort-slider/lib/client.js to run it')
  process.exit(0)
}

/** Load one browser bundle by standing in for the DSH module table. */
async function loadBundle(path) {
  const source = await readFile(path, 'utf8')
  let factory
  globalThis.window = { __ModuleLoader__: { load: (entry) => { factory ??= entry } } }
  new Function(source)()
  if (factory === undefined) throw new Error(`${path} registered no module factory`)
  return factory
}

/** Minimal snapshot store matching the client-store contract the bundle uses. */
const createSnapshotStore = (init) => ({
  getSnapshot: () => init, subscribe: () => () => {}, set: () => {}, update: () => {},
})

const reactStub = {
  useRef: () => ({ current: null }), useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
  useEffect: () => {}, useMemo: (fn) => fn(), useId: () => 'x', useSyncExternalStore: () => undefined,
}

const stubRequire = (specifier) => {
  switch (specifier) {
    case 'react': return reactStub
    case 'react/jsx-runtime': return { jsx: () => null, jsxs: () => null, Fragment: () => null }
    case '@deepseek-ai/dsh-client-ui-primitives': return new Proxy({}, { get: () => () => null })
    case '@deepseek-ai/dsh-client-store': return { createSnapshotStore }
    default: return new Proxy({}, { get: () => () => null })
  }
}

const reference = (await loadBundle(referencePath)).factory(stubRequire)

// The port is exercised through the reference's own test surface, so the
// comparison needs the ported helpers reachable. They are module-internal, so
// the port's numbers are read back from the rendered slider instead.
const ported = (await loadBundle(fileURLToPath(new URL('../lib/client.js', import.meta.url)))).factory(stubRequire)

const failures = []
const check = (label, condition, detail) => { if (!condition) failures.push(detail === undefined ? label : `${label}: ${detail}`) }

const close = (a, b, epsilon = 1e-9) => Math.abs(a - b) <= epsilon

// 1. Geometry intentionally diverges: the calibrator keeps a 28px tube with a 24px knob,
//    so the ported knob offset is pinned to the TUBE radius while the reference pins it to
//    its own knob (= its track). Those formulas are compared by the render test instead;
//    only the palette, energy curve, and particle field below must still agree.
// 2. Palette: the fill's right-end colour and the full gradient must match.
{
  for (let step = 0; step <= 100; step += 1) {
    const pct = step / 100
    check('fillColorFor', reference.__internals.fillColorFor(pct) === ported.__test.fillColorFor(pct), `pct=${pct}`)
    check('fillBackgroundFor', reference.__internals.fillBackgroundFor(pct) === ported.__test.fillBackgroundFor(pct), `pct=${pct}`)
  }
  // The anchors the reference documents: pure blue before 1/3, deep violet at 1.
  check('anchor blue', reference.__internals.fillColorFor(0) === 'rgb(77,147,248)')
  check('anchor deep', reference.__internals.fillColorFor(1) === 'rgb(76,29,149)')
}

// 3. Energy and particle speed curves.
{
  for (let step = 0; step <= 100; step += 1) {
    const pct = step / 100
    check('energyFor', close(reference.__internals.energyFor(pct), ported.__test.energyFor(pct)), `pct=${pct}`)
    check('speedFor', close(reference.__internals.speedFor(pct), ported.__test.speedFor(pct)), `pct=${pct}`)
  }
  check('energy starts at 1/3', reference.__internals.energyFor(1 / 3) === 0 && ported.__test.energyFor(1 / 3) === 0)
  check('energy ends at 1', reference.__internals.energyFor(1) === 1 && ported.__test.energyFor(1) === 1)
}

// 4. The particle field: same count, same heights, same phases, same brightness order.
{
  const referenceParticles = reference.__internals.PARTICLES
  const portedParticles = ported.__test.PARTICLES
  check('particle count', referenceParticles.length === portedParticles.length,
    `${referenceParticles.length} vs ${portedParticles.length}`)
  for (let at = 0; at < Math.min(referenceParticles.length, portedParticles.length); at += 1) {
    check('particle y', close(referenceParticles[at].y, portedParticles[at].y), `#${at}`)
    check('particle phase', close(referenceParticles[at].phase, portedParticles[at].phase), `#${at}`)
    check('starBrightnessFor', close(reference.__internals.starBrightnessFor(at), ported.__test.starBrightnessFor(at)), `#${at}`)
    check('starHash01', close(reference.__internals.starHash01(at, 61), ported.__test.starHash01(at, 61)), `#${at}`)
    const speed = reference.__internals.speedFor(0.8)
    check('starDurationFor', close(reference.__internals.starDurationFor(at, speed), ported.__test.starDurationFor(at, speed)), `#${at}`)
    const duration = reference.__internals.starDurationFor(at, speed)
    check('starDelayFor', close(reference.__internals.starDelayFor(at, duration), ported.__test.starDelayFor(at, duration)), `#${at}`)
  }
  check('star count follows energy', reference.__internals.starCountFor(0.5) === ported.__test.starCountFor(0.5))
  check('star layer opacity', close(reference.__internals.starLayerOpacityFor(0.5), ported.__test.starLayerOpacityFor(0.5)))
}

// 5. The value-text rule: Off keeps the untouched tone, everything else tints.
{
  check('off is untinted', ported.__test.valueColorFor(1, { effort: 'off' }) === '')
  check('non-off matches the reference',
    ported.__test.valueColorFor(0.9, { effort: 'max' }) === reference.__internals.valueColorFor(0.9, { id: 'max', name: 'Max' }),
    `${ported.__test.valueColorFor(0.9, { effort: 'max' })} vs ${reference.__internals.valueColorFor(0.9, { id: 'max', name: 'Max' })}`)
}

if (failures.length > 0) {
  console.error(`FAIL (${failures.length})`)
  for (const failure of failures.slice(0, 20)) console.error('  -', failure)
  if (failures.length > 20) console.error(`  … ${failures.length - 20} more`)
  process.exit(1)
}
console.log('PASS: style aligned with the reference implementation')
