/**
 * Code Debugger - Mode 16: Debugging Boss (30 Challenges)
 * Elite multi-paradigm challenges, complex systems, distributed architectures, algorithms, compilers, VM design.
 */

const DEBUGGING_BOSS_BANK = [
  {
    id: "boss-01",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 9,
    title: "LRU Cache O(1) Eviction Order Invariant",
    description: "The custom LRU cache correctly evicts keys, but fails to move accessed keys to head upon get().",
    code: `class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {} # dict in Python 3.7+ preserves insertion order\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        # Bug: value is returned without refreshing access position!\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            del self.cache[key]\n        elif len(self.cache) >= self.cap:\n            oldest = next(iter(self.cache))\n            del self.cache[oldest]\n        self.cache[key] = value`,
    options: [
      "In get(): pop and re-insert the key (or use collections.OrderedDict.move_to_end) to mark as most recently used",
      "Change self.cache to a list",
      "oldest = next(iter(self.cache)) deletes the newest item",
      "len(self.cache) >= self.cap should be >="
    ],
    correctOption: 0,
    explanation: "WHAT: Missing LRU recency update on read. WHY: LRU requires both reads (`get`) and writes (`put`) to refresh item recency. Without refreshing on `get()`, frequently read items are erroneously evicted. HOW: In `get()`: `val = self.cache.pop(key); self.cache[key] = val; return val`.",
    basePoints: 220,
    tags: ["python", "lru_cache", "boss", "data_structures"]
  },
  {
    id: "boss-02",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 9,
    title: "Async Concurrency Limiter (p-limit) Queue Desync",
    description: "Concurrent task limiter permits more than maxConcurrent tasks when task throws error.",
    code: `function createLimiter(concurrency) {\n  let active = 0;\n  const queue = [];\n  const next = () => {\n    if (queue.length > 0 && active < concurrency) {\n      active++;\n      const { fn, resolve, reject } = queue.shift();\n      fn().then(resolve, reject).then(() => {\n        active--;\n        next();\n      });\n    }\n  };\n  return (fn) => new Promise((resolve, reject) => {\n    queue.push({ fn, resolve, reject });\n    next();\n  });\n}`,
    options: [
      "If fn() throws synchronously during execution (before returning a promise), active is incremented but the promise rejection chain never runs; wrap fn() in Promise.resolve().then(fn)",
      "concurrency must be a constant 1",
      "queue.shift() should be queue.pop()",
      "active-- must be in finally block"
    ],
    correctOption: 0,
    explanation: "WHAT: Synchronous throw inside async runner. WHY: If `fn()` throws a synchronous error (e.g. `throw new Error()`), `fn()` does not return a Promise. The `.then()` chain is skipped, permanently stranding `active` count and halting the queue. HOW: Execute via `Promise.resolve().then(fn)`.",
    basePoints: 220,
    tags: ["javascript", "concurrency", "promises", "boss", "async"]
  },
  {
    id: "boss-03",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 9,
    title: "Lock-Free SPSC Ring Buffer Memory Fence Synchronization",
    description: "Single-Producer Single-Consumer queue experiences corrupted reads under high multi-core load.",
    code: `template<typename T, size_t N>\nclass SPSCQueue {\n    T buffer[N];\n    std::atomic<size_t> head{0};\n    std::atomic<size_t> tail{0};\npublic:\n    bool push(const T& item) {\n        size_t h = head.load(std::memory_order_relaxed);\n        if ((h + 1) % N == tail.load(std::memory_order_relaxed)) return false;\n        buffer[h] = item;\n        head.store((h + 1) % N, std::memory_order_relaxed); // Bug: relaxed ordering allows buffer write to reorder after head update!\n        return true;\n    }\n};`,
    options: [
      "Use memory_order_release on head.store and memory_order_acquire on head.load to enforce store-release / load-acquire ordering",
      "Change atomic size_t to volatile size_t",
      "Wrap buffer in std::mutex",
      "Make buffer size dynamic"
    ],
    correctOption: 0,
    explanation: "WHAT: CPU reordering in lock-free queue. WHY: With `memory_order_relaxed`, the CPU can publish the updated `head` index before the payload bytes in `buffer[h]` are flushed to cache, allowing the consumer to read uninitialized memory. HOW: Use `memory_order_release`.",
    basePoints: 220,
    tags: ["cpp", "lock_free", "spsc", "memory_order", "boss"]
  },
  {
    id: "boss-04",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 9,
    title: "ConcurrentSkipListMap Concurrent Spliterator Split Invariant",
    description: "Custom lock-free SkipList iterator loops infinitely during concurrent node deletion.",
    code: `// When node is deleted in skip list, it must be marked with a logical tombstone / marker node\n// before unlinking pointers to prevent concurrent insertion onto a deleted node!`,
    options: [
      "In Harris-Michael lock-free linked lists / skip lists, a node's next pointer must be atomically marked with a deletion bit (AtomicMarkableReference) before physical unlinking",
      "Use synchronized on all list methods",
      "Skip lists cannot support concurrent deletion",
      "Increase skip list max level"
    ],
    correctOption: 0,
    explanation: "WHAT: Lock-free node deletion race. WHY: If thread A unlinks node X while thread B concurrently inserts child Y after X, Y is lost forever unless X is logically marked with an atomic deletion bit prior to unlinking. HOW: Use `AtomicMarkableReference`.",
    basePoints: 220,
    tags: ["java", "skiplist", "lock_free", "cas", "boss"]
  },
  {
    id: "boss-05",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 9,
    title: "Aho-Corasick Multi-Pattern Trie Failure Link Construction",
    description: "Aho-Corasick automaton fails to match shorter patterns contained as substrings inside longer patterns.",
    code: `def build_failure_links(root):\n    queue = deque()\n    for ch, child in root.children.items():\n        child.fail = root\n        queue.append(child)\n    while queue:\n        curr = queue.popleft()\n        # Bug: if curr.fail has output patterns, curr.output must merge curr.fail.output list!\n        for ch, child in curr.children.items():\n            # ... construct failure links ...\n            queue.append(child)`,
    options: [
      "Merge output lists: child.output.extend(child.fail.output) so matches on prefix suffixes are not missed",
      "Failure links must point to root only",
      "Aho-Corasick requires DFS, not BFS",
      "Remove failure links completely"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing dictionary output link union in Aho-Corasick. WHY: If pattern 'he' is matched while reaching state 'she', the match for 'he' is stored in the failure state and must be inherited in the current node's output set. HOW: `child.output.extend(child.fail.output)`.",
    basePoints: 220,
    tags: ["python", "aho_corasick", "string_matching", "trie", "boss"]
  },
  {
    id: "boss-06",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 9,
    title: "Virtual DOM Reconciliation Key Reuse Collision",
    description: "Diffing algorithm maps identical key to wrong DOM node when component types differ.",
    code: `function diff(oldVNode, newVNode) {\n  if (oldVNode.key === newVNode.key) {\n    // Bug: did not check if oldVNode.type === newVNode.type!\n    patch(oldVNode.dom, newVNode);\n  } else {\n    replace(oldVNode.dom, createDOM(newVNode));\n  }\n}`,
    options: [
      "Nodes are only reconcilable if BOTH key AND type match: if (oldVNode.key === newVNode.key && oldVNode.type === newVNode.type)",
      "key comparison should be oldVNode.key == newVNode.key",
      "Virtual DOM does not use keys",
      "Replace all nodes unconditionally"
    ],
    correctOption: 0,
    explanation: "WHAT: Virtual DOM type mismatch reconciliation bug. WHY: If a `<div>` and a `<span>` share the same key, attempting to patch properties of differing tag types corrupts native DOM elements. HOW: Verify `key === key && type === type`.",
    basePoints: 220,
    tags: ["javascript", "vdom", "react", "reconciliation", "boss"]
  },
  {
    id: "boss-07",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 10,
    title: "Garbage Collector Mark-and-Sweep Stop-The-World Stack Scanning",
    description: "Precise GC stack scanner fails to locate root pointers stored in CPU registers during JIT execution.",
    code: `// Stack scanner walks frame pointer (%rbp) to examine stack slots for object pointers\n// Bug: callee-saved registers (%rbx, %r12-%r15) holding live pointers are not spilled or scanned!`,
    options: [
      "GC must scan spilled registers saved in jmp_buf / ucontext_t (or enforce register maps generated by JIT compiler)",
      "Disable compiler register optimization (-O0)",
      "Stack scanning only requires inspecting heap memory",
      "Pointers cannot reside in CPU registers"
    ],
    correctOption: 0,
    explanation: "WHAT: Register root omission in precise Garbage Collection. WHY: Active live pointers often reside directly in CPU registers (`%r12`, `%rbx`). If registers are omitted from the root set, referenced objects are erroneously freed during sweep phase. HOW: Capture register context via `setjmp` or JIT stack maps.",
    basePoints: 250,
    tags: ["cpp", "garbage_collection", "compilers", "runtime", "boss"]
  },
  {
    id: "boss-08",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 10,
    title: "Raft Consensus Log Matching Term Discrepancy",
    description: "Follower accepts AppendEntries with conflicting entry without truncating subsequent mismatched log entries.",
    code: `// Raft Follower AppendEntries RPC receiver:\nif (prevLogIndex >= log.size() || log.get(prevLogIndex).term != prevLogTerm) {\n    return Reply.failure();\n}\n// Bug: if follower appends new entries without deleting conflicting existing entries, log divergence occurs!`,
    options: [
      "If an existing entry conflicts with a new one (same index but different terms), delete the existing entry and all that follow it before appending",
      "Always append entries to the end of the log regardless of term",
      "Reject all AppendEntries if leader term == follower term",
      "Set log size to 0"
    ],
    correctOption: 0,
    explanation: "WHAT: Raft log consistency invariant violation (§5.3). WHY: When a new leader sends entries overwriting an uncommitted branch, the follower MUST truncate all conflicting entries from the mismatch point onward to maintain the Log Matching Invariant. HOW: Truncate conflicting suffix before appending.",
    basePoints: 250,
    tags: ["java", "raft", "distributed_systems", "consensus", "boss"]
  },
  {
    id: "boss-09",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 10,
    title: "Bytecode Interpreter Instruction Pointer (IP) Jump Target Offset",
    description: "Virtual Machine JUMP_IF_FALSE calculates relative jump offset using instruction count instead of bytecode byte index.",
    code: `def execute(code, ip=0):\n    while ip < len(code):\n        op = code[ip]\n        if op == JUMP_IF_FALSE:\n            offset = code[ip + 1]\n            if not stack.pop():\n                ip += offset # Bug: if instructions are variable length (2 bytes), jump lands in middle of instruction opcode!\n            else:\n                ip += 2`,
    options: [
      "Bytecode offsets must account for instruction word sizes (e.g. 2-byte op/arg alignment in modern Python/VM bytecode)",
      "Jump instructions cannot take negative offsets",
      "Stack must not be popped during jump",
      "ip should be reset to 0"
    ],
    correctOption: 0,
    explanation: "WHAT: Misaligned bytecode instruction pointer offset. WHY: If offsets are encoded in instruction counts rather than byte lengths, or vice-versa, the interpreter jumps into operand data bytes, causing illegal instruction execution. HOW: Align offsets with VM instruction byte stride.",
    basePoints: 250,
    tags: ["python", "virtual_machine", "bytecode", "interpreter", "boss"]
  },
  {
    id: "boss-10",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 10,
    title: "WebAssembly Dynamic Linear Memory Growth Page Fault",
    description: "Calling wasm.memory.grow() invalidates existing JavaScript TypedArray views (Uint8Array buffer detachment).",
    code: `const memory = new WebAssembly.Memory({ initial: 1 });\nlet view = new Uint8Array(memory.buffer);\n// WebAssembly module calls memory.grow(1)...\nmemory.grow(1);\nconsole.log(view[0]); // TypeError: Cannot perform operation on detached ArrayBuffer!`,
    options: [
      "When WebAssembly.Memory grows, its underlying ArrayBuffer is detached; re-create the TypedArray view: view = new Uint8Array(memory.buffer)",
      "WebAssembly linear memory cannot grow once instantiated",
      "Wrap view in Object.freeze",
      "Change Uint8Array to DataView without re-instantiation"
    ],
    correctOption: 0,
    explanation: "WHAT: ArrayBuffer detachment upon WebAssembly memory growth. WHY: `memory.grow()` reallocates the underlying linear memory in the host process, which immediately detaches the old `ArrayBuffer` to prevent dangling buffer pointers. HOW: Re-instantiate `new Uint8Array(memory.buffer)`.",
    basePoints: 250,
    tags: ["javascript", "webassembly", "memory", "wasm", "boss"]
  },
  {
    id: "boss-11",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 10,
    title: "B+ Tree Leaf Node Split Linked-List Sibling Pointer Re-linking",
    description: "Splitting a B+ tree leaf node allocates a new sibling, but fails to update the previous sibling's next pointer.",
    code: `void splitLeaf(LeafNode* leaf) {\n    LeafNode* newLeaf = new LeafNode();\n    // ... copy half keys ...\n    newLeaf->next = leaf->next;\n    leaf->next = newLeaf; // Correct: maintains leaf doubly/singly linked list for range scans\n    // Bug: if leaf was double-linked, newLeaf->next->prev must be updated to newLeaf!\n}`,
    options: [
      "In doubly linked leaf level, update back-pointer: if (newLeaf->next) newLeaf->next->prev = newLeaf; newLeaf->prev = leaf;",
      "B+ trees do not connect leaf nodes in a linked list",
      "Leaf split requires moving all keys to newLeaf",
      "leaf->next must be set to nullptr"
    ],
    correctOption: 0,
    explanation: "WHAT: Broken doubly linked list invariant in B+ Tree leaf level. WHY: Range scans in B+ Trees traverse leaf-to-leaf pointers directly. If `prev` pointers are not maintained, backward range scans fail. HOW: Update `newLeaf->next->prev = newLeaf`.",
    basePoints: 250,
    tags: ["cpp", "b_plus_tree", "database_internals", "data_structures", "boss"]
  },
  {
    id: "boss-12",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 10,
    title: "2-Phase Commit (2PC) Coordinator Timeout State Crash",
    description: "Transaction coordinator crashes after sending PREPARE to participants; on reboot, coordinator commits without checking all votes.",
    code: `// Coordinator recovers from WAL log containing 'PREPARE_SENT' without 'ALL_PREPARED'\n// Bug: if coordinator defaults to COMMIT on ambiguous crash state instead of ABORT, data inconsistency occurs!`,
    options: [
      "In 2PC, if the coordinator crashes before logging COMMIT to WAL, it MUST abort the transaction upon recovery to preserve atomicity",
      "Coordinator should send COMMIT to all prepared nodes",
      "Participants automatically commit after 5 seconds",
      "2PC does not use write-ahead logging"
    ],
    correctOption: 0,
    explanation: "WHAT: 2PC recovery protocol violation. WHY: If the coordinator did not receive or record unanimous 'YES' votes in durable storage before crashing, it cannot guarantee all participants prepared successfully. It must abort. HOW: Replay WAL: if no `COMMIT` record exists, issue `GLOBAL_ABORT`.",
    basePoints: 250,
    tags: ["java", "2pc", "distributed_systems", "transactions", "boss"]
  },
  {
    id: "boss-13",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 10,
    title: "Generational Garbage Collector Cyclic Heap Weakref Finalizer Deadlock",
    description: "C-extension objects with circular references implementing tp_traverse omit tp_clear.",
    code: `// PyTypeObject with Py_TPFLAGS_HAVE_GC\n// Implements tp_traverse but leaves tp_clear as NULL;\n// When cyclic reference forms, cyclic GC cannot break cycle!`,
    options: [
      "CPython cyclic garbage collector requires tp_clear to break reference cycles; without tp_clear, cyclic objects remain uncollectible",
      "tp_traverse is optional for GC types",
      "Reference cycles are automatically broken by reference counting",
      "Set Py_TPFLAGS_HAVE_GC to 0"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing `tp_clear` in CPython GC extension type. WHY: `tp_traverse` identifies reference cycles, but `tp_clear` is required by the generational collector to actually nullify references and dismantle the cycle. HOW: Implement `tp_clear`.",
    basePoints: 250,
    tags: ["python", "cpython", "garbage_collection", "c_extension", "boss"]
  },
  {
    id: "boss-14",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 10,
    title: "CRDT (Conflict-Free Replicated Data Type) LWW-Element-Set Clock Drift",
    description: "Last-Write-Wins element set uses unsynchronized client Date.now() clocks, causing updates from lagging clocks to be permanently ignored.",
    code: `class LWWSet {\n  add(val) {\n    this.addSet.set(val, Date.now()); // Vulnerable to client wall-clock skew!\n  }\n}`,
    options: [
      "Use Lamport timestamps, Vector Clocks, or Hybrid Logical Clocks (HLC) instead of unsynchronized client physical timestamps",
      "Round timestamps to nearest second",
      "Use Math.random() as timestamp",
      "LWW sets cannot support removals"
    ],
    correctOption: 0,
    explanation: "WHAT: Clock skew anomaly in CRDTs. WHY: Relying on physical device clocks (`Date.now()`) allows a device with a clock set in the future to permanently dominate all concurrent writes. HOW: Use Hybrid Logical Clocks (HLC).",
    basePoints: 250,
    tags: ["javascript", "crdt", "distributed_systems", "hlc", "boss"]
  },
  {
    id: "boss-15",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 10,
    title: "SIMD Vectorized Loop Tail Processing Buffer Overread",
    description: "AVX2 256-bit vector loop processes 8 floats at a time but executes vector load on array remainder without masking.",
    code: `void addArrays(float* a, float* b, float* c, size_t n) {\n    size_t i = 0;\n    for (; i + 8 <= n; i += 8) {\n        __m256 va = _mm256_loadu_ps(a + i);\n        __m256 vb = _mm256_loadu_ps(b + i);\n        _mm256_storeu_ps(c + i, _mm256_add_ps(va, vb));\n    }\n    // Bug: if remainder (n % 8 != 0) is loaded with _mm256_loadu_ps, reads past end of buffer (SIGSEGV)!\n}`,
    options: [
      "Process the remaining n % 8 elements with scalar loop (for (; i < n; ++i) c[i] = a[i] + b[i];) or masked vector load (_mm256_maskload_ps)",
      "Pad all arrays to multiples of 8 at allocation time and ignore tail loop",
      "Both A and B are valid engineering solutions",
      "AVX2 handles boundary overreads automatically"
    ],
    correctOption: 2,
    explanation: "WHAT: SIMD tail buffer overrun. WHY: Vector loads read 32 contiguous bytes (8 floats). If $n$ is not divisible by 8, reading beyond $n$ crosses page boundaries and triggers segmentation faults. HOW: Process tail scalar or use masked loads.",
    basePoints: 250,
    tags: ["cpp", "simd", "avx2", "performance", "boss"]
  },
  {
    id: "boss-16",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 10,
    title: "LMAX Disruptor Ring Buffer Sequence Barrier Spin-Yield Strategy",
    description: "Disruptor consumer reads sequence past publisher's published sequence due to missing memory barrier on cursor load.",
    code: `// Publisher writes event at seq, then updates cursor with setRelease\n// Consumer sequence barrier must read cursor with getAcquire to prevent reading uncommitted event payload`,
    options: [
      "Sequence barrier must use acquire semantics when loading publisher cursor to ensure event data is visible prior to processing",
      "Publishers must lock the entire ring buffer",
      "Disruptor requires single-threaded operation",
      "Use Thread.sleep(1) between sequences"
    ],
    correctOption: 0,
    explanation: "WHAT: Lock-free memory barrier synchronization in LMAX Disruptor. WHY: High-performance ring buffers eliminate mutexes via memory barriers. The sequence barrier's acquire-load ensures all preceding memory writes from the publisher are visible to consumers. HOW: Enforce acquire semantics.",
    basePoints: 250,
    tags: ["java", "disruptor", "lock_free", "concurrency", "boss"]
  },
  {
    id: "boss-17",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 10,
    title: "Coro-Event Loop Yield Starvation in Cooperative Multitasking",
    description: "CPU-heavy mathematical calculation in async coroutine starves all concurrent network handlers.",
    code: `async def compute_heavy_matrix(matrix):\n    # 10-second pure synchronous matrix multiplication loop\n    for i in range(10000000):\n        # synchronous compute without await asyncio.sleep(0)\n        pass`,
    options: [
      "Offload CPU-bound work to process pool: await loop.run_in_executor(process_pool, compute_fn) or insert periodic await asyncio.sleep(0)",
      "Increase asyncio thread count",
      "Change async def to def",
      "asyncio runs CPU bound work concurrently on all CPU cores automatically"
    ],
    correctOption: 0,
    explanation: "WHAT: Event loop cooperative multitasking starvation. WHY: Python's `asyncio` is single-threaded. Synchronous long-running calculations prevent the event loop from servicing network sockets or other coroutines. HOW: Offload to `run_in_executor`.",
    basePoints: 250,
    tags: ["python", "asyncio", "event_loop", "cooperative_multitasking", "boss"]
  },
  {
    id: "boss-18",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 10,
    title: "V8 Hidden Class (Shapes) Transition Deoptimization Polymorphism",
    description: "Hot function passing objects with properties added in differing orders degrades from Monomorphic to Megamorphic IC.",
    code: `function Point(x, y) {\n  if (x > 0) {\n    this.x = x;\n    this.y = y;\n  } else {\n    this.y = y; // Different initialization order creates different Hidden Class!\n    this.x = x;\n  }\n}`,
    options: [
      "Always initialize object properties in the exact same consistent order to preserve V8 hidden class (Shape) transitions and monomorphic inline caching",
      "Add 'use strict'",
      "Convert Point to a Map",
      "Delete properties before assigning"
    ],
    correctOption: 0,
    explanation: "WHAT: V8 Hidden Class (Shape) polymorphism deoptimization. WHY: V8 tracks property offsets via Hidden Class transition trees. Initializing `y` before `x` creates a branching hidden class, causing inline caches (ICs) to become megamorphic ($10\\times$ slower). HOW: Initialize properties in identical order.",
    basePoints: 250,
    tags: ["javascript", "v8", "inline_cache", "performance", "boss"]
  },
  {
    id: "boss-19",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 10,
    title: "Linker Multiple Definition (ODR) Violation in Header Template Specialization",
    description: "Non-inline full template specialization defined in header file causes duplicate symbol linker error when included in multiple translation units.",
    code: `// in header.h:\ntemplate<typename T> void print(T val) {}\ntemplate<> void print<int>(int val) { // Bug: full specialization is a regular function, not a template! Violates ODR!\n    std::cout << val;\n}`,
    options: [
      "Declare the full specialization inline: template<> inline void print<int>(int val) { ... } or move definition to .cpp file",
      "Change template<> to template<class T>",
      "Remove the specialization",
      "Include header.h only once across entire project"
    ],
    correctOption: 0,
    explanation: "WHAT: One Definition Rule (ODR) violation in C++. WHY: Full template specializations are concrete functions (not templates). Placing their body in a header without `inline` generates duplicate symbol errors in multiple object files. HOW: Add `inline`.",
    basePoints: 250,
    tags: ["cpp", "templates", "odr", "linker", "boss"]
  },
  {
    id: "boss-20",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 10,
    title: "HotSpot JVM JIT Safepoint Polling in Counted Loops",
    description: "Finite counted loop over long index lacks JIT safepoint polls, stalling Stop-The-World GC pauses across entire JVM.",
    code: `// Hot loop:\nfor (long i = 0; i < 2_000_000_000L; i++) {\n    // In older Java versions, long counted loops did not have safepoint polls inserted by JIT!\n    // JVM GC thread waiting to stop the world hangs until loop finishes!\n}`,
    options: [
      "In Java 8-9, use int loop or -XX:+UseCountedLoopSafepoints; in Java 10+, safepoint polling for long loops is enabled by default",
      "Increase heap size to prevent GC",
      "Make i volatile",
      "Call System.gc() inside loop"
    ],
    correctOption: 0,
    explanation: "WHAT: Safepoint bias and GC pause time stall. WHY: JIT optimizes out safepoint checks in counted loops. When GC requests a Stop-The-World pause, all threads must reach a safepoint, hanging the entire JVM until the unpolled loop terminates. HOW: `-XX:+UseCountedLoopSafepoints`.",
    basePoints: 250,
    tags: ["java", "jit", "safepoint", "gc", "hotspot", "boss"]
  },
  {
    id: "boss-21",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 10,
    title: "Async ContextVar Propagation in Concurrent Task Tree",
    description: "Modifying ContextVar in child task does not propagate back to parent, causing inconsistent request tracing context.",
    code: `import contextvars\nreq_id = contextvars.ContextVar('req_id')\nasync def worker():\n    req_id.set('abc-123') # Sets context in copy of current context; parent context unchanged!\n\nasync def main():\n    req_id.set('root')\n    await asyncio.create_task(worker())\n    print(req_id.get()) # Prints 'root' instead of 'abc-123'`,
    options: [
      "ContextVars implement copy-on-write isolation for async task boundaries; mutations in child tasks intentionally do not leak to parent context",
      "ContextVars are global and share all mutations across tasks",
      "Use global variable instead of ContextVar for thread-safe isolation",
      "Wrap req_id in a tuple"
    ],
    correctOption: 0,
    explanation: "WHAT: ContextVar shallow copy isolation semantics. WHY: `asyncio.create_task` snapshots the current context. Child tasks receive a copy-on-write copy to isolate task contexts from clobbering caller state. HOW: Return updated context explicitly or mutate contained mutable container.",
    basePoints: 250,
    tags: ["python", "contextvars", "asyncio", "concurrency", "boss"]
  },
  {
    id: "boss-22",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 10,
    title: "Shadow DOM CSS Variable Inheritance Boundary",
    description: "Custom Web Component shadow root fails to inherit style rules from outer document stylesheets.",
    code: `class CustomWidget extends HTMLElement {\n  connectedCallback() {\n    this.attachShadow({ mode: 'open' });\n    this.shadowRoot.innerHTML = \`<div class="card">Text</div>\`;\n    // Outer CSS class .card { color: red; } has no effect inside Shadow DOM!\n  }\n}`,
    options: [
      "Shadow DOM encapsulates styling; use CSS Custom Properties (variables: --main-color) which pierce shadow boundaries, or adoptedStyleSheets",
      "Shadow DOM cannot have styles",
      "Change mode: 'open' to mode: 'closed'",
      "Include !important in global stylesheet"
    ],
    correctOption: 0,
    explanation: "WHAT: Shadow DOM style encapsulation. WHY: Standard CSS class selectors do not cross Shadow DOM boundaries. CSS Custom Properties (`--custom-prop`) and `:host` rules naturally pierce the shadow boundary. HOW: Use CSS Variables or `adoptedStyleSheets`.",
    basePoints: 250,
    tags: ["javascript", "web_components", "shadow_dom", "css", "boss"]
  },
  {
    id: "boss-23",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 10,
    title: "Custom Allocator Rebind Trait for STL Node Containers",
    description: "Custom allocator for std::list<T> fails to compile because allocator::rebind<Node<T>> is not supported in C++03/11.",
    code: `template<typename T>\nclass MyAlloc {\n    // In node-based containers (list, map), the container allocates internal Node<T>, not T directly!\n    // Bug: missing template<typename U> struct rebind { typedef MyAlloc<U> other; };\n};`,
    options: [
      "Implement template struct rebind (or use std::allocator_traits which defines rebind_alloc automatically in C++11+)",
      "std::list cannot use custom allocators",
      "Change MyAlloc to inherit std::string",
      "Allocators must only allocate sizeof(T)"
    ],
    correctOption: 0,
    explanation: "WHAT: Allocator rebinding mechanism. WHY: Node containers like `std::list<T>` must allocate `std::_List_node<T>`. The container uses `rebind` to obtain an allocator for the internal node structure. HOW: Use `std::allocator_traits` or provide `rebind`.",
    basePoints: 250,
    tags: ["cpp", "allocator", "stl", "templates", "boss"]
  },
  {
    id: "boss-24",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 10,
    title: "ConcurrentHashMap computeIfAbsent Recursive Self-Update Deadlock",
    description: "ConcurrentHashMap computeIfAbsent callback that attempts to update the SAME map key deadlocks inside bucket lock.",
    code: `Map<String, String> map = new ConcurrentHashMap<>();\nmap.computeIfAbsent("key", k -> {\n    return map.computeIfAbsent("key", k2 -> "val"); // Recursive compute on same key hangs forever!\n});`,
    options: [
      "In ConcurrentHashMap, the mapping function must not attempt to update or compute the same map instance recursively (causes bucket lock deadlock)",
      "ConcurrentHashMap allows recursive self-updates natively",
      "Change ConcurrentHashMap to TreeMap",
      "Increase pool size"
    ],
    correctOption: 0,
    explanation: "WHAT: `ConcurrentHashMap` bucket lock self-deadlock. WHY: `computeIfAbsent` locks the target bin (synchronized on the bin head node). A recursive call on the same key tries to acquire the already held lock in the same thread. HOW: Avoid recursive map calls.",
    basePoints: 250,
    tags: ["java", "concurrenthashmap", "deadlock", "concurrency", "boss"]
  },
  {
    id: "boss-25",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 10,
    title: "Metaclass __prepare__ Method Namespace Ordering Preservation",
    description: "Custom enum metaclass fails to record declaration order of class attributes in Python 2/3.",
    code: `class EnumMeta(type):\n    @classmethod\n    def __prepare__(cls, name, bases):\n        return collections.OrderedDict() # Preserves attribute definition order before class creation!`,
    options: [
      "__prepare__ returning an OrderedDict (or standard dict in 3.7+) is the standard way to capture class attribute definition order",
      "__prepare__ must return a tuple",
      "Metaclasses cannot customize namespace creation",
      "__prepare__ should be an instance method"
    ],
    correctOption: 0,
    explanation: "WHAT: Metaclass class namespace preparation. WHY: When Python executes a `class` body, it calls the metaclass `__prepare__` to obtain the namespace dictionary where class attributes are stored during execution. HOW: Implementation is standard and correct.",
    basePoints: 250,
    tags: ["python", "metaclass", "dunder", "internals", "boss"]
  },
  {
    id: "boss-26",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 10,
    title: "WebRTC DataChannel Backpressure BufferedAmount Overflow",
    description: "Streaming high-frequency data over RTCDataChannel drops messages because bufferedAmount exceeds browser limit.",
    code: `function sendStream(channel, dataChunks) {\n  for (const chunk of dataChunks) {\n    channel.send(chunk); // Bug: no backpressure check! Drops chunks when buffer is full!\n  }\n}`,
    options: [
      "Monitor channel.bufferedAmount and listen to 'bufferedamountlow' event to pause sending when buffer is full",
      "RTCDataChannel has infinite buffer size",
      "Use WebSocket instead of WebRTC",
      "Wrap send in while(true)"
    ],
    correctOption: 0,
    explanation: "WHAT: WebRTC DataChannel buffer saturation. WHY: Unlike TCP sockets, `RTCDataChannel.send()` drops data or throws errors when the browser's outbound SCTP queue overflows (typically 16MB). HOW: Implement backpressure using `bufferedAmountLowThreshold`.",
    basePoints: 250,
    tags: ["javascript", "webrtc", "datachannel", "networking", "boss"]
  },
  {
    id: "boss-27",
    mode: "debugging_boss",
    language: "C++",
    difficulty: 10,
    title: "Coroutines C++20 Symmetric Transfer Stack Depth Overflow",
    description: "Chained coroutines resuming each other via coroutine_handle::resume() overflow call stack on long sequences.",
    code: `// Resuming coroutine via handle.resume() in await_suspend creates nested stack frames:\nvoid await_suspend(std::coroutine_handle<> h) {\n    targetHandle.resume(); // Bug: non-symmetric transfer overflows stack!\n}`,
    options: [
      "Use C++20 Symmetric Transfer by returning targetHandle from await_suspend instead of calling resume(): std::coroutine_handle<> await_suspend(...) { return targetHandle; }",
      "Increase stack size with ulimit",
      "Change coroutine to thread",
      "Call targetHandle.destroy()"
    ],
    correctOption: 0,
    explanation: "WHAT: Asymmetric coroutine stack accumulation. WHY: Calling `.resume()` inside `await_suspend` adds a new C++ stack frame. Returning `std::coroutine_handle<>` performs Symmetric Transfer, jumping to the target coroutine with zero stack frame buildup. HOW: Return `targetHandle`.",
    basePoints: 250,
    tags: ["cpp", "coroutines", "symmetric_transfer", "cpp20", "boss"]
  },
  {
    id: "boss-28",
    mode: "debugging_boss",
    language: "Java",
    difficulty: 10,
    title: "Virtual Threads (Project Loom) Pinning on Monitorenter / Native Calls",
    description: "Carrier threads in Project Loom pinned and frozen when virtual thread blocks inside synchronized block (Java 21).",
    code: `// High concurrency service with 50,000 virtual threads:\nsynchronized (lock) {\n    httpCall(); // Pins underlying OS Carrier Thread in Java 21, exhausting carrier thread pool!\n}`,
    options: [
      "Replace synchronized with java.util.concurrent.locks.ReentrantLock to allow virtual threads to unmount during blocking I/O without pinning carrier threads",
      "Virtual threads do not work with network I/O",
      "Use synchronized on method level only",
      "Increase OS thread count to 50,000"
    ],
    correctOption: 0,
    explanation: "WHAT: Virtual Thread Pinning in Java 21. WHY: When a virtual thread blocks on I/O inside a `synchronized` block or native method, it cannot unmount from its OS carrier thread, starving the carrier pool. HOW: Replace `synchronized` with `ReentrantLock`.",
    basePoints: 250,
    tags: ["java", "virtual_threads", "loom", "concurrency", "pinning", "boss"]
  },
  {
    id: "boss-29",
    mode: "debugging_boss",
    language: "Python",
    difficulty: 10,
    title: "Cython nogil Block Python Object Reference Counting Crash",
    description: "Cython function releasing GIL with 'with nogil:' touches Python object reference count, crashing interpreter.",
    code: `# cython: language_level=3\nfrom cpython.ref cimport PyObject\ncdef void process(object py_list) nogil:\n    # Bug: accessing Python objects inside nogil block without acquiring GIL crashes with SIGSEGV!\n    pass`,
    options: [
      "Inside a nogil block, only pure C types / pointers can be manipulated; acquiring GIL (with gil:) is mandatory before touching any Python object or ref count",
      "Cython objects are thread-safe without GIL",
      "Add nogil to all functions",
      "Change object to void*"
    ],
    correctOption: 0,
    explanation: "WHAT: CPython GC race / segfault in Cython `nogil`. WHY: Python objects, refcounts, and memory allocations depend on the GIL. Reading or writing PyObject attributes without the GIL corrupts Python VM state. HOW: Operate strictly on native C datatypes or re-acquire GIL.",
    basePoints: 250,
    tags: ["python", "cython", "gil", "c_api", "boss"]
  },
  {
    id: "boss-30",
    mode: "debugging_boss",
    language: "JavaScript",
    difficulty: 10,
    title: "Tail Call Trampoline State Machine with Non-Deterministic Thunk Evaluation",
    description: "Asynchronous scheduler trampoline loses execution sequence order when resolving recursive promise thunks.",
    code: `async function runTrampoline(initialThunk) {\n  let current = initialThunk;\n  while (typeof current === 'function') {\n    current = await current(); // Correct: awaits promise thunk and proceeds step by step\n  }\n  return current;\n}`,
    options: [
      "This async trampoline loop correctly resolves sequential async thunks with constant O(1) stack frames across infinite recursive chains",
      "Trampoline loops must be synchronous only",
      "Change while loop to recursive function",
      "current = await current() should not use await"
    ],
    correctOption: 0,
    explanation: "WHAT: Asynchronous Trampoline state machine pattern. WHY: Awaiting deferred thunk functions in a linear while-loop unwinds the call stack after each step, preventing stack overflow during arbitrarily deep asynchronous computations. HOW: Pattern is correct.",
    basePoints: 250,
    tags: ["javascript", "trampoline", "async", "functional", "boss"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEBUGGING_BOSS_BANK };
}
