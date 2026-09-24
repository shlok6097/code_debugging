/**
 * Code Debugger - Main UI Controller & Audio Synthesizer
 * Binds DOM elements, manages Web Audio sound effects, keyboard shortcuts, mode banners, and contextual callouts.
 */

// ==========================================
// Web Audio API Sound Synthesizer (Zero-Asset SFX)
// ==========================================
const SoundSynth = (function () {
  let audioCtx = null;
  let isMuted = false;

  function initContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.15) {
    if (isMuted) return;
    try {
      initContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio failure if restricted by browser autoplay policy
    }
  }

  return {
    setMuted: (muted) => { isMuted = muted; },
    isMuted: () => isMuted,
    playSelect: () => playTone(540, 'triangle', 0.05, 0.08),
    playCorrect: () => {
      playTone(587.33, 'sine', 0.1, 0.15); // D5
      setTimeout(() => playTone(880, 'sine', 0.2, 0.2), 90); // A5
    },
    playIncorrect: () => {
      playTone(220, 'sawtooth', 0.15, 0.15);
      setTimeout(() => playTone(164.81, 'sawtooth', 0.25, 0.15), 100);
    },
    playStreak: () => {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'triangle', 0.12, 0.15), i * 70);
      });
    },
    playGameOver: () => {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'sine', 0.25, 0.18), i * 110);
      });
    }
  };
})();

// ==========================================
// Code Syntax Highlighter (Pure JS)
// ==========================================
function highlightCode(code, language) {
  const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = code.split('\n');
  const formattedLines = lines.map((line, index) => {
    let safeLine = escapeHtml(line);

    if (language && language.toUpperCase() === 'SQL') {
      const sqlKeywords = /\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|COUNT|SUM|AVG|MIN|MAX|OVER|PARTITION BY|ROWS|RANGE|UNBOUNDED|PRECEDING|CURRENT ROW|UNION|ALL|AS|DISTINCT|IS|NULL|NOT|IN|EXISTS|AND|OR|INSERT|UPDATE|DELETE|SET|VALUES)\b/gi;
      safeLine = safeLine.replace(sqlKeywords, '<span class="tok-sql-keyword">$1</span>');
      safeLine = safeLine.replace(/\b(\d+)\b/g, '<span class="tok-number">$1</span>');
      safeLine = safeLine.replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span class="tok-string">$1</span>');
      safeLine = safeLine.replace(/(--.*$)/g, '<span class="tok-comment">$1</span>');
    } else {
      // General language keywords
      const keywords = /\b(def|function|return|let|const|var|if|else|elif|while|for|in|class|public|private|protected|void|int|double|float|char|size_t|new|delete|delete\[\]|async|await|static|final|boolean|bool|std|cout|cin|vector|auto|template|typename|struct|import|from|try|except|catch|throw)\b/g;
      safeLine = safeLine.replace(keywords, '<span class="tok-keyword">$1</span>');
      safeLine = safeLine.replace(/\b(\d+)\b/g, '<span class="tok-number">$1</span>');
      safeLine = safeLine.replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span class="tok-string">$1</span>');
      safeLine = safeLine.replace(/(\/\/.*$|#.*$)/g, '<span class="tok-comment">$1</span>');
    }

    return `<div class="code-line"><span class="line-num">${index + 1}</span><span class="line-code">${safeLine}</span></div>`;
  });

  return formattedLines.join('');
}

// ==========================================
// Main Application Controller
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    results: document.getElementById('results-screen')
  };

  const hud = {
    container: document.getElementById('game-hud'),
    progressFill: document.getElementById('hud-progress-fill'),
    questionCount: document.getElementById('hud-question-count'),
    difficultyBadge: document.getElementById('hud-difficulty-badge'),
    timerText: document.getElementById('hud-timer-text'),
    scoreText: document.getElementById('hud-score-text'),
    streakContainer: document.getElementById('hud-streak-container'),
    streakCount: document.getElementById('hud-streak-count'),
    modeBadge: document.getElementById('hud-mode-badge')
  };

  const questionElements = {
    modeBar: document.getElementById('question-mode-bar'),
    modeIcon: document.getElementById('question-mode-icon'),
    modeName: document.getElementById('question-mode-name'),
    title: document.getElementById('question-title'),
    languageBadge: document.getElementById('question-lang-badge'),
    difficultyMeter: document.getElementById('question-diff-meter'),
    description: document.getElementById('question-description'),
    contextCallout: document.getElementById('question-context-callout'),
    codeBlock: document.getElementById('question-code-block'),
    optionsGrid: document.getElementById('options-grid'),
    submitBtn: document.getElementById('submit-answer-btn')
  };

  const feedbackModal = {
    container: document.getElementById('feedback-modal'),
    statusTitle: document.getElementById('feedback-status-title'),
    pointsEarned: document.getElementById('feedback-points-earned'),
    baseBreakdown: document.getElementById('feedback-base-points'),
    speedBreakdown: document.getElementById('feedback-speed-bonus'),
    streakBreakdown: document.getElementById('feedback-streak-bonus'),
    explanationText: document.getElementById('feedback-explanation'),
    nextBtn: document.getElementById('feedback-next-btn')
  };

  const resultsElements = {
    finalScore: document.getElementById('res-final-score'),
    cloudStatus: document.getElementById('res-cloud-status'),
    cloudStatusText: document.getElementById('res-cloud-status-text'),
    questionsRatio: document.getElementById('res-questions-ratio'),
    correctCount: document.getElementById('res-correct-count'),
    accuracyPercent: document.getElementById('res-accuracy'),
    totalTime: document.getElementById('res-time'),
    bestStreak: document.getElementById('res-best-streak'),
    diffReached: document.getElementById('res-diff-reached'),
    modesCount: document.getElementById('res-modes-count'),
    languagesCount: document.getElementById('res-languages-count'),
    playAgainBtn: document.getElementById('res-play-again-btn'),
    homeBtn: document.getElementById('res-home-btn'),
    historyBtn: document.getElementById('res-view-history-btn'),
    historyContainer: document.getElementById('res-history-container'),
    historyList: document.getElementById('res-history-list')
  };

  const DURATION_CONFIGS = {
    2: { minutes: 2, seconds: 120, questions: 6, label: "2 Min (6 Questions)" },
    3: { minutes: 3, seconds: 180, questions: 10, label: "3 Min (10 Questions)" },
    5: { minutes: 5, seconds: 300, questions: 15, label: "5 Min (15 Questions)" }
  };
  let currentDurationMinutes = 5;

  const startElements = {
    startBtn: document.getElementById('start-game-btn'),
    highScore: document.getElementById('start-high-score'),
    gamesPlayed: document.getElementById('start-games-played'),
    bestStreak: document.getElementById('start-best-streak'),
    modesMastered: document.getElementById('start-modes-mastered'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    runnerBanner: document.getElementById('active-runner-banner'),
    runnerName: document.getElementById('active-runner-name'),
    runnerMobile: document.getElementById('active-runner-mobile'),
    changeRunnerBtn: document.getElementById('change-runner-btn'),
    durationPills: document.querySelectorAll('.duration-pill')
  };

  const leaderboardElements = {
    tabs: document.querySelectorAll('.lb-tab-btn'),
    podium1: {
      avatar: document.getElementById('podium-1-avatar'),
      name: document.getElementById('podium-1-name'),
      score: document.getElementById('podium-1-score'),
      handle: document.getElementById('podium-1-handle')
    },
    podium2: {
      avatar: document.getElementById('podium-2-avatar'),
      name: document.getElementById('podium-2-name'),
      score: document.getElementById('podium-2-score'),
      handle: document.getElementById('podium-2-handle')
    },
    podium3: {
      avatar: document.getElementById('podium-3-avatar'),
      name: document.getElementById('podium-3-name'),
      score: document.getElementById('podium-3-score'),
      handle: document.getElementById('podium-3-handle')
    },
    runnersList: document.getElementById('lb-runners-list'),
    refreshBtn: document.getElementById('leaderboard-refresh-btn')
  };

  let allLeaderboardRecords = [];
  let activeLeaderboardTab = 5;

  const playerModal = {
    container: document.getElementById('player-modal'),
    form: document.getElementById('player-form'),
    nameInput: document.getElementById('player-name-input'),
    mobileInput: document.getElementById('player-mobile-input'),
    nameError: document.getElementById('name-error'),
    mobileError: document.getElementById('mobile-error'),
    roundText: document.getElementById('modal-round-text'),
    cancelBtn: document.getElementById('player-modal-cancel-btn'),
    submitBtn: document.getElementById('player-modal-submit-btn')
  };

  // Sound & Duration Settings Init
  const settings = GameStorage.getSettings();
  SoundSynth.setMuted(!settings.soundEnabled);
  updateSoundToggleButton();

  if (settings.preferredDurationMinutes && DURATION_CONFIGS[settings.preferredDurationMinutes]) {
    currentDurationMinutes = settings.preferredDurationMinutes;
    activeLeaderboardTab = currentDurationMinutes;
  }
  updateDurationSelectorUI();
  updateLeaderboardTabsUI();

  function updateDurationSelectorUI() {
    startElements.durationPills.forEach(pill => {
      const dur = parseInt(pill.dataset.duration, 10);
      const isSelected = (dur === currentDurationMinutes);
      pill.classList.toggle('active', isSelected);
      pill.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });

    if (playerModal.roundText) {
      const cfg = DURATION_CONFIGS[currentDurationMinutes] || DURATION_CONFIGS[5];
      playerModal.roundText.textContent = cfg.label;
    }
  }

  function updateLeaderboardTabsUI() {
    leaderboardElements.tabs.forEach(tab => {
      const dur = parseInt(tab.dataset.tabDuration, 10);
      const isActive = (dur === activeLeaderboardTab);
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Duration Pills selection handler
  startElements.durationPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const dur = parseInt(pill.dataset.duration, 10);
      if (DURATION_CONFIGS[dur]) {
        currentDurationMinutes = dur;
        activeLeaderboardTab = dur; // Auto-sync leaderboard tab
        updateDurationSelectorUI();
        updateLeaderboardTabsUI();
        renderLeaderboard();
        SoundSynth.playSelect();
        GameStorage.saveSettings({ ...GameStorage.getSettings(), preferredDurationMinutes: currentDurationMinutes });
      }
    });
  });

  // Leaderboard Tab Button Listeners (2 Mins, 3 Mins, 5 Mins)
  leaderboardElements.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const dur = parseInt(tab.dataset.tabDuration, 10);
      activeLeaderboardTab = dur;
      updateLeaderboardTabsUI();
      SoundSynth.playSelect();
      renderLeaderboard();
    });
  });

  function updateSoundToggleButton() {
    if (startElements.soundToggleBtn) {
      startElements.soundToggleBtn.innerHTML = SoundSynth.isMuted()
        ? `<span class="icon">🔇</span> Sound: OFF`
        : `<span class="icon">🔊</span> Sound: ON`;
    }
  }

  if (startElements.soundToggleBtn) {
    startElements.soundToggleBtn.addEventListener('click', () => {
      const newMuted = !SoundSynth.isMuted();
      SoundSynth.setMuted(newMuted);
      GameStorage.saveSettings({ ...GameStorage.getSettings(), soundEnabled: !newMuted });
      updateSoundToggleButton();
      if (!newMuted) SoundSynth.playSelect();
    });
  }

  // Active Runner Profile Management
  function updateRunnerBanner() {
    if (typeof FirebaseService === 'undefined') return;
    const profile = FirebaseService.getPlayerProfile();
    if (profile && profile.name && profile.mobile) {
      if (startElements.runnerBanner) startElements.runnerBanner.classList.remove('hidden');
      if (startElements.runnerName) startElements.runnerName.textContent = profile.name;
      if (startElements.runnerMobile) startElements.runnerMobile.textContent = `(${FirebaseService.maskMobile(profile.mobile)})`;
    } else {
      if (startElements.runnerBanner) startElements.runnerBanner.classList.add('hidden');
    }
  }
  updateRunnerBanner();

  function openPlayerModal() {
    playerModal.container.classList.remove('hidden');
    playerModal.nameError.classList.add('hidden');
    playerModal.mobileError.classList.add('hidden');
    updateDurationSelectorUI();

    if (typeof FirebaseService !== 'undefined') {
      const profile = FirebaseService.getPlayerProfile();
      if (profile) {
        playerModal.nameInput.value = profile.name || '';
        playerModal.mobileInput.value = profile.mobile || '';
      }
    }
    playerModal.nameInput.focus();
  }

  function closePlayerModal() {
    playerModal.container.classList.add('hidden');
  }

  if (startElements.changeRunnerBtn) {
    startElements.changeRunnerBtn.addEventListener('click', () => {
      SoundSynth.playSelect();
      openPlayerModal();
    });
  }

  if (playerModal.cancelBtn) {
    playerModal.cancelBtn.addEventListener('click', () => {
      closePlayerModal();
    });
  }

  // Validate Name and 10-digit Mobile Number
  if (playerModal.form) {
    playerModal.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawName = playerModal.nameInput.value.trim();
      const rawMobile = playerModal.mobileInput.value.trim().replace(/\D/g, '');

      let isValid = true;

      if (!rawName || rawName.length < 2) {
        playerModal.nameError.classList.remove('hidden');
        isValid = false;
      } else {
        playerModal.nameError.classList.add('hidden');
      }

      if (!rawMobile || rawMobile.length !== 10) {
        playerModal.mobileError.classList.remove('hidden');
        isValid = false;
      } else {
        playerModal.mobileError.classList.add('hidden');
      }

      if (!isValid) return;

      if (typeof FirebaseService !== 'undefined') {
        FirebaseService.savePlayerProfile(rawName, rawMobile);
      }

      updateRunnerBanner();
      closePlayerModal();
      SoundSynth.playSelect();

      const cfg = DURATION_CONFIGS[currentDurationMinutes] || DURATION_CONFIGS[5];
      game.start({
        totalQuestionsCount: cfg.questions,
        gameDurationSeconds: cfg.seconds,
        durationMinutes: cfg.minutes
      });
    });
  }

  // ==========================================
  // Live Global Podium Leaderboard (Firebase)
  // ==========================================
  function renderLeaderboard() {
    if (!leaderboardElements.runnersList) return;

    // Filter scores by active tab duration (2, 3, or 5 mins)
    const filtered = allLeaderboardRecords.filter(item => {
      const dur = item.durationMinutes || (item.totalQuestions === 6 ? 2 : item.totalQuestions === 10 ? 3 : 5);
      return dur === activeLeaderboardTab;
    });

    // Sort descending by score
    filtered.sort((a, b) => (b.score || 0) - (a.score || 0));

    const currentProfile = (typeof FirebaseService !== 'undefined') ? FirebaseService.getPlayerProfile() : null;

    // Populate Top 3 Podium
    const rank1 = filtered[0];
    const rank2 = filtered[1];
    const rank3 = filtered[2];

    // Rank 1 (Center)
    if (rank1) {
      leaderboardElements.podium1.avatar.textContent = (rank1.name || 'R').charAt(0).toUpperCase();
      leaderboardElements.podium1.name.textContent = rank1.name || 'Anonymous';
      leaderboardElements.podium1.score.textContent = (rank1.score || 0).toLocaleString();
      leaderboardElements.podium1.handle.textContent = `@${FirebaseService.maskMobile(rank1.mobile)}`;
    } else {
      leaderboardElements.podium1.avatar.textContent = '👑';
      leaderboardElements.podium1.name.textContent = 'No Winner Yet';
      leaderboardElements.podium1.score.textContent = '--';
      leaderboardElements.podium1.handle.textContent = 'Play to claim #1';
    }

    // Rank 2 (Left)
    if (rank2) {
      leaderboardElements.podium2.avatar.textContent = (rank2.name || 'R').charAt(0).toUpperCase();
      leaderboardElements.podium2.name.textContent = rank2.name || 'Anonymous';
      leaderboardElements.podium2.score.textContent = (rank2.score || 0).toLocaleString();
      leaderboardElements.podium2.handle.textContent = `@${FirebaseService.maskMobile(rank2.mobile)}`;
    } else {
      leaderboardElements.podium2.avatar.textContent = '🥈';
      leaderboardElements.podium2.name.textContent = 'Open Spot';
      leaderboardElements.podium2.score.textContent = '--';
      leaderboardElements.podium2.handle.textContent = 'Claim Rank #2';
    }

    // Rank 3 (Right)
    if (rank3) {
      leaderboardElements.podium3.avatar.textContent = (rank3.name || 'R').charAt(0).toUpperCase();
      leaderboardElements.podium3.name.textContent = rank3.name || 'Anonymous';
      leaderboardElements.podium3.score.textContent = (rank3.score || 0).toLocaleString();
      leaderboardElements.podium3.handle.textContent = `@${FirebaseService.maskMobile(rank3.mobile)}`;
    } else {
      leaderboardElements.podium3.avatar.textContent = '🥉';
      leaderboardElements.podium3.name.textContent = 'Open Spot';
      leaderboardElements.podium3.score.textContent = '--';
      leaderboardElements.podium3.handle.textContent = 'Claim Rank #3';
    }

    // Populate Rank 4+ List
    const remaining = filtered.slice(3);
    if (remaining.length === 0) {
      if (filtered.length === 0) {
        leaderboardElements.runnersList.innerHTML = `
          <li class="empty-podium-state">
            <div class="empty-icon">🏆</div>
            <p>No games recorded yet in <strong>${activeLeaderboardTab} Min Mode</strong>.<br>Be the first runner to enter the hall of fame!</p>
          </li>
        `;
      } else {
        leaderboardElements.runnersList.innerHTML = `
          <li class="empty-podium-state" style="padding: 1.25rem;">
            <p style="color: var(--text-dim); font-size: 0.85rem;">Top ${filtered.length} runner(s) shown on podium above. More players will appear here!</p>
          </li>
        `;
      }
      return;
    }

    const listHtml = remaining.map((item, idx) => {
      const rankNum = idx + 4;
      const initial = (item.name || 'R').charAt(0).toUpperCase();
      const maskedPhone = FirebaseService.maskMobile(item.mobile);
      const isCurrent = currentProfile && 
        (currentProfile.name.toLowerCase() === (item.name || '').toLowerCase()) && 
        (currentProfile.mobile.replace(/\D/g, '') === (item.mobile || '').replace(/\D/g, ''));

      return `
        <li class="lb-runner-item ${isCurrent ? 'current-user-item' : ''}">
          <div class="lb-runner-left">
            <span class="lb-runner-rank">#${rankNum}</span>
            <div class="lb-runner-avatar">${initial}</div>
            <div class="lb-runner-details">
              <span class="lb-runner-name">${escapeHtml(item.name || 'Runner')}</span>
              <span class="lb-runner-handle">@${maskedPhone}</span>
            </div>
          </div>
          <div class="lb-runner-right">
            <span class="lb-runner-score">${(item.score || 0).toLocaleString()}</span>
            <span class="lb-runner-acc">▲ ${item.accuracy || 0}% acc</span>
          </div>
        </li>
      `;
    }).join('');

    leaderboardElements.runnersList.innerHTML = listHtml;
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function loadLeaderboard(isManual = false) {
    if (typeof FirebaseService === 'undefined') return;
    if (isManual && leaderboardElements.refreshBtn) {
      leaderboardElements.refreshBtn.classList.add('refreshing');
    }

    try {
      allLeaderboardRecords = await FirebaseService.fetchLeaderboard(50);
      renderLeaderboard();
    } catch (err) {
      console.warn("[Leaderboard] Fetch error:", err);
    } finally {
      if (leaderboardElements.refreshBtn) {
        leaderboardElements.refreshBtn.classList.remove('refreshing');
      }
    }
  }

  // Initial fetch and Realtime Sync
  if (typeof FirebaseService !== 'undefined') {
    FirebaseService.init();
    loadLeaderboard();
    FirebaseService.subscribeLeaderboard((scores) => {
      allLeaderboardRecords = scores || [];
      renderLeaderboard();
    }, 50);
  }

  if (leaderboardElements.refreshBtn) {
    leaderboardElements.refreshBtn.addEventListener('click', () => {
      SoundSynth.playSelect();
      loadLeaderboard(true);
    });
  }

  // Refresh Start Screen Lifetime Statistics
  function refreshStartScreenStats() {
    const stats = GameStorage.getStats();
    const highScore = GameStorage.getHighScore();

    if (startElements.highScore) startElements.highScore.textContent = highScore.toLocaleString();
    if (startElements.gamesPlayed) startElements.gamesPlayed.textContent = (stats.gamesPlayed || 0).toString();
    if (startElements.bestStreak) startElements.bestStreak.textContent = `${stats.bestStreak || 0}x`;
    if (startElements.modesMastered) {
      const modesCount = (stats.modesEncountered || []).length;
      startElements.modesMastered.textContent = `${modesCount}/16`;
    }
  }
  refreshStartScreenStats();

  // Set mode badge (Embedded Campus Connect vs Standalone)
  const isEmbedded = CampusConnect.isEmbedded();
  if (hud.modeBadge) {
    hud.modeBadge.textContent = isEmbedded ? "Campus Connect" : "Standalone Mode";
    hud.modeBadge.className = isEmbedded ? "mode-badge embedded" : "mode-badge standalone";
  }

  // Initialize Game Instance
  const game = new CodeDebuggerGame({
    totalQuestionsCount: 15,
    gameDurationSeconds: 300, // 5 minutes countdown

    onStateChange: (state) => {
      screens.start.classList.toggle('hidden', state !== 'IDLE');
      screens.game.classList.toggle('hidden', state !== 'ACTIVE' && state !== 'FEEDBACK');
      screens.results.classList.toggle('hidden', state !== 'COMPLETED');
      hud.container.classList.toggle('hidden', state === 'IDLE');
    },

    onQuestionLoaded: (data) => {
      feedbackModal.container.classList.add('hidden');
      renderQuestion(data);
    },

    onTimerTick: (remaining, formatted) => {
      if (hud.timerText) {
        hud.timerText.textContent = formatted;
        if (remaining <= 30) {
          hud.timerText.classList.add('timer-warning');
        } else {
          hud.timerText.classList.remove('timer-warning');
        }
      }
    },

    onFeedback: (feedbackData) => {
      renderFeedback(feedbackData);
    },

    onGameComplete: (resultData) => {
      feedbackModal.container.classList.add('hidden');
      renderResults(resultData.summary);
      SoundSynth.playGameOver();
    }
  });

  // Render question into DOM
  function renderQuestion(data) {
    const { questionNumber, totalQuestions, question, currentScore, currentStreak } = data;

    // Update HUD
    hud.questionCount.textContent = `Question ${questionNumber} / ${totalQuestions}`;
    hud.progressFill.style.width = `${(questionNumber / totalQuestions) * 100}%`;
    hud.scoreText.textContent = currentScore.toLocaleString();

    // Streak badge
    if (currentStreak >= 2) {
      hud.streakContainer.classList.remove('hidden');
      hud.streakCount.textContent = `${currentStreak}x STREAK 🔥`;
    } else {
      hud.streakContainer.classList.add('hidden');
    }

    // Difficulty badge
    const tierName = ScoringSystem.getDifficultyTier(question.difficulty);
    hud.difficultyBadge.textContent = `DIFF: ${tierName.toUpperCase()} (${question.difficulty}/10)`;
    hud.difficultyBadge.className = `diff-badge diff-${tierName.toLowerCase().replace('-', '')}`;

    // Mode Banner
    const modeInfo = DEBUGGING_MODES[question.mode] || { name: question.mode, icon: "⚡" };
    if (questionElements.modeIcon) questionElements.modeIcon.textContent = modeInfo.icon;
    if (questionElements.modeName) questionElements.modeName.textContent = `MODE: ${modeInfo.name.toUpperCase()}`;

    // Question header & description
    questionElements.title.textContent = question.title;
    questionElements.languageBadge.textContent = question.language.toUpperCase();
    questionElements.languageBadge.className = `lang-badge lang-${question.language.toLowerCase().replace('++', 'pp')}`;
    questionElements.description.textContent = question.description;

    // Difficulty meter blocks
    let meterHtml = '';
    for (let i = 1; i <= 10; i++) {
      meterHtml += `<span class="meter-block ${i <= question.difficulty ? 'filled' : ''}"></span>`;
    }
    questionElements.difficultyMeter.innerHTML = meterHtml;

    // Contextual Callout (Output Detective or Runtime Rescue)
    if (questionElements.contextCallout) {
      if (question.mode === 'output_detective' && (question.expectedOutput || question.actualOutput)) {
        questionElements.contextCallout.innerHTML = `
          <div class="output-detective-grid">
            <div class="output-box expected">
              <div class="output-box-label">✓ Expected Output</div>
              <div class="output-box-val">${question.expectedOutput || ''}</div>
            </div>
            <div class="output-box actual">
              <div class="output-box-label">✕ Actual Output</div>
              <div class="output-box-val">${question.actualOutput || ''}</div>
            </div>
          </div>
        `;
        questionElements.contextCallout.classList.remove('hidden');
      } else if (question.mode === 'runtime_rescue' && question.runtimeError) {
        questionElements.contextCallout.innerHTML = `
          <div class="runtime-error-box">
            <div class="runtime-error-label">🚨 Fatal Runtime Error</div>
            <div class="runtime-error-val">${question.runtimeError}</div>
          </div>
        `;
        questionElements.contextCallout.classList.remove('hidden');
      } else {
        questionElements.contextCallout.innerHTML = '';
        questionElements.contextCallout.classList.add('hidden');
      }
    }

    // Code formatting
    questionElements.codeBlock.innerHTML = highlightCode(question.code, question.language);

    // Render 4 answer option buttons
    questionElements.optionsGrid.innerHTML = '';
    const optionLabels = ['A', 'B', 'C', 'D'];

    question.shuffledOptions.forEach((optionText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-card';
      btn.dataset.index = idx;
      btn.innerHTML = `
        <span class="option-key">${optionLabels[idx]}</span>
        <span class="option-text">${optionText}</span>
      `;

      btn.addEventListener('click', () => {
        if (game.state !== 'ACTIVE') return;
        SoundSynth.playSelect();
        document.querySelectorAll('.option-card').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        game.selectOption(idx);
        questionElements.submitBtn.disabled = false;
      });

      questionElements.optionsGrid.appendChild(btn);
    });

    questionElements.submitBtn.disabled = true;
  }

  // Render feedback popup modal
  function renderFeedback(feedback) {
    const { isCorrect, selectedOption, correctOption, explanation, scoreResult } = feedback;

    feedbackModal.container.classList.remove('hidden');

    if (isCorrect) {
      feedbackModal.statusTitle.textContent = "✓ CORRECT FIX IDENTIFIED";
      feedbackModal.statusTitle.className = "feedback-title text-success";
      feedbackModal.pointsEarned.textContent = `+${scoreResult.totalPointsEarned} POINTS`;
      feedbackModal.baseBreakdown.textContent = `Base: +${scoreResult.basePoints}`;
      feedbackModal.speedBreakdown.textContent = `Speed: +${scoreResult.speedBonus}`;
      feedbackModal.streakBreakdown.textContent = `Streak: +${scoreResult.streakBonus}`;

      if (scoreResult.currentStreak >= 3) {
        SoundSynth.playStreak();
      } else {
        SoundSynth.playCorrect();
      }
    } else {
      feedbackModal.statusTitle.textContent = "✕ INCORRECT FIX";
      feedbackModal.statusTitle.className = "feedback-title text-danger";
      feedbackModal.pointsEarned.textContent = "+0 POINTS";
      feedbackModal.baseBreakdown.textContent = "Base: +0";
      feedbackModal.speedBreakdown.textContent = "Speed: +0";
      feedbackModal.streakBreakdown.textContent = "Streak: Reset";
      SoundSynth.playIncorrect();
    }

    feedbackModal.explanationText.textContent = explanation;

    // Highlight options in optionsGrid
    const cards = document.querySelectorAll('.option-card');
    cards.forEach((card, idx) => {
      if (idx === correctOption) {
        card.classList.add('card-correct');
      } else if (idx === selectedOption && !isCorrect) {
        card.classList.add('card-incorrect');
      }
    });

    feedbackModal.nextBtn.focus();
  }

  // Render game completion summary
  function renderResults(summary) {
    resultsElements.finalScore.textContent = summary.score.toLocaleString();
    resultsElements.questionsRatio.textContent = `${summary.metadata.questionsAttempted} / 15`;
    resultsElements.correctCount.textContent = summary.metadata.questionsCorrect;
    resultsElements.accuracyPercent.textContent = `${summary.metadata.accuracy}%`;
    resultsElements.totalTime.textContent = GameTimer.formatTime(summary.durationSeconds);
    resultsElements.bestStreak.textContent = `${summary.metadata.bestStreak}x`;
    resultsElements.diffReached.textContent = summary.metadata.difficultyReached;
    
    if (resultsElements.modesCount) {
      resultsElements.modesCount.textContent = `${summary.metadata.modesCount || 1}`;
    }
    if (resultsElements.languagesCount) {
      resultsElements.languagesCount.textContent = `${summary.metadata.languagesCount || 1}`;
    }

    // Update cloud sync badge
    if (resultsElements.cloudStatusText) {
      const profile = (typeof FirebaseService !== 'undefined') ? FirebaseService.getPlayerProfile() : null;
      if (profile && profile.name) {
        resultsElements.cloudStatusText.textContent = `Synced to Firebase for ${escapeHtml(profile.name)} (${FirebaseService.maskMobile(profile.mobile)})`;
      } else {
        resultsElements.cloudStatusText.textContent = "Synced to Firebase Leaderboard";
      }
    }

    refreshStartScreenStats();
    loadLeaderboard();
  }

  // Submit Answer button handler
  questionElements.submitBtn.addEventListener('click', () => {
    if (game.state === 'ACTIVE') {
      game.submitAnswer();
    }
  });

  // Next Question button handler
  feedbackModal.nextBtn.addEventListener('click', () => {
    game.nextQuestion();
  });

  function handleStartPlay() {
    SoundSynth.playSelect();
    const cfg = DURATION_CONFIGS[currentDurationMinutes] || DURATION_CONFIGS[5];
    const profile = (typeof FirebaseService !== 'undefined') ? FirebaseService.getPlayerProfile() : null;
    if (!profile || !profile.name || !profile.mobile) {
      openPlayerModal();
    } else {
      game.start({
        totalQuestionsCount: cfg.questions,
        gameDurationSeconds: cfg.seconds,
        durationMinutes: cfg.minutes
      });
    }
  }

  // Start game CTA (Prompt for Name & Mobile if not configured)
  startElements.startBtn.addEventListener('click', () => {
    handleStartPlay();
  });

  // Play Again CTA
  resultsElements.playAgainBtn.addEventListener('click', () => {
    handleStartPlay();
  });

  // View Leaderboard / Home CTA from Results Screen
  if (resultsElements.homeBtn) {
    resultsElements.homeBtn.addEventListener('click', () => {
      SoundSynth.playSelect();
      game.state = 'IDLE';
      game.callbacks.onStateChange('IDLE');
      refreshStartScreenStats();
      loadLeaderboard(true);
      // Scroll to leaderboard smoothly
      const lb = document.getElementById('start-leaderboard-section');
      if (lb) lb.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Standalone Game History Modal
  resultsElements.historyBtn.addEventListener('click', () => {
    SoundSynth.playSelect();
    const history = GameStorage.getHistory();
    resultsElements.historyContainer.classList.toggle('hidden');

    if (history.length === 0) {
      resultsElements.historyList.innerHTML = '<li class="empty-history">No games recorded yet.</li>';
    } else {
      resultsElements.historyList.innerHTML = history.map((item, idx) => `
        <li class="history-item">
          <span class="hist-rank">#${idx + 1}</span>
          <span class="hist-score">${item.score.toLocaleString()} pts</span>
          <span class="hist-meta">${item.accuracy}% acc · ${item.difficultyReached} · ${item.modesCount || 0} modes · ${new Date(item.date).toLocaleDateString()}</span>
        </li>
      `).join('');
    }
  });

  // Keyboard Navigation & Shortcuts
  window.addEventListener('keydown', (e) => {
    // If player modal is open, let user type freely
    if (!playerModal.container.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closePlayerModal();
      }
      return;
    }

    // If modal is visible, Space or Enter advances
    if (!feedbackModal.container.classList.contains('hidden')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        game.nextQuestion();
      }
      return;
    }

    if (game.state === 'ACTIVE') {
      let optionIndex = null;
      if (e.key === '1' || e.key.toLowerCase() === 'a') optionIndex = 0;
      else if (e.key === '2' || e.key.toLowerCase() === 'b') optionIndex = 1;
      else if (e.key === '3' || e.key.toLowerCase() === 'c') optionIndex = 2;
      else if (e.key === '4' || e.key.toLowerCase() === 'd') optionIndex = 3;

      if (optionIndex !== null) {
        e.preventDefault();
        SoundSynth.playSelect();
        const cards = document.querySelectorAll('.option-card');
        if (cards[optionIndex]) {
          cards.forEach(c => c.classList.remove('selected'));
          cards[optionIndex].classList.add('selected');
          game.selectOption(optionIndex);
          questionElements.submitBtn.disabled = false;
        }
      } else if (e.key === 'Enter' && !questionElements.submitBtn.disabled) {
        e.preventDefault();
        game.submitAnswer();
      }
    } else if (game.state === 'IDLE' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleStartPlay();
    }
  });
});
