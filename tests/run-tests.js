/**
 * Code Debugger - Master Test Runner
 * Executes all unit test suites and reports results.
 */

const { runQuestionTests } = require('./questions.test');
const { runSessionGeneratorTests } = require('./session-generator.test');
const { runScoringTests } = require('./scoring.test');
const { runGameTests } = require('./game.test');

console.log('====================================================');
console.log('  CODE DEBUGGER - MULTI-MODE TEST SUITE RUNNER');
console.log('====================================================');

try {
  runQuestionTests();
  runSessionGeneratorTests();
  runScoringTests();
  runGameTests();

  console.log('\n====================================================');
  console.log('  ALL TESTS PASSED SUCCESSFULLY! (100% SUCCESS)');
  console.log('====================================================\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ TEST FAILURE:', error.message);
  console.error(error.stack);
  process.exit(1);
}
