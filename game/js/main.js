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
    questionsRatio: document.getElementById('res-questions-ratio'),
    correctCount: document.getElementById('res-correct-count'),
    accuracyPercent: document.getElementById('res-accuracy'),
    totalTime: document.getElementById('res-time'),
    bestStreak: document.getElementById('res-best-streak'),
    diffReached: document.getElementById('res-diff-reached'),
    modesCount: document.getElementById('res-modes-count'),
    languagesCount: document.getElementById('res-languages-count'),
    playAgainBtn: document.getElementById('res-play-again-btn'),
    historyBtn: document.getElementById('res-view-history-btn'),
    historyContainer: document.getElementById('res-history-container'),
    historyList: document.getElementById('res-history-list')
  };

  const startElements = {
    startBtn: document.getElementById('start-game-btn'),
    highScore: document.getElementById('start-high-score'),
    gamesPlayed: document.getElementById('start-games-played'),
    bestStreak: document.getElementById('start-best-streak'),
    modesMastered: document.getElementById('start-modes-mastered'),
    soundToggleBtn: document.getElementById('sound-toggle-btn')
  };

  // Sound Settings Init
  const settings = GameStorage.getSettings();
  SoundSynth.setMuted(!settings.soundEnabled);
  updateSoundToggleButton();

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
      GameStorage.saveSettings({ soundEnabled: !newMuted });
      updateSoundToggleButton();
      if (!newMuted) SoundSynth.playSelect();
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

    refreshStartScreenStats();
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

  // Start game CTA
  startElements.startBtn.addEventListener('click', () => {
    SoundSynth.playSelect();
    game.start();
  });

  // Play Again CTA (generates fresh randomized session)
  resultsElements.playAgainBtn.addEventListener('click', () => {
    SoundSynth.playSelect();
    game.start();
  });

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
      SoundSynth.playSelect();
      game.start();
    }
  });
});
