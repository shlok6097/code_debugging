/**
 * Code Debugger - Question Dataset Unit Tests
 * Validates question bank integrity, required fields, difficulty ranges, modes, and languages.
 */

const assert = require('assert');

// Require all mode banks
const { BEGINNER_STARTERS_BANK } = require('../game/js/modes/beginner-starters.js');
const { BUG_HUNT_BANK } = require('../game/js/modes/bug-hunt.js');
const { FIX_THE_CODE_BANK } = require('../game/js/modes/fix-the-code.js');
const { OUTPUT_DETECTIVE_BANK } = require('../game/js/modes/output-detective.js');
const { RUNTIME_RESCUE_BANK } = require('../game/js/modes/runtime-rescue.js');
const { TIME_COMPLEXITY_BANK } = require('../game/js/modes/time-complexity.js');
const { OFF_BY_ONE_BANK } = require('../game/js/modes/off-by-one.js');
const { INFINITE_LOOP_BANK } = require('../game/js/modes/infinite-loop.js');
const { NULL_POINTER_BANK } = require('../game/js/modes/null-pointer.js');
const { MEMORY_LEAK_BANK } = require('../game/js/modes/memory-leak.js');
const { RECURSION_RESCUE_BANK } = require('../game/js/modes/recursion-rescue.js');
const { SQL_BUG_BANK } = require('../game/js/modes/sql-bug.js');
const { API_DEBUGGER_BANK } = require('../game/js/modes/api-debugger.js');
const { CONCURRENCY_CRASH_BANK } = require('../game/js/modes/concurrency-crash.js');
const { ALGORITHM_BUG_BANK } = require('../game/js/modes/algorithm-bug.js');
const { SECURITY_BUG_BANK } = require('../game/js/modes/security-bug.js');
const { DEBUGGING_BOSS_BANK } = require('../game/js/modes/debugging-boss.js');

const { QUESTION_BANK } = require('../game/js/question-bank');
const { DEBUGGING_MODES } = require('../game/js/session-generator');

function runQuestionTests() {
  console.log('\n--- Running Master Question Bank Tests ---');

  // Test 1: Bank count
  assert(QUESTION_BANK.length === 510, `Expected 510 questions, found ${QUESTION_BANK.length}`);
  console.log(`✓ Master bank contains exactly ${QUESTION_BANK.length} questions (510 total across 17 modules)`);

  // Test 2: Language coverage (Python, C++, Java, JavaScript, SQL)
  const languages = new Set(QUESTION_BANK.map(q => q.language));
  const requiredLangs = ['Python', 'C++', 'Java', 'JavaScript', 'SQL'];
  requiredLangs.forEach(lang => {
    assert(languages.has(lang), `Missing required language: ${lang}`);
  });
  console.log(`✓ Supported languages verified: ${Array.from(languages).join(', ')}`);

  // Test 3: Mode coverage (All 16 modes present, each with 30 questions)
  const modeCounts = {};
  QUESTION_BANK.forEach(q => {
    if (!q.isBeginner) {
      modeCounts[q.mode] = (modeCounts[q.mode] || 0) + 1;
    }
  });

  Object.keys(DEBUGGING_MODES).forEach(modeKey => {
    assert(modeCounts[modeKey] >= 30, `Expected >= 30 questions for mode ${modeKey}, found ${modeCounts[modeKey] || 0}`);
  });
  console.log(`✓ All 16 debugging modes contain at least 30 authentic challenges`);

  // Test 4: Structural schema validation for every single question
  const ids = new Set();
  QUESTION_BANK.forEach((q, idx) => {
    assert(q.id && typeof q.id === 'string', `Question at [${idx}] missing id`);
    assert(!ids.has(q.id), `Duplicate question ID detected: ${q.id}`);
    ids.add(q.id);

    assert(DEBUGGING_MODES[q.mode], `Question ${q.id} has invalid mode: ${q.mode}`);
    assert(typeof q.difficulty === 'number' && q.difficulty >= 1 && q.difficulty <= 10,
      `Question ${q.id} has invalid difficulty: ${q.difficulty}`);
    assert(q.title && q.title.trim().length > 0, `Question ${q.id} missing title`);
    assert(q.description && q.description.trim().length > 0, `Question ${q.id} missing description`);
    assert(q.code && q.code.trim().length > 0, `Question ${q.id} missing code block`);
    
    // Check exactly 4 options
    assert(Array.isArray(q.options) && q.options.length === 4,
      `Question ${q.id} must have exactly 4 options, found ${q.options ? q.options.length : 0}`);
    q.options.forEach((opt, optIdx) => {
      assert(typeof opt === 'string' && opt.trim().length > 0,
        `Question ${q.id} option [${optIdx}] cannot be empty`);
    });

    // Check correctOption index
    assert(typeof q.correctOption === 'number' && q.correctOption >= 0 && q.correctOption < 4,
      `Question ${q.id} has invalid correctOption index: ${q.correctOption}`);

    // Check explanation & points
    assert(q.explanation && q.explanation.trim().length > 0, `Question ${q.id} missing explanation`);
    assert(typeof q.basePoints === 'number' && q.basePoints > 0, `Question ${q.id} invalid basePoints: ${q.basePoints}`);
  });
  console.log(`✓ All ${QUESTION_BANK.length} questions passed strict structural schema validation`);
}

module.exports = { runQuestionTests };

if (require.main === module) {
  runQuestionTests();
}
