/**
 * Code Debugger - Mode 10: Recursion Rescue (30 Challenges)
 * Base cases, recursive step parameters, stack overflow, memoization, tree/graph traversal across Python, C++, Java, JS.
 */

const RECURSION_RESCUE_BANK = [
  {
    id: "rec-01",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 2,
    title: "Missing Base Case in Countdown",
    description: "Calling countdown(5) crashes with RecursionError: maximum recursion depth exceeded.",
    code: `def countdown(n):\n    print(n)\n    countdown(n - 1) # Bug: no base case`,
    options: [
      "Invert parameter decrement step from n - 1 to increment n + 1",
      "Add base case: if n <= 0: return to terminate recursive calls",
      "Replace recursive call countdown(n - 1) with return countdown(n)",
      "Wrap countdown invocation block inside an unbounded while loop"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing termination base case. WHY: Without a base case, `countdown` descends into negative numbers indefinitely until the call stack overflows. HOW: Add `if n <= 0: return` at start.",
    basePoints: 85,
    tags: ["python", "recursion", "base_case"]
  },
  {
    id: "rec-02",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 2,
    title: "Factorial Base Case Returning 0",
    description: "factorial(5) returns 0 instead of 120 because base case returns 0.",
    code: `function factorial(n) {\n  if (n === 0) return 0; // Bug!\n  return n * factorial(n - 1);\n}`,
    options: [
      "Update base case return value: if (n <= 1) return 1;",
      "Change base condition boundary check to if (n === 0) return -1;",
      "Replace multiplication in step with addition: return n + factorial(n - 1);",
      "Update recursive call parameter from factorial(n - 1) to factorial(n - 2)"
    ],
    correctOption: 0,
    explanation: "WHAT: Multiplicative zero absorption. WHY: 0 multiplied by anything is 0. Returning 0 from base case makes the entire product cascade to 0. HOW: Return 1 when `n <= 1`.",
    basePoints: 85,
    tags: ["javascript", "recursion", "factorial", "math"]
  },
  {
    id: "rec-03",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 3,
    title: "Missing Return in Recursive Step",
    description: "Recursive helper computes value but caller receives 0 / void result.",
    code: `public int sumDigits(int n) {\n    if (n == 0) return 0;\n    sumDigits(n / 10); // Bug: result discarded!\n    return n % 10;\n}`,
    options: [
      "Change recursive argument from sumDigits(n / 10) to sumDigits(n - 1)",
      "Combine recursive result: return (n % 10) + sumDigits(n / 10);",
      "Change base condition check from n == 0 to negative boundary n < 0",
      "Declare sumDigits method signature with void return type in class"
    ],
    correctOption: 1,
    explanation: "WHAT: Discarded recursive return value. WHY: The result of `sumDigits(n / 10)` is never captured or added to the sum. HOW: `return (n % 10) + sumDigits(n / 10)`.",
    basePoints: 95,
    tags: ["java", "recursion", "math"]
  },
  {
    id: "rec-04",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 3,
    title: "Passing n Instead of n-1",
    description: "Function calls itself with same argument value causing immediate infinite loop.",
    code: `int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n) + fib(n - 1); // Bug: fib(n)!\n}`,
    options: [
      "Change base case condition comparison from n <= 1 to n <= 0 in fib",
      "Replace addition operator between recursive calls with multiplication *",
      "Shrink subproblem: update first recursive branch from fib(n) to fib(n - 2)",
      "Declare function fib with static storage duration modifier in translation"
    ],
    correctOption: 2,
    explanation: "WHAT: Non-shrinking subproblem. WHY: `fib(n)` calls `fib(n)` with the identical parameter, causing infinite recursion. HOW: Change to `fib(n - 2)`.",
    basePoints: 95,
    tags: ["cpp", "recursion", "fibonacci"]
  },
  {
    id: "rec-05",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 3,
    title: "List Length Recursive Head/Tail Slicing Base Case",
    description: "Recursive list sum crashes on empty list input.",
    code: `def list_sum(arr):\n    if len(arr) == 1:\n        return arr[0]\n    return arr[0] + list_sum(arr[1:])`,
    options: [
      "Update base case to handle empty inputs: if not arr: return 0",
      "Change list slicing parameter from arr[1:] to reverse slice arr[:-1]",
      "Replace head element index lookup from arr[0] to tail lookup arr[-1]",
      "Change base case condition comparison from len(arr) == 1 to len(arr) == 2"
    ],
    correctOption: 0,
    explanation: "WHAT: Unhandled empty collection base case. WHY: Passing `[]` evaluates `len(arr) == 1` as false and attempts `arr[0]`, raising `IndexError`. HOW: Handle `if not arr: return 0`.",
    basePoints: 95,
    tags: ["python", "recursion", "lists", "base_case"]
  },
  {
    id: "rec-06",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 4,
    title: "Mutable Default Accumulator Array in Recursive Helper",
    description: "Recursive flatten accumulates previous runs because array is shared.",
    code: `function flatten(arr, acc = []) {\n  for (const item of arr) {\n    if (Array.isArray(item)) flatten(item, acc);\n    else acc.push(item);\n  }\n  return acc;\n}`,
    options: [
      "Replace array mutating acc.push(item) with reassignment acc = acc.concat(item)",
      "Change default accumulator parameter initialization from acc = [] to acc = null",
      "Ensure new accumulator per top call or use return arr.flatMap(x => Array.isArray(x) ? flatten(x) : x)",
      "Change return type of flatten function declaration to return undefined"
    ],
    correctOption: 2,
    explanation: "WHAT: Accumulator pattern correctness. WHY: In JS, default parameters evaluate per call if omitted, but callers passing an existing array must be aware of mutation. HOW: Safe pattern: pass `acc = []`.",
    basePoints: 110,
    tags: ["javascript", "recursion", "flatten", "arrays"]
  },
  {
    id: "rec-07",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 4,
    title: "Binary Tree Max Depth Null Node Check",
    description: "Tree depth function crashes with null pointer dereference on leaf children.",
    code: `struct Node { int val; Node* left; Node* right; };\nint maxDepth(Node* root) {\n    // Bug: missing null check!\n    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));\n}`,
    options: [
      "Check leaf left child exclusively: if (root->left == nullptr) return 1;",
      "Add base case check for empty nodes: if (!root) return 0;",
      "Replace standard library function std::max with function std::min",
      "Pass parameter root as a non-pointer reference type Node& in signature"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing null base case in tree recursion. WHY: When a leaf node calls `maxDepth(root->left)`, `root` is `nullptr` and dereferencing `root->left` crashes. HOW: `if (!root) return 0;`.",
    basePoints: 110,
    tags: ["cpp", "trees", "recursion", "null"]
  },
  {
    id: "rec-08",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 4,
    title: "String Palindrome Recursion Out-of-Bounds Substring",
    description: "isPalindrome throws StringIndexOutOfBoundsException on 1-char or empty strings.",
    code: `public boolean isPalindrome(String s) {\n    if (s.charAt(0) != s.charAt(s.length() - 1)) return false;\n    return isPalindrome(s.substring(1, s.length() - 1));\n}`,
    options: [
      "Add base case check: if (s.length() <= 1) return true; before charAt lookups",
      "Update substring indices from s.substring(1, s.length() - 1) to s.substring(0, s.length() - 1)",
      "Replace index lookup charAt(0) with character index charAt(1) in condition",
      "Change mismatch return value from return false to return true in method"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing base case before element access. WHY: If `s` is empty `\"\"`, `s.charAt(0)` throws `StringIndexOutOfBoundsException`. HOW: Add `if (s.length() <= 1) return true;` first.",
    basePoints: 110,
    tags: ["java", "strings", "palindrome", "recursion"]
  },
  {
    id: "rec-09",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 5,
    title: "Naive Recursive Fibonacci Exponential Call Explosion",
    description: "fib(40) takes over 30 seconds to compute due to redundant overlapping subproblems.",
    code: `def fib(n):\n    if n <= 1: return n\n    return fib(n - 1) + fib(n - 2)`,
    options: [
      "Change base condition comparison check from n <= 1 to n <= 2 in fib",
      "Wrap fib calculation calls inside separate concurrent background threads",
      "Apply memoization decorator: @functools.lru_cache(None) or iterative DP",
      "Convert the recursive calculation expressions to use built-in eval()"
    ],
    correctOption: 2,
    explanation: "WHAT: $O(2^n)$ exponential recursion bottleneck. WHY: Without memoization, subproblems are recomputed repeatedly (e.g. `fib(5)` computed thousands of times). HOW: Use `@functools.lru_cache(None)`.",
    basePoints: 125,
    tags: ["python", "memoization", "complexity", "fibonacci"]
  },
  {
    id: "rec-10",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 5,
    title: "Tail Call Optimization Assumptions",
    description: "Deep recursion throws RangeError: Maximum call stack size exceeded in non-TCO environments.",
    code: `function sumDown(n, acc = 0) {\n  if (n === 0) return acc;\n  return sumDown(n - 1, acc + n);\n}\nsumDown(100000); // Crash!`,
    options: [
      "Most engines lack TCO; rewrite as iterative while loop or trampoline",
      "Change default accumulator parameter initialization from acc = 0 to acc = 1",
      "Wrap recursive function invocation sumDown inside a browser setTimeout timer",
      "Declare sumDown as an asynchronous function returning a Promise resolution"
    ],
    correctOption: 0,
    explanation: "WHAT: Engine lack of Tail Call Optimization (TCO). WHY: Only Safari/WebKit implements ES6 TCO. V8 and SpiderMonkey will overflow stack on deep recursion. HOW: Convert to `while (n > 0)` loop or trampoline.",
    basePoints: 125,
    tags: ["javascript", "tail_call", "stack_overflow"]
  },
  {
    id: "rec-11",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 5,
    title: "Backtracking Sudoku Solver Missing Reset Step",
    description: "Sudoku solver fails because modified grid cell is not reset to 0 upon backtracking failure.",
    code: `bool solve(int r, int c) {\n    // ... found empty slot ...\n    for (int val = 1; val <= 9; val++) {\n        if (isValid(r, c, val)) {\n            grid[r][c] = val;\n            if (solve(nextR, nextC)) return true;\n            // Bug: missing grid[r][c] = 0; on backtrack!\n        }\n    }\n    return false;\n}`,
    options: [
      "Return boolean true instead of false unconditionally at the end of solve",
      "Change loop condition boundary comparison check from val <= 9 to val < 9",
      "Add state undo: reset grid[r][c] = 0; when recursive solve branch fails",
      "Pass grid multi-dimensional matrix by value on each recursive function call"
    ],
    correctOption: 2,
    explanation: "WHAT: Missing backtrack un-make step. WHY: If a chosen number leads to no solution, the cell must be cleared back to 0 so subsequent branches can explore alternatives. HOW: Add `grid[r][c] = 0;`.",
    basePoints: 125,
    tags: ["cpp", "backtracking", "sudoku"]
  },
  {
    id: "rec-12",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 5,
    title: "Binary Search Tree Lowest Common Ancestor Direction",
    description: "BST LCA recursive check branches into left subtree when both values are greater than root.",
    code: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (p.val < root.val && q.val < root.val)\n        return lowestCommonAncestor(root.left, p, q);\n    if (p.val > root.val && q.val > root.val)\n        return lowestCommonAncestor(root.left, p, q); // Bug: should be root.right!\n    return root;\n}`,
    options: [
      "Change second branch to recurse on right subtree: lowestCommonAncestor(root.right, p, q)",
      "Change condition check from p.val > root.val to equality check p.val == root.val",
      "Return root.left unconditionally at the termination point of lowestCommonAncestor",
      "Swap node parameter references p and q in method signature definition in class"
    ],
    correctOption: 0,
    explanation: "WHAT: Wrong subtree descent in BST LCA. WHY: When both `p.val` and `q.val` are greater than `root.val`, the common ancestor must lie in `root.right`. HOW: `return lowestCommonAncestor(root.right, p, q)`.",
    basePoints: 125,
    tags: ["java", "bst", "trees", "recursion"]
  },
  {
    id: "rec-13",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 6,
    title: "Combination Sum Backtrack Index Reuse vs Advance",
    description: "Combinations generate permutations with duplicate sets instead of combinations.",
    code: `def combinations(candidates, target, start, current, result):\n    if target == 0:\n        result.append(list(current))\n        return\n    for i in range(0, len(candidates)): # Bug: starts at 0 instead of 'start'\n        if candidates[i] <= target:\n            current.append(candidates[i])\n            combinations(candidates, target - candidates[i], i + 1, current, result)\n            current.pop()`,
    options: [
      "Change recursive step index offset from i + 1 to decrement index i - 1",
      "Append un-copied reference result.append(current) instead of list(current)",
      "Start loop from start index: for i in range(start, len(candidates))",
      "Change base condition check from target == 0 to negative check target < 0"
    ],
    correctOption: 2,
    explanation: "WHAT: Generating permutations instead of combinations. WHY: Starting loop from 0 on every call allows picking previously used elements in different orders. HOW: Start loop from `start`.",
    basePoints: 140,
    tags: ["python", "backtracking", "combinations"]
  },
  {
    id: "rec-14",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 6,
    title: "Deep Object Clone Circular Reference Trap",
    description: "Recursive deep clone function enters infinite recursion when object contains cyclic references.",
    code: `function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  const copy = Array.isArray(obj) ? [] : {};\n  for (const key in obj) {\n    copy[key] = deepClone(obj[key]); // Hangs on circular references!\n  }\n  return copy;\n}`,
    options: [
      "Track visited objects with WeakMap cache: deepClone(obj, map = new WeakMap())",
      "Replace recursive cloning logic with JSON.parse(JSON.stringify(obj)) method",
      "Add base case check verifying whether typeof obj === 'function' in function",
      "Apply Object.freeze(obj) immediately prior to initiating recursive key iteration"
    ],
    correctOption: 0,
    explanation: "WHAT: Cyclic graph recursion in deep clone. WHY: When `obj.self = obj`, `deepClone` recurses forever. HOW: Store visited object mappings in a `WeakMap`.",
    basePoints: 140,
    tags: ["javascript", "deep_clone", "cycles", "weakmap"]
  },
  {
    id: "rec-15",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 6,
    title: "Trie Auto-Complete Word Collector Substring Slicing",
    description: "Trie DFS word collector appends character but fails to backtrack string prefix.",
    code: `void dfs(TrieNode* node, std::string& prefix, std::vector<std::string>& results) {\n    if (node->isWord) results.push_back(prefix);\n    for (int i = 0; i < 26; i++) {\n        if (node->children[i]) {\n            prefix.push_back('a' + i);\n            dfs(node->children[i], prefix, results);\n            // Bug: missing prefix.pop_back();\n        }\n    }\n}`,
    options: [
      "Add prefix.pop_back() after dfs recursive call or pass prefix by value",
      "Change character conversion expression from 'a' + i to uppercase 'A' + i",
      "Convert results collection parameter from std::vector to std::set container",
      "Pass node parameter as a double pointer TrieNode** in recursive signature"
    ],
    correctOption: 0,
    explanation: "WHAT: Corrupted path accumulator. WHY: Modifying `prefix` by reference without `prefix.pop_back()` leaves sibling branches with corrupted character strings. HOW: Backtrack with `prefix.pop_back()` or pass `prefix` by value.",
    basePoints: 140,
    tags: ["cpp", "trie", "backtracking", "strings"]
  },
  {
    id: "rec-16",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 6,
    title: "Graph Cycle Detection DFS 3-Coloring State Mismanagement",
    description: "Directed graph cycle detector marks node as VISITED too early.",
    code: `boolean hasCycle(int u, int[] state, List<List<Integer>> adj) {\n    state[u] = 2; // Bug: 2 means VISITED/FINISHED; should be 1 (VISITING/IN_PROGRESS)!\n    for (int v : adj.get(u)) {\n        if (state[v] == 1) return true; // Found back edge\n        if (state[v] == 0 && hasCycle(v, state, adj)) return true;\n    }\n    state[u] = 2;\n    return false;\n}`,
    options: [
      "Set state[u] = 0 (UNVISITED) at the start of DFS traversal for node u",
      "Mark node visiting at start: set state[u] = 1, then state[u] = 2 on completion",
      "Return boolean true whenever neighbor node state evaluates to state[v] == 2",
      "Convert graph representation from adjacency list to 2D adjacency matrix"
    ],
    correctOption: 1,
    explanation: "WHAT: Incorrect 3-color DFS cycle state. WHY: A back-edge cycle is detected when a neighbor is in state 1 (currently in active call stack). Setting `state[u] = 2` immediately disables cycle detection for paths leading back to `u`. HOW: Set `state[u] = 1` initially and `state[u] = 2` on return.",
    basePoints: 140,
    tags: ["java", "dfs", "cycle_detection", "graphs"]
  },
  {
    id: "rec-17",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 7,
    title: "Recursive Merge Sort Subarray Slice Copy Overhead",
    description: "Recursive merge sort using list slicing creates O(N log N) space allocations and slow performance.",
    code: `def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)`,
    options: [
      "Change midpoint calculation expression from len(arr) // 2 to len(arr) / 2",
      "Sort array in-place using built-in method arr.sort() inside merge_sort helper",
      "Pass index bounds (low, high) with auxiliary buffer instead of slicing",
      "Replace merge helper invocation with simple list concatenation: left + right"
    ],
    correctOption: 2,
    explanation: "WHAT: Slicing memory copy explosion. WHY: `arr[:mid]` and `arr[mid:]` allocate new lists at each recursive layer, increasing memory and overhead. HOW: Use index pointers `(low, high)` and an auxiliary buffer.",
    basePoints: 160,
    tags: ["python", "merge_sort", "recursion", "optimization"]
  },
  {
    id: "rec-18",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 7,
    title: "Nested JSON Object Traversal Key Collision",
    description: "Recursive key replacer mutates object keys in-place during traversal, corrupting iteration.",
    code: `function renameKeys(obj, fn) {\n  for (const key of Object.keys(obj)) {\n    const newKey = fn(key);\n    obj[newKey] = obj[key];\n    if (typeof obj[newKey] === 'object') renameKeys(obj[newKey], fn);\n    // Bug: did not delete old key obj[key]!\n  }\n  return obj;\n}`,
    options: [
      "Delete old key: if (key !== newKey) delete obj[key]; or create clean copy",
      "Replace property lookup method Object.keys(obj) with Object.values(obj)",
      "Iterate over properties using for...in loop directly without Object.keys",
      "Convert destination key name transformation explicitly with key.toUpperCase()"
    ],
    correctOption: 0,
    explanation: "WHAT: Incomplete key renaming. WHY: Assigning `obj[newKey] = obj[key]` without deleting `obj[key]` leaves duplicate stale keys in the object. HOW: `delete obj[key]` when `key !== newKey`.",
    basePoints: 160,
    tags: ["javascript", "json", "recursion", "objects"]
  },
  {
    id: "rec-19",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 7,
    title: "Template Metaprogramming Recursion Depth Limit",
    description: "Compile-time factorial template causes compiler error: template instantiation depth exceeds maximum.",
    code: `template<int N>\nstruct Factorial {\n    static constexpr int val = N * Factorial<N - 1>::val;\n};\n// Bug: missing base case template specialization!`,
    options: [
      "Increase compiler template recursion limit flag without adding specialization",
      "Specialize base case: template<> struct Factorial<0> { static constexpr int val = 1; };",
      "Change static constant specifier from static constexpr to static const",
      "Modify recursive template instantiation argument from Factorial<N - 1> to <N + 1>"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing template base specialization. WHY: Without `template<> struct Factorial<0>`, the compiler instantiates `Factorial<-1>`, `Factorial<-2>` until hitting compilation limits. HOW: Specialize `Factorial<0>`.",
    basePoints: 160,
    tags: ["cpp", "templates", "metaprogramming", "constexpr"]
  },
  {
    id: "rec-20",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 7,
    title: "N-Queens Backtracking Column Bitmask State Restore",
    description: "N-Queens bitmask solver modifies bitmask variable without scoping or restoring for siblings.",
    code: `void solve(int row, int cols, int diags1, int diags2) {\n    if (row == N) { count++; return; }\n    int available = (~(cols | diags1 | diags2)) & ((1 << N) - 1);\n    while (available != 0) {\n        int p = available & -available;\n        available -= p;\n        solve(row + 1, cols | p, (diags1 | p) << 1, (diags2 | p) >> 1);\n    }\n}`,
    options: [
      "Bitmask passing by value in Java creates isolated branch states cleanly",
      "Replace bitwise OR operator cols | p with bitwise AND operator cols & p",
      "Change diagonal shift expression from (diags1 | p) << 1 to diags1 << 1",
      "Update bit removal statement from available -= p to addition available += p"
    ],
    correctOption: 0,
    explanation: "WHAT: Value-based bitwise state isolation. WHY: In bitwise N-Queens, passing new bitmask expressions directly as function parameters cleanly isolates state per recursion branch without requiring explicit undo steps. HOW: Value passing is correct.",
    basePoints: 160,
    tags: ["java", "bitmask", "nqueens", "backtracking"]
  },
  {
    id: "rec-21",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 8,
    title: "Nested Async Generator Flattening",
    description: "Recursively traversing an async tree requires yield from or async for.",
    code: `async def traverse_tree(node):\n    yield node.val\n    for child in node.children:\n        traverse_tree(child) # Bug: coroutine created but not yielded/awaited!`,
    options: [
      "Consume async generator: async for item in traverse_tree(child): yield item",
      "Apply await keyword directly to coroutine object: await traverse_tree(child)",
      "Replace keyword yield with standard return statement inside generator",
      "Delegate sub-generator values using syntax: yield from traverse_tree(child)"
    ],
    correctOption: 0,
    explanation: "WHAT: Unconsumed async generator. WHY: Calling `traverse_tree(child)` creates an async generator object without yielding its values. `yield from` is not supported in async generators. HOW: `async for item in traverse_tree(child): yield item`.",
    basePoints: 175,
    tags: ["python", "async", "generators", "recursion"]
  },
  {
    id: "rec-22",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 8,
    title: "Trampoline Function Return Signature Mismatch",
    description: "Trampoline runner crashes because recursive step returns value instead of thunk function.",
    code: `const trampoline = fn => (...args) => {\n  let res = fn(...args);\n  while (typeof res === 'function') res = res();\n  return res;\n};\n// Bug in recursive function: returns direct call instead of () => sum(n - 1, acc + n)\nconst sum = (n, acc = 0) => n <= 0 ? acc : sum(n - 1, acc + n);`,
    options: [
      "Higher-order trampoline pattern is an invalid construct in ECMAScript",
      "Wrap recursive step in a thunk function: () => sum(n - 1, acc + n)",
      "Change type check comparison from typeof res === 'function' to 'number'",
      "Invoke trampoline wrapper recursively inside sum function implementation"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing thunk wrapper in trampoline. WHY: The trampoline relies on recursive steps returning deferred functions (`() => fn(...)`). Direct invocation still executes on the call stack. HOW: Return `() => sum(n - 1, acc + n)`.",
    basePoints: 175,
    tags: ["javascript", "trampoline", "functional_programming"]
  },
  {
    id: "rec-23",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 8,
    title: "Tree Serialization Preorder vs Inorder Ambiguity",
    description: "Deserializing a binary tree from preorder traversal without storing null markers creates invalid tree shapes.",
    code: `void serialize(Node* root, std::string& out) {\n    if (!root) return; // Bug: no null marker written!\n    out += std::to_string(root->val) + ",";\n    serialize(root->left, out);\n    serialize(root->right, out);\n}`,
    options: [
      "Serialize tree using symmetric inorder traversal sequence instead of preorder",
      "Append numeric literal character string out += '0,' upon encountering nulls",
      "Standard binary tree data structures cannot be serialized via recursion in C++",
      "Write a null marker (e.g. '#,') when root is nullptr to preserve tree structure"
    ],
    correctOption: 3,
    explanation: "WHAT: Structural ambiguity in tree serialization. WHY: Without null markers (sentinels), preorder traversal alone cannot distinguish between left and right children. HOW: Append `\"#,\"` when `!root`.",
    basePoints: 175,
    tags: ["cpp", "trees", "serialization"]
  },
  {
    id: "rec-24",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 8,
    title: "Parser Recursive Descent Infinite Recursion on Left Recursion",
    description: "Grammar with direct left recursion (Expr -> Expr '+' Term) causes immediate stack overflow.",
    code: `// Grammar: E -> E + T | T\npublic ASTNode parseExpr() {\n    ASTNode left = parseExpr(); // Bug: immediate left-recursive call!\n    match('+');\n    ASTNode right = parseTerm();\n    return new AddNode(left, right);\n}`,
    options: [
      "Eliminate left recursion: parse Expr as Term followed by a ('+' Term)* loop",
      "Increase JVM thread stack allocation size limit using -Xss configuration",
      "Replace parseExpr call in left child with parseTerm in right child instead",
      "Declare parseExpr method with synchronized concurrency modifier in class"
    ],
    correctOption: 0,
    explanation: "WHAT: Left recursion in LL(1) recursive descent parser. WHY: A function that begins by calling itself with no consumed tokens never reaches a base case. HOW: Eliminate left recursion using `parseTerm()` followed by a `while (match('+'))` loop.",
    basePoints: 175,
    tags: ["java", "compiler", "parser", "recursion"]
  },
  {
    id: "rec-25",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 9,
    title: "Memoized Tree DP Mutating Shared Subtree Result",
    description: "Tree DP function caches mutable dictionary that gets modified by parent calls.",
    code: `memo = {}\ndef tree_dp(node):\n    if node in memo:\n        return memo[node]\n    res = {'max': 0, 'count': 0}\n    # ... compute res ...\n    memo[node] = res\n    return res\n# Caller modifies result: tree_dp(node)['max'] += 10, corrupting memo cache!`,
    options: [
      "Clear entire global memo dictionary table on every single recursive entry",
      "Return immutable namedtuple/tuple or return a shallow copy res.copy()",
      "Convert node object reference to primitive integer identifier before hashing",
      "Initialize global memo cache container as a flat indexed list structure"
    ],
    correctOption: 1,
    explanation: "WHAT: Mutable object cache pollution. WHY: Returning a mutable `dict` allows callers to modify the cached object directly, corrupting future lookups. HOW: Return immutable objects (tuples/frozen dataclasses) or shallow copies.",
    basePoints: 190,
    tags: ["python", "memoization", "dp", "trees"]
  },
  {
    id: "rec-26",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 9,
    title: "DOM Node Tree Walking with Child Mutation",
    description: "Recursively unwrapping DOM elements while iterating over element.childNodes skips every second child.",
    code: `function unwrap(node) {\n  for (let i = 0; i < node.childNodes.length; i++) {\n    const child = node.childNodes[i];\n    unwrap(child);\n    node.parentNode.insertBefore(child, node); // Mutates live childNodes list in-flight!\n  }\n}`,
    options: [
      "Replace node.childNodes property lookup with element property node.children",
      "Change loop counter step increment from standard i++ to double step i += 2",
      "Clear inner DOM subtree content immediately using node.innerHTML = ''",
      "Iterate over static snapshot: Array.from(node.childNodes) or iterate in reverse"
    ],
    correctOption: 3,
    explanation: "WHAT: Live NodeList mutation during traversal. WHY: `childNodes` is a live DOM collection. Moving a child shifts the remaining indices, causing the loop to skip nodes. HOW: Snapshot with `Array.from(node.childNodes)`.",
    basePoints: 190,
    tags: ["javascript", "dom", "nodelist", "mutation"]
  },
  {
    id: "rec-27",
    mode: "recursion_rescue",
    language: "C++",
    difficulty: 9,
    title: "Constexpr Recursive Function Exceeding Evaluation Step Limit",
    description: "constexpr function computing Ackermann function exceeds compiler constexpr evaluation limit.",
    code: `constexpr int ackermann(int m, int n) {\n    if (m == 0) return n + 1;\n    if (n == 0) return ackermann(m - 1, 1);\n    return ackermann(m - 1, ackermann(m, n - 1));\n}\nstatic_assert(ackermann(3, 8) == 2045); // Fails compile: constexpr step limit exceeded`,
    options: [
      "Ackermann steps exceed limit; compute at runtime or increase constexpr-steps",
      "Change compile-time specifier from constexpr to function specifier inline",
      "Static assertion macro static_assert cannot invoke user defined functions",
      "Update base condition check from equality m == 0 to inequality m <= 0"
    ],
    correctOption: 0,
    explanation: "WHAT: Constexpr evaluation step budget overflow. WHY: Compilers have strict limits on recursive step counts during compile-time evaluation. Extremely deep recursion exceeds step limits. HOW: Precompute or evaluate at runtime.",
    basePoints: 190,
    tags: ["cpp", "constexpr", "ackermann", "compiler"]
  },
  {
    id: "rec-28",
    mode: "recursion_rescue",
    language: "Java",
    difficulty: 10,
    title: "Recursive Graph Biconnected Components Articulation Points Low-Link Bug",
    description: "Tarjan's articulation point algorithm fails to recognize root node condition.",
    code: `void dfs(int u, int p) {\n    tin[u] = low[u] = ++timer;\n    int children = 0;\n    for (int v : adj.get(u)) {\n        if (v == p) continue;\n        if (visited[v]) {\n            low[u] = Math.min(low[u], tin[v]);\n        } else {\n            visited[v] = true;\n            dfs(v, u);\n            low[u] = Math.min(low[u], low[v]);\n            if (low[v] >= tin[u] && p != -1) isCutVertex[u] = true;\n            children++;\n        }\n    }\n    // Bug: root node (p == -1) articulation point check missing!\n}`,
    options: [
      "Update back-edge assignment from Math.min(low[u], tin[v]) to tin[v] value",
      "Assume children > 0 is sufficient criterion to mark root as articulation point",
      "Remove parent node inequality validation filter check p != -1 from condition",
      "Add root articulation check: if (p == -1 && children > 1) isCutVertex[u] = true;"
    ],
    correctOption: 3,
    explanation: "WHAT: Missing root articulation point criterion. WHY: The DFS root has no ancestors, so `low[v] >= tin[u]` is always true for its children. The root is an articulation point if and only if it has $> 1$ independent DFS children. HOW: Add `if (p == -1 && children > 1) isCutVertex[u] = true;`.",
    basePoints: 200,
    tags: ["java", "tarjan", "articulation_points", "graphs"]
  },
  {
    id: "rec-29",
    mode: "recursion_rescue",
    language: "Python",
    difficulty: 10,
    title: "Recursion in Custom AST Visitor Dispatch",
    description: "AST NodeVisitor subclass calls generic_visit but fails to return visitor result from recursive descent.",
    code: `class EvalVisitor(ast.NodeVisitor):\n    def visit_BinOp(self, node):\n        left = self.visit(node.left)\n        right = self.visit(node.right)\n        if isinstance(node.op, ast.Add): return left + right\n    def visit_Constant(self, node):\n        return node.value\n    def generic_visit(self, node):\n        super().generic_visit(node) # Bug: generic_visit returns None by default in Python ast!`,
    options: [
      "Ensure all custom visit methods return explicit evaluated values directly",
      "Rename custom handler method from visit_BinOp to visit_Add in EvalVisitor",
      "Standard library ast.NodeVisitor class cannot be inherited or subclassed",
      "Replace recursive visitor dispatch pattern with flat ast.walk generator"
    ],
    correctOption: 0,
    explanation: "WHAT: Void AST visitor fallthrough. WHY: `ast.NodeVisitor.generic_visit` in standard library returns `None`. An interpreter pattern requiring return values must explicitly handle and return results for all visited nodes. HOW: Implement explicit returns in all handlers.",
    basePoints: 200,
    tags: ["python", "ast", "visitor_pattern", "compiler"]
  },
  {
    id: "rec-30",
    mode: "recursion_rescue",
    language: "JavaScript",
    difficulty: 10,
    title: "Continuation-Passing Style (CPS) Stack Unwinding",
    description: "CPS transformation of recursive function exhausts call stack when continuations are called synchronously.",
    code: `function sumCPS(n, cont) {\n  if (n === 0) return cont(0);\n  return sumCPS(n - 1, val => cont(val + n)); // Call stack builds nested closures until crash!\n}`,
    options: [
      "Update base case continuation invocation argument from cont(0) to cont(n)",
      "Continuations build up stack; use trampoline or setImmediate to unwind",
      "Continuation-passing style cannot compute arithmetic sums in JavaScript",
      "Return raw cont callback parameter directly without invoking in base case"
    ],
    correctOption: 1,
    explanation: "WHAT: CPS continuation closure stack buildup. WHY: Synchronous CPS replaces stack frames with a chain of closure frames. When the base case calls `cont(0)`, the entire chain of $N$ continuations executes synchronously on the call stack. HOW: Trampoline or bounce continuations.",
    basePoints: 200,
    tags: ["javascript", "cps", "continuations", "functional"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RECURSION_RESCUE_BANK };
}
