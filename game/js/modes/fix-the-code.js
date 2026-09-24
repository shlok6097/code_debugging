/**
 * Code Debugger - Mode 2: Fix The Code (30 Challenges)
 * 4 explicit drop-in replacement fix snippets across Python, C++, Java, JS, SQL.
 */

const FIX_THE_CODE_BANK = [
  {
    id: "fc-01",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 1,
    title: "Fix Zero-Indexed Loop Bound",
    description: "Iterating over elements in arr causes an IndexError on the final loop iteration.",
    code: `for i in range(len(arr) + 1):\n    print(arr[i])`,
    options: [
      "for i in range(arr):",
      "for i in range(len(arr)):",
      "for i in range(len(arr) - 1):",
      "for i in range(arr.length):"
    ],
    correctOption: 1,
    explanation: "WHAT: Out of bounds index. WHY: `range(len(arr) + 1)` reaches index `len(arr)`. HOW: Replace with `range(len(arr))`.",
    basePoints: 75,
    tags: ["python", "bounds", "fix"]
  },
  {
    id: "fc-02",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 2,
    title: "Fix Object Property Lookup",
    description: "Accessing dynamic property key from userProfile returns undefined.",
    code: `function getField(userProfile, keyName) {\n  return userProfile.keyName;\n}`,
    options: [
      "return userProfile(keyName);",
      "return userProfile[keyName];",
      "return userProfile->keyName;",
      "return userProfile::keyName;"
    ],
    correctOption: 1,
    explanation: "WHAT: Dot notation literal access. WHY: `.keyName` looks for property literally named 'keyName'. HOW: Use bracket notation `userProfile[keyName]`.",
    basePoints: 100,
    tags: ["javascript", "objects", "fix"]
  },
  {
    id: "fc-03",
    mode: "fix_the_code",
    language: "Java",
    difficulty: 2,
    title: "Fix Array Length Property",
    description: "Compiling checkSize fails with 'cannot find symbol: method length()'.",
    code: `public int getArraySize(int[] values) {\n    return values.length();\n}`,
    options: [
      "return values.size();",
      "return values.length;",
      "return values.count();",
      "return sizeof(values);"
    ],
    correctOption: 1,
    explanation: "WHAT: Incorrect length syntax. WHY: Java arrays have a `.length` field, not a `.length()` method. HOW: Change to `values.length`.",
    basePoints: 100,
    tags: ["java", "arrays", "syntax"]
  },
  {
    id: "fc-04",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 2,
    title: "Fix Standard Output Stream Operator",
    description: "Compiler error on printing message to console.",
    code: `std::cout >> "Hello World" >> std::endl;`,
    options: [
      "std::cout << \"Hello World\" << std::endl;",
      "std::cout :: \"Hello World\" :: std::endl;",
      "std::cout == \"Hello World\" == std::endl;",
      "std::cout -> \"Hello World\" -> std::endl;"
    ],
    correctOption: 0,
    explanation: "WHAT: Wrong stream insertion operator. WHY: Output stream uses `<<`, while `>>` is for input extraction. HOW: Change `>>` to `<<`.",
    basePoints: 100,
    tags: ["cpp", "io", "syntax"]
  },
  {
    id: "fc-05",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 3,
    title: "Fix Integer Type Cast from User Input",
    description: "Adding 10 to input string throws TypeError.",
    code: `user_val = "25"\nresult = user_val + 10`,
    options: [
      "result = str(user_val) + 10",
      "result = user_val.toInt() + 10",
      "result = int(user_val) + 10",
      "result = (int) user_val + 10"
    ],
    correctOption: 2,
    explanation: "WHAT: Type error on addition. WHY: Strings cannot be added to integers. HOW: Cast with `int(user_val)`.",
    basePoints: 125,
    tags: ["python", "types", "casting"]
  },
  {
    id: "fc-06",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 3,
    title: "Fix String Template Literal Syntax",
    description: "Template expression is printed literally instead of interpolated.",
    code: `const name = "Alice";\nconst msg = 'Hello \${name}!';`,
    options: [
      "const msg = \"Hello \"{name}\"!\";",
      "const msg = `Hello \${name}!`;",
      "const msg = 'Hello %s' % name;",
      "const msg = ('Hello ' + \${name});"
    ],
    correctOption: 1,
    explanation: "WHAT: Single quotes used for template literal. WHY: Template interpolation requires backticks. HOW: Use backticks `` `Hello ${name}!` ``.",
    basePoints: 125,
    tags: ["javascript", "strings", "template_literals"]
  },
  {
    id: "fc-07",
    mode: "fix_the_code",
    language: "Java",
    difficulty: 3,
    title: "Fix ArrayList Generic Type Instantiation",
    description: "Creating ArrayList with primitive type fails to compile.",
    code: `List<int> numbers = new ArrayList<int>();`,
    options: [
      "List<int> numbers = new List<int>();",
      "List numbers = new int[];",
      "List<Integer> numbers = new ArrayList<Integer>();",
      "List<Primitive> numbers = new ArrayList<Primitive>();"
    ],
    correctOption: 2,
    explanation: "WHAT: Primitive generic type. WHY: Java generics require wrapper objects. HOW: Use `List<Integer>`.",
    basePoints: 125,
    tags: ["java", "generics", "collections"]
  },
  {
    id: "fc-08",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 4,
    title: "Fix Dynamic Memory Deallocation",
    description: "Memory profiling shows leaked heap memory when freeing dynamically allocated array.",
    code: `int* buffer = new int[100];\n// ... work with buffer ...\ndelete buffer;`,
    options: [
      "free(buffer);",
      "buffer.clear();",
      "drop buffer;",
      "delete[] buffer;"
    ],
    correctOption: 3,
    explanation: "WHAT: Array delete mismatch. WHY: Memory allocated with `new[]` must be released with `delete[]`. HOW: Use `delete[] buffer;`.",
    basePoints: 150,
    tags: ["cpp", "memory", "pointers"]
  },
  {
    id: "fc-09",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 4,
    title: "Fix Mutable Default Argument",
    description: "Calling add_log(msg) repeatedly accumulates messages into the same list.",
    code: `def add_log(message, logs=[]):\n    logs.append(message)\n    return logs`,
    options: [
      "def add_log(message, logs=()):\n    logs = list(logs)\n    logs.append(message)",
      "def add_log(message, logs=None):\n    if logs is None:\n        logs = []",
      "def add_log(message, logs=list):\n    logs = logs()\n    logs.append(message)",
      "def add_log(message, *logs):\n    logs = list(logs)\n    logs.append(message)"
    ],
    correctOption: 1,
    explanation: "WHAT: Mutable default argument. WHY: `[]` is created once at definition time. HOW: Use `logs=None` and initialize `logs = []` inside.",
    basePoints: 150,
    tags: ["python", "functions", "defaults"]
  },
  {
    id: "fc-10",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 4,
    title: "Fix Array Numerical Sort",
    description: "Calling [10, 5, 20, 1].sort() produces [1, 10, 20, 5] instead of ascending order.",
    code: `const sorted = [10, 5, 20, 1].sort();`,
    options: [
      "const sorted = [10, 5, 20, 1].sort(true);",
      "const sorted = [10, 5, 20, 1].sort(Number);",
      "const sorted = [10, 5, 20, 1].sort('numeric');",
      "const sorted = [10, 5, 20, 1].sort((a, b) => a - b);"
    ],
    correctOption: 3,
    explanation: "WHAT: Lexicographical sort. WHY: `.sort()` converts numbers to strings. HOW: Provide comparison comparator `(a, b) => a - b`.",
    basePoints: 150,
    tags: ["javascript", "arrays", "sort"]
  },
  {
    id: "fc-11",
    mode: "fix_the_code",
    language: "Java",
    difficulty: 5,
    title: "Fix Null String Comparison Guard",
    description: "Calling startsWith on null string throws NullPointerException.",
    code: `public boolean hasPrefix(String s, String prefix) {\n    return s.startsWith(prefix);\n}`,
    options: [
      "return s != null && s.startsWith(prefix);",
      "return (s == null) ? true : s.startsWith(prefix);",
      "return s.length() > 0 && s.startsWith(prefix);",
      "return Objects.require(s).startsWith(prefix);"
    ],
    correctOption: 0,
    explanation: "WHAT: Unchecked method call on null. WHY: If `s` is null, calling `.startsWith()` crashes. HOW: Add guard `s != null && s.startsWith(prefix)`.",
    basePoints: 175,
    tags: ["java", "strings", "null_check"]
  },
  {
    id: "fc-12",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 5,
    title: "Fix Vector Element Reserve vs Resize",
    description: "Indexing reserved vector with operator[] causes segmentation fault.",
    code: `std::vector<int> v;\nv.reserve(10);\nv[0] = 42;`,
    options: [
      "v.capacity(10);\nv[0] = 42;",
      "v.resize(10);\nv[0] = 42;",
      "v.allocate(10);\nv[0] = 42;",
      "v.push_back_at(0, 42);"
    ],
    correctOption: 1,
    explanation: "WHAT: Indexing empty reserved vector. WHY: `reserve` allocates capacity but does not create elements (size remains 0). HOW: Use `v.resize(10)` or `v.push_back(42)`.",
    basePoints: 175,
    tags: ["cpp", "vector", "memory"]
  },
  {
    id: "fc-13",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 5,
    title: "Fix List Comprehension Filter Condition",
    description: "List comprehension returns boolean list instead of filtered numbers.",
    code: `evens = [x % 2 == 0 for x in numbers]`,
    options: [
      "evens = [x == True for x in numbers if x % 2]",
      "evens = [x for x in numbers where x % 2 == 0]",
      "evens = [x for x in numbers if x % 2 == 0]",
      "evens = [filter(numbers, x % 2 == 0)]"
    ],
    correctOption: 2,
    explanation: "WHAT: Expression vs filter condition. WHY: Putting condition in expression slot yields booleans. HOW: Place `if` filter at the end: `[x for x in numbers if x % 2 == 0]`.",
    basePoints: 175,
    tags: ["python", "comprehensions", "lists"]
  },
  {
    id: "fc-14",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 6,
    title: "Fix Object Shallow Clone",
    description: "Modifying nested properties in cloned object mutates source object.",
    code: `const clone = { ...original };\nclone.settings.darkMode = true;`,
    options: [
      "const clone = structuredClone(original);",
      "const clone = Object.assign({}, original);",
      "const clone = Array.from(original);",
      "const clone = new Object(original);"
    ],
    correctOption: 0,
    explanation: "WHAT: Shallow clone nested reference sharing. WHY: Spread `{ ...obj }` only copies top-level keys. HOW: Use `structuredClone(original)` for deep cloning.",
    basePoints: 200,
    tags: ["javascript", "objects", "deep_clone"]
  },
  {
    id: "fc-15",
    mode: "fix_the_code",
    language: "Java",
    difficulty: 6,
    title: "Fix Safe List Removal During Iteration",
    description: "Removing elements in enhanced for-loop throws ConcurrentModificationException.",
    code: `for (String s : list) {\n    if (s.isEmpty()) {\n        list.remove(s);\n    }\n}`,
    options: [
      "for (int i = 0; i < list.size(); i++) { list.remove(i); }",
      "list.removeIf(String::isEmpty);",
      "list.forEach(s -> list.remove(s));",
      "synchronized(list) { for (String s : list) list.remove(s); }"
    ],
    correctOption: 1,
    explanation: "WHAT: ConcurrentModificationException. WHY: Direct `.remove()` breaks active Iterator. HOW: Use `list.removeIf(String::isEmpty);` or explicit `Iterator.remove()`.",
    basePoints: 200,
    tags: ["java", "collections", "iterators"]
  },
  {
    id: "fc-16",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 6,
    title: "Fix Unique Pointer Transfer Ownership",
    description: "Copying std::unique_ptr causes compilation error (deleted copy constructor).",
    code: `std::unique_ptr<User> u1 = std::make_unique<User>();\nstd::unique_ptr<User> u2 = u1;`,
    options: [
      "std::unique_ptr<User> u2 = &u1;",
      "std::unique_ptr<User> u2 = u1.clone();",
      "std::unique_ptr<User> u2 = std::move(u1);",
      "std::unique_ptr<User> u2 = (unique_ptr) u1;"
    ],
    correctOption: 2,
    explanation: "WHAT: Attempted copy of unique_ptr. WHY: `unique_ptr` cannot be copied. HOW: Transfer ownership with `std::move(u1)`.",
    basePoints: 200,
    tags: ["cpp", "smart_pointers", "move"]
  },
  {
    id: "fc-17",
    mode: "fix_the_code",
    language: "SQL",
    difficulty: 6,
    title: "Fix Filter on Aggregate Column",
    description: "Query fails with syntax error: 'misuse of aggregate function in WHERE clause'.",
    code: `SELECT department, COUNT(*) \nFROM employees \nWHERE COUNT(*) > 5 \nGROUP BY department;`,
    options: [
      "SELECT department, COUNT(*) FROM employees WHERE total > 5 GROUP BY department;",
      "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;",
      "SELECT department, COUNT(*) FROM employees GROUP BY department WHERE COUNT(*) > 5;",
      "SELECT department, COUNT(*) FROM employees HAVING department COUNT(*) > 5;"
    ],
    correctOption: 1,
    explanation: "WHAT: Aggregate in WHERE clause. WHY: WHERE filters rows before aggregation occurs. HOW: Filter aggregated groups using `HAVING COUNT(*) > 5`.",
    basePoints: 200,
    tags: ["sql", "aggregation", "having"]
  },
  {
    id: "fc-18",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 7,
    title: "Fix Exception Reraising with Traceback",
    description: "Catching and reraising exception loses original exception traceback.",
    code: `except ValueError as e:\n    raise CustomError("Failed")`,
    options: [
      "except ValueError as e:\n    raise CustomError(\"Failed\").with(e)",
      "except ValueError as e:\n    raise CustomError(\"Failed\") from e",
      "except ValueError as e:\n    raise CustomError, e",
      "except ValueError as e:\n    throw CustomError(\"Failed\")"
    ],
    correctOption: 1,
    explanation: "WHAT: Lost exception context. WHY: Plain `raise CustomError` overwrites traceback. HOW: Use `raise CustomError(\"Failed\") from e`.",
    basePoints: 225,
    tags: ["python", "exceptions", "traceback"]
  },
  {
    id: "fc-19",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 7,
    title: "Fix Async Promise Array Resolution",
    description: "fetchScores returns an array of pending Promises instead of actual scores.",
    code: `async function fetchScores(ids) {\n  const scores = ids.map(async (id) => api.getScore(id));\n  return scores;\n}`,
    options: [
      "return ids.map(id => await api.getScore(id));",
      "return ids.flatMap(async (id) => api.getScore(id));",
      "return await ids.mapAsync(id => api.getScore(id));",
      "return await Promise.all(ids.map(async (id) => api.getScore(id)));"
    ],
    correctOption: 3,
    explanation: "WHAT: Array of unresolved promises. WHY: `map` returns promises immediately without waiting. HOW: Wrap in `await Promise.all(...)`.",
    basePoints: 225,
    tags: ["javascript", "promises", "async"]
  },
  {
    id: "fc-20",
    mode: "fix_the_code",
    language: "Java",
    difficulty: 7,
    title: "Fix Resource Leak with Try-With-Resources",
    description: "File stream is not closed if an exception is thrown during reading.",
    code: `FileInputStream fis = new FileInputStream(file);\nbyte[] data = fis.readAllBytes();\nfis.close();`,
    options: [
      "try (FileInputStream fis = new FileInputStream(file)) {\n    byte[] data = fis.readAllBytes();\n}",
      "FileInputStream fis = new AutoClose(new FileInputStream(file)) {\n    byte[] data = fis.readAllBytes();\n}",
      "try {\n    FileInputStream fis = new FileInputStream(file);\n    byte[] data = fis.readAllBytes();\n}",
      "synchronized(fis = new FileInputStream(file)) {\n    byte[] data = fis.readAllBytes();\n}"
    ],
    correctOption: 0,
    explanation: "WHAT: Resource leak on exception. WHY: If `readAllBytes()` throws, `.close()` is bypassed. HOW: Use `try (FileInputStream fis = ...)`.",
    basePoints: 225,
    tags: ["java", "io", "try_with_resources"]
  },
  {
    id: "fc-21",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 7,
    title: "Fix Dangling Reference Return",
    description: "Function returns a reference to local variable that goes out of scope.",
    code: `const std::string& getGreeting() {\n    std::string msg = "Hello World";\n    return msg;\n}`,
    options: [
      "std::string* getGreeting() { return &msg; }",
      "std::string getGreeting() {\n    std::string msg = \"Hello World\";\n    return msg;\n}",
      "const std::string& getGreeting() { return std::move(msg); }",
      "auto& getGreeting() { return msg; }"
    ],
    correctOption: 1,
    explanation: "WHAT: Returning reference to destroyed local. WHY: `msg` stack memory is deallocated upon return. HOW: Return by value `std::string`.",
    basePoints: 225,
    tags: ["cpp", "memory", "references"]
  },
  {
    id: "fc-22",
    mode: "fix_the_code",
    language: "SQL",
    difficulty: 7,
    title: "Fix Multiple Row Insert Syntax",
    description: "Inserting multiple rows in single statement fails syntax error.",
    code: `INSERT INTO users (id, name) VALUES (1, 'A'), VALUES (2, 'B');`,
    options: [
      "INSERT INTO users (id, name) VALUES (1, 'A'), (2, 'B');",
      "INSERT INTO users (id, name) SET (1, 'A'), (2, 'B');",
      "INSERT INTO users (id, name) MULTI (1, 'A'), (2, 'B');",
      "INSERT INTO users VALUES [1, 'A'], [2, 'B'];"
    ],
    correctOption: 0,
    explanation: "WHAT: Repeated VALUES keyword. WHY: Multiple rows are comma-separated row tuples after a single `VALUES`. HOW: `VALUES (1, 'A'), (2, 'B');`.",
    basePoints: 225,
    tags: ["sql", "insert", "syntax"]
  },
  {
    id: "fc-23",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 8,
    title: "Fix Generator Delegated Yield",
    description: "Yielding from sub-generator yields generator object instead of individual items.",
    code: `def flatten(nested):\n    for sub in nested:\n        yield flatten(sub)`,
    options: [
      "def flatten(nested):\n    for sub in nested:\n        yield *flatten(sub)",
      "def flatten(nested):\n    for sub in nested:\n        return flatten(sub)",
      "def flatten(nested):\n    for sub in nested:\n        yield [flatten(sub) for sub in nested]",
      "def flatten(nested):\n    for sub in nested:\n        yield from flatten(sub)"
    ],
    correctOption: 3,
    explanation: "WHAT: Yielding generator object. WHY: `yield gen` yields the generator itself. HOW: Use `yield from flatten(sub)`.",
    basePoints: 250,
    tags: ["python", "generators", "yield_from"]
  },
  {
    id: "fc-24",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 8,
    title: "Fix Event Loop Blocking Microtask",
    description: "Blocking heavy task blocks UI rendering.",
    code: `for (let i = 0; i < 1e9; i++) { heavyTask(); }`,
    options: [
      "async function runChunked() {\n  for (let i = 0; i < 1e9; i++) {\n    heavyTask();\n    if (i % 1000 === 0) await new Promise(r => setTimeout(r, 0));\n  }\n}",
      "async function runChunked() {\n  for (let i = 0; i < 1e9; i++) {\n    Promise.resolve().then(heavyTask);\n  }\n}",
      "function runChunked() {\n  for (let i = 0; i < 1e9; i++) {\n    heavyTask.runBackground();\n  }\n}",
      "function runChunked() {\n  for (let i = 0; i < 1e9; i++) {\n    window.requestFrame(heavyTask);\n  }\n}"
    ],
    correctOption: 0,
    explanation: "WHAT: Macrotask UI freezing. WHY: Synchronous 1e9 iterations lock main thread. HOW: Chunk with `setTimeout(..., 0)` or use a Web Worker.",
    basePoints: 250,
    tags: ["javascript", "event_loop", "performance"]
  },
  {
    id: "fc-25",
    mode: "fix_the_code",
    language: "Java",
    difficulty: 8,
    title: "Fix Optional Null Unwrapping",
    description: "Calling get() on empty Optional throws NoSuchElementException.",
    code: `Optional<String> opt = findName();\nString name = opt.get();`,
    options: [
      "String name = (String) opt;",
      "String name = opt.orElse(\"Default\");",
      "String name = opt.value();",
      "String name = opt.unwrap();"
    ],
    correctOption: 1,
    explanation: "WHAT: Direct `.get()` on empty Optional. WHY: If empty, `.get()` crashes. HOW: Use `.orElse(\"Default\")` or `.orElseGet(...)`.",
    basePoints: 250,
    tags: ["java", "optional", "null_safety"]
  },
  {
    id: "fc-26",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 8,
    title: "Fix Custom Comparator Strict Weak Ordering",
    description: "std::sort crashes on duplicate elements because comparator uses <= instead of <.",
    code: `bool comp(int a, int b) {\n    return a <= b; // violates strict weak ordering!\n}`,
    options: [
      "bool comp(int a, int b) {\n    return a == b;\n}",
      "bool comp(int a, int b) {\n    return a > b || a == b;\n}",
      "bool comp(int a, int b) {\n    return a < b;\n}",
      "bool comp(int a, int b) {\n    return !(a < b);\n}"
    ],
    correctOption: 2,
    explanation: "WHAT: Strict weak ordering violation. WHY: `comp(x, x)` must return `false` for `std::sort`. `a <= b` returns true for equal items. HOW: Change to `a < b`.",
    basePoints: 250,
    tags: ["cpp", "sort", "comparators"]
  },
  {
    id: "fc-27",
    mode: "fix_the_code",
    language: "SQL",
    difficulty: 8,
    title: "Fix Safe Subquery Exists Check",
    description: "Subquery with NOT IN fails on NULL records in child table.",
    code: `SELECT * FROM parent WHERE id NOT IN (SELECT parent_id FROM child);`,
    options: [
      "SELECT * FROM parent WHERE id != ANY (SELECT parent_id FROM child);",
      "SELECT * FROM parent p WHERE NOT EXISTS (SELECT 1 FROM child c WHERE c.parent_id = p.id);",
      "SELECT * FROM parent WHERE id NOT LIKE (SELECT parent_id FROM child);",
      "SELECT * FROM parent WHERE id IS NOT (SELECT parent_id FROM child);"
    ],
    correctOption: 1,
    explanation: "WHAT: NOT IN with NULLs. WHY: A single NULL in child table makes NOT IN evaluate to UNKNOWN. HOW: Use `NOT EXISTS (SELECT 1 ...)`.",
    basePoints: 250,
    tags: ["sql", "subqueries", "not_exists"]
  },
  {
    id: "fc-28",
    mode: "fix_the_code",
    language: "Python",
    difficulty: 9,
    title: "Fix Metaclass Singleton Pattern",
    description: "Singleton class creates new instances on every constructor call.",
    code: `class Singleton:\n    def __init__(self):\n        pass`,
    options: [
      "class Singleton:\n    _instance = None\n    def __init__(self):\n        return self",
      "class Singleton:\n    _instance = None\n    def create(self):\n        return self",
      "class Singleton:\n    _instance = None\n    def __new__(cls, *args, **kwargs):\n        if not cls._instance:\n            cls._instance = super().__new__(cls)\n        return cls._instance",
      "class Singleton:\n    _instance = None\n    def __call__(cls):\n        return cls._instance"
    ],
    correctOption: 2,
    explanation: "WHAT: Instance creation control. WHY: `__init__` initializes already created objects; `__new__` controls object creation. HOW: Override `__new__` to return cached `_instance`.",
    basePoints: 275,
    tags: ["python", "singleton", "metaclass"]
  },
  {
    id: "fc-29",
    mode: "fix_the_code",
    language: "JavaScript",
    difficulty: 9,
    title: "Fix Private Class Field Access",
    description: "Accessing private field with string key throws syntax error.",
    code: `class Bank {\n  #balance = 1000;\n  getBalance() { return this['#balance']; }\n}`,
    options: [
      "getBalance() { return this._balance; }",
      "getBalance() { return this.#balance; }",
      "getBalance() { return this.private.balance; }",
      "getBalance() { return Bank.#balance; }"
    ],
    correctOption: 1,
    explanation: "WHAT: Bracket notation on private field. WHY: Private `#fields` are lexical identifiers and cannot be accessed dynamically with strings. HOW: Use dot identifier `this.#balance`.",
    basePoints: 275,
    tags: ["javascript", "classes", "private_fields"]
  },
  {
    id: "fc-30",
    mode: "fix_the_code",
    language: "C++",
    difficulty: 9,
    title: "Fix Perfect Forwarding Template Parameter",
    description: "Template forwarding wrapper fails to preserve rvalue references.",
    code: `template <typename T>\nvoid wrapper(T&& arg) {\n    targetFunction(arg); // loses rvalue-ness!\n}`,
    options: [
      "template <typename T>\nvoid wrapper(T&& arg) {\n    targetFunction(std::move(arg));\n}",
      "template <typename T>\nvoid wrapper(T&& arg) {\n    targetFunction(&arg);\n}",
      "template <typename T>\nvoid wrapper(T&& arg) {\n    targetFunction((T)arg);\n}",
      "template <typename T>\nvoid wrapper(T&& arg) {\n    targetFunction(std::forward<T>(arg));\n}"
    ],
    correctOption: 3,
    explanation: "WHAT: Imperfect forwarding. WHY: Named rvalue parameters become lvalues inside the function body. HOW: Use `std::forward<T>(arg)`.",
    basePoints: 275,
    tags: ["cpp", "templates", "perfect_forwarding"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FIX_THE_CODE_BANK };
}
