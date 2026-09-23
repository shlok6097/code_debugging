/**
 * Code Debugger - Local Storage Persistence
 * Stores player local records, statistics, settings, and recent question anti-repeat history.
 */

const GameStorage = (function () {
  const STORAGE_KEYS = {
    HIGH_SCORE: "code_debugger_high_score",
    STATS: "code_debugger_stats",
    HISTORY: "code_debugger_history",
    SETTINGS: "code_debugger_settings",
    RECENT_QUESTIONS: "code_debugger_recent_questions"
  };

  function getHighScore() {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
      return val ? parseInt(val, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  function getRecentQuestionIds() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function addRecentQuestionIds(newIds = []) {
    try {
      const current = getRecentQuestionIds();
      // Combine and keep only the last 30 questions
      const combined = Array.from(new Set([...newIds, ...current])).slice(0, 30);
      localStorage.setItem(STORAGE_KEYS.RECENT_QUESTIONS, JSON.stringify(combined));
    } catch (e) {
      console.warn("[GameStorage] Failed to save recent question IDs:", e);
    }
  }

  function saveScore(score, metadata = {}) {
    try {
      const currentHigh = getHighScore();
      if (score > currentHigh) {
        localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
      }

      // Update aggregate lifetime statistics
      const stats = getStats();
      stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
      stats.totalQuestionsAttempted = (stats.totalQuestionsAttempted || 0) + (metadata.questionsAttempted || 0);
      stats.totalQuestionsCorrect = (stats.totalQuestionsCorrect || 0) + (metadata.questionsCorrect || 0);
      stats.bestStreak = Math.max(stats.bestStreak || 0, metadata.bestStreak || 0);

      // Track lifetime modes mastered
      const modesSet = new Set(stats.modesEncountered || []);
      if (Array.isArray(metadata.modesPlayed)) {
        metadata.modesPlayed.forEach(m => modesSet.add(m));
      }
      stats.modesEncountered = Array.from(modesSet);

      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));

      // Append to recent games history (keep last 10)
      const history = getHistory();
      history.unshift({
        score,
        date: new Date().toISOString(),
        accuracy: metadata.accuracy || 0,
        difficultyReached: metadata.difficultyReached || "Easy",
        bestStreak: metadata.bestStreak || 0,
        modesCount: metadata.modesCount || (metadata.modesPlayed ? metadata.modesPlayed.length : 0),
        durationSeconds: metadata.durationSeconds || 0
      });
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 10)));
    } catch (e) {
      console.warn("[GameStorage] Storage write failed:", e);
    }
  }

  function getStats() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      return data ? JSON.parse(data) : {
        gamesPlayed: 0,
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
        bestStreak: 0,
        modesEncountered: []
      };
    } catch (e) {
      return { gamesPlayed: 0, totalQuestionsAttempted: 0, totalQuestionsCorrect: 0, bestStreak: 0, modesEncountered: [] };
    }
  }

  function getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { soundEnabled: true };
    } catch (e) {
      return { soundEnabled: true };
    }
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn("[GameStorage] Settings save failed:", e);
    }
  }

  return {
    getHighScore,
    saveScore,
    getStats,
    getHistory,
    getSettings,
    saveSettings,
    getRecentQuestionIds,
    addRecentQuestionIds
  };
})();

// Export for Node.js test environment or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GameStorage
  };
}
