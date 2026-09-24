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
      "Wrap the body payload with JSON.stringify({ username: 'alice', pass: 'secret' })",
      "Convert the HTTP request method to GET and encode credentials inside URL parameters",
      "Remove Content-Type header to let browser serialize raw object into binary stream",
      "Construct a new FormData container instance and append username and pass fields"
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
      "Convert the HTTP method from POST to PUT so server body-parser activates by default",
      "Include explicit media header: headers: { 'Content-Type': 'application/json' }",
      "Configure the fetch options object with credentials: 'omit' to prevent cookie collisions",
      "Append query parameters '?name=Book' directly onto the target destination endpoint URL"
    ],
    correctOption: 1,
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
      "Replace res.json() with synchronous property access on res.data response object",
      "Pass response object into JSON.parse(res) to deserialize the raw stream synchronously",
      "Add await keyword before stream parsing: const data = await res.json();",
      "Remove async keyword from function definition to execute fetch synchronously"
    ],
    correctOption: 2,
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
      "Replace spaces with plus signs manually before formatting query into the endpoint URL",
      "Change HTTP request to POST and pass query payload inside JSON request body",
      "Pass custom headers dictionary containing headers={'Query-String': query} parameter",
      "Pass query dictionary via params argument: requests.get(url, params={'q': query})"
    ],
    correctOption: 3,
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
      "Fetch only rejects on network failure; inspect if (!res.ok) throw new Error(res.statusText)",
      "Replace promise catch chain with deprecated error callback: fetch('/api/missing').error(err => {})",
      "Configure global fetch interceptor to automatically throw HTTP exceptions on 404 responses",
      "Wrap fetch execution inside Promise.all pipeline to capture HTTP status code rejections"
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
      "Set Access-Control-Allow-Origin header to literal string 'null' to allow wildcard access",
      "Respond to OPTIONS preflight: if (req.method === 'OPTIONS') return res.sendStatus(204);",
      "Remove Authorization header from client request to prevent browser preflight requirements",
      "Configure client browser fetch options with mode: 'no-cors' to bypass server header checks"
    ],
    correctOption: 1,
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
      "Change route decorator method from @app.post to @app.put for idempotent creation",
      "Return HTTP status code 204 No Content because the created item ID is already known",
      "Specify creation status code on decorator: @app.post('/items', status_code=201)",
      "Issue an HTTP 302 redirect response pointing to the newly created resource URL"
    ],
    correctOption: 2,
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
      "Rename the header key from 'Authorization' to custom 'Auth-Token' specification",
      "Store token inside document.cookie and let the browser transmit it automatically",
      "Base64 encode the entire Authorization header dictionary before dispatching request",
      "Prefix token with standard Bearer scheme: 'Authorization': `Bearer ${token}`"
    ],
    correctOption: 3,
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
      "Reuse persistent TCP connections with session: with requests.Session() as s: s.get(url)",
      "Set timeout=0 on requests.get to force sockets to close immediately without waiting",
      "Spawn a separate threading.Thread worker for each individual URL to parallelize handshakes",
      "Switch request method from GET to POST so server enables keep-alive socket channels"
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
      "Manually read and pass cookies via custom header: headers: { 'Cookie': document.cookie }",
      "Add credentials: 'include' to instruct fetch to transmit cookies on cross-origin calls",
      "Convert the HTTP request method to POST and embed session identifier inside JSON body",
      "Configure fetch with mode: 'no-cors' to automatically forward all ambient session data"
    ],
    correctOption: 1,
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
      "Convert the HTTP verb to DELETE and re-create document with updated field values",
      "Pass route parameters req.params directly into replaceOne query filter criteria",
      "Apply partial update (e.g. $set: req.body); replaceOne is intended for full PUT updates",
      "Re-declare route as PUT since HTTP specification treats PUT and PATCH identically"
    ],
    correctOption: 2,
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
      "Convert HTTP request method to HEAD to query rate limit quota without consuming tokens",
      "Add custom header headers={'X-Ignore-Rate-Limit': 'true'} to bypass throttling gateways",
      "Execute an immediate synchronous while loop retry until status code transitions to 200",
      "Read 'Retry-After' response header, sleep for indicated seconds, and retry request"
    ],
    correctOption: 3,
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
      "Check if (err.name === 'AbortError') return; to avoid handling expected abort rejections",
      "Omit the signal option property from fetch configuration to decouple request timeouts",
      "Call currentController.abort() inside setTimeout to delay cancellation until completion",
      "Implement client debounce only and remove AbortController instances to avoid cancellations"
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
      "GraphQL responses always deliver non-null data objects; wrap logging inside try-finally",
      "Check payload errors: const json = await res.json(); if (json.errors) throw new Error(json.errors[0].message);",
      "Configure GraphQL backend endpoint to return HTTP 500 status codes on schema validation errors",
      "Switch HTTP transport method from POST to GET to force HTTP error status codes from server"
    ],
    correctOption: 1,
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
      "Increase system virtual memory allocation limits before reading binary file payload buffer",
      "Read payload via response.text instead of response.content to enable internal compression",
      "Set stream=True on get() and stream chunks via for chunk in response.iter_content(8192): f.write(chunk)",
      "Split target URL into multiple subdomain ranges and download each slice synchronously"
    ],
    correctOption: 2,
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
      "Configure fetch with mode: 'no-cors' to suppress browser CSP policy enforcement",
      "Encode target API URL into base64 format to bypass browser URL domain inspectors",
      "Embed fetch invocation inside hidden iframe element to inherit independent domain origin",
      "Update CSP header to permit origin: connect-src 'self' https://api.external-service.com"
    ],
    correctOption: 3,
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
      "Use constant-time verification: hmac.compare_digest(computed_sig, request_header_sig)",
      "Hash computed signature twice with SHA256 before comparing with standard == operator",
      "Verify signature string lengths match before executing boolean equality comparison",
      "Migrate webhook verification pipeline from symmetric HMAC-SHA256 to asymmetric RSA"
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
      "Change Cache-Control directive to public max-age=3600 to enforce periodic refresh",
      "Set Cache-Control: 'no-store' to completely forbid writing response to browser disk cache",
      "Configure response with legacy HTTP/1.0 Pragma: public header to reset proxy state",
      "Attach ETag entity validation headers so browser caches data conditionally on disk"
    ],
    correctOption: 1,
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
      "Percent-encode slashes as %2F inside query parameters and pass file_path via query",
      "Convert route method to POST and transmit file path inside JSON request payload",
      "Use path converter syntax: @app.get('/files/{file_path:path}') to capture full paths",
      "Add custom regex validator inside function name signature to parse nested slashes"
    ],
    correctOption: 2,
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
      "Change response Content-Type header to standard application/json streaming socket",
      "Transmit SSE event messages as raw binary Uint8Array buffers over websocket ports",
      "Terminate message blocks with double newline: res.write(`data: ${payload}\\n\\n`)",
      "Call res.end() immediately after each message write to flush socket chunk buffer"
    ],
    correctOption: 2,
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
      "Compute digest using MD5 hashing algorithm instead of SHA256 before base64 encoding",
      "Return code_verifier directly without hashing since PKCE supports plain text challenge",
      "Format code challenge as hexadecimal string representation using hexdigest() method",
      "Encode with base64url without padding: base64.urlsafe_b64encode(digest).rstrip(b'=').decode()"
    ],
    correctOption: 3,
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
      "Enforce maxSessionInvalidFrames or rate-limit RST_STREAM resets at reverse proxy gateway",
      "Downgrade web application infrastructure completely to legacy HTTP/1.0 protocol standard",
      "Increase maxHeaderSize configuration to allocate larger memory buffers per HTTP/2 frame",
      "Disable TCP keepalive settings to close connections immediately after stream processing"
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
      "gRPC error responses do not support metadata headers; inspect error code directly",
      "Extract error details and status from trailers via e.trailing_metadata() method",
      "Catch grpc.StatusCode exception instead of RpcError to access initial error headers",
      "Invoke gRPC client stub asynchronously to enable stream header inspection events"
    ],
    correctOption: 1,
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
      "Clear entire CacheStorage storage directory synchronously on every incoming request event",
      "Apply Network-First strategy for dynamic /api/* endpoints and Cache-First for static assets",
      "Service Workers cannot intercept fetch calls; migrate route caching to client memory",
      "Pass event.request.url string rather than Request object into fetch method invocation"
    ],
    correctOption: 1,
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
      "Increase operating system socket ulimit parameters to accommodate per-task sessions",
      "Replace aiohttp library with synchronous urllib.request calls inside background threads",
      "Instantiate and share a single persistent ClientSession across all concurrent worker tasks",
      "Call session.close() explicitly before initiating get request to recycle socket channel"
    ],
    correctOption: 2,
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
      "Fetch all authors via unconstrained SELECT query inside Post resolver without ID mapping",
      "Declare the author schema field non-nullable to force GraphQL engine to batch queries",
      "Disable nested relational query fields across all GraphQL public schema definitions",
      "Batch and deduplicate author queries into a single query using DataLoader utility"
    ],
    correctOption: 3,
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
      "Explicitly exclude 'none' and restrict allowed list: algorithms=['HS256']",
      "Set SECRET_KEY variable to an empty string to invalidate unsigned tokens",
      "Allow 'none' algorithm only when running inside local development environments",
      "Decode JWT payload with standard base64 decoding instead of jwt.decode helper"
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
      "Change Access-Control-Allow-Credentials header value from 'true' to string 'yes'",
      "CORS spec forbids wildcard '*' with credentials; reflect explicit requesting origin",
      "Append Access-Control-Allow-Methods: * header to permit wildcard credential headers",
      "Configure browser client to suppress origin validation headers on cross-origin calls"
    ],
    correctOption: 1,
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
      "Increase Content-Length value on client requests to encompass smuggled payload bytes",
      "Allow dual Transfer-Encoding header values to synchronize front-end and back-end proxies",
      "Normalize headers, reject ambiguous CL/TE requests, or enforce HTTP/2 end-to-end",
      "Disable reverse proxy caching layer to prevent poisoned cache entry distribution"
    ],
    correctOption: 2,
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
      "Generate a completely new trace-id root identifier for each outbound downstream call",
      "Delete traceparent header before dispatching requests to let destination create spans",
      "Reset trace-flags component to 00 to signal unrecorded span status across services",
      "Preserve trace-id, generate new outbound span-id, and retain flags: 00-{trace_id}-{new_span_id}-{flags}"
    ],
    correctOption: 3,
    explanation: "WHAT: W3C Trace Context propagation violation. WHY: `traceparent` format is `version-traceid-parentid-flags`. Downstream calls must keep `trace-id` consistent across the distributed transaction while updating `parent-id` to the current service's outbound span ID. HOW: Update `parent-id` span component.",
    basePoints: 200,
    tags: ["javascript", "distributed_tracing", "opentelemetry", "w3c"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_DEBUGGER_BANK };
}
