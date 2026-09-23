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
      "Add base case: if n <= 0: return",
      "Change n - 1 to n + 1",
      "Change countdown(n - 1) to return countdown(n)",
      "Wrap inside a while loop"
    ],
    correctOption: 0,
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
      "if (n <= 1) return 1;",
      "if (n === 0) return -1;",
      "return n + factorial(n - 1);",
      "factorial(n - 1) should be factorial(n - 2)"
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
      "return (n % 10) + sumDigits(n / 10);",
      "sumDigits(n / 10) should be sumDigits(n - 1)",
      "n == 0 should be n < 0",
      "Make method void"
    ],
    correctOption: 0,
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
      "Change fib(n) to fib(n - 2)",
      "Change fib(n <= 1) to fib(n <= 0)",
      "Change + to *",
      "fib must be static"
    ],
    correctOption: 0,
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
      "Change base case to: if not arr: return 0",
      "arr[1:] should be arr[:-1]",
      "arr[0] should be arr[-1]",
      "Use len(arr) == 2"
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
      "This implementation is correct if acc is a new array per top-level call; ensure top caller doesn't pass shared mutable reference",
      "acc.push(item) must be acc = acc.concat(item)",
      "acc = [] must be acc = null",
      "flatten must return void"
    ],
    correctOption: 0,
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
      "Add base case: if (!root) return 0;",
      "if (root->left == nullptr) return 1;",
      "Change std::max to std::min",
      "root must be passed as Node&"
    ],
    correctOption: 0,
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
      "Add base case: if (s.length() <= 1) return true; before charAt checks",
      "s.substring(1, s.length() - 1) should be s.substring(0, s.length() - 1)",
      "s.charAt(0) should be s.charAt(1)",
      "Change return false to return true"
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
      "Add memoization decorator: @functools.lru_cache(None) or use dynamic programming",
      "Change n <= 1 to n <= 2",
      "Use multithreading",
      "Convert recursion to eval()"
    ],
    correctOption: 0,
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
      "Standard JS engines (V8/Node/Chrome) do not support TCO; rewrite as iterative loop or trampoline",
      "Change acc = 0 to acc = 1",
      "Wrap sumDown in setTimeout",
      "Make sumDown an async function"
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
      "Add grid[r][c] = 0; after recursive solve fails",
      "Return true instead of false at the end",
      "Change val <= 9 to val < 9",
      "grid must be passed by value"
    ],
    correctOption: 0,
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
      "Change root.left to root.right in the second if statement",
      "Change p.val > root.val to p.val == root.val",
      "return root.left at the end",
      "Swap p and q parameters"
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
      "Change range(0, len(candidates)) to range(start, len(candidates))",
      "Change i + 1 to i - 1",
      "result.append(current) instead of list(current)",
      "target == 0 should be target < 0"
    ],
    correctOption: 0,
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
      "Pass a WeakMap cache to track and return already-cloned object references: deepClone(obj, map = new WeakMap())",
      "Use JSON.parse(JSON.stringify(obj))",
      "Check typeof obj === 'function'",
      "Object.freeze(obj) first"
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
      "Add prefix.pop_back(); after recursive dfs call to backtrack path",
      "Pass prefix by value: std::string prefix",
      "Both A and B are valid fixes",
      "Change results to std::set"
    ],
    correctOption: 2,
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
      "Set state[u] = 1 (VISITING) at the beginning of DFS traversal for node u",
      "state[u] = 0 at the beginning",
      "Return true if state[v] == 2",
      "Convert adjacency list to matrix"
    ],
    correctOption: 0,
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
      "Pass index bounds (low, high) and sort with single auxiliary buffer instead of creating new slices at every level",
      "Change len(arr) // 2 to len(arr) / 2",
      "Use arr.sort() inside merge_sort",
      "Return left + right"
    ],
    correctOption: 0,
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
      "Delete original key: if (key !== newKey) delete obj[key]; or construct new transformed object",
      "Object.keys(obj) should be Object.values(obj)",
      "Use for...in loop without Object.keys",
      "Change newKey to key.toUpperCase()"
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
      "Add specialization: template<> struct Factorial<0> { static constexpr int val = 1; };",
      "Increase compiler template depth flag only",
      "Change constexpr to const",
      "Use struct Factorial<N + 1>"
    ],
    correctOption: 0,
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
      "The bitmask passing by value in Java handles state restore cleanly; this standard bitwise formulation is correct",
      "cols | p should be cols & p",
      "(diags1 | p) << 1 should be diags1 << 1",
      "available -= p should be available += p"
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
      "Use: async for item in traverse_tree(child): yield item",
      "Use: await traverse_tree(child)",
      "Change yield to return",
      "Use yield from traverse_tree(child)"
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
      "Wrap recursive step in a thunk: n <= 0 ? acc : () => sum(n - 1, acc + n)",
      "trampoline function is invalid in JS",
      "Change typeof res === 'function' to typeof res === 'number'",
      "Call trampoline(sum) inside sum"
    ],
    correctOption: 0,
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
      "Write a null marker (e.g. '#,') when root is nullptr so tree structure can be unambiguously reconstructed",
      "Store tree in inorder traversal instead",
      "Change return to out += '0,'",
      "Tree cannot be serialized recursively"
    ],
    correctOption: 0,
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
      "Eliminate left recursion: parse Expr as Term followed by loop for ('+' Term)*",
      "Increase stack size with -Xss",
      "Change parseExpr to parseTerm in right child",
      "Make parseExpr synchronized"
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
      "Return immutable namedtuple/tuple or return a copy (res.copy())",
      "Clear memo on every call",
      "Convert node to an int",
      "Use memo = []"
    ],
    correctOption: 0,
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
      "Iterate over static snapshot: Array.from(node.childNodes) or iterate in reverse",
      "Use node.children instead of childNodes",
      "Change i++ to i += 2",
      "Set node.innerHTML = ''"
    ],
    correctOption: 0,
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
      "Ackermann grows too fast for compile-time evaluation step limit (-fconstexpr-steps); use lookup table or runtime calculation",
      "Change constexpr to inline",
      "static_assert cannot call functions",
      "Change m == 0 to m <= 0"
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
      "Add root check: if (p == -1 && children > 1) isCutVertex[u] = true;",
      "low[u] = Math.min(low[u], low[v]) should be tin[v]",
      "children > 0 is sufficient for root",
      "p != -1 check should be removed"
    ],
    correctOption: 0,
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
      "Ensure all custom visit methods return explicit evaluated values rather than falling back to void generic_visit",
      "Change visit_BinOp to visit_Add",
      "ast.NodeVisitor is not subclassable",
      "Use ast.walk instead of visit"
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
      "Continuations accumulate on stack; use setImmediate / process.nextTick / trampoline to unwind",
      "Change cont(0) to cont(n)",
      "CPS cannot compute sums",
      "Return cont directly"
    ],
    correctOption: 0,
    explanation: "WHAT: CPS continuation closure stack buildup. WHY: Synchronous CPS replaces stack frames with a chain of closure frames. When the base case calls `cont(0)`, the entire chain of $N$ continuations executes synchronously on the call stack. HOW: Trampoline or bounce continuations.",
    basePoints: 200,
    tags: ["javascript", "cps", "continuations", "functional"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RECURSION_RESCUE_BANK };
}
