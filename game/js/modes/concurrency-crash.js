/**
 * Code Debugger - Mode 13: Concurrency Crash (30 Challenges)
 * Race conditions, deadlocks, atomic operations, async event loop, thread safety across Python, C++, Java, JS.
 */

const CONCURRENCY_CRASH_BANK = [
  {
    id: "conc-01",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 2,
    title: "Non-Atomic Counter Increment",
    description: "Two threads incrementing shared int count 1,000 times each produce a total of 1,642 instead of 2,000.",
    code: `class Counter {\n    int count = 0; // Not thread-safe\n    void increment() {\n        count++; // Read-modify-write is not atomic!\n    }\n}`,
    options: [
      "Use AtomicInteger or declare increment() synchronized",
      "Declare int count as final",
      "Change count++ to ++count",
      "Wrap increment() in a for loop"
    ],
    correctOption: 0,
    explanation: "WHAT: Read-modify-write race condition. WHY: `count++` consists of 3 distinct bytecode steps (read, add 1, write). Concurrent threads interleave and overwrite each other's updates. HOW: Use `AtomicInteger` or `synchronized`.",
    basePoints: 85,
    tags: ["java", "race_condition", "atomic", "threads"]
  },
  {
    id: "conc-02",
    mode: "concurrency_crash",
    language: "Python",
    difficulty: 2,
    title: "Shared Global State in Multithreaded Worker",
    description: "Multiple threads concurrently mutating a global list without a lock produce corrupted outputs.",
    code: `import threading\nresults = []\ndef worker(val):\n    # Non-atomic multi-step operation\n    results.append(val * 2)\n    # Context switch here causes order/state race`,
    options: [
      "Use threading.Lock() to synchronize shared resource access: with lock: ...",
      "Global variables are thread-safe in Python because of the GIL",
      "Change list to tuple",
      "Run worker without threads"
    ],
    correctOption: 0,
    explanation: "WHAT: Unsynchronized shared state race condition. WHY: Even with Python's GIL, threads can yield between bytecode instructions during multi-step logic. HOW: Guard shared data modifications with `threading.Lock()`.",
    basePoints: 85,
    tags: ["python", "threading", "lock", "gil"]
  },
  {
    id: "conc-03",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 3,
    title: "Async Race Condition in Shared State Mutation",
    description: "Two concurrent async functions read and update balance, causing balance underflow / lost update.",
    code: `let balance = 100;\nasync function withdraw(amount) {\n  if (balance >= amount) {\n    await fetch('/log-withdrawal'); // Yields to event loop!\n    balance -= amount;\n  }\n}`,
    options: [
      "Check and mutate balance synchronously or use a mutex/queue before awaiting async operations",
      "JavaScript is single-threaded so async functions cannot have race conditions",
      "Change balance to const",
      "Remove await from fetch"
    ],
    correctOption: 0,
    explanation: "WHAT: Async check-then-act race condition. WHY: While `await fetch` is suspended, another call to `withdraw` reads the old `balance`, passing the check twice. HOW: Deduct synchronously before `await` or serialize requests with a promise mutex.",
    basePoints: 95,
    tags: ["javascript", "async", "race_condition", "event_loop"]
  },
  {
    id: "conc-04",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 3,
    title: "Missing std::thread::join() or detach()",
    description: "Program terminates with std::terminate() upon function exit because thread destructor runs while thread is joinable.",
    code: `void runTask() {\n    std::thread t([]() { doWork(); });\n    // Bug: t goes out of scope without join() or detach()!\n}`,
    options: [
      "Call t.join(); (or t.detach() / use std::jthread in C++20)",
      "std::thread automatically joins upon destruction",
      "Make t a global pointer",
      "Wrap thread lambda in try/catch"
    ],
    correctOption: 0,
    explanation: "WHAT: `std::terminate()` on active joinable thread destruction. WHY: If a `std::thread` is destroyed while still joinable (neither `join()` nor `detach()` called), C++ standard specifies `std::terminate()` must be invoked. HOW: Call `t.join()` or use `std::jthread`.",
    basePoints: 95,
    tags: ["cpp", "threads", "join", "destructor"]
  },
  {
    id: "conc-05",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 4,
    title: "Deadlock from Inverted Lock Acquisition Order",
    description: "Thread 1 locks lockA then lockB; Thread 2 locks lockB then lockA simultaneously.",
    code: `// Thread 1:\nsynchronized(lockA) {\n    synchronized(lockB) { /* work */ }\n}\n// Thread 2:\nsynchronized(lockB) {\n    synchronized(lockA) { /* work */ }\n}`,
    options: [
      "Enforce strict consistent lock acquisition order: both threads must acquire lockA before lockB",
      "Increase thread priority for Thread 1",
      "Change synchronized to volatile",
      "Add Thread.sleep(100) inside lockA"
    ],
    correctOption: 0,
    explanation: "WHAT: Circular lock hierarchy deadlock (Coffman condition). WHY: Thread 1 holds lockA and waits for lockB; Thread 2 holds lockB and waits for lockA. HOW: Always acquire locks in the identical global order.",
    basePoints: 110,
    tags: ["java", "deadlock", "synchronized", "locking"]
  },
  {
    id: "conc-06",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 4,
    title: "Data Race on std::vector Concurrent push_back",
    description: "Multiple threads pushing back into the same std::vector cause memory corruption / crash.",
    code: `std::vector<int> vec;\nvoid addVal(int x) {\n    vec.push_back(x); // Not thread-safe!\n}`,
    options: [
      "Synchronize with std::mutex: std::lock_guard<std::mutex> lock(mtx); vec.push_back(x);",
      "std::vector is thread-safe by default in C++11",
      "Change push_back to emplace_back",
      "Allocate vector with reserve(1000) only"
    ],
    correctOption: 0,
    explanation: "WHAT: Concurrent write data race on STL container. WHY: `push_back` modifies internal size and reallocates memory buffer. Unsynchronized concurrent writes corrupt memory pointers. HOW: Protect with `std::mutex`.",
    basePoints: 110,
    tags: ["cpp", "vector", "mutex", "data_race"]
  },
  {
    id: "conc-07",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 4,
    title: "Promise.all Fail-Fast Rejection",
    description: "Promise.all rejects immediately if one promise fails, discarding completed results of other promises.",
    code: `const results = await Promise.all([task1(), task2(), task3()]); // If task2 rejects, entire batch fails!`,
    options: [
      "Use Promise.allSettled([task1(), task2(), task3()]) to inspect all outcomes regardless of failures",
      "Use Promise.race instead",
      "Wrap each task in while(true)",
      "Promise.all ignores rejected promises"
    ],
    correctOption: 0,
    explanation: "WHAT: Fail-fast behavior of `Promise.all`. WHY: If any promise rejects, `Promise.all` immediately rejects without waiting for others. HOW: Use `Promise.allSettled()` to gather all fulfilled and rejected statuses.",
    basePoints: 110,
    tags: ["javascript", "promises", "allSettled", "async"]
  },
  {
    id: "conc-08",
    mode: "concurrency_crash",
    language: "Python",
    difficulty: 5,
    title: "Double Checked Locking without Memory Barrier",
    description: "Lazy singleton initialization in Python multithreaded environment exposes partially constructed instance.",
    code: `class Singleton:\n    _instance = None\n    _lock = threading.Lock()\n    @classmethod\n    def get_instance(cls):\n        if cls._instance is None:\n            with cls._lock:\n                if cls._instance is None:\n                    cls._instance = cls() # Correct pattern in Python\n        return cls._instance`,
    options: [
      "In Python, the GIL guarantees reference assignment atomicity, so this Double-Checked Locking is safe",
      "cls._instance must be volatile",
      "Remove the outer if check",
      "Double-Checked Locking is never possible in Python"
    ],
    correctOption: 0,
    explanation: "WHAT: DCL validity in Python. WHY: Because Python's GIL and bytecode execution model make object reference assignment atomic, standard double-checked locking with `threading.Lock` is safe in CPython. HOW: Structure is valid.",
    basePoints: 125,
    tags: ["python", "singleton", "concurrency", "dcl"]
  },
  {
    id: "conc-09",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 5,
    title: "Double-Checked Locking Broken by Missing volatile",
    description: "In Java, double-checked locking singleton without volatile allows reading partially initialized object due to instruction reordering.",
    code: `public class Singleton {\n    private static Singleton instance; // Bug: missing volatile!\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) instance = new Singleton();\n            }\n        }\n        return instance;\n    }\n}`,
    options: [
      "Declare instance as: private static volatile Singleton instance;",
      "Change synchronized (Singleton.class) to synchronized (instance)",
      "Remove the inner if check",
      "Make Singleton abstract"
    ],
    correctOption: 0,
    explanation: "WHAT: Java Memory Model instruction reordering. WHY: Without `volatile`, the JVM compiler can reorder `new Singleton()` to write the reference before constructor finishes, exposing half-initialized state. HOW: Mark field `volatile`.",
    basePoints: 125,
    tags: ["java", "volatile", "singleton", "dcl", "jmm"]
  },
  {
    id: "conc-10",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 5,
    title: "std::condition_variable Spurious Wakeups",
    description: "Condition variable wait() in an 'if' block rather than a 'while' loop resumes on spurious wakeup.",
    code: `std::unique_lock<std::mutex> lock(mtx);\nif (!dataReady) { // Bug: if instead of while!\n    cv.wait(lock);\n}\nprocessData();`,
    options: [
      "Use while loop or predicate overload: cv.wait(lock, []{ return dataReady; });",
      "Change cv.wait(lock) to cv.notify_one()",
      "Spurious wakeups do not occur in POSIX threads",
      "Replace condition_variable with atomic_flag"
    ],
    correctOption: 0,
    explanation: "WHAT: Spurious wakeup vulnerability. WHY: OS thread schedulers can wake threads from condition variables without any explicit signal. An `if` statement proceeds blindly with unready state. HOW: `cv.wait(lock, []{ return dataReady; });`.",
    basePoints: 125,
    tags: ["cpp", "condition_variable", "concurrency", "spurious_wakeup"]
  },
  {
    id: "conc-11",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 6,
    title: "Promise Executor Async Function Unhandled Rejection",
    description: "Passing an async function to new Promise executor suppresses error throwing.",
    code: `new Promise(async (resolve, reject) => {\n  const data = await riskyOp(); // If this throws, Promise never rejects and hangs!\n  resolve(data);\n});`,
    options: [
      "Avoid async promise executors; write standard async functions or wrap await in try/catch calling reject(err)",
      "new Promise requires an async callback",
      "Change resolve to return",
      "Add await before new Promise"
    ],
    correctOption: 0,
    explanation: "WHAT: Async executor exception loss. WHY: The `new Promise` constructor only catches synchronous exceptions thrown by the executor. An async executor returns a rejected inner promise which is lost. HOW: Avoid `new Promise(async ...)`.",
    basePoints: 140,
    tags: ["javascript", "promises", "async", "error_handling"]
  },
  {
    id: "conc-12",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 6,
    title: "ConcurrentModificationException in for-each Loop",
    description: "Removing elements from a List while iterating using enhanced for-each loop throws exception.",
    code: `List<String> items = new ArrayList<>(Arrays.asList("A", "B", "C"));\nfor (String s : items) {\n    if (s.equals("B")) items.remove(s); // Throws ConcurrentModificationException!\n}`,
    options: [
      "Use items.removeIf(s -> s.equals(\"B\")) or use explicit Iterator.remove()",
      "Change ArrayList to LinkedList",
      "Iterate with items.stream().forEach()",
      "Make items synchronized"
    ],
    correctOption: 0,
    explanation: "WHAT: Fail-fast iterator modification detection. WHY: Enhanced `for` uses an internal iterator. Calling `items.remove()` alters `modCount`, causing `it.next()` to throw `ConcurrentModificationException`. HOW: Use `items.removeIf(...)`.",
    basePoints: 140,
    tags: ["java", "collections", "iterators", "concurrent_modification"]
  },
  {
    id: "conc-13",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 6,
    title: "Atomic Memory Order std::memory_order_relaxed Publishing",
    description: "Data written before atomic relaxed store is not visible to thread reading atomic relaxed load.",
    code: `// Thread 1:\ndata = 42;\nready.store(true, std::memory_order_relaxed); // Bug: relaxed doesn't guarantee prior writes are visible!\n// Thread 2:\nif (ready.load(std::memory_order_relaxed)) { assert(data == 42); /* Can fail! */ }`,
    options: [
      "Use release-acquire ordering: store with memory_order_release and load with memory_order_acquire (or seq_cst)",
      "memory_order_relaxed provides full sequential consistency",
      "Change atomic bool to atomic int",
      "Declare data as volatile"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing memory barrier synchronization. WHY: `memory_order_relaxed` guarantees atomicity of the variable itself, but permits CPU to reorder surrounding memory operations. HOW: Use `memory_order_release` / `acquire`.",
    basePoints: 140,
    tags: ["cpp", "atomic", "memory_order", "release_acquire"]
  },
  {
    id: "conc-14",
    mode: "concurrency_crash",
    language: "Python",
    difficulty: 6,
    title: "Multiprocessing Shared Memory Without Value / Array wrapper",
    description: "Child processes modify normal Python variable, but parent process never sees updates.",
    code: `import multiprocessing\ncount = 0\ndef worker():\n    global count\n    count += 1\np = multiprocessing.Process(target=worker)\np.start(); p.join()\nprint(count) # Still prints 0!`,
    options: [
      "Processes have independent isolated address spaces; use multiprocessing.Value, Queue, or Manager",
      "Use threading instead of multiprocessing",
      "global count automatically shares memory across OS processes",
      "Change target=worker to target=worker()"
    ],
    correctOption: 0,
    explanation: "WHAT: Separate process memory space isolation. WHY: `multiprocessing` forks or spawns independent OS processes with distinct memory spaces. Global variables are not shared. HOW: Use `multiprocessing.Value('i', 0)` or IPC queues.",
    basePoints: 140,
    tags: ["python", "multiprocessing", "shared_memory", "ipc"]
  },
  {
    id: "conc-15",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 7,
    title: "CountDownLatch vs CyclicBarrier Reuse",
    description: "Re-using a CountDownLatch in a loop fails because its count cannot be reset once it hits 0.",
    code: `CountDownLatch latch = new CountDownLatch(3);\nfor (int round = 0; round < 5; round++) {\n    // start threads with latch.countDown()...\n    latch.await();\n    // Bug: latch count is already 0, never waits in future rounds!\n}`,
    options: [
      "Use CyclicBarrier (which is reusable and resets automatically) or instantiate a new CountDownLatch per round",
      "Call latch.reset()",
      "CountDownLatch is reusable in Java 17+",
      "Change count to -1"
    ],
    correctOption: 0,
    explanation: "WHAT: Single-use synchronization primitive. WHY: `CountDownLatch` is designed for one-time countdown and has no reset method. Once zeroed, all subsequent `await()` calls return immediately. HOW: Use `CyclicBarrier`.",
    basePoints: 160,
    tags: ["java", "countdownlatch", "cyclicbarrier", "concurrency"]
  },
  {
    id: "conc-16",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 7,
    title: "Node.js cluster IPC Message Race Condition",
    description: "Worker processes send counter increments to primary via process.send(), dropping messages under high load.",
    code: `// Primary process:\ncluster.on('message', (worker, msg) => {\n  if (msg.cmd === 'INC') totalCount += msg.val;\n});`,
    options: [
      "Node cluster IPC messages are serialized asynchronously; atomic coordination across cluster requires Redis, shared memory (SharedArrayBuffer + Atomics), or database",
      "IPC messages are dropped if worker doesn't pause",
      "Change process.send to console.log",
      "cluster.on('message') is deprecated"
    ],
    correctOption: 0,
    explanation: "WHAT: Distributed counter state coordination. WHY: High-throughput IPC serialization in primary process introduces processing lag and bottlenecks. HOW: Use `SharedArrayBuffer` with `Atomics` or external atomic datastore (Redis).",
    basePoints: 160,
    tags: ["javascript", "nodejs", "cluster", "atomics"]
  },
  {
    id: "conc-17",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 7,
    title: "Lock Guard Lifetime Bug with Temporary Mutex Lock",
    description: "Creating an unnamed std::lock_guard temporary unlocks immediately at end of expression instead of block scope.",
    code: `void process() {\n    std::lock_guard<std::mutex>(mtx); // Bug: unnamed temporary destroyed immediately on this line!\n    criticalSectionOperation1();\n    criticalSectionOperation2();\n}`,
    options: [
      "Give the guard a variable name: std::lock_guard<std::mutex> lock(mtx);",
      "Change std::lock_guard to std::unique_lock",
      "mtx.lock() must be called first",
      "Wrap inside while loop"
    ],
    correctOption: 0,
    explanation: "WHAT: Unnamed RAII temporary premature destruction. WHY: `std::lock_guard<std::mutex>(mtx);` creates a temporary object that is destroyed and releases the mutex at the semicolon of that line, leaving subsequent lines completely unprotected! HOW: Name the instance: `std::lock_guard<std::mutex> lock(mtx);`.",
    basePoints: 160,
    tags: ["cpp", "mutex", "lock_guard", "raii", "pitfall"]
  },
  {
    id: "conc-18",
    mode: "concurrency_crash",
    language: "Python",
    difficulty: 7,
    title: "asyncio.create_task Garbage Collection Mid-Execution",
    description: "Background task created with asyncio.create_task disappears without completing.",
    code: `def start_worker():\n    asyncio.create_task(background_job()) # Bug: task reference not stored, collected by GC!`,
    options: [
      "Hold a strong reference to the task in a set/collection until it completes: background_tasks.add(task); task.add_done_callback(background_tasks.discard)",
      "asyncio tasks are permanently protected from GC",
      "Use time.sleep() instead",
      "Change background_job to synchronous function"
    ],
    correctOption: 0,
    explanation: "WHAT: Python asyncio task garbage collection. WHY: `asyncio.create_task()` creates only weak references internally in the event loop. If Python GC runs while task is suspended, the unreferenced Task object is garbage collected. HOW: Maintain a set of active task references.",
    basePoints: 160,
    tags: ["python", "asyncio", "tasks", "gc", "pitfall"]
  },
  {
    id: "conc-19",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 8,
    title: "Thread.interrupt() Ignored in Empty Catch Block",
    description: "Thread worker catches InterruptedException, does nothing, and continues looping, preventing graceful shutdown.",
    code: `while (!Thread.currentThread().isInterrupted()) {\n    try {\n        Thread.sleep(1000);\n    } catch (InterruptedException e) {\n        // Bug: swallowing exception clears interrupted status!\n    }\n}`,
    options: [
      "Restore interrupted flag: Thread.currentThread().interrupt(); or break from loop",
      "InterruptedException does not clear interrupted flag",
      "Use System.exit(0)",
      "Change sleep(1000) to wait(1000)"
    ],
    correctOption: 0,
    explanation: "WHAT: Swallowed thread interruption status. WHY: Catching `InterruptedException` clears the thread's interrupted flag. If swallowed without restoring `Thread.currentThread().interrupt()`, the `while` condition remains true and shutdown fails. HOW: Restore interrupt or exit loop.",
    basePoints: 175,
    tags: ["java", "threads", "interrupt", "concurrency"]
  },
  {
    id: "conc-20",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 8,
    title: "Atomics.wait / notify on Non-Shared Buffer",
    description: "Atomics.wait throws TypeError when called on a standard ArrayBuffer typed array.",
    code: `const buffer = new ArrayBuffer(16);\nconst int32 = new Int32Array(buffer);\nAtomics.wait(int32, 0, 0); // TypeError: int32 must be backed by a SharedArrayBuffer!`,
    options: [
      "Atomics operations require a SharedArrayBuffer: new SharedArrayBuffer(16)",
      "Atomics.wait can only run on Float64Array",
      "Atomics.wait is deprecated",
      "ArrayBuffer size must be at least 1024"
    ],
    correctOption: 0,
    explanation: "WHAT: SharedArrayBuffer requirement for Atomics. WHY: `Atomics.wait()` blocks the thread and coordinates memory across workers. The TypedArray must be backed by a `SharedArrayBuffer` (and only called on dedicated Web Workers). HOW: Use `new SharedArrayBuffer(16)`.",
    basePoints: 175,
    tags: ["javascript", "atomics", "sharedarraybuffer", "web_workers"]
  },
  {
    id: "conc-21",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 8,
    title: "std::shared_ptr Thread Safety Misconception",
    description: "Multiple threads concurrently writing to the SAME std::shared_ptr instance without synchronization.",
    code: `std::shared_ptr<Widget> globalWidget;\nvoid update() {\n    globalWidget = std::make_shared<Widget>(); // Data race if called concurrently!\n}`,
    options: [
      "std::shared_ptr reference count modifications are atomic, but modifying the same instance concurrently requires std::atomic<std::shared_ptr<T>> (or std::atomic_store)",
      "std::shared_ptr is fully thread-safe for concurrent assignments",
      "Use raw pointers instead",
      "Wrap Widget in std::unique_ptr"
    ],
    correctOption: 0,
    explanation: "WHAT: Instance mutation vs reference count atomicity. WHY: `shared_ptr` ref counts are thread-safe, but the `shared_ptr` object itself (the two-pointer struct) is NOT thread-safe for concurrent reassignment. HOW: Use `std::atomic<std::shared_ptr<Widget>>`.",
    basePoints: 175,
    tags: ["cpp", "smart_pointers", "shared_ptr", "thread_safety"]
  },
  {
    id: "conc-22",
    mode: "concurrency_crash",
    language: "Python",
    difficulty: 8,
    title: "Async Lock Contention Deadlock in Task Hierarchy",
    description: "Async task acquires asyncio.Lock, then awaits child task that also attempts to acquire same lock.",
    code: `lock = asyncio.Lock()\nasync def parent():\n    async with lock:\n        await child()\nasync def child():\n    async with lock: # Deadlock: asyncio.Lock is NOT reentrant!\n        pass`,
    options: [
      "asyncio.Lock is non-reentrant; avoid nested acquisition or implement an async reentrant lock",
      "asyncio.Lock supports reentrancy by default",
      "Increase lock timeout",
      "Run child task in background without await"
    ],
    correctOption: 0,
    explanation: "WHAT: Non-reentrant async lock self-deadlock. WHY: Unlike some OS thread locks, standard `asyncio.Lock` cannot be acquired recursively by the same task. Waiting for itself hangs forever. HOW: Do not re-acquire lock in child task.",
    basePoints: 175,
    tags: ["python", "asyncio", "lock", "reentrant", "deadlock"]
  },
  {
    id: "conc-23",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 9,
    title: "ForkJoinPool ManagedBlocker for Blocking I/O",
    description: "Running long-blocking I/O inside standard ForkJoinPool / parallelStream starves pool workers.",
    code: `list.parallelStream().forEach(item -> {\n    httpGet(item); // Starves Common ForkJoinPool threads!\n});`,
    options: [
      "Use dedicated custom ThreadPoolExecutor / virtual threads (Loom) for blocking I/O rather than common ForkJoinPool",
      "Increase -Djava.util.concurrent.ForkJoinPool.common.parallelism=10000",
      "Wrap httpGet in synchronized",
      "parallelStream should only be used on single-core CPUs"
    ],
    correctOption: 0,
    explanation: "WHAT: Common ForkJoinPool exhaustion. WHY: `parallelStream()` uses JVM's shared `ForkJoinPool.commonPool()`, which has workers equal to CPU cores. Blocking them on network I/O starves the whole JVM. HOW: Use a dedicated `ExecutorService`.",
    basePoints: 190,
    tags: ["java", "forkjoin", "parallel_stream", "blocking_io"]
  },
  {
    id: "conc-24",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 9,
    title: "Microtask Starvation Blocking Macrotask Rescheduling",
    description: "Recursive queueMicrotask loop starves setTimeout and I/O polling.",
    code: `function heavyLoop() {\n  queueMicrotask(heavyLoop); // Never yields to macrotask or browser rendering!\n}\nheavyLoop();`,
    options: [
      "Microtasks drain completely before next event loop turn; schedule macrotasks with setImmediate() or setTimeout(fn, 0)",
      "queueMicrotask is asynchronous so it never blocks",
      "Use Promise.resolve() instead",
      "Wrap in try/catch"
    ],
    correctOption: 0,
    explanation: "WHAT: Event loop microtask starvation. WHY: Microtasks take precedence over macrotasks and rendering. Infinite recursive microtasks freeze the event loop. HOW: Use `setTimeout` or `setImmediate`.",
    basePoints: 190,
    tags: ["javascript", "event_loop", "microtasks", "starvation"]
  },
  {
    id: "conc-25",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 9,
    title: "ABA Problem in Lock-Free Treiber Stack",
    description: "Lock-free stack pop reads top and top->next; another thread pops, frees, and re-allocates at same address before CAS.",
    code: `Node* oldTop = head.load();\nwhile (oldTop && !head.compare_exchange_weak(oldTop, oldTop->next)) {\n    // If another thread pops oldTop, deletes it, and new node gets allocated at oldTop address, CAS succeeds with corrupted next pointer!\n}`,
    options: [
      "Use Hazard Pointers, Epoch-Based Reclamation (EBR), or double-word CAS with version counter (tagged pointers)",
      "Replace compare_exchange_weak with compare_exchange_strong",
      "Declare oldTop as volatile",
      "Use spinlocks instead of atomic"
    ],
    correctOption: 0,
    explanation: "WHAT: Classic ABA hazard in lock-free data structures. WHY: Address equality does not guarantee state equality if memory has been recycled. Reading `oldTop->next` dereferences dangling/corrupted pointer. HOW: Use tagged pointers or Hazard Pointers.",
    basePoints: 190,
    tags: ["cpp", "lock_free", "aba", "hazard_pointers"]
  },
  {
    id: "conc-26",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 9,
    title: "False Sharing on Adjacent Volatile Fields in Cache Line",
    description: "Two threads updating independent volatile variables on the same 64-byte CPU cache line suffer massive performance degradation.",
    code: `class PaddedData {\n    volatile long thread1Val;\n    volatile long thread2Val; // Same L1 cache line! Continual cache invalidation bounce\n}`,
    options: [
      "Apply @jdk.internal.vm.annotation.Contended (cache line padding) or manually pad 64 bytes between fields",
      "Make fields non-volatile",
      "Use synchronized instead",
      "Increase L1 cache size"
    ],
    correctOption: 0,
    explanation: "WHAT: CPU cache line False Sharing. WHY: Cores invalidate the entire 64-byte cache line on write. When two threads write adjacent fields, the line bounces between L1 caches (cache line ping-pong). HOW: Add cache line padding (`@Contended`).",
    basePoints: 190,
    tags: ["java", "false_sharing", "cache_line", "concurrency"]
  },
  {
    id: "conc-27",
    mode: "concurrency_crash",
    language: "Python",
    difficulty: 10,
    title: "asyncio Loop Signal Handling on Non-Main Thread",
    description: "Calling loop.add_signal_handler() inside a background worker thread raises ValueError.",
    code: `def thread_entry():\n    loop = asyncio.new_event_loop()\n    loop.add_signal_handler(signal.SIGINT, handler) # ValueError: signal only works in main thread of the main interpreter!`,
    options: [
      "Signal handlers can only be registered on the main thread; use inter-thread event/queue to signal background event loops",
      "Run Python with -O flag",
      "Use SIGKILL instead of SIGINT",
      "Call signal.signal directly in thread"
    ],
    correctOption: 0,
    explanation: "WHAT: OS signal delivery threading limitation. WHY: Python's `signal` and `asyncio.add_signal_handler` require execution from the main thread because the OS kernel delivers signals to process main thread. HOW: Handle signals in main thread and notify worker.",
    basePoints: 200,
    tags: ["python", "asyncio", "signals", "threading"]
  },
  {
    id: "conc-28",
    mode: "concurrency_crash",
    language: "C++",
    difficulty: 10,
    title: "Deadlock in Multiple Lock Acquisition: std::lock vs manual ordering",
    description: "Thread A locks (m1, m2, m3); Thread B locks (m3, m2, m1) in differing order without deadlock avoidance algorithm.",
    code: `// Thread 1:\nstd::unique_lock<std::mutex> l1(m1, std::defer_lock);\nstd::unique_lock<std::mutex> l2(m2, std::defer_lock);\nstd::lock(l1, l2); // Deadlock-free deadlock avoidance algorithm`,
    options: [
      "std::lock (or std::scoped_lock in C++17) acquires multiple mutexes using a deadlock avoidance algorithm; manual multi-locking is error-prone",
      "std::lock acquires mutexes randomly without safety",
      "Must lock each mutex in separate functions",
      "Use single global mutex only"
    ],
    correctOption: 0,
    explanation: "WHAT: Deadlock-free multi-lock acquisition. WHY: `std::lock(...)` / `std::scoped_lock` uses a deadlock avoidance algorithm to safely acquire multiple mutexes without ordering restrictions. HOW: Use `std::scoped_lock lock(m1, m2, m3);`.",
    basePoints: 200,
    tags: ["cpp", "mutex", "scoped_lock", "deadlock"]
  },
  {
    id: "conc-29",
    mode: "concurrency_crash",
    language: "Java",
    difficulty: 10,
    title: "VarHandle Memory Ordering Modes in Lock-Free Ring Buffer",
    description: "Using VarHandle.set (opaque/plain) instead of setRelease fails to establish happens-before edge with getAcquire.",
    code: `class RingBuffer {\n    private static final VarHandle HEAD;\n    // ...\n    void publish(int val) {\n        buffer[idx] = val;\n        HEAD.set(this, nextIdx); // Bug: set has plain relaxed semantics, buffer writes can reorder!\n    }\n}`,
    options: [
      "Use HEAD.setRelease(this, nextIdx) to establish release barrier ensuring buffer writes are visible before head pointer update",
      "Use HEAD.setOpaque",
      "VarHandle.set is always sequentially consistent",
      "Make buffer volatile"
    ],
    correctOption: 0,
    explanation: "WHAT: VarHandle memory access modes. WHY: `VarHandle.set` performs plain unordered memory access. To ensure payload writes precede publication, `setRelease()` paired with `getAcquire()` is required. HOW: `HEAD.setRelease(this, nextIdx)`.",
    basePoints: 200,
    tags: ["java", "varhandle", "jmm", "release_acquire", "lock_free"]
  },
  {
    id: "conc-30",
    mode: "concurrency_crash",
    language: "JavaScript",
    difficulty: 10,
    title: "SharedArrayBuffer Cross-Origin Isolation Headers",
    description: "SharedArrayBuffer constructor throws ReferenceError in modern browsers due to Spectre mitigation policy.",
    code: `const sab = new SharedArrayBuffer(1024); // ReferenceError: SharedArrayBuffer is not defined!`,
    options: [
      "Server must send headers: Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp (COOP/COEP)",
      "SharedArrayBuffer has been permanently removed from JavaScript",
      "Run website over HTTP instead of HTTPS",
      "Disable browser security flags"
    ],
    correctOption: 0,
    explanation: "WHAT: Browser security origin isolation requirements. WHY: Following Spectre/Meltdown, browsers only enable `SharedArrayBuffer` if the site is served with `COOP: same-origin` and `COEP: require-corp` headers. HOW: Configure COOP/COEP headers on web server.",
    basePoints: 200,
    tags: ["javascript", "sharedarraybuffer", "coop", "coep", "security"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONCURRENCY_CRASH_BANK };
}
