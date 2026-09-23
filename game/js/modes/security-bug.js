/**
 * Code Debugger - Mode 15: Security Sentry (30 Challenges)
 * XSS, CSRF, SQL injection, Command injection, Path traversal, Insecure deserialization, Cryptographic pitfalls across Python, C++, Java, JS.
 */

const SECURITY_BUG_BANK = [
  {
    id: "sec-01",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 2,
    title: "Direct innerHTML Assignment from User Input (XSS)",
    description: "Setting document.getElementById(...).innerHTML directly to user URL parameter allows arbitrary script execution.",
    code: `const params = new URLSearchParams(window.location.search);\nconst name = params.get('name');\ndocument.getElementById('greeting').innerHTML = "Hello " + name; // Vulnerable to XSS!`,
    options: [
      "Use textContent (or innerText) instead of innerHTML: element.textContent = `Hello ${name}`",
      "Use name.toLowerCase()",
      "Encode name in base64",
      "Wrap inside a setTimeout"
    ],
    correctOption: 0,
    explanation: "WHAT: Cross-Site Scripting (DOM XSS). WHY: `innerHTML` parses input as HTML markup. An attacker supplying `?name=<img src=x onerror=alert(1)>` executes malicious JavaScript. HOW: Use `textContent`.",
    basePoints: 85,
    tags: ["javascript", "xss", "dom", "security"]
  },
  {
    id: "sec-02",
    mode: "security_bug",
    language: "Python",
    difficulty: 2,
    title: "Hardcoded Secret API Key in Source Code",
    description: "API secret token committed directly into repository source code.",
    code: `STRIPE_SECRET_KEY = "sk_live_51MzQ4..."; # Hardcoded production secret!\nstripe.api_key = STRIPE_SECRET_KEY`,
    options: [
      "Load secrets from environment variables: os.environ.get('STRIPE_SECRET_KEY') or secret manager",
      "Encode secret in rot13",
      "Rename variable to SECRET",
      "Comment out the variable"
    ],
    correctOption: 0,
    explanation: "WHAT: Hardcoded credentials. WHY: Committing secrets into source control exposes credentials to all repository viewers, Git history, and leak scrapers. HOW: Use environment variables or secret vaults.",
    basePoints: 85,
    tags: ["python", "secrets", "credentials", "security"]
  },
  {
    id: "sec-03",
    mode: "security_bug",
    language: "Python",
    difficulty: 3,
    title: "Command Injection via os.system / subprocess shell=True",
    description: "Passing unsanitized user input into a shell command executes arbitrary host commands.",
    code: `import os\nfilename = request.args.get('filename')\nos.system(f"cat /var/logs/{filename}") # E.g. filename = 'test; rm -rf /'`,
    options: [
      "Use subprocess.run(['cat', safe_path], shell=False) with parameterized argument list without shell invocation",
      "Replace spaces with underscores",
      "Add quotes around filename in string: f\"cat '/var/logs/{filename}'\"",
      "Change os.system to os.popen"
    ],
    correctOption: 0,
    explanation: "WHAT: Command Injection. WHY: `os.system` and `shell=True` pass strings to the system shell (`/bin/sh` / `cmd.exe`), allowing command separators (`;`, `&&`, `|`) to execute injected shell commands. HOW: Use `subprocess.run([...], shell=False)`.",
    basePoints: 95,
    tags: ["python", "command_injection", "subprocess", "security"]
  },
  {
    id: "sec-04",
    mode: "security_bug",
    language: "Java",
    difficulty: 3,
    title: "Plaintext Password Storage vs Cryptographic Hashing",
    description: "Storing passwords in database using plain strings or fast hashes (MD5 / SHA1).",
    code: `public void saveUser(String username, String rawPassword) {\n    String hash = md5(rawPassword); // Broken: MD5 is vulnerable to rainbow tables & brute force!\n    db.save(username, hash);\n}`,
    options: [
      "Use slow, salted adaptive key derivation functions: bcrypt, Argon2, or PBKDF2 with high work factor",
      "Use SHA-256 without salt",
      "Store plaintext password in encrypted database column",
      "Base64 encode the MD5 hash"
    ],
    correctOption: 0,
    explanation: "WHAT: Weak password hashing. WHY: MD5/SHA1 are fast cryptographic hashes easily cracked via GPUs (billions of hashes/sec) and rainbow tables. HOW: Use `bcrypt`, `Argon2id`, or `PBKDF2` with per-user random salt.",
    basePoints: 95,
    tags: ["java", "passwords", "cryptography", "bcrypt", "security"]
  },
  {
    id: "sec-05",
    mode: "security_bug",
    language: "Python",
    difficulty: 3,
    title: "Path Traversal Directory Escaping (Directory Traversal)",
    description: "Reading a file using user input without path normalization allows reading /etc/passwd.",
    code: `filename = request.args.get('file') # e.g. '../../../../etc/passwd'\nwith open(f"/app/uploads/{filename}", "rb") as f:\n    return f.read()`,
    options: [
      "Validate resolved path: os.path.abspath(path).startswith(safe_base_dir) or use werkzeug.utils.secure_filename",
      "Remove all '.' characters from filename",
      "Check if filename ends with '.png'",
      "Change 'rb' mode to 'r'"
    ],
    correctOption: 0,
    explanation: "WHAT: Directory Traversal / Path Traversal. WHY: Input containing `../` escapes the intended `/app/uploads` root directory. HOW: Resolve canonical path with `os.path.realpath` and verify it starts with base directory.",
    basePoints: 95,
    tags: ["python", "path_traversal", "lfi", "security"]
  },
  {
    id: "sec-06",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 4,
    title: "eval() / Function() Dynamic Code Execution",
    description: "Using eval() to parse JSON or calculate dynamic math expressions from user input.",
    code: `function compute(userInput) {\n  return eval(userInput); // Vulnerable to code execution!\n}`,
    options: [
      "Use JSON.parse() for structured data or a dedicated math AST parser for arithmetic",
      "Use window.eval instead",
      "Check typeof userInput === 'string'",
      "Run eval inside a web worker"
    ],
    correctOption: 0,
    explanation: "WHAT: Remote Code Execution via `eval`. WHY: `eval` executes any JavaScript code with full privileges of the page. An attacker can access cookies, local storage, and DOM. HOW: Use safe specialized parsers.",
    basePoints: 110,
    tags: ["javascript", "eval", "rce", "security"]
  },
  {
    id: "sec-07",
    mode: "security_bug",
    language: "C++",
    difficulty: 4,
    title: "Stack Buffer Overflow with strcpy / gets",
    description: "Copying unbounded string into fixed-size stack buffer causes memory corruption and remote code execution.",
    code: `void handleInput(const char* userInput) {\n    char buffer[64];\n    strcpy(buffer, userInput); // Bug: no bounds checking!\n}`,
    options: [
      "Use std::string or bounded functions: strncpy(buffer, userInput, sizeof(buffer) - 1)",
      "Increase buffer to 1024 bytes",
      "Change char buffer to static char buffer",
      "Use gets(buffer)"
    ],
    correctOption: 0,
    explanation: "WHAT: Stack-based buffer overflow (CWE-120). WHY: `strcpy` copies bytes until hitting a null terminator. If `userInput` exceeds 64 bytes, it overwrites saved frame pointers and return addresses. HOW: Use `std::string` or `strncpy`.",
    basePoints: 110,
    tags: ["cpp", "buffer_overflow", "memory_safety", "strcpy"]
  },
  {
    id: "sec-08",
    mode: "security_bug",
    language: "Python",
    difficulty: 4,
    title: "Insecure Deserialization with Python pickle",
    description: "Loading untrusted payload using pickle.loads() enables arbitrary remote code execution via __reduce__.",
    code: `import pickle\nuser_cookie = request.cookies.get('session')\ndata = pickle.loads(base64.b64decode(user_cookie)) # Highly dangerous!`,
    options: [
      "Never unpickle untrusted data; use secure JSON with cryptographic HMAC signing (e.g. itsdangerous)",
      "Pickle is safe if verified with try/except",
      "Encrypt pickle with AES without HMAC",
      "Change pickle to marshal"
    ],
    correctOption: 0,
    explanation: "WHAT: Insecure deserialization RCE. WHY: Python's `pickle` module executes custom bytecode on unpack (`__reduce__`), allowing arbitrary OS commands to execute upon deserialization. HOW: Use `json` with HMAC signatures.",
    basePoints: 110,
    tags: ["python", "pickle", "deserialization", "rce"]
  },
  {
    id: "sec-09",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 5,
    title: "Missing SameSite / HttpOnly Cookie Flags (CSRF / XSS Exfiltration)",
    description: "Authentication cookie set without HttpOnly and SameSite flags allows theft via document.cookie and CSRF.",
    code: `res.cookie('token', jwt, {\n  // Missing security flags\n});`,
    options: [
      "Set: { httpOnly: true, secure: true, sameSite: 'strict' (or 'lax') }",
      "Set: { httpOnly: false, domain: '*' }",
      "Set: { path: '/' } only",
      "Cookies cannot be read by JavaScript anyway"
    ],
    correctOption: 0,
    explanation: "WHAT: Insecure session cookie attributes. WHY: Without `httpOnly: true`, malicious scripts (XSS) can read `document.cookie`. Without `sameSite`, third-party sites can initiate CSRF requests. HOW: `{ httpOnly: true, secure: true, sameSite: 'lax' }`.",
    basePoints: 125,
    tags: ["javascript", "cookies", "httponly", "samesite", "csrf"]
  },
  {
    id: "sec-10",
    mode: "security_bug",
    language: "Java",
    difficulty: 5,
    title: "XML External Entity (XXE) Injection in DocumentBuilder",
    description: "Parsing untrusted XML with default DocumentBuilderFactory allows reading local server files or SSRF.",
    code: `DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();\n// Vulnerable to XXE payloads like <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]>\nDocumentBuilder db = dbf.newDocumentBuilder();\nDocument doc = db.parse(xmlInput);`,
    options: [
      "Disable DTDs: dbf.setFeature(\"http://apache.org/xml/features/disallow-doctype-decl\", true);",
      "Check if xmlInput contains '<!DOCTYPE'",
      "Parse XML as JSON instead",
      "Change DocumentBuilder to SAXParser without configuration"
    ],
    correctOption: 0,
    explanation: "WHAT: XML External Entity (XXE) Injection. WHY: By default, XML parsers resolve external entities (`SYSTEM \"file://...\"`), disclosing local server files or triggering internal SSRF. HOW: Explicitly disable DTD declarations on the parser factory.",
    basePoints: 125,
    tags: ["java", "xxe", "xml", "security"]
  },
  {
    id: "sec-11",
    mode: "security_bug",
    language: "Python",
    difficulty: 5,
    title: "Server-Side Request Forgery (SSRF) on Webhook / URL Fetcher",
    description: "Endpoint fetching user-supplied URL allows attacker to access AWS metadata endpoint (169.254.169.254) or localhost.",
    code: `target_url = request.args.get('url') # E.g. 'http://169.254.169.254/latest/meta-data/'\nres = requests.get(target_url)\nreturn res.text`,
    options: [
      "Validate target against allowed domain whitelist and block private IP ranges (127.0.0.0/8, 10.0.0.0/8, 169.254.0.0/16, etc.) after DNS resolution",
      "Check that url.startswith('http://')",
      "Disable SSL verification",
      "Add user-agent header"
    ],
    correctOption: 0,
    explanation: "WHAT: Server-Side Request Forgery (SSRF). WHY: The server acts as a proxy into internal networks, exposing private cloud metadata and local microservices. HOW: Resolve DNS, verify IP is not in private/link-local ranges, or use an egress proxy.",
    basePoints: 125,
    tags: ["python", "ssrf", "network_security", "cloud"]
  },
  {
    id: "sec-12",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 5,
    title: "Prototype Pollution via Deep Object Merge",
    description: "Merging untrusted JSON containing '__proto__' or 'constructor.prototype' alters global Object.prototype.",
    code: `function merge(target, source) {\n  for (let key in source) {\n    if (typeof source[key] === 'object') {\n      if (!target[key]) target[key] = {};\n      merge(target[key], source[key]);\n    } else {\n      target[key] = source[key]; // Attacker sends {"__proto__": {"isAdmin": true}}\n    }\n  }\n}`,
    options: [
      "Block dangerous property keys: if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;",
      "Use Object.assign instead of merge",
      "Freeze all objects in the application",
      "Merge requires arrays only"
    ],
    correctOption: 0,
    explanation: "WHAT: Prototype Pollution. WHY: Traversing `__proto__` injects properties into `Object.prototype`, affecting every object in the JavaScript runtime. HOW: Sanitize and reject prototype-altering keys.",
    basePoints: 125,
    tags: ["javascript", "prototype_pollution", "security", "vulnerability"]
  },
  {
    id: "sec-13",
    mode: "security_bug",
    language: "C++",
    difficulty: 6,
    title: "Insecure Random Number Generation in Token Creation",
    description: "Generating password reset tokens or session keys using rand() / srand(time(NULL)).",
    code: `srand(time(NULL));\nint token = rand(); // Vulnerable to prediction!`,
    options: [
      "Use cryptographically secure random number generators: /dev/urandom, BCryptGenRandom, or std::random_device with secure seed",
      "Seed rand() with rand()",
      "Hash the output with MD5",
      "Multiply token by 31"
    ],
    correctOption: 0,
    explanation: "WHAT: Insecure Pseudorandom Number Generator (PRNG). WHY: `rand()` is an LCG with low entropy and predictable states. Attackers knowing the timestamp can brute-force all possible tokens. HOW: Use CSPRNG (`/dev/urandom` / OS cryptographic API).",
    basePoints: 140,
    tags: ["cpp", "csprng", "randomness", "cryptography"]
  },
  {
    id: "sec-14",
    mode: "security_bug",
    language: "Java",
    difficulty: 6,
    title: "Insecure Deserialization in Java ObjectInputStream",
    description: "Deserializing untrusted byte streams using standard ObjectInputStream.readObject() (ysoserial gadget chains).",
    code: `ObjectInputStream ois = new ObjectInputStream(clientSocket.getInputStream());\nObject obj = ois.readObject(); // RCE via gadget chains on classpath!`,
    options: [
      "Use modern serialization formats (JSON, Protobuf) or enforce ObjectInputFilter to whitelist allowed classes",
      "Cast obj to (String) immediately",
      "ObjectInputStream is secure if run over TLS",
      "Wrap inside try-catch block"
    ],
    correctOption: 0,
    explanation: "WHAT: Java Deserialization Vulnerability (CWE-502). WHY: `readObject()` instantiates classes and invokes methods during stream parsing. Gadget chains on the classpath (e.g. Commons-Collections) execute arbitrary OS commands. HOW: Use `ObjectInputFilter` or avoid Java native serialization.",
    basePoints: 140,
    tags: ["java", "deserialization", "gadget_chains", "rce"]
  },
  {
    id: "sec-15",
    mode: "security_bug",
    language: "Python",
    difficulty: 6,
    title: "Regex Denial of Service (ReDoS) Catastrophic Backtracking",
    description: "Regular expression with nested quantifiers (a+)+ hangs CPU at 100% on malicious input.",
    code: `import re\npattern = re.compile(r"^([a-zA-Z0-9]+)+$")\n# Input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa!' causes exponential backtracking!`,
    options: [
      "Eliminate overlapping nested quantifiers (e.g. r'^[a-zA-Z0-9]+$') or use linear-time regex engines (re2)",
      "Compile regex with re.MULTILINE",
      "Increase Python thread priority",
      "Use re.match instead of re.compile"
    ],
    correctOption: 0,
    explanation: "WHAT: Regular Expression Denial of Service (ReDoS). WHY: Nested ambiguous quantifiers `(a+)+` cause $O(2^N)$ backtracking on non-matching suffix inputs, freezing the thread. HOW: Simplify pattern or use non-backtracking engines.",
    basePoints: 140,
    tags: ["python", "regex", "redos", "dos"]
  },
  {
    id: "sec-16",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 6,
    title: "Open Redirect Vulnerability via unvalidated 'next' URL",
    description: "Login redirect sends user to attacker phishing site supplied in query parameter.",
    code: `const target = req.query.next; // e.g. next=https://evil-phishing.com\nres.redirect(target);`,
    options: [
      "Validate target against relative paths starting with single '/' (and not '//') or whitelist of allowed hostnames",
      "Target must start with 'http'",
      "Target should be base64 encoded",
      "Open redirects are harmless"
    ],
    correctOption: 0,
    explanation: "WHAT: Open Redirect Vulnerability (CWE-601). WHY: Unvalidated redirects allow attackers to craft phishing links using the trusted domain (`trusted.com/login?next=https://evil.com`). HOW: Verify target is a local path (e.g. starts with `/` and not `//`).",
    basePoints: 140,
    tags: ["javascript", "open_redirect", "phishing", "security"]
  },
  {
    id: "sec-17",
    mode: "security_bug",
    language: "C++",
    difficulty: 7,
    title: "Integer Overflow in Memory Allocation Buffer Calculation",
    description: "Multiplying count * sizeof(Item) overflows 32-bit integer, allocating a tiny buffer that gets overrun.",
    code: `void* allocItems(size_t count) {\n    // If count = 1073741824 and sizeof(int) = 4, count * 4 wraps to 0!\n    int totalSize = count * sizeof(int); // 32-bit overflow\n    return malloc(totalSize);\n}`,
    options: [
      "Check for overflow before multiplying: if (count > SIZE_MAX / sizeof(int)) return nullptr; or use calloc(count, sizeof(int))",
      "Change int to short",
      "Add 1 to totalSize",
      "malloc automatically detects integer overflows"
    ],
    correctOption: 0,
    explanation: "WHAT: Integer overflow to buffer overflow. WHY: When arithmetic wraps around, `malloc` allocates a small buffer. Subsequent writes of `count` items overflow heap memory. HOW: Check overflow bounds or use `calloc()`.",
    basePoints: 160,
    tags: ["cpp", "integer_overflow", "heap_overflow", "malloc"]
  },
  {
    id: "sec-18",
    mode: "security_bug",
    language: "Python",
    difficulty: 7,
    title: "CORS Header Misconfiguration with Origin Reflection",
    description: "Server dynamically reflects requesting Origin without validation alongside credentials.",
    code: `origin = request.headers.get('Origin')\nresponse.headers['Access-Control-Allow-Origin'] = origin # Reflects ANY origin!\nresponse.headers['Access-Control-Allow-Credentials'] = 'true'`,
    options: [
      "Check origin against an explicit trusted whitelist of authorized partner domains before reflecting",
      "Use Access-Control-Allow-Origin: * with Allow-Credentials: true",
      "Remove Access-Control-Allow-Credentials",
      "Origin reflection is the recommended CORS setup"
    ],
    correctOption: 0,
    explanation: "WHAT: Insecure CORS Origin Reflection. WHY: Reflecting arbitrary requesting origins with credentials enabled allows malicious websites visited by an authenticated user to make authenticated background API calls and read private data. HOW: Whitelist origins.",
    basePoints: 160,
    tags: ["python", "cors", "security", "web"]
  },
  {
    id: "sec-19",
    mode: "security_bug",
    language: "Java",
    difficulty: 7,
    title: "ECB Mode in AES Encryption",
    description: "Using AES/ECB/PKCS5Padding leaks patterns in ciphertext because identical plaintext blocks produce identical ciphertext blocks.",
    code: `Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // ECB mode leaks block patterns!`,
    options: [
      "Use authenticated encryption mode: AES/GCM/NoPadding with unique Initialization Vector (IV) / Nonce",
      "Use AES/CBC without IV",
      "Increase key length to 512 bits in ECB mode",
      "ECB mode is the most secure AES mode"
    ],
    correctOption: 0,
    explanation: "WHAT: Weak Block Cipher Mode (ECB). WHY: Electronic Codebook (ECB) encrypts identical 16-byte blocks identically, revealing structured patterns (e.g. ECB penguin bitmap leak). HOW: Use `AES/GCM/NoPadding` with unique IVs.",
    basePoints: 160,
    tags: ["java", "aes", "cryptography", "ecb", "gcm"]
  },
  {
    id: "sec-20",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 7,
    title: "Clickjacking Protection Missing X-Frame-Options / CSP",
    description: "Sensitive account settings page can be loaded inside an invisible attacker iframe for click hijacking.",
    code: `// Missing frame protection headers in Express response`,
    options: [
      "Set headers: X-Frame-Options: DENY (or SAMEORIGIN) and Content-Security-Policy: frame-ancestors 'none' (or 'self')",
      "Disable JavaScript in iframe",
      "Add document.body.style.display = 'block'",
      "Clickjacking is prevented by modern HTTPS"
    ],
    correctOption: 0,
    explanation: "WHAT: Clickjacking vulnerability. WHY: Without `X-Frame-Options` or CSP `frame-ancestors`, an attacker can overlay an invisible `<iframe>` over legitimate UI elements, tricking users into clicking unauthorized actions. HOW: Set `frame-ancestors 'self'`.",
    basePoints: 160,
    tags: ["javascript", "clickjacking", "csp", "x_frame_options"]
  },
  {
    id: "sec-21",
    mode: "security_bug",
    language: "Python",
    difficulty: 8,
    title: "JWT Missing Expire / Signature Alg Validation",
    description: "Decoding JWT token with verify_signature=False or missing expiration verification.",
    code: `jwt.decode(token, options={"verify_signature": False}) # Disables cryptographic verification!`,
    options: [
      "Always verify cryptographic signature and expiration: jwt.decode(token, key=SECRET, algorithms=['HS256'], options={'verify_exp': True})",
      "verify_signature=False improves performance safely",
      "Use base64 decode only",
      "Tokens never expire in JWT standard"
    ],
    correctOption: 0,
    explanation: "WHAT: Signature verification bypass. WHY: Disabling signature verification allows anyone to forge token payloads and claim arbitrary admin identities. HOW: Always verify signatures with secret/public keys.",
    basePoints: 175,
    tags: ["python", "jwt", "authentication", "security"]
  },
  {
    id: "sec-22",
    mode: "security_bug",
    language: "C++",
    difficulty: 8,
    title: "Format String Vulnerability in printf",
    description: "Passing untrusted user input as the format string parameter to printf() enables memory reading and arbitrary write via %n.",
    code: `void logMessage(const char* userMsg) {\n    printf(userMsg); // Bug: userMsg is treated as format string!\n}`,
    options: [
      "Use format specifier: printf(\"%s\", userMsg);",
      "Use sprintf instead",
      "Cast userMsg to (int*)",
      "Check length of userMsg"
    ],
    correctOption: 0,
    explanation: "WHAT: Format String Vulnerability (CWE-134). WHY: If `userMsg` contains `%x` or `%n`, `printf` reads stack values or writes byte counts to memory addresses pointed to by stack entries. HOW: Always pass literal format string: `printf(\"%s\", userMsg);`.",
    basePoints: 175,
    tags: ["cpp", "format_string", "printf", "memory_safety"]
  },
  {
    id: "sec-23",
    mode: "security_bug",
    language: "Java",
    difficulty: 8,
    title: "LDAP Injection via Dynamic Filter String Construction",
    description: "Building LDAP search filter via raw string concatenation allows unauthorized directory traversal.",
    code: `String filter = "(&(uid=" + user + ")(userPassword=" + pass + "))"; // LDAP Injection!\nNamingEnumeration results = ctx.search("ou=users,dc=org", filter, controls);`,
    options: [
      "Use parameterized search filter expressions or encode special LDAP characters: ctx.search(base, \"(&(uid={0})(userPassword={1}))\", new Object[]{user, pass}, controls)",
      "Strip spaces from user input",
      "LDAP is not vulnerable to injection",
      "Convert user to uppercase"
    ],
    correctOption: 0,
    explanation: "WHAT: LDAP Injection. WHY: Special LDAP operators (`*`, `(`, `)`, `&`, `|`) in user input alter the boolean logic of directory queries. HOW: Use parameterized filters (`{0}`) or escape RFC 4515 characters.",
    basePoints: 175,
    tags: ["java", "ldap", "injection", "security"]
  },
  {
    id: "sec-24",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 8,
    title: "Regular Expression / JSON Replay ReDoS via Non-Constant Hash Lookup",
    description: "Object key lookups used as dynamic authorization role checks without hasOwnProperty guard.",
    code: `const rolePermissions = { admin: ['read', 'write'], user: ['read'] };\nfunction checkAccess(role, action) {\n  return rolePermissions[role].includes(action); // role = 'toString' / '__proto__' causes TypeError / bypass!\n}`,
    options: [
      "Check with Object.hasOwn(rolePermissions, role) or use a Map (new Map()) with map.has()",
      "rolePermissions[role] should be rolePermissions.role",
      "Convert role to an array",
      "Use eval(role)"
    ],
    correctOption: 0,
    explanation: "WHAT: Object prototype property lookup pollution. WHY: Accessing `rolePermissions['toString']` returns `Function.prototype.toString`, which is not an array, causing `TypeError: .includes is not a function`. HOW: Use `Object.hasOwn()` or `new Map()`.",
    basePoints: 175,
    tags: ["javascript", "prototype", "authorization", "security"]
  },
  {
    id: "sec-25",
    mode: "security_bug",
    language: "Python",
    difficulty: 9,
    title: "Timing Attack on Cryptographic Token Comparison",
    description: "Comparing reset token or API key with standard string comparison leaks character matches via execution duration.",
    code: `def verify_token(user_token, correct_token):\n    return user_token == correct_token # Non-constant time comparison!`,
    options: [
      "Use secrets.compare_digest(user_token, correct_token) or hmac.compare_digest()",
      "Hash both tokens with SHA256 then use ==",
      "Pad both strings with random bytes",
      "Compare lengths only"
    ],
    correctOption: 0,
    explanation: "WHAT: Timing Attack in secret verification. WHY: String `==` returns `False` immediately upon the first non-matching character, allowing attackers to measure microsecond latency differences to determine correct bytes one by one. HOW: Use `secrets.compare_digest()`.",
    basePoints: 190,
    tags: ["python", "timing_attack", "cryptography", "secrets"]
  },
  {
    id: "sec-26",
    mode: "security_bug",
    language: "C++",
    difficulty: 9,
    title: "Use-After-Free (UAF) via Dangling Pointer",
    description: "Pointer to heap memory is retained and dereferenced after free(), allowing heap corruption / exploit.",
    code: `Widget* w = new Widget();\ndelete w;\n// ...\nw->doWork(); // Use-After-Free bug!`,
    options: [
      "Set pointer to nullptr immediately after delete (w = nullptr;) or use std::unique_ptr / std::shared_ptr",
      "delete w should be delete[] w",
      "Allocate w on the stack",
      "Call free(w) after delete w"
    ],
    correctOption: 0,
    explanation: "WHAT: Use-After-Free (CWE-416). WHY: The memory at `w` has been returned to the heap manager and may be re-allocated for different data. Calling methods on it executes arbitrary code or corrupts heap metadata. HOW: Use smart pointers and nullify dangling raw pointers.",
    basePoints: 190,
    tags: ["cpp", "uaf", "memory_safety", "pointers"]
  },
  {
    id: "sec-27",
    mode: "security_bug",
    language: "Java",
    difficulty: 9,
    title: "Cryptographic Salt Reuse / Static Salt in PBKDF2",
    description: "Using hardcoded static salt across all users allows attackers to generate precomputed rainbow tables.",
    code: `private static final byte[] SALT = "static_salt_123".getBytes();\nKeySpec spec = new PBEKeySpec(password, SALT, 65536, 128);`,
    options: [
      "Generate a unique cryptographically random salt (SecureRandom) for EVERY user and store salt alongside hash",
      "Salt should be omitted completely",
      "Salt must be identical to username",
      "Increase iterations to 1,000,000 with static salt"
    ],
    correctOption: 0,
    explanation: "WHAT: Static Salt in Password Hashing. WHY: Salts prevent multi-target and rainbow table attacks. Reusing a static salt across all accounts allows an attacker to crack all matching passwords simultaneously. HOW: Generate 16+ bytes random salt per user using `SecureRandom`.",
    basePoints: 190,
    tags: ["java", "pbkdf2", "cryptography", "salt", "passwords"]
  },
  {
    id: "sec-28",
    mode: "security_bug",
    language: "JavaScript",
    difficulty: 10,
    title: "PostMessage Missing Origin Validation",
    description: "Window message event listener processes sensitive commands without checking event.origin.",
    code: `window.addEventListener('message', (event) => {\n  // Bug: missing if (event.origin !== 'https://trusted.com') return;\n  if (event.data.action === 'transferFunds') {\n    executeTransfer(event.data.amount);\n  }\n});`,
    options: [
      "Always verify message origin: if (event.origin !== 'https://trusted-domain.com') return;",
      "Use event.source instead of event.origin",
      "event.data is automatically encrypted by browser",
      "Disable postMessage in web workers"
    ],
    correctOption: 0,
    explanation: "WHAT: Insecure Cross-Origin Communication via postMessage (CWE-345). WHY: Any website loaded in another tab/iframe can send messages to your window using `targetWindow.postMessage()`. Without validating `event.origin`, unauthorized domains can execute actions. HOW: Check `event.origin`.",
    basePoints: 200,
    tags: ["javascript", "postmessage", "origin", "web_security"]
  },
  {
    id: "sec-29",
    mode: "security_bug",
    language: "Python",
    difficulty: 10,
    title: "YAML Unsafe Deserialization with PyYAML",
    description: "Loading untrusted YAML using yaml.load() without Loader=yaml.SafeLoader executes Python code.",
    code: `import yaml\nconfig = yaml.load(user_input) # Vulnerable to !!python/object/apply:os.system!`,
    options: [
      "Use yaml.safe_load(user_input) or yaml.load(user_input, Loader=yaml.SafeLoader)",
      "yaml.load is safe in Python 3",
      "Convert YAML to JSON before loading",
      "Validate user_input with regex"
    ],
    correctOption: 0,
    explanation: "WHAT: PyYAML Remote Code Execution. WHY: Standard `yaml.load()` supports full Python class instantiation tags (`!!python/object/...`), allowing arbitrary command execution. HOW: Always use `yaml.safe_load()`.",
    basePoints: 200,
    tags: ["python", "yaml", "deserialization", "rce"]
  },
  {
    id: "sec-30",
    mode: "security_bug",
    language: "C++",
    difficulty: 10,
    title: "Double Free in Exception Handling Paths",
    description: "Raw pointer is freed in catch block and again in subsequent cleanup code.",
    code: `char* buf = (char*)malloc(1024);\ntry {\n    process(buf);\n} catch (...) {\n    free(buf);\n    throw;\n}\nfree(buf); // If exception is handled higher up, buf is freed twice!`,
    options: [
      "Use RAII wrappers (std::unique_ptr with custom deleter or std::vector) so resources are freed exactly once upon stack unwinding",
      "buf = NULL in catch block before throw",
      "Both A and B are valid fixes",
      "Double free is ignored by modern OS kernels"
    ],
    correctOption: 2,
    explanation: "WHAT: Double Free Vulnerability (CWE-415). WHY: Freeing memory twice corrupts heap chunk metadata (fastbins/tcache), enabling heap exploitation. HOW: Use RAII (`std::unique_ptr`) or set `buf = nullptr`.",
    basePoints: 200,
    tags: ["cpp", "double_free", "heap", "raii", "memory_safety"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SECURITY_BUG_BANK };
}
