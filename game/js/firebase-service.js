/**
 * Code Debugger - Firebase Database & Global Leaderboard Service
 * Connects directly to project's own Firebase Firestore (code-debugging-85c04)
 * Handles player identity (Name & Mobile) and live leaderboard synchronization.
 */

const FirebaseService = (function () {
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyApuZ8JZ2bkA6a8pnEaQqaksNxh21inSNg",
    authDomain: "code-debugging-85c04.firebaseapp.com",
    projectId: "code-debugging-85c04",
    storageBucket: "code-debugging-85c04.firebasestorage.app",
    messagingSenderId: "701467550566",
    appId: "1:701467550566:web:04560b6bb97c686f305ea7"
  };

  const STORAGE_KEYS = {
    PLAYER_PROFILE: "code_debugger_player_profile",
    LEADERBOARD_CACHE: "code_debugger_leaderboard_cache"
  };

  let db = null;
  let isInitialized = false;

  // Initialize Firebase Firestore SDK if available
  function init() {
    if (isInitialized) return;
    try {
      if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.firestore();
        isInitialized = true;
        console.log("[FirebaseService] Firebase Firestore initialized for code-debugging-85c04");
      }
    } catch (err) {
      console.warn("[FirebaseService] SDK init warning:", err);
    }
  }

  // Get locally stored player info (Name, Mobile)
  function getPlayerProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  // Save or update player profile
  function savePlayerProfile(name, mobile) {
    try {
      const profile = {
        name: (name || "").trim(),
        mobile: (mobile || "").trim(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.PLAYER_PROFILE, JSON.stringify(profile));
      return profile;
    } catch (e) {
      console.warn("[FirebaseService] Failed to save player profile:", e);
      return { name, mobile };
    }
  }

  // Helper to mask mobile number for leaderboard privacy (e.g., 9876543210 -> 98****3210)
  function maskMobile(mobile) {
    if (!mobile) return "Anonymous";
    const cleaned = mobile.toString().replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `${cleaned.slice(0, 2)}****${cleaned.slice(-4)}`;
    }
    if (cleaned.length > 4) {
      return `${cleaned.slice(0, 2)}****`;
    }
    return "****";
  }

  // Format date to relative or clean format
  function formatRelativeDate(isoDateStr) {
    if (!isoDateStr) return "Just now";
    try {
      const date = new Date(isoDateStr);
      const now = new Date();
      const diffSec = Math.floor((now - date) / 1000);

      if (diffSec < 60) return "Just now";
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch (e) {
      return "Recently";
    }
  }

  // Save final score to Firestore
  async function saveScoreToLeaderboard(entry) {
    init();

    const record = {
      name: entry.name || "Anonymous Runner",
      mobile: entry.mobile || "",
      score: parseInt(entry.score, 10) || 0,
      accuracy: entry.accuracy || 0,
      difficulty: entry.difficulty || "Easy",
      correctAnswers: entry.correctAnswers || 0,
      totalQuestions: entry.totalQuestions || 15,
      durationMinutes: entry.durationMinutes || 5,
      modesCount: entry.modesCount || 1,
      durationSeconds: entry.durationSeconds || 0,
      timestamp: new Date().toISOString()
    };

    // 1. Update local leaderboard cache immediately for snappy UI
    updateLocalLeaderboardCache(record);

    // 2. Write to Firebase Firestore
    let savedToCloud = false;

    // Try Firestore SDK
    if (db) {
      try {
        await db.collection("leaderboard").add(record);
        console.log("[FirebaseService] Score successfully saved to Firestore SDK");
        savedToCloud = true;
      } catch (err) {
        console.warn("[FirebaseService] Firestore SDK save failed, falling back to REST:", err);
      }
    }

    // Fallback: Firestore REST API
    if (!savedToCloud) {
      try {
        const restUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/leaderboard`;
        const restBody = {
          fields: {
            name: { stringValue: record.name },
            mobile: { stringValue: record.mobile },
            score: { integerValue: record.score.toString() },
            accuracy: { integerValue: (record.accuracy || 0).toString() },
            difficulty: { stringValue: record.difficulty.toString() },
            correctAnswers: { integerValue: (record.correctAnswers || 0).toString() },
            totalQuestions: { integerValue: (record.totalQuestions || 15).toString() },
            durationMinutes: { integerValue: (record.durationMinutes || 5).toString() },
            modesCount: { integerValue: (record.modesCount || 1).toString() },
            durationSeconds: { integerValue: (record.durationSeconds || 0).toString() },
            timestamp: { stringValue: record.timestamp }
          }
        };

        const res = await fetch(restUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(restBody)
        });

        if (res.ok) {
          console.log("[FirebaseService] Score successfully saved via Firestore REST API");
          savedToCloud = true;
        }
      } catch (restErr) {
        console.warn("[FirebaseService] REST API save failed:", restErr);
      }
    }

    return { record, savedToCloud };
  }

  // Update local leaderboard cache
  function updateLocalLeaderboardCache(record) {
    try {
      let list = getCachedLeaderboard();
      list.push(record);
      // Sort descending by score
      list.sort((a, b) => b.score - a.score);
      // Keep top 20
      list = list.slice(0, 20);
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD_CACHE, JSON.stringify(list));
    } catch (e) {
      console.warn("[FirebaseService] Failed updating leaderboard cache:", e);
    }
  }

  // Get cached leaderboard
  function getCachedLeaderboard() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD_CACHE);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Fetch live leaderboard from Firebase Firestore
  // Fetch live leaderboard from Firebase Firestore
  async function fetchLeaderboard(limitCount = 50) {
    init();

    let scores = [];

    // Method 1: Try Firestore SDK
    if (db) {
      try {
        const snapshot = await db.collection("leaderboard")
          .orderBy("score", "desc")
          .limit(limitCount)
          .get();

        snapshot.forEach(doc => {
          const d = doc.data();
          const dur = d.durationMinutes || 5;
          scores.push({
            id: doc.id,
            name: d.name || "Anonymous Runner",
            mobile: d.mobile || "",
            score: typeof d.score === 'number' ? d.score : parseInt(d.score, 10) || 0,
            accuracy: d.accuracy || 0,
            difficulty: d.difficulty || "Easy",
            totalQuestions: d.totalQuestions || (dur === 2 ? 6 : (dur === 3 ? 10 : 15)),
            durationMinutes: dur,
            timestamp: d.timestamp || new Date().toISOString()
          });
        });

        if (scores.length > 0) {
          localStorage.setItem(STORAGE_KEYS.LEADERBOARD_CACHE, JSON.stringify(scores));
          return scores;
        }
      } catch (sdkErr) {
        console.warn("[FirebaseService] Firestore SDK fetch failed, trying REST:", sdkErr);
      }
    }

    // Method 2: Fallback to Firestore REST API Structured Query
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents:runQuery`;
      const structuredQuery = {
        structuredQuery: {
          from: [{ collectionId: "leaderboard" }],
          orderBy: [{
            field: { fieldPath: "score" },
            direction: "DESCENDING"
          }],
          limit: limitCount
        }
      };

      const res = await fetch(restUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(structuredQuery)
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = (data || []).filter(item => item.document && item.document.fields).map(item => {
          const f = item.document.fields;
          const dur = f.durationMinutes ? parseInt(f.durationMinutes.integerValue || f.durationMinutes.stringValue, 10) : 5;
          return {
            name: f.name ? f.name.stringValue : "Anonymous Runner",
            mobile: f.mobile ? f.mobile.stringValue : "",
            score: f.score ? (parseInt(f.score.integerValue || f.score.stringValue, 10) || 0) : 0,
            accuracy: f.accuracy ? (parseInt(f.accuracy.integerValue || f.accuracy.stringValue, 10) || 0) : 0,
            difficulty: f.difficulty ? f.difficulty.stringValue : "Easy",
            totalQuestions: f.totalQuestions ? parseInt(f.totalQuestions.integerValue || f.totalQuestions.stringValue, 10) : (dur === 2 ? 6 : (dur === 3 ? 10 : 15)),
            durationMinutes: dur,
            timestamp: f.timestamp ? f.timestamp.stringValue : ""
          };
        });

        if (parsed.length > 0) {
          localStorage.setItem(STORAGE_KEYS.LEADERBOARD_CACHE, JSON.stringify(parsed));
          return parsed;
        }
      }
    } catch (restErr) {
      console.warn("[FirebaseService] REST query failed:", restErr);
    }

    // Fallback: return cached local leaderboard
    return getCachedLeaderboard();
  }

  // Subscribe to real-time leaderboard updates (optional realtime listener)
  function subscribeLeaderboard(callback, limitCount = 50) {
    init();
    if (db) {
      try {
        return db.collection("leaderboard")
          .orderBy("score", "desc")
          .limit(limitCount)
          .onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              const d = doc.data();
              const dur = d.durationMinutes || 5;
              list.push({
                id: doc.id,
                name: d.name || "Anonymous Runner",
                mobile: d.mobile || "",
                score: typeof d.score === 'number' ? d.score : parseInt(d.score, 10) || 0,
                accuracy: d.accuracy || 0,
                difficulty: d.difficulty || "Easy",
                totalQuestions: d.totalQuestions || (dur === 2 ? 6 : (dur === 3 ? 10 : 15)),
                durationMinutes: dur,
                timestamp: d.timestamp || new Date().toISOString()
              });
            });
            callback(list);
          }, err => {
            console.warn("[FirebaseService] Realtime subscription error:", err);
            fetchLeaderboard(limitCount).then(callback);
          });
      } catch (e) {
        console.warn("[FirebaseService] Realtime listener setup failed:", e);
      }
    }
    // Fallback one-time fetch
    fetchLeaderboard(limitCount).then(callback);
    return () => {};
  }

  return {
    init,
    getPlayerProfile,
    savePlayerProfile,
    maskMobile,
    formatRelativeDate,
    saveScoreToLeaderboard,
    fetchLeaderboard,
    subscribeLeaderboard,
    getCachedLeaderboard
  };
})();

// Export for Node.js / test environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FirebaseService };
}
