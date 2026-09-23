/**
 * Code Debugger - Mode 7: Off-By-One (30 Challenges)
 * Boundary errors, slice/substring ranges, 0-vs-1 indexing, loop bounds in Python, C++, Java, JS.
 */

const OFF_BY_ONE_BANK = [
  {
    id: "obo-01",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 2,
    title: "Array Boundary Iterate",
    description: "The loop accesses undefined on its final iteration.",
    code: `const items = ["A", "B", "C"];\nfor (let i = 0; i <= items.length; i++) {\n  console.log(items[i].toLowerCase());\n}`,
    options: [
      "Change i = 0 to i = 1",
      "Change i <= items.length to i < items.length",
      "Use items[i - 1] instead of items[i]",
      "Change items.length to items.length + 1"
    ],
    correctOption: 1,
    explanation: "WHAT: Index out of bounds. WHY: Array length is 3 (valid indices 0, 1, 2). i <= length evaluates i=3 where items[3] is undefined. HOW: Use `i < items.length`.",
    basePoints: 85,
    tags: ["javascript", "arrays", "loops", "boundaries"]
  },
  {
    id: "obo-02",
    mode: "off_by_one",
    language: "Python",
    difficulty: 2,
    title: "Range Upper Bound Omission",
    description: "The function should count 1 through 10 inclusive, but stops at 9.",
    code: `def count_to_ten():\n    numbers = []\n    for i in range(1, 10):\n        numbers.append(i)\n    return numbers`,
    options: [
      "range(1, 10) should be range(1, 11)",
      "range(1, 10) should be range(0, 10)",
      "numbers.append(i) should be numbers.append(i + 1)",
      "range(1, 10) should be range(1, 10, 2)"
    ],
    correctOption: 0,
    explanation: "WHAT: Range exclusion. WHY: Python's `range(start, stop)` is half-open [start, stop), excluding stop. HOW: Use `range(1, 11)` to include 10.",
    basePoints: 85,
    tags: ["python", "range", "boundaries"]
  },
  {
    id: "obo-03",
    mode: "off_by_one",
    language: "C++",
    difficulty: 3,
    title: "Vector Size Boundary",
    description: "Vector access causes undefined behavior / segfault on the last element.",
    code: `std::vector<int> v = {10, 20, 30, 40};\nfor (size_t i = 0; i <= v.size(); ++i) {\n    std::cout << v[i] << std::endl;\n}`,
    options: [
      "size_t should be replaced with int",
      "i <= v.size() should be i < v.size()",
      "++i should be i++",
      "v[i] should be v.at(i + 1)"
    ],
    correctOption: 1,
    explanation: "WHAT: Vector buffer overrun. WHY: `v.size()` is 4, indexing `v[4]` is out of bounds. HOW: Loop condition must be `i < v.size()`.",
    basePoints: 95,
    tags: ["cpp", "vector", "boundaries"]
  },
  {
    id: "obo-04",
    mode: "off_by_one",
    language: "Java",
    difficulty: 3,
    title: "String Substring End Index",
    description: "getPrefix('Hello', 3) should return 'Hel' (first 3 letters), but returns 'He'.",
    code: `public String getPrefix(String str, int len) {\n    return str.substring(0, len - 1);\n}`,
    options: [
      "str.substring(0, len - 1) should be str.substring(0, len)",
      "str.substring(0, len - 1) should be str.substring(1, len)",
      "str.substring(0, len - 1) should be str.substring(len)",
      "str.substring(0, len - 1) should be str.substring(0, len + 1)"
    ],
    correctOption: 0,
    explanation: "WHAT: Substring index exclusion. WHY: `substring(begin, end)` returns chars from begin to end-1. Passing `len-1` gives `len-1` characters instead of `len`. HOW: Use `str.substring(0, len)`.",
    basePoints: 95,
    tags: ["java", "string", "substring"]
  },
  {
    id: "obo-05",
    mode: "off_by_one",
    language: "Python",
    difficulty: 3,
    title: "Slice Last Element Skipped",
    description: "The slice is supposed to include all elements up to the specified end index.",
    code: `def get_first_n(arr, n):\n    # Return first n elements\n    return arr[0 : n - 1]`,
    options: [
      "arr[0 : n - 1] should be arr[0 : n]",
      "arr[0 : n - 1] should be arr[1 : n]",
      "arr[0 : n - 1] should be arr[: n + 1]",
      "arr[0 : n - 1] should be arr[n:]"
    ],
    correctOption: 0,
    explanation: "WHAT: Python slice stop index is exclusive. WHY: `arr[0 : n - 1]` only takes `n - 1` items. HOW: Change to `arr[0 : n]` or `arr[:n]`.",
    basePoints: 95,
    tags: ["python", "slices"]
  },
  {
    id: "obo-06",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 3,
    title: "Reverse Loop Premature Stop",
    description: "The countdown loop skips index 0 (the first element).",
    code: `const items = [10, 20, 30];\nfor (let i = items.length - 1; i > 0; i--) {\n  console.log(items[i]);\n}`,
    options: [
      "i > 0 should be i >= 0",
      "items.length - 1 should be items.length",
      "i-- should be --i",
      "let i should be const i"
    ],
    correctOption: 0,
    explanation: "WHAT: First element skipped in reverse iteration. WHY: `i > 0` stops when i reaches 1, never visiting i=0. HOW: Condition must be `i >= 0`.",
    basePoints: 95,
    tags: ["javascript", "loops", "reverse"]
  },
  {
    id: "obo-07",
    mode: "off_by_one",
    language: "Java",
    difficulty: 4,
    title: "Binary Search Midpoint Left Shift",
    description: "Binary search causes an infinite loop when element is at high boundary.",
    code: `public int binarySearch(int[] arr, int target) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    options: [
      "low = mid should be low = mid + 1",
      "high = mid - 1 should be high = mid",
      "low <= high should be low < high",
      "int mid = (low + high) / 2 should be (low + high + 1) / 2"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing +1 step in binary search. WHY: Setting `low = mid` without `+ 1` traps the loop when `low + 1 == high`. HOW: Update `low = mid + 1`.",
    basePoints: 110,
    tags: ["java", "binary_search", "boundaries"]
  },
  {
    id: "obo-08",
    mode: "off_by_one",
    language: "C++",
    difficulty: 4,
    title: "Null-Terminator Overwrite in C-String",
    description: "The buffer has size 5, and strncpy writes 5 characters leaving no null terminator.",
    code: `char dest[5];\nstrncpy(dest, "hello", 5);\nprintf("%s\\n", dest);`,
    options: [
      "Buffer size must be at least 6 and dest[5] = '\\0'",
      "printf format should be %c",
      "strncpy should be memcpy",
      "dest must be allocated with malloc(4)"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing null terminator '\\0'. WHY: 'hello' is 5 chars plus 1 null byte = 6 bytes needed. Writing 5 chars leaves no terminator, causing printf to read garbage. HOW: Size dest to 6 and ensure `dest[5] = '\\0'`.",
    basePoints: 110,
    tags: ["cpp", "cstring", "buffer"]
  },
  {
    id: "obo-09",
    mode: "off_by_one",
    language: "Python",
    difficulty: 4,
    title: "Split Batching Chunk Size",
    description: "The batching function drops the last chunk if list length is not divisible by batch size.",
    code: `def make_batches(data, size):\n    batches = []\n    for i in range(0, len(data) - size, size):\n        batches.append(data[i : i + size])\n    return batches`,
    options: [
      "range(0, len(data) - size, size) should be range(0, len(data), size)",
      "data[i : i + size] should be data[i : len(data)]",
      "size should be size - 1",
      "batches.append should be batches.extend"
    ],
    correctOption: 0,
    explanation: "WHAT: Premature stop in chunking. WHY: `len(data) - size` prevents the loop from reaching the final slice when data doesn't align evenly. HOW: Use `range(0, len(data), size)`.",
    basePoints: 110,
    tags: ["python", "batching", "range"]
  },
  {
    id: "obo-10",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 4,
    title: "Pagination Offset Calculation",
    description: "Page 1 offset should be 0, but computeOffset(1, 10) returns 10.",
    code: `function computeOffset(pageNumber, pageSize) {\n  return pageNumber * pageSize;\n}`,
    options: [
      "return (pageNumber - 1) * pageSize;",
      "return (pageNumber + 1) * pageSize;",
      "return pageNumber * (pageSize - 1);",
      "return Math.floor(pageNumber / pageSize);"
    ],
    correctOption: 0,
    explanation: "WHAT: 1-based to 0-based index translation. WHY: Page 1 with pageSize 10 should start at offset 0, but `1 * 10 = 10` skips page 1 items. HOW: `(pageNumber - 1) * pageSize`.",
    basePoints: 110,
    tags: ["javascript", "pagination", "math"]
  },
  {
    id: "obo-11",
    mode: "off_by_one",
    language: "C++",
    difficulty: 5,
    title: "Fencepost Problem in Fencepost String Join",
    description: "Joining words with comma produces an extra trailing comma.",
    code: `std::string join(const std::vector<std::string>& words) {\n    std::string res = "";\n    for (size_t i = 0; i < words.size(); ++i) {\n        res += words[i] + ", ";\n    }\n    return res;\n}`,
    options: [
      "Only append comma when i > 0 or i < words.size() - 1",
      "Loop from 1 to words.size() + 1",
      "Use res = words[0] and remove the loop",
      "Change res += words[i] to res = words[i] + res"
    ],
    correctOption: 0,
    explanation: "WHAT: Fencepost error (extra delimiter). WHY: For N elements, there are N-1 separators. Appending on every iteration adds an extra separator at the end. HOW: Append delimiter conditionally for `i > 0`.",
    basePoints: 125,
    tags: ["cpp", "strings", "fencepost"]
  },
  {
    id: "obo-12",
    mode: "off_by_one",
    language: "Java",
    difficulty: 5,
    title: "Calendar Month 0-Indexed",
    description: "Setting month to December (12) with Calendar.set(YEAR, 12, DAY) rolls over to January next year.",
    code: `Calendar cal = Calendar.getInstance();\n// Set to December 25, 2026\ncal.set(2026, 12, 25);`,
    options: [
      "Calendar months are 0-indexed (January is 0, December is 11)",
      "2026 should be formatted as string '2026'",
      "Day 25 is invalid for December",
      "Calendar.getInstance() must take Locale as parameter"
    ],
    correctOption: 0,
    explanation: "WHAT: 0-indexed month system in legacy Java Calendar. WHY: 12 represents month 13 (January next year). December is 11 or `Calendar.DECEMBER`. HOW: Pass 11 or use modern `java.time.LocalDate`.",
    basePoints: 125,
    tags: ["java", "calendar", "datetime"]
  },
  {
    id: "obo-13",
    mode: "off_by_one",
    language: "Python",
    difficulty: 5,
    title: "Sliding Window Window-End Index",
    description: "The sliding window of size k misses the last valid window in the array.",
    code: `def max_window_sum(arr, k):\n    max_sum = 0\n    for i in range(len(arr) - k):\n        window_sum = sum(arr[i : i + k])\n        max_sum = max(max_sum, window_sum)\n    return max_sum`,
    options: [
      "range(len(arr) - k) should be range(len(arr) - k + 1)",
      "arr[i : i + k] should be arr[i : i + k + 1]",
      "max_sum should be initialized to None",
      "range(len(arr) - k) should be range(k, len(arr))"
    ],
    correctOption: 0,
    explanation: "WHAT: Last window omitted. WHY: `range(len(arr) - k)` stops at `len - k - 1`. The last window starts at `len - k`. HOW: Use `range(len(arr) - k + 1)`.",
    basePoints: 125,
    tags: ["python", "sliding_window", "range"]
  },
  {
    id: "obo-14",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 5,
    title: "Array Splice Delete Count",
    description: "Removing 1 item from array removes 2 items instead.",
    code: `const arr = ["apple", "banana", "cherry", "date"];\n// Remove 'banana' at index 1\narr.splice(1, 2);`,
    options: [
      "arr.splice(1, 2) should be arr.splice(1, 1)",
      "arr.splice(1, 2) should be arr.slice(1, 2)",
      "arr.splice(1, 2) should be arr.splice(2, 1)",
      "splice second parameter is end index, so it should be 1"
    ],
    correctOption: 0,
    explanation: "WHAT: Splice second argument is deleteCount, not endIndex. WHY: `splice(1, 2)` removes 2 elements ('banana' and 'cherry'). HOW: Use `arr.splice(1, 1)`.",
    basePoints: 125,
    tags: ["javascript", "arrays", "splice"]
  },
  {
    id: "obo-15",
    mode: "off_by_one",
    language: "C++",
    difficulty: 6,
    title: "Array Reversal In-Place Two Pointers",
    description: "Reversing an array swaps elements twice, restoring original order.",
    code: `void reverseArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        int temp = arr[i];\n        arr[i] = arr[n - 1 - i];\n        arr[n - 1 - i] = temp;\n    }\n}`,
    options: [
      "Loop condition must be i < n / 2",
      "arr[n - 1 - i] should be arr[n - i]",
      "Loop must start at i = 1",
      "temp must be allocated dynamically"
    ],
    correctOption: 0,
    explanation: "WHAT: Full-length traversal undoes reversal. WHY: Looping to `n` swaps elements in first half with second half, then swaps them right back. HOW: Loop condition should be `i < n / 2`.",
    basePoints: 140,
    tags: ["cpp", "arrays", "reversal"]
  },
  {
    id: "obo-16",
    mode: "off_by_one",
    language: "Java",
    difficulty: 6,
    title: "Sublist End Index Range Check",
    description: "List.subList with inclusive intent throws IndexOutOfBoundsException.",
    code: `List<String> list = Arrays.asList("A", "B", "C");\n// Want elements from index 0 to 2 inclusive\nList<String> sub = list.subList(0, 3);`,
    options: [
      "subList(fromIndex, toIndex) is [fromIndex, toIndex), so 3 is correct for indices 0, 1, 2; no error here if list size is 3",
      "list.subList(0, 3) must be list.subList(0, 2)",
      "Arrays.asList does not support subList",
      "toIndex must be list.size() - 1"
    ],
    correctOption: 0,
    explanation: "WHAT: Understanding half-open ranges. WHY: `subList(0, 3)` includes indices 0, 1, and 2 (size 3 is valid upper bound). Misconception that toIndex is 2 causes omission of 'C'. HOW: 3 is the correct exclusive end.",
    basePoints: 140,
    tags: ["java", "collections", "sublist"]
  },
  {
    id: "obo-17",
    mode: "off_by_one",
    language: "Python",
    difficulty: 6,
    title: "Days Between Dates Calculation",
    description: "Calculating number of inclusive days in a date range yields one day short.",
    code: `def count_days(start_day, end_day):\n    # start_day=1, end_day=5 should be 5 days (1,2,3,4,5)\n    return end_day - start_day`,
    options: [
      "return end_day - start_day + 1",
      "return end_day - start_day - 1",
      "return (end_day + start_day) / 2",
      "return end_day - start_day + 2"
    ],
    correctOption: 0,
    explanation: "WHAT: Inclusive interval count. WHY: `5 - 1 = 4`, but the set {1, 2, 3, 4, 5} has 5 items. HOW: Inclusive count formula is `end - start + 1`.",
    basePoints: 140,
    tags: ["python", "math", "intervals"]
  },
  {
    id: "obo-18",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 6,
    title: "String matchAll / RegExp LastIndex",
    description: "RegExp with 'g' flag fails every alternate test() call.",
    code: `const re = /pattern/g;\nconsole.log(re.test("pattern")); // true\nconsole.log(re.test("pattern")); // false!`,
    options: [
      "RegExp with /g maintains lastIndex state; reset re.lastIndex = 0 or omit /g",
      "pattern must be escaped with \\\\pattern\\\\",
      "test() consumes the string permanently",
      "Use re.match() instead of re.test()"
    ],
    correctOption: 0,
    explanation: "WHAT: Stateful regex state mutation. WHY: `re.test()` advances `lastIndex` past the match. Subsequent test starts search at index 7 and fails. HOW: Reset `re.lastIndex = 0` or avoid global flag with `.test()`.",
    basePoints: 140,
    tags: ["javascript", "regex", "state"]
  },
  {
    id: "obo-19",
    mode: "off_by_one",
    language: "C++",
    difficulty: 7,
    title: "2D Matrix Grid Boundary Iteration",
    description: "Iterating a 2D matrix uses row count for column limit.",
    code: `int grid[3][5];\nfor (int r = 0; r < 3; r++) {\n    for (int c = 0; c < 3; c++) { // bug\n        grid[r][c] = 0;\n    }\n}`,
    options: [
      "c < 3 should be c < 5",
      "r < 3 should be r <= 3",
      "grid[r][c] should be grid[c][r]",
      "c must start from 1"
    ],
    correctOption: 0,
    explanation: "WHAT: Mismatched matrix dimension. WHY: Grid has 5 columns, but inner loop iterates only up to 3, leaving 2 columns uninitialized. HOW: Change `c < 3` to `c < 5`.",
    basePoints: 160,
    tags: ["cpp", "matrix", "loops"]
  },
  {
    id: "obo-20",
    mode: "off_by_one",
    language: "Python",
    difficulty: 7,
    title: "Bisect Right vs Bisect Left",
    description: "bisect_left returns insertion point that overwrites equal element in rank lookup.",
    code: `import bisect\ngrades = [60, 70, 80, 90]\n# Want to find index after 80\nidx = bisect.bisect_left(grades, 80) # returns 2 instead of 3`,
    options: [
      "Use bisect.bisect_right(grades, 80)",
      "Use grades.index(80) + 2",
      "Use bisect.insort(grades, 80)",
      "Subtract 1 from idx"
    ],
    correctOption: 0,
    explanation: "WHAT: `bisect_left` vs `bisect_right`. WHY: `bisect_left` returns the index before any existing equal entries. `bisect_right` returns insertion index after existing entries. HOW: Use `bisect.bisect_right`.",
    basePoints: 160,
    tags: ["python", "bisect", "binary_search"]
  },
  {
    id: "obo-21",
    mode: "off_by_one",
    language: "Java",
    difficulty: 7,
    title: "Ring Buffer / Circular Queue Head Pointer",
    description: "Enqueueing into circular buffer fails to wrap at capacity.",
    code: `public void enqueue(int val) {\n    data[tail] = val;\n    tail = (tail + 1); // missing wrap\n}`,
    options: [
      "tail = (tail + 1) % capacity;",
      "tail = tail + 1 - capacity;",
      "tail = (tail % capacity) + 1;",
      "tail = data.length - 1;"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing modulo wrap-around. WHY: Incrementing `tail` without modulo causes `ArrayIndexOutOfBoundsException` when `tail >= capacity`. HOW: `tail = (tail + 1) % capacity`.",
    basePoints: 160,
    tags: ["java", "circular_buffer", "modulo"]
  },
  {
    id: "obo-22",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 8,
    title: "Array Buffer / TypedArray Byte Offset",
    description: "Creating Int32Array view at byte offset 2 throws RangeError.",
    code: `const buffer = new ArrayBuffer(16);\nconst view = new Int32Array(buffer, 2, 2);`,
    options: [
      "Int32Array byte offset must be a multiple of 4 (the element byte size)",
      "ArrayBuffer size must be at least 32",
      "Second parameter is length, not offset",
      "TypedArrays cannot accept an ArrayBuffer"
    ],
    correctOption: 0,
    explanation: "WHAT: TypedArray memory alignment. WHY: `Int32Array` requires 4-byte alignment; offset 2 is not divisible by 4. HOW: Byte offset must be a multiple of 4 (e.g. 0, 4, 8).",
    basePoints: 175,
    tags: ["javascript", "typedarray", "memory"]
  },
  {
    id: "obo-23",
    mode: "off_by_one",
    language: "Python",
    difficulty: 8,
    title: "Flattening 2D Coordinates into 1D Index",
    description: "Calculating 1D index from (row, col) in a W x H grid produces overlapping indices.",
    code: `def to_1d_index(row, col, width):\n    return row + col * width`,
    options: [
      "return row * width + col",
      "return (row + col) * width",
      "return row * col + width",
      "return row + col"
    ],
    correctOption: 0,
    explanation: "WHAT: Row-major index formula inversion. WHY: In row-major layout, each full row occupies `width` consecutive entries. The correct formula is `row * width + col`. HOW: Use `row * width + col`.",
    basePoints: 175,
    tags: ["python", "math", "indexing"]
  },
  {
    id: "obo-24",
    mode: "off_by_one",
    language: "C++",
    difficulty: 8,
    title: "Binary Heap Parent-Child Index Formula",
    description: "For 0-indexed heap, child of node i is calculated using 1-indexed formula.",
    code: `int getLeftChild(int i) {\n    return 2 * i; // Bug for 0-indexed array\n}`,
    options: [
      "return 2 * i + 1;",
      "return 2 * (i + 1);",
      "return (i - 1) / 2;",
      "return 2 * i + 2;"
    ],
    correctOption: 0,
    explanation: "WHAT: 0-indexed vs 1-indexed binary heap navigation. WHY: For 0-indexed heap, node 0's left child would be `2*0 = 0` (cycle!). Correct formula is `2 * i + 1`. HOW: Return `2 * i + 1`.",
    basePoints: 175,
    tags: ["cpp", "heap", "trees"]
  },
  {
    id: "obo-25",
    mode: "off_by_one",
    language: "Java",
    difficulty: 9,
    title: "Merge Sort Index Midpoint Partition",
    description: "Midpoint calculation causes infinite recursion on 2-element sub-array.",
    code: `void mergeSort(int[] a, int left, int right) {\n    if (left >= right) return;\n    int mid = (left + right + 1) / 2;\n    mergeSort(a, left, mid - 1);\n    mergeSort(a, mid, right);\n}`,
    options: [
      "int mid = left + (right - left) / 2; with subproblems [left, mid] and [mid + 1, right]",
      "left >= right should be left > right",
      "mergeSort(a, mid, right) should be mergeSort(a, mid + 1, right)",
      "mid must be calculated with (left + right) * 2"
    ],
    correctOption: 0,
    explanation: "WHAT: Skewed midpoint partition creates unreduced subproblems. WHY: Standard merge sort uses `mid = left + (right - left)/2` split into `[left, mid]` and `[mid + 1, right]`. HOW: Standardize midpoint calculation.",
    basePoints: 190,
    tags: ["java", "merge_sort", "recursion"]
  },
  {
    id: "obo-26",
    mode: "off_by_one",
    language: "Python",
    difficulty: 9,
    title: "Levenshtein Distance DP Matrix Dimension",
    description: "DP matrix initialized with dimensions (len(s1), len(s2)) fails to store empty string base cases.",
    code: `def edit_distance(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0] * n for _ in range(m)]\n    # Fails when filling base cases for empty prefixes`,
    options: [
      "dp matrix dimensions must be (m + 1) x (n + 1)",
      "dp matrix dimensions must be m x m",
      "s1 and s2 must be padded with spaces",
      "range(m) should be range(m - 1)"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing base-case row/col in DP table. WHY: `dp[i][j]` represents prefixes of length `i` and `j` (including length 0). Dimensions must be `(m + 1) x (n + 1)`. HOW: Initialize `[[0] * (n + 1) for _ in range(m + 1)]`.",
    basePoints: 190,
    tags: ["python", "dynamic_programming", "matrix"]
  },
  {
    id: "obo-27",
    mode: "off_by_one",
    language: "C++",
    difficulty: 9,
    title: "std::string::find Return Value Check",
    description: "Checking if a character was found checks for > 0, missing index 0.",
    code: `std::string s = "apple";\nif (s.find('a') > 0) {\n    std::cout << "Found!" << std::endl;\n}`,
    options: [
      "s.find('a') != std::string::npos",
      "s.find('a') >= 1",
      "s.find('a') == true",
      "s.find('a') < s.length()"
    ],
    correctOption: 0,
    explanation: "WHAT: `find` returns index 0 for the first char, which is not `> 0`. WHY: If match is at index 0, condition `> 0` evaluates false! HOW: Compare against `std::string::npos`.",
    basePoints: 190,
    tags: ["cpp", "strings", "npos"]
  },
  {
    id: "obo-28",
    mode: "off_by_one",
    language: "JavaScript",
    difficulty: 10,
    title: "Bitwise Shift 32-bit Rollover Boundary",
    description: "Bitwise left shifting 1 by 32 evaluates to 1 instead of 4294967296.",
    code: `function getBitmask(n) {\n  return 1 << n;\n}\nconsole.log(getBitmask(32)); // returns 1!`,
    options: [
      "JS bitwise operators operate on 32-bit integers (shift count is modulo 32); use BigInt 1n << BigInt(n) or Math.pow(2, n)",
      "1 << n should be 1 >> n",
      "n must be converted with Number.parseFloat(n)",
      "Use Math.floor(1 << n)"
    ],
    correctOption: 0,
    explanation: "WHAT: 32-bit modulo bitwise shift limit. WHY: In JS, `1 << 32` evaluates as `1 << (32 % 32) == 1 << 0 == 1`. HOW: Use `2 ** n` or `1n << BigInt(n)`.",
    basePoints: 200,
    tags: ["javascript", "bitwise", "numbers"]
  },
  {
    id: "obo-29",
    mode: "off_by_one",
    language: "Python",
    difficulty: 10,
    title: "Subarray Sum Equals K Prefix Map Base Case",
    description: "Count of subarrays summing to k misses subarrays starting at index 0.",
    code: `def subarraySum(nums, k):\n    count = 0\n    pref_sum = 0\n    seen = {} # missing {0: 1}\n    for x in nums:\n        pref_sum += x\n        if pref_sum - k in seen:\n            count += seen[pref_sum - k]\n        seen[pref_sum] = seen.get(pref_sum, 0) + 1\n    return count`,
    options: [
      "seen must be initialized with {0: 1} to account for prefix sums exactly equal to k",
      "count should start at 1",
      "pref_sum - k should be pref_sum + k",
      "seen[pref_sum] should be incremented before checking"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing base prefix sum. WHY: If `pref_sum == k`, `pref_sum - k == 0`. Without `{0: 1}`, subarrays starting at index 0 are missed. HOW: Initialize `seen = {0: 1}`.",
    basePoints: 200,
    tags: ["python", "hashmap", "prefix_sum"]
  },
  {
    id: "obo-30",
    mode: "off_by_one",
    language: "Java",
    difficulty: 10,
    title: "Segment Tree Tree Array Sizing",
    description: "Segment tree array allocated with 2 * N elements throws ArrayIndexOutOfBoundsException on queries.",
    code: `class SegmentTree {\n    int[] tree;\n    public SegmentTree(int n) {\n        tree = new int[2 * n]; // Bug: insufficient for full binary tree\n    }\n}`,
    options: [
      "tree array must be sized 4 * n for a complete binary tree over n elements",
      "tree array must be sized n + 1",
      "tree array must be sized n * n",
      "tree array must be initialized as ArrayList"
    ],
    correctOption: 0,
    explanation: "WHAT: Segment tree buffer underallocation. WHY: For an array of size $N$, a segment tree stored in an array representation requires up to $4N$ nodes to handle non-power-of-2 leaf layers without overflow. HOW: Allocate `new int[4 * n]`.",
    basePoints: 200,
    tags: ["java", "segment_tree", "data_structures"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OFF_BY_ONE_BANK };
}
