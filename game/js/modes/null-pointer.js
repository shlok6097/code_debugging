/**
 * Code Debugger - Mode 9: Null Pointer (30 Challenges)
 * Null pointer dereference, undefined property access, missing optional chaining, uninitialized pointers across Python, C++, Java, JS.
 */

const NULL_POINTER_BANK = [
  {
    id: "null-01",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 2,
    title: "Cannot Read Properties of Undefined",
    description: "Accessing nested object property throws TypeError: Cannot read properties of undefined.",
    code: `const user = { name: "Alice" };\nconsole.log(user.profile.avatar);`,
    options: [
      "Convert user object into an indexed array structure",
      "Employ optional chaining: user.profile?.avatar",
      "Access properties using bracket syntax user['profile']['avatar']",
      "Place 'use strict' at the top of the file to auto-initialize"
    ],
    correctOption: 1,
    explanation: "WHAT: Dereferencing undefined nested object. WHY: `user.profile` is `undefined`, so accessing `.avatar` throws a TypeError. HOW: Use optional chaining `user.profile?.avatar` or guard with `user.profile && user.profile.avatar`.",
    basePoints: 85,
    tags: ["javascript", "optional_chaining", "undefined"]
  },
  {
    id: "null-02",
    mode: "null_pointer",
    language: "Java",
    difficulty: 2,
    title: "String Literal Equals on Null Variable",
    description: "Calling name.equals(\"ADMIN\") throws NullPointerException when name is null.",
    code: `String name = null;\nif (name.equals("ADMIN")) {\n    System.out.println("Access granted");\n}`,
    options: [
      "Use \"ADMIN\".equals(name) or Objects.equals(name, \"ADMIN\")",
      "Change name.equals to reference identity check name == \"ADMIN\"",
      "Cast name to (Object) name before invoking the equality method",
      "Initialize name with empty string quotes to satisfy the compiler"
    ],
    correctOption: 0,
    explanation: "WHAT: Invoking instance method on null. WHY: `name` is null, so calling `.equals()` throws NPE. HOW: Yoda conditions `\"ADMIN\".equals(name)` or `Objects.equals(name, \"ADMIN\")` safely handle nulls.",
    basePoints: 85,
    tags: ["java", "nullpointer", "strings"]
  },
  {
    id: "null-03",
    mode: "null_pointer",
    language: "Python",
    difficulty: 2,
    title: "AttributeError on None",
    description: "Function returns None on missing item; caller attempts to call upper() on result.",
    code: `def get_user_role(user_id):\n    if user_id > 100:\n        return "admin"\n    # implicitly returns None\n\nrole = get_user_role(50)\nprint(role.upper()) # AttributeError: 'NoneType' object has no attribute 'upper'`,
    options: [
      "Cast role directly using str(role.upper()) prior to printing",
      "Replace method call upper() with capitalize() for string safety",
      "Guard with: if role: print(role.upper()) or return a default string",
      "Change the implicit None return into a boolean False literal"
    ],
    correctOption: 2,
    explanation: "WHAT: Calling method on `None`. WHY: `get_user_role(50)` falls through to return `None`, which has no `upper` method. HOW: Check `if role:` or return a default string.",
    basePoints: 85,
    tags: ["python", "none", "attribute_error"]
  },
  {
    id: "null-04",
    mode: "null_pointer",
    language: "C++",
    difficulty: 3,
    title: "Unchecked Pointer Dereference",
    description: "Function receives a pointer that may be nullptr and dereferences without checking.",
    code: `void printScore(int* scorePtr) {\n    std::cout << "Score: " << *scorePtr << std::endl;\n}\nint main() {\n    printScore(nullptr); // Crash!\n}`,
    options: [
      "Convert parameter type to int& without verifying call site references",
      "Cast scorePtr to raw (void*) pointer before outputting to stream",
      "Dereference pointer with address-of &scorePtr operator syntax",
      "Check: if (scorePtr != nullptr) before dereferencing the pointer"
    ],
    correctOption: 3,
    explanation: "WHAT: Dereferencing nullptr. WHY: `*scorePtr` when `scorePtr == nullptr` causes immediate segmentation fault. HOW: Check `if (scorePtr != nullptr)` or pass by reference if null is invalid.",
    basePoints: 95,
    tags: ["cpp", "pointers", "nullptr"]
  },
  {
    id: "null-05",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 3,
    title: "Array find() Returning Undefined",
    description: "Array.find() returns undefined when no match is found, causing immediate crash on property read.",
    code: `const users = [{ id: 1, name: "Sam" }];\nconst found = users.find(u => u.id === 2);\nconsole.log(found.name);`,
    options: [
      "Check: console.log(found?.name || 'Not found') with optional chaining",
      "Switch .find to .filter which always returns a defined element object",
      "Assume array .find() method returns an empty default literal object",
      "Change identity comparison u.id === 2 to loose type match u.id == '2'"
    ],
    correctOption: 0,
    explanation: "WHAT: Unchecked `.find()` return. WHY: When no element matches predicate, `.find()` returns `undefined`. HOW: Use optional chaining `found?.name`.",
    basePoints: 95,
    tags: ["javascript", "arrays", "find"]
  },
  {
    id: "null-06",
    mode: "null_pointer",
    language: "Java",
    difficulty: 3,
    title: "Unboxing Null Wrapper Object",
    description: "Automatic unboxing of a null Integer wrapper to primitive int throws NullPointerException.",
    code: `Integer count = null;\nint total = count + 5; // Throws NullPointerException!`,
    options: [
      "Change primitive type from int to double to permit null arithmetic",
      "Check if count != null or use ternary: count != null ? count : 0",
      "Cast count directly using (int) count to trigger primitive conversion",
      "Declare count as primitive int since Integer wrapper cannot be null"
    ],
    correctOption: 1,
    explanation: "WHAT: Null autounboxing crash. WHY: `count + 5` invokes `count.intValue()`, which fails with NPE when `count` is null. HOW: Guard against null or use default fallback `count != null ? count : 0`.",
    basePoints: 95,
    tags: ["java", "autoboxing", "primitives"]
  },
  {
    id: "null-07",
    mode: "null_pointer",
    language: "Python",
    difficulty: 4,
    title: "Dictionary .get() vs Direct Key Indexing",
    description: "Accessing config['timeout'] raises KeyError when optional key is omitted.",
    code: `config = {"retries": 3}\ntimeout = config["timeout"] # KeyError!`,
    options: [
      "Use dictionary fallback lookup: config.get('timeout', 30)",
      "Use nullish coalescing operator config['timeout'] ?? 30 in Python",
      "Initialize config dictionary with empty string key definitions",
      "Catch IndexError exception block around the direct dictionary lookup"
    ],
    correctOption: 0,
    explanation: "WHAT: KeyError on missing map key. WHY: Bracket lookup `config['timeout']` throws KeyError if key does not exist. HOW: Use `.get('timeout', default)`.",
    basePoints: 110,
    tags: ["python", "dict", "get"]
  },
  {
    id: "null-08",
    mode: "null_pointer",
    language: "C++",
    difficulty: 4,
    title: "Returning Address of Local Stack Variable",
    description: "Function returns pointer to stack memory that is invalidated upon return.",
    code: `int* createValue() {\n    int val = 42;\n    return &val; // Bug: dangling pointer\n}`,
    options: [
      "Mark local variable as const to prevent memory invalidation on exit",
      "Allocate dynamically: return new int(42); or return by value int",
      "Cast address &val to raw (int*) before returning from the function",
      "Return pointer as (void*) to bypass stack lifetime compiler checks"
    ],
    correctOption: 1,
    explanation: "WHAT: Dangling stack pointer. WHY: Stack frame for `createValue` is destroyed on return; accessing the returned address is undefined behavior. HOW: Return by value `int` or allocate on heap.",
    basePoints: 110,
    tags: ["cpp", "pointers", "stack"]
  },
  {
    id: "null-09",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 4,
    title: "DOM QuerySelector Null Handling",
    description: "Calling addEventListener on querySelector result before DOM loaded throws error.",
    code: `const btn = document.querySelector("#submit-btn");\nbtn.addEventListener("click", () => {});`,
    options: [
      "Assume document.querySelector always guarantees a non-null DOM node",
      "Change querySelector to getElementById without the hash # character",
      "Guard: if (btn) btn.addEventListener(...) or defer script execution",
      "Assign btn.onclick = null before calling addEventListener on element"
    ],
    correctOption: 2,
    explanation: "WHAT: Null DOM element reference. WHY: If element `#submit-btn` is not in DOM when script executes, `querySelector` returns `null`. HOW: Check `if (btn)` or use `DOMContentLoaded` / `defer`.",
    basePoints: 110,
    tags: ["javascript", "dom", "null"]
  },
  {
    id: "null-10",
    mode: "null_pointer",
    language: "Java",
    difficulty: 5,
    title: "Optional.get() without isPresent()",
    description: "Calling optional.get() on empty Optional throws NoSuchElementException.",
    code: `Optional<String> opt = Optional.empty();\nString value = opt.get(); // Throws NoSuchElementException!`,
    options: [
      "Cast opt instance directly to (String) opt to bypass Optional container",
      "Assume Optional.empty() produces a standard Java primitive null value",
      "Extract safely using opt.orElse(\"default\") or opt.ifPresent(...)",
      "Invoke opt.toString() to convert empty container into an empty String"
    ],
    correctOption: 2,
    explanation: "WHAT: Unchecked Optional extraction. WHY: `.get()` on an empty Optional throws `NoSuchElementException`. HOW: Use `.orElse('default')` or `.orElseThrow(...)`.",
    basePoints: 125,
    tags: ["java", "optional", "null_safety"]
  },
  {
    id: "null-11",
    mode: "null_pointer",
    language: "C++",
    difficulty: 5,
    title: "std::unique_ptr Moved State Dereference",
    description: "Dereferencing unique_ptr after std::move leaves it in nullptr state.",
    code: `std::unique_ptr<int> p1 = std::make_unique<int>(100);\nstd::unique_ptr<int> p2 = std::move(p1);\nstd::cout << *p1 << std::endl; // Crash: p1 is nullptr!`,
    options: [
      "std::move transfers ownership leaving p1 empty; do not dereference p1 after move",
      "std::move duplicates heap memory while maintaining valid pointers in both objects",
      "Pointer target p2 must be deleted explicitly before accessing moved pointer p1",
      "Invoke method *p1.get() to safely bypass smart pointer move validation checks"
    ],
    correctOption: 0,
    explanation: "WHAT: Use-after-move. WHY: Moving a `unique_ptr` transfers resource ownership to `p2` and resets `p1` to `nullptr`. HOW: Use `p2` or avoid moving if `p1` is still needed.",
    basePoints: 125,
    tags: ["cpp", "unique_ptr", "move_semantics"]
  },
  {
    id: "null-12",
    mode: "null_pointer",
    language: "Python",
    difficulty: 5,
    title: "Chained Method on In-Place Sorting Method",
    description: "list.sort() returns None, causing AttributeError on chained call.",
    code: `data = [3, 1, 2]\nsorted_data = data.sort().reverse() # AttributeError: 'NoneType' object has no attribute 'reverse'`,
    options: [
      "Change method invocation syntax from data.sort() to data.sorted()",
      "Convert the input list data into an immutable tuple prior to sorting",
      "Pass data as argument to reverse() rather than calling it as a method",
      "data.sort() returns None; use sorted(data) or separate statements"
    ],
    correctOption: 3,
    explanation: "WHAT: In-place method returning None. WHY: Python's `list.sort()` mutates the list and returns `None`. Chaining `.reverse()` fails on `None`. HOW: Use `data.sort(); data.reverse()` or `sorted()`.",
    basePoints: 125,
    tags: ["python", "methods", "mutability"]
  },
  {
    id: "null-13",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 6,
    title: "Destructuring Undefined Function Parameter",
    description: "Destructuring properties from options parameter throws TypeError when no argument is passed.",
    code: `function setup({ host, port }) {\n  console.log(host, port);\n}\nsetup(); // TypeError: Cannot destructure property 'host' of undefined`,
    options: [
      "Rename destructured variables host, port to rest parameter ...args",
      "Provide default empty object: function setup({ host, port } = {})",
      "Require callers to pass setup(null) instead of undefined arguments",
      "Convert setup from function declaration to arrow function expression"
    ],
    correctOption: 1,
    explanation: "WHAT: Destructuring undefined argument. WHY: Calling `setup()` passes `undefined`, and destructuring `undefined` throws TypeError. HOW: Default parameter `({ host, port } = {})`.",
    basePoints: 140,
    tags: ["javascript", "destructuring", "parameters"]
  },
  {
    id: "null-14",
    mode: "null_pointer",
    language: "Java",
    difficulty: 6,
    title: "HashMap getOrDefault with Explicit Null Value",
    description: "Map contains key with value null; getOrDefault returns null instead of fallback.",
    code: `Map<String, String> map = new HashMap<>();\nmap.put("theme", null);\nString theme = map.getOrDefault("theme", "dark");\nSystem.out.println(theme.toUpperCase()); // NullPointerException!`,
    options: [
      "getOrDefault only triggers on missing keys; check theme != null explicitly",
      "map.put(\"theme\", null) throws IllegalArgumentException in standard Java",
      "Replace method getOrDefault with map.get() to force default resolution",
      "Migrate collection from standard HashMap to ConcurrentHashMap instance"
    ],
    correctOption: 0,
    explanation: "WHAT: Present key with null value trap. WHY: `getOrDefault` checks `containsKey(key)`. Since key exists, it returns the stored `null`, leading to NPE. HOW: Check `theme != null ? theme : default`.",
    basePoints: 140,
    tags: ["java", "hashmap", "null"]
  },
  {
    id: "null-15",
    mode: "null_pointer",
    language: "C++",
    difficulty: 6,
    title: "std::map Operator[] Default Construction vs find()",
    description: "Accessing map of pointers with operator[] inserts nullptr if key is absent.",
    code: `std::map<int, Widget*> widgets;\n// Widget for id 5 was not added\nwidgets[5]->render(); // Crash: widgets[5] created as nullptr!`,
    options: [
      "Use widgets.at(5) which will auto-instantiate the Widget pointer instance",
      "operator[] inserts nullptr for pointer values; use find() and check != end()",
      "The widgets map must be pre-populated with default static dummy widgets",
      "Change map value definition from pointer Widget* to reference Widget&"
    ],
    correctOption: 1,
    explanation: "WHAT: Implicit insertion of nullptr. WHY: `map[key]` automatically default-initializes pointer values to `nullptr` when key is absent. Dereferencing it crashes. HOW: Use `auto it = map.find(key); if (it != map.end() && it->second)`.",
    basePoints: 140,
    tags: ["cpp", "map", "pointers"]
  },
  {
    id: "null-16",
    mode: "null_pointer",
    language: "Python",
    difficulty: 7,
    title: "Default Mutable Parameter Replaced with None",
    description: "Idiomatic default argument check missing is None comparison.",
    code: `def append_item(val, items=None):\n    if not items: # Bug: empty list [] also evaluates False!\n        items = []\n    items.append(val)\n    return items`,
    options: [
      "Change function signature parameter definition from items=None to items=[]",
      "Check length using if len(items) == 0: before creating a new list instance",
      "Use 'if items is None:' instead of 'if not items:' to preserve empty lists",
      "Replace list mutation items.append(val) with list concatenation items + [val]"
    ],
    correctOption: 2,
    explanation: "WHAT: Falsy check vs identity check. WHY: If caller passes `items=[]`, `if not items:` evaluates true and discards caller's list. HOW: Always check `if items is None:`.",
    basePoints: 160,
    tags: ["python", "default_arguments", "none"]
  },
  {
    id: "null-17",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 7,
    title: "Nullish Coalescing vs Logical OR for 0 / false",
    description: "Using || operator overrides legitimate falsy values (0, false, '') with default.",
    code: `function setVolume(vol) {\n  // vol = 0 (mute) is overridden to 50!\n  const volume = vol || 50;\n  return volume;\n}`,
    options: [
      "Use logical AND short-circuit operator: const volume = vol && 50",
      "Convert vol parameter explicitly via Boolean(vol) type casting check",
      "Use nullish coalescing operator: const volume = vol ?? 50",
      "Use strict equality check vol !== null ? vol : 50 ignoring undefined"
    ],
    correctOption: 2,
    explanation: "WHAT: Falsy override bug. WHY: `0 || 50` evaluates to 50 because 0 is falsy. HOW: Use `vol ?? 50` which only falls back on `null` or `undefined`.",
    basePoints: 160,
    tags: ["javascript", "nullish_coalescing", "operators"]
  },
  {
    id: "null-18",
    mode: "null_pointer",
    language: "Java",
    difficulty: 7,
    title: "Comparator.comparing with Null Fields",
    description: "Sorting a list of objects by a nullable field throws NullPointerException in Comparator.",
    code: `List<User> users = ...;\nusers.sort(Comparator.comparing(User::getEmail)); // NPE if any user has null email!`,
    options: [
      "Use Comparator.comparing(User::getEmail, Comparator.nullsLast(String::compareTo))",
      "Replace standard sort method invocation with Collections.shuffle(users)",
      "Cast email return value explicitly to generic (Object) in extractor lambda",
      "Filter out user entities with non-null emails prior to initiating sorting"
    ],
    correctOption: 0,
    explanation: "WHAT: Unhandled null in key extractor comparator. WHY: Standard `Comparator.comparing` invokes `.compareTo()` on the extracted key, which crashes on null. HOW: Wrap comparator with `Comparator.nullsLast(...)` or `nullsFirst(...)`.",
    basePoints: 160,
    tags: ["java", "comparator", "null_safety"]
  },
  {
    id: "null-19",
    mode: "null_pointer",
    language: "C++",
    difficulty: 8,
    title: "std::weak_ptr lock() Unchecked Dereference",
    description: "Calling lock() on expired weak_ptr returns nullptr shared_ptr which is dereferenced.",
    code: `std::weak_ptr<Resource> wp = sp;\nsp.reset(); // Resource destroyed\nwp.lock()->doWork(); // Crash: wp.lock() returned empty shared_ptr!`,
    options: [
      "Assume wp.lock() throws a bad_weak_ptr exception when referent expires",
      "Capture and guard: if (auto locked = wp.lock()) { locked->doWork(); }",
      "weak_ptr guarantees the target resource cannot expire while in scope",
      "Call wp.expired() followed by immediate unchecked wp.lock()->doWork()"
    ],
    correctOption: 1,
    explanation: "WHAT: Dereferencing expired weak_ptr. WHY: `wp.lock()` returns `nullptr` when the underlying resource is destroyed. HOW: Capture with `if (auto sp = wp.lock()) { sp->doWork(); }`.",
    basePoints: 175,
    tags: ["cpp", "weak_ptr", "smart_pointers"]
  },
  {
    id: "null-20",
    mode: "null_pointer",
    language: "Python",
    difficulty: 8,
    title: "Decorated Function Missing Return Value",
    description: "Decorator executes wrapped function but forgets to return result, returning None to caller.",
    code: `def log_call(func):\n    def wrapper(*args, **kwargs):\n        print("Calling", func.__name__)\n        func(*args, **kwargs) # Bug: missing return!\n    return wrapper`,
    options: [
      "Convert wrapper declaration from synchronous def to async def coroutine",
      "Apply @functools.wraps decorator without adding any return statement",
      "Add explicit return statement: return func(*args, **kwargs)",
      "Return the uninvoked func reference directly instead of returning wrapper"
    ],
    correctOption: 2,
    explanation: "WHAT: Dropped return value in decorator. WHY: `wrapper` calls `func` but does not return its output, so decorated calls return `None`. HOW: `return func(*args, **kwargs)`.",
    basePoints: 175,
    tags: ["python", "decorators", "functions"]
  },
  {
    id: "null-21",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 8,
    title: "Optional Chaining with Function Invocation Parentheses",
    description: "Calling an optional callback function fails when callback is undefined.",
    code: `function doTask(onComplete) {\n  // Bug: onComplete?.() syntax vs onComplete()?\n  onComplete();\n}`,
    options: [
      "Check callback parameter using typeof onComplete === 'object' condition",
      "Invoke method via reflective onComplete.call(this) execution context",
      "Assign default parameter value onComplete = null in function header",
      "Execute callback with optional invocation syntax: onComplete?.()"
    ],
    correctOption: 3,
    explanation: "WHAT: Unchecked function execution. WHY: If caller passes no argument, `onComplete` is `undefined`, and `onComplete()` throws TypeError. HOW: Use `onComplete?.()`.",
    basePoints: 175,
    tags: ["javascript", "functions", "optional_chaining"]
  },
  {
    id: "null-22",
    mode: "null_pointer",
    language: "Java",
    difficulty: 8,
    title: "Stream findFirst on Filtered Empty Collection",
    description: "Extracting result from findFirst().get() after filtering out all matches.",
    code: `List<String> names = Arrays.asList("Bob", "Charlie");\nString alice = names.stream()\n    .filter(n -> n.equals("Alice"))\n    .findFirst()\n    .get(); // Throws NoSuchElementException!`,
    options: [
      "Use safe terminal extractor: .orElse(null) or .orElseThrow(NotFoundException::new)",
      "Assume filter() guarantees at least one matching element remains in pipeline",
      "Replace findFirst() with findAny() which returns null on empty streams",
      "Convert stream pipeline from names.stream() to names.parallelStream()"
    ],
    correctOption: 0,
    explanation: "WHAT: Dangerous `.get()` on empty stream search. WHY: If no element matches filter, `findFirst()` yields `Optional.empty()`. HOW: Use `.orElse(null)` or check `.isPresent()`.",
    basePoints: 175,
    tags: ["java", "streams", "optional"]
  },
  {
    id: "null-23",
    mode: "null_pointer",
    language: "C++",
    difficulty: 9,
    title: "Vtable / Virtual Call on Null Pointer",
    description: "Invoking virtual method on null object pointer triggers segmentation fault in vtable lookup.",
    code: `struct Base { virtual void speak() = 0; };\nBase* b = nullptr;\nb->speak(); // Crash!`,
    options: [
      "Remove virtual keyword from speak() declaration in Base definition",
      "Virtual dispatch reads object vptr; ensure b points to valid instance",
      "Base class must implement non-pure dummy body for speak() method",
      "Cast pointer to raw void* before invoking polymorphic method call"
    ],
    correctOption: 1,
    explanation: "WHAT: Virtual dispatch crash. WHY: Calling a virtual method requires reading the object's `vptr`. Dereferencing `nullptr` for the vptr table causes immediate crash. HOW: Ensure pointer is non-null before dispatch.",
    basePoints: 190,
    tags: ["cpp", "virtual", "vtable", "nullptr"]
  },
  {
    id: "null-24",
    mode: "null_pointer",
    language: "Python",
    difficulty: 9,
    title: "Weakref Dereference after Referent Deletion",
    description: "Dereferencing weakref.ref() returns None once garbage collector reclaims object.",
    code: `import weakref\nclass Heavy:\n    pass\nobj = Heavy()\nr = weakref.ref(obj)\ndel obj\nprint(r().some_attribute) # AttributeError: 'NoneType' object has no attribute`,
    options: [
      "weakref keeps the target object alive until reference count reaches -1",
      "Replace callable invocation r() with method call r.get() attribute",
      "Weakref call r() returns None on collection; check target = r(); if target:",
      "Replace statement del obj with assignment obj = None in local scope"
    ],
    correctOption: 2,
    explanation: "WHAT: Dead weakref access. WHY: `r()` returns `None` after the referenced object is garbage collected. HOW: Check `deref = r(); if deref is not None: ...`.",
    basePoints: 190,
    tags: ["python", "weakref", "gc"]
  },
  {
    id: "null-25",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 9,
    title: "JSON.parse on 'null' vs 'undefined'",
    description: "JSON.parse('null') returns null, bypassing object truthiness assumptions.",
    code: `const data = JSON.parse(localStorage.getItem("settings")); // returns null if key missing\nconsole.log(data.theme); // TypeError: Cannot read properties of null`,
    options: [
      "Guard with null check or default object fallback: (data ?? {}).theme",
      "JSON.parse throws SyntaxError whenever input string equals 'null'",
      "Migrate storage access from localStorage to sessionStorage namespace",
      "Access properties using bracket notation data['theme'] to avoid errors"
    ],
    correctOption: 0,
    explanation: "WHAT: Parsing null into primitive null. WHY: If storage key is missing, `localStorage.getItem` returns `null`, and `JSON.parse(null)` returns `null`. HOW: `const data = JSON.parse(...) || {};`.",
    basePoints: 190,
    tags: ["javascript", "json", "localstorage"]
  },
  {
    id: "null-26",
    mode: "null_pointer",
    language: "Java",
    difficulty: 9,
    title: "ThreadLocal Initial Value Missing",
    description: "ThreadLocal.get() returns null when withInitial() or initialValue() is not provided.",
    code: `ThreadLocal<List<String>> tl = new ThreadLocal<>();\ntl.get().add("item"); // NullPointerException!`,
    options: [
      "Assume ThreadLocal automatically instantiates empty collections by default",
      "Supply factory supplier: ThreadLocal.withInitial(ArrayList::new)",
      "Invoke tl.set(null) explicitly prior to calling tl.get() on the thread",
      "Switch ThreadLocal to InheritableThreadLocal without modifying factory"
    ],
    correctOption: 1,
    explanation: "WHAT: Uninitialized ThreadLocal. WHY: Default `ThreadLocal` returns `null` on `.get()` until explicitly set or given an initial supplier. HOW: Use `ThreadLocal.withInitial(ArrayList::new)`.",
    basePoints: 190,
    tags: ["java", "threadlocal", "concurrency"]
  },
  {
    id: "null-27",
    mode: "null_pointer",
    language: "C++",
    difficulty: 10,
    title: "Placement New Re-initialization without Null Pointer Guard",
    description: "Placement new into unaligned or null memory buffer causes memory fault.",
    code: `void* rawMem = malloc(sizeof(Widget));\n// If malloc fails and returns nullptr:\nWidget* w = new (rawMem) Widget(); // Crash on nullptr rawMem!`,
    options: [
      "Placement new automatically validates memory and allocates if nullptr",
      "malloc is guaranteed by the OS never to return nullptr under memory load",
      "Verify rawMem != nullptr and check alignof(Widget) before placement new",
      "Call free(rawMem) immediately before invoking placement new operator"
    ],
    correctOption: 2,
    explanation: "WHAT: Placement new on null/unaligned buffer. WHY: Placement new does not allocate memory; if `rawMem` is null, construction writes into address 0. HOW: Check `if (!rawMem)` and verify alignment.",
    basePoints: 200,
    tags: ["cpp", "placement_new", "memory"]
  },
  {
    id: "null-28",
    mode: "null_pointer",
    language: "JavaScript",
    difficulty: 10,
    title: "Proxy get Trap Returning Undefined for Invariant Target Property",
    description: "Proxy get trap violates invariant by returning null/undefined for non-configurable non-writable target property.",
    code: `const target = {};\nObject.defineProperty(target, 'id', { value: 42, writable: false, configurable: false });\nconst proxy = new Proxy(target, {\n  get: () => undefined // TypeError: 'get' on proxy: property 'id' is non-configurable...\n});\nconsole.log(proxy.id);`,
    options: [
      "Proxy get trap must return the exact target value for non-configurable properties",
      "Target object must be frozen via Object.freeze before proxying properties",
      "JavaScript Proxies cannot trap access to non-configurable target properties",
      "Return null instead of undefined to satisfy proxy property return invariants"
    ],
    correctOption: 0,
    explanation: "WHAT: Proxy invariant violation. WHY: The JS specification mandates that Proxy get traps cannot return a different value (or undefined) for non-configurable non-writable properties. HOW: Return `target[prop]` for invariant properties.",
    basePoints: 200,
    tags: ["javascript", "proxy", "metaprogramming"]
  },
  {
    id: "null-29",
    mode: "null_pointer",
    language: "Python",
    difficulty: 10,
    title: "__getattr__ Infinite Recursion on Missing Instance Attribute",
    description: "Accessing missing attribute inside __getattr__ triggers infinite recursion on self.__dict__.",
    code: `class Wrapper:\n    def __init__(self, target):\n        self._target = target\n    def __getattr__(self, name):\n        return getattr(self._target, name)\n# If self._target is uninitialized or typo'd, accessing self._target inside __getattr__ re-invokes __getattr__!`,
    options: [
      "Replace method __getattr__ with special method __getattribute__ lookup",
      "Raise an explicit AttributeError inside __init__ to prevent delegation",
      "Define _target as a class variable initialized with None object reference",
      "Access internal fields via object.__getattribute__(self, '_target')"
    ],
    correctOption: 3,
    explanation: "WHAT: `__getattr__` cycle on internal attribute lookup. WHY: If `_target` is accessed before assignment, `__getattr__` is called to find `_target`, creating an infinite recursion. HOW: Use `object.__getattribute__(self, '_target')`.",
    basePoints: 200,
    tags: ["python", "getattr", "dunder", "metaprogramming"]
  },
  {
    id: "null-30",
    mode: "null_pointer",
    language: "Java",
    difficulty: 10,
    title: "MethodHandle InvokeExact Null Argument Signature Mismatch",
    description: "invokeExact throws WrongMethodTypeException when null is passed without explicit type casting.",
    code: `MethodHandle mh = MethodHandles.lookup().findStatic(Helper.class, "process", MethodType.methodType(void.class, String.class));\nmh.invokeExact(null); // WrongMethodTypeException: (null) cannot match (String)`,
    options: [
      "MethodHandle invokeExact does not permit null arguments under any condition",
      "Pass typed cast: mh.invokeExact((String) null) or use mh.invoke()",
      "Change parameter type from String.class to Object.class in MethodType definition",
      "Migrate reflective call to legacy java.lang.reflect.Method.invoke instead"
    ],
    correctOption: 1,
    explanation: "WHAT: `invokeExact` strict type matching on untyped `null`. WHY: `invokeExact` requires exact bytecode signature matches; an uncasted `null` has type `null_type` rather than `String`. HOW: Cast `(String) null` or use `mh.invoke()`.",
    basePoints: 200,
    tags: ["java", "methodhandle", "reflection", "jvm"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NULL_POINTER_BANK };
}
