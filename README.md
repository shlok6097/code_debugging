# Code Debugger

> **Campus Connect Community Game**  
> *Find the bug. Fix the logic. Beat the clock.*

A fast-paced, competitive multi-mode coding and debugging web game built for the **Campus Connect** ecosystem. Players analyze short, authentic buggy code snippets across **Python**, **C++**, **Java**, **JavaScript**, and **SQL** across **16 specialized debugging modes** with a dedicated **Beginner Starters pack** under progressive difficulty and time pressure.

---

## 1. Game Overview

**Code Debugger** tests practical code reading and diagnostic ability rather than rote syntax recall or long typing endurance.

- **Platform**: Standalone HTML5 / CSS / Vanilla JavaScript. Zero external runtime dependencies.
- **Languages Featured**: Python, C++, Java, JavaScript, SQL.
- **Modes**: 16 distinct debugging challenge modes + 1 dedicated Beginner Starter pack.
- **Question Bank**: **510 total questions** (exactly 30 authentic, high-quality questions per mode).
- **Beginner-Friendly Guarantee**: The **first 3 questions** of every game session are strictly drawn from the Beginner Starters pool (typos, simple arithmetic, basic logic) so non-programmers can play and enjoy immediately before progressive scaling kicks in.
- **Replayability**: Dynamic Session Generator creates new randomized challenges on every playthrough while guaranteeing progressive difficulty and avoiding recent repeats via a sliding-window history.
- **Session Duration**: 5 minutes (300 seconds) global countdown.
- **Visual Aesthetic**: Modern cyber-tech dark mode editor with syntax tokens, interactive line numbers, contextual callouts, and keyboard shortcuts.

> [!IMPORTANT]
> **Scoring Ownership**: The game engine owns 100% of gameplay, timer, scoring, and streak logic. Campus Connect hosts only receive and store the final aggregated result payload upon session completion.

---

## 2. The 17 Mode Banks (30 Questions Each = 510 Total)

| # | Mode | File | Concept Focus |
| :--- | :--- | :--- | :--- |
| ★ | **Beginner Starters** | `beginner-starters.js` | Typos, unclosed quotes, simple logic, basic math, beginner friendly. |
| 1 | **Bug Hunt** | `bug-hunt.js` | General syntax, conditions, variable scoping, and unexpected behavior. |
| 2 | **Fix the Code** | `fix-the-code.js` | 4 explicit drop-in replacement fix snippets. |
| 3 | **Output Detective** | `output-detective.js` | Side-by-side **Expected Output** vs **Actual Output** deductive analysis. |
| 4 | **Runtime Rescue** | `runtime-rescue.js` | Diagnose stack traces, fatal exceptions, and unhandled crashes. |
| 5 | **Time Complexity Trap** | `time-complexity.js` | Algorithmic bottlenecks ($O(N^2)$ vs $O(N)$, redundant work, linear searches). |
| 6 | **Off-by-One** | `off-by-one.js` | Subtleties in `<` vs `<=`, array bounds, zero-indexing, and slice boundaries. |
| 7 | **Infinite Loop** | `infinite-loop.js` | Stagnant variables, floating point step traps, and loop termination failures. |
| 8 | **Null Pointer Hunt** | `null-pointer.js` | Spot uninitialized references, unboxed null objects, and undefined properties. |
| 9 | **Memory Leak Hunter** | `memory-leak.js` | Unclosed file handles, unreleased buffers, cyclic shared pointers, and memory leaks. |
| 10 | **Recursion Rescue** | `recursion-rescue.js` | Missing/broken base cases, unreturned state, and cyclic recursion. |
| 11 | **SQL Bug Hunt** | `sql-bug.js` | Three-valued `NULL` logic, missing join conditions, ungrouped columns, and aggregate filters. |
| 12 | **API Debugger** | `api-debugger.js` | Incorrect HTTP verbs, missing `Content-Type` or auth headers, status codes, and payload keys. |
| 13 | **Concurrency Crash** | `concurrency-crash.js` | Race conditions, non-atomic increments, deadlocks, and thread safety bugs. |
| 14 | **Algorithm Bug Hunter** | `algorithm-bug.js` | Flawed logic in binary search, two pointers, sliding windows, heaps, and tree traversals. |
| 15 | **Security Bug Hunt** | `security-bug.js` | SQL injection, XSS via `innerHTML`, insecure deserialization, and path traversal. |
| 16 | **Debugging Boss** | `debugging-boss.js` | Epic multi-faceted challenges at Level 10 combining algorithmic, system, and concurrency bugs. |

---

## 3. Dynamic Session Generator

Every time **START GAME** is clicked:
1. **Mandatory Beginner Starters (Slots 1–3)**: Guaranteed first 3 questions from the beginner pool with easy difficulty ($1/10$).
2. **Progressive Difficulty Scaling (Slots 4–15)**: Strictly non-decreasing difficulty slope ($2 \to 10$).
3. **Anti-Repeat Filter**: Excludes recently played questions using a 30-question sliding window stored in `localStorage`.
4. **Mode & Language Interleaving**: Alternates debugging modes and programming languages across consecutive questions.
5. **Boss Raid Finale**: Concludes slot 15 with a level 9–10 Boss challenge.
6. **Answer Option Randomization**: Shuffles multiple-choice options using Fisher-Yates while maintaining internal correct answer integrity.

---

## 4. Scoring Model

$$\text{Final Score} = \sum (\text{Base Points} + \text{Speed Bonus} + \text{Streak Bonus})$$

- **Base Points**: 60 to 250 points depending on difficulty.
- **Speed Bonus**: Up to $+50$ points for answering quickly.
- **Streak Bonus**: Exponential streak multipliers ($+10, +20, +30, +50$ bonus per consecutive correct answer).
- **Accuracy Tracking**: Calculates percentage correct and displays 8 distinct performance metrics.

---

## 5. Host Bridge Protocol

The game communicates with the Campus Connect Flutter runtime via:
- `window.CampusConnectBridge.postMessage(JSON.stringify(payload))` (Android)
- `window.webkit.messageHandlers.CampusConnectBridge.postMessage(payload)` (iOS / macOS)
- `window.parent.postMessage({ type: 'CAMPUS_CONNECT_GAME_RESULT', ... }, '*')` (Web iframe)
- Standalone `localStorage` fallback when launched directly in standard desktop/mobile browsers.

---

## 6. Directory Structure

```
code_debugging/
├── game.json                  # Campus Connect manifest
├── thumbnail.png              # 512x512 cyberpunk badge
├── README.md                  # Project documentation
├── game/
│   ├── index.html             # Standalone game entry point
│   ├── css/
│   │   └── style.css          # Dark cyber-tech aesthetic stylesheet
│   └── js/
│       ├── modes/             # 17 specialized mode question modules (30 each = 510 total)
│       │   ├── beginner-starters.js
│       │   ├── bug-hunt.js
│       │   ├── fix-the-code.js
│       │   ├── output-detective.js
│       │   ├── runtime-rescue.js
│       │   ├── time-complexity.js
│       │   ├── off-by-one.js
│       │   ├── infinite-loop.js
│       │   ├── null-pointer.js
│       │   ├── memory-leak.js
│       │   ├── recursion-rescue.js
│       │   ├── sql-bug.js
│       │   ├── api-debugger.js
│       │   ├── concurrency-crash.js
│       │   ├── algorithm-bug.js
│       │   ├── security-bug.js
│       │   └── debugging-boss.js
│       ├── question-bank.js   # Master aggregator
│       ├── session-generator.js # Dynamic session generator & anti-repeat
│       ├── scoring.js         # Client-side scoring engine
│       ├── timer.js           # 5-minute countdown timer
│       ├── storage.js         # localStorage persistence
│       ├── campus-connect.js  # Host bridge adapter
│       ├── game.js            # Game state machine & Web Audio SFX
│       └── main.js            # Entry point & event bindings
└── tests/
    ├── validate.py            # Integrity validator
    ├── questions.test.js      # Dataset schema tests
    ├── session-generator.test.js # Session generator unit tests
    └── scoring.test.js        # Scoring engine unit tests
```

---

## 7. Controls & Keyboard Shortcuts

- **1, 2, 3, 4** or **A, B, C, D**: Select option card
- **Enter** or **Space**: Submit answer / Advance to next question
- **M**: Toggle audio sound effects
