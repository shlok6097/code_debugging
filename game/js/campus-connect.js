/**
 * Campus Connect Game Bridge Adapter
 * Handles bridge communication with Campus Connect Flutter WebView / parent runtime
 * with transparent fallback to Standalone Browser Mode.
 */

const CampusConnect = (function () {
  let isSessionActive = false;
  let hasSubmitted = false;
  let cachedPayload = null;

  /**
   * Detects if the game is running inside an embedded Campus Connect runtime.
   * @returns {boolean}
   */
  function isEmbedded() {
    // 1. Flutter Android/Desktop Javascript Channel
    if (typeof window.CampusConnectBridge !== 'undefined' && typeof window.CampusConnectBridge.postMessage === 'function') {
      return true;
    }
    // 2. WebKit / iOS message handler
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.campusConnect) {
      return true;
    }
    // 3. IFrame embed with host window
    if (window.parent && window.parent !== window) {
      return true;
    }
    return false;
  }

  /**
   * Initializes a new game session.
   * Resets submission locks.
   */
  function startSession() {
    isSessionActive = true;
    hasSubmitted = false;
    cachedPayload = null;

    const eventData = {
      type: "CAMPUS_CONNECT_SESSION_START",
      timestamp: Date.now()
    };

    dispatchToHost(eventData);
    console.log("[CampusConnect] Session initialized. Mode:", isEmbedded() ? "Embedded" : "Standalone");
  }

  /**
   * Submits the final game result to the host bridge.
   * Enforces single-submission integrity.
   * @param {Object} payload Result object { score, completed, durationSeconds, metadata }
   * @returns {Object} Submission result status
   */
  function submitResult(payload) {
    if (hasSubmitted) {
      console.warn("[CampusConnect] Submission rejected: Result has already been submitted for this session.");
      return { success: false, reason: "ALREADY_SUBMITTED", payload: cachedPayload };
    }

    if (!payload || typeof payload.score !== 'number') {
      console.error("[CampusConnect] Invalid result payload provided.", payload);
      return { success: false, reason: "INVALID_PAYLOAD" };
    }

    hasSubmitted = true;
    isSessionActive = false;
    cachedPayload = Object.freeze({ ...payload });

    const submissionEvent = {
      type: "CAMPUS_CONNECT_SUBMIT_RESULT",
      gameId: "code-debugger",
      score: payload.score,
      completed: Boolean(payload.completed),
      durationSeconds: payload.durationSeconds,
      metadata: payload.metadata || {},
      timestamp: Date.now()
    };

    const dispatched = dispatchToHost(submissionEvent);

    console.log("[CampusConnect] Final score submitted:", payload.score, payload);
    return { success: true, dispatched, payload: cachedPayload };
  }

  /**
   * Low-level dispatcher to whichever bridge mechanism is active.
   * @param {Object} data
   * @returns {boolean} Whether an embedded host bridge handled the message
   */
  function dispatchToHost(data) {
    let sent = false;

    // Flutter JavascriptChannel
    if (typeof window.CampusConnectBridge !== 'undefined' && typeof window.CampusConnectBridge.postMessage === 'function') {
      try {
        window.CampusConnectBridge.postMessage(JSON.stringify(data));
        sent = true;
      } catch (e) {
        console.error("[CampusConnect] Flutter bridge dispatch error:", e);
      }
    }

    // WebKit iOS Message Handler
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.campusConnect) {
      try {
        window.webkit.messageHandlers.campusConnect.postMessage(data);
        sent = true;
      } catch (e) {
        console.error("[CampusConnect] WebKit bridge dispatch error:", e);
      }
    }

    // PostMessage for Web Iframes
    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({ source: "campus-connect-game", ...data }, "*");
        sent = true;
      } catch (e) {
        console.error("[CampusConnect] PostMessage dispatch error:", e);
      }
    }

    return sent;
  }

  return {
    isEmbedded,
    startSession,
    submitResult,
    hasSubmitted: () => hasSubmitted,
    isSessionActive: () => isSessionActive
  };
})();

// Export for Node.js test environment or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CampusConnect
  };
}
