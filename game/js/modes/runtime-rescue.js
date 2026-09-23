/**
 * Code Debugger - Mode 4: Runtime Rescue (30 Challenges)
 * Diagnose fatal exceptions, stack traces, and runtime crashes across Python, C++, Java, JS, SQL.
 */

const RUNTIME_RESCUE_BANK = [
  {
    id: "rr-01",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 1,
    title: "Dictionary Missing Key Lookup",
    description: "Looking up user role raises KeyError when role key is not configured.",
    code: `def get_user_role(profile):\n    return profile['role']`,
    runtimeError: "KeyError: 'role'",
    options: [
      "profile['role'] should be profile.get('role', 'guest') to safely handle missing keys",
      "profile must be a tuple instead of dict",
      "KeyError is caused by Python memory exhaustion",
      "profile['role'] must be converted to int"
    ],
    correctOption: 0,
    explanation: "WHAT: KeyError on missing key. WHY: Bracket indexing on dicts raises KeyError if key is missing. HOW: Use `.get('role', default)`.",
    basePoints: 75,
    tags: ["python", "dict", "exceptions"]
  },
  {
    id: "rr-02",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 1,
    title: "Cannot Read Property of Undefined",
    description: "Accessing street address throws TypeError when address object is null.",
    code: `function getStreet(user) {\n  return user.address.street;\n}`,
    runtimeError: "TypeError: Cannot read properties of undefined (reading 'street')",
    options: [
      "Use optional chaining user?.address?.street to guard against null/undefined parent",
      "user.address.street must be called as a function",
      "JavaScript does not allow nested properties",
      "getStreet must be declared with let"
    ],
    correctOption: 0,
    explanation: "WHAT: TypeError reading undefined. WHY: If `user.address` is undefined, `.street` throws. HOW: Use optional chaining `user?.address?.street`.",
    basePoints: 75,
    tags: ["javascript", "null", "runtime"]
  },
  {
    id: "rr-03",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 2,
    title: "Array Index Out Of Bounds",
    description: "Reading the last element from data array throws ArrayIndexOutOfBoundsException.",
    code: `public int getLastElement(int[] data) {\n    return data[data.length];\n}`,
    runtimeError: "java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5",
    options: [
      "Valid indices range from 0 to data.length - 1; data[data.length] is 1 past the end",
      "int[] data cannot be accessed with square brackets",
      "data.length should be data.size()",
      "Arrays in Java cannot hold 5 items"
    ],
    correctOption: 0,
    explanation: "WHAT: ArrayIndexOutOfBoundsException. WHY: Zero-indexed arrays end at `length - 1`. HOW: Access `data[data.length - 1]`.",
    basePoints: 100,
    tags: ["java", "arrays", "runtime"]
  },
  {
    id: "rr-04",
    mode: "runtime_rescue",
    language: "C++",
    difficulty: 2,
    title: "Vector Out of Range Exception",
    description: "Calling config.at(10) throws std::out_of_range on a vector of size 5.",
    code: `int getParam(const std::vector<int>& config, size_t idx) {\n    return config.at(idx);\n}`,
    runtimeError: "terminate called after throwing an instance of 'std::out_of_range'",
    options: [
      "idx is >= config.size(); bounds check if (idx < config.size()) is required",
      "std::vector::at only accepts negative numbers",
      "config must be passed by pointer",
      "C++ vectors cannot store integers"
    ],
    correctOption: 0,
    explanation: "WHAT: std::out_of_range. WHY: `.at()` performs bounds checking and throws if `idx >= size()`. HOW: Verify `idx < config.size()` before lookup.",
    basePoints: 100,
    tags: ["cpp", "vector", "exceptions"]
  },
  {
    id: "rr-05",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 2,
    title: "Division by Zero Exception",
    description: "Dividing total by items_count crashes when count is 0.",
    code: `def get_average(total, count):\n    return total / count`,
    runtimeError: "ZeroDivisionError: division by zero",
    options: [
      "Check if count == 0 before division: return total / count if count else 0",
      "total / count should be total // count",
      "ZeroDivisionError cannot be prevented",
      "count must be a float"
    ],
    correctOption: 0,
    explanation: "WHAT: ZeroDivisionError. WHY: Division by zero is mathematically undefined. HOW: Add guard `if count == 0: return 0`.",
    basePoints: 100,
    tags: ["python", "math", "exceptions"]
  },
  {
    id: "rr-06",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 3,
    title: "Assignment to Constant Variable",
    description: "Reassigning score declared with const throws TypeError.",
    code: `const score = 100;\nscore = 200;`,
    runtimeError: "TypeError: Assignment to constant variable.",
    options: [
      "Variables declared with const cannot be reassigned; declare with let instead",
      "score = 200 must use const again",
      "100 cannot be changed to 200",
      "score must be wrapped in quotes"
    ],
    correctOption: 0,
    explanation: "WHAT: TypeError reassigning constant. WHY: `const` variables are immutable references. HOW: Declare with `let score = 100;`.",
    basePoints: 125,
    tags: ["javascript", "variables", "const"]
  },
  {
    id: "rr-07",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 3,
    title: "Number Format Exception on Bad String",
    description: "Parsing '123a' as an integer throws NumberFormatException.",
    code: `int val = Integer.parseInt("123a");`,
    runtimeError: "java.lang.NumberFormatException: For input string: \"123a\"",
    options: [
      "Input contains non-digit character 'a'; must sanitize input or wrap in try-catch block",
      "Integer.parseInt only accepts 2-digit numbers",
      "\"123a\" must be converted to double",
      "int val cannot hold 123"
    ],
    correctOption: 0,
    explanation: "WHAT: NumberFormatException. WHY: `Integer.parseInt` expects valid numeric digits only. HOW: Catch `NumberFormatException` or validate with regex.",
    basePoints: 125,
    tags: ["java", "parsing", "exceptions"]
  },
  {
    id: "rr-08",
    mode: "runtime_rescue",
    language: "C++",
    difficulty: 3,
    title: "Null Pointer Segmentation Fault",
    description: "Dereferencing uninitialized pointer crashes program with SIGSEGV.",
    code: `int* ptr = nullptr;\n*ptr = 42;`,
    options: [
      "Dereferencing nullptr is undefined behavior and triggers segmentation fault; allocate memory before writing",
      "*ptr = 42 must be ptr = 42",
      "int* cannot point to 42",
      "nullptr is invalid in C++"
    ],
    correctOption: 0,
    explanation: "WHAT: Null pointer dereference crash. WHY: Writing to address 0 (nullptr) is prohibited by OS memory protection. HOW: Point `ptr` to a valid memory address before dereferencing.",
    basePoints: 125,
    tags: ["cpp", "pointers", "segfault"]
  },
  {
    id: "rr-09",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 4,
    title: "IndexError on Empty Pop",
    description: "Popping from an empty list raises IndexError: pop from empty list.",
    code: `items = []\nlast = items.pop()`,
    runtimeError: "IndexError: pop from empty list",
    options: [
      "Verify items is not empty (if items:) before calling pop()",
      "items.pop() requires passing an integer index",
      "Empty lists cannot be created in Python",
      "last must be declared with let"
    ],
    correctOption: 0,
    explanation: "WHAT: IndexError popping empty list. WHY: Cannot extract elements from a zero-length list. HOW: Guard with `if items: last = items.pop()`.",
    basePoints: 150,
    tags: ["python", "lists", "exceptions"]
  },
  {
    id: "rr-10",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 4,
    title: "Calling Non-Function Object as Function",
    description: "Invoking user.getName() when getName is a string property throws TypeError.",
    code: `const user = { getName: "Alice" };\nuser.getName();`,
    runtimeError: "TypeError: user.getName is not a function",
    options: [
      "getName is a string property, not a callable function; access with user.getName (no parentheses)",
      "user object must be created with new User()",
      "Alice must be inside brackets",
      "getName is a reserved keyword"
    ],
    correctOption: 0,
    explanation: "WHAT: TypeError on non-function call. WHY: `getName` is a string value. HOW: Access property without `()`: `user.getName`.",
    basePoints: 150,
    tags: ["javascript", "functions", "objects"]
  },
  {
    id: "rr-11",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 4,
    title: "ClassCastException on Incompatible Type",
    description: "Casting Integer to String object throws ClassCastException.",
    code: `Object num = 42;\nString text = (String) num;`,
    runtimeError: "java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String",
    options: [
      "Integer cannot be cast to String; use String.valueOf(num) or num.toString()",
      "Object num = 42 is invalid syntax",
      "String text must be declared Object text",
      "42 is too large for Object"
    ],
    correctOption: 0,
    explanation: "WHAT: ClassCastException. WHY: `Integer` and `String` are unrelated object hierarchies. HOW: Convert with `String.valueOf(num)`.",
    basePoints: 150,
    tags: ["java", "casting", "types"]
  },
  {
    id: "rr-12",
    mode: "runtime_rescue",
    language: "C++",
    difficulty: 5,
    title: "Divide by Zero Signal Float Exception",
    description: "Integer division by zero triggers SIGFPE crash.",
    code: `int a = 10, b = 0;\nint c = a / b;`,
    runtimeError: "Program terminated with signal SIGFPE, Arithmetic exception.",
    options: [
      "Integer division by zero is undefined behavior in C++ causing hardware trap signal; check b != 0",
      "a / b must be a % b",
      "int c must be double c",
      "10 cannot be divided in C++"
    ],
    correctOption: 0,
    explanation: "WHAT: SIGFPE arithmetic crash. WHY: CPUs trap on integer division by zero. HOW: Guard with `if (b != 0) c = a / b;`.",
    basePoints: 175,
    tags: ["cpp", "math", "signals"]
  },
  {
    id: "rr-13",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 5,
    title: "Recursion Limit Exceeded",
    description: "Traversing linked nodes crashes with RecursionError.",
    code: `def count_nodes(node):\n    return 1 + count_nodes(node.next)`,
    runtimeError: "RecursionError: maximum recursion depth exceeded",
    options: [
      "Missing base case when node is None (or circular references exist)",
      "Python recursion only supports numbers, not objects",
      "1 + count_nodes requires int casting",
      "node.next is illegal syntax"
    ],
    correctOption: 0,
    explanation: "WHAT: Infinite recursion. WHY: No base case `if node is None: return 0`. HOW: Add terminal check before recursing.",
    basePoints: 175,
    tags: ["python", "recursion", "runtime"]
  },
  {
    id: "rr-14",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 5,
    title: "Uncaught Promise Rejection Error",
    description: "Rejected promise without catch handler triggers unhandled rejection.",
    code: `async function fetchData() {\n  throw new Error("Server Offline");\n}\nfetchData(); // no catch handler`,
    runtimeError: "UnhandledPromiseRejection: Unhandled promise rejection: Error: Server Offline",
    options: [
      "Async function rejection must be handled with .catch(err => ...) or try/catch with await",
      "throw new Error is not allowed in async functions",
      "Server Offline must be in quotes",
      "fetchData must be marked static"
    ],
    correctOption: 0,
    explanation: "WHAT: Unhandled Promise rejection. WHY: Promises that reject without a `.catch()` trigger unhandled exceptions. HOW: Attach `.catch(console.error)` or `await` inside `try/catch`.",
    basePoints: 175,
    tags: ["javascript", "promises", "errors"]
  },
  {
    id: "rr-15",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 6,
    title: "Null Pointer on Unboxing",
    description: "Converting Integer wrapper to primitive double throws NullPointerException.",
    code: `public double getRatio(Integer numerator, int denominator) {\n    return numerator / (double) denominator;\n}`,
    runtimeError: "java.lang.NullPointerException: Cannot invoke 'java.lang.Integer.intValue()' because 'numerator' is null",
    options: [
      "Auto-unboxing null Integer object implicitly calls intValue() which throws NPE",
      "denominator cannot be cast to double",
      "getRatio must be declared private",
      "Division by double is illegal in Java"
    ],
    correctOption: 0,
    explanation: "WHAT: NPE on auto-unboxing. WHY: Passing `null` as `Integer numerator` causes implicit `.intValue()` unboxing to fail. HOW: Check `numerator != null` first.",
    basePoints: 200,
    tags: ["java", "boxing", "npe"]
  },
  {
    id: "rr-16",
    mode: "runtime_rescue",
    language: "C++",
    difficulty: 6,
    title: "Double Free Heap Corruption",
    description: "Deleting the same allocated pointer twice corrupts the heap metadata.",
    code: `int* p = new int(10);\ndelete p;\ndelete p; // double free`,
    runtimeError: "free(): double free detected in tcache 2 / Aborted (core dumped)",
    options: [
      "Deleting an already freed pointer causes undefined behavior and heap corruption; set p = nullptr after delete",
      "new int(10) cannot be deleted",
      "delete p requires delete[] p",
      "p must be a smart pointer"
    ],
    correctOption: 0,
    explanation: "WHAT: Double free corruption. WHY: Freeing already returned heap blocks corrupts allocator freelists. HOW: Set `p = nullptr;` immediately after deleting.",
    basePoints: 200,
    tags: ["cpp", "memory", "double_free"]
  },
  {
    id: "rr-17",
    mode: "runtime_rescue",
    language: "SQL",
    difficulty: 6,
    title: "Subquery Returns Multiple Rows",
    description: "Scalar comparison in WHERE clause fails at runtime.",
    code: `SELECT name \nFROM students \nWHERE score = (SELECT score FROM students WHERE passed = 1);`,
    runtimeError: "ERROR: more than one row returned by a subquery used as an expression",
    options: [
      "= expects a single scalar value; use IN or ANY for subqueries returning multiple rows",
      "SELECT score is invalid inside parentheses",
      "WHERE passed = 1 must be WHERE passed == 1",
      "students table cannot be queried twice"
    ],
    correctOption: 0,
    explanation: "WHAT: Multi-row subquery in scalar expression. WHY: The subquery returns multiple scores, but `=` requires a single value. HOW: Use `WHERE score IN (...)`.",
    basePoints: 200,
    tags: ["sql", "subqueries", "exceptions"]
  },
  {
    id: "rr-18",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 7,
    title: "UnboundLocalError in Nested Scope",
    description: "Reading and incrementing global counter crashes with UnboundLocalError.",
    code: `counter = 0\ndef increment():\n    counter += 1\n    return counter`,
    runtimeError: "UnboundLocalError: cannot access local variable 'counter' where it is not associated with a value",
    options: [
      "Assigning to counter makes it a local variable; missing `global counter` declaration",
      "counter += 1 cannot be used inside functions",
      "counter must be defined inside a class",
      "Python does not support integers outside functions"
    ],
    correctOption: 0,
    explanation: "WHAT: UnboundLocalError. WHY: Any assignment inside a function marks that variable as local for the whole scope. HOW: Add `global counter` (or use a state container).",
    basePoints: 225,
    tags: ["python", "scope", "variables"]
  },
  {
    id: "rr-19",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 7,
    title: "JSON Parse Syntax Error",
    description: "Parsing server response throws unexpected token in JSON at position 0.",
    code: `function parseResponse(raw) {\n  return JSON.parse(raw);\n}`,
    runtimeError: "SyntaxError: Unexpected token '<', '<!DOCTYPE '... is not valid JSON",
    options: [
      "Server returned an HTML error page (e.g. 404/500) instead of a JSON string",
      "JSON.parse cannot parse strings in JavaScript",
      "raw must be an ArrayBuffer",
      "JSON.parse requires a callback function"
    ],
    correctOption: 0,
    explanation: "WHAT: SyntaxError on JSON.parse. WHY: The server returned HTML (starting with `<!DOCTYPE`) rather than JSON. HOW: Check `response.ok` / content-type header before parsing.",
    basePoints: 225,
    tags: ["javascript", "json", "api"]
  },
  {
    id: "rr-20",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 7,
    title: "Array Store Exception on Type Incompatibility",
    description: "Storing Integer into Object[] array holding String instances crashes JVM.",
    code: `Object[] arr = new String[5];\narr[0] = 100; // storing Integer`,
    runtimeError: "java.lang.ArrayStoreException: java.lang.Integer",
    options: [
      "Array covariant typing: actual runtime array type is String[]; storing Integer violates component type",
      "Object[] cannot hold 5 items",
      "100 must be cast to (Object)",
      "ArrayStoreException is a checked exception"
    ],
    correctOption: 0,
    explanation: "WHAT: ArrayStoreException on covariant array. WHY: `arr` is backed by `String[]`. At runtime, storing an `Integer` fails type verification. HOW: Use `Object[] arr = new Object[5];`.",
    basePoints: 225,
    tags: ["java", "arrays", "covariance"]
  },
  {
    id: "rr-21",
    mode: "runtime_rescue",
    language: "C++",
    difficulty: 8,
    title: "Pure Virtual Method Call",
    description: "Calling virtual method inside base class constructor crashes program.",
    code: `class Shape {\npublic:\n    Shape() { draw(); }\n    virtual void draw() = 0;\n};`,
    runtimeError: "pure virtual method called / terminate called",
    options: [
      "Calling pure virtual functions inside constructor before derived class is initialized",
      "virtual functions cannot be declared with = 0",
      "Shape constructor must be private",
      "C++ does not support abstract classes"
    ],
    correctOption: 0,
    explanation: "WHAT: Pure virtual function call in ctor. WHY: During base class construction, derived vtable is not yet constructed. HOW: Do not call virtual methods from constructors.",
    basePoints: 250,
    tags: ["cpp", "oop", "vtable"]
  },
  {
    id: "rr-22",
    mode: "runtime_rescue",
    language: "SQL",
    difficulty: 8,
    title: "Duplicate Key Violates Unique Constraint",
    description: "Inserting existing primary key value crashes transaction.",
    code: `INSERT INTO users (id, email) VALUES (1, 'duplicate@example.com');`,
    runtimeError: "ERROR: duplicate key value violates unique constraint \"users_pkey\"",
    options: [
      "Primary key ID 1 already exists; use auto-increment sequence or ON CONFLICT DO UPDATE (UPSERT)",
      "users table cannot have email column",
      "VALUES cannot contain quotes",
      "INSERT INTO must specify all table columns"
    ],
    correctOption: 0,
    explanation: "WHAT: Unique constraint violation. WHY: Primary keys must be unique. HOW: Omit `id` (use auto-increment) or use `ON CONFLICT (id) DO UPDATE ...`.",
    basePoints: 250,
    tags: ["sql", "primary_key", "constraints"]
  },
  {
    id: "rr-23",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 8,
    title: "TypeError Unhashable Type Dict as Key",
    description: "Using dictionary as dictionary key or set element raises TypeError.",
    code: `lookup = {}\nuser_config = {'theme': 'dark'}\nlookup[user_config] = 'Active'`,
    runtimeError: "TypeError: unhashable type: 'dict'",
    options: [
      "Mutable dictionaries are unhashable and cannot be dict keys or set elements; convert to frozenset/tuple",
      "lookup must be a list",
      "'Active' is invalid dictionary value",
      "user_config requires int keys"
    ],
    correctOption: 0,
    explanation: "WHAT: TypeError unhashable type. WHY: Dicts are mutable and lack `__hash__`. HOW: Convert to immutable `tuple(user_config.items())` or `frozenset`.",
    basePoints: 250,
    tags: ["python", "hash", "dict"]
  },
  {
    id: "rr-24",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 8,
    title: "Maximum Call Stack Size Exceeded",
    description: "Deep recursive loop without trampoline or base case crashes JavaScript engine.",
    code: `function loop(n) {\n  return loop(n + 1);\n}\nloop(1);`,
    runtimeError: "RangeError: Maximum call stack size exceeded",
    options: [
      "Infinite recursion fills call stack memory; add base termination condition or convert to iterative while loop",
      "loop(1) must start at 0",
      "n + 1 is invalid syntax in JavaScript",
      "Functions named loop are forbidden"
    ],
    correctOption: 0,
    explanation: "WHAT: Stack overflow RangeError. WHY: Unlimited recursive stack frames exhaust JS stack memory. HOW: Add a termination condition or convert to `while` loop.",
    basePoints: 250,
    tags: ["javascript", "stack_overflow", "recursion"]
  },
  {
    id: "rr-25",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 8,
    title: "NoSuchElementException on Empty Iterator",
    description: "Calling iterator.next() without hasNext() check throws exception.",
    code: `Iterator<String> it = list.iterator();\nwhile (true) {\n    String val = it.next();\n}`,
    runtimeError: "java.util.NoSuchElementException",
    options: [
      "Calling next() when iterator has reached the end throws NoSuchElementException; guard with while (it.hasNext())",
      "list.iterator() is deprecated in Java",
      "String val must be Object val",
      "while (true) cannot contain iterators"
    ],
    correctOption: 0,
    explanation: "WHAT: NoSuchElementException. WHY: Calling `.next()` when empty crashes. HOW: Use `while (it.hasNext())`.",
    basePoints: 250,
    tags: ["java", "iterators", "exceptions"]
  },
  {
    id: "rr-26",
    mode: "runtime_rescue",
    language: "C++",
    difficulty: 9,
    title: "Bad Any Cast Exception",
    description: "Casting std::any holding int to std::string throws std::bad_any_cast.",
    code: `std::any a = 42;\nstd::string s = std::any_cast<std::string>(a);`,
    runtimeError: "terminate called after throwing an instance of 'std::bad_any_cast'",
    options: [
      "std::any holds int type; casting to incompatible std::string type throws std::bad_any_cast",
      "std::any cannot store integers",
      "std::any_cast only works on pointers",
      "a must be declared with auto"
    ],
    correctOption: 0,
    explanation: "WHAT: std::bad_any_cast. WHY: Target type does not match stored type `int`. HOW: Cast with `std::any_cast<int>(a)` or check `a.type() == typeid(int)`.",
    basePoints: 275,
    tags: ["cpp", "any", "types"]
  },
  {
    id: "rr-27",
    mode: "runtime_rescue",
    language: "Python",
    difficulty: 9,
    title: "StopIteration in Coroutine / Generator",
    description: "Raising StopIteration inside generator in Python 3.7+ converts to RuntimeError.",
    code: `def my_gen():\n    raise StopIteration\nlist(my_gen())`,
    runtimeError: "RuntimeError: generator raised StopIteration",
    options: [
      "In Python 3.7+ (PEP 479), explicitly raising StopIteration inside generators causes RuntimeError; use return instead",
      "my_gen must be a class",
      "list() cannot take generators",
      "StopIteration cannot be raised in Python"
    ],
    correctOption: 0,
    explanation: "WHAT: PEP 479 generator RuntimeError. WHY: Explicitly raising `StopIteration` inside a generator is illegal in modern Python. HOW: Use `return` to terminate generator.",
    basePoints: 275,
    tags: ["python", "generators", "pep479"]
  },
  {
    id: "rr-28",
    mode: "runtime_rescue",
    language: "JavaScript",
    difficulty: 9,
    title: "Invalid Array Length RangeError",
    description: "Creating array with negative or excessive length throws RangeError.",
    code: `const arr = new Array(-1);`,
    runtimeError: "RangeError: Invalid array length",
    options: [
      "Array constructor parameter must be non-negative integer between 0 and 2^32 - 1",
      "new Array is forbidden in ES6",
      "-1 must be in quotes '-1'",
      "const arr must be let arr"
    ],
    correctOption: 0,
    explanation: "WHAT: Invalid array length RangeError. WHY: Array length cannot be negative. HOW: Pass non-negative size `new Array(0)`.",
    basePoints: 275,
    tags: ["javascript", "arrays", "range_error"]
  },
  {
    id: "rr-29",
    mode: "runtime_rescue",
    language: "SQL",
    difficulty: 9,
    title: "Division by Zero in SQL Calculation",
    description: "Calculating conversion rate when clicks is 0 aborts query with division by zero error.",
    code: `SELECT conversions / clicks FROM ad_campaigns;`,
    runtimeError: "ERROR: division by zero",
    options: [
      "Use NULLIF(clicks, 0) to convert 0 clicks to NULL (preventing division by zero crash)",
      "ad_campaigns table cannot perform division",
      "conversions must be cast to text",
      "SELECT requires WHERE clause"
    ],
    correctOption: 0,
    explanation: "WHAT: SQL division by zero. WHY: When `clicks` is 0, query fails. HOW: Use `conversions / NULLIF(clicks, 0)`.",
    basePoints: 275,
    tags: ["sql", "math", "nullif"]
  },
  {
    id: "rr-30",
    mode: "runtime_rescue",
    language: "Java",
    difficulty: 10,
    title: "StackOverflowError in Cyclic Object ToString",
    description: "Mutual circular references between Parent and Child toString() causes stack overflow.",
    code: `class Parent { Child c; public String toString() { return "Parent:" + c; } }\nclass Child { Parent p; public String toString() { return "Child:" + p; } }`,
    runtimeError: "java.lang.StackOverflowError",
    options: [
      "Parent.toString() calls Child.toString() which calls Parent.toString() infinitely in circular loop",
      "toString cannot return strings with colons",
      "Child cannot have Parent reference",
      "StackOverflowError is a checked exception"
    ],
    correctOption: 0,
    explanation: "WHAT: StackOverflowError in recursive toString. WHY: Infinite ping-pong between `Parent.toString()` and `Child.toString()`. HOW: Omit circular references from `toString()`.",
    basePoints: 300,
    tags: ["java", "recursion", "stack_overflow"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RUNTIME_RESCUE_BANK };
}
