/**
 * Code Debugger - Master Question Bank Aggregator
 * Aggregates all 17 mode modules (510 total challenges) into the master QUESTION_BANK array.
 * 
 * Schema per question:
 * {
 *   id: string,
 *   mode: string, // 16 modes
 *   language: string, // Python | C++ | Java | JavaScript | SQL
 *   difficulty: number, // 1 to 10
 *   isBeginner?: boolean,
 *   title: string,
 *   description: string,
 *   code: string,
 *   options: string[], // exactly 4 options
 *   correctOption: number, // 0 to 3
 *   explanation: string,
 *   basePoints: number,
 *   tags: string[],
 *   expectedOutput?: string, // for output_detective mode
 *   actualOutput?: string,   // for output_detective mode
 *   runtimeError?: string    // for runtime_rescue mode
 * }
 */

const QUESTION_BANK = [
  ...(typeof BEGINNER_STARTERS_BANK !== 'undefined' ? BEGINNER_STARTERS_BANK : []),
  ...(typeof BUG_HUNT_BANK !== 'undefined' ? BUG_HUNT_BANK : []),
  ...(typeof FIX_THE_CODE_BANK !== 'undefined' ? FIX_THE_CODE_BANK : []),
  ...(typeof OUTPUT_DETECTIVE_BANK !== 'undefined' ? OUTPUT_DETECTIVE_BANK : []),
  ...(typeof RUNTIME_RESCUE_BANK !== 'undefined' ? RUNTIME_RESCUE_BANK : []),
  ...(typeof TIME_COMPLEXITY_BANK !== 'undefined' ? TIME_COMPLEXITY_BANK : []),
  ...(typeof OFF_BY_ONE_BANK !== 'undefined' ? OFF_BY_ONE_BANK : []),
  ...(typeof INFINITE_LOOP_BANK !== 'undefined' ? INFINITE_LOOP_BANK : []),
  ...(typeof NULL_POINTER_BANK !== 'undefined' ? NULL_POINTER_BANK : []),
  ...(typeof MEMORY_LEAK_BANK !== 'undefined' ? MEMORY_LEAK_BANK : []),
  ...(typeof RECURSION_RESCUE_BANK !== 'undefined' ? RECURSION_RESCUE_BANK : []),
  ...(typeof SQL_BUG_BANK !== 'undefined' ? SQL_BUG_BANK : []),
  ...(typeof API_DEBUGGER_BANK !== 'undefined' ? API_DEBUGGER_BANK : []),
  ...(typeof CONCURRENCY_CRASH_BANK !== 'undefined' ? CONCURRENCY_CRASH_BANK : []),
  ...(typeof ALGORITHM_BUG_BANK !== 'undefined' ? ALGORITHM_BUG_BANK : []),
  ...(typeof SECURITY_BUG_BANK !== 'undefined' ? SECURITY_BUG_BANK : []),
  ...(typeof DEBUGGING_BOSS_BANK !== 'undefined' ? DEBUGGING_BOSS_BANK : [])
];

// Support Node.js / CommonJS testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK };
}
