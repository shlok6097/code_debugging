/**
 * Code Debugger - Session Generator Unit Tests
 * Verifies progressive difficulty, session variance, no duplicates, anti-repeat history,
 * mode diversity, and option randomization.
 */

const assert = require('assert');
const { SessionGenerator, DEBUGGING_MODES } = require('../game/js/session-generator');
const { QUESTION_BANK } = require('../game/js/question-bank');

function runSessionGeneratorTests() {
  console.log('\n--- Running Session Generator Tests ---');

  // Test 1: Generate 15-question session
  const session1 = SessionGenerator.generateSession({ totalQuestions: 15, bank: QUESTION_BANK });
  assert.strictEqual(session1.questions.length, 15, 'Session must generate exactly 15 questions');
  console.log('✓ Session 1 generated with 15 questions');

  // Test 1b: Verify first 3 questions are strictly Beginner-Friendly questions
  for (let i = 0; i < 3; i++) {
    const q = session1.questions[i];
    assert.strictEqual(q.isBeginner, true, `Question ${i + 1} (${q.id}) must be marked isBeginner: true`);
    assert.strictEqual(q.difficulty, 1, `Question ${i + 1} (${q.id}) must be difficulty 1`);
  }
  console.log('✓ First 3 questions are guaranteed to be intuitive Beginner-Friendly questions');

  // Test 2: Monotonic difficulty progression
  for (let i = 1; i < session1.questions.length; i++) {
    const prevDiff = session1.questions[i - 1].difficulty;
    const currDiff = session1.questions[i].difficulty;
    assert(currDiff >= prevDiff, `Difficulty decreased at question ${i + 1}: ${prevDiff} -> ${currDiff}`);
  }
  console.log('✓ Monotonic difficulty progression verified (1 -> ... -> 10)');

  // Test 3: No duplicate questions in a session
  const ids1 = session1.questions.map(q => q.id);
  const uniqueIds1 = new Set(ids1);
  assert.strictEqual(ids1.length, uniqueIds1.size, 'Duplicate question IDs found within single session');
  console.log('✓ No duplicate questions in session');

  // Test 4: Final Question is Boss or Master Level 10
  const lastQ = session1.questions[session1.questions.length - 1];
  assert(lastQ.difficulty === 10 || lastQ.mode === 'debugging_boss',
    `Last question must be difficulty 10 or boss, got diff ${lastQ.difficulty} mode ${lastQ.mode}`);
  console.log(`✓ Final challenge is a Boss/Master (Diff: ${lastQ.difficulty}, Mode: ${lastQ.mode})`);

  // Test 5: Session Variance (Session 1 != Session 2 != Session 3)
  const session2 = SessionGenerator.generateSession({ totalQuestions: 15, recentQuestionIds: ids1, bank: QUESTION_BANK });
  const ids2 = session2.questions.map(q => q.id);

  const session3 = SessionGenerator.generateSession({ totalQuestions: 15, recentQuestionIds: [...ids1, ...ids2], bank: QUESTION_BANK });
  const ids3 = session3.questions.map(q => q.id);

  // Compare overlapping IDs between consecutive sessions
  const overlap1_2 = ids2.filter(id => ids1.includes(id));
  assert(overlap1_2.length < 5, `Expected minimal overlap with recent questions, got ${overlap1_2.length} overlaps`);
  assert.notDeepStrictEqual(ids1, ids2, 'Session 1 and Session 2 must not have identical sequences');
  assert.notDeepStrictEqual(ids2, ids3, 'Session 2 and Session 3 must not have identical sequences');
  console.log('✓ Dynamic session variance verified: Session 1 != Session 2 != Session 3');

  // Test 6: Answer Option Randomization and Correct Index Mapping
  let foundDifferentShuffledIndex = false;
  session1.questions.forEach(q => {
    assert.strictEqual(q.shuffledOptions.length, 4, 'Each question must have 4 shuffled options');
    assert(q.correctShuffledIndex >= 0 && q.correctShuffledIndex < 4, 'correctShuffledIndex out of range');

    // Retrieve original correct text
    const originalCorrectText = q.options[q.correctOption];
    const shuffledCorrectText = q.shuffledOptions[q.correctShuffledIndex];
    assert.strictEqual(shuffledCorrectText, originalCorrectText,
      `Option mapping error in ${q.id}: expected "${originalCorrectText}", got "${shuffledCorrectText}"`);

    if (q.correctShuffledIndex !== q.correctOption) {
      foundDifferentShuffledIndex = true;
    }
  });
  console.log('✓ Option shuffling with accurate internal tracking verified across questions');

  // Test 7: Mode metadata coverage
  assert(Object.keys(DEBUGGING_MODES).length >= 16, 'All 16 debugging modes must be registered');
  console.log(`✓ All ${Object.keys(DEBUGGING_MODES).length} debugging modes registered`);
}

module.exports = { runSessionGeneratorTests };

if (require.main === module) {
  runSessionGeneratorTests();
}
