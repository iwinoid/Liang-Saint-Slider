/**
 * Host-half test — no browser, no DSH runtime.
 *
 * Drives `apply` with a fake Cordis context whose web server reproduces the real
 * duplicate-route check, then calls the route handler directly. Covers what the
 * route promises: the shipped frames resolve, the method gate holds, traversal is
 * refused, a malformed escape is the caller's 400 rather than a throw, and the
 * route is disposed with the effect that registered it (a bare register would
 * throw on the second fiber, because the path is still in the table).
 *
 * Run: node scripts/test-host.mjs
 */
import { apply, Config, inject, name } from '../lib/index.js'

const failures = []
const check = (label, condition, detail) => {
  if (!condition) failures.push(detail === undefined ? label : `${label} (${detail})`)
}

/** Minimal stand-in for the plugin context Cordis hands to `apply`. */
function mount() {
  const routes = new Map()
  const disposers = []
  const closed = []
  const ctx = {
    fiber: { marker: 'fiber' },
    effect: (fn, label) => {
      const dispose = fn()
      disposers.push({ label, dispose })
      return dispose
    },
    inject: (services, callback) => {
      if (!services.includes('settings')) throw new Error(`unexpected inject: ${services.join(', ')}`)
      callback({
        effect: (fn) => { const dispose = fn(); disposers.push({ label: 'settings', dispose }); return dispose },
        settings: { configure: (options, fiber) => { closed.push({ options, fiber }); return () => {} } },
      })
    },
    webServer: {
      register: (route) => {
        // Mirrors @deepseek-ai/dsh-host-webserver: a second route on one path throws.
        if (routes.has(route.path)) throw new Error(`webserver: duplicate ${route.kind} route "${route.path}"`)
        routes.set(route.path, route)
        return () => routes.delete(route.path)
      },
    },
  }
  apply(ctx)
  return { routes, disposers, closed, fiber: ctx.fiber, unmount: () => { for (const { dispose } of disposers) if (typeof dispose === 'function') dispose() } }
}

/** Drive the mounted route handler and collect what it wrote. */
async function request(route, url, method = 'GET') {
  const written = { status: null, headers: null, body: null }
  const res = {
    writeHead: (status, headers) => { written.status = status; written.headers = headers ?? null; return res },
    end: (body) => { written.body = body ?? null; return res },
  }
  await route.handler({ method, url }, res)
  return written
}

// 1. The module's own surface.
{
  check('name is stable', name === 'liang-calibrator', name)
  check('declares the webServer dependency', Array.isArray(inject) && inject.includes('webServer'))
  const parsed = Config({})
  check('alias map defaults to empty', JSON.stringify(parsed.backendAliases.get()) === '{}')
  check('linger defaults to 3000', parsed.dismissDelayMs.get() === 3000)
  let rejected = null
  try {
    Config({ dismissDelayMs: -1 })
  } catch (error) {
    rejected = error
  }
  check('linger rejects a negative value', rejected !== null)
  let tooBig = null
  try {
    Config({ dismissDelayMs: 60001 })
  } catch (error) {
    tooBig = error
  }
  check('linger rejects above 60000', tooBig !== null)
}

// 2. Mounting registers exactly one route and tells settings not to generate one.
{
  const mounted = mount()
  check('one route registered', mounted.routes.size === 1, String(mounted.routes.size))
  check('route is the asset prefix', mounted.routes.has('/liang-assets'))
  check('route kind is prefix', mounted.routes.get('/liang-assets')?.kind === 'prefix')
  check('settings auto-generation is off', mounted.closed[0]?.options?.auto === false)
  check('settings is bound to the plugin fiber', mounted.closed[0]?.fiber === mounted.fiber)
}

// 3. The route is effect-scoped, so a restarted fiber can mount it again.
{
  const mounted = mount()
  mounted.unmount()
  check('unmount disposes the route', mounted.routes.size === 0, String(mounted.routes.size))
  let again = null
  try {
    again = mount()
  } catch (error) {
    again = { error }
  }
  check('remounting after dispose does not throw', again?.error === undefined,
    again?.error === undefined ? undefined : String(again.error))
  check('remounting registers the route again', again?.routes?.has('/liang-assets') === true)
}

// 4. Serving a real frame, and HEAD.
{
  const { routes } = mount()
  const route = routes.get('/liang-assets')
  const get = await request(route, '/liang-assets/frames/frame-00.webp')
  check('an existing frame is 200', get.status === 200, String(get.status))
  check('the frame is served as webp', get.headers?.['content-type'] === 'image/webp', String(get.headers?.['content-type']))
  check('the frame is immutable-cacheable', String(get.headers?.['cache-control'] ?? '').includes('immutable'))
  check('the frame has bytes', get.body !== null && get.body.length > 0, String(get.body?.length))
  const head = await request(route, '/liang-assets/frames/frame-30.webp', 'HEAD')
  check('HEAD is allowed', head.status === 200, String(head.status))
  const missing = await request(route, '/liang-assets/frames/frame-99.webp')
  check('a missing frame is 404', missing.status === 404, String(missing.status))
}

// 5. The method gate.
{
  const { routes } = mount()
  for (const method of ['POST', 'PUT', 'DELETE']) {
    const res = await request(routes.get('/liang-assets'), '/liang-assets/frames/frame-00.webp', method)
    check(`${method} is refused`, res.status === 405, String(res.status))
  }
}

// 6. Nothing outside the asset root is ever served.
//
// Two different mechanisms are at work, so the status differs and only the property
// matters. The WHATWG URL parser collapses a plain `..` while parsing, so the handler
// sees the already-flattened path (it lands on the asset root, an EISDIR read, 404).
// A percent-encoded dot survives parsing, reaches the handler, and is stopped by the
// containment check (403). Neither may serve a file from outside the root.
{
  const { routes } = mount()
  const route = routes.get('/liang-assets')
  const outside = await (await import('node:fs/promises')).readFile(new URL('../package.json', import.meta.url), 'utf8')
  for (const url of [
    '/liang-assets/../package.json',
    '/liang-assets/%2e%2e%2fpackage.json',
    '/liang-assets/..%2f..%2fetc%2fpasswd',
    '/liang-assets/frames/../../package.json',
  ]) {
    const res = await request(route, url)
    check('traversal is not served', res.status !== 200, `${url} -> ${res.status}`)
    check('traversal returns no file bytes', res.body === null || !String(res.body).includes(outside.slice(0, 40)),
      `${url} leaked bytes`)
  }
  // The encoded form is the one the containment check actually has to catch.
  const encoded = await request(route, '/liang-assets/%2e%2e%2fpackage.json')
  check('an encoded escape is 403', encoded.status === 403, String(encoded.status))
}

// 7. Requests the old raw-URL `..` pre-check used to break must now succeed.
{
  const { routes } = mount()
  const route = routes.get('/liang-assets')
  const dotdot = await request(route, '/liang-assets/a/../frames/frame-00.webp')
  check('an in-root .. path resolves', dotdot.status === 200, String(dotdot.status))
  const query = await request(route, '/liang-assets/frames/frame-00.webp?v=..')
  check('a .. in the query is ignored', query.status === 200, String(query.status))
}

// 8. A malformed escape is a 400 the handler owns, not a thrown URIError.
{
  const { routes } = mount()
  let thrown = null
  let res = null
  try {
    res = await request(routes.get('/liang-assets'), '/liang-assets/frames/%E0%A4%A.webp')
  } catch (error) {
    thrown = error
  }
  check('a malformed escape does not throw', thrown === null, thrown === null ? undefined : String(thrown))
  check('a malformed escape answers 400', res?.status === 400, String(res?.status))
}

// 9. A wrong asset layout fails at load, not as a silent stream of 404s.
{
  const route = (await import('../lib/index.js'))
  check('apply is exported as a function', typeof route.apply === 'function')
  // The probe reads the real tree, which is correct here, so apply must not throw.
  let threw = null
  try {
    mount()
  } catch (error) {
    threw = error
  }
  check('a correct layout does not throw', threw === null, threw === null ? undefined : String(threw))
}

if (failures.length > 0) {
  console.error('FAIL')
  for (const failure of failures) console.error('  -', failure)
  process.exit(1)
}
console.log('PASS: host half (9 groups)')
