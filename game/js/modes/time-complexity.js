/**
 * Code Debugger - Mode 5: Time Complexity Trap (30 Challenges)
 * Algorithmic bottlenecks, redundant work, and quadratic/exponential traps.
 */

const TIME_COMPLEXITY_BANK = [
  {
    id: "tc-01",
    mode: "time_complexity",
    language: "Python",
    difficulty: 2,
    title: "Linear Lookup in Nested Loop",
    description: "Checking if elements of list A exist in list B runs in O(N*M) time and times out.",
    code: `def find_common(a, b):\n    common = []\n    for item in a:\n        if item in b:\n            common.append(item)\n    return common`,
    options: [
      "Membership check 'item in b' does an O(M) scan on lists; converting b to set(b) yields O(1) lookups",
      "Appending to common creates O(M) array reallocation on each hit; pre-allocating common is required",
      "Iterating 'for item in a' takes O(N log N) overhead; an indexed while loop avoids iterator penalty",
      "List element comparisons take O(N*M) time; cast elements to fixed-width strings before comparing"
    ],
    correctOption: 0,
    explanation: "WHAT: O(N*M) membership search. WHY: `in` on a Python list scans every element. HOW: Convert `b` to `set(b)` for O(1) hash lookups, reducing total time to O(N + M).",
    basePoints: 100,
    tags: ["python", "complexity", "sets"]
  },
  {
    id: "tc-02",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 2,
    title: "String Concatenation in Loop",
    description: "Repeatedly concatenating characters inside a large loop creates unnecessary allocations.",
    code: `function buildString(n) {\n  let s = "";\n  for (let i = 0; i < n; i++) {\n    s += "a";\n  }\n  return s;\n}`,
    options: [
      "JavaScript numeric limits prevent loop counter i from exceeding safe integer bounds efficiently",
      "String immutability forces buffer reallocation and copying of the entire string on every iteration",
      "Declaring let s inside the function scope triggers garbage collection pauses on each loop cycle",
      "The addition operator += converts characters to ASCII byte arrays before rebuilding output text"
    ],
    correctOption: 1,
    explanation: "WHAT: Quadratic O(N^2) string allocations. WHY: Strings are immutable in JS; repeated `+=` reallocates buffers. HOW: Use `'a'.repeat(n)` or push to array and `.join('')`.",
    basePoints: 100,
    tags: ["javascript", "strings", "complexity"]
  },
  {
    id: "tc-03",
    mode: "time_complexity",
    language: "C++",
    difficulty: 3,
    title: "Vector Front Erasure Trap",
    description: "Removing elements from the beginning of std::vector runs in O(N^2) time.",
    code: `void processQueue(std::vector<int>& tasks) {\n    while (!tasks.empty()) {\n        int task = tasks.front();\n        tasks.erase(tasks.begin());\n        handle(task);\n    }\n}`,
    options: [
      "tasks.front() makes an unnecessary deep copy of the first task element instead of moving it",
      "Calling tasks.empty() traverses the full vector sequentially to determine if size is zero",
      "std::vector::erase at index 0 shifts all remaining elements left, taking O(N) per pop (O(N^2) total)",
      "Passing tasks by reference invalidates internal vector iterators after the first erasure"
    ],
    correctOption: 2,
    explanation: "WHAT: O(N) front erasure. WHY: Vectors are contiguous arrays; removing index 0 moves all remaining items. HOW: Use `std::deque` or `std::queue` for O(1) pops.",
    basePoints: 125,
    tags: ["cpp", "vector", "data_structures"]
  },
  {
    id: "tc-04",
    mode: "time_complexity",
    language: "Java",
    difficulty: 3,
    title: "LinkedList Random Indexing",
    description: "Iterating through LinkedList using indexed get(i) results in O(N^2) complexity.",
    code: `public int sumList(LinkedList<Integer> list) {\n    int sum = 0;\n    for (int i = 0; i < list.size(); i++) {\n        sum += list.get(i);\n    }\n    return sum;\n}`,
    options: [
      "Calling list.size() on every iteration rebuilds the internal node links from scratch in O(N) time",
      "Summing primitive int with Integer object causes thread synchronization lock contention in Java",
      "LinkedList does not support indexed iteration without first converting the collection to an array",
      "LinkedList.get(i) traverses nodes from the head on every call, taking O(i) steps (O(N^2) overall)"
    ],
    correctOption: 3,
    explanation: "WHAT: O(N) random access in linked list. WHY: Linked lists have no direct indexing. HOW: Use an enhanced for-loop `for (int val : list)` or an `Iterator` for O(N) total time.",
    basePoints: 125,
    tags: ["java", "linked_list", "complexity"]
  },
  {
    id: "tc-05",
    mode: "time_complexity",
    language: "Python",
    difficulty: 4,
    title: "Repeated List Indexing in Loop",
    description: "Calling list.index(x) inside a loop takes O(N^2) time.",
    code: `def get_indices(items, targets):\n    return [items.index(t) for t in targets]`,
    options: [
      "items.index(t) does a full linear scan for every target; build a dict lookup {val: idx} for O(1) access",
      "List comprehension creates separate thread allocations for each target element in the targets list",
      "items.index(t) throws an unhandled exception when duplicate values exist in the input items array",
      "Iterating targets dynamically locks the items list buffer, preventing vectorized CPU cache hits"
    ],
    correctOption: 0,
    explanation: "WHAT: O(N*M) repeated linear search. WHY: `.index()` scans from start of list every time. HOW: Pre-build an index map: `lookup = {val: i for i, val in enumerate(items)}`.",
    basePoints: 150,
    tags: ["python", "complexity", "index"]
  },
  {
    id: "tc-06",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 4,
    title: "Array Shift Queue Simulation",
    description: "Simulating a queue of 100,000 items with array.shift() freezes the UI.",
    code: `function runQueue(items) {\n  while (items.length > 0) {\n    const current = items.shift();\n    process(current);\n  }\n}`,
    options: [
      "Checking items.length inside the while loop causes a DOM repaint on every queue item processed",
      "Array.shift() shifts all remaining elements in memory by one index, taking O(N) per dequeue step",
      "JavaScript arrays are capped at 10,000 items before forcing synchronous garbage collector cycles",
      "process(current) must be invoked inside requestAnimationFrame to prevent event loop blocking"
    ],
    correctOption: 1,
    explanation: "WHAT: O(N) shift bottleneck. WHY: JS engines re-index the backing buffer on shift. HOW: Maintain an index pointer or use a proper Queue data structure.",
    basePoints: 150,
    tags: ["javascript", "arrays", "queue"]
  },
  {
    id: "tc-07",
    mode: "time_complexity",
    language: "C++",
    difficulty: 4,
    title: "Pass Large Object by Value",
    description: "Passing large std::vector<std::string> by value to helper copies entire vector on every call.",
    code: `int countWords(std::vector<std::string> words) {\n    return words.size();\n}`,
    options: [
      "words.size() requires O(N) linear time to count characters stored across all string objects",
      "countWords must return std::size_t to avoid runtime truncation exceptions on 64-bit systems",
      "Passing by value deep-copies the entire vector and all internal heap strings; pass by const reference",
      "std::vector cannot safely hold std::string without explicit custom heap allocator definitions"
    ],
    correctOption: 2,
    explanation: "WHAT: Unnecessary deep copy. WHY: Pass by value copies the entire vector container. HOW: Pass `const std::vector<std::string>& words`.",
    basePoints: 150,
    tags: ["cpp", "references", "performance"]
  },
  {
    id: "tc-08",
    mode: "time_complexity",
    language: "Java",
    difficulty: 5,
    title: "String Concatenation in Loop with +",
    description: "Building a 10,000-line CSV with + operator takes seconds instead of milliseconds.",
    code: `String result = "";\nfor (String row : rows) {\n    result += row + "\\n";\n}`,
    options: [
      "Enhanced for loop allocates an iterator object that leaks memory on each CSV row iteration",
      "Newline character '\\n' must be escaped as '\\\\n' to prevent regex compilation inside String",
      "Initializing String result to empty string disables compiler-level escape analysis optimizations",
      "String + in a loop creates and copies a new String object on every iteration; use StringBuilder"
    ],
    correctOption: 3,
    explanation: "WHAT: O(N^2) string buffer reallocations. WHY: Strings are immutable in Java. HOW: Use `StringBuilder sb = new StringBuilder(); sb.append(row).append(\"\\n\");`.",
    basePoints: 175,
    tags: ["java", "stringbuilder", "performance"]
  },
  {
    id: "tc-09",
    mode: "time_complexity",
    language: "Python",
    difficulty: 5,
    title: "Naive Exponential Fibonacci",
    description: "fib(40) hangs for minutes due to exponential branch explosion.",
    code: `def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)`,
    options: [
      "Unmemoized recursion recomputes identical subproblems creating O(2^N) exponential complexity",
      "Base condition n <= 1 causes stack overflow because negative numbers never reach zero recursion",
      "Python recursion limit triggers silent arithmetic truncation on numbers exceeding 32-bit limits",
      "Double function call fib(n-1) + fib(n-2) creates deadlock between competing bytecode threads"
    ],
    correctOption: 0,
    explanation: "WHAT: O(2^N) exponential recursion. WHY: Branching tree recalculates subtrees redundantly. HOW: Add `@functools.lru_cache` or use dynamic programming for O(N).",
    basePoints: 175,
    tags: ["python", "dp", "memoization"]
  },
  {
    id: "tc-10",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 5,
    title: "Nested Array Includes in Filter",
    description: "Filtering 50,000 elements against list with includes() runs in O(N*M) quadratic time.",
    code: `const activeUsers = allUsers.filter(u => activeIds.includes(u.id));`,
    options: [
      "allUsers.filter cannot accept arrow functions with implicit return values in strict mode",
      "activeIds.includes() is an O(M) linear scan for every user; convert activeIds to a Set for O(1) has() lookups",
      "u.id comparison performs type coercion on numbers, slowing down JavaScript V8 hidden classes",
      "Array.prototype.includes() creates a temporary shallow copy of the target array on each call"
    ],
    correctOption: 1,
    explanation: "WHAT: O(N*M) membership search. WHY: Array `.includes()` scans every ID. HOW: `const activeSet = new Set(activeIds); allUsers.filter(u => activeSet.has(u.id));`.",
    basePoints: 175,
    tags: ["javascript", "set", "complexity"]
  },
  {
    id: "tc-11",
    mode: "time_complexity",
    language: "C++",
    difficulty: 6,
    title: "Repeated String Substr in Recursion",
    description: "Recursive string parser creates O(N^2) memory copies through string slicing.",
    code: `void parseAll(std::string s) {\n    if (s.empty()) return;\n    handleChar(s[0]);\n    parseAll(s.substr(1));\n}`,
    options: [
      "Calling s.empty() requires traversing the entire null-terminated character buffer in O(N) time",
      "s[0] accesses uninitialized memory whenever string length exceeds small string optimization limits",
      "std::string::substr creates a heap-allocated copy on each recursive step taking O(N^2) time",
      "Recursive void functions in C++ cannot safely receive std::string parameters without std::move"
    ],
    correctOption: 2,
    explanation: "WHAT: O(N) substring copying. WHY: `s.substr(1)` copies `N-1` bytes every recursive call. HOW: Pass `std::string_view` or an integer offset index `size_t index`.",
    basePoints: 200,
    tags: ["cpp", "strings", "string_view"]
  },
  {
    id: "tc-12",
    mode: "time_complexity",
    language: "Java",
    difficulty: 6,
    title: "Regex Recompilation in Loop",
    description: "Validating 50,000 strings with String.matches() causes severe CPU bottleneck.",
    code: `public int countMatches(List<String> list) {\n    int count = 0;\n    for (String s : list) {\n        if (s.matches(\"^[0-9]+$\")) count++;\n    }\n    return count;\n}`,
    options: [
      "List iteration using enhanced for loop triggers expensive class loader checks on every string",
      "count++ operation causes atomic memory fencing overhead on multi-core Java virtual machines",
      "Regex pattern ^[0-9]+$ contains syntax errors that cause fallback backtracking parsing loops",
      "String.matches() recompiles the Pattern regex on every single loop iteration; precompile Pattern"
    ],
    correctOption: 3,
    explanation: "WHAT: Regex recompilation. WHY: `String.matches(regex)` compiles a new `Pattern` object each call. HOW: Compile once: `private static final Pattern DIGITS = Pattern.compile(\"^[0-9]+$\");`.",
    basePoints: 200,
    tags: ["java", "regex", "performance"]
  },
  {
    id: "tc-13",
    mode: "time_complexity",
    language: "Python",
    difficulty: 6,
    title: "Quadratic String Join with +=",
    description: "Joining array of 100,000 words with result += word takes 15 seconds.",
    code: `result = ""\nfor w in words:\n    result += w`,
    options: [
      "String concatenation with += reallocates memory on every iteration; use ''.join(words) for O(N) linear time",
      "Iterating words using a for loop creates unnecessary iterator frame objects in the Python interpreter",
      "result variable must be initialized as a bytearray to support dynamic unicode string resizing",
      "String += operator converts each word to an ASCII tuple before reassembling output into memory"
    ],
    correctOption: 0,
    explanation: "WHAT: O(N^2) string buffer copying. WHY: Strings are immutable in Python. HOW: Use `''.join(words)`.",
    basePoints: 200,
    tags: ["python", "strings", "join"]
  },
  {
    id: "tc-14",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 6,
    title: "Array Splice in Loop Removal",
    description: "Removing all even numbers with array.splice(i, 1) shifts remaining elements on each removal.",
    code: `for (let i = arr.length - 1; i >= 0; i--) {\n  if (arr[i] % 2 === 0) arr.splice(i, 1);\n}`,
    options: [
      "Decrementing loop index i >= 0 causes JavaScript engine to deoptimize array bounds checks",
      "Array.splice() shifts all elements after index i (O(N) per deletion, O(N^2) total); use arr.filter() for O(N)",
      "Modulo operator % 2 converts array numbers to 32-bit floats, causing arithmetic slowdowns",
      "Array.prototype.splice requires passing 3 arguments to avoid corrupting array internal length"
    ],
    correctOption: 1,
    explanation: "WHAT: O(N^2) array deletion shifting. WHY: Each `splice` shifts trailing elements in memory. HOW: Use `arr = arr.filter(x => x % 2 !== 0)`.",
    basePoints: 200,
    tags: ["javascript", "arrays", "filter"]
  },
  {
    id: "tc-15",
    mode: "time_complexity",
    language: "C++",
    difficulty: 7,
    title: "Std Set vs Unordered Set Lookup",
    description: "Performing 1,000,000 lookups on std::set takes 5x longer than std::unordered_set.",
    code: `std::set<int> numbers; // 1,000,000 items\nbool found = numbers.find(target) != numbers.end();`,
    options: [
      "std::set::find performs a linear search across tree leaf nodes when target element is not found",
      "Comparing iterator with numbers.end() requires O(log N) operations to compute the end pointer",
      "std::set is a Red-Black tree with O(log N) lookups; std::unordered_set is a hash table with O(1) average lookups",
      "std::set stores integers as boxed pointer nodes that bypass CPU L1 data cache prefetching"
    ],
    correctOption: 2,
    explanation: "WHAT: Tree traversal vs Hash lookup. WHY: `std::set` is an ordered balanced binary search tree (O(log N)). HOW: Use `std::unordered_set` for O(1) average lookups.",
    basePoints: 225,
    tags: ["cpp", "set", "hash_table"]
  },
  {
    id: "tc-16",
    mode: "time_complexity",
    language: "Java",
    difficulty: 7,
    title: "Contains on Unhashed Custom Object",
    description: "HashSet.contains() performs slow linear scans when hashCode() is not overridden.",
    code: `Set<User> set = new HashSet<>();\nset.contains(targetUser); // User lacks hashCode() override`,
    options: [
      "HashSet cannot safely store custom objects without implementing the Comparable interface",
      "Calling contains() on HashSet forces a full garbage collection cycle to verify object references",
      "Java Set collections require targetUser to be declared final to enable hash table lookups",
      "Without custom hashCode(), all objects hash into default identity buckets causing bucket degradation or failed lookups"
    ],
    correctOption: 3,
    explanation: "WHAT: Hash bucket degradation. WHY: Inconsistent `hashCode()` breaks hash distribution. HOW: Override `hashCode()` and `equals()` consistently.",
    basePoints: 225,
    tags: ["java", "hashset", "hashcode"]
  },
  {
    id: "tc-17",
    mode: "time_complexity",
    language: "Python",
    difficulty: 7,
    title: "Deque vs List Popleft",
    description: "Using list.pop(0) in BFS takes O(N) per pop, causing O(N^2) total time.",
    code: `queue = [start]\nwhile queue:\n    node = queue.pop(0)`,
    options: [
      "list.pop(0) shifts all remaining elements in memory; collections.deque popleft() runs in O(1) constant time",
      "Evaluating 'while queue' evaluates list length in O(N) time instead of checking pointer status",
      "queue.pop(0) clears the entire memory buffer, forcing Python to reallocate the list array",
      "Python list pop operation requires passing a slice index to remove elements from the start"
    ],
    correctOption: 0,
    explanation: "WHAT: O(N) popleft in list. WHY: Python lists are dynamic arrays; index 0 removal requires shifting elements. HOW: Use `collections.deque`.",
    basePoints: 225,
    tags: ["python", "deque", "complexity"]
  },
  {
    id: "tc-18",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 7,
    title: "Spread Operator in Loop Accumulator",
    description: "Accumulating items with arr = [...arr, item] runs in O(N^2) time.",
    code: `let arr = [];\nfor (let i = 0; i < n; i++) {\n  arr = [...arr, i];\n}`,
    options: [
      "Declaring let arr as an array literal disables JIT compiler optimizations inside for loops",
      "[...arr, i] copies the entire array on every iteration; arr.push(i) operates in O(1) amortized time",
      "Spread operator ... can only be used on objects and throws TypeError on numeric arrays in JS",
      "Loop counter i must be coerced to a string before appending to prevent integer overflow"
    ],
    correctOption: 1,
    explanation: "WHAT: O(N^2) array cloning. WHY: `[...arr, i]` copies `i` elements every step. HOW: Use `arr.push(i)`.",
    basePoints: 225,
    tags: ["javascript", "spread", "performance"]
  },
  {
    id: "tc-19",
    mode: "time_complexity",
    language: "C++",
    difficulty: 8,
    title: "Unnecessary std::endl Buffer Flushes",
    description: "Outputting 1,000,000 lines with std::endl is 100x slower than '\\n'.",
    code: `for (int i = 0; i < 1000000; i++) {\n    std::cout << i << std::endl;\n}`,
    options: [
      "std::cout cannot handle integers greater than 65535 without explicit static_cast to int64_t",
      "Loop variable i must be declared as volatile to prevent compiler from eliminating loop body",
      "std::endl explicitly flushes the I/O stream buffer on every line; '\\n' buffers writes for bulk I/O",
      "std::cout stream operators cause thread locks that prevent loop pipelining on modern CPUs"
    ],
    correctOption: 2,
    explanation: "WHAT: Synchronous buffer flushing. WHY: `std::endl` calls `stream.flush()` after writing newline, triggering expensive system calls. HOW: Use `'\\n'` with `std::ios::sync_with_stdio(false)`.",
    basePoints: 250,
    tags: ["cpp", "io", "performance"]
  },
  {
    id: "tc-20",
    mode: "time_complexity",
    language: "Java",
    difficulty: 8,
    title: "Autoboxing in Tight Arithmetic Loop",
    description: "Summing 10,000,000 numbers using Long wrapper object allocates millions of heap instances.",
    code: `Long sum = 0L;\nfor (long i = 0; i < 10000000; i++) {\n    sum += i; // autoboxes to new Long object each iteration\n}`,
    options: [
      "Loop limit 10,000,000 exceeds maximum loop bounds permitted in single Java thread executions",
      "Long sum object creates a new boxed Long heap instance on every addition; use primitive long sum = 0L",
      "sum += i operation causes floating-point conversion traps when mixing Long objects and long primitives",
      "Java Garbage Collector pauses all threads whenever long loop counters reach 1,000,000 iterations"
    ],
    correctOption: 1,
    explanation: "WHAT: Autoboxing heap allocation bottleneck. WHY: `Long` object wrapper is immutable; `+=` allocates a new `Long` object every step. HOW: Use primitive `long sum = 0L;`.",
    basePoints: 250,
    tags: ["java", "autoboxing", "gc"]
  },
  {
    id: "tc-21",
    mode: "time_complexity",
    language: "Python",
    difficulty: 8,
    title: "Substring Concatenation in Recursion Tree",
    description: "Passing string slices in recursive palindrome checker creates quadratic space copies.",
    code: `def is_pal(s):\n    if len(s) <= 1: return True\n    return s[0] == s[-1] and is_pal(s[1:-1])`,
    options: [
      "s[1:-1] copies N-2 characters on every recursion level; use two pointers (left, right) for O(1) space",
      "len(s) <= 1 fails to handle odd-length strings and causes infinite recursion loops on odd inputs",
      "Boolean operator 'and' prevents tail-call optimization from executing inside the Python runtime",
      "Comparing s[0] == s[-1] requires converting characters to unicode code points on every check"
    ],
    correctOption: 0,
    explanation: "WHAT: Slicing memory allocations. WHY: `s[1:-1]` allocates a new string copy at every depth. HOW: Pass integer index pointers `left, right`.",
    basePoints: 250,
    tags: ["python", "slices", "recursion"]
  },
  {
    id: "tc-22",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 8,
    title: "Object Keys in Loop Condition",
    description: "Calling Object.keys(obj).length in every loop iteration computes keys array redundantly.",
    code: `for (let i = 0; i < Object.keys(userMap).length; i++) {\n  // work with userMap\n}`,
    options: [
      "Object.keys(userMap) fails on objects with non-string keys, throwing uncatchable TypeError",
      "Object.keys(userMap) allocates a new array of keys on every iteration; cache length in a variable first",
      "for loops in JavaScript require index variable i to be declared using the legacy var keyword",
      "userMap must be converted into a WeakMap instance before accessing length or properties"
    ],
    correctOption: 1,
    explanation: "WHAT: Redundant array allocation in loop guard. WHY: `Object.keys()` runs on every single loop condition check. HOW: Cache `const len = Object.keys(userMap).length;` before the loop.",
    basePoints: 250,
    tags: ["javascript", "objects", "performance"]
  },
  {
    id: "tc-23",
    mode: "time_complexity",
    language: "C++",
    difficulty: 8,
    title: "Map Lookup with Operator[] vs Find",
    description: "Checking map[key] to check existence inserts default constructed elements into map.",
    code: `if (myMap[key] != 0) { ... }`,
    options: [
      "myMap[key] requires key to be an rvalue reference to avoid compiling duplicate template specializations",
      "operator[] returns a copy of value rather than a reference, causing unnecessary heap allocations",
      "operator[] inserts a default element if key is not found, growing map size and mutating tree; use find() or contains()",
      "Comparing map values against integer 0 causes undefined behavior for non-primitive map value types"
    ],
    correctOption: 2,
    explanation: "WHAT: Accidental map insertion on lookup. WHY: `myMap[key]` default-constructs missing entries. HOW: Use `myMap.find(key) != myMap.end()` or `myMap.contains(key)`.",
    basePoints: 250,
    tags: ["cpp", "map", "lookup"]
  },
  {
    id: "tc-24",
    mode: "time_complexity",
    language: "Java",
    difficulty: 8,
    title: "Arrays AsList Fixed Size Overhead",
    description: "Repeatedly calling Arrays.asList() in loop creates wrapper instances.",
    code: `for (int i = 0; i < n; i++) {\n    process(Arrays.asList(data[i]));\n}`,
    options: [
      "Arrays.asList creates a wrapper object instance on every iteration; pass array or singleton directly",
      "Arrays.asList creates an unmodifiable collection that throws UnsupportedOperationException on read",
      "Passing arrays into process method requires explicit serialization through Java ObjectOutputStream",
      "Loop counter i < n causes boundary check failures when data array length is dynamically resized"
    ],
    correctOption: 0,
    explanation: "WHAT: Wrapper object allocations. WHY: Creates unnecessary wrapper objects in tight loop. HOW: Reuse collections or accept varargs/arrays.",
    basePoints: 250,
    tags: ["java", "collections", "allocation"]
  },
  {
    id: "tc-25",
    mode: "time_complexity",
    language: "Python",
    difficulty: 9,
    title: "Deepcopy in Simulation Loop",
    description: "Calling copy.deepcopy(state) inside game physics loop drops FPS to 2.",
    code: `def tick(state):\n    backup = copy.deepcopy(state)\n    simulate(state)`,
    options: [
      "copy.deepcopy modifies global Python interpreter locks, halting all asynchronous tasks",
      "deepcopy() traverses entire object graph with memo dict lookups; use targeted shallow copy or delta rollback",
      "simulate(state) cannot mutate state objects when backup references exist in local scope",
      "Game state dictionaries must be serialized to JSON before invoking deepcopy operations"
    ],
    correctOption: 1,
    explanation: "WHAT: Heavy deepcopy serialization. WHY: `deepcopy` recursively inspects all object references. HOW: Clone only modified fields or use an explicit `clone()` method.",
    basePoints: 275,
    tags: ["python", "deepcopy", "performance"]
  },
  {
    id: "tc-26",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 9,
    title: "JSON Stringify Deep Equality Check",
    description: "Comparing large objects with JSON.stringify(a) === JSON.stringify(b) in render loop.",
    code: `function shouldUpdate(prev, next) {\n  return JSON.stringify(prev) !== JSON.stringify(next);\n}`,
    options: [
      "JSON.stringify fails to serialize nested objects and throws RangeError on objects with keys",
      "shouldUpdate must return a Promise to allow asynchronous JSON serialization in background threads",
      "JSON.stringify serializes entire deep object tree (O(N) CPU & memory allocation); use shallow key comparison or structural memoization",
      "Comparing strings with !== forces V8 engine to perform character-by-character regex matching"
    ],
    correctOption: 2,
    explanation: "WHAT: Expensive serialization for equality. WHY: Serializing large trees creates garbage strings and high CPU load. HOW: Use shallow comparison or identity checks.",
    basePoints: 275,
    tags: ["javascript", "json", "equality"]
  },
  {
    id: "tc-27",
    mode: "time_complexity",
    language: "C++",
    difficulty: 9,
    title: "Std Function Allocation Overhead in Hot Loop",
    description: "Passing lambda wrapped in std::function in tight inner loop causes heap allocations.",
    code: `void apply(std::function<void(int)> fn) {\n    for (int i = 0; i < 1e7; i++) fn(i);\n}`,
    options: [
      "std::function requires mutex locks on each invocation to guarantee thread-safe parameter passing",
      "Loop limit 1e7 is evaluated as floating-point double, causing compiler truncation errors",
      "std::function only accepts static function pointers and crashes when receiving captured lambdas",
      "std::function uses type erasure and indirect virtual-like function pointers; use template <typename F> void apply(F&& fn) for compiler inlining"
    ],
    correctOption: 3,
    explanation: "WHAT: Indirect call and type-erasure overhead. WHY: `std::function` prevents inlining and may allocate. HOW: Use template parameter `template <typename F> void apply(F fn)`.",
    basePoints: 275,
    tags: ["cpp", "templates", "inlining"]
  },
  {
    id: "tc-28",
    mode: "time_complexity",
    language: "Java",
    difficulty: 9,
    title: "Stream Pipeline Overhead for Simple Arrays",
    description: "Using Arrays.stream(arr).filter(...).sum() in tight matrix loop is 10x slower than for-loop.",
    code: `int sum = Arrays.stream(matrix[i]).filter(x -> x > 0).sum();`,
    options: [
      "Java Stream pipelines create stream instances, pipeline stages, and boxed lambdas; simple primitive for-loops are optimized by JIT",
      "Arrays.stream converts primitive integers to Double streams, causing arithmetic rounding slowdowns",
      "Lambda expression x -> x > 0 cannot be evaluated inside nested matrix arrays without casting",
      "Stream.sum() requires parallelStream() invocation to utilize CPU SIMD vectorization instructions"
    ],
    correctOption: 0,
    explanation: "WHAT: Stream abstraction overhead in hot loop. WHY: Stream objects and functional interfaces add overhead in nanosecond hot loops. HOW: Use a direct primitive `for` loop.",
    basePoints: 275,
    tags: ["java", "streams", "jit"]
  },
  {
    id: "tc-29",
    mode: "time_complexity",
    language: "Python",
    difficulty: 9,
    title: "Regular Expression Backtracking Catastrophe",
    description: "Evaluating regex (a+)+b on input 'aaaaaaaaaaaaaaaaaaaaac' hangs CPU forever.",
    code: `import re\nre.match(r'(a+)+b', 'a' * 30 + 'c')`,
    options: [
      "re.match requires passing re.VERBOSE flag to process repeated character group expressions",
      "Nested quantifiers (a+)+ create catastrophic exponential backtracking O(2^N) when match fails",
      "Multiplying string 'a' * 30 exceeds maximum buffer length allowed for Python regular expressions",
      "Regular expression compiler crashes because 'c' is not declared in the matching regex pattern"
    ],
    correctOption: 1,
    explanation: "WHAT: Catastrophic backtracking in regex. WHY: Nested ambiguous quantifiers explore exponential combination paths on failure. HOW: Simplify regex to `a+b` or use possessive/atomic grouping.",
    basePoints: 275,
    tags: ["python", "regex", "backtracking"]
  },
  {
    id: "tc-30",
    mode: "time_complexity",
    language: "JavaScript",
    difficulty: 10,
    title: "Array Flatten Recursive Spread Explosion",
    description: "Recursive flatten with [].concat(...arr.map(flatten)) creates massive garbage churn.",
    code: `const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);`,
    options: [
      "reduce accumulator array must be passed by reference using Object.assign on every recursive step",
      "Array.isArray returns false on nested sub-arrays when executed across different browser iframe realms",
      "Array.concat() in reduce creates new array copies on every step O(N^2); iterative stack or Array.flat(Infinity) is O(N)",
      "Arrow functions cannot be called recursively in JavaScript without an explicit named function binding"
    ],
    correctOption: 2,
    explanation: "WHAT: O(N^2) array concatenation churn. WHY: `concat` creates new array copies on every reduce step. HOW: Use native `arr.flat(Infinity)` or iterative single-array accumulation.",
    basePoints: 300,
    tags: ["javascript", "flatten", "reduce"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TIME_COMPLEXITY_BANK };
}
