/**
 * Code Debugger - Mode 8: Infinite Loop (30 Challenges)
 * Missing increments, broken termination conditions, cyclic graphs, floating point loops across Python, C++, Java, JS.
 */

const INFINITE_LOOP_BANK = [
  {
    id: "loop-01",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 2,
    title: "Missing Loop Counter Increment",
    description: "The while loop runs forever, freezing the browser tab.",
    code: `let count = 0;\nwhile (count < 5) {\n  console.log("Count:", count);\n  // Bug: missing step\n}`,
    options: [
      "Change while condition boundary from count < 5 to count <= 5",
      "Add count++ step increment inside the while loop body",
      "Initialize counter variable with let count = 5 before looping",
      "Wrap the synchronous while loop block inside a single setTimeout"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing loop advancement. WHY: `count` is initialized to 0 and never changes, so `count < 5` remains true perpetually. HOW: Add `count++` inside the loop body.",
    basePoints: 85,
    tags: ["javascript", "while_loop", "counter"]
  },
  {
    id: "loop-02",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 2,
    title: "Decreasing in Positive Increment Loop",
    description: "The loop variable is decremented instead of incremented, never reaching the limit.",
    code: `i = 0\nwhile i < 10:\n    print(i)\n    i -= 1 # Bug`,
    options: [
      "Invert comparison check from while i < 10 to while i > 10",
      "Change loop step increment from i -= 1 to i += 1",
      "Initialize starting variable with i = 10 instead of zero",
      "Replace keyword while with single-pass if condition check"
    ],
    correctOption: 1,
    explanation: "WHAT: Wrong direction step. WHY: Decreasing `i` makes it negative (-1, -2, ...), meaning `i < 10` is always true. HOW: Change `i -= 1` to `i += 1`.",
    basePoints: 85,
    tags: ["python", "while_loop", "logic"]
  },
  {
    id: "loop-03",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 3,
    title: "Unsigned Integer Underflow in Downward Loop",
    description: "The loop never stops when counting down to 0 with unsigned int.",
    code: `for (unsigned int i = 5; i >= 0; i--) {\n    std::cout << i << std::endl;\n}`,
    options: [
      "Switch prefix decrement --i instead of postfix decrement i--",
      "Initialize unsigned loop variable starting from value 10",
      "Unsigned integers underflow below 0 to 4294967295; use signed int or i > 0",
      "Cast loop variable i to double inside the loop body before decrementing"
    ],
    correctOption: 2,
    explanation: "WHAT: Unsigned integer underflow. WHY: `unsigned int` is always non-negative. Decrementing 0 wraps to $2^{32}-1$, which is still $\\ge 0$. HOW: Use signed `int` or condition `i > 0`.",
    basePoints: 95,
    tags: ["cpp", "unsigned", "underflow"]
  },
  {
    id: "loop-04",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 3,
    title: "Floating Point Exact Equality in Loop Condition",
    description: "The loop intended to count by 0.1 never terminates due to precision errors.",
    code: `for (double d = 0.0; d != 1.0; d += 0.1) {\n    System.out.println(d);\n}`,
    options: [
      "Change loop step increment from d += 0.1 to large step d += 1.0",
      "Replace double type with single-precision float for loop index",
      "Start loop counter with d = 0.1 instead of default double 0.0",
      "Use inequality d < 1.0 or integer loop because binary floats miss exact 1.0"
    ],
    correctOption: 3,
    explanation: "WHAT: Floating point accumulation error. WHY: `0.1 + 0.1...` equals `0.9999999999999999` and steps to `1.0999999999999999`, skipping `1.0` exactly. HOW: Use `d < 1.0` or an integer counter `i / 10.0`.",
    basePoints: 95,
    tags: ["java", "floating_point", "precision"]
  },
  {
    id: "loop-05",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 3,
    title: "Modifying List While Iterating Over It",
    description: "Appending items to a list while iterating causes an unbounded loop.",
    code: `nums = [1, 2, 3]\nfor n in nums:\n    if n < 10:\n        nums.append(n + 1)`,
    options: [
      "Iterate over a copy using for n in nums[:] to avoid mutating the active sequence",
      "Change list appending to prepend via nums.insert(0, n + 1) at each step",
      "Convert the for-in iterator into an unbounded while loop index construct",
      "Modify condition check from n < 10 to inclusive boundary n <= 10"
    ],
    correctOption: 0,
    explanation: "WHAT: In-flight list mutation. WHY: Appending to `nums` keeps extending the sequence being iterated over. HOW: Iterate over a snapshot/copy `nums[:]`.",
    basePoints: 95,
    tags: ["python", "mutation", "iteration"]
  },
  {
    id: "loop-06",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 4,
    title: "Accidental Global Variable Reassignment in Nested Loop",
    description: "Outer loop runs infinitely because inner loop resets variable 'i'.",
    code: `for (i = 0; i < 3; i++) {\n  for (i = 0; i < 3; i++) {\n    console.log(i);\n  }\n}`,
    options: [
      "Change outer loop increment from i++ to double-step increment i += 2",
      "Declare distinct block-scoped loop counters: for (let i...) and for (let j...)",
      "Declare both loop variables using const i to prevent inner reassignment",
      "Remove outer loop and execute inner loop twice sequentially in code"
    ],
    correctOption: 1,
    explanation: "WHAT: Shared global variable collision. WHY: Without `let` or `var`, `i` is a global variable. The inner loop resets `i = 0` every time, trapping the outer loop. HOW: Use `let i` and `let j`.",
    basePoints: 110,
    tags: ["javascript", "scope", "globals"]
  },
  {
    id: "loop-07",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 4,
    title: "Linked List Node Pointer Cycle",
    description: "Traversal hangs forever because tail points back to head.",
    code: `struct Node { int val; Node* next; };\nvoid printList(Node* head) {\n    Node* curr = head;\n    while (curr != nullptr) {\n        std::cout << curr->val << " ";\n        curr = curr->next;\n    }\n}`,
    options: [
      "Invert loop condition check from curr != nullptr to curr == nullptr",
      "Assign curr->next = curr inside the traversal body to break cycle",
      "Track visited nodes with std::unordered_set or apply Floyd's cycle detection",
      "Call delete curr immediately after printing each node's integer value"
    ],
    correctOption: 2,
    explanation: "WHAT: Cycle in pointer traversal. WHY: A circular reference prevents `curr` from ever reaching `nullptr`. HOW: Use a visited set or cycle detection.",
    basePoints: 110,
    tags: ["cpp", "linked_list", "pointers"]
  },
  {
    id: "loop-08",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 4,
    title: "Iterator Modification vs Iterator.remove",
    description: "Calling list.remove() inside while (iterator.hasNext()) loop causes loop desync / exception.",
    code: `Iterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    String s = it.next();\n    if (s.isEmpty()) {\n        list.remove(s); // Bug\n    }\n}`,
    options: [
      "Invoke it.remove() instead of mutating the underlying list directly",
      "Call list.clear() whenever an empty string element is detected",
      "Omit it.hasNext() check and rely on NoSuchElementException",
      "Convert iterator loop to an indexed for loop without decreasing index"
    ],
    correctOption: 0,
    explanation: "WHAT: ConcurrentModificationException and corrupted iterator cursor. WHY: Modifying the underlying collection directly invalidates the iterator. HOW: Call `it.remove()`.",
    basePoints: 110,
    tags: ["java", "iterator", "collections"]
  },
  {
    id: "loop-09",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 5,
    title: "Binary Search Search Space Never Shrinking",
    description: "When target is not found, low and high never converge.",
    code: `def search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid # Bug: should be mid + 1\n        else:\n            high = mid - 1\n    return -1`,
    options: [
      "Update high pointer assignment to high = mid instead of high = mid - 1",
      "Change binary search condition from low <= high to low < high",
      "Advance the lower bound: update low = mid + 1 to guarantee convergence",
      "Replace floor division (low + high) // 2 with float division / 2"
    ],
    correctOption: 2,
    explanation: "WHAT: Stagnant search range. WHY: When `low + 1 == high`, integer division yields `mid == low`. Setting `low = mid` repeats the identical state indefinitely. HOW: `low = mid + 1`.",
    basePoints: 125,
    tags: ["python", "binary_search", "convergence"]
  },
  {
    id: "loop-10",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 5,
    title: "Generator next() without Termination Check",
    description: "Consumer loop over custom generator runs infinitely.",
    code: `function* countGen() {\n  let i = 0;\n  while (true) yield i++;\n}\nconst gen = countGen();\nlet item = gen.next();\nwhile (!item.done) {\n  console.log(item.value);\n  // Bug: unbounded generator never finishes\n}`,
    options: [
      "Generator yields infinitely; add a break threshold or boundary inside consumer",
      "Replace yield statement yield i++ with explicit return i++ inside generator",
      "Call gen.close() method synchronously inside the while loop body",
      "Change loop condition check from !item.done to item.done === false"
    ],
    correctOption: 0,
    explanation: "WHAT: Infinite generator consumption. WHY: `countGen` yields forever (`while (true)`), so `item.done` is never true. HOW: Add a termination condition or break condition.",
    basePoints: 125,
    tags: ["javascript", "generator", "yield"]
  },
  {
    id: "loop-11",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 5,
    title: "Input Stream Failure State Loop",
    description: "When invalid input is entered, std::cin loop spins indefinitely.",
    code: `int val;\nwhile (std::cin >> val) {\n    // If user enters 'abc', cin enters fail state and loop hangs if not cleared\n}`,
    options: [
      "Replace stream extraction with single character read val = std::cin.get()",
      "Call cin.clear() and cin.ignore() when handling stream failure states",
      "Change variable type from int val to single unsigned char val",
      "Invoke standard C runtime fflush(stdin) after every extraction attempt"
    ],
    correctOption: 1,
    explanation: "WHAT: Uncleared stream error state. WHY: Failed input extraction sets the error state on `cin`. Subsequent reads fail immediately without extracting characters unless cleared. HOW: Use `cin.clear(); cin.ignore(10000, '\\n');`.",
    basePoints: 125,
    tags: ["cpp", "cin", "streams"]
  },
  {
    id: "loop-12",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 5,
    title: "Regex Non-Consuming Match Zero-Width Loop",
    description: "Matcher finds empty match repeatedly without advancing position.",
    code: `Pattern p = Pattern.compile("a*");\nMatcher m = p.matcher("bb");\nwhile (m.find()) {\n    System.out.println("Match at " + m.start()); // Hangs\n}`,
    options: [
      "Compile regular expression pattern using Pattern.DOTALL compilation flag",
      "Switch matcher invocation from Matcher.find() to Matcher.matches()",
      "Pattern a* matches zero characters repeatedly; use a+ or verify match length > 0",
      "Replace regular expression matcher loop with String.indexOf lookup"
    ],
    correctOption: 2,
    explanation: "WHAT: Zero-width regex match cycling. WHY: `a*` matches 0 characters at index 0, then 1, etc., if cursor advancement is mishandled. HOW: Use `a+` or verify match length `> 0`.",
    basePoints: 125,
    tags: ["java", "regex", "matcher"]
  },
  {
    id: "loop-13",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 6,
    title: "Recursive Tree Traversal Missing Visited Set on Graph",
    description: "DFS on a general graph with cycles causes RecursionError / infinite traversal.",
    code: `def dfs(graph, node):\n    print(node)\n    for neighbor in graph[node]:\n        dfs(graph, neighbor) # Bug: no visited check`,
    options: [
      "Maintain and check visited set: if neighbor not in visited: visited.add(n)",
      "Increase maximum recursion limit with sys.setrecursionlimit(100000)",
      "Sort dictionary keys before iterating over neighbor connection lists",
      "Convert the adjacency graph dictionary into an immutable flat list"
    ],
    correctOption: 0,
    explanation: "WHAT: Graph cycle recursion loop. WHY: A cyclic graph revisits already processed nodes continuously. HOW: Maintain a `visited = set()` and check before recursive descent.",
    basePoints: 140,
    tags: ["python", "graph", "dfs", "cycles"]
  },
  {
    id: "loop-14",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 6,
    title: "Event Loop Starvation by Synchronous Busy Wait",
    description: "Synchronous while loop blocking the single thread forever.",
    code: `function waitFiveSeconds() {\n  const target = Date.now() + 5000;\n  while (Date.now() < target) {\n    // Busy spin\n  }\n}`,
    options: [
      "Add console.log statements inside while loop body to yield execution",
      "Synchronous spin blocks the thread; use await new Promise(r => setTimeout(r, 5000))",
      "Change while condition comparison from Date.now() < target to <= target",
      "Execute the synchronous spin inside a DOM event listener callback"
    ],
    correctOption: 1,
    explanation: "WHAT: Synchronous main thread blocking. WHY: JavaScript is single-threaded; busy-spinning monopolizes CPU and blocks all UI rendering and asynchronous event handlers. HOW: Use `await new Promise(r => setTimeout(r, ms))`.",
    basePoints: 140,
    tags: ["javascript", "event_loop", "async"]
  },
  {
    id: "loop-15",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 6,
    title: "Bitwise Shift Loop Termination on 0",
    description: "Mask shift condition fails to terminate on signed integer sign extension.",
    code: `int mask = -1;\nwhile (mask != 0) {\n    mask >>= 1; // Arithmetic right shift sign-extends 1s forever\n}`,
    options: [
      "Invert right shift assignment into a left shift operator mask <<= 1",
      "Change while condition comparison check from mask != 0 to mask > 0",
      "Signed int right shift sign-extends 1s forever; use unsigned int for mask",
      "Bitwise mask using mask & 1 inside loop condition check expression"
    ],
    correctOption: 2,
    explanation: "WHAT: Sign extension in arithmetic right shift. WHY: In signed integers, shifting -1 right copies the sign bit (1), so `-1 >> 1` remains -1 forever. HOW: Use `unsigned int` for logical bit shifting.",
    basePoints: 140,
    tags: ["cpp", "bitwise", "shift"]
  },
  {
    id: "loop-16",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 6,
    title: "Socket Read EOF Detection Loop",
    description: "Server loop reading from socket never terminates when client disconnects.",
    code: `InputStream in = socket.getInputStream();\nint b;\nwhile ((b = in.read()) != 0) { // Bug: EOF returns -1, not 0\n    process(b);\n}`,
    options: [
      "InputStream.read() returns -1 on EOF; check condition (b = in.read()) != -1",
      "InputStream.read() returns null on EOF when reading byte socket streams",
      "Replace stream reader with BufferedReader.readLine() text processing",
      "Wrap socket reading operation inside a dedicated SocketException catch"
    ],
    correctOption: 0,
    explanation: "WHAT: Incorrect EOF sentinel check. WHY: `InputStream.read()` returns -1 when the stream reaches EOF. Testing `!= 0` continues looping endlessly when client closes connection. HOW: Test `(b = in.read()) != -1`.",
    basePoints: 140,
    tags: ["java", "io", "sockets", "eof"]
  },
  {
    id: "loop-17",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 7,
    title: "Queue Consumer Missing task_done / sentinel",
    description: "Worker thread waiting on queue.join() blocks forever.",
    code: `import queue\nq = queue.Queue()\nq.put("task")\n# Worker processes task but never calls q.task_done()\nq.join() # Hangs forever`,
    options: [
      "Replace standard queue with multiprocessing.Queue for process IPC",
      "Pass an explicit timeout integer parameter to queue join: q.join(5)",
      "Worker must invoke q.task_done() after processing each queued item",
      "Call q.task_done() immediately prior to inserting item via q.put()"
    ],
    correctOption: 2,
    explanation: "WHAT: Unsignaled task completion. WHY: `q.join()` blocks until every item added via `put()` has a matching `task_done()` call. HOW: Call `q.task_done()` in worker.",
    basePoints: 160,
    tags: ["python", "threads", "queue"]
  },
  {
    id: "loop-18",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 7,
    title: "React useEffect Missing Dependency Array Infinite Re-render",
    description: "Component triggers state update inside useEffect without dependencies, looping infinitely.",
    code: `useEffect(() => {\n  fetchData().then(data => setData(data));\n}); // Bug: missing dependency array []`,
    options: [
      "Provide dependency array: useEffect(..., []) to prevent re-running on render",
      "Mutate state variable directly using data = data instead of setData",
      "Remove fetchData() asynchronous promise invocation from component",
      "Replace useEffect hook with useMemo hook returning fetched data promise"
    ],
    correctOption: 0,
    explanation: "WHAT: Uncontrolled useEffect trigger. WHY: Without a dependency array, `useEffect` runs on EVERY render. `setData` triggers a re-render, creating an infinite render loop. HOW: Pass `[]` (or specific dependencies).",
    basePoints: 160,
    tags: ["javascript", "react", "hooks"]
  },
  {
    id: "loop-19",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 7,
    title: "Iterator Invalidation in std::vector Erase Loop",
    description: "Erasing from std::vector inside loop invalidates iterator causing infinite/invalid traversal.",
    code: `for (auto it = vec.begin(); it != vec.end(); ++it) {\n    if (*it == 0) {\n        vec.erase(it); // Bug: invalidates 'it'\n    }\n}`,
    options: [
      "Apply prefix decrement --it on iterator immediately before erasing",
      "Assign returned iterator: it = vec.erase(it) or use std::erase_if",
      "Convert iterator variable auto it to primitive integer index counter",
      "Call vec.clear() prior to iterating over elements in the vector"
    ],
    correctOption: 1,
    explanation: "WHAT: Stale iterator traversal. WHY: `vec.erase(it)` invalidates `it` and all subsequent iterators. Incrementing `++it` afterwards yields undefined behavior or infinite loop. HOW: Use `it = vec.erase(it)` or `std::erase_if`.",
    basePoints: 160,
    tags: ["cpp", "vector", "iterators"]
  },
  {
    id: "loop-20",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 7,
    title: "Spinlock without volatile or memory barrier",
    description: "Thread polling a boolean flag never sees the updated value due to compiler caching / visibility.",
    code: `class Worker {\n    private boolean running = true; // Bug: not volatile\n    public void run() {\n        while (running) {\n            // do work\n        }\n    }\n    public void stop() { running = false; }\n}`,
    options: [
      "Change boolean primitive to boxed Boolean object wrapper type",
      "Declare stop() method static to share method across ClassLoader",
      "Declare field volatile: private volatile boolean running = true;",
      "Add synchronized modifier exclusively to stop() method declaration"
    ],
    correctOption: 2,
    explanation: "WHAT: JMM visibility / CPU cache staleness. WHY: Without `volatile`, the JIT compiler can optimize `while(running)` into `while(true)` since it sees no writes in the thread. HOW: Mark field `volatile` or use `AtomicBoolean`.",
    basePoints: 160,
    tags: ["java", "concurrency", "volatile"]
  },
  {
    id: "loop-21",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 8,
    title: "Two Pointers Trap on Duplicate Values",
    description: "Two pointers while loop fails to advance when array has duplicate elements.",
    code: `while left < right:\n    if nums[left] + nums[right] == target:\n        results.append((nums[left], nums[right]))\n        # Bug: forgot to advance left and right after match\n    elif nums[left] + nums[right] < target:\n        left += 1\n    else:\n        right -= 1`,
    options: [
      "Insert break statement inside the equality branch to terminate search",
      "Advance pointers: add left += 1 and right -= 1 inside the match block",
      "Change loop condition check from while left < right to left <= right",
      "Sort nums array in-place after each successful equality match append"
    ],
    correctOption: 1,
    explanation: "WHAT: Stalled pointer advancement on equality. WHY: When a match is found, neither `left` nor `right` is modified, executing the equality branch forever. HOW: Increment `left += 1` and decrement `right -= 1`.",
    basePoints: 175,
    tags: ["python", "two_pointers", "loops"]
  },
  {
    id: "loop-22",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 8,
    title: "Promise Chain Returning Itself",
    description: "Promise resolution hangs forever because it resolves with itself.",
    code: `const p = new Promise(resolve => {\n  setTimeout(() => resolve(p), 100); // TypeError / Unresolved\n});`,
    options: [
      "Resolve with concrete data; resolving a promise with itself causes a cycle",
      "Invoke Promise.reject(p) instead of resolving to trigger error handler",
      "Remove setTimeout and resolve promise synchronously inside constructor",
      "Wrap promise initialization block inside an async immediately-invoked function"
    ],
    correctOption: 0,
    explanation: "WHAT: Circular promise resolution. WHY: The Promises/A+ spec specifies that resolving a promise with itself must throw a `TypeError: Chaining cycle detected` or hang resolution. HOW: Resolve with concrete value.",
    basePoints: 175,
    tags: ["javascript", "promises", "async"]
  },
  {
    id: "loop-23",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 8,
    title: "Custom Allocator Free List Cycle",
    description: "Freeing an already freed memory chunk creates a cycle in the free-list pointer chain.",
    code: `void deallocate(Block* b) {\n    b->next = freeList;\n    freeList = b;\n}\n// Double free on block X causes: X->next = X, creating infinite allocation loop!`,
    options: [
      "Double free creates free list cycle; guard against double-free with flags",
      "Migrate freeList internal storage representation to std::stack<Block*>",
      "Invert node pointer assignment from b->next to b->prev in deallocate",
      "Clear entire freeList pointer pool on every single deallocate invocation"
    ],
    correctOption: 0,
    explanation: "WHAT: Free list cyclic corruption via double-free. WHY: Re-inserting an already present pointer `b` makes `b->next = b`, trapping allocator traversals in an infinite loop. HOW: Prevent double-frees with ownership or state flags.",
    basePoints: 175,
    tags: ["cpp", "memory", "allocator"]
  },
  {
    id: "loop-24",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 8,
    title: "ReentrantLock Deadlock / Missing Unlock in Finally",
    description: "An uncaught exception skips lock.unlock(), causing all future threads to block forever.",
    code: `lock.lock();\ndoRiskyOperation(); // throws Exception!\nlock.unlock(); // Never reached`,
    options: [
      "Catch all checked exceptions inside doRiskyOperation without unlocking",
      "Always release lock in finally block: try { doRisky(); } finally { lock.unlock(); }",
      "Replace lock() with non-blocking lock.tryLock() without condition checks",
      "Replace ReentrantLock with single AtomicInteger primitive flag counter"
    ],
    correctOption: 1,
    explanation: "WHAT: Lock abandonment. WHY: If an exception is thrown before `unlock()`, the lock remains held, permanently blocking subsequent acquirers. HOW: Standard pattern: `try { ... } finally { lock.unlock(); }`.",
    basePoints: 175,
    tags: ["java", "locks", "deadlock"]
  },
  {
    id: "loop-25",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 9,
    title: "Dijkstra Algorithm without Dist Check on Priority Queue",
    description: "Dijkstra on graph with non-decreasing relaxation processes outdated entries in infinite loop or O(V^2).",
    code: `while pq:\n    d, u = heapq.heappop(pq)\n    # Bug: missing 'if d > dist[u]: continue'\n    for v, weight in graph[u]:\n        if dist[u] + weight < dist[v]:\n            dist[v] = dist[u] + weight\n            heapq.heappush(pq, (dist[v], v))`,
    options: [
      "Replace min-heap pop heapq.heappop with max-heap extractor heapq.nlargest",
      "Skip stale priority queue entries: add if d > dist[u]: continue",
      "Initialize distance dictionary entries with zero instead of float('inf')",
      "Clear entire priority queue pq after each successful edge relaxation step"
    ],
    correctOption: 1,
    explanation: "WHAT: Stale heap entry processing. WHY: When multiple shorter paths to `u` are pushed, older, longer paths remain in the heap. Skipping them with `if d > dist[u]: continue` avoids duplicate expansions. HOW: Add stale node pruning check.",
    basePoints: 190,
    tags: ["python", "dijkstra", "graphs", "heap"]
  },
  {
    id: "loop-26",
    mode: "infinite_loop",
    language: "JavaScript",
    difficulty: 9,
    title: "Microtask Queue Starvation Loop",
    description: "Queueing recursive microtasks starves macrotasks and animation frames.",
    code: `function runLoop() {\n  Promise.resolve().then(runLoop);\n}\nrunLoop();`,
    options: [
      "Convert Promise.resolve() to new Promise((resolve) => resolve())",
      "Add await keyword inside runLoop without altering promise scheduling",
      "Microtasks drain fully before rendering; use setTimeout(runLoop, 0)",
      "Wrap runLoop body inside a synchronous try/catch block statement"
    ],
    correctOption: 2,
    explanation: "WHAT: Microtask recursion starvation. WHY: The JS engine empties the entire microtask queue before rendering or handling timer events. An infinite chain of microtasks starves all other work. HOW: Use `setTimeout(runLoop, 0)`.",
    basePoints: 190,
    tags: ["javascript", "event_loop", "microtasks"]
  },
  {
    id: "loop-27",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 9,
    title: "Cyclic std::shared_ptr Reference Loop",
    description: "Two objects holding shared_ptr to each other cause destructor leak / destructor deadlock.",
    code: `struct B;\nstruct A { std::shared_ptr<B> b; };\nstruct B { std::shared_ptr<A> a; }; // Cycle!`,
    options: [
      "Break reference cycle using std::weak_ptr in struct B: std::weak_ptr<A> a;",
      "Replace both smart pointers with raw unmanaged pointers without delete",
      "Call delete this manually inside the destructor body of both structs",
      "Migrate shared ownership on both sides to non-copyable std::unique_ptr"
    ],
    correctOption: 0,
    explanation: "WHAT: Shared pointer reference cycle. WHY: Reference count never drops to 0 because each struct holds an owning reference to the other. HOW: Use `std::weak_ptr` for non-owning back-references.",
    basePoints: 190,
    tags: ["cpp", "smart_pointers", "cycles"]
  },
  {
    id: "loop-28",
    mode: "infinite_loop",
    language: "Java",
    difficulty: 10,
    title: "ForkJoinPool Fork / Join Imbalance Deadlock",
    description: "Subtasks calling join() in recursive order exhaust thread pool worker threads.",
    code: `class FibTask extends RecursiveTask<Integer> {\n    int n;\n    FibTask(int n) { this.n = n; }\n    protected Integer compute() {\n        if (n <= 1) return n;\n        FibTask f1 = new FibTask(n - 1);\n        FibTask f2 = new FibTask(n - 2);\n        f1.fork();\n        return f1.join() + f2.compute(); // Suboptimal join order\n    }\n}`,
    options: [
      "Replace method invocation f1.fork() with synchronous f1.compute() call",
      "Replace RecursiveTask abstraction with standard java.lang.Thread instances",
      "Compute f2 in current thread before f1.join() or fork both properly: f2.compute() + f1.join()",
      "Increase worker thread pool size configuration to Integer.MAX_VALUE"
    ],
    correctOption: 2,
    explanation: "WHAT: ForkJoinPool worker blocking. WHY: Calling `f1.join()` before executing `f2` stalls the worker thread waiting for work it could perform directly. HOW: Fork task 1, compute task 2, then join task 1.",
    basePoints: 200,
    tags: ["java", "forkjoin", "concurrency"]
  },
  {
    id: "loop-29",
    mode: "infinite_loop",
    language: "Python",
    difficulty: 10,
    title: "Tarjan's SCC Invariant Loop on Self-Loop",
    description: "Tarjan algorithm enters infinite stack unwinding on uninitialized low-link value.",
    code: `def strongconnect(v):\n    indices[v] = lowlink[v] = index[0]\n    index[0] += 1\n    stack.append(v)\n    on_stack.add(v)\n    for w in graph[v]:\n        if w not in indices:\n            strongconnect(w)\n            lowlink[v] = min(lowlink[v], lowlink[w])\n        elif w in on_stack:\n            lowlink[v] = min(lowlink[v], indices[w]) # Correct invariant\n    # If missing 'if lowlink[v] == indices[v]:' root check, stack unwinds incorrectly`,
    options: [
      "Check root condition: if lowlink[v] == indices[v]: before popping SCC stack",
      "Update on_stack branch to use lowlink[v] = min(lowlink[v], lowlink[w])",
      "Replace indices dictionary tracking structure with a flat static array",
      "Convert stack container from standard list to collections.deque queue"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing SCC root check. WHY: Components must only be popped when the root of the strongly connected component is identified (`lowlink[v] == indices[v]`). HOW: Guard stack popping with root check.",
    basePoints: 200,
    tags: ["python", "tarjan", "graphs", "scc"]
  },
  {
    id: "loop-30",
    mode: "infinite_loop",
    language: "C++",
    difficulty: 10,
    title: "Atomic Compare-Exchange Spinlock ABA Starvation",
    description: "CAS loop in lock-free queue spins infinitely due to unversioned ABA value substitution.",
    code: `Node* oldHead = head.load();\nwhile (!head.compare_exchange_weak(oldHead, oldHead->next)) {\n    // In lock-free Treiber stack, if oldHead is freed and re-allocated at same address,\n    // ABA occurs without stamped/versioned pointer!\n}`,
    options: [
      "Replace compare_exchange_weak with compare_exchange_strong without versioning",
      "Insert sleep(1) delay statement inside compare-exchange spin loop body",
      "Use tagged/versioned pointers or atomic smart pointers to resolve ABA",
      "Convert atomic variable head into an unmanaged raw pointer variable"
    ],
    correctOption: 2,
    explanation: "WHAT: Lock-free ABA problem. WHY: If memory is recycled, a node can appear unchanged in address despite state modifications, corrupting pointer chains. HOW: Use version counters (hazard pointers, tagged pointers, or epoch-based reclamation).",
    basePoints: 200,
    tags: ["cpp", "lockfree", "atomic", "aba"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INFINITE_LOOP_BANK };
}
