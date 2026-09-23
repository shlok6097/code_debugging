/**
 * Code Debugger - Scoring System Unit Tests
 * Validates base scoring, speed bonus scaling, streak multipliers, and final summary generation.
 */

const assert = require('assert');
const { ScoringSystem } = require('../game/js/scoring');

function runScoringTests() {
  console.log('\n--- Running Scoring Engine Tests ---');

  const scoring = new ScoringSystem();

  // Test 1: Initial state
  assert.strictEqual(scoring.score, 0);
  assert.strictEqual(scoring.currentStreak, 0);
  assert.strictEqual(scoring.bestStreak, 0);
  console.log('✓ Initial scoring state is 0');

  // Test 2: Correct answer with fast response (<= 3s)
  const q1 = { id: 'q1', difficulty: 2, basePoints: 100 };
  const res1 = scoring.processAnswer(q1, true, 2.0, 290);
  // Base: 100, Speed (diff 2 * 15 = 30), Streak (1st = 0) -> 130
  assert.strictEqual(res1.isCorrect, true);
  assert.strictEqual(res1.basePoints, 100);
  assert.strictEqual(res1.speedBonus, 30);
  assert.strictEqual(res1.streakBonus, 0);
  assert.strictEqual(res1.totalPointsEarned, 130);
  assert.strictEqual(scoring.score, 130);
  assert.strictEqual(scoring.currentStreak, 1);
  console.log('✓ Correct answer with instant speed bonus awarded properly (130 pts)');

  // Test 3: Second consecutive correct answer (Streak = 2 -> +10 bonus)
  const q2 = { id: 'q2', difficulty: 4, basePoints: 150 };
  const res2 = scoring.processAnswer(q2, true, 2.0, 280);
  // Base: 150, Speed (4 * 15 = 60), Streak 2 (+10) -> 220
  assert.strictEqual(res2.streakBonus, 10);
  assert.strictEqual(res2.totalPointsEarned, 220);
  assert.strictEqual(scoring.score, 350);
  assert.strictEqual(scoring.currentStreak, 2);
  console.log('✓ Streak multiplier (+10) applied on 2nd consecutive answer');

  // Test 4: Incorrect answer resets streak and awards 0 points
  const q3 = { id: 'q3', difficulty: 5, basePoints: 175 };
  const res3 = scoring.processAnswer(q3, false, 5.0, 270);
  assert.strictEqual(res3.isCorrect, false);
  assert.strictEqual(res3.totalPointsEarned, 0);
  assert.strictEqual(scoring.score, 350);
  assert.strictEqual(scoring.currentStreak, 0);
  assert.strictEqual(scoring.bestStreak, 2); // best streak preserved
  console.log('✓ Incorrect answer awards 0 pts and resets current streak while preserving bestStreak');

  // Test 5: Final summary statistics
  const summary = scoring.getFinalSummary(true, 45);
  assert.strictEqual(summary.score, 350);
  assert.strictEqual(summary.completed, true);
  assert.strictEqual(summary.durationSeconds, 45);
  assert.strictEqual(summary.metadata.questionsAttempted, 3);
  assert.strictEqual(summary.metadata.questionsCorrect, 2);
  assert.strictEqual(summary.metadata.accuracy, 66.7);
  assert.strictEqual(summary.metadata.bestStreak, 2);
  assert.strictEqual(summary.metadata.difficultyReached, 'Medium');
  console.log('✓ Final summary payload matches Campus Connect schema specification');
}

module.exports = { runScoringTests };

if (require.main === module) {
  runScoringTests();
}
