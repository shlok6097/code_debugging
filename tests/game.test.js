/**
 * Code Debugger - Game State Machine & Anti-Cheat Unit Tests
 */

const assert = require('assert');
const { CodeDebuggerGame } = require('../game/js/game');
const { CampusConnect } = require('../game/js/campus-connect');

function runGameTests() {
  console.log('\n--- Running Game Controller & State Machine Tests ---');

  let stateLog = [];
  let feedbackReceived = null;
  let completeReceived = null;

  const game = new CodeDebuggerGame({
    totalQuestionsCount: 5,
    gameDurationSeconds: 100,
    onStateChange: (s) => stateLog.push(s),
    onFeedback: (fb) => { feedbackReceived = fb; },
    onGameComplete: (res) => { completeReceived = res; }
  });

  // Test 1: Start Game
  assert.strictEqual(game.state, 'IDLE');
  game.start();
  assert.strictEqual(game.state, 'ACTIVE');
  assert.strictEqual(game.questions.length, 5);
  assert(game.currentQuestion !== null);
  assert.strictEqual(game.currentQuestion.shuffledOptions.length, 4);
  console.log('✓ Game started into ACTIVE state with multi-mode questions');

  // Test 2: Select Option and Submit Correct Answer
  const correctIdx = game.currentQuestion.correctShuffledIndex;
  game.selectOption(correctIdx);
  assert.strictEqual(game.selectedOptionIndex, correctIdx);

  const fb1 = game.submitAnswer();
  assert.strictEqual(game.state, 'FEEDBACK');
  assert.strictEqual(fb1.isCorrect, true);
  assert(fb1.scoreResult.totalPointsEarned > 0);
  console.log('✓ Submitted correct answer -> transitioned to FEEDBACK state with points');

  // Test 3: Anti-cheat: Double submission lock
  const doubleSubmit = game.submitAnswer();
  assert.strictEqual(doubleSubmit, null, 'Double answer submission must be blocked');
  console.log('✓ Anti-cheat: Second submission attempt blocked');

  // Test 4: Next Question
  game.nextQuestion();
  assert.strictEqual(game.state, 'ACTIVE');
  assert.strictEqual(game.currentIndex, 1);
  console.log('✓ Advanced to Question 2 in ACTIVE state');

  // Test 5: Submit Incorrect Answer
  const incorrectIdx = (game.currentQuestion.correctShuffledIndex + 1) % 4;
  game.selectOption(incorrectIdx);
  const fb2 = game.submitAnswer();
  assert.strictEqual(fb2.isCorrect, false);
  assert.strictEqual(fb2.scoreResult.totalPointsEarned, 0);
  console.log('✓ Incorrect answer submitted -> 0 pts awarded');

  // Test 6: Fast-forward to game end
  game.nextQuestion(); // Q3
  game.selectOption(game.currentQuestion.correctShuffledIndex);
  game.submitAnswer();

  game.nextQuestion(); // Q4
  game.selectOption(game.currentQuestion.correctShuffledIndex);
  game.submitAnswer();

  game.nextQuestion(); // Q5 (last)
  game.selectOption(game.currentQuestion.correctShuffledIndex);
  game.submitAnswer();

  game.nextQuestion(); // Should trigger end game
  assert.strictEqual(game.state, 'COMPLETED');
  assert(completeReceived !== null);
  assert.strictEqual(completeReceived.summary.metadata.questionsAttempted, 5);
  assert.strictEqual(completeReceived.summary.metadata.questionsCorrect, 4);
  assert(completeReceived.summary.metadata.modesCount >= 1);
  assert(completeReceived.summary.metadata.languagesCount >= 1);
  console.log('✓ Game finished with full multi-mode summary stats');

  // Test 7: Campus Connect Bridge Anti-Cheat single submission
  CampusConnect.startSession();
  const sub1 = CampusConnect.submitResult({ score: 500, completed: true, durationSeconds: 30, metadata: {} });
  assert.strictEqual(sub1.success, true);

  const sub2 = CampusConnect.submitResult({ score: 9999, completed: true, durationSeconds: 30, metadata: {} });
  assert.strictEqual(sub2.success, false);
  assert.strictEqual(sub2.reason, 'ALREADY_SUBMITTED');
  console.log('✓ Campus Connect Bridge rejected duplicate score manipulation attempt');
}

module.exports = { runGameTests };

if (require.main === module) {
  runGameTests();
}
