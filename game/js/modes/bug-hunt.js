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
      "Argument nums must be converted explicitly using list(nums) syntax",
      "The return statement is indented inside the for loop body block",
      "Accumulator statement total += n should be written total = n + total",
      "Variable total should be initialized with None prior to looping"
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
      "Function declaration must be marked with async keyword modifier",
      "String arguments trigger string concatenation; cast with Number()",
      "Variable let result should be declared with const result = a + b",
      "Parameter identifiers in signature must be wrapped in curly braces"
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
      "Local primitive variable count must be declared as static member",
      "Condition count > 5 evaluates to false immediately on count = 1",
      "Method System.out.println requires explicit String typed arguments",
      "Postfix count++ operator causes an immediate JVM stack overflow crash"
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
      "Parameter int scores[] cannot be passed as an array argument",
      "sum is uninitialized and holds arbitrary stack garbage memory",
      "Loop index variable i must be declared with size_t data type",
      "C++ primitive arrays cannot be indexed using bracket notation"
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
      "Assigning user in login shadows outer variable; needs global user",
      "Function login definition cannot take zero positional parameters",
      "Conditional if statement cannot compare string literal values",
      "Global variable user must be initialized as a mutable list array"
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
      "Array.prototype.sort mutates in-place; copy array first: [...items].sort()",
      "Array sort method items.sort() exclusively functions on numeric values",
      "Variable let sorted must be declared in global execution environment",
      "Built-in sort method requires three separate comparator parameters"
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
      "Null comparison u != null is an invalid conditional check in Java",
      "Methods returning primitive boolean types cannot return literal false",
      "Single & does not short-circuit; use && to avoid evaluating u.isActive() on null",
      "Bitwise & operator cannot be used inside if conditional statements"
    ],
    correctOption: 2,
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
      "Switch control statements exclusively accept string literal expressions",
      "Missing break statements cause execution to fall through to next case",
      "Case label case 1 must be enclosed within nested curly brace blocks",
      "Stream insertion std::cout cannot be placed inside switch statements"
    ],
    correctOption: 1,
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
      "Parentheses without comma group strings; ('apple',) creates 1-item tuple",
      "Parentheses are reserved syntax and not permitted in Python definitions",
      "Built-in function type() cannot inspect tuple instances in Python 3",
      "String literal \"apple\" must be enclosed within single quote marks"
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
      "Loose equality val == false is a compile-time syntax error in strict mode",
      "Loose equality coerces 0 and '' to false; use strict comparison val === false",
      "Return literal return true must be enclosed within double quote marks",
      "Standard JavaScript runtime lacks a primitive boolean true/false data type"
    ],
    correctOption: 1,
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
      "Arithmetic expression n / 2 must be replaced with multiplication n * 2",
      "Equality comparison == 0 should be changed to comparison == 1 in Java",
      "Method isEven must be declared with static access modifier in class",
      "Use modulo remainder (n % 2 == 0) instead of integer division quotient"
    ],
    correctOption: 3,
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
      "^ is bitwise XOR in C++, not power; use std::pow or an exponent loop",
      "Expression base ^ exp requires explicit parentheses: (base) ^ (exp)",
      "Primitive type int cannot store exponents exceeding single digits",
      "Function calculatePower must be declared with inline specifier prefix"
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
      "Dictionary keys cannot be declared as string literal primitive values",
      "Duplicate 'timeout' key silently overwrites the previous value to 60",
      "Colon separator : is invalid syntax in modern Python dictionary literals",
      "Numerical value 60 exceeds maximum allowable integer size in dictionary"
    ],
    correctOption: 1,
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
      "Method nums.filter exclusively accepts strings in standard JavaScript",
      "Block body {} in arrow function needs explicit return: n => { return n > 0; }",
      "Comparison operator n > 0 must be replaced with inclusive boundary n >= 0",
      "Higher-order method filter requires passing two separate callback parameters"
    ],
    correctOption: 1,
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
      "Character is boxed object; == compares references, use a.equals(b)",
      "Boxed Character objects cannot be compared in Java runtime programs",
      "Return expression return a == b requires casting to String objects",
      "Method match must be declared with synchronized concurrency modifier"
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
      "Parameter rate must be passed as an integer percentage rather than double",
      "Member field item.price cannot be modified using arithmetic multiplication",
      "Item is passed by value (copied); pass by reference Item& to mutate caller",
      "C++ function declarations cannot accept multiple parameters without struct"
    ],
    correctOption: 2,
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
      "Python dictionaries do not support nested bracket notation lookups",
      "Parameter default_config must be converted to an immutable tuple",
      "Target copied_config cannot assign string values to nested keys",
      "dict.copy() is shallow; nested dicts are shared, use copy.deepcopy()"
    ],
    correctOption: 3,
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
      "Array.prototype.forEach ignores async Promises; use for...of or Promise.all",
      "Method db.save cannot be executed in combination with the await keyword",
      "Callback in forEach requires an explicit return statement inside body",
      "Parameter records must be formatted as an object instead of array"
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
      "Increment activeCount++ cannot be executed inside public member methods",
      "static fields are shared by all instances; remove static for per-object state",
      "Class UserSession cannot contain any static field declarations in Java",
      "Method login() declaration must return a primitive boolean status flag"
    ],
    correctOption: 1,
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
      "Return pointer type int* cannot point to primitive integer variables",
      "Array declaration arr[3] requires exactly 4 initializers in modern C++",
      "arr is on local stack and destroyed on return; use std::vector or std::array",
      "Function getNumbers signature must be declared with void return type"
    ],
    correctOption: 2,
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
      "Expression x == 5 or 6 parses as (x == 5) or 6; truthy 6 makes it always True",
      "Condition syntax x == 5 or 6 is a syntax compilation error in Python 3",
      "Return statement return True must be written in lowercase return true",
      "Logical operator or cannot be utilized inside conditional if statements"
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
      "Unary delete operator only functions on index elements of Array objects",
      "Property user.password must be assigned numerical integer 0 to sanitize",
      "Function sanitizeUser cannot return the modified user reference directly",
      "delete mutates input in-place; clone object or use destructuring first"
    ],
    correctOption: 3,
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
      "Class Point cannot contain two primitive integer coordinate fields",
      "equals(Point) overloads instead of overriding; use equals(Object obj)",
      "Field reference this.x is invalid syntax in Java instance member methods",
      "Method equals signature must declare return type as primitive int"
    ],
    correctOption: 1,
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
      "Signed -1 converts to unsigned UINT_MAX; -1 < size() evaluates to false",
      "Integer variable x cannot store negative numbers in ISO C++ programs",
      "Method v.size() returns a 32-bit floating point number in standard C++",
      "Container std::vector requires explicit type casting on every comparison"
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
      "Function range(5) only iterates up to four total loop iterations",
      "List method funcs.append cannot store first-class function objects",
      "Lambda captures i by reference late; bind default arg: lambda x, i=i: x * i",
      "Variable x is undefined in the local execution scope of the lambda"
    ],
    correctOption: 2,
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
      "Identifier NaN must be written in lowercase nan in conditional checks",
      "Strict equality === requires replacement with single assignment =",
      "Parameter val cannot be inspected or tested using conditional if blocks",
      "NaN is not equal to itself (NaN === NaN is false); use Number.isNaN(val)"
    ],
    correctOption: 3,
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
      "Class Point must implement java.lang.Comparable interface definition",
      "Collections like HashSet and HashMap require overriding hashCode with equals",
      "HashSet collection container cannot store custom user-defined classes",
      "Annotation @Override is prohibited when defining custom equals methods"
    ],
    correctOption: 1,
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
      "Lifetime extension only binds outermost temporary; store by value string",
      "Type const std::string& cannot bind to returns of member functions in C++",
      "Function getObject() must return an unmanaged raw heap memory pointer",
      "Standard type std::string cannot be qualified with const modifier prefix"
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
      "Function sum() cannot accept generator comprehension expressions",
      "Generators are one-time iterators; exhausted after first sum, use list()",
      "Range range(5) expression cannot be multiplied by integer constant 2",
      "List constructor list(gen) requires explicit nested tuple conversion"
    ],
    correctOption: 1,
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
      "Method this.connect() must be declared with synchronous execution type",
      "Class Database cannot declare or define a constructor member method",
      "Constructors cannot be async; use static async factory method like init()",
      "Keyword async cannot be utilized anywhere inside ES6 class declarations"
    ],
    correctOption: 2,
    explanation: "WHAT: Async constructor anti-pattern. WHY: `new Class()` expects instance initialization. HOW: Use static factory `static async create() { ... }`.",
    basePoints: 275,
    tags: ["javascript", "async", "oop"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BUG_HUNT_BANK };
}
