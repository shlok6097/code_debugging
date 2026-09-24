/**
 * Code Debugger - Mode 3: Output Detective (30 Challenges)
 * Deduce why actual output differs from expected output across Python, C++, Java, JS, SQL.
 */

const OUTPUT_DETECTIVE_BANK = [
  {
    id: "od-01",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    title: "Integer Division Truncation",
    description: "Find why calculate_average produces 3.0 instead of 3.5.",
    code: `def calculate_average():\n    total = 7\n    count = 2\n    return total // count`,
    expectedOutput: "3.5",
    actualOutput: "3",
    options: [
      "Convert denominator variable explicitly using float(count) cast",
      "Operator // performs floor division; use / for float division",
      "Python standard arithmetic does not permit division of odd integers",
      "The return statement must wrap result in round(total, 1) method"
    ],
    correctOption: 1,
    explanation: "WHAT: Integer floor division. WHY: `//` truncates the decimal fractional part. HOW: Use single slash `/` for standard float division.",
    basePoints: 75,
    tags: ["python", "math", "output"]
  },
  {
    id: "od-02",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 2,
    title: "Unexpected Truthy String",
    description: "Why does checking activeStatus print 'User is Active' when status is 'false'?",
    code: `let status = "false";\nif (status) {\n  console.log("User is Active");\n} else {\n  console.log("User is Inactive");\n}`,
    expectedOutput: "User is Inactive",
    actualOutput: "User is Active",
    options: [
      "Non-empty strings are truthy in JS regardless of character contents",
      "Condition check requires double equals comparison: if (status == true)",
      "Method console.log cannot output string literals containing spaces",
      "Variable declaration let status must be defined with const specifier"
    ],
    correctOption: 0,
    explanation: "WHAT: Truthy string. WHY: In JavaScript, any non-empty string like 'false' evaluates to boolean `true`. HOW: Compare with `status === 'true'` or use a real boolean.",
    basePoints: 100,
    tags: ["javascript", "types", "boolean"]
  },
  {
    id: "od-03",
    mode: "output_detective",
    language: "Java",
    difficulty: 2,
    title: "Integer Division in Float Context",
    description: "calculateDiscount returns 0.0 instead of 0.25.",
    code: `public double calculateDiscount() {\n    double result = 1 / 4;\n    return result;\n}`,
    expectedOutput: "0.25",
    actualOutput: "0.0",
    options: [
      "Declare result as float primitive instead of double precision type",
      "Wrap expression in double cast after evaluation: (double) (1 / 4)",
      "Integer literal division 1 / 4 yields 0 before widening to double",
      "Java arithmetic engine does not support decimal fractions natively"
    ],
    correctOption: 2,
    explanation: "WHAT: Integer division literal truncation. WHY: `1 / 4` evaluates as integer division `0`. HOW: Use double literals `1.0 / 4.0`.",
    basePoints: 100,
    tags: ["java", "math", "types"]
  },
  {
    id: "od-04",
    mode: "output_detective",
    language: "C++",
    difficulty: 3,
    title: "Character ASCII Arithmetic",
    description: "Adding two digit characters outputs 101 instead of '56' or 11.",
    code: `char a = '5';\nchar b = '6';\nstd::cout << a + b;`,
    expectedOutput: "11",
    actualOutput: "101",
    options: [
      "Stream std::cout cannot output single character primitive variables",
      "Character variables in C++ must be declared within double quotation marks",
      "Char operands are promoted to ASCII ints ('5'=53, '6'=54, sum=101)",
      "Standard ISO C++ forbids applying the binary + operator between chars"
    ],
    correctOption: 2,
    explanation: "WHAT: ASCII integer promotion. WHY: Character literals '5' and '6' have ASCII values 53 and 54. HOW: Convert with `(a - '0') + (b - '0')`.",
    basePoints: 125,
    tags: ["cpp", "types", "ascii"]
  },
  {
    id: "od-05",
    mode: "output_detective",
    language: "Python",
    difficulty: 3,
    title: "String Multiplication Repeater",
    description: "Multiplying '5' by 3 produces '555' instead of 15.",
    code: `val = "5"\nresult = val * 3\nprint(result)`,
    expectedOutput: "15",
    actualOutput: "555",
    options: [
      "Multiplying string * int repeats the sequence rather than multiplying",
      "Expression val * 3 requires explicit floating point type conversion",
      "String multiplication is an unhandled syntax error in modern Python",
      "Function print(result) must convert result explicitly to str(result)"
    ],
    correctOption: 0,
    explanation: "WHAT: String repetition operator. WHY: In Python, `str * int` repeats characters. HOW: Cast to int `int(val) * 3`.",
    basePoints: 125,
    tags: ["python", "strings", "operators"]
  },
  {
    id: "od-06",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 3,
    title: "Array Plus Array Coercion",
    description: "Adding [] + [] produces empty string '' instead of [].",
    code: `const result = [] + [];\nconsole.log(typeof result, result);`,
    expectedOutput: "object []",
    actualOutput: "string ''",
    options: [
      "Evaluating [] + [] is an invalid syntax expression in JavaScript engines",
      "Binary + operator coerces arrays to empty strings and concatenates to \"\"",
      "Variable result must be declared with mutable let specifier in strict mode",
      "Method console.log cannot inspect or print primitive type strings accurately"
    ],
    correctOption: 1,
    explanation: "WHAT: Implicit string coercion of arrays. WHY: Binary `+` converts array operands to strings via `.toString()`. HOW: Use `[...a, ...b]` or `.concat()`.",
    basePoints: 125,
    tags: ["javascript", "coercion", "arrays"]
  },
  {
    id: "od-07",
    mode: "output_detective",
    language: "Java",
    difficulty: 4,
    title: "String Concatenation Order of Precedence",
    description: "Adding numbers after string outputs 'Result: 1020' instead of 'Result: 30'.",
    code: `System.out.println("Result: " + 10 + 20);`,
    expectedOutput: "Result: 30",
    actualOutput: "Result: 1020",
    options: [
      "Numbers 10 and 20 cannot be added inside standard println invocations",
      "Method System.out.println requires printf formatting for arithmetic operations",
      "String literal parameter 'Result:' must terminate with trailing semicolon",
      "+ associates left-to-right; 'Result: ' + 10 evaluates to string before adding 20"
    ],
    correctOption: 3,
    explanation: "WHAT: Left-to-right string concatenation. WHY: First `+` produces `\"Result: 10\"`, then `\"Result: 10\" + 20` produces `\"Result: 1020\"`. HOW: Group numbers: `\"Result: \" + (10 + 20)`.",
    basePoints: 150,
    tags: ["java", "strings", "precedence"]
  },
  {
    id: "od-08",
    mode: "output_detective",
    language: "C++",
    difficulty: 4,
    title: "Ternary Operator Stream Precedence",
    description: "Printing ternary result outputs 1 instead of 'Positive'.",
    code: `int x = 5;\nstd::cout << x > 0 ? "Positive" : "Negative";`,
    expectedOutput: "Positive",
    actualOutput: "1",
    options: [
      "Stream insertion << binds tighter than ? :; evaluates (cout << x) > 0 as true (1)",
      "Comparison expression x > 0 is invalid syntax inside standard stream insertion",
      "Ternary operator cannot return string literal pointers in ISO C++ programs",
      "String literal 'Positive' must be declared within single quotation character marks"
    ],
    correctOption: 0,
    explanation: "WHAT: Stream insertion precedence. WHY: `(cout << x)` runs first, then compares with `> 0`. HOW: Wrap ternary in parentheses: `std::cout << (x > 0 ? \"Positive\" : \"Negative\");`.",
    basePoints: 150,
    tags: ["cpp", "precedence", "io"]
  },
  {
    id: "od-09",
    mode: "output_detective",
    language: "Python",
    difficulty: 4,
    title: "Boolean Subclass of Integer Math",
    description: "Adding True + True + False prints 2.",
    code: `result = True + True + False\nprint(result)`,
    expectedOutput: "True",
    actualOutput: "2",
    options: [
      "Python booleans cannot be combined using binary addition arithmetic",
      "Target variable result is automatically forced into a boolean type container",
      "Function print(result) requires explicit boolean casting: bool(result)",
      "bool subclasses int where True is 1 and False is 0; + performs integer math"
    ],
    correctOption: 3,
    explanation: "WHAT: Boolean integer arithmetic. WHY: `bool` inherits from `int` where `True == 1` and `False == 0`. HOW: Use logical operators `True or False` instead of `+`.",
    basePoints: 150,
    tags: ["python", "bool", "types"]
  },
  {
    id: "od-10",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 5,
    title: "ParseInt Radix Parsing Trap",
    description: "parseInt('08') or parseInt('0xF') behaves unexpectedly without explicit radix.",
    code: `const nums = ['10', '10', '10'].map(parseInt);\nconsole.log(nums);`,
    expectedOutput: "[10, 10, 10]",
    actualOutput: "[10, NaN, 2]",
    options: [
      "Array.map passes index as radix to parseInt; indices 0, 1, 2 alter parse base",
      "Built-in function parseInt cannot operate on elements contained inside arrays",
      "Array literal ['10', '10', '10'] cannot store identical duplicate elements",
      "Array higher-order method map requires an arrow callback wrapper function"
    ],
    correctOption: 0,
    explanation: "WHAT: Radix argument collision in map. WHY: `map` passes index as 2nd arg to `parseInt(val, radix)`. `parseInt('10', 1)` is `NaN`, `parseInt('10', 2)` is `2`. HOW: Use `nums.map(n => parseInt(n, 10))` or `nums.map(Number)`.",
    basePoints: 175,
    tags: ["javascript", "map", "parseint"]
  },
  {
    id: "od-11",
    mode: "output_detective",
    language: "Java",
    difficulty: 5,
    title: "Subtle String Substring End Index",
    description: "getSlice('HELLO', 1, 3) returns 'EL' instead of 'ELL'.",
    code: `public String getSlice(String str, int start, int end) {\n    return str.substring(start, end);\n}`,
    expectedOutput: "ELL",
    actualOutput: "EL",
    options: [
      "Method String.substring only accepts a single starting offset parameter",
      "String.substring end index is exclusive; extracts indices start through end - 1",
      "String character index positioning in standard Java runtime is 1-based",
      "Java substring operations cannot extract uppercase ASCII alphabet characters"
    ],
    correctOption: 1,
    explanation: "WHAT: Exclusive end index. WHY: `substring(1, 3)` extracts characters at indices 1 and 2 ('E' and 'L'). HOW: Pass `end + 1` or `str.substring(1, 4)`.",
    basePoints: 175,
    tags: ["java", "strings", "substring"]
  },
  {
    id: "od-12",
    mode: "output_detective",
    language: "C++",
    difficulty: 5,
    title: "Floating Point Formatting Truncation",
    description: "Printing float 3.14159265 outputs 3.14159 with default precision.",
    code: `double pi = 3.1415926535;\nstd::cout << pi;`,
    expectedOutput: "3.1415926535",
    actualOutput: "3.14159",
    options: [
      "Variable of type double cannot store numbers with more than five decimals",
      "Variable pi must be output using C-style printf format specifiers exclusively",
      "Stream std::cout defaults to 6 significant digits; setprecision adjusts output",
      "Standard output stream std::cout cannot print decimal point characters"
    ],
    correctOption: 2,
    explanation: "WHAT: Default stream precision limit. WHY: Streams default to 6 digits total. HOW: Use `std::cout << std::setprecision(10) << pi;`.",
    basePoints: 175,
    tags: ["cpp", "io", "precision"]
  },
  {
    id: "od-13",
    mode: "output_detective",
    language: "Python",
    difficulty: 5,
    title: "List Multiplication Reference Duplication",
    description: "Modifying grid[0][0] unexpectedly modifies all rows in the 2D grid.",
    code: `grid = [[0] * 3] * 3\ngrid[0][0] = 99\nprint(grid)`,
    expectedOutput: "[[99, 0, 0], [0, 0, 0], [0, 0, 0]]",
    actualOutput: "[[99, 0, 0], [99, 0, 0], [99, 0, 0]]",
    options: [
      "Multiplying a list copies the reference to the same inner list 3 times",
      "Double bracket indexing grid[0][0] is invalid matrix syntax in Python",
      "Integer value 99 exceeds maximum allowable element size for nested lists",
      "Printing multidimensional grids requires invoking a recursive loop helper"
    ],
    correctOption: 0,
    explanation: "WHAT: Shared list reference. WHY: `[list] * 3` creates three references to the exact same list object. HOW: Use list comprehension `[[0]*3 for _ in range(3)]`.",
    basePoints: 175,
    tags: ["python", "lists", "references"]
  },
  {
    id: "od-14",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 6,
    title: "Array Reduce Initial Accumulator",
    description: "Calculating sum of item prices returns '[object Object]2030' instead of 60.",
    code: `const items = [{price: 10}, {price: 20}, {price: 30}];\nconst total = items.reduce((acc, item) => acc + item.price);\nconsole.log(total);`,
    expectedOutput: "60",
    actualOutput: "[object Object]2030",
    options: [
      "Method items.reduce cannot iterate over collection element object properties",
      "Missing initial value in reduce uses first object as acc; supply 0 as seed",
      "Expression acc + item.price must be calculated using built-in Math.sum()",
      "Constant variable declaration const total cannot store primitive numbers"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing initial reduce value. WHY: Without an initial value, `acc` starts as `{price: 10}` object. HOW: Pass `0` as initial value: `reduce((acc, item) => acc + item.price, 0)`.",
    basePoints: 200,
    tags: ["javascript", "reduce", "objects"]
  },
  {
    id: "od-15",
    mode: "output_detective",
    language: "Java",
    difficulty: 6,
    title: "Enum Name vs ToString Override",
    description: "Printing enum constants prints uppercase identifier instead of formatted display name.",
    code: `enum Role { ADMIN, USER }\nSystem.out.println(Role.ADMIN);`,
    expectedOutput: "Administrator",
    actualOutput: "ADMIN",
    options: [
      "Enum constant Role.ADMIN cannot be passed directly to System.out.println",
      "Method System.out.println exclusively prints primitive string literals",
      "Enum constants must be instantiated using the new keyword operator syntax",
      "Default enum toString() returns constant name unless explicitly overridden"
    ],
    correctOption: 3,
    explanation: "WHAT: Default enum string conversion. WHY: `enum.toString()` defaults to constant name (`ADMIN`). HOW: Override `toString()` or define a custom `getDisplayName()` field.",
    basePoints: 200,
    tags: ["java", "enums", "tostring"]
  },
  {
    id: "od-16",
    mode: "output_detective",
    language: "SQL",
    difficulty: 6,
    title: "NULL Count vs Asterisk Count",
    description: "Why does COUNT(bonus) output 3 when there are 5 total employee rows?",
    code: `SELECT COUNT(bonus) FROM employees;`,
    expectedOutput: "5",
    actualOutput: "3",
    options: [
      "COUNT(column) skips NULL values; COUNT(*) counts all rows regardless of NULLs",
      "Aggregation function COUNT exclusively operates on defined primary keys",
      "Column bonus contains negative numeric values which are omitted by count",
      "SQL COUNT aggregate function can only count up to three rows without WHERE"
    ],
    correctOption: 0,
    explanation: "WHAT: COUNT ignores NULLs. WHY: `COUNT(col)` excludes rows where `col` is NULL. HOW: Use `COUNT(*)` to count total rows.",
    basePoints: 200,
    tags: ["sql", "null", "count"]
  },
  {
    id: "od-17",
    mode: "output_detective",
    language: "C++",
    difficulty: 7,
    title: "Unsigned Integer Underflow in Loop",
    description: "The countdown loop is supposed to stop at 0, but prints 4294967295 and runs infinitely.",
    code: `for (unsigned int i = 5; i >= 0; i--) {\n    std::cout << i << " ";\n}`,
    expectedOutput: "5 4 3 2 1 0 ",
    actualOutput: "Infinite loop printing underflow values",
    options: [
      "Postfix decrement operator i-- is invalid for unsigned primitive integers",
      "Unsigned int cannot be negative; 0 underflows to UINT_MAX keeping i >= 0 true",
      "Stream std::cout cannot format unsigned integer primitive variables",
      "Unsigned integer variables in for loops must be initialized starting at 0"
    ],
    correctOption: 1,
    explanation: "WHAT: Unsigned underflow. WHY: `0u - 1` wraps around to `4294967295`, so `i >= 0` is perpetually true. HOW: Use signed `int` or a different loop structure.",
    basePoints: 225,
    tags: ["cpp", "types", "underflow"]
  },
  {
    id: "od-18",
    mode: "output_detective",
    language: "Python",
    difficulty: 7,
    title: "Dictionary View Dynamic Reflection",
    description: "dict.keys() output changes after adding new keys without re-calling keys().",
    code: `d = {'a': 1}\nkeys = d.keys()\nd['b'] = 2\nprint(list(keys))`,
    expectedOutput: "['a']",
    actualOutput: "['a', 'b']",
    options: [
      "Method d.keys() returns a static immutable snapshot copy of dictionary keys",
      "Dictionary key assignment d['b'] = 2 is invalid syntax in Python 3 runtime",
      "Built-in function list() cannot cast dictionary view objects dynamically",
      "dict.keys() returns a live dynamic view reflecting all subsequent mutations"
    ],
    correctOption: 3,
    explanation: "WHAT: Live dictionary views in Python 3. WHY: `keys()` is a view, not a static list copy. HOW: Use `list(d.keys())` immediately if a snapshot is needed.",
    basePoints: 225,
    tags: ["python", "dict", "views"]
  },
  {
    id: "od-19",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 7,
    title: "Object Key Insertion Order Coercion",
    description: "Iterating keys of { '2': 'two', '1': 'one', 'b': 'bee', 'a': 'aye' } prints ['1', '2', 'b', 'a'].",
    code: `const obj = { '2': 'two', '1': 'one', 'b': 'bee', 'a': 'aye' };\nconsole.log(Object.keys(obj));`,
    expectedOutput: "['2', '1', 'b', 'a']",
    actualOutput: "['1', '2', 'b', 'a']",
    options: [
      "JS engine sorts integer-like string keys in ascending numerical order first",
      "Object.keys reverses all dictionary entries upon reading property table",
      "Plain JavaScript objects cannot contain numeric string keys in definition",
      "Declaring const obj prevents custom insertion ordering of string keys"
    ],
    correctOption: 0,
    explanation: "WHAT: Integer key ordering semantics. WHY: ES6 specification dictates integer keys are sorted in ascending numerical order before string keys. HOW: Use a `Map` to preserve exact insertion order.",
    basePoints: 225,
    tags: ["javascript", "objects", "keys"]
  },
  {
    id: "od-20",
    mode: "output_detective",
    language: "Java",
    difficulty: 7,
    title: "BigDecimal Double Constructor Loss of Precision",
    description: "new BigDecimal(0.1) prints 0.1000000000000000055511151231257827021181583404541015625.",
    code: `BigDecimal val = new BigDecimal(0.1);\nSystem.out.println(val);`,
    expectedOutput: "0.1",
    actualOutput: "0.1000000000000000055511151231257827021181583404541015625",
    options: [
      "BigDecimal class cannot represent decimal numbers with fractional values",
      "Literal 0.1 passes inexact binary double; use new BigDecimal(\"0.1\")",
      "Literal 0.1 is treated as an integer literal by the Java bytecode compiler",
      "Method System.out.println cannot format or print BigDecimal instances"
    ],
    correctOption: 1,
    explanation: "WHAT: Inexact double binary float in BigDecimal constructor. WHY: `0.1` double literal is already binary inexact before constructor is called. HOW: Use `new BigDecimal(\"0.1\")` or `BigDecimal.valueOf(0.1)`.",
    basePoints: 225,
    tags: ["java", "bigdecimal", "precision"]
  },
  {
    id: "od-21",
    mode: "output_detective",
    language: "C++",
    difficulty: 8,
    title: "Side Effect Evaluation Order in Function Call",
    description: "f(i++, i++) produces different argument results across GCC and Clang compilers.",
    code: `int i = 1;\nprintArgs(i++, i++);`,
    expectedOutput: "1, 2",
    actualOutput: "Undefined order: 2, 1 or 1, 2",
    options: [
      "Function argument evaluation order is unsequenced; modifying i twice is UB",
      "Increment expression i++ cannot be passed directly into function arguments",
      "Function printArgs requires parameter declarations marked with const",
      "Variable declaration int i = 1 must be given static storage duration"
    ],
    correctOption: 0,
    explanation: "WHAT: Unsequenced argument evaluation. WHY: C++ standards do not specify left-to-right or right-to-left argument evaluation. HOW: Increment in separate statements before passing.",
    basePoints: 250,
    tags: ["cpp", "evaluation_order", "undefined_behavior"]
  },
  {
    id: "od-22",
    mode: "output_detective",
    language: "Python",
    difficulty: 8,
    title: "Variable Scope in List Comprehension Leak",
    description: "In Python 2 vs 3, loop variables in list comprehensions behave differently.",
    code: `x = 'global'\ncomp = [x for x in range(3)]\nprint(x)`,
    expectedOutput: "2",
    actualOutput: "global",
    options: [
      "Iterator range(3) deletes outer variable x from module execution namespace",
      "Comprehension variable comp must be printed rather than variable x",
      "Identifier x is a reserved keyword in Python 3 comprehension expressions",
      "In Python 3, comprehensions have isolated scope and do not leak variables"
    ],
    correctOption: 3,
    explanation: "WHAT: Comprehension scope isolation. WHY: In Python 3, list comprehensions run in their own nested scope. HOW: Expect `x` to remain `'global'`.",
    basePoints: 250,
    tags: ["python", "scope", "comprehensions"]
  },
  {
    id: "od-23",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 8,
    title: "Regex Global Flag Sticky State",
    description: "test() on same regex alternates between true and false on identical input.",
    code: `const regex = /abc/g;\nconsole.log(regex.test("abc")); // true\nconsole.log(regex.test("abc")); // false`,
    expectedOutput: "true, true",
    actualOutput: "true, false",
    options: [
      "Method regex.test can only be invoked once per regular expression lifecycle",
      "Global /g maintains stateful lastIndex; match advances index to string end",
      "Pattern 'abc' cannot match identical input strings across separate lines",
      "Variable declaration const regex must be declared using mutable let keyword"
    ],
    correctOption: 1,
    explanation: "WHAT: Stateful `lastIndex` on `/g` regexes. WHY: `.test()` advances `lastIndex` to 3, so next call searches after end of string. HOW: Reset `regex.lastIndex = 0` or omit `/g` flag.",
    basePoints: 250,
    tags: ["javascript", "regex", "lastIndex"]
  },
  {
    id: "od-24",
    mode: "output_detective",
    language: "SQL",
    difficulty: 8,
    title: "Inverted Boolean Logic with NULL in NOT IN",
    description: "Query with WHERE col NOT IN (1, 2, NULL) outputs 0 rows.",
    code: `SELECT id FROM table WHERE id NOT IN (1, 2, NULL);`,
    expectedOutput: "Rows where id is 3, 4, 5",
    actualOutput: "0 rows (empty set)",
    options: [
      "id != NULL yields UNKNOWN; AND-ed condition evaluates to false for all rows",
      "Predicate NOT IN cannot accept three or more arguments in standard SQL",
      "The query table must possess an explicit clustered index on the id column",
      "Column id data type must be converted to varchar for set membership checks"
    ],
    correctOption: 0,
    explanation: "WHAT: Three-valued logic NOT IN with NULL. WHY: `id NOT IN (1, NULL)` expands to `id != 1 AND id != NULL`. Since `!= NULL` is UNKNOWN, the whole expression is never TRUE. HOW: Use `NOT EXISTS` or filter out NULLs.",
    basePoints: 250,
    tags: ["sql", "null", "not_in"]
  },
  {
    id: "od-25",
    mode: "output_detective",
    language: "Java",
    difficulty: 8,
    title: "String Deduplication String Pool vs Heap",
    description: "Checking s1 == s2 prints false even when both hold 'hello'.",
    code: `String s1 = "hello";\nString s2 = new String("hello");\nSystem.out.println(s1 == s2);`,
    expectedOutput: "true",
    actualOutput: "false",
    options: [
      "new String() creates distinct heap object, bypassing string intern pool",
      "Variables s1 and s2 contain distinct character sequences at byte level",
      "Method System.out.println cannot format or print boolean logic results",
      "String literal 'hello' must be capitalized to match string pool constants"
    ],
    correctOption: 0,
    explanation: "WHAT: Heap allocation vs String Constant Pool. WHY: `new String()` allocates a new memory object. `==` checks reference address. HOW: Use `s1.equals(s2)` or `s2.intern()`.",
    basePoints: 250,
    tags: ["java", "string_pool", "equality"]
  },
  {
    id: "od-26",
    mode: "output_detective",
    language: "C++",
    difficulty: 9,
    title: "Vector Reallocation Invalidating References",
    description: "Reading reference to first vector element after push_back prints corrupted garbage value.",
    code: `std::vector<int> v = {10};\nconst int& ref = v[0];\nv.push_back(20);\nstd::cout << ref;`,
    expectedOutput: "10",
    actualOutput: "Garbage memory / crash",
    options: [
      "Reference type const int& cannot bind to primitive vector elements in C++",
      "Invocation push_back(20) automatically deletes element 0 from the vector",
      "Vector element access v[0] requires invoking member method v.at(0) instead",
      "push_back reallocated buffer on capacity growth, leaving ref dangling"
    ],
    correctOption: 3,
    explanation: "WHAT: Reference invalidation on reallocation. WHY: `push_back` allocated a new array and deleted the old one. HOW: Access `v[0]` directly instead of caching references.",
    basePoints: 275,
    tags: ["cpp", "vector", "invalidation"]
  },
  {
    id: "od-27",
    mode: "output_detective",
    language: "Python",
    difficulty: 9,
    title: "Tuple Hash Collision Identity Check",
    description: "Checking hash(a) == hash(b) returns true, but a is b returns false.",
    code: `a = (1, 2)\nb = (1, 2)\nprint(hash(a) == hash(b), a is b)`,
    expectedOutput: "True True",
    actualOutput: "True False (or compiler dependent)",
    options: [
      "Built-in hash() produces non-deterministic random integers on each run",
      "Equal tuples share equal hashes but may be distinct objects in memory",
      "Tuple objects cannot be passed into built-in hash calculation functions",
      "Identity expression a is b is an illegal syntax operation in Python 3"
    ],
    correctOption: 1,
    explanation: "WHAT: Value equality vs Object Identity. WHY: `is` checks memory addresses. Equal values have equal hashes but may be distinct heap objects. HOW: Use `==` for value comparison.",
    basePoints: 275,
    tags: ["python", "identity", "hash"]
  },
  {
    id: "od-28",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 9,
    title: "Async Microtask Queue Starvation Output Order",
    description: "setTimeout callback prints after 100 resolved Promise microtasks.",
    code: `setTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise 1'))\n  .then(() => console.log('Promise 2'));`,
    expectedOutput: "Timeout, Promise 1, Promise 2",
    actualOutput: "Promise 1, Promise 2, Timeout",
    options: [
      "Microtasks (Promises) drain completely before macrotasks (setTimeout) run",
      "Timer setTimeout 0 is delayed by 10 full seconds by the browser runtime",
      "Promise.resolve chaining is not permitted without async function wrappers",
      "Method console.log is executed asynchronously by browser layout engines"
    ],
    correctOption: 0,
    explanation: "WHAT: Event loop microtask priority. WHY: Microtasks run immediately after current script before next timer macrotask. HOW: Promises always resolve before `setTimeout(..., 0)`.",
    basePoints: 275,
    tags: ["javascript", "event_loop", "microtasks"]
  },
  {
    id: "od-29",
    mode: "output_detective",
    language: "SQL",
    difficulty: 9,
    title: "CASE WHEN Null Evaluation Fallthrough",
    description: "CASE statement with WHEN NULL falls through to ELSE branch.",
    code: `SELECT CASE score \n  WHEN NULL THEN 'No Score' \n  ELSE 'Has Score' \nEND \nFROM students;`,
    expectedOutput: "No Score",
    actualOutput: "Has Score",
    options: [
      "SQL CASE statements do not support optional fallback ELSE clauses",
      "Table students cannot execute conditional CASE expressions in queries",
      "Simple CASE tests score = NULL which is UNKNOWN; use CASE WHEN score IS NULL",
      "Keyword END must be terminated with END CASE syntax in standard SQL"
    ],
    correctOption: 2,
    explanation: "WHAT: Simple CASE NULL comparison failure. WHY: `CASE x WHEN y` tests `x = y`. When `y` is NULL, `= NULL` fails. HOW: Use searched `CASE WHEN score IS NULL THEN 'No Score' END`.",
    basePoints: 275,
    tags: ["sql", "case", "null"]
  },
  {
    id: "od-30",
    mode: "output_detective",
    language: "Java",
    difficulty: 10,
    title: "Class Initialization Deadlock Output Freeze",
    description: "Referencing two mutually static initializing classes freezes main thread with no output.",
    code: `class A { static { B.init(); } }\nclass B { static { A.init(); } }`,
    expectedOutput: "Initialized A and B",
    actualOutput: "Thread hangs permanently in deadlock",
    options: [
      "Static initializer blocks cannot invoke methods declared in other classes",
      "Java classes must contain a public static void main method signature",
      "Classes A and B cannot share identical static method names in package",
      "JVM locks classes during init; mutual static dependencies cause deadlock"
    ],
    correctOption: 3,
    explanation: "WHAT: Class loading deadlock. WHY: Thread loading `A` locks `A` and waits for `B`; thread loading `B` locks `B` and waits for `A`. HOW: Eliminate circular dependencies in static initializers.",
    basePoints: 300,
    tags: ["java", "class_loading", "deadlock"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OUTPUT_DETECTIVE_BANK };
}
