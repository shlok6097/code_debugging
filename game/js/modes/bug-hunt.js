/**
 * Code Debugger - Mode 1: Bug Hunt (30 Challenges)
 * General syntax, logic, variables, scoping, and condition bugs across Python, C++, Java, JS.
 */

const BUG_HUNT_BANK = [
  {
    id: "bh-01",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    title: "Premature Return in Loop",
    description: "The function calculate_sum is supposed to sum all numbers, but only processes the first number.",
    code: `def calculate_sum(nums):\n    total = 0\n    for n in nums:\n        total += n\n        return total`,
    options: [
      "nums must be converted using list(nums)",
      "The return statement is indented inside the for loop",
      "total += n should be total = n + total",
      "total should be initialized to None"
    ],
    correctOption: 1,
    explanation: "WHAT: Premature return. WHY: The `return total` is indented inside the loop body, causing exit on iteration 1. HOW: Dedent `return total` outside the loop.",
    basePoints: 75,
    tags: ["python", "loops", "indentation"]
  },
  {
    id: "bh-02",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    title: "String Coercion Addition",
    description: "Calling addInputs('10', '20') returns '1020' instead of 30.",
    code: `function addInputs(a, b) {\n  let result = a + b;\n  return result;\n}`,
    options: [
      "The function must be marked async",
      "Parameters are strings, so + performs string concatenation instead of addition",
      "let result should be const result = a + b",
      "Parameters must be enclosed in curly brackets"
    ],
    correctOption: 1,
    explanation: "WHAT: String concatenation. WHY: Passing strings to `+` concatenates them. HOW: Parse inputs with `Number(a) + Number(b)` or `parseInt()`.",
    basePoints: 75,
    tags: ["javascript", "types", "coercion"]
  },
  {
    id: "bh-03",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 2,
    title: "Flipped Loop Guard",
    description: "printNumbers is expected to print 1 to 5, but prints nothing at all.",
    code: `public void printNumbers() {\n    int count = 1;\n    while (count > 5) {\n        System.out.println(count);\n        count++;\n    }\n}`,
    options: [
      "count must be static",
      "The loop guard `count > 5` evaluates to false immediately on count=1",
      "System.out.println requires String arguments",
      "count++ causes an immediate stack overflow"
    ],
    correctOption: 1,
    explanation: "WHAT: Incorrect loop condition. WHY: `1 > 5` is `false`, so the while loop never executes. HOW: Change guard condition to `count <= 5`.",
    basePoints: 100,
    tags: ["java", "loops", "conditions"]
  },
  {
    id: "bh-04",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 2,
    title: "Uninitialized Local Accumulator",
    description: "accumulateScores returns random garbage numbers instead of the expected sum.",
    code: `int accumulateScores(int scores[], int count) {\n    int sum;\n    for (int i = 0; i < count; i++) {\n        sum += scores[i];\n    }\n    return sum;\n}`,
    options: [
      "int scores[] cannot be an argument",
      "sum is uninitialized and starts with indeterminate stack memory",
      "The loop variable i must be size_t",
      "C++ arrays cannot be indexed with square brackets"
    ],
    correctOption: 1,
    explanation: "WHAT: Uninitialized variable. WHY: Local primitives in C++ contain arbitrary garbage stack bits. HOW: Initialize with `int sum = 0;`.",
    basePoints: 100,
    tags: ["cpp", "memory", "variables"]
  },
  {
    id: "bh-05",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 2,
    title: "Variable Shadowing in Inner Function",
    description: "Modifying user inside inner function creates an unassigned local variable error.",
    code: `user = "Guest"\ndef login():\n    if user == "Guest":\n        user = "Admin"`,
    options: [
      "Assigning user inside login shadows outer variable; needs global user",
      "login cannot take zero arguments",
      "if statement cannot compare strings",
      "user should be a list"
    ],
    correctOption: 0,
    explanation: "WHAT: UnboundLocalError shadowing. WHY: Assignment inside function treats `user` as local. HOW: Add `global user`.",
    basePoints: 100,
    tags: ["python", "scope", "shadowing"]
  },
  {
    id: "bh-06",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 3,
    title: "Array Mutation with Sort",
    description: "Calling getSortedCopy(items) unexpectedly mutates the original items array.",
    code: `function getSortedCopy(items) {\n  let sorted = items.sort();\n  return sorted;\n}`,
    options: [
      "Array.prototype.sort() mutates the array in-place rather than returning a new copy",
      "items.sort() only works on numbers",
      "let sorted should be declared as global",
      "sort() requires three parameters"
    ],
    correctOption: 0,
    explanation: "WHAT: In-place array mutation. WHY: `sort()` modifies the source array in-place. HOW: Create a copy first: `[...items].sort()`.",
    basePoints: 125,
    tags: ["javascript", "arrays", "mutation"]
  },
  {
    id: "bh-07",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 3,
    title: "Bitwise AND vs Logical AND",
    description: "checkUser evaluates second condition and crashes even when user is null.",
    code: `public boolean checkUser(User u) {\n    if (u != null & u.isActive()) return true;\n    return false;\n}`,
    options: [
      "Single '&' is bitwise AND (no short-circuit); '&&' is required to prevent evaluating u.isActive() on null",
      "u != null is invalid syntax in Java",
      "boolean methods cannot return false",
      "& cannot be used inside if statements"
    ],
    correctOption: 0,
    explanation: "WHAT: Non-short-circuit bitwise operator. WHY: Single `&` evaluates both sides. HOW: Use `&&` for short-circuit evaluation.",
    basePoints: 125,
    tags: ["java", "operators", "short_circuit"]
  },
  {
    id: "bh-08",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 3,
    title: "Missing Break in Switch Statement",
    description: "Setting status to 1 prints both 'STARTED' and 'PAUSED'.",
    code: `switch (status) {\n    case 1: std::cout << "STARTED";\n    case 2: std::cout << "PAUSED";\n}`,
    options: [
      "Missing break statements cause execution to fall through to subsequent cases",
      "switch only accepts strings",
      "case 1 must be enclosed in curly braces",
      "std::cout cannot be inside a switch"
    ],
    correctOption: 0,
    explanation: "WHAT: Switch fallthrough. WHY: Cases without `break;` continue into the next block. HOW: Add `break;` after each case.",
    basePoints: 125,
    tags: ["cpp", "switch", "control_flow"]
  },
  {
    id: "bh-09",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 3,
    title: "Tuple Trailing Comma Omission",
    description: "single_item = ('apple') creates a string instead of a 1-element tuple.",
    code: `def get_tuple():\n    single_item = ("apple")\n    return type(single_item)`,
    options: [
      "Single-element tuples in Python require a trailing comma: ('apple',)",
      "Parentheses are not allowed in Python",
      "type() cannot check tuples",
      "\"apple\" must be in single quotes"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing comma in single-item tuple. WHY: Parentheses without comma are grouping syntax. HOW: Write `(\"apple\",)`.",
    basePoints: 125,
    tags: ["python", "tuples", "syntax"]
  },
  {
    id: "bh-10",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 4,
    title: "Double Equals Loose Coercion",
    description: "0 == false and '' == false evaluate to true, causing bad form validation.",
    code: `function isValidInput(val) {\n  if (val == false) return false;\n  return true;\n}`,
    options: [
      "Loose equality (==) coerces 0 and '' to false; strict equality (===) is required",
      "val == false is a compile error",
      "return true must be wrapped in quotes",
      "JavaScript does not have a boolean type"
    ],
    correctOption: 0,
    explanation: "WHAT: Loose equality coercion. WHY: `==` converts types unpredictably. HOW: Use strict `===`.",
    basePoints: 150,
    tags: ["javascript", "equality", "coercion"]
  },
  {
    id: "bh-11",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 4,
    title: "Integer Division in Modulo Expression",
    description: "isEven calculates division instead of modulo remainder.",
    code: `public boolean isEven(int n) {\n    return (n / 2) == 0;\n}`,
    options: [
      "Modulo operator (%) checks remainder; division (n / 2) checks quotient",
      "n / 2 must be n * 2",
      "== 0 should be == 1",
      "isEven must be static"
    ],
    correctOption: 0,
    explanation: "WHAT: Used division instead of modulo. WHY: `n % 2 == 0` tests for even numbers. HOW: Change `n / 2` to `n % 2`.",
    basePoints: 150,
    tags: ["java", "operators", "math"]
  },
  {
    id: "bh-12",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 4,
    title: "Bitwise XOR Operator Confusion",
    description: "calculatePower(2, 3) outputs 1 instead of 8.",
    code: `int calculatePower(int base, int exp) {\n    return base ^ exp;\n}`,
    options: [
      "^ is the bitwise XOR operator in C++, not exponential power; use std::pow or a loop",
      "base ^ exp requires parentheses (base) ^ (exp)",
      "int cannot hold exponential numbers",
      "calculatePower must be inline"
    ],
    correctOption: 0,
    explanation: "WHAT: Bitwise XOR used for exponentiation. WHY: `2 ^ 3 = 1` in binary XOR. HOW: Use `std::pow(base, exp)`.",
    basePoints: 150,
    tags: ["cpp", "operators", "math"]
  },
  {
    id: "bh-13",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 4,
    title: "Dictionary Key Overwrite in Literal",
    description: "Dictionary has duplicate keys; second value overwrites the first.",
    code: `config = {\n    "timeout": 30,\n    "retries": 3,\n    "timeout": 60\n}`,
    options: [
      "Duplicate 'timeout' key silently overwrites the previous value to 60",
      "Dictionary keys cannot be strings",
      "Colon : is invalid in dictionaries",
      "60 is too large for Python dictionaries"
    ],
    correctOption: 0,
    explanation: "WHAT: Duplicate dictionary keys. WHY: Dictionaries require unique keys; later keys overwrite earlier ones. HOW: Remove duplicate entries.",
    basePoints: 150,
    tags: ["python", "dict", "keys"]
  },
  {
    id: "bh-14",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 5,
    title: "Array Filter Return Truthiness",
    description: "getPositiveNumbers returns empty array on positive numbers.",
    code: `function getPositiveNumbers(nums) {\n  return nums.filter(n => {\n    n > 0;\n  });\n}`,
    options: [
      "Arrow function with curly braces {} requires an explicit return statement (or concise body n => n > 0)",
      "nums.filter only works on strings",
      "n > 0 must be n >= 0",
      "filter requires two parameters"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing return in arrow function body. WHY: Block body `{}` returns `undefined` without `return`. HOW: Change to `n => n > 0`.",
    basePoints: 175,
    tags: ["javascript", "arrow_functions", "filter"]
  },
  {
    id: "bh-15",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 5,
    title: "Comparing Character Objects with ==",
    description: "Character comparison fails on certain Unicode characters.",
    code: `public boolean match(Character a, Character b) {\n    return a == b;\n}`,
    options: [
      "Character is an object wrapper; == compares references rather than char values outside byte cache",
      "Character cannot be compared in Java",
      "return a == b requires casting to String",
      "match must be synchronized"
    ],
    correctOption: 0,
    explanation: "WHAT: Reference comparison on boxed object. WHY: `==` compares addresses. HOW: Use `a.equals(b)` or unboxed `a.charValue() == b.charValue()`.",
    basePoints: 175,
    tags: ["java", "boxing", "equality"]
  },
  {
    id: "bh-16",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 5,
    title: "Pass by Value Slicing",
    description: "Calling applyDiscount(item) computes the new price locally, but the caller's Item object remains unchanged.",
    code: `void applyDiscount(Item item, double rate) {\n    item.price = item.price * (1.0 - rate);\n}`,
    options: [
      "Item is passed by value (copied); caller object is not modified",
      "rate must be passed as an integer",
      "item.price cannot use arithmetic multiplication",
      "C++ functions cannot take two arguments without a struct"
    ],
    correctOption: 0,
    explanation: "WHAT: Pass-by-value copy. WHY: Passing `Item item` creates a local stack copy. HOW: Pass by reference: `void applyDiscount(Item& item, double rate)`.",
    basePoints: 175,
    tags: ["cpp", "references", "functions"]
  },
  {
    id: "bh-17",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 5,
    title: "Shallow Copy Dictionary Mutation",
    description: "Modifying nested values in copied_config also alters default_config unexpectedly.",
    code: `def get_config(default_config):\n    copied_config = default_config.copy()\n    copied_config['database']['host'] = 'localhost'\n    return copied_config`,
    options: [
      "dict.copy() performs a shallow copy; nested dictionary references are shared",
      "Python dictionaries do not support bracket notation",
      "default_config must be converted to a tuple",
      "copied_config cannot assign strings to keys"
    ],
    correctOption: 0,
    explanation: "WHAT: Shallow copy alias. WHY: `.copy()` only copies top-level references, leaving nested dicts shared. HOW: Use `copy.deepcopy(default_config)`.",
    basePoints: 175,
    tags: ["python", "dictionaries", "references"]
  },
  {
    id: "bh-18",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 6,
    title: "Asynchronous ForEach Trap",
    description: "saveAllData completes before any database record is actually saved.",
    code: `async function saveAllData(records) {\n  records.forEach(async (record) => {\n    await db.save(record);\n  });\n  console.log('All saved!');\n}`,
    options: [
      "Array.prototype.forEach does not await async callbacks and ignores returned Promises",
      "db.save cannot be used with await",
      "forEach requires a return statement inside",
      "records must be an object instead of an array"
    ],
    correctOption: 0,
    explanation: "WHAT: Unawaited forEach. WHY: `forEach` does not await promises returned by its callback. HOW: Use `for (const record of records) { await db.save(record); }` or `Promise.all()`.",
    basePoints: 200,
    tags: ["javascript", "async", "promises"]
  },
  {
    id: "bh-19",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 6,
    title: "Static Field Shared State Leak",
    description: "Setting user count in one instance changes user count for all instances.",
    code: `public class UserSession {\n    private static int activeCount = 0;\n    public void login() { activeCount++; }\n}`,
    options: [
      "static fields belong to the class, sharing state across all instance objects",
      "activeCount++ cannot be used inside public methods",
      "UserSession cannot have static fields",
      "login() must return boolean"
    ],
    correctOption: 0,
    explanation: "WHAT: Unintended static state sharing. WHY: `static` variables are shared across all class instances. HOW: Remove `static` if each session has its own state.",
    basePoints: 200,
    tags: ["java", "static", "oop"]
  },
  {
    id: "bh-20",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 6,
    title: "Returning Local Array Address",
    description: "Function returns pointer to stack memory that is destroyed on return.",
    code: `int* getNumbers() {\n    int arr[3] = {1, 2, 3};\n    return arr;\n}`,
    options: [
      "arr is allocated on the local stack frame and deallocated upon function exit",
      "int* cannot point to integers",
      "arr[3] requires 4 elements",
      "getNumbers must be void"
    ],
    correctOption: 0,
    explanation: "WHAT: Returning pointer to stack memory. WHY: Stack memory is reclaimed on function exit. HOW: Use `std::vector<int>` or `std::array`.",
    basePoints: 200,
    tags: ["cpp", "pointers", "stack"]
  },
  {
    id: "bh-21",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 6,
    title: "Chained Comparison Misinterpretation",
    description: "Checking 1 < x < 10 evaluates as chained comparison, but x == 5 or 6 evaluates unexpectedly.",
    code: `def check(x):\n    if x == 5 or 6:\n        return True\n    return False`,
    options: [
      "x == 5 or 6 evaluates as (x == 5) or (6), where truthy 6 makes the condition always True",
      "x == 5 or 6 is a syntax error",
      "return True must be return true",
      "or cannot be used inside if statements"
    ],
    correctOption: 0,
    explanation: "WHAT: Operator precedence in logic. WHY: Non-zero integer `6` is always truthy. HOW: Write `if x == 5 or x == 6:` or `if x in (5, 6):`.",
    basePoints: 200,
    tags: ["python", "boolean", "precedence"]
  },
  {
    id: "bh-22",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 7,
    title: "Object Property Delete Mutation",
    description: "delete user.password mutates the original shared user object across modules.",
    code: `function sanitizeUser(user) {\n  delete user.password;\n  return user;\n}`,
    options: [
      "delete operator mutates the input user object in-place; shallow clone first before deleting",
      "delete only works on arrays",
      "user.password must be set to 0",
      "sanitizeUser cannot return user"
    ],
    correctOption: 0,
    explanation: "WHAT: In-place object property deletion. WHY: Modifies the original reference directly. HOW: Use destructuring `{ password, ...safeUser } = user; return safeUser;`.",
    basePoints: 225,
    tags: ["javascript", "objects", "immutability"]
  },
  {
    id: "bh-23",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 7,
    title: "Missing Override Annotation on Equals",
    description: "Custom equals method with wrong parameter type fails to override Object.equals.",
    code: `public class Point {\n    int x, y;\n    public boolean equals(Point other) {\n        return this.x == other.x && this.y == other.y;\n    }\n}`,
    options: [
      "equals must accept Object parameter (Object obj) to override Object.equals; Point other only overloads it",
      "Point cannot have two integers",
      "this.x is invalid syntax",
      "equals must return int"
    ],
    correctOption: 0,
    explanation: "WHAT: Overloading instead of overriding `equals`. WHY: `equals(Point other)` does not match signature `equals(Object obj)`. HOW: Change signature to `public boolean equals(Object obj)`.",
    basePoints: 225,
    tags: ["java", "oop", "equals"]
  },
  {
    id: "bh-24",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 7,
    title: "Signed and Unsigned Comparison Warning",
    description: "Comparing negative signed int with unsigned vector size produces unexpected true.",
    code: `int x = -1;\nstd::vector<int> v = {1, 2, 3};\nif (x < v.size()) {\n    // x is converted to huge unsigned integer\n}`,
    options: [
      "Comparing signed -1 with unsigned size_t converts -1 to UINT_MAX, making -1 < size false",
      "x cannot be negative in C++",
      "v.size() returns a float",
      "std::vector requires casting"
    ],
    correctOption: 0,
    explanation: "WHAT: Signed/unsigned implicit conversion. WHY: `-1` converted to unsigned becomes `4294967295`. HOW: Use signed sizes or check `x >= 0` first.",
    basePoints: 225,
    tags: ["cpp", "types", "conversion"]
  },
  {
    id: "bh-25",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 7,
    title: "Late Binding Closure in Loop",
    description: "All generated multiplier functions multiply by 4 instead of their respective index.",
    code: `def make_multipliers():\n    funcs = []\n    for i in range(5):\n        funcs.append(lambda x: x * i)\n    return funcs`,
    options: [
      "Lambdas in Python look up loop variable i late by reference at invocation time",
      "range(5) only iterates up to 4 elements",
      "funcs.append cannot store function objects",
      "x is undefined inside lambda"
    ],
    correctOption: 0,
    explanation: "WHAT: Late binding closure. WHY: Closures capture variable `i` by reference, which is 4 when called. HOW: Bind default arg: `lambda x, i=i: x * i`.",
    basePoints: 225,
    tags: ["python", "closures", "lambdas"]
  },
  {
    id: "bh-26",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 8,
    title: "NaN Comparison Self-Inequality",
    description: "Checking if val === NaN always evaluates to false even when val is NaN.",
    code: `function checkValue(val) {\n  if (val === NaN) return "Not a number";\n  return "Valid";\n}`,
    options: [
      "NaN is not equal to itself in IEEE 754 (NaN === NaN is false); Number.isNaN(val) must be used",
      "NaN must be written in lowercase nan",
      "=== requires single equals =",
      "val cannot be checked with if"
    ],
    correctOption: 0,
    explanation: "WHAT: NaN self-inequality. WHY: In JS, `NaN === NaN` is false. HOW: Use `Number.isNaN(val)`.",
    basePoints: 250,
    tags: ["javascript", "nan", "types"]
  },
  {
    id: "bh-27",
    mode: "bug_hunt",
    language: "Java",
    difficulty: 8,
    title: "Overriding Equals Without HashCode",
    description: "Adding equal Point objects into HashSet creates duplicate entries.",
    code: `public class Point {\n    int x, y;\n    @Override\n    public boolean equals(Object o) { ... }\n    // missing hashCode() override\n}`,
    options: [
      "Equal objects must produce identical hash codes; without hashCode(), HashMaps fail to locate entries",
      "Point must implement Comparable",
      "HashSet cannot store custom classes",
      "@Override is forbidden on equals"
    ],
    correctOption: 0,
    explanation: "WHAT: Broken equals/hashCode contract. WHY: `HashSet` checks bucket by `hashCode()` first. HOW: Override `hashCode()` consistently with `equals()`.",
    basePoints: 250,
    tags: ["java", "hashcode", "collections"]
  },
  {
    id: "bh-28",
    mode: "bug_hunt",
    language: "C++",
    difficulty: 8,
    title: "Const Reference Lifetime Extension Trap",
    description: "Binding const reference to temporary member function return creates dangling reference.",
    code: `const std::string& str = getObject().getString();\n// getObject() temporary is destroyed at semicolon`,
    options: [
      "Reference lifetime extension only applies to the outermost temporary, leaving inner reference dangling",
      "const std::string& cannot bind to functions",
      "getObject() must return a pointer",
      "std::string cannot be const"
    ],
    correctOption: 0,
    explanation: "WHAT: Dangling reference to temporary member. WHY: The parent object is destroyed at end of statement. HOW: Store by value `std::string str = ...`.",
    basePoints: 250,
    tags: ["cpp", "lifetime", "references"]
  },
  {
    id: "bh-29",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 9,
    title: "Generator Exhaustion on Re-iteration",
    description: "Calculating sum and average from same generator yields 0 for the average.",
    code: `gen = (x * 2 for x in range(5))\ntotal = sum(gen)\navg = sum(gen) / len(list(gen)) # gen is empty now!`,
    options: [
      "Generators in Python are one-time iterators and become exhausted after the first sum() call",
      "sum() cannot accept generator expressions",
      "range(5) cannot be multiplied by 2",
      "list(gen) requires tuple casting"
    ],
    correctOption: 0,
    explanation: "WHAT: Generator exhaustion. WHY: Iterating consumes generator items completely. HOW: Convert to list `list(...)` if multiple iterations are required.",
    basePoints: 275,
    tags: ["python", "generators", "iteration"]
  },
  {
    id: "bh-30",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 9,
    title: "Async Function Return in Constructor",
    description: "Returning Promise inside class constructor returns instance object instead of Promise.",
    code: `class Database {\n  constructor() {\n    return (async () => {\n      await this.connect();\n      return this;\n    })();\n  }\n}`,
    options: [
      "Constructors cannot be async and returning non-object primitives or promises is an anti-pattern; use static factory method",
      "this.connect() must be synchronous",
      "Database cannot have constructor",
      "async cannot be used inside classes"
    ],
    correctOption: 0,
    explanation: "WHAT: Async constructor anti-pattern. WHY: `new Class()` expects instance initialization. HOW: Use static factory `static async create() { ... }`.",
    basePoints: 275,
    tags: ["javascript", "async", "oop"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BUG_HUNT_BANK };
}
