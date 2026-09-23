/**
 * Code Debugger - Question Dataset Bridge
 * Integrates Master Question Bank and Session Generator.
 */

if (typeof require !== 'undefined') {
  const { QUESTION_BANK } = require('./question-bank');
  const { SessionGenerator } = require('./session-generator');
  var MasterBank = QUESTION_BANK;
  var Generator = SessionGenerator;
} else {
  var MasterBank = typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : [];
  var Generator = typeof SessionGenerator !== 'undefined' ? SessionGenerator : null;
}

const QUESTIONS_DATABASE = MasterBank;

/**
 * Backwards-compatible session generator helper.
 * @param {number} totalCount Desired number of questions
 * @param {Array<string>} recentIds Optional list of recent IDs to avoid
 * @returns {Array<Object>} Shuffled questions with strictly increasing difficulty
 */
function getGameQuestions(totalCount = 15, recentIds = []) {
  if (Generator) {
    const session = Generator.generateSession({
      totalQuestions: totalCount,
      recentQuestionIds: recentIds,
      bank: QUESTIONS_DATABASE
    });
    return session.questions;
  }
  return QUESTIONS_DATABASE.slice(0, totalCount);
}

// Export for Node.js / tests or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QUESTIONS_DATABASE,
    getGameQuestions
  };
}
