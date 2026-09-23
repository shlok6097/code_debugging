/**
 * Code Debugger - Main Game Controller & State Machine
 * Manages question sessions, player interactions, state transitions, and result submission.
 */

class CodeDebuggerGame {
  constructor(options = {}) {
    this.totalQuestionsCount = options.totalQuestionsCount || 15;
    this.gameDurationSeconds = options.gameDurationSeconds || 300;

    this.scoring = new (typeof ScoringSystem !== 'undefined' ? ScoringSystem : require('./scoring').ScoringSystem)();
    this.state = "IDLE"; // "IDLE" | "ACTIVE" | "FEEDBACK" | "COMPLETED"

    this.questions = [];
    this.sessionMeta = null;
    this.currentIndex = 0;
    this.currentQuestion = null;
    this.selectedOptionIndex = null;
    this.hasAnsweredCurrent = false;

    this.timer = null;
    this.callbacks = {
      onStateChange: options.onStateChange || (() => {}),
      onQuestionLoaded: options.onQuestionLoaded || (() => {}),
      onFeedback: options.onFeedback || (() => {}),
      onGameComplete: options.onGameComplete || (() => {}),
      onTimerTick: options.onTimerTick || (() => {})
    };
  }

  /**
   * Initializes and starts a new game round with a freshly randomized session.
   */
  start() {
    this.state = "ACTIVE";
    this.scoring.reset();
    this.currentIndex = 0;
    this.selectedOptionIndex = null;
    this.hasAnsweredCurrent = false;

    // Retrieve recent question history to prevent immediate repeats
    let recentIds = [];
    if (typeof GameStorage !== 'undefined') {
      recentIds = GameStorage.getRecentQuestionIds();
    }

    // Generate new progressive randomized session
    const generator = typeof SessionGenerator !== 'undefined' ? SessionGenerator : require('./session-generator').SessionGenerator;
    const sessionResult = generator.generateSession({
      totalQuestions: this.totalQuestionsCount,
      recentQuestionIds: recentIds
    });

    this.questions = sessionResult.questions;
    this.sessionMeta = sessionResult.sessionMeta;

    // Save newly selected question IDs into recent history
    if (typeof GameStorage !== 'undefined') {
      const selectedIds = this.questions.map(q => q.id);
      GameStorage.addRecentQuestionIds(selectedIds);
    }

    // Initialize Campus Connect session bridge
    if (typeof CampusConnect !== 'undefined') {
      CampusConnect.startSession();
    }

    // Initialize Timer
    const TimerClass = typeof GameTimer !== 'undefined' ? GameTimer : require('./timer').GameTimer;
    if (this.timer) {
      this.timer.stop();
    }
    this.timer = new TimerClass({
      durationSeconds: this.gameDurationSeconds,
      onTick: (remaining, formatted) => {
        this.callbacks.onTimerTick(remaining, formatted);
      },
      onExpire: () => {
        this.handleTimeout();
      }
    });

    this.timer.start();
    this.callbacks.onStateChange(this.state);
    this.loadQuestion(this.currentIndex);
  }

  /**
   * Prepares and displays the question at index.
   */
  loadQuestion(index) {
    if (index >= this.questions.length) {
      this.endGame(true);
      return;
    }

    this.currentIndex = index;
    this.hasAnsweredCurrent = false;
    this.selectedOptionIndex = null;
    this.state = "ACTIVE";

    this.currentQuestion = this.questions[index];

    if (this.timer) {
      this.timer.resetQuestionTimer();
    }

    this.callbacks.onStateChange(this.state);
    this.callbacks.onQuestionLoaded({
      questionNumber: this.currentIndex + 1,
      totalQuestions: this.questions.length,
      question: this.currentQuestion,
      currentScore: this.scoring.score,
      currentStreak: this.scoring.currentStreak
    });
  }

  /**
   * Sets the currently highlighted multiple-choice option.
   * @param {number} optionIndex (0-3)
   */
  selectOption(optionIndex) {
    if (this.state !== "ACTIVE" || this.hasAnsweredCurrent) return;
    if (optionIndex < 0 || optionIndex > 3) return;
    this.selectedOptionIndex = optionIndex;
  }

  /**
   * Submits the chosen answer and computes points.
   * @returns {Object|null}
   */
  submitAnswer() {
    if (this.state !== "ACTIVE" || this.hasAnsweredCurrent) return null;
    if (this.selectedOptionIndex === null) return null;

    this.hasAnsweredCurrent = true;
    this.state = "FEEDBACK";

    const timeSpent = this.timer ? this.timer.getQuestionElapsedSeconds() : 5;
    const remainingTime = this.timer ? this.timer.remainingSeconds : 0;
    const isCorrect = this.selectedOptionIndex === this.currentQuestion.correctShuffledIndex;

    const scoreResult = this.scoring.processAnswer(
      this.currentQuestion,
      isCorrect,
      timeSpent,
      remainingTime
    );

    const feedbackData = {
      isCorrect,
      selectedOption: this.selectedOptionIndex,
      correctOption: this.currentQuestion.correctShuffledIndex,
      explanation: this.currentQuestion.explanation,
      scoreResult,
      isLastQuestion: this.currentIndex + 1 >= this.questions.length
    };

    this.callbacks.onStateChange(this.state);
    this.callbacks.onFeedback(feedbackData);

    return feedbackData;
  }

  /**
   * Moves to the next question or finishes the game if at the end.
   */
  nextQuestion() {
    if (this.state !== "FEEDBACK") return;

    if (this.currentIndex + 1 >= this.questions.length) {
      this.endGame(true);
    } else {
      this.loadQuestion(this.currentIndex + 1);
    }
  }

  /**
   * Triggered when game countdown expires.
   */
  handleTimeout() {
    if (this.state === "COMPLETED") return;
    this.endGame(false);
  }

  /**
   * Concludes the game session and delivers result to Campus Connect / Local Storage.
   * @param {boolean} completedCompletedAll
   */
  endGame(completedCompletedAll = false) {
    if (this.state === "COMPLETED") return;

    this.state = "COMPLETED";
    if (this.timer) {
      this.timer.stop();
    }

    const duration = this.timer ? this.timer.getTotalElapsedSeconds() : 0;
    const baseSummary = this.scoring.getFinalSummary(completedCompletedAll, duration);

    // Compute modes and languages played during this session
    const questionsAttemptedList = this.questions.slice(0, this.scoring.questionsAttempted);
    const modesPlayed = Array.from(new Set(questionsAttemptedList.map(q => q.mode)));
    const languagesPlayed = Array.from(new Set(questionsAttemptedList.map(q => q.language)));

    const finalSummary = {
      ...baseSummary,
      metadata: {
        ...baseSummary.metadata,
        modesPlayed,
        modesCount: modesPlayed.length,
        languagesPlayed,
        languagesCount: languagesPlayed.length,
        highestDifficulty: this.scoring.highestDifficulty
      }
    };

    // Save to local storage for Standalone Mode history
    if (typeof GameStorage !== 'undefined') {
      GameStorage.saveScore(finalSummary.score, finalSummary.metadata);
    }

    // Dispatch to Campus Connect bridge if available
    let bridgeResult = null;
    if (typeof CampusConnect !== 'undefined') {
      bridgeResult = CampusConnect.submitResult(finalSummary);
    }

    this.callbacks.onStateChange(this.state);
    this.callbacks.onGameComplete({
      summary: finalSummary,
      bridgeDispatched: bridgeResult ? bridgeResult.dispatched : false
    });
  }
}

// Export for Node.js test environment or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CodeDebuggerGame
  };
}
