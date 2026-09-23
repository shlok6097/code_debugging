/**
 * Code Debugger - Scoring Engine
 * Client-side calculation for base points, speed bonuses, streaks, and performance summaries.
 */

class ScoringSystem {
  constructor() {
    this.reset();
  }

  /**
   * Resets scoring state for a new session.
   */
  reset() {
    this.score = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
    this.questionsAttempted = 0;
    this.questionsCorrect = 0;
    this.highestDifficulty = 1;
    this.history = [];
  }

  /**
   * Evaluates an answer submission and returns score breakdown.
   * @param {Object} question The active question object
   * @param {boolean} isCorrect Whether the answer chosen was correct
   * @param {number} timeSpentSeconds Seconds elapsed on this specific question
   * @param {number} totalRemainingSeconds Total game time remaining
   * @returns {Object} Score breakdown for this question
   */
  processAnswer(question, isCorrect, timeSpentSeconds, totalRemainingSeconds = 0) {
    this.questionsAttempted++;
    if (question.difficulty > this.highestDifficulty) {
      this.highestDifficulty = question.difficulty;
    }

    if (!isCorrect) {
      this.currentStreak = 0;
      const result = {
        isCorrect: false,
        basePoints: 0,
        speedBonus: 0,
        streakBonus: 0,
        totalPointsEarned: 0,
        currentScore: this.score,
        currentStreak: 0
      };
      this.history.push({
        questionId: question.id,
        difficulty: question.difficulty,
        ...result
      });
      return result;
    }

    // Question answered correctly
    this.questionsCorrect++;
    this.currentStreak++;
    if (this.currentStreak > this.bestStreak) {
      this.bestStreak = this.currentStreak;
    }

    // 1. Base points (scale with difficulty, default from question or calculated)
    const basePoints = question.basePoints || (question.difficulty * 25 + 50);

    // 2. Speed bonus: max speed bonus is 15 * difficulty.
    // Full bonus if answered within 3s, decays to 0 at 30s.
    const maxSpeedBonus = Math.round(question.difficulty * 15);
    let speedBonus = 0;
    if (timeSpentSeconds <= 3) {
      speedBonus = maxSpeedBonus;
    } else if (timeSpentSeconds < 30) {
      const decayRatio = (30 - timeSpentSeconds) / 27;
      speedBonus = Math.max(0, Math.round(maxSpeedBonus * decayRatio));
    }

    // 3. Streak bonus: 1=0, 2=+10, 3=+20, 4=+30, 5+=+50
    let streakBonus = 0;
    if (this.currentStreak === 2) streakBonus = 10;
    else if (this.currentStreak === 3) streakBonus = 20;
    else if (this.currentStreak === 4) streakBonus = 30;
    else if (this.currentStreak >= 5) streakBonus = 50;

    const totalPointsEarned = basePoints + speedBonus + streakBonus;
    this.score += totalPointsEarned;

    const result = {
      isCorrect: true,
      basePoints,
      speedBonus,
      streakBonus,
      totalPointsEarned,
      currentScore: this.score,
      currentStreak: this.currentStreak
    };

    this.history.push({
      questionId: question.id,
      difficulty: question.difficulty,
      ...result
    });

    return result;
  }

  /**
   * Maps numerical difficulty (1-10) to a human-readable tier.
   * @param {number} diff
   * @returns {string} Tier label ("Easy", "Medium", "Hard", "Master")
   */
  static getDifficultyTier(diff) {
    if (diff <= 2) return "Easy";
    if (diff <= 4) return "Easy-Med";
    if (diff <= 6) return "Medium";
    if (diff <= 8) return "Med-Hard";
    return "Hard";
  }

  /**
   * Generates the final Campus Connect submission payload.
   * @param {boolean} completed Whether player finished all questions
   * @param {number} durationSeconds Total active game time in seconds
   * @returns {Object} Structured final result
   */
  getFinalSummary(completed, durationSeconds) {
    const accuracy = this.questionsAttempted > 0
      ? Number(((this.questionsCorrect / this.questionsAttempted) * 100).toFixed(1))
      : 0;

    return {
      score: this.score,
      completed: Boolean(completed),
      durationSeconds: Math.max(0, Math.round(durationSeconds)),
      metadata: {
        questionsAttempted: this.questionsAttempted,
        questionsCorrect: this.questionsCorrect,
        accuracy: accuracy,
        bestStreak: this.bestStreak,
        difficultyReached: ScoringSystem.getDifficultyTier(this.highestDifficulty)
      }
    };
  }
}

// Export for Node.js test environment or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ScoringSystem
  };
}
