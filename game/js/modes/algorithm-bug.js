/**
 * Code Debugger - Mode 14: Algorithm Bug (30 Challenges)
 * Sorting, searching, graphs, trees, DP, two pointers, greedy, sliding window bugs across Python, C++, Java, JS.
 */

const ALGORITHM_BUG_BANK = [
  {
    id: "algo-01",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 2,
    title: "Bubble Sort Inner Loop Boundary",
    description: "Bubble sort throws IndexError on the last element comparison.",
    code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr`,
    options: [
      "Inner loop range(n - 1) scans sorted suffixes; optimize to range(n - 1 - i) for efficiency",
      "Invert the comparison predicate to if arr[j] < arr[j + 1] to preserve ascending order",
      "Initialize array length variable as n = len(arr) - 1 before entering the outer loop",
      "Modify the function return signature to return only the first sorted element arr[0]"
    ],
    correctOption: 0,
    explanation: "WHAT: Bubble sort boundary optimization. WHY: After $i$ iterations, the last $i$ elements are already in sorted position. Traversing `n - 1 - i` avoids wasted comparisons. HOW: `range(n - 1 - i)`.",
    basePoints: 85,
    tags: ["python", "sorting", "bubble_sort", "algorithms"]
  },
  {
    id: "algo-02",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 2,
    title: "Binary Search Integer Floor Division",
    description: "Binary search in JavaScript computes floating point mid index causing invalid array indexing.",
    code: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = (low + high) / 2; // In JS, returns float like 2.5!\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,
    options: [
      "Change loop condition from low <= high to strict inequality low < high to avoid decimals",
      "Truncate mid to integer: let mid = Math.floor((low + high) / 2) or low + Math.floor((high - low) / 2)",
      "Compute mid index using remainder modulo arithmetic: let mid = (low + high) % 2",
      "JavaScript array indexing seamlessly supports fractional floating-point index lookups"
    ],
    correctOption: 1,
    explanation: "WHAT: Floating-point array indexing. WHY: In JavaScript, `/` produces float numbers (e.g. `(0 + 5) / 2 = 2.5`). `arr[2.5]` returns `undefined`. HOW: Use `Math.floor(...)`.",
    basePoints: 85,
    tags: ["javascript", "binary_search", "math", "floor"]
  },
  {
    id: "algo-03",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 3,
    title: "QuickSort Partition Swap on Equal Elements",
    description: "Lomuto partition gets trapped when array contains many duplicate elements.",
    code: `int partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            swap(arr, i, j);\n        }\n    }\n    swap(arr, i + 1, high);\n    return i + 1;\n}`,
    options: [
      "Expand the inner loop termination condition from j < high to inclusive j <= high",
      "Initialize partition pointer i = low instead of low - 1 before scanning elements",
      "Lomuto partition degrades to O(N^2) on duplicates; use Hoare or 3-way Dutch Flag partition",
      "Pivot selection must always choose the leftmost element arr[0] regardless of input array"
    ],
    correctOption: 2,
    explanation: "WHAT: Quicksort duplicate degradation. WHY: When all elements are identical, Lomuto's partition creates maximally unbalanced splits ($N-1$ and $0$), degrading to $O(N^2)$. HOW: Use 3-way Dutch National Flag partition.",
    basePoints: 95,
    tags: ["java", "quicksort", "partition", "algorithms"]
  },
  {
    id: "algo-04",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 3,
    title: "BFS Queue Pop Order",
    description: "Breadth-First Search uses stack (LIFO) instead of queue (FIFO), turning into DFS.",
    code: `std::vector<int> bfs(int start, const std::vector<std::vector<int>>& adj) {\n    std::stack<int> q; // Bug: stack instead of queue!\n    q.push(start);\n    // ...\n}`,
    options: [
      "Replace std::stack with std::priority_queue configured with custom edge comparator",
      "std::stack provides valid FIFO ordering for level-order breadth-first graph traversal",
      "Store traversal nodes inside std::vector container and pop from back on every step",
      "Use FIFO queue: std::queue<int> q; to explore graph nodes in level-by-level breadth order"
    ],
    correctOption: 3,
    explanation: "WHAT: LIFO data structure in BFS. WHY: Breadth-First Search requires FIFO order (First-In, First-Out) provided by a `queue` to visit nodes by shortest distance. A `stack` produces DFS. HOW: Use `std::queue<int>`.",
    basePoints: 95,
    tags: ["cpp", "bfs", "queue", "graphs"]
  },
  {
    id: "algo-05",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 4,
    title: "Two Pointers on Unsorted Array for 2-Sum",
    description: "Two-pointer collision approach fails to find matching sum because input array was not sorted.",
    code: `def two_sum(nums, target):\n    # Bug: nums is not sorted!\n    left, right = 0, len(nums) - 1\n    while left < right:\n        s = nums[left] + nums[right]\n        if s == target: return [left, right]\n        elif s < target: left += 1\n        else: right -= 1\n    return []`,
    options: [
      "Two-pointer pruning requires sorted arrays; sort array first or use a Hash Map (O(N))",
      "Initialize left index pointer starting from 1 instead of 0 before beginning scan",
      "Set right index pointer to len(nums) to include out-of-bounds boundary elements",
      "When s < target condition is met, decrement right pointer instead of incrementing left"
    ],
    correctOption: 0,
    explanation: "WHAT: Two-pointer monotonic invariant violation. WHY: Moving `left` rightward only increases sum if array is monotonic (sorted). On unsorted data, direction is unpredictable. HOW: Use hash map `seen = {}`.",
    basePoints: 110,
    tags: ["python", "two_sum", "two_pointers", "hashmap"]
  },
  {
    id: "algo-06",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 4,
    title: "Merge Two Sorted Arrays Pointer Increment",
    description: "Merging two sorted lists appends elements but forgets to advance index pointers.",
    code: `function merge(a, b) {\n  let res = [], i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] < b[j]) {\n      res.push(a[i]);\n      i++;\n    } else {\n      res.push(b[j]);\n      // Bug: missing j++!\n    }\n  }\n  return res.concat(a.slice(i)).concat(b.slice(j));\n}`,
    options: [
      "Change while loop guard condition to inclusive comparison i <= a.length",
      "Advance pointer in else branch: res.push(b[j]); j++; to prevent infinite loops",
      "Replace res.push(a[i]) with res.unshift(a[i]) to prepend elements to result array",
      "Switch postfix increment i++ to prefix increment ++i inside the first branch"
    ],
    correctOption: 1,
    explanation: "WHAT: Pointer stagnation in two-pointer merge. WHY: When `b[j] <= a[i]`, `b[j]` is appended but `j` is not incremented, leading to infinite loop or duplicate items. HOW: Add `j++`.",
    basePoints: 110,
    tags: ["javascript", "two_pointers", "merge_sort", "arrays"]
  },
  {
    id: "algo-07",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 4,
    title: "Binary Heap Sift-Down Child Index Selection",
    description: "Min-heap sift down always swaps with left child even when right child is smaller.",
    code: `void siftDown(int i) {\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    int smallest = left; // Bug: did not check if right child is smaller than left!\n    if (right < size && heap[right] < heap[left]) smallest = right;\n    if (heap[smallest] < heap[i]) { swap(i, smallest); siftDown(smallest); }\n}`,
    options: [
      "Min-heap siftDown must always swap parent nodes with whichever child holds maximum value",
      "Modify left child calculation formula from 2 * i + 1 to standard 0-indexed 2 * i",
      "Set smallest = i; check if left < size && heap[left] < heap[smallest], then check right",
      "Modify right child calculation formula from 2 * i + 2 to 1-indexed 2 * i + 3"
    ],
    correctOption: 2,
    explanation: "WHAT: Incorrect min-heap child candidate selection. WHY: Must compare both children against the parent index `i`. If `left >= size`, accessing `heap[left]` causes out of bounds. HOW: Check `smallest = i; if (left < size && heap[left] < heap[smallest]) smallest = left; ...`.",
    basePoints: 110,
    tags: ["java", "heap", "priority_queue", "algorithms"]
  },
  {
    id: "algo-08",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 5,
    title: "Kadane's Algorithm Initialization on All-Negative Array",
    description: "Maximum subarray sum on [-5, -2, -8] returns 0 instead of -2.",
    code: `int maxSubArray(const std::vector<int>& nums) {\n    int max_so_far = 0; // Bug: should be nums[0] or INT_MIN\n    int curr_max = 0;\n    for (int x : nums) {\n        curr_max = std::max(x, curr_max + x);\n        max_so_far = std::max(max_so_far, curr_max);\n    }\n    return max_so_far;\n}`,
    options: [
      "Replace std::max with std::min across all update lines inside the traversal loop",
      "Change accumulator formula from addition curr_max + x to multiplication curr_max * x",
      "Initialize max_so_far = 1 and curr_max = 1 to guarantee positive non-zero returns",
      "Initialize max_so_far = nums[0] and curr_max = nums[0] (or INT_MIN) for negative arrays"
    ],
    correctOption: 3,
    explanation: "WHAT: Negative value absorption in Kadane's algorithm. WHY: Initializing `max_so_far = 0` produces 0 when all elements are negative, even though the maximum non-empty subarray sum is `-2`. HOW: Initialize `max_so_far = nums[0]`.",
    basePoints: 125,
    tags: ["cpp", "kadane", "dynamic_programming", "subarrays"]
  },
  {
    id: "algo-09",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 5,
    title: "0/1 Knapsack 1D DP Array Traversal Direction",
    description: "1D array DP for 0/1 knapsack allows the same item to be chosen multiple times (unbounded knapsack).",
    code: `def knapsack(weights, values, W):\n    dp = [0] * (W + 1)\n    for w, v in zip(weights, values):\n        for cap in range(w, W + 1): # Bug: forward traversal re-uses item in same iteration!\n            dp[cap] = max(dp[cap], dp[cap - w] + v)\n    return dp[W]`,
    options: [
      "Iterate capacity backwards: range(W, w - 1, -1) so previous values come from prior item",
      "Reduce DP array allocation size from W + 1 elements down to exact capacity length W",
      "Swap indices in recurrence formula: replace dp[cap - w] + v with dp[cap - v] + w",
      "Initialize entire dp table with float('-inf') to prevent zero value propagation"
    ],
    correctOption: 0,
    explanation: "WHAT: Forward loop state contamination in 0/1 Knapsack. WHY: Looping forward causes `dp[cap - w]` to reflect the updated state with the CURRENT item, effectively turning it into Unbounded Knapsack ($N=\\infty$). HOW: Loop backward `range(W, w - 1, -1)`.",
    basePoints: 125,
    tags: ["python", "knapsack", "dynamic_programming", "dp"]
  },
  {
    id: "algo-10",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 5,
    title: "Topological Sort Cycle Detection Missing in Kahn's Algorithm",
    description: "Kahn's algorithm returns partial ordering on cyclic graph without detecting cycle.",
    code: `function topSort(numCourses, prerequisites) {\n  // In-degree computation and queue processing...\n  // Result array has length < numCourses if cycle exists!\n  return result.length === numCourses ? result : [];\n}`,
    options: [
      "Kahn's algorithm is incapable of detecting cycles across directed graph networks",
      "Verifying result.length === numCourses accurately detects cycles and returns empty array",
      "Topological sorting produces valid linear dependency orderings on cyclic graphs",
      "The result array length in Kahn's algorithm is mathematically guaranteed to equal numCourses"
    ],
    correctOption: 1,
    explanation: "WHAT: Cycle detection in Kahn's algorithm. WHY: Nodes involved in cycles never have their in-degree drop to 0 and are never pushed to the queue. If `result.length < numCourses`, a cycle is present. HOW: Verify `result.length === numCourses`.",
    basePoints: 125,
    tags: ["javascript", "topological_sort", "graphs", "kahn"]
  },
  {
    id: "algo-11",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 5,
    title: "Binary Search Lower Bound vs Upper Bound",
    description: "Finding first position of element >= target returns index > target instead.",
    code: `public int lowerBound(int[] arr, int target) {\n    int low = 0, high = arr.length;\n    while (low < high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] <= target) low = mid + 1; // Bug: <= makes it upperBound!\n        else high = mid;\n    }\n    return low;\n}`,
    options: [
      "Adjust the high pointer assignment branch from high = mid to high = mid - 1",
      "Expand the while loop continuation condition from low < high to low <= high",
      "Change condition to arr[mid] < target so mid candidates with arr[mid] >= target set high = mid",
      "Decrement the return expression from return low to return low - 1 upon loop termination"
    ],
    correctOption: 2,
    explanation: "WHAT: Lower bound condition. WHY: For `lower_bound` (first element $\\ge target$), when `arr[mid] >= target`, `mid` is a valid candidate so we must set `high = mid`. Thus when `arr[mid] < target`, set `low = mid + 1`. HOW: Change condition to `arr[mid] < target`.",
    basePoints: 125,
    tags: ["java", "binary_search", "lower_bound"]
  },
  {
    id: "algo-12",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 6,
    title: "Disjoint Set Union (DSU) Path Compression Pointer Invalidation",
    description: "find() function in DSU fails to compress path because assignment is omitted.",
    code: `int find(int i) {\n    if (parent[i] == i) return i;\n    return find(parent[i]); // Bug: parent[i] = find(parent[i]) missing!\n}`,
    options: [
      "Modify base termination condition from parent[i] == i to zero test parent[i] == 0",
      "Re-assign parent pointer parent[i] = i unconditionally before returning recursive call",
      "Disjoint Set Union data structures do not benefit from recursive path compression",
      "Assign compressed root: return parent[i] = find(parent[i]); to flatten tree depth"
    ],
    correctOption: 3,
    explanation: "WHAT: Missing path compression. WHY: Returning `find(parent[i])` without assigning back to `parent[i]` leaves tree height uncompressed ($O(N)$ operations instead of $O(\\alpha(N))$). HOW: `return parent[i] = find(parent[i]);`.",
    basePoints: 140,
    tags: ["cpp", "dsu", "union_find", "path_compression"]
  },
  {
    id: "algo-13",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 6,
    title: "Sliding Window Minimum / Maximum Monotonic Deque Pruning",
    description: "Monotonic deque for sliding window maximum maintains wrong inequality, keeping smaller elements.",
    code: `from collections import deque\nq = deque()\n# Want monotonic decreasing deque for max window\nfor i, x in enumerate(nums):\n    while q and nums[q[-1]] < x: # Correct invariant: pops elements smaller than incoming x\n        q.pop()\n    q.append(i)`,
    options: [
      "nums[q[-1]] < x correctly preserves monotonic decreasing order with window maximum at q[0]",
      "Invert comparison condition: replace nums[q[-1]] < x with nums[q[-1]] > x in while loop",
      "Replace right-side pop operation q.pop() with left-side eviction call q.popleft()",
      "Append raw value x directly into deque instead of storing array element index i"
    ],
    correctOption: 0,
    explanation: "WHAT: Monotonic deque property. WHY: For sliding window maximum, elements smaller than the incoming element `x` can never be the maximum in future windows and must be popped from the back (`nums[q[-1]] < x`). HOW: Logic is correct.",
    basePoints: 140,
    tags: ["python", "sliding_window", "deque", "monotonic_queue"]
  },
  {
    id: "algo-14",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 6,
    title: "Longest Increasing Subsequence (LIS) Binary Search Replacement",
    description: "Patience sorting / tails array replaces element at upper bound instead of lower bound.",
    code: `function lengthOfLIS(nums) {\n  let tails = [];\n  for (let x of nums) {\n    let i = 0, j = tails.length;\n    while (i < j) {\n      let m = (i + j) >> 1;\n      if (tails[m] < x) i = m + 1;\n      else j = m;\n    }\n    tails[i] = x;\n  }\n  return tails.length;\n}`,
    options: [
      "Replace lower-bound index assignment tails[i] = x with unconditional push tails.push(x)",
      "This binary search finding first tails[m] >= x and replacing it is standard O(N log N) LIS",
      "Adjust return statement value to decrement calculated length: return tails.length - 1",
      "Invert binary search condition from tails[m] < x to descending check tails[m] > x"
    ],
    correctOption: 1,
    explanation: "WHAT: O(N log N) LIS patience sorting logic. WHY: Finding lower bound in `tails` and replacing `tails[i] = x` creates the minimal tail values for increasing subsequences of length $i+1$. HOW: Implementation is correct.",
    basePoints: 140,
    tags: ["javascript", "lis", "binary_search", "dynamic_programming"]
  },
  {
    id: "algo-15",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 6,
    title: "Floyd-Warshall All-Pairs Shortest Path Loop Order",
    description: "Floyd-Warshall 3 nested loops place intermediate vertex k in inner loop instead of outermost loop.",
    code: `for (int i = 0; i < V; i++) {\n    for (int j = 0; j < V; j++) {\n        for (int k = 0; k < V; k++) { // Bug: k must be the outermost loop!\n            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n        }\n    }\n}`,
    options: [
      "Assign intermediate distance to dist[i][k] instead of updating target pair dist[i][j]",
      "Replace Math.min optimization with Math.max to find longest paths across vertices",
      "Make intermediate vertex k the outermost loop: for (int k) for (int i) for (int j)",
      "Loop k must start from 1 instead of 0 to skip self-loop intermediate vertex paths"
    ],
    correctOption: 2,
    explanation: "WHAT: Floyd-Warshall DP stage loop order. WHY: In Floyd-Warshall, `dist[i][j]` at step $k$ represents shortest path using only intermediate vertices in $\{1..k\}$. `k` must be the outermost loop. HOW: Place `for (int k = 0; k < V; k++)` as the outermost loop.",
    basePoints: 140,
    tags: ["java", "floyd_warshall", "graphs", "dp"]
  },
  {
    id: "algo-16",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 7,
    title: "Prim's Algorithm vs Dijkstra on Negative Edges",
    description: "Running Dijkstra on a graph with negative edge weights produces incorrect shortest paths.",
    code: `// Graph contains negative edge weights (e.g. u -> v with weight -5)\n// Running standard Dijkstra with priority queue...`,
    options: [
      "Add 100 to all graph edge weights to shift values into positive range before search",
      "Dijkstra produces optimal shortest paths on negative edges provided no negative cycles exist",
      "Switch Dijkstra priority queue implementation from min-heap comparator to max-heap",
      "Dijkstra assumes non-negative edge weights; use Bellman-Ford or SPFA for negative weights"
    ],
    correctOption: 3,
    explanation: "WHAT: Dijkstra invariant failure on negative weights. WHY: Dijkstra permanently marks a node as visited assuming distance cannot decrease later. Negative edges invalidate this greedy assumption. HOW: Use Bellman-Ford ($O(VE)$).",
    basePoints: 160,
    tags: ["cpp", "dijkstra", "bellman_ford", "graphs", "negative_weights"]
  },
  {
    id: "algo-17",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 7,
    title: "Interval Scheduling Greedy Strategy Selection",
    description: "Greedy interval scheduling sorts by start time instead of end time, producing suboptimal interval count.",
    code: `def max_intervals(intervals):\n    # Bug: sorted by start time intervals[0] instead of end time intervals[1]!\n    intervals.sort(key=lambda x: x[0])\n    count = 0; end = -1\n    for s, e in intervals:\n        if s >= end:\n            count += 1\n            end = e\n    return count`,
    options: [
      "Sort intervals by earliest finish time: intervals.sort(key=lambda x: x[1])",
      "Sort intervals in ascending order of duration: intervals.sort(key=lambda x: x[1] - x[0])",
      "Change interval overlap condition from inclusive s >= end to strict inequality s > end",
      "Interval scheduling cannot be solved using greedy approaches and requires O(N^2) DP"
    ],
    correctOption: 0,
    explanation: "WHAT: Suboptimal greedy choice in activity selection. WHY: Sorting by start time picks early long-running intervals that block many shorter intervals. Sorting by earliest finish time (`x[1]`) guarantees optimal choice. HOW: `intervals.sort(key=lambda x: x[1])`.",
    basePoints: 160,
    tags: ["python", "greedy", "intervals", "activity_selection"]
  },
  {
    id: "algo-18",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 7,
    title: "KMP String Matching LPS Array Construction",
    description: "Knuth-Morris-Pratt longest prefix suffix (LPS) builder advances index without matching prefix length.",
    code: `function computeLPS(pattern) {\n  let lps = [0], len = 0, i = 1;\n  while (i < pattern.length) {\n    if (pattern[i] === pattern[len]) {\n      len++; lps[i] = len; i++;\n    } else {\n      if (len !== 0) len = lps[len - 1]; // Fallback to prior prefix length\n      else { lps[i] = 0; i++; }\n    }\n  }\n  return lps;\n}`,
    options: [
      "Reset prefix length variable len = 0 unconditionally on mismatch instead of lps[len - 1]",
      "This KMP LPS table construction is correct; fallback to lps[len - 1] preserves prefix borders",
      "Initialize base index lps[0] = 1 to reflect single-character initial substring lengths",
      "Change character comparison condition from pattern[i] === pattern[len] to pattern[i] === pattern[0]"
    ],
    correctOption: 1,
    explanation: "WHAT: KMP LPS algorithm correctness. WHY: When mismatch occurs, rolling back to `len = lps[len - 1]` without advancing `i` enables finding smaller matching prefix-suffix borders in $O(N)$ time. HOW: Implementation is standard and correct.",
    basePoints: 160,
    tags: ["javascript", "kmp", "string_matching", "lps"]
  },
  {
    id: "algo-19",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 7,
    title: "Trie Delete Word Prefix Node Pruning",
    description: "Deleting a word from Trie sets isEndOfWord=false but leaves unused orphan nodes in memory.",
    code: `public boolean delete(TrieNode current, String word, int index) {\n    if (index == word.length()) {\n        if (!current.isWord) return false;\n        current.isWord = false;\n        return current.children.isEmpty(); // delete node if no children\n    }\n    // Recursive descent...\n}`,
    options: [
      "Trie data structures prohibit word deletion due to prefix sharing across stored strings",
      "Clear all children references immediately when index matches word length criteria",
      "Prune post-order: if (shouldDeleteChild) current.children.remove(ch); return !current.isWord && current.children.isEmpty();",
      "Assign current.isWord = null to signal garbage collection of trailing node instances"
    ],
    correctOption: 2,
    explanation: "WHAT: Trie node pruning during deletion. WHY: Removing a word should clean up nodes that have no other descendants and are not end-of-word markers for shorter words. HOW: Unlink child if child has no further branches.",
    basePoints: 160,
    tags: ["java", "trie", "trees", "pruning"]
  },
  {
    id: "algo-20",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 8,
    title: "A* Search Heuristic Inadmissibility",
    description: "A* search returns suboptimal non-shortest path because heuristic overestimates true distance.",
    code: `// Heuristic h(n) returns 2.0 * euclidean_distance(n, goal) > actual_distance`,
    options: [
      "A* search algorithm is guaranteed to find shortest paths regardless of heuristic bounds",
      "Heuristic function h(n) must evaluate to 0 across all nodes for A* search convergence",
      "Heuristic distance calculations must return negative values to minimize priority queues",
      "Heuristic must be admissible: h(n) <= h*(n) (never overestimate true remaining cost)"
    ],
    correctOption: 3,
    explanation: "WHAT: Inadmissible heuristic in A* search. WHY: If $h(n)$ overestimates the remaining distance to goal, A* can expand the goal node via a suboptimal path before expanding the true shortest path. HOW: Ensure $h(n) \\le \\text{cost}(n, \\text{goal})$.",
    basePoints: 175,
    tags: ["cpp", "a_star", "heuristic", "graphs", "admissibility"]
  },
  {
    id: "algo-21",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 8,
    title: "Median of Two Sorted Arrays Binary Search Partition",
    description: "Partitioning two arrays of size M and N binary searches on larger array instead of smaller array.",
    code: `def findMedianSortedArrays(nums1, nums2):\n    # Bug: if len(nums1) > len(nums2), binary search range can cause j = (m+n+1)//2 - i to be negative!\n    # Must ensure nums1 is the smaller array: if len(nums1) > len(nums2): return findMedianSortedArrays(nums2, nums1)`,
    options: [
      "Binary search on smaller array (len(A) <= len(B)) to keep j non-negative and achieve O(log(min(M, N)))",
      "Binary search partition calculations must always be executed across the larger input array",
      "Merge both sorted arrays into a combined O(M+N) buffer before extracting middle elements",
      "Replace floor division // 2 with standard floating-point division / 2 in partition formula"
    ],
    correctOption: 0,
    explanation: "WHAT: Index underflow in two-array median partition. WHY: Partitioning on the larger array can produce negative partition indices for the smaller array. HOW: Swap arrays so `len(nums1) <= len(nums2)`.",
    basePoints: 175,
    tags: ["python", "binary_search", "median", "arrays"]
  },
  {
    id: "algo-22",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 8,
    title: "LRU Cache Node Removal in Doubly-Linked List",
    description: "Evicting least recently used item removes node from hash map but fails to unlink from doubly linked list tail.",
    code: `class LRUCache {\n  evict() {\n    const node = this.tail.prev;\n    delete this.map[node.key];\n    // Bug: forgot to unlink node: this.removeNode(node)!\n  }\n}`,
    options: [
      "Purge entire this.map dictionary collection on every single LRU eviction trigger",
      "Unlink node pointers from list: node.prev.next = node.next; node.next.prev = node.prev;",
      "Assign this.tail = null to sever the tail pointer connection during eviction cycles",
      "Relocate the evicted node to head of list without modifying intermediate pointer links"
    ],
    correctOption: 1,
    explanation: "WHAT: Incomplete node removal from doubly linked list. WHY: Deleting from hash map without unlinking `node` from the DLL leaves orphaned nodes in the list, corrupting future evictions. HOW: `removeNode(node)`.",
    basePoints: 175,
    tags: ["javascript", "lru_cache", "linked_list", "data_structures"]
  },
  {
    id: "algo-23",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 8,
    title: "Fenwick Tree (Binary Indexed Tree) 1-Based Indexing",
    description: "Fenwick tree update(0, val) enters infinite loop because i += (i & -i) on 0 is 0.",
    code: `public void update(int i, int val) {\n    while (i < tree.length) {\n        tree[i] += val;\n        i += (i & -i); // If i == 0, i & -i == 0, infinite loop!\n    }\n}`,
    options: [
      "Replace lowbit bitwise formula i += (i & -i) with linear increment i += 1",
      "Adjust loop boundary condition to terminate earlier: while (i < tree.length - 1)",
      "Fenwick trees are 1-indexed; convert 0-based input index by passing i + 1 to BIT",
      "Initialize all internal tree array elements with default value 1 instead of 0"
    ],
    correctOption: 2,
    explanation: "WHAT: Zero index trap in BIT / Fenwick Tree. WHY: In binary representation, `0 & (-0) = 0`. Adding 0 to `i` never advances the loop. Fenwick trees inherently use 1-based indexing. HOW: Pass `i + 1`.",
    basePoints: 175,
    tags: ["java", "fenwick_tree", "bit", "data_structures"]
  },
  {
    id: "algo-24",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 9,
    title: "Edmonds-Karp Max Flow Augmenting Path Residual Graph Update",
    description: "Max flow augmenting path updates forward residual capacity but forgets to add back-edge flow capacity.",
    code: `for (int v = sink; v != source; v = parent[v]) {\n    int u = parent[v];\n    capacity[u][v] -= path_flow;\n    // Bug: missing capacity[v][u] += path_flow; (residual back-edge!)\n}`,
    options: [
      "Increment forward capacity along path: capacity[u][v] = capacity[u][v] + path_flow",
      "Invert parent pointer lookup assignment statement from u = parent[v] to u = parent[u]",
      "Edmonds-Karp algorithms terminate immediately when source node index matches sink node",
      "Add back-edge capacity: capacity[v][u] += path_flow; to allow flow cancellation"
    ],
    correctOption: 3,
    explanation: "WHAT: Missing residual back-edge in Ford-Fulkerson / Edmonds-Karp. WHY: Back-edges represent the ability to 'undo' or reroute flow. Without `capacity[v][u] += path_flow`, the algorithm cannot redirect flow and fails to find maximum flow. HOW: Add `capacity[v][u] += path_flow`.",
    basePoints: 190,
    tags: ["cpp", "max_flow", "edmonds_karp", "graphs"]
  },
  {
    id: "algo-25",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 9,
    title: "Treap Priority Heap Property Invariant",
    description: "Treap insertion maintains BST key property on left/right children but does not rotate when child priority exceeds parent.",
    code: `def insert(root, key, priority):\n    if not root: return TreapNode(key, priority)\n    if key < root.key:\n        root.left = insert(root.left, key, priority)\n        if root.left.priority > root.priority:\n            root = right_rotate(root) # Maintains max-heap property\n    else:\n        root.right = insert(root.right, key, priority)\n        if root.right.priority > root.priority:\n            root = left_rotate(root)\n    return root`,
    options: [
      "This Treap rotation logic correctly maintains BST order on keys and Max-Heap order on priorities",
      "Perform right_rotate only when key values satisfy greater-than-or-equal condition key >= root.key",
      "Treap randomized binary search trees maintain balance without performing tree rotations",
      "Heap property ordering across Treap nodes must strictly follow min-heap priority constraints"
    ],
    correctOption: 0,
    explanation: "WHAT: Treap randomized balanced BST rotation invariant. WHY: A Treap combines BST order on keys and heap order on priorities via tree rotations. HOW: Implementation is correct.",
    basePoints: 190,
    tags: ["python", "treap", "trees", "data_structures"]
  },
  {
    id: "algo-26",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 9,
    title: "Suffix Automaton (SAM) Clone Transition Re-direction",
    description: "Suffix Automaton state clone creation fails to redirect transitions from predecessor states.",
    code: `// SAM extend step: state 'q' has len[q] != len[p] + 1\nconst clone = sz++;\nlen[clone] = len[p] + 1;\nlink[clone] = link[q];\n// Bug: if loop while (p !== -1 && next[p][c] === q) next[p][c] = clone; is omitted!`,
    options: [
      "Clone state instantiation is redundant in SAM and should be bypassed during extensions",
      "Redirect transitions from ancestor states pointing to q over character c to point to clone",
      "Set suffix link assignment of clone state to direct predecessor node link[clone] = p",
      "Assign clone state maximum length to match target node length: len[clone] = len[q]"
    ],
    correctOption: 1,
    explanation: "WHAT: Suffix Automaton transition redirect. WHY: When cloning a state `q`, all prior paths that reached `q` through the shorter prefix length must be rerouted to `clone`. HOW: Loop `while (p !== -1 && next[p][c] === q) { next[p][c] = clone; p = link[p]; }`.",
    basePoints: 190,
    tags: ["javascript", "suffix_automaton", "strings", "algorithms"]
  },
  {
    id: "algo-27",
    mode: "algorithm_bug",
    language: "Java",
    difficulty: 9,
    title: "Heavy-Light Decomposition (HLD) Segment Tree Query Range",
    description: "HLD path query queries segment tree using 0-based node ID rather than flattened position in base array.",
    code: `public int queryPath(int u, int v) {\n    int res = 0;\n    while (head[u] != head[v]) {\n        if (depth[head[u]] < depth[head[v]]) { int t = u; u = v; v = t; }\n        res += segTree.query(pos[head[u]], pos[u]); // Correct: pos[] mapping!\n        u = parent[head[u]];\n    }\n    // ...\n    return res;\n}`,
    options: [
      "Replace position index pos[head[u]] with direct tree vertex identifier head[u]",
      "Execute segment tree query using raw vertex identifiers: res += segTree.query(u, v)",
      "Path segments must be queried using DFS discovery index pos[u], not raw vertex label u",
      "Replace head depth comparison depth[head[u]] with individual vertex depth depth[u]"
    ],
    correctOption: 2,
    explanation: "WHAT: HLD positional index mapping. WHY: Segment trees store values according to the HLD linear DFS ordering `pos[u]`. Querying with raw vertex numbers `u` corrupts subtree ranges. HOW: Use `pos[head[u]]` to `pos[u]`.",
    basePoints: 190,
    tags: ["java", "hld", "heavy_light_decomposition", "segment_tree", "trees"]
  },
  {
    id: "algo-28",
    mode: "algorithm_bug",
    language: "C++",
    difficulty: 10,
    title: "Hopcroft-Karp Bipartite Matching Distance Reset",
    description: "Hopcroft-Karp BFS phase fails to reset distance for dummy NIL vertex (0), preventing DFS from reaching free vertices.",
    code: `bool bfs() {\n    std::queue<int> q;\n    for (int u = 1; u <= n; u++) {\n        if (pairU[u] == 0) { dist[u] = 0; q.push(u); }\n        else dist[u] = INF;\n    }\n    dist[0] = INF; // Essential: dummy vertex reset!\n    // ...\n}`,
    options: [
      "Reset dist[0] to 0 to force BFS search queues to terminate on first free vertex",
      "Convert pairU array storage from 1-based indexing to 0-based index representation",
      "Initialize distance array elements dist[u] = 0 across all vertices before BFS",
      "Initialize dist[0] (the NIL/unmatched sentinel vertex) to INF to track shortest path"
    ],
    correctOption: 3,
    explanation: "WHAT: Hopcroft-Karp NIL sentinel distance initialization. WHY: `dist[0]` stores the length of the shortest found augmenting path to an unmatched vertex. Initializing `dist[0] = INF` allows BFS to record the minimum layer where free vertices appear. HOW: `dist[0] = INF`.",
    basePoints: 200,
    tags: ["cpp", "hopcroft_karp", "bipartite_matching", "graphs"]
  },
  {
    id: "algo-29",
    mode: "algorithm_bug",
    language: "Python",
    difficulty: 10,
    title: "Link-Cut Tree Splay Operation Splay Tag / Reversal Propagation",
    description: "Accessing nodes in Link-Cut Tree without pushing down lazy reversal tags before splay operation corrupts tree topology.",
    code: `def access(u):\n    v = None\n    curr = u\n    while curr:\n        splay(curr) # Bug: if pushdown() is not called from root down to curr before splay, reversal tags get rotated incorrectly!\n        curr.right = v\n        v = curr\n        curr = curr.parent`,
    options: [
      "Push down all lazy tags from representative root down to curr before splay rotations",
      "Pass the preferred child pointer v to splay operation: replace splay(curr) with splay(v)",
      "Assign preferred child to left subtree: replace curr.right = v with curr.left = v",
      "Link-Cut Trees do not support splay operations and must use standard AVL rotations"
    ],
    correctOption: 0,
    explanation: "WHAT: Lazy tag propagation order in Splay/LCT. WHY: Splay tree rotations invert parent-child relationships. If lazy tags (such as path reversal) are pending above `curr`, rotations will scramble the inverted subtrees. HOW: Push down tags along root-to-node path before splaying.",
    basePoints: 200,
    tags: ["python", "link_cut_tree", "splay_tree", "advanced_data_structures"]
  },
  {
    id: "algo-30",
    mode: "algorithm_bug",
    language: "JavaScript",
    difficulty: 10,
    title: "Convex Hull Trick Monotonic Slope Deque Query Direction",
    description: "CHT deque query for minimum cost evaluates lines from wrong end when queries are not sorted monotonically.",
    code: `class ConvexHullTrick {\n  // Assumes slopes m are strictly decreasing and query x values are strictly increasing\n  query(x) {\n    while (this.lines.length >= 2 && this.eval(0, x) >= this.eval(1, x)) {\n      this.lines.shift(); // O(1) query only valid if x is monotonically increasing!\n    }\n    return this.eval(0, x);\n  }\n}`,
    options: [
      "Invert the deque line comparison condition from this.eval(0, x) >= ... to <=",
      "Non-monotonic queries invalidate deque shift; use binary search over hull lines (O(log N))",
      "Replace front deque eviction this.lines.shift() with back line removal this.lines.pop()",
      "Convex Hull Trick optimizations are mathematically limited to dense matrix operations"
    ],
    correctOption: 1,
    explanation: "WHAT: Monotonic query assumption violation in Convex Hull Trick. WHY: Popping lines from the front (`shift()`) permanently discards them. If a subsequent query has smaller $x$, the discarded line may have been optimal. HOW: Use binary search over hull lines when $x$ is not monotonic.",
    basePoints: 200,
    tags: ["javascript", "cht", "convex_hull_trick", "dynamic_programming", "geometry"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALGORITHM_BUG_BANK };
}
