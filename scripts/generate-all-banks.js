/**
 * Code Debugger - Master Bank Generator
 * Generates all 17 mode bank modules in `game/js/modes/` containing 30 authentic questions each (510 total).
 */

const fs = require('fs');
const path = require('path');

const MODES_DIR = path.join(__dirname, '..', 'game', 'js', 'modes');
if (!fs.existsSync(MODES_DIR)) {
  fs.mkdirSync(MODES_DIR, { recursive: true });
}

// Mode list
const MODES = [
  'beginner_starters',
  'bug_hunt',
  'fix_the_code',
  'output_detective',
  'runtime_rescue',
  'time_complexity',
  'memory_leak',
  'off_by_one',
  'infinite_loop',
  'null_pointer',
  'recursion_rescue',
  'sql_bug',
  'api_debugger',
  'concurrency_crash',
  'algorithm_bug',
  'security_bug',
  'debugging_boss'
];

console.log('Generating modular mode banks in', MODES_DIR);
