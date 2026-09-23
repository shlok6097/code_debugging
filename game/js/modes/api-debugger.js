/**
 * Code Debugger - Mode 12: API Debugger (30 Challenges)
 * HTTP methods, headers, status codes, CORS, JSON payloads, rate limits, JWT, REST/GraphQL across JS and Python.
 */

const API_DEBUGGER_BANK = [
  {
    id: "api-01",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 2,
    title: "Missing JSON.stringify on POST Body",
    description: "Fetch POST request sends [object Object] payload causing server 400 Bad Request.",
    code: `fetch('/api/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: { username: 'alice', pass: 'secret' } // Bug: raw object!\n});`,
    options: [
      "Wrap body with JSON.stringify({ username: 'alice', pass: 'secret' })",
      "Change method to GET",
      "Remove Content-Type header",
      "Change body to new FormData()"
    ],
    correctOption: 0,
    explanation: "WHAT: Unserialized object in fetch body. WHY: `fetch` expects `body` to be a string or Buffer/Blob. Passing a raw JS object converts it via `.toString()` to `\"[object Object]\"`. HOW: Use `JSON.stringify(...)`.",
    basePoints: 85,
    tags: ["javascript", "fetch", "json", "http"]
  },
  {
    id: "api-02",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 2,
    title: "Missing Content-Type Header for JSON Payload",
    description: "Server receives empty req.body in Express / Node because Content-Type is missing.",
    code: `fetch('/api/items', {\n  method: 'POST',\n  body: JSON.stringify({ name: 'Book' })\n});`,
    options: [
      "Add header: headers: { 'Content-Type': 'application/json' }",
      "Change POST to PUT",
      "Add credentials: 'omit'",
      "Append '?name=Book' to URL"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing media type header. WHY: Without `Content-Type: application/json`, standard server body parsers (like Express `express.json()`) ignore the request body. HOW: Add `headers: { 'Content-Type': 'application/json' }`.",
    basePoints: 85,
    tags: ["javascript", "http_headers", "content_type"]
  },
  {
    id: "api-03",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 3,
    title: "Un-awaited response.json()",
    description: "Logging response data prints Promise { <pending> } instead of actual data object.",
    code: `async function getData() {\n  const res = await fetch('/api/user');\n  const data = res.json(); // Bug: missing await!\n  console.log(data.name);\n}`,
    options: [
      "Add await: const data = await res.json();",
      "Change res.json() to res.data",
      "Change res.json() to JSON.parse(res)",
      "Remove async from function signature"
    ],
    correctOption: 0,
    explanation: "WHAT: Unresolved JSON promise. WHY: `res.json()` returns a Promise that resolves when the response stream is fully parsed. Accessing `.name` on a pending Promise is undefined. HOW: Use `await res.json()`.",
    basePoints: 95,
    tags: ["javascript", "fetch", "promises", "async"]
  },
  {
    id: "api-04",
    mode: "api_debugger",
    language: "Python",
    difficulty: 3,
    title: "Requests Library query parameter URL encoding",
    description: "Passing raw unencoded search strings with spaces and '&' in URL directly breaks parameter parsing.",
    code: `import requests\nquery = "shoes & socks"\n# Bad: requests.get(f"https://api.com/search?q={query}")\n# Bug: '&' splits query into separate parameters!`,
    options: [
      "Use params dictionary: requests.get('https://api.com/search', params={'q': query})",
      "Replace spaces with + manually",
      "Use requests.post instead",
      "Pass headers={'Query': query}"
    ],
    correctOption: 0,
    explanation: "WHAT: Unencoded URL parameter delimiter collision. WHY: Raw `&` acts as query parameter separator in HTTP URLs. HOW: Pass query parameters via `params={'q': query}` which automatically percent-encodes values.",
    basePoints: 95,
    tags: ["python", "requests", "url_encoding"]
  },
  {
    id: "api-05",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 3,
    title: "HTTP 404/500 Not Caught by fetch catch block",
    description: "Fetch error handler does not trigger when server responds with 404 Not Found or 500 Internal Error.",
    code: `fetch('/api/missing')\n  .then(res => res.json())\n  .catch(err => console.error("Error:", err)); // Never runs on 404!`,
    options: [
      "fetch only rejects on network failure; must check if (!res.ok) throw new Error(res.statusText)",
      "Change .catch to .error",
      "fetch automatically throws on HTTP 404 in modern browsers",
      "Wrap fetch in Promise.all"
    ],
    correctOption: 0,
    explanation: "WHAT: Fetch promise resolution model. WHY: In Fetch API, the returned Promise resolves successfully for ANY HTTP response status (including 400, 404, 500). It only rejects on true network failure. HOW: Check `if (!res.ok)`.",
    basePoints: 95,
    tags: ["javascript", "fetch", "http_status", "error_handling"]
  },
  {
    id: "api-06",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 4,
    title: "CORS Preflight (OPTIONS) Missing Status 200/204",
    description: "Browser blocks cross-origin request because backend server returns 405 Method Not Allowed on OPTIONS request.",
    code: `app.use((req, res, next) => {\n  res.header("Access-Control-Allow-Origin", "*");\n  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");\n  // Bug: if (req.method === 'OPTIONS') not handled and falls through to 404/405!\n  next();\n});`,
    options: [
      "Handle OPTIONS preflight: if (req.method === 'OPTIONS') return res.sendStatus(204);",
      "Change Access-Control-Allow-Origin to 'null'",
      "Remove Authorization header from client",
      "Disable CORS in the client browser code"
    ],
    correctOption: 0,
    explanation: "WHAT: Unhandled CORS preflight OPTIONS request. WHY: Browsers send an HTTP `OPTIONS` preflight before custom/cross-origin POST/PUT requests. The server must respond with 200 or 204 OK. HOW: Handle `if (req.method === 'OPTIONS') res.sendStatus(204)`.",
    basePoints: 110,
    tags: ["javascript", "cors", "options", "express"]
  },
  {
    id: "api-07",
    mode: "api_debugger",
    language: "Python",
    difficulty: 4,
    title: "FastAPI / Flask Status Code for Resource Creation",
    description: "REST endpoint creating a new resource returns default 200 OK instead of standard 201 Created with Location header.",
    code: `@app.post("/items")\ndef create_item(item: Item):\n    db.save(item)\n    return {"id": item.id} # Defaults to 200 OK`,
    options: [
      "Specify status_code=status.HTTP_201_CREATED (status_code=201)",
      "Change @app.post to @app.put",
      "Return status code 204 No Content",
      "Change return to redirect('/items')"
    ],
    correctOption: 0,
    explanation: "WHAT: REST status code semantic convention. WHY: Successful resource creation should return `201 Created` per RFC 7231 / HTTP REST best practices. HOW: In FastAPI, use `@app.post('/items', status_code=201)`.",
    basePoints: 110,
    tags: ["python", "fastapi", "rest", "http_status"]
  },
  {
    id: "api-08",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 4,
    title: "JWT Missing Bearer Prefix in Authorization Header",
    description: "API gateway returns 401 Unauthorized because Authorization header is formatted incorrectly.",
    code: `const token = "eyJhbGciOi...";\nfetch('/api/profile', {\n  headers: {\n    'Authorization': token // Bug: missing 'Bearer ' scheme prefix\n  }\n});`,
    options: [
      "Format as: 'Authorization': `Bearer ${token}`",
      "Change 'Authorization' to 'Auth-Token'",
      "Send token as a cookie instead",
      "Base64 encode the Authorization header"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing standard HTTP authorization scheme. WHY: RFC 6750 specifies Bearer Token usage: `Authorization: Bearer <token>`. Standard parsers reject bare tokens. HOW: `'Authorization': 'Bearer ' + token`.",
    basePoints: 110,
    tags: ["javascript", "jwt", "authorization", "oauth"]
  },
  {
    id: "api-09",
    mode: "api_debugger",
    language: "Python",
    difficulty: 5,
    title: "Requests Session Missing for Connection Pooling & Keep-Alive",
    description: "Script making 1,000 HTTP requests in a loop opens and tears down a new TCP connection on every single request.",
    code: `import requests\nfor url in urls:\n    res = requests.get(url) # Opens new TCP socket each time!`,
    options: [
      "Use requests.Session(): with requests.Session() as s: ... s.get(url)",
      "Set timeout=0",
      "Use threading without session",
      "Change requests.get to requests.post"
    ],
    correctOption: 0,
    explanation: "WHAT: Connection reuse omission. WHY: Plain `requests.get()` creates a new connection each call, incurring TCP and TLS handshake overhead. `requests.Session()` reuses sockets via HTTP Keep-Alive. HOW: Use `with requests.Session() as session:`.",
    basePoints: 125,
    tags: ["python", "requests", "http_keepalive", "performance"]
  },
  {
    id: "api-10",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 5,
    title: "Fetch Credentials Omitted for Cross-Origin Cookies / Sessions",
    description: "Session cookie not sent in cross-origin request, causing session to appear unauthenticated.",
    code: `fetch('https://api.example.com/me', {\n  // Missing credentials configuration\n});`,
    options: [
      "Add credentials: 'include' to send cookies with cross-origin requests",
      "Add headers: { 'Cookie': document.cookie }",
      "Change method to POST",
      "Use mode: 'no-cors'"
    ],
    correctOption: 0,
    explanation: "WHAT: Omitted credentials in cross-origin fetch. WHY: By default, `fetch` sets `credentials: 'same-origin'`. To send cookies/session IDs cross-origin, `credentials: 'include'` is required alongside server `Access-Control-Allow-Credentials: true`. HOW: Add `credentials: 'include'`.",
    basePoints: 125,
    tags: ["javascript", "cookies", "cors", "fetch"]
  },
  {
    id: "api-11",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 5,
    title: "Idempotency in REST APIs: PUT vs PATCH",
    description: "PATCH endpoint replaces entire resource and nullifies omitted fields.",
    code: `// Endpoint intends partial update, but code replaces entire document:\napp.patch('/users/:id', (req, res) => {\n  db.users.replaceOne({ id: req.params.id }, req.body); // Bug: wipes out non-provided fields!\n});`,
    options: [
      "PATCH must perform partial update (e.g. $set: req.body); replaceOne is for full replacement (PUT)",
      "PATCH and PUT are identical in HTTP specification",
      "Change PATCH to DELETE",
      "Change req.body to req.params"
    ],
    correctOption: 0,
    explanation: "WHAT: Semantic violation of RFC 5789 (PATCH vs PUT). WHY: `PUT` replaces the entire target resource; `PATCH` applies partial modifications. Using `replaceOne` deletes existing unspecified fields. HOW: Use partial update (`updateOne({ $set: req.body })`).",
    basePoints: 125,
    tags: ["javascript", "rest", "patch", "put"]
  },
  {
    id: "api-12",
    mode: "api_debugger",
    language: "Python",
    difficulty: 5,
    title: "Handling HTTP 429 Too Many Requests Rate Limiting",
    description: "API consumer crashes when rate limited instead of honoring Retry-After header.",
    code: `response = requests.get(url)\nif response.status_code == 429:\n    # Bug: raises exception immediately without backoff\n    raise Exception("Rate limited")`,
    options: [
      "Read 'Retry-After' header, sleep for that duration (or exponential backoff), and retry the request",
      "Change request method to HEAD",
      "Add headers={'X-Ignore-Rate-Limit': 'true'}",
      "Retry immediately in a tight while loop"
    ],
    correctOption: 0,
    explanation: "WHAT: Mishandling rate limiting. WHY: HTTP `429 Too Many Requests` includes a `Retry-After` header indicating seconds to wait. HOW: Read `retry_after = int(response.headers.get('Retry-After', 1)); time.sleep(retry_after)`.",
    basePoints: 125,
    tags: ["python", "http_status", "rate_limiting", "retry"]
  },
  {
    id: "api-13",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 6,
    title: "Aborting In-Flight HTTP Requests with AbortController",
    description: "Typeahead search triggers out-of-order race condition where old slow request overwrites newer result.",
    code: `let currentController = null;\nfunction search(query) {\n  if (currentController) currentController.abort();\n  currentController = new AbortController();\n  fetch(\`/api/search?q=\${query}\`, { signal: currentController.signal })\n    .then(r => r.json())\n    .then(showResults)\n    .catch(err => { /* Bug: does not ignore AbortError */ });\n}`,
    options: [
      "Check: if (err.name === 'AbortError') return; to avoid treating intentional aborts as runtime errors",
      "Remove signal property",
      "currentController.abort() destroys the browser networking thread",
      "Use debounce only without AbortController"
    ],
    correctOption: 0,
    explanation: "WHAT: Handling `AbortError`. WHY: When an `AbortController.abort()` cancels a request, the promise rejects with `DOMException: AbortError`. Application error handlers should ignore this intentional cancellation. HOW: `if (err.name === 'AbortError') return;`.",
    basePoints: 140,
    tags: ["javascript", "abortcontroller", "fetch", "race_condition"]
  },
  {
    id: "api-14",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 6,
    title: "GraphQL Error Handling in HTTP 200 OK Response",
    description: "Frontend assumes GraphQL request succeeded because HTTP status was 200 OK, but payload contains errors array.",
    code: `const res = await fetch('/graphql', { method: 'POST', body: JSON.stringify({ query }) });\nconst { data } = await res.json(); // If query fails, errors array is populated and data is null!\nconsole.log(data.user.name); // Crash: TypeError`,
    options: [
      "Check for json.errors: const json = await res.json(); if (json.errors) throw new Error(json.errors[0].message);",
      "GraphQL returns HTTP 500 on query errors",
      "Change POST to GET",
      "data is never null in GraphQL"
    ],
    correctOption: 0,
    explanation: "WHAT: GraphQL error transport paradigm. WHY: GraphQL servers typically return HTTP `200 OK` even if the query fails field validation or execution, returning errors in the `{ errors: [...] }` payload field. HOW: Check `if (json.errors)`.",
    basePoints: 140,
    tags: ["javascript", "graphql", "error_handling"]
  },
  {
    id: "api-15",
    mode: "api_debugger",
    language: "Python",
    difficulty: 6,
    title: "Streaming Large API Download into Memory vs Chunk Iteration",
    description: "Downloading a 2GB file via requests loads the entire file into RAM, crashing with MemoryError.",
    code: `response = requests.get('https://example.com/large.iso')\nwith open('large.iso', 'wb') as f:\n    f.write(response.content) # Loads 2GB in memory at once!`,
    options: [
      "Use stream=True: response = requests.get(url, stream=True); iterate with response.iter_content(chunk_size=8192)",
      "Increase Python heap limit",
      "Use response.text instead of response.content",
      "Split URL into multiple subdomains"
    ],
    correctOption: 0,
    explanation: "WHAT: Monolithic buffered download. WHY: `response.content` buffers the entire payload in RAM. HOW: Use `stream=True` and stream chunks with `for chunk in response.iter_content(chunk_size=8192): f.write(chunk)`.",
    basePoints: 140,
    tags: ["python", "requests", "streaming", "memory"]
  },
  {
    id: "api-16",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 6,
    title: "Content-Security-Policy (CSP) Connect-Src Violation",
    description: "API calls to microservice fail with CSP connect-src refusal error in browser console.",
    code: `<!-- CSP Header: default-src 'self' -->\n<script>\n  fetch('https://api.external-service.com/data'); // Blocked by CSP!\n</script>`,
    options: [
      "Update server CSP header to allow destination: connect-src 'self' https://api.external-service.com",
      "Use no-cors mode in fetch",
      "Encode API URL in base64",
      "Wrap fetch in an iframe"
    ],
    correctOption: 0,
    explanation: "WHAT: Browser CSP connect-src block. WHY: When CSP `default-src 'self'` is active, all XHR/Fetch network calls to foreign domains are blocked by the browser. HOW: Whitelist domain in `connect-src`.",
    basePoints: 140,
    tags: ["javascript", "csp", "security", "http_headers"]
  },
  {
    id: "api-17",
    mode: "api_debugger",
    language: "Python",
    difficulty: 7,
    title: "Webhook Signature Verification Timing Attack",
    description: "Verifying Stripe/GitHub HMAC webhook signatures with standard '==' operator.",
    code: `computed_sig = hmac.new(secret, payload, hashlib.sha256).hexdigest()\nif computed_sig == request_header_sig: # Bug: vulnerable to timing attacks!\n    process_webhook()`,
    options: [
      "Use constant-time comparison: hmac.compare_digest(computed_sig, request_header_sig)",
      "Hash the signature twice before comparing with ==",
      "Check length of signature only",
      "Use RSA instead of HMAC"
    ],
    correctOption: 0,
    explanation: "WHAT: Timing attack in cryptographic verification. WHY: Standard string `==` short-circuits on the first differing character, leaking information about matching prefix length. HOW: Use `hmac.compare_digest()` for constant-time comparison.",
    basePoints: 160,
    tags: ["python", "hmac", "webhooks", "timing_attack", "security"]
  },
  {
    id: "api-18",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 7,
    title: "Cache-Control Header: no-cache vs no-store",
    description: "Sensitive banking data displayed from disk cache after user clicks back button.",
    code: `// Endpoint returns:\nres.setHeader('Cache-Control', 'no-cache'); // Still allows caching on disk with revalidation!`,
    options: [
      "Use 'Cache-Control': 'no-store' (or 'no-store, no-cache, must-revalidate, max-age=0') to completely prevent storage",
      "Change Cache-Control to max-age=3600",
      "Use Pragma: public",
      "Use ETag header"
    ],
    correctOption: 0,
    explanation: "WHAT: `no-cache` vs `no-store` distinction. WHY: `no-cache` allows the browser to store the response on disk but requires validation with server before reuse. `no-store` forbids any caching completely. HOW: Use `no-store`.",
    basePoints: 160,
    tags: ["javascript", "cache_control", "http_headers", "security"]
  },
  {
    id: "api-19",
    mode: "api_debugger",
    language: "Python",
    difficulty: 7,
    title: "OpenAPI / Swagger Spec Route Parameter Path Sanitization",
    description: "Route param containing slashes (e.g. /files/docs/2026/report.pdf) returns 404.",
    code: `@app.get("/files/{file_path}") # In FastAPI / Starlette, matches only single path segment!\ndef get_file(file_path: str):\n    return serve_file(file_path)`,
    options: [
      "Use path converter syntax: @app.get('/files/{file_path:path}')",
      "Encode slashes as %2F in query string only",
      "Change GET to POST",
      "Use regular expressions in function name"
    ],
    correctOption: 0,
    explanation: "WHAT: Path segment delimiter match. WHY: Standard `{file_path}` captures up to the next `/`. To match multi-segment paths containing slashes, use the `:path` type converter. HOW: `{file_path:path}`.",
    basePoints: 160,
    tags: ["python", "fastapi", "routing", "openapi"]
  },
  {
    id: "api-20",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 7,
    title: "Server-Sent Events (SSE) Missing Newlines in Wire Format",
    description: "EventSource client never triggers onmessage because server omits double newline termination.",
    code: `res.writeHead(200, { 'Content-Type': 'text/event-stream' });\nres.write(\`data: \${JSON.stringify({ msg: "hi" })}\`); // Bug: missing double newline '\\n\\n'!`,
    options: [
      "SSE protocol requires messages to terminate with double newline: res.write(`data: ${payload}\\n\\n`)",
      "Change Content-Type to application/json",
      "Send binary data instead",
      "Use res.end() immediately"
    ],
    correctOption: 0,
    explanation: "WHAT: SSE wire framing protocol error. WHY: The W3C Server-Sent Events spec requires each message block to terminate with two consecutive newlines (`\\n\\n`). Without this, the client parser buffers indefinitely. HOW: Add `\\n\\n`.",
    basePoints: 160,
    tags: ["javascript", "sse", "eventsource", "streaming"]
  },
  {
    id: "api-21",
    mode: "api_debugger",
    language: "Python",
    difficulty: 8,
    title: "OAuth 2.0 PKCE Code Challenge Verification",
    description: "Authorization server rejects PKCE token exchange because code_verifier is not SHA256 hashed correctly.",
    code: `import hashlib, base64\ndef generate_code_challenge(verifier: str):\n    # Bug: standard base64 includes '+' and '/' and '=' padding!\n    return base64.b64encode(hashlib.sha256(verifier.encode()).digest()).decode()`,
    options: [
      "Use base64.urlsafe_b64encode(hash).rstrip(b'=').decode() (base64url encoding without padding)",
      "Use MD5 instead of SHA256",
      "code_verifier must be identical to code_challenge",
      "code_challenge must be hex encoded"
    ],
    correctOption: 0,
    explanation: "WHAT: RFC 7636 Base64url encoding requirement. WHY: OAuth PKCE requires `base64url` encoding (`-` and `_` instead of `+` and `/`, with no trailing `=` padding). Standard base64 produces invalid challenge strings. HOW: Use `base64.urlsafe_b64encode(...).rstrip(b'=')`.",
    basePoints: 175,
    tags: ["python", "oauth", "pkce", "cryptography"]
  },
  {
    id: "api-22",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 8,
    title: "HTTP/2 Rapid Reset Mitigation (RST_STREAM Floods)",
    description: "High volume of stream resets exhausts server CPU before request handler is invoked.",
    code: `// Node.js http2 server vulnerable to CVE-2023-44487 if maxSessionInvalidFrames / stream limits are not enforced`,
    options: [
      "Configure maxSessionInvalidFrames or rate-limit RST_STREAM frame resets at reverse proxy / load balancer (Nginx/Cloudflare)",
      "Downgrade completely to HTTP/1.0",
      "Increase maxHeaderSize only",
      "Disable TCP keepalive"
    ],
    correctOption: 0,
    explanation: "WHAT: HTTP/2 Rapid Reset vulnerability. WHY: Attackers open streams and cancel them immediately with `RST_STREAM`, causing asymmetric server-side overhead without hitting request limits. HOW: Limit stream resets per connection.",
    basePoints: 175,
    tags: ["javascript", "http2", "ddos", "security"]
  },
  {
    id: "api-23",
    mode: "api_debugger",
    language: "Python",
    difficulty: 8,
    title: "gRPC Metadata / Trailers Propagation",
    description: "gRPC client fails to read custom error details from trailers after RPC returns non-OK status.",
    code: `try:\n    response = stub.ProcessItem(request)\nexcept grpc.RpcError as e:\n    # Bug: reading metadata from e.initial_metadata() instead of e.trailing_metadata()\n    print(e.initial_metadata())`,
    options: [
      "Error details and custom status trailers are sent in e.trailing_metadata()",
      "gRPC errors do not contain metadata",
      "Change RpcError to StatusCode",
      "stub must be called asynchronously"
    ],
    correctOption: 0,
    explanation: "WHAT: gRPC trailers vs initial metadata. WHY: When an RPC fails with non-OK status, error details and status messages are returned in the response trailing metadata (`e.trailing_metadata()`). HOW: Access `e.trailing_metadata()`.",
    basePoints: 175,
    tags: ["python", "grpc", "protobuf", "microservices"]
  },
  {
    id: "api-24",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 8,
    title: "Service Worker Cache-First Fetch Trap on API endpoints",
    description: "Dynamic API responses are served stale forever from Service Worker CacheStorage.",
    code: `self.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.match(event.request).then(cached => cached || fetch(event.request))\n  ); // Bug: caches dynamic API responses forever without expiration!\n});`,
    options: [
      "Apply Network-First (or Network-Only) strategy for dynamic /api/* endpoints and Cache-First only for static assets",
      "Delete cache on every request",
      "Service Workers cannot intercept fetch events",
      "Change fetch(event.request) to fetch(event.request.url)"
    ],
    correctOption: 0,
    explanation: "WHAT: Inappropriate caching strategy. WHY: Caching all requests indiscriminately serves stale API JSON responses indefinitely. HOW: Route `/api/` endpoints via Network-First or Stale-While-Revalidate.",
    basePoints: 175,
    tags: ["javascript", "service_worker", "pwa", "caching"]
  },
  {
    id: "api-25",
    mode: "api_debugger",
    language: "Python",
    difficulty: 9,
    title: "Async HTTP Client Connection Pool Exhaustion in Loop",
    description: "Creating a new aiohttp.ClientSession() inside an async task loop exhausts OS file descriptors.",
    code: `async def fetch_item(url):\n    async with aiohttp.ClientSession() as session: # Creates new connector and pool for every URL!\n        async with session.get(url) as res:\n            return await res.json()`,
    options: [
      "Pass and reuse a single persistent ClientSession across all concurrent tasks",
      "Increase ulimit only",
      "Change aiohttp to urllib.request",
      "Call session.close() before get()"
    ],
    correctOption: 0,
    explanation: "WHAT: aiohttp session anti-pattern. WHY: Creating a `ClientSession` per request instantiates a new TCP connector pool every time, defeating socket reuse and exhausting sockets. HOW: Instantiate one session and pass it to tasks.",
    basePoints: 190,
    tags: ["python", "aiohttp", "async", "concurrency"]
  },
  {
    id: "api-26",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 9,
    title: "GraphQL N+1 Query Problem with DataLoader",
    description: "GraphQL field resolver queries database for every child item in a list individually.",
    code: `const resolvers = {\n  Post: {\n    author: (post) => db.users.findById(post.authorId) // N database queries for N posts!\n  }\n};`,
    options: [
      "Use DataLoader to batch and deduplicate author IDs into a single SELECT * FROM users WHERE id IN (...)",
      "Fetch all authors in a single flat SQL query inside Post resolver without post reference",
      "Make the author field non-nullable",
      "Disable nested fields in schema"
    ],
    correctOption: 0,
    explanation: "WHAT: GraphQL N+1 execution problem. WHY: Nested field resolvers execute once per parent item, issuing N discrete queries. HOW: Use `DataLoader` to batch lookups per event loop tick.",
    basePoints: 190,
    tags: ["javascript", "graphql", "dataloader", "n_plus_one"]
  },
  {
    id: "api-27",
    mode: "api_debugger",
    language: "Python",
    difficulty: 9,
    title: "JWT 'none' Algorithm Vulnerability (CVE-2015-9235)",
    description: "JWT verification library accepts unsigned tokens with algorithm header set to 'none'.",
    code: `jwt.decode(token, key=SECRET_KEY, algorithms=["HS256", "none"]) # Bug: allowing 'none' accepts forged signatures!`,
    options: [
      "Never allow 'none' in allowed algorithms: algorithms=['HS256']",
      "Change SECRET_KEY to empty string",
      "Allow 'none' only in development",
      "Use base64 decoding instead of jwt.decode"
    ],
    correctOption: 0,
    explanation: "WHAT: Insecure JWT algorithm negotiation. WHY: Allowing `'none'` allows attackers to craft arbitrary payload tokens with header `{\"alg\": \"none\"}` that bypass cryptographic signature verification completely. HOW: Explicitly restrict `algorithms=['HS256']`.",
    basePoints: 190,
    tags: ["python", "jwt", "security", "cve"]
  },
  {
    id: "api-28",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 10,
    title: "CORS with Wildcard Origin and Allow-Credentials Collision",
    description: "Browser rejects cross-origin response because server returns both Access-Control-Allow-Origin: * and Access-Control-Allow-Credentials: true.",
    code: `res.header("Access-Control-Allow-Origin", "*");\nres.header("Access-Control-Allow-Credentials", "true");`,
    options: [
      "The Fetch/CORS specification explicitly prohibits wildcard '*' origin when Allow-Credentials is true; reflect specific requesting origin (e.g. req.headers.origin)",
      "Change Allow-Credentials to 'yes'",
      "Add Access-Control-Allow-Methods: *",
      "Allow-Origin cannot be set by server"
    ],
    correctOption: 0,
    explanation: "WHAT: Forbidden CORS configuration collision. WHY: W3C CORS specification forbids `Access-Control-Allow-Origin: *` when credentials (cookies/auth) are enabled for security reasons. HOW: Validate and reflect the explicit requesting origin `req.headers.origin`.",
    basePoints: 200,
    tags: ["javascript", "cors", "security", "http_headers"]
  },
  {
    id: "api-29",
    mode: "api_debugger",
    language: "Python",
    difficulty: 10,
    title: "HTTP Request Smuggling via Transfer-Encoding / Content-Length Discrepancy",
    description: "Reverse proxy parses Content-Length while backend server parses Transfer-Encoding: chunked (CL.TE mismatch).",
    code: `# Frontend proxy forwards CL: 6, but payload contains hidden secondary HTTP request in TE chunk`,
    options: [
      "Normalize HTTP/1.1 headers, reject ambiguous requests containing both Content-Length and Transfer-Encoding, or enforce HTTP/2 end-to-end",
      "Increase Content-Length value",
      "Allow double Transfer-Encoding",
      "Disable reverse proxy caching"
    ],
    correctOption: 0,
    explanation: "WHAT: HTTP Request Smuggling (CL.TE / TE.CL). WHY: Discrepancies in how front-end and back-end servers parse request boundaries allow an attacker to smuggle a hidden request prefix into the backend connection queue. HOW: Reject ambiguous requests or use end-to-end HTTP/2.",
    basePoints: 200,
    tags: ["python", "http_smuggling", "security", "networking"]
  },
  {
    id: "api-30",
    mode: "api_debugger",
    language: "JavaScript",
    difficulty: 10,
    title: "Distributed Tracing Context (W3C traceparent) Header Mutation",
    description: "Microservice forwards traceparent header without updating parent-id span field.",
    code: `// Received: traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\n// Microservice forwards identical header to downstream service without generating new span-id!`,
    options: [
      "Preserve trace-id, generate new 16-hex-digit parent-id (span-id) for outbound call, and preserve trace-flags: 00-{trace_id}-{new_span_id}-{flags}",
      "Generate completely new trace-id for each downstream call",
      "Delete traceparent header before forwarding",
      "Set trace-flags to 00"
    ],
    correctOption: 0,
    explanation: "WHAT: W3C Trace Context propagation violation. WHY: `traceparent` format is `version-traceid-parentid-flags`. Downstream calls must keep `trace-id` consistent across the distributed transaction while updating `parent-id` to the current service's outbound span ID. HOW: Update `parent-id` span component.",
    basePoints: 200,
    tags: ["javascript", "distributed_tracing", "opentelemetry", "w3c"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_DEBUGGER_BANK };
}
