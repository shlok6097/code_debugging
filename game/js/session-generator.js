/**
 * Code Debugger - Intelligent Session Generator
 * Generates dynamically randomized question sessions with strictly monotonic difficulty,
 * mode and language diversity, recent-question avoidance, and option randomization.
 */

const DEBUGGING_MODES = {
  bug_hunt: { name: "Bug Hunt", icon: "🔍", description: "Identify what is wrong with the code logic or syntax." },
  fix_the_code: { name: "Fix The Code", icon: "🛠️", description: "Select the single correct drop-in replacement fix." },
  output_detective: { name: "Output Detective", icon: "🕵️", description: "Deduce why the actual output differs from expected." },
  runtime_rescue: { name: "Runtime Rescue", icon: "🚨", description: "Diagnose the root cause of a fatal runtime error." },
  time_complexity: { name: "Time Complexity Trap", icon: "⏳", description: "Identify performance bottlenecks and algorithmic traps." },
  memory_leak: { name: "Memory Leak Hunter", icon: "🧠", description: "Detect unreleased memory, dangling pointers, or leaks." },
  off_by_one: { name: "Off-By-One", icon: "📏", description: "Spot subtle boundary and indexing errors." },
  infinite_loop: { name: "Infinite Loop", icon: "♾️", description: "Determine why a loop or recursion fails to terminate." },
  null_pointer: { name: "Null Pointer Hunt", icon: "🎯", description: "Identify unsafe null, undefined, or missing references." },
  recursion_rescue: { name: "Recursion Rescue", icon: "🔄", description: "Fix base cases, state accumulation, or cyclic recursion." },
  sql_bug: { name: "SQL Bug Hunt", icon: "🗄️", description: "Debug queries, joins, groupings, and aggregate logic." },
  api_debugger: { name: "API Debugger", icon: "🌐", description: "Fix HTTP verbs, headers, status codes, and payloads." },
  concurrency_crash: { name: "Concurrency Crash", icon: "⚡", description: "Spot race conditions, deadlocks, and thread safety bugs." },
  algorithm_bug: { name: "Algorithm Bug Hunter", icon: "🧩", description: "Diagnose flawed data structures and algorithm steps." },
  security_bug: { name: "Security Bug Hunt", icon: "🛡️", description: "Find injection vulnerabilities, XSS, and security flaws." },
  debugging_boss: { name: "Debugging Boss", icon: "👑", description: "Conquer a complex multi-faceted algorithm challenge." }
};

const SessionGenerator = (function () {
  /**
   * Helper to shuffle an array in-place (Fisher-Yates)
   */
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Generates a randomized session of questions.
   * @param {Object} options
   * @param {number} options.totalQuestions Desired question count (default: 15)
   * @param {Array<string>} options.recentQuestionIds IDs of recently played questions to avoid
   * @param {Array<Object>} options.bank Question bank (defaults to QUESTION_BANK)
   * @returns {Object} Session package { questions, sessionMeta }
   */
  function generateSession(options = {}) {
    const totalQuestions = options.totalQuestions || 15;
    const recentIds = new Set(options.recentQuestionIds || []);
    const bank = options.bank || (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : require('./question-bank').QUESTION_BANK);

    // Target difficulty slots for a 15-question progressive session
    // Curves from 1 to 10 with Boss at the end
    const targetDifficulties = [1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9, 10];

    // Adjust slots if totalQuestions != 15
    const difficultySlots = [];
    for (let i = 0; i < totalQuestions; i++) {
      const ratio = i / Math.max(1, totalQuestions - 1);
      const diff = Math.min(10, Math.max(1, Math.round(1 + ratio * 9)));
      difficultySlots.push(diff);
    }
    // Guarantee final question is Level 10
    difficultySlots[difficultySlots.length - 1] = 10;

    // Separate bank into eligible vs recent
    let eligiblePool = bank.filter(q => !recentIds.has(q.id));
    // If pool exhausted, fallback to full bank
    if (eligiblePool.length < totalQuestions) {
      eligiblePool = [...bank];
    }

    const selectedQuestions = [];
    const usedIds = new Set();
    let prevMode = null;
    let prevLang = null;

    // Isolate beginner starter questions (25 beginner questions)
    const beginnerPool = bank.filter(q => q.isBeginner === true);
    let eligibleBeginner = beginnerPool.filter(q => !recentIds.has(q.id));
    if (eligibleBeginner.length < 3) {
      eligibleBeginner = [...beginnerPool];
    }

    // Isolate standard pool for remaining questions
    const standardPool = bank.filter(q => !q.isBeginner);
    let eligibleStandard = standardPool.filter(q => !recentIds.has(q.id));
    if (eligibleStandard.length < (totalQuestions - 3)) {
      eligibleStandard = [...standardPool];
    }

    // Step 1: Select the FIRST 3 questions strictly from the Beginner Starter Pool
    for (let i = 0; i < Math.min(3, totalQuestions); i++) {
      let candidates = eligibleBeginner.filter(q => !usedIds.has(q.id));
      if (candidates.length === 0) {
        candidates = beginnerPool.filter(q => !usedIds.has(q.id));
      }
      candidates = shuffle(candidates);

      let chosen = candidates.find(q => q.mode !== prevMode && q.language !== prevLang) ||
                   candidates.find(q => q.mode !== prevMode) ||
                   candidates[0];

      usedIds.add(chosen.id);
      prevMode = chosen.mode;
      prevLang = chosen.language;
      selectedQuestions.push(chosen);
    }

    // Step 2: Select remaining questions (slots 4 to totalQuestions) with progressive difficulty
    for (let i = 3; i < totalQuestions; i++) {
      const targetDiff = difficultySlots[i];
      const isBossSlot = (i === totalQuestions - 1);

      // Find candidate questions matching target difficulty
      let candidates = eligibleStandard.filter(q => 
        !usedIds.has(q.id) &&
        (isBossSlot ? (q.mode === 'debugging_boss' || q.difficulty === 10) : (Math.abs(q.difficulty - targetDiff) <= 1))
      );

      // If no candidate at exact diff, broaden search in standard pool
      if (candidates.length === 0) {
        candidates = eligibleStandard.filter(q => !usedIds.has(q.id));
      }
      if (candidates.length === 0) {
        candidates = standardPool.filter(q => !usedIds.has(q.id));
      }

      candidates = shuffle(candidates);

      let chosen = candidates.find(q => q.mode !== prevMode && q.language !== prevLang) ||
                   candidates.find(q => q.mode !== prevMode) ||
                   candidates[0];

      usedIds.add(chosen.id);
      prevMode = chosen.mode;
      prevLang = chosen.language;
      selectedQuestions.push(chosen);
    }

    // Ensure strictly non-decreasing difficulty progression (except boss at end)
    selectedQuestions.sort((a, b) => {
      if (a.mode === 'debugging_boss' && b.mode !== 'debugging_boss') return 1;
      if (b.mode === 'debugging_boss' && a.mode !== 'debugging_boss') return -1;
      return a.difficulty - b.difficulty;
    });

    // Randomize answer options for each selected question
    const preparedQuestions = selectedQuestions.map(rawQ => {
      const originalOptions = rawQ.options.map((text, idx) => ({
        text,
        isCorrect: idx === rawQ.correctOption
      }));

      const shuffledOptions = shuffle(originalOptions);
      const correctShuffledIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

      return {
        ...rawQ,
        shuffledOptions: shuffledOptions.map(opt => opt.text),
        correctShuffledIndex
      };
    });

    const modesUsed = Array.from(new Set(preparedQuestions.map(q => q.mode)));
    const languagesUsed = Array.from(new Set(preparedQuestions.map(q => q.language)));

    return {
      questions: preparedQuestions,
      sessionMeta: {
        total: preparedQuestions.length,
        modesCount: modesUsed.length,
        modesUsed,
        languagesCount: languagesUsed.length,
        languagesUsed,
        difficultyRange: {
          min: preparedQuestions[0].difficulty,
          max: preparedQuestions[preparedQuestions.length - 1].difficulty
        }
      }
    };
  }

  return {
    generateSession,
    DEBUGGING_MODES
  };
})();

// Export for Node.js / tests or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SessionGenerator,
    DEBUGGING_MODES
  };
}
