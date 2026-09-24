/**
 * Code Debugger - Mode 6: Memory Leak (30 Challenges)
 * Dangling pointers, unclosed streams, lingering event listeners, circular references, static caches across Python, C++, Java, JS.
 */

const MEMORY_LEAK_BANK = [
  {
    id: "mem-01",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 2,
    title: "Uncleared Interval Timer",
    description: "setInterval continues executing in background after component is unmounted.",
    code: `function startPolling() {\n  const intervalId = setInterval(() => {\n    fetchStatus();\n  }, 1000);\n  // Bug: intervalId is never cleared\n}`,
    options: [
      "Assume browser cleans up automatically after 10 request ticks",
      "Store handle and execute clearInterval(intervalId) upon unmounting",
      "Switch setInterval to requestAnimationFrame without any cancel token",
      "Enclose fetchStatus execution within a generic try/catch block"
    ],
    correctOption: 1,
    explanation: "WHAT: Dangling interval timer. WHY: `setInterval` holds a reference to its callback in the browser timer table indefinitely until cleared. HOW: Call `clearInterval(intervalId)` upon cleanup.",
    basePoints: 85,
    tags: ["javascript", "timers", "memory_leak"]
  },
  {
    id: "mem-02",
    mode: "memory_leak",
    language: "C++",
    difficulty: 2,
    title: "Missing delete on Heap Allocation",
    description: "Memory allocated with new is never released upon function exit.",
    code: `void processData() {\n    int* buffer = new int[1000];\n    // do work\n    // Bug: missing cleanup\n}`,
    options: [
      "Replace new int[1000] with a single uninitialized malloc(1000) call",
      "Mark buffer as static so the compiler destroys it upon function exit",
      "Invoke standard scalar free(buffer) instead of array deallocation",
      "Add delete[] buffer; or migrate to std::vector / std::unique_ptr"
    ],
    correctOption: 3,
    explanation: "WHAT: Heap memory leak. WHY: In C++, raw `new[]` allocations must be explicitly freed with `delete[]`. HOW: Use `delete[] buffer;` or RAII containers like `std::vector<int>`.",
    basePoints: 85,
    tags: ["cpp", "new", "delete", "raii"]
  },
  {
    id: "mem-03",
    mode: "memory_leak",
    language: "Python",
    difficulty: 3,
    title: "Unbounded Class-Level Cache List",
    description: "Appending every processed payload to a global/class list causes memory exhaustion.",
    code: `class RequestHandler:\n    history = [] # class variable shared across all requests!\n    def handle(self, payload):\n        self.history.append(payload)\n        return "ok"`,
    options: [
      "Limit cache size via deque(maxlen=N) or store state per instance",
      "Change class history = [] to history = set() to prevent growth",
      "Convert handle method into a staticmethod to isolate class memory",
      "Call del payload immediately after calling self.history.append"
    ],
    correctOption: 0,
    explanation: "WHAT: Unbounded class-level retention. WHY: `history` is shared by all instances and grows indefinitely for the entire lifetime of the process. HOW: Use bounded collection (e.g. `collections.deque(maxlen=100)`) or per-instance state.",
    basePoints: 95,
    tags: ["python", "classes", "caching"]
  },
  {
    id: "mem-04",
    mode: "memory_leak",
    language: "Java",
    difficulty: 3,
    title: "Unclosed File InputStream Leak",
    description: "FileInputStream opened without try-with-resources leaks OS file descriptors.",
    code: `public void readFile(String path) throws IOException {\n    FileInputStream fis = new FileInputStream(path);\n    int data = fis.read();\n    // Bug: fis is never closed if exception occurs\n}`,
    options: [
      "Invoke fis.close() immediately before calling the first fis.read()",
      "Make FileInputStream static so handles are reused by the JVM class",
      "Employ try-with-resources: try (FileInputStream fis = new ...) { }",
      "Rely entirely on JVM finalizers during asynchronous GC sweeps"
    ],
    correctOption: 2,
    explanation: "WHAT: OS resource descriptor leak. WHY: If reading throws an exception, `fis.close()` is never reached. Native file handles remain open until process termination. HOW: Use `try (FileInputStream fis = ...)`.",
    basePoints: 95,
    tags: ["java", "io", "try_with_resources"]
  },
  {
    id: "mem-05",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 4,
    title: "Lingering Event Listener on Global Window",
    description: "Adding window event listeners on component mount without removing them on unmount.",
    code: `function setupListener() {\n  const heavyData = new Array(1000000).fill("data");\n  window.addEventListener("resize", () => {\n    console.log(heavyData.length);\n  });\n}`,
    options: [
      "Retain named handler reference and call window.removeEventListener on cleanup",
      "Assume browser window event listeners are automatically freed on component unmount",
      "Switch resize event to click so closure scope variables are immediately collected",
      "Assign heavyData = null directly inside the recurring event callback body"
    ],
    correctOption: 0,
    explanation: "WHAT: Retained closure reference via global event listener. WHY: `window` keeps the listener function alive, which captures `heavyData` in its closure scope forever. HOW: Call `window.removeEventListener` on cleanup.",
    basePoints: 110,
    tags: ["javascript", "event_listeners", "closures"]
  },
  {
    id: "mem-06",
    mode: "memory_leak",
    language: "C++",
    difficulty: 4,
    title: "Mismatch delete vs delete[]",
    description: "Using scalar delete on an array allocated with new[] invokes undefined behavior and memory leaks.",
    code: `int* arr = new int[500];\n// ...\ndelete arr; // Bug: should be delete[]`,
    options: [
      "Use free(arr) to release primitive array allocations safely",
      "Execute delete[] arr; for dynamically allocated array buffers",
      "Pass pointer address delete &arr; to trigger compiler dealloc",
      "Assume scalar delete operates identically on primitive types"
    ],
    correctOption: 1,
    explanation: "WHAT: Mismatched deallocation operator. WHY: `new[]` requires `delete[]` so the runtime knows to destroy all array elements and deallocate the full array buffer header. HOW: Use `delete[] arr;`.",
    basePoints: 110,
    tags: ["cpp", "memory", "delete"]
  },
  {
    id: "mem-07",
    mode: "memory_leak",
    language: "Java",
    difficulty: 4,
    title: "Static Collection as Memory Accumulator",
    description: "Objects placed in a static List are never collected because static references are GC roots.",
    code: `public class MetricsManager {\n    public static final List<byte[]> SAMPLES = new ArrayList<>();\n    public void record(byte[] sample) {\n        SAMPLES.add(sample); // Never evicted!\n    }\n}`,
    options: [
      "Change static List to Set to prevent duplicate memory consumption",
      "Declare SAMPLES field private so it drops out of GC root tracking",
      "Implement eviction policy or weak references since static collections are GC roots",
      "Call SAMPLES.trimToSize() after every insertion to shrink buffer capacity"
    ],
    correctOption: 2,
    explanation: "WHAT: GC root retention leak. WHY: Static fields live for the entire JVM ClassLoader lifecycle. Appending data without eviction prevents garbage collection. HOW: Use bounded LRU cache or weak references.",
    basePoints: 110,
    tags: ["java", "gc", "static", "collections"]
  },
  {
    id: "mem-08",
    mode: "memory_leak",
    language: "Python",
    difficulty: 5,
    title: "Circular References with Custom __del__ Destructor",
    description: "In legacy Python (pre-3.4) or cyclic objects holding external resources, __del__ prevents cleanup.",
    code: `class Node:\n    def __init__(self):\n        self.neighbor = None\n    def __del__(self):\n        print("Destroyed")\n\na = Node()\nb = Node()\na.neighbor = b\nb.neighbor = a # Cyclic reference`,
    options: [
      "Call del a and del b simultaneously inside a tuple deletion statement",
      "Remove the __init__ constructor and assign attributes dynamically",
      "Break reference cycles using weakref.ref or weakref.proxy for back-pointers",
      "Convert Node class to a namedtuple to disable instance reference cycles"
    ],
    correctOption: 2,
    explanation: "WHAT: Cyclic object reference leak. WHY: Mutual references prevent immediate reference-count collection. HOW: Use `weakref` for back-pointers.",
    basePoints: 125,
    tags: ["python", "weakref", "cycles", "gc"]
  },
  {
    id: "mem-09",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 5,
    title: "Detached DOM Node Retention",
    description: "DOM elements removed from document are still referenced in a JavaScript array.",
    code: `const cache = [];\nfunction removeButton() {\n  const btn = document.getElementById("submit");\n  cache.push(btn); // Retains detached DOM node!\n  btn.remove();\n}`,
    options: [
      "Clear JavaScript array references to detached DOM nodes upon node removal",
      "Rely on btn.remove() to instantly destroy all JavaScript variable references",
      "Use btn.parentNode.removeChild(btn) which forces VRAM and heap collection",
      "Convert cache array to WeakSet without altering retained node references"
    ],
    correctOption: 0,
    explanation: "WHAT: Detached DOM tree leak. WHY: Even though `btn.remove()` removes it from the document, `cache.push(btn)` retains a reference in JS memory, preventing GC of the entire subtree. HOW: Clear the reference from `cache`.",
    basePoints: 125,
    tags: ["javascript", "dom", "memory_leak"]
  },
  {
    id: "mem-10",
    mode: "memory_leak",
    language: "C++",
    difficulty: 5,
    title: "Non-Virtual Destructor in Polymorphic Base Class",
    description: "Deleting a derived class object through a base pointer with non-virtual destructor skips derived destructor.",
    code: `class Base {\npublic:\n    ~Base() {} // Bug: not virtual\n};\nclass Derived : public Base {\n    int* data = new int[100];\npublic:\n    ~Derived() { delete[] data; }\n};\nBase* b = new Derived();\ndelete b; // Only calls ~Base(), data leaks!`,
    options: [
      "Cast pointer b to Derived* explicitly before executing scalar delete",
      "Declare base destructor as virtual: virtual ~Base() = default;",
      "Declare Derived destructor private so Base can invoke it directly",
      "Avoid inheriting from Base and use composition instead of polymorphism"
    ],
    correctOption: 1,
    explanation: "WHAT: Undefined polymorphic destruction. WHY: Deleting a derived object through a `Base*` when `~Base()` is non-virtual results in undefined behavior and skips `~Derived()`. HOW: Make `virtual ~Base() = default;`.",
    basePoints: 125,
    tags: ["cpp", "virtual", "destructor", "polymorphism"]
  },
  {
    id: "mem-11",
    mode: "memory_leak",
    language: "Java",
    difficulty: 6,
    title: "ThreadLocal Leak in Application Server Thread Pool",
    description: "ThreadLocal value set during HTTP request is not removed before thread returns to pool.",
    code: `public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {\n    UserContext.set(new User());\n    chain.doFilter(req, res);\n    // Bug: missing UserContext.remove() in finally block\n}`,
    options: [
      "ThreadLocal is automatically garbage collected when HTTP request completes",
      "Always call ThreadLocal.remove() inside a finally block when using thread pools",
      "Declare UserContext static final to let ClassLoader manage memory lifecycle",
      "Trigger Thread.currentThread().interrupt() at the end of the servlet filter"
    ],
    correctOption: 1,
    explanation: "WHAT: ThreadLocal leak on pooled threads. WHY: App server worker threads are reused across requests. Unremoved ThreadLocal values persist indefinitely and cause ClassLoader leaks. HOW: `try { ... } finally { UserContext.remove(); }`.",
    basePoints: 140,
    tags: ["java", "threadlocal", "threadpools"]
  },
  {
    id: "mem-12",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 6,
    title: "Unbounded Map vs WeakMap for Object Metadata",
    description: "Storing object associations in a regular Map prevents garbage collection of keys when objects are discarded.",
    code: `const metadata = new Map();\nfunction track(obj, info) {\n  metadata.set(obj, info); // Holds strong reference to obj!\n}`,
    options: [
      "Switch Map to standard plain Object to enable automatic key garbage collection",
      "Schedule metadata.delete(obj) with setTimeout to run after a fixed 5 minute delay",
      "Use WeakMap so object keys are held weakly and can be collected when discarded",
      "Convert object key into a unique string by invoking JSON.stringify(obj) internally"
    ],
    correctOption: 2,
    explanation: "WHAT: Strong key retention in Map. WHY: A regular `Map` maintains strong references to both keys and values. As long as the Map exists, neither is collected. HOW: Use `WeakMap`.",
    basePoints: 140,
    tags: ["javascript", "weakmap", "map", "gc"]
  },
  {
    id: "mem-13",
    mode: "memory_leak",
    language: "C++",
    difficulty: 6,
    title: "Exception Safety in Multi-Allocation Constructor",
    description: "If second allocation throws, first allocation is never freed.",
    code: `class DualBuffer {\n    int* buf1;\n    int* buf2;\npublic:\n    DualBuffer(size_t n) {\n        buf1 = new int[n];\n        buf2 = new int[n]; // If this throws std::bad_alloc, buf1 leaks!\n    }\n    ~DualBuffer() { delete[] buf1; delete[] buf2; }\n};`,
    options: [
      "Migrate members to std::vector<int> or std::unique_ptr<int[]> RAII types",
      "Wrap buf2 allocation in try/catch and invoke delete[] buf1 on failure",
      "Allocate memory using malloc instead of new to prevent bad_alloc throws",
      "Both A and B are valid exception-safe solutions for multi-resource initialization"
    ],
    correctOption: 3,
    explanation: "WHAT: Constructor exception leak. WHY: If a constructor throws, the object's destructor is NEVER called. Any resources acquired prior to the throw leak. HOW: Use RAII members (`std::vector` / `std::unique_ptr`) or function-try-block.",
    basePoints: 140,
    tags: ["cpp", "exception_safety", "raii"]
  },
  {
    id: "mem-14",
    mode: "memory_leak",
    language: "Python",
    difficulty: 7,
    title: "Cached Property Memory Accumulation on Transient Instances",
    description: "@functools.lru_cache on method holds strong reference to 'self', creating a leak.",
    code: `class Model:\n    @functools.lru_cache(maxsize=128)\n    def predict(self, x):\n        return x * 2\n# LRU cache retains 'self' across instance lifecycles!`,
    options: [
      "Avoid lru_cache on methods; use per-instance cache or @functools.cached_property",
      "Set maxsize=None on lru_cache to disable internal key eviction and retention",
      "Call predict.cache_clear() unconditionally inside instance __init__ constructor",
      "Convert Model class into a top-level module function taking raw model weights"
    ],
    correctOption: 0,
    explanation: "WHAT: Method lru_cache self-retention. WHY: `lru_cache` on a method stores `self` as the first argument in its global cache dictionary, preventing `Model` instances from ever being freed. HOW: Use per-instance caching or `cached_property`.",
    basePoints: 160,
    tags: ["python", "lru_cache", "methods", "gc"]
  },
  {
    id: "mem-15",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 7,
    title: "Closure Scope Sharing Across Sibling Functions",
    description: "Meteor/V8 closure leak: unused big variable retained because sibling closure shares context.",
    code: `let theThing = null;\nfunction replaceThing() {\n  const originalThing = theThing;\n  const unused = function () {\n    if (originalThing) console.log("hi");\n  };\n  theThing = {\n    longStr: new Array(1000000).join("*"),\n    someMethod: function () { console.log("hello"); }\n  };\n}`,
    options: [
      "Convert let theThing to const to enforce immutable lexical scope references",
      "Null out originalThing or avoid retaining its reference in the unused closure",
      "Remove someMethod property to allow the garbage collector to evict unused closures",
      "Trigger manual engine garbage collection by calling gc() after each assignment"
    ],
    correctOption: 1,
    explanation: "WHAT: Shared lexical environment closure leak. WHY: In V8, closures in the same scope share a lexical environment. `someMethod` shares context with `unused`, keeping `originalThing` alive forever in a linked chain. HOW: Clear reference `originalThing = null`.",
    basePoints: 160,
    tags: ["javascript", "closures", "v8", "meteor_leak"]
  },
  {
    id: "mem-16",
    mode: "memory_leak",
    language: "Java",
    difficulty: 7,
    title: "Inner Class Implicit Reference to Outer Class Instance",
    description: "Non-static inner class holds implicit reference to large outer class instance.",
    code: `public class HugeActivity {\n    private byte[] heavyData = new byte[50 * 1024 * 1024];\n    public Runnable createTask() {\n        return new Runnable() { // Anonymous inner class retains HugeActivity.this!\n            public void run() { System.out.println("Running"); }\n        };\n    }\n}`,
    options: [
      "Make heavyData field volatile so JVM GC can reclaim memory asynchronously",
      "Convert return type from Runnable to Callable to drop outer synthetic this reference",
      "Make task static class or static lambda so it avoids capturing outer instance reference",
      "Invoke System.gc() directly prior to returning anonymous inner class instance"
    ],
    correctOption: 2,
    explanation: "WHAT: Implicit outer instance retention. WHY: Non-static inner classes and anonymous classes carry a synthetic `this$0` reference to the enclosing object. HOW: Use `static class` or static method reference.",
    basePoints: 160,
    tags: ["java", "inner_classes", "memory_leak"]
  },
  {
    id: "mem-17",
    mode: "memory_leak",
    language: "C++",
    difficulty: 7,
    title: "Circular std::shared_ptr Reference in Observer Pattern",
    description: "Subject holds shared_ptr to Observer, Observer holds shared_ptr to Subject.",
    code: `class Observer;\nclass Subject {\n    std::vector<std::shared_ptr<Observer>> observers;\n};\nclass ConcreteObserver : public Observer {\n    std::shared_ptr<Subject> subject;\n};`,
    options: [
      "Use std::weak_ptr<Subject> inside ConcreteObserver to break reference cycle",
      "Replace smart pointers with raw unmanaged pointers without delete calls",
      "Enforce singleton pattern on Subject to keep ref count always at value 1",
      "Explicitly delete Subject object prior to deleting ConcreteObserver"
    ],
    correctOption: 0,
    explanation: "WHAT: Shared pointer reference cycle. WHY: Mutual shared ownership prevents ref count from ever hitting 0. HOW: Use `std::weak_ptr` for back-references.",
    basePoints: 160,
    tags: ["cpp", "smart_pointers", "observer"]
  },
  {
    id: "mem-18",
    mode: "memory_leak",
    language: "Python",
    difficulty: 8,
    title: "Traceback Frame Reference in Exception Object",
    description: "Storing exception object in a local variable or instance dictionary retains entire stack frame.",
    code: `try:\n    risky_operation()\nexcept Exception as e:\n    self.last_error = e # Retains e.__traceback__ and all local variables in call stack!`,
    options: [
      "Wrap self.last_error assignment inside an empty try/finally block",
      "Store str(e) or explicitly clear traceback: e.__traceback__ = None or del e",
      "Cast e to generic Exception(str(e)) without clearing traceback frames",
      "Switch handler to except BaseException to bypass stack frame capture"
    ],
    correctOption: 1,
    explanation: "WHAT: Traceback frame retention leak. WHY: `e.__traceback__` holds references to execution frames, which hold all local variables of all active functions in the stack. HOW: Save `str(e)` or clear `e.__traceback__ = None`.",
    basePoints: 175,
    tags: ["python", "exceptions", "traceback"]
  },
  {
    id: "mem-19",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 8,
    title: "WebSocket Connection Never Closed",
    description: "Single-page application connects to WebSockets on route change without closing previous ones.",
    code: `function setupLiveFeed(roomId) {\n  const ws = new WebSocket(\`wss://feed.com/\${roomId}\`);\n  ws.onmessage = handleMsg;\n  // Bug: socket is never closed on route exit\n}`,
    options: [
      "Assume WebSockets automatically close when client handles lose scope",
      "Change protocol prefix from wss:// to unencrypted ws:// protocol",
      "Invoke ws.close() in cleanup / route unmount hook to tear down socket",
      "Assign ws.onmessage = null and allow the socket to stay open forever"
    ],
    correctOption: 2,
    explanation: "WHAT: Lingering TCP/WebSocket network stream. WHY: Active sockets stay alive in the browser networking stack, keeping all attached callbacks and closures in memory. HOW: Call `ws.close()` on unmount.",
    basePoints: 175,
    tags: ["javascript", "websocket", "cleanup"]
  },
  {
    id: "mem-20",
    mode: "memory_leak",
    language: "Java",
    difficulty: 8,
    title: "JDBC Connection Pool Leak Missing Connection.close()",
    description: "Database connection borrowed from DataSource is not closed in finally block.",
    code: `Connection conn = dataSource.getConnection();\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery("SELECT * FROM users");\n// Bug: if exception occurs or query finishes, conn is never returned to pool`,
    options: [
      "Use try-with-resources: try (Connection conn = ...; Statement stmt = ...) { }",
      "Rely on pool driver idle detection to automatically reclaim unclosed connections",
      "Call dataSource.close() after each individual SQL executeQuery invocation",
      "Declare Connection variable static so instances are recycled across all threads"
    ],
    correctOption: 0,
    explanation: "WHAT: Database connection starvation. WHY: Pooled connections must be closed (`conn.close()`) to return them to the idle pool. Without try-with-resources, connection pool is quickly exhausted. HOW: Use `try (Connection conn = ...)`.",
    basePoints: 175,
    tags: ["java", "jdbc", "connection_pool"]
  },
  {
    id: "mem-21",
    mode: "memory_leak",
    language: "C++",
    difficulty: 8,
    title: "std::make_shared Single Control Block Allocation Deferral",
    description: "std::make_shared allocates object and control block in single contiguous chunk, deferring memory release if weak_ptr persists.",
    code: `// Large object (100MB) allocated with make_shared\nauto sp = std::make_shared<LargeObject>();\nstd::weak_ptr<LargeObject> wp = sp;\nsp.reset(); // Object destructor runs, but 100MB chunk cannot be freed until wp is also destroyed!`,
    options: [
      "Rely on make_shared since reset() automatically frees object heap memory",
      "Use std::shared_ptr<LargeObject>(new LargeObject()) when weak_ptrs outlive shared_ptrs",
      "Call wp.reset() automatically via compiler destructor inference",
      "Allocate memory using raw malloc and cast manually to std::shared_ptr"
    ],
    correctOption: 1,
    explanation: "WHAT: Weak_ptr memory retention with `make_shared`. WHY: `make_shared` combines object and control block in one allocation. Memory cannot be `free`'d until weak count reaches 0. HOW: Use `std::shared_ptr<T>(new T())` for large objects with long-lived weak pointers.",
    basePoints: 175,
    tags: ["cpp", "make_shared", "smart_pointers", "memory"]
  },
  {
    id: "mem-22",
    mode: "memory_leak",
    language: "Python",
    difficulty: 9,
    title: "Generator State Retention on Partial Iteration",
    description: "Generator holding large frame variables is partially consumed and abandoned without close().",
    code: `def stream_file(path):\n    large_buffer = bytearray(100 * 1024 * 1024)\n    yield large_buffer[:10]\n    # Generator suspended here\n\ngen = stream_file('data.bin')\nfirst_chunk = next(gen)\n# gen remains in memory holding large_buffer!`,
    options: [
      "Assume generators auto-close after 1 second of inactivity",
      "Delete first_chunk variable immediately after consuming first element",
      "Call gen.close() or use contextlib.closing(gen) to release generator frame",
      "Convert bytearray to str to permit automated garbage collection"
    ],
    correctOption: 2,
    explanation: "WHAT: Suspended generator frame retention. WHY: An active generator holds its entire local frame (including `large_buffer`) alive until exhausted or garbage collected. HOW: Call `gen.close()`.",
    basePoints: 190,
    tags: ["python", "generators", "frames"]
  },
  {
    id: "mem-23",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 9,
    title: "Worker Terminate Missing on Dedicated Web Worker",
    description: "Spawning Web Workers dynamically without calling worker.terminate().",
    code: `function computeHash(data) {\n  const worker = new Worker('worker.js');\n  worker.postMessage(data);\n  worker.onmessage = (e) => {\n    handleResult(e.data);\n    // Bug: worker process stays alive indefinitely\n  };\n}`,
    options: [
      "Call worker.terminate() after receiving result or reuse a worker pool",
      "Assume Web Workers terminate automatically once onmessage callback finishes",
      "Assign worker = null inside onmessage to force background thread cleanup",
      "Execute worker.close() directly on main window thread instance handle"
    ],
    correctOption: 0,
    explanation: "WHAT: Unbounded Web Worker OS thread leak. WHY: Web Workers run in dedicated background threads and persist until explicitly terminated with `worker.terminate()`. HOW: Terminate or reuse via worker pool.",
    basePoints: 190,
    tags: ["javascript", "web_workers", "concurrency"]
  },
  {
    id: "mem-24",
    mode: "memory_leak",
    language: "Java",
    difficulty: 9,
    title: "ClassLoader Leak from Custom Thread in Webapp Context",
    description: "Starting an unmanaged java.lang.Thread in a WAR webapp keeps WebappClassLoader pinned.",
    code: `public void contextInitialized(ServletContextEvent sce) {\n    new Thread(() -> {\n        while (true) { /* background work */ }\n    }).start(); // Pinches WebappClassLoader from being garbage collected on undeploy!\n}`,
    options: [
      "Shut down managed ExecutorService in contextDestroyed() or mark thread as daemon",
      "Lower thread priority to Thread.MIN_PRIORITY so garbage collector can kill it",
      "Set context thread group name to null to detach it from web application scope",
      "Call Thread.yield() inside the while loop to permit background class unloading"
    ],
    correctOption: 0,
    explanation: "WHAT: Tomcat / JVM ClassLoader leak. WHY: A running thread holds its ContextClassLoader, pinning all classes, static singletons, and bytecodes in Metaspace across hot redeploys. HOW: Shut down executors in `contextDestroyed` or use daemon threads.",
    basePoints: 190,
    tags: ["java", "classloader", "metaspace"]
  },
  {
    id: "mem-25",
    mode: "memory_leak",
    language: "C++",
    difficulty: 9,
    title: "Ring Buffer Overwrite without Proper Node Destruction",
    description: "Custom circular buffer overwrites elements without calling explicit destructor on displaced elements.",
    code: `template<typename T>\nvoid RingBuffer<T>::push(const T& val) {\n    // Overwrites slot in raw memory without destroying previous object!\n    new (&buffer[tail]) T(val);\n    tail = (tail + 1) % N;\n}`,
    options: [
      "Call free(&buffer[tail]) immediately before invoking placement new",
      "Reallocate buffer memory using std::realloc on every push operation",
      "Call buffer[tail].~T() or use copy assignment depending on initialization",
      "Replace placement new with scalar malloc assignment to bypass destructors"
    ],
    correctOption: 2,
    explanation: "WHAT: Placement new overwrite leak. WHY: Constructing into an already initialized slot without invoking `~T()` causes any heap resources owned by the previous object to leak. HOW: Call `buffer[tail].~T()` or use copy assignment.",
    basePoints: 190,
    tags: ["cpp", "placement_new", "destructors", "ring_buffer"]
  },
  {
    id: "mem-26",
    mode: "memory_leak",
    language: "Python",
    difficulty: 10,
    title: "C-Extension Py_INCREF / Py_DECREF Imbalance",
    description: "Custom Python C-extension increments reference count without matching DECREF.",
    code: `static PyObject* get_item(PyObject* self, PyObject* args) {\n    PyObject* list = PyList_New(10);\n    Py_INCREF(list); // Redundant INCREF\n    return list; // PyList_New already returns a new strong reference!\n}`,
    options: [
      "Add Py_DECREF(self) to compensate for the additional list reference count",
      "Remove Py_INCREF(list); PyList_New already returns a new strong reference",
      "Treat PyList_New return value as borrowed reference and increment twice",
      "Return Py_None instead of list to let runtime collect allocated buffer"
    ],
    correctOption: 1,
    explanation: "WHAT: Python C-API reference leak. WHY: `PyList_New` returns a new reference with refcount 1. Extra `Py_INCREF` sets refcount to 2, so when Python caller drops reference, count never reaches 0. HOW: Return `list` directly.",
    basePoints: 200,
    tags: ["python", "c_extension", "cpython", "refcount"]
  },
  {
    id: "mem-27",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 10,
    title: "Canvas 2D / WebGL Texture Context Retention",
    description: "Creating WebGL textures in animation loop without gl.deleteTexture().",
    code: `function updateTexture(gl, image) {\n  const texture = gl.createTexture();\n  gl.bindTexture(gl.TEXTURE_2D, texture);\n  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);\n  // Bug: old textures are never deleted from GPU VRAM\n}`,
    options: [
      "Assume GPU VRAM textures are automatically collected every animation frame",
      "Assign texture = null so JavaScript engine communicates with GPU driver",
      "Reuse existing texture or call gl.deleteTexture(texture) to free GPU VRAM",
      "Invoke gl.finish() to force immediate deallocation of all bound textures"
    ],
    correctOption: 2,
    explanation: "WHAT: GPU Video RAM (VRAM) leak. WHY: WebGL resources (textures, buffers, shaders) reside in GPU memory outside JS garbage collector control. HOW: Call `gl.deleteTexture(texture)` or update existing texture with `texSubImage2D`.",
    basePoints: 200,
    tags: ["javascript", "webgl", "gpu", "vram"]
  },
  {
    id: "mem-28",
    mode: "memory_leak",
    language: "Java",
    difficulty: 10,
    title: "DirectByteBuffer Off-Heap Allocation Leak",
    description: "Allocating ByteBuffer.allocateDirect() repeatedly exhausts native process memory before triggering JVM GC.",
    code: `public void processChunk(byte[] data) {\n    ByteBuffer directBuf = ByteBuffer.allocateDirect(100 * 1024 * 1024);\n    directBuf.put(data);\n    // Direct buffers are only freed when GC runs, but off-heap pressure doesn't trigger heap GC!\n}`,
    options: [
      "Use pooled byte buffers (e.g. Netty ByteBuf) or manage direct buffer lifecycle",
      "Rely on JVM young generation garbage collection sweeps to clear native RAM",
      "Invoke directBuf.clear() to immediately release operating system native memory",
      "Increase -Xmx heap limit to provide additional space for native direct buffers"
    ],
    correctOption: 0,
    explanation: "WHAT: Off-heap memory exhaustion. WHY: DirectByteBuffers allocate native memory. JVM heap garbage collection is only triggered by heap pressure, leading to out-of-memory in native RAM before heap GC runs. HOW: Use buffer pools.",
    basePoints: 200,
    tags: ["java", "nio", "off_heap", "direct_buffer"]
  },
  {
    id: "mem-29",
    mode: "memory_leak",
    language: "C++",
    difficulty: 10,
    title: "mmap Anonymous Memory Without Matching munmap",
    description: "High-performance allocator maps pages with mmap but loses track of buffer size for munmap.",
    code: `void* mem = mmap(nullptr, size, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);\n// When freeing:\nmunmap(mem, 0); // Bug: length 0 fails and leaves pages mapped!`,
    options: [
      "Assume mapped anonymous virtual pages are released automatically upon return",
      "Pass allocated buffer size: munmap(mem, size) to unmap virtual pages cleanly",
      "Invoke standard free(mem) which queries internal virtual page table headers",
      "Call munmap passing single pointer argument without specifying buffer size"
    ],
    correctOption: 1,
    explanation: "WHAT: Virtual memory page leak. WHY: `munmap` requires the exact length of the mapped region. Passing 0 returns an error (`EINVAL`), leaving pages mapped in the process address space. HOW: Track and pass `size` to `munmap`.",
    basePoints: 200,
    tags: ["cpp", "mmap", "virtual_memory", "posix"]
  },
  {
    id: "mem-30",
    mode: "memory_leak",
    language: "JavaScript",
    difficulty: 10,
    title: "FinalizationRegistry CleanUp Callback Holding Strong Target Reference",
    description: "Passing the target object into unregister token or registration value prevents garbage collection.",
    code: `const registry = new FinalizationRegistry(heldValue => {\n  console.log("Cleaned:", heldValue);\n});\nfunction registerObject(obj) {\n  // Bug: passing obj inside heldValue closure or heldValue itself!\n  registry.register(obj, { target: obj });\n}`,
    options: [
      "FinalizationRegistry instances reject non-primitive values as target tokens",
      "Ensure heldValue does not retain a strong reference to target obj object",
      "Convert FinalizationRegistry to WeakRef to allow synchronous finalization",
      "Execute registry.register synchronously inside the target object constructor"
    ],
    correctOption: 1,
    explanation: "WHAT: FinalizationRegistry target pinning. WHY: If `heldValue` references `target`, the registry holds `target` strongly, completely defeating garbage collection and preventing finalizer execution. HOW: Keep `heldValue` independent of `target`.",
    basePoints: 200,
    tags: ["javascript", "finalization_registry", "weakref", "gc"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MEMORY_LEAK_BANK };
}
