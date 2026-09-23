/**
 * Code Debugger - Timer System
 * Accurate drift-free countdown timer with per-question time tracking.
 */

class GameTimer {
  /**
   * @param {Object} options Configuration options
   * @param {number} options.durationSeconds Total countdown duration (default 300)
   * @param {Function} options.onTick Callback on every tick (remainingSecs, formattedStr)
   * @param {Function} options.onExpire Callback when time reaches zero
   */
  constructor(options = {}) {
    this.totalDuration = options.durationSeconds || 300;
    this.onTick = options.onTick || (() => {});
    this.onExpire = options.onExpire || (() => {});

    this.isRunning = false;
    this.timerId = null;
    this.startTime = 0;
    this.remainingSeconds = this.totalDuration;
    this.questionStartTime = 0;
  }

  /**
   * Starts or resumes the countdown timer.
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = Date.now();
    this.questionStartTime = Date.now();

    const tickInterval = 250; // Check 4 times per second for smooth UI

    this.timerId = setInterval(() => {
      if (!this.isRunning) return;

      const elapsedMs = Date.now() - this.startTime;
      const elapsedSec = elapsedMs / 1000;
      this.remainingSeconds = Math.max(0, this.totalDuration - elapsedSec);

      this.onTick(this.remainingSeconds, GameTimer.formatTime(this.remainingSeconds));

      if (this.remainingSeconds <= 0) {
        this.stop();
        this.onExpire();
      }
    }, tickInterval);

    // Initial immediate tick
    this.onTick(this.remainingSeconds, GameTimer.formatTime(this.remainingSeconds));
  }

  /**
   * Resets question start timer for speed bonus calculation.
   */
  resetQuestionTimer() {
    this.questionStartTime = Date.now();
  }

  /**
   * Returns seconds spent on the current question.
   * @returns {number} Elapsed seconds (floating point)
   */
  getQuestionElapsedSeconds() {
    if (!this.questionStartTime) return 0;
    return (Date.now() - this.questionStartTime) / 1000;
  }

  /**
   * Returns total game duration elapsed so far.
   * @returns {number} Elapsed seconds
   */
  getTotalElapsedSeconds() {
    return Math.max(0, this.totalDuration - this.remainingSeconds);
  }

  /**
   * Stops the timer and clears interval.
   */
  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Formats seconds into MM:SS.
   * @param {number} totalSeconds
   * @returns {string} e.g. "04:59"
   */
  static formatTime(totalSeconds) {
    const clamped = Math.max(0, Math.ceil(totalSeconds));
    const mins = Math.floor(clamped / 60);
    const secs = clamped % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// Export for Node.js test environment or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GameTimer
  };
}
