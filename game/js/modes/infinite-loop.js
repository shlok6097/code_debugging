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
      "Add count++ inside the loop body",
      "Change count < 5 to count <= 5",
      "Use let count = 5 instead of 0",
      "Wrap the while loop in a setTimeout"
    ],
    correctOption: 0,
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
      "Change i -= 1 to i += 1",
      "Change i < 10 to i > 10",
      "Change i = 0 to i = 10",
      "Change while to if"
    ],
    correctOption: 0,
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
      "unsigned int cannot be negative; when 0 decrements it wraps to 4294967295 (always >= 0)",
      "Change i-- to --i",
      "Change i >= 0 to i > 0",
      "unsigned int must be initialized to 10"
    ],
    correctOption: 0,
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
      "d != 1.0 never matches exactly due to IEEE 754 float rounding; use d < 1.0 or integer loop",
      "Change d += 0.1 to d += 1.0",
      "Use float instead of double",
      "Change d = 0.0 to d = 0.1"
    ],
    correctOption: 0,
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
      "Iterate over a copy: for n in list(nums): or nums[:]",
      "Change nums.append to nums.insert(0, n + 1)",
      "Use a while loop instead of for",
      "Change n < 10 to n <= 10"
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
      "Declare loop variables with let: for (let i...) and for (let j...)",
      "Change i++ to i += 2",
      "Use const i in both loops",
      "Remove the outer loop"
    ],
    correctOption: 0,
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
      "If the linked list contains a cycle, add visited tracking or Floyd's cycle detection",
      "Change curr != nullptr to curr == nullptr",
      "Change curr = curr->next to curr->next = curr",
      "Delete curr after each print"
    ],
    correctOption: 0,
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
      "Use it.remove() instead of list.remove(s)",
      "Use list.clear()",
      "Remove it.hasNext()",
      "Use a standard for loop with index decrement"
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
      "low = mid should be low = mid + 1",
      "high = mid - 1 should be high = mid",
      "low <= high should be low < high",
      "mid = (low + high) // 2 should be mid = (low + high) / 2"
    ],
    correctOption: 0,
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
      "Generator has no upper bound; break when item.value reaches a threshold or bound generator",
      "Change yield i++ to return i++",
      "Call gen.close()",
      "Use item.done === false"
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
      "cin >> val stops, but if inside a persistent retry loop, you must call cin.clear() and cin.ignore()",
      "cin >> val should be val = cin.get()",
      "Change int val to char val",
      "Add fflush(stdin)"
    ],
    correctOption: 0,
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
      "a* matches 0 characters at every position; find() without boundary check or non-empty pattern matches endlessly",
      "Pattern must be compiled with Pattern.DOTALL",
      "Matcher.find() should be Matcher.matches()",
      "Use String.indexOf instead"
    ],
    correctOption: 0,
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
      "Pass and update a visited set: if neighbor not in visited: visited.add(neighbor)",
      "Limit recursion with sys.setrecursionlimit",
      "Sort graph keys first",
      "Convert graph to a list"
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
      "Synchronous spin locks JS event loop completely; replace with setTimeout or await new Promise(r => setTimeout(r, 5000))",
      "Add console.log inside the while loop",
      "Use Date.now() <= target",
      "Run the while loop in a web worker"
    ],
    correctOption: 0,
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
      "mask is signed, so >> performs arithmetic shift preserving sign bit (-1 stays -1); use unsigned int",
      "Change mask >>= 1 to mask <<= 1",
      "Change mask != 0 to mask > 0",
      "Use mask & 1"
    ],
    correctOption: 0,
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
      "in.read() returns -1 on end of stream (EOF), not 0",
      "in.read() returns null on EOF",
      "Use BufferedReader.readLine() instead",
      "Wrap inside a try-catch for SocketException"
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
      "Worker must invoke q.task_done() after processing each queued item",
      "Use multiprocessing.Queue instead",
      "q.join() must be passed a timeout",
      "Call q.task_done() before q.put()"
    ],
    correctOption: 0,
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
      "Add empty dependency array: useEffect(..., [])",
      "Change setData to data = data",
      "Remove fetchData()",
      "Use useMemo instead of useEffect"
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
      "Assign returned iterator: it = vec.erase(it); or use std::erase_if",
      "Use --it before erase",
      "Change auto it to int i",
      "Call vec.clear() first"
    ],
    correctOption: 0,
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
      "Declare running as private volatile boolean running = true;",
      "Change boolean to Boolean",
      "Make stop() method static",
      "Add synchronized to stop() only"
    ],
    correctOption: 0,
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
      "Add left += 1 and right -= 1 after adding to results",
      "Add break inside the match block",
      "Change left < right to left <= right",
      "Sort nums after each match"
    ],
    correctOption: 0,
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
      "A promise cannot resolve to itself (Chaining cycle detected); resolve with actual data",
      "Use Promise.reject instead",
      "Remove setTimeout",
      "Wrap p in an async function"
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
      "Double freeing creates a circular reference in the free list; track allocated blocks or set canary/null",
      "freeList must be a std::stack",
      "Change b->next to b->prev",
      "Free list must be cleared on every call"
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
      "Always place lock.unlock() in a finally block: try { doRiskyOperation(); } finally { lock.unlock(); }",
      "Catch all exceptions in doRiskyOperation",
      "Use lock.tryLock() without check",
      "Replace lock with AtomicInteger"
    ],
    correctOption: 0,
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
      "Add: if d > dist[u]: continue to skip stale priority queue entries",
      "Change heapq.heappop to heapq.nlargest",
      "Initialize dist with 0 instead of infinity",
      "Clear pq after each relaxation"
    ],
    correctOption: 0,
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
      "Microtasks drain completely before the event loop advances to rendering/macrotasks; use setTimeout(runLoop, 0) or requestAnimationFrame",
      "Change Promise.resolve() to new Promise()",
      "Add await inside runLoop",
      "Wrap inside try-catch"
    ],
    correctOption: 0,
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
      "Break the cycle by using std::weak_ptr in struct B: std::weak_ptr<A> a;",
      "Use raw pointers for both",
      "Call delete manually in destructor",
      "Use std::unique_ptr for both"
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
      "Call f2.fork() or compute f2 in current thread before calling f1.join() to prevent worker thread starvation",
      "f1.fork() should be f1.compute()",
      "RecursiveTask must be replaced with Thread",
      "Increase pool size to Integer.MAX_VALUE"
    ],
    correctOption: 0,
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
      "Must check if lowlink[v] == indices[v] before popping SCC components from stack",
      "lowlink[v] should be min(lowlink[v], lowlink[w]) in the on_stack branch",
      "indices should be an array instead of dict",
      "stack should be a deque"
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
      "Use tagged pointers (version counter) or std::atomic<std::shared_ptr> to resolve ABA problem",
      "Replace compare_exchange_weak with compare_exchange_strong without versioning",
      "Add sleep(1) inside loop",
      "Make head a raw pointer"
    ],
    correctOption: 0,
    explanation: "WHAT: Lock-free ABA problem. WHY: If memory is recycled, a node can appear unchanged in address despite state modifications, corrupting pointer chains. HOW: Use version counters (hazard pointers, tagged pointers, or epoch-based reclamation).",
    basePoints: 200,
    tags: ["cpp", "lockfree", "atomic", "aba"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INFINITE_LOOP_BANK };
}
