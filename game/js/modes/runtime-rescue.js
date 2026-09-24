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
      "Convert profile dictionary into an immutable tuple structure",
      "Use safe dictionary fallback lookup: profile.get('role', 'guest')",
      "KeyError indicates system virtual memory is completely exhausted",
      "Cast the returned key value explicitly to integer: int(profile['role'])"
    ],
    correctOption: 1,
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
      "Employ optional chaining: return user?.address?.street to prevent errors",
      "Invoke address lookup as a function: return user.address.street() instead",
      "JavaScript strict mode prohibits accessing any nested object properties",
      "Declare the top-level getStreet function identifier using let keyword"
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
      "Java primitive arrays cannot be indexed using standard square brackets",
      "Replace data.length property access with collection method data.size()",
      "Indices run 0 to length - 1; read data[data.length - 1] for last element",
      "Fixed-size primitive arrays in Java cannot store five or more elements"
    ],
    correctOption: 2,
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
      "Bounds check idx < config.size() before accessing elements with at()",
      "std::vector::at exclusively accepts negative offsets in standard C++",
      "Pass vector container config by raw unmanaged pointer rather than ref",
      "Standard vector containers in C++ cannot store signed primitive integers"
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
      "Replace standard float division total / count with floor division //",
      "Guard against zero denominator: return total / count if count else 0",
      "ZeroDivisionError cannot be handled or prevented in standard Python",
      "Convert denominator count parameter explicitly to 64-bit float type"
    ],
    correctOption: 1,
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
    options: [
      "Re-declare score on assignment using const score = 200 in local scope",
      "Enclose numeric assignment score = '200' in string quotes to mutate",
      "Declare score with let: let score = 100 to allow variable reassignment",
      "Values declared as integer numbers cannot be changed after declaration"
    ],
    correctOption: 2,
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
      "Integer.parseInt exclusively supports strings containing up to two digits",
      "Cast input string literal \"123a\" directly to double primitive variable",
      "Input contains non-digit 'a'; sanitize string or catch NumberFormatException",
      "Primitive variable int val cannot hold numbers exceeding two decimal digits"
    ],
    correctOption: 2,
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
      "Dereferencing nullptr is undefined behavior; allocate memory before writing",
      "Assign address directly via ptr = 42 without dereference asterisk operator",
      "Pointers to primitive int* cannot store numerical value 42 in C++ memory",
      "Literal nullptr keyword is not supported in modern standard ISO C++"
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
      "Method items.pop() requires passing an integer index parameter explicitly",
      "Guard before popping: check if items: last = items.pop() to prevent errors",
      "Empty lists cannot be initialized without at least one default placeholder",
      "Declare return variable last using JavaScript let keyword declaration"
    ],
    correctOption: 1,
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
      "Instantiate user object using new User() constructor function invocation",
      "Enclose string literal value in array brackets: getName: [\"Alice\"]",
      "Identifier getName is a reserved ECMAScript keyword in strict mode",
      "getName is a string property, not a function; access as user.getName"
    ],
    correctOption: 3,
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
      "Integer cannot cast to String; use String.valueOf(num) or num.toString()",
      "Assigning primitive int to Object variable is invalid syntax in Java",
      "Declare variable text with Object text type to avoid type mismatch",
      "Numerical value 42 exceeds maximum allowable memory bounds for Object"
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
      "Replace division operator with modulo operation: int c = a % b in code",
      "Integer division by zero triggers hardware trap; check if (b != 0) first",
      "Declare result variable c as double c to enable IEEE floating division",
      "Integer constant 10 cannot be divided by variables in C++ runtime"
    ],
    correctOption: 1,
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
      "Python recursion only supports numbers, not custom object instances",
      "Cast addition expression explicitly with int(1 + count_nodes(node.next))",
      "Add base case: return 0 if node is None to terminate recursion properly",
      "Attribute lookup node.next is illegal syntax in Python function scope"
    ],
    correctOption: 2,
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
      "Handle promise rejection with .catch(err => ...) or try/catch with await",
      "Keywords throw new Error are not permitted inside asynchronous functions",
      "Error description string literal 'Server Offline' must use backticks",
      "Declare fetchData function as a static member of a class declaration"
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
      "Primitive denominator parameter cannot be cast to double in Java",
      "Auto-unboxing null Integer calls intValue() throwing NPE; check != null",
      "Method getRatio must be declared with private access modifier in class",
      "Division by double primitive type is illegal in standard Java runtime"
    ],
    correctOption: 1,
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
      "Pointers allocated with new int(10) cannot be manually freed with delete",
      "Array deallocation delete[] p must be used for all heap pointer types",
      "Deleting already freed pointer corrupts heap; assign p = nullptr after free",
      "Raw pointer p must be wrapped in a static volatile storage duration class"
    ],
    correctOption: 2,
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
      "Use IN or ANY operator instead of = when subqueries return multiple rows",
      "Nested SELECT queries are forbidden inside SQL WHERE clause expressions",
      "Comparison operator WHERE passed = 1 must use double equals operator ==",
      "The students database table cannot be referenced twice in a single query"
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
      "In-place increment counter += 1 is illegal inside Python function blocks",
      "Declare global scope: add global counter inside increment() before modifying",
      "Global variable counter must be encapsulated inside an explicit class",
      "Python runtime does not permit integers to be defined outside functions"
    ],
    correctOption: 1,
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
      "JSON.parse cannot parse string primitives without converting to object",
      "Server returned HTML error page (e.g. 404/500) instead of a JSON payload",
      "Parameter raw must be converted to an ArrayBuffer before JSON parsing",
      "JSON.parse method requires passing a reviver callback as second argument"
    ],
    correctOption: 1,
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
      "Object[] array container cannot store more than four individual elements",
      "Cast numerical integer literal explicitly using (Object) 100 assignment",
      "Runtime array is String[]; storing Integer violates array component type",
      "ArrayStoreException is a checked exception requiring explicit try-catch"
    ],
    correctOption: 2,
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
      "Virtual functions cannot be declared with pure specifier = 0 in C++",
      "Calling pure virtual method in constructor before derived vtable is ready",
      "Base class constructor Shape() must be declared with private visibility",
      "ISO C++ does not permit defining abstract classes with pure virtuals"
    ],
    correctOption: 1,
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
      "The users database table schema cannot contain an email column field",
      "SQL VALUES clause cannot contain single quoted string literal characters",
      "INSERT statement must enumerate every existing table column explicitly",
      "Primary key ID 1 exists; use auto-increment or ON CONFLICT DO UPDATE"
    ],
    correctOption: 3,
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
      "Mutable dict is unhashable; convert to immutable tuple/frozenset for keys",
      "Destination variable lookup must be instantiated as an indexed list",
      "String literal 'Active' is an invalid value type for dictionary lookups",
      "Dictionary user_config requires numerical integer keys exclusively"
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
      "Function initial invocation loop(1) must start at 0 to avoid errors",
      "Arithmetic expression n + 1 is invalid syntax in JavaScript functions",
      "Infinite recursion exhausts call stack; add base condition or while loop",
      "Function declarations named loop are reserved keywords in ECMAScript"
    ],
    correctOption: 2,
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
      "Calling next() when exhausted throws error; guard with while (it.hasNext())",
      "Method list.iterator() is deprecated in modern enterprise Java versions",
      "Target variable String val must be declared as generic Object type",
      "Loop condition while (true) cannot contain collection iterator references"
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
      "std::any container cannot store primitive signed integer data values",
      "Template std::any_cast only operates on raw pointer references in C++",
      "Variable a must be declared using the auto type deduction specifier",
      "std::any holds int; casting to std::string throws type mismatch bad_any_cast"
    ],
    correctOption: 3,
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
      "Per PEP 479, raising StopIteration in generator is illegal; use return",
      "Generator function my_gen must be implemented as a class with __iter__",
      "Built-in function list() cannot consume generator iterators directly",
      "Built-in exception StopIteration cannot be instantiated in user code"
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
      "The new Array constructor syntax is deprecated in modern ECMAScript",
      "Length parameter -1 must be passed as a string literal argument '-1'",
      "Array length argument must be a non-negative integer between 0 and 2^32 - 1",
      "Variable declaration const arr must be changed to mutable let arr"
    ],
    correctOption: 2,
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
      "The ad_campaigns table cannot perform arithmetic operations on columns",
      "Use NULLIF(clicks, 0) to convert 0 clicks to NULL and avoid division by zero",
      "Column conversions must be cast explicitly to string text type",
      "SQL SELECT statements require an explicit WHERE clause filter constraint"
    ],
    correctOption: 1,
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
      "Method toString() cannot return formatted string literals with colons",
      "Child class cannot hold an instance field reference to Parent object",
      "Parent/Child mutual toString() calls recurse infinitely; break reference cycle",
      "StackOverflowError is a checked exception requiring explicit try-catch"
    ],
    correctOption: 2,
    explanation: "WHAT: StackOverflowError in recursive toString. WHY: Infinite ping-pong between `Parent.toString()` and `Child.toString()`. HOW: Omit circular references from `toString()`.",
    basePoints: 300,
    tags: ["java", "recursion", "stack_overflow"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RUNTIME_RESCUE_BANK };
}
