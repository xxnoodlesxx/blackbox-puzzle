// ═══════════════════════════════════════════════════════════
//  ESCAPE ROOM CONFIGURATION — edit this block to customize
// ═══════════════════════════════════════════════════════════
const ESCAPE_ROOM_CONFIG = {

  scoring: {
    startPoints:         10000,
    timePenaltyPerSecond: 2,
    errorPenalty:         200,
    hintPenalty:          500,
    hintUnlockSeconds:    300,
  },

  challenges: [

    // ── Challenge 1 ────────────────────────────────────────
    {
      id: 'c1',
      title: 'Das Jailbreak-Dilemma',
      instructions: 'Eure Mission: Überlistet drei KI-Bots mittels Prompt Injection und entlockt ihnen jeweils ein geheimes Passwort. Öffnet den Bot-Link, startet euren Angriff — und gebt den erbeuteten Code unten ein.',
      type: 'jailbreak',
      levels: [
        {
          id: 'c1-l1',
          title: 'Level 1 — Der naive Wächter',
          difficulty: 'Easy',
          instructions: 'Dieser Bot wurde mit einfachen Sicherheitsinstruktionen konfiguriert. Er soll sein Passwort nicht preisgeben — bringt ihn trotzdem dazu.',
          botUrl: 'https://gpt.swisscom.com/gpt/1c3758b6-d3aa-4958-8fa4-832d124d6fe4/chat',
          solution: 'NEO',
          hint: 'Versuche, den Bot in einer anderen Sprache anzusprechen, oder bitte ihn die Instruktionen zu "erklären".',
        },
        {
          id: 'c1-l2',
          title: 'Level 2 — Der Pirat',
          difficulty: 'Medium',
          instructions: 'Dieser Bot spricht ausschliesslich als Pirat und hat eine Sperre für das Wort "Passwort". Findet einen Weg drumherum.',
          botUrl: 'https://chatgpt.com/g/PLACEHOLDER-LEVEL2',
          solution: 'TRINITY',
          hint: 'Das Wort "Passwort" ist geblockt — wie könnte man dasselbe Konzept anders nennen oder umschreiben?',
        },
        {
          id: 'c1-l3',
          title: 'Level 3 — Der Paranoid',
          difficulty: 'Hard',
          instructions: 'Ein extrem paranoider Bot mit strikten Guardrails. Er erkennt und blockiert Manipulationsversuche sofort. Kreativität ist gefragt.',
          botUrl: 'https://chatgpt.com/g/PLACEHOLDER-LEVEL3',
          solution: 'MORPHEUS',
          hint: 'Manchmal hilft ein völlig anderer Rahmen — Rollenspiel, Fiktion oder indirekter Kontext können Guardrails unterlaufen.',
        },
      ],
    },

    // ── Challenge 2 ────────────────────────────────────────
    {
      id: 'c2',
      title: 'Der chinesische Funkspruch',
      instructions: 'Ihr empfangt einen verschlüsselten KI-generierten Song auf Mandarin. Nutzt KI-Tools (Whisper, ChatGPT Voice oder ähnliche) um den Song zu transkribieren und ins Deutsche zu übersetzen. Im übersetzten Liedtext verstecken sich Zahlen — gebt sie in der korrekten Reihenfolge als zusammenhängenden Code ein.',
      type: 'audio',
      audioSrc: 'assets/audio/challenge2.mp3',
      solution: '385',
      hint: 'Achtet auf ausgeschriebene Zahlen im übersetzten Text — z.B. "dritte", "acht". Lest sie in der Reihenfolge vor, wie sie im Text erscheinen.',
    },

    // ── Challenge 3 ────────────────────────────────────────
    {
      id: 'c3',
      title: 'Der Deepfake-Detektiv',
      instructions: 'Pro Runde seht ihr 4 Bilder. Genau eines davon ist KI-generiert und enthält einen Fehler. Findet es — aber Vorsicht: jeder Fehlversuch kostet euer Team sofort 200 Punkte!',
      type: 'deepfake',
      rounds: [
        {
          id: 'c3-r1',
          title: 'Runde 1 — Grobe KI-Fehler',
          difficulty: 'Easy',
          instructions: 'Sucht nach klassischen KI-Artefakten: fehlerhafte Anatomie, falsche Anzahl Finger, unlogische Schatten oder Perspektiven.',
          images: [
            { id: 'a', src: 'assets/images/c3-r1-a.jpg', label: 'Bild A' },
            { id: 'b', src: 'assets/images/c3-r1-b.jpg', label: 'Bild B' },
            { id: 'c', src: 'assets/images/c3-r1-c.jpg', label: 'Bild C' },
            { id: 'd', src: 'assets/images/c3-r1-d.jpg', label: 'Bild D' },
          ],
          solution: 'b',
          explanation: 'KI-Fehler in Bild B: 6 Finger an der linken Hand und eine physikalisch unmögliche Schattenrichtung.',
          hint: 'Zählt die Finger auf allen sichtbaren Händen sorgfältig — KI-Modelle haben damit oft Probleme.',
        },
        {
          id: 'c3-r2',
          title: 'Runde 2 — Subtile Texturen',
          difficulty: 'Medium',
          instructions: 'Die Fehler sind subtiler. Achtet auf Augen-Spiegelungen, Haarstruktur und den typischen "Plastik-Look" von KI-generierten Gesichtern.',
          images: [
            { id: 'a', src: 'assets/images/c3-r2-a.jpg', label: 'Bild A' },
            { id: 'b', src: 'assets/images/c3-r2-b.jpg', label: 'Bild B' },
            { id: 'c', src: 'assets/images/c3-r2-c.jpg', label: 'Bild C' },
            { id: 'd', src: 'assets/images/c3-r2-d.jpg', label: 'Bild D' },
          ],
          solution: 'c',
          explanation: 'KI-Fehler in Bild C: Die Augen-Spiegelung zeigt eine inkonsistente Lichtquelle, die Haarstruktur hat den typischen KI-Plastik-Look.',
          hint: 'Vergrössert die Augen-Partien im Bild — was reflektiert sich darin, und ergibt das Sinn?',
        },
        {
          id: 'c3-r3',
          title: 'Runde 3 — Unsichtbare Spuren',
          difficulty: 'Hard',
          instructions: 'Dieses Bild ist optisch fast perfekt. Nutzt Metadaten-Analyse (EXIF-Tools) oder Vision-LLMs um nach digitalen Wasserzeichen oder fehlenden Kameradaten zu suchen.',
          images: [
            { id: 'a', src: 'assets/images/c3-r3-a.jpg', label: 'Bild A' },
            { id: 'b', src: 'assets/images/c3-r3-b.jpg', label: 'Bild B' },
            { id: 'c', src: 'assets/images/c3-r3-c.jpg', label: 'Bild C' },
            { id: 'd', src: 'assets/images/c3-r3-d.jpg', label: 'Bild D' },
          ],
          solution: 'd',
          explanation: 'KI-Fehler in Bild D: Die EXIF-Metadaten fehlen vollständig — keine Kamera, kein Objektiv, kein Zeitstempel. Ein SynthID-Wasserzeichen ist detektierbar.',
          hint: 'Ladet die Bilder in ein EXIF-Analysetool (z.B. exifinfo.org) — welches Bild hat keine Kameradaten?',
        },
      ],
    },

    // ── Challenge 4 ────────────────────────────────────────
    {
      id: 'c4',
      title: 'Der Halluzinations-Code',
      instructions: 'Ihr erhaltet einen 30-seitigen KI-generierten Marktbericht. Er enthält 3 bewusst falsch eingebaute Jahreszahlen (Halluzinationen). Das Dokument ist zu lang zum manuellen Lesen — nutzt KI-Tools (NotebookLM, Claude, ChatGPT Data Analysis) um es systematisch gegen das Live-Web zu prüfen. Gebt die 3 erfundenen Jahreszahlen kommagetrennt ein (Reihenfolge egal).',
      type: 'pdf',
      pdfSrc: 'assets/docs/challenge4.pdf',
      solution: ['2018', '2021', '2024'],
      hint: "Fragt das KI-Tool gezielt: \"Welche historischen Ereignisse oder Statistiken in diesem Dokument sind nachweislich falsch oder mit falschen Jahreszahlen versehen?\"",
    },

  ],
};
// ═══════════════════════════════════════════════════════════
//  END OF CONFIGURATION
// ═══════════════════════════════════════════════════════════

// ── State ────────────────────────────────────────────────
const STORAGE_KEY = 'escapeRoomState';

let state = {};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state = JSON.parse(saved);
  } catch (e) {
    state = {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(updates) {
  state = { ...state, ...updates };
  saveState();
}

function initFreshState(teamName) {
  const now = Date.now();
  state = {
    teamName,
    phase: 'game',
    currentChallengeIndex: 0,
    currentSubIndex: 0,
    globalStartTime: now,
    stageEnteredTime: now,
    hintShownForStage: false,
    totalErrors: 0,
    hintsUsed: 0,
    finalTime: null,
    finalErrors: null,
    finalHintsUsed: null,
    finalScore: null,
  };
  saveState();
}

function resetGame() {
  localStorage.removeItem(STORAGE_KEY);
  state = {};
  render();
}

// ── Utilities ────────────────────────────────────────────
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function validateCode(input, solution) {
  return input.trim().toUpperCase() === solution.trim().toUpperCase();
}

function validateYears(input, solutionArray) {
  const entered = input.split(',').map(s => s.trim()).filter(Boolean).sort();
  const expected = [...solutionArray].map(s => s.trim()).sort();
  return JSON.stringify(entered) === JSON.stringify(expected);
}

function calculateScore() {
  const cfg = ESCAPE_ROOM_CONFIG.scoring;
  const elapsed = Math.floor((Date.now() - state.globalStartTime) / 1000);
  const raw = cfg.startPoints
    - elapsed * cfg.timePenaltyPerSecond
    - state.totalErrors * cfg.errorPenalty
    - state.hintsUsed * cfg.hintPenalty;
  return Math.max(0, raw);
}

function getCurrentChallenge() {
  return ESCAPE_ROOM_CONFIG.challenges[state.currentChallengeIndex];
}

function getCurrentSub() {
  const ch = getCurrentChallenge();
  if (ch.type === 'jailbreak') return ch.levels[state.currentSubIndex];
  if (ch.type === 'deepfake')  return ch.rounds[state.currentSubIndex];
  return null;
}

function showModal(html, onConfirm, onCancel) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = html;
  document.body.appendChild(backdrop);
  backdrop.querySelector('[data-confirm]')?.addEventListener('click', () => {
    backdrop.remove();
    onConfirm?.();
  });
  backdrop.querySelector('[data-cancel]')?.addEventListener('click', () => {
    backdrop.remove();
    onCancel?.();
  });
}

// ── Router ───────────────────────────────────────────────
function render() {
  const start = document.getElementById('view-start');
  const game  = document.getElementById('view-game');
  const end   = document.getElementById('view-end');

  start.classList.add('hidden');
  game.classList.add('hidden');
  end.classList.add('hidden');

  if (!state.phase || state.phase === 'start') {
    start.classList.remove('hidden');
    renderStart();
  } else if (state.phase === 'game') {
    game.classList.remove('hidden');
    renderGame();
  } else if (state.phase === 'end') {
    end.classList.remove('hidden');
    renderEnd();
  }
}

// ── Startscreen ──────────────────────────────────────────
function renderStart() {
  document.getElementById('view-start').innerHTML = `
    <div class="start-card slide-in">
      <div class="start-title">◈ BLACKBOX</div>
      <div class="start-subtitle-brand">AI PUZZLE ROOM</div>
      <div class="start-subtitle">MISSION BRIEFING</div>
      <p class="instructions" style="text-align:left;margin-bottom:28px">
        4 Challenges. KI-Wissen gefragt. Wer löst die Mission am schnellsten?<br><br>
        Gebt euren Teamnamen ein und startet die Mission.
      </p>
      <div class="section-label" style="text-align:left;margin-bottom:8px">Team-Bezeichnung</div>
      <input
        id="team-name-input"
        class="input-field"
        type="text"
        placeholder="z.B. Team Alpha"
        maxlength="30"
        style="margin-bottom:20px"
        autocomplete="off"
      />
      <button id="start-btn" class="btn btn-primary btn-full" disabled>
        ▶&nbsp; MISSION STARTEN
      </button>
    </div>
  `;

  const input = document.getElementById('team-name-input');
  const btn   = document.getElementById('start-btn');

  input.addEventListener('input', () => {
    btn.disabled = input.value.trim().length === 0;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !btn.disabled) startMission();
  });

  btn.addEventListener('click', startMission);

  function startMission() {
    const name = input.value.trim();
    if (!name) return;
    initFreshState(name);
    startTimer();
    render();
  }
}

// ── Timer ────────────────────────────────────────────────
let timerInterval = null;

function startTimer() {
  stopTimer();
  timerInterval = setInterval(tick, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function tick() {
  updateTimerDisplay();
  checkHintUnlock();
}

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  if (!el || !state.globalStartTime) return;
  const elapsed = Math.floor((Date.now() - state.globalStartTime) / 1000);
  el.textContent = '⏱ ' + formatTime(elapsed);
}

function resumeTimerIfNeeded() {
  if (state.phase === 'game' && !timerInterval) startTimer();
}

// ── Game Shell ───────────────────────────────────────────
function renderGame() {
  // Header
  document.getElementById('game-header').innerHTML = `
    <div class="header-inner">
      <span class="header-brand">◈ MISSION CONTROL</span>
      <span class="header-team">${escHtml(state.teamName)}</span>
      <span class="header-timer" id="timer-display">⏱ 00:00</span>
    </div>
  `;

  // Challenge content
  const ch = getCurrentChallenge();
  renderChallenge(ch);

  // Hint area reset
  document.getElementById('hint-area').innerHTML = '';

  updateTimerDisplay();
  resumeTimerIfNeeded();
}

function renderChallenge(ch) {
  if (ch.type === 'jailbreak') renderJailbreak(ch);
  else if (ch.type === 'audio') renderAudio(ch);
  else if (ch.type === 'deepfake') renderDeepfake(ch);
  else if (ch.type === 'pdf') renderPdf(ch);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildProgressBar() {
  const total = ESCAPE_ROOM_CONFIG.challenges.length;
  const dots = Array.from({ length: total }, (_, i) => {
    const cls = i < state.currentChallengeIndex ? 'done'
              : i === state.currentChallengeIndex ? 'current' : '';
    return `<div class="progress-dot ${cls}"></div>`;
  }).join('');
  return `<div class="progress-bar">${dots}</div>`;
}

function difficultyBadge(difficulty) {
  if (!difficulty) return '';
  const cls = difficulty.toLowerCase();
  return `<span class="badge badge-${cls}">${difficulty.toUpperCase()}</span>`;
}

// ── Navigation ───────────────────────────────────────────
function advanceStage() {
  const ch = getCurrentChallenge();
  const now = Date.now();

  // Check if there's a next sub-level/round within this challenge
  if (ch.type === 'jailbreak' && state.currentSubIndex < ch.levels.length - 1) {
    setState({ currentSubIndex: state.currentSubIndex + 1, stageEnteredTime: now, hintShownForStage: false });
    renderGame();
    return;
  }
  if (ch.type === 'deepfake' && state.currentSubIndex < ch.rounds.length - 1) {
    setState({ currentSubIndex: state.currentSubIndex + 1, stageEnteredTime: now, hintShownForStage: false });
    renderGame();
    return;
  }

  // Advance to next challenge
  const nextIndex = state.currentChallengeIndex + 1;
  if (nextIndex < ESCAPE_ROOM_CONFIG.challenges.length) {
    setState({ currentChallengeIndex: nextIndex, currentSubIndex: 0, stageEnteredTime: now, hintShownForStage: false });
    renderGame();
    return;
  }

  // All challenges complete → end
  finishGame();
}

// ── Score Engine ─────────────────────────────────────────
function applyError() {
  setState({ totalErrors: state.totalErrors + 1 });
}

function finishGame() {
  stopTimer();
  const elapsed = Math.floor((Date.now() - state.globalStartTime) / 1000);
  const score   = calculateScore();
  setState({
    phase: 'end',
    finalTime: elapsed,
    finalErrors: state.totalErrors,
    finalHintsUsed: state.hintsUsed,
    finalScore: score,
  });
  render();
}

// ── Hints ────────────────────────────────────────────────
function checkHintUnlock() {
  if (!state.stageEnteredTime || state.hintShownForStage) return;
  const elapsed = Date.now() - state.stageEnteredTime;
  if (elapsed >= ESCAPE_ROOM_CONFIG.scoring.hintUnlockSeconds * 1000) {
    showHintButton();
  }
}

function showHintButton() {
  const area = document.getElementById('hint-area');
  if (!area || area.querySelector('.hint-btn')) return; // already shown
  const ch  = getCurrentChallenge();
  const sub = getCurrentSub();
  const hintText = sub?.hint || ch.hint || '';
  if (!hintText) return;

  area.innerHTML = `
    <button class="hint-btn" id="hint-unlock-btn">
      👁&nbsp; Hinweis freischalten?
    </button>
  `;
  document.getElementById('hint-unlock-btn').addEventListener('click', () => {
    showModal(`
      <div class="modal-box">
        <div class="modal-title">⚠ Hinweis freischalten?</div>
        <div class="modal-body">
          Sicher? Das Aufdecken dieses Hinweises kostet euer Team sofort
          <strong style="color:var(--orange)">${ESCAPE_ROOM_CONFIG.scoring.hintPenalty} Punkte</strong>!
        </div>
        <div class="modal-actions">
          <button class="btn btn-danger" data-cancel>Abbrechen</button>
          <button class="btn btn-primary" data-confirm>Ja, Hinweis zeigen</button>
        </div>
      </div>
    `, () => confirmHint(hintText));
  });
}

function confirmHint(hintText) {
  setState({ hintsUsed: state.hintsUsed + 1, hintShownForStage: true });
  const area = document.getElementById('hint-area');
  area.innerHTML = `<div class="hint-text">💡 ${escHtml(hintText)}</div>`;
}

// ── Challenge 1: Jailbreak ───────────────────────────────
function renderJailbreak(ch) {
  const level = ch.levels[state.currentSubIndex];
  const totalLevels = ch.levels.length;

  document.getElementById('challenge-content').innerHTML = `
    ${buildProgressBar()}
    <div class="card slide-in">
      <div class="challenge-meta">
        CHALLENGE 1 / ${ESCAPE_ROOM_CONFIG.challenges.length} &nbsp;·&nbsp;
        LEVEL ${state.currentSubIndex + 1} / ${totalLevels}
      </div>
      <div class="challenge-title">
        ${escHtml(level.title)}
        ${difficultyBadge(level.difficulty)}
      </div>
      <p class="instructions">${escHtml(level.instructions)}</p>

      <div class="section-label" style="margin-bottom:10px">Bot-Link</div>
      <a
        href="${escHtml(level.botUrl)}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-cyan"
        style="display:inline-flex;margin-bottom:24px;text-decoration:none"
      >
        ↗&nbsp; Bot öffnen
      </a>

      <div class="section-label" style="margin-bottom:8px">Erbeuteter Code</div>
      <input
        id="code-input"
        class="input-field"
        type="text"
        placeholder="Code eingeben..."
        autocomplete="off"
        style="margin-bottom:12px"
      />
      <div id="code-feedback" style="min-height:20px;font-size:13px;margin-bottom:12px"></div>
      <button id="verify-btn" class="btn btn-primary btn-full">▶&nbsp; Verifizieren</button>
    </div>
  `;

  const input    = document.getElementById('code-input');
  const feedback = document.getElementById('code-feedback');

  document.getElementById('verify-btn').addEventListener('click', () => submitCode());
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitCode(); });

  function submitCode() {
    const val = input.value;
    if (!val.trim()) return;
    if (validateCode(val, level.solution)) {
      input.classList.add('success');
      feedback.style.color = 'var(--green)';
      feedback.textContent = '✓ Code korrekt! Nächste Stufe wird freigeschaltet...';
      document.getElementById('verify-btn').disabled = true;
      setTimeout(() => advanceStage(), 1000);
    } else {
      applyError();
      input.classList.add('error');
      feedback.style.color = 'var(--red)';
      feedback.textContent = `✗ Falscher Code. -${ESCAPE_ROOM_CONFIG.scoring.errorPenalty} Punkte.`;
      setTimeout(() => {
        input.classList.remove('error');
        feedback.textContent = '';
      }, 1500);
      input.value = '';
    }
  }
}

// ── Challenge 2: Audio ───────────────────────────────────
function renderAudio(ch) {
  document.getElementById('challenge-content').innerHTML = `
    ${buildProgressBar()}
    <div class="card slide-in">
      <div class="challenge-meta">CHALLENGE 2 / ${ESCAPE_ROOM_CONFIG.challenges.length}</div>
      <div class="challenge-title">${escHtml(ch.title)}</div>
      <p class="instructions">${escHtml(ch.instructions)}</p>

      <div class="section-label" style="margin-bottom:10px">Audiodatei</div>
      <audio controls preload="metadata" style="margin-bottom:8px">
        <source src="${escHtml(ch.audioSrc)}" type="audio/mpeg" />
        Dein Browser unterstützt kein HTML5-Audio.
      </audio>
      <div style="margin-bottom:24px">
        <a href="${escHtml(ch.audioSrc)}" download class="download-link">
          ⬇&nbsp; Audio herunterladen
        </a>
      </div>

      <div class="section-label" style="margin-bottom:8px">Versteckter Code</div>
      <input
        id="code-input"
        class="input-field"
        type="text"
        placeholder="Code aus den Lyrics eingeben..."
        autocomplete="off"
        style="margin-bottom:12px"
      />
      <div id="code-feedback" style="min-height:20px;font-size:13px;margin-bottom:12px"></div>
      <button id="verify-btn" class="btn btn-primary btn-full">▶&nbsp; Verifizieren</button>
    </div>
  `;

  const input    = document.getElementById('code-input');
  const feedback = document.getElementById('code-feedback');

  document.getElementById('verify-btn').addEventListener('click', () => submitCode());
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitCode(); });

  function submitCode() {
    const val = input.value;
    if (!val.trim()) return;
    if (validateCode(val, ch.solution)) {
      input.classList.add('success');
      feedback.style.color = 'var(--green)';
      feedback.textContent = '✓ Code korrekt! Challenge 3 wird freigeschaltet...';
      document.getElementById('verify-btn').disabled = true;
      setTimeout(() => advanceStage(), 1000);
    } else {
      applyError();
      input.classList.add('error');
      feedback.style.color = 'var(--red)';
      feedback.textContent = `✗ Falscher Code. -${ESCAPE_ROOM_CONFIG.scoring.errorPenalty} Punkte.`;
      setTimeout(() => {
        input.classList.remove('error');
        feedback.textContent = '';
      }, 1500);
      input.value = '';
    }
  }
}

// ── Challenge 3: Deepfake ────────────────────────────────
function renderDeepfake(ch) {
  const round = ch.rounds[state.currentSubIndex];
  const totalRounds = ch.rounds.length;
  let selectedId = null;

  document.getElementById('challenge-content').innerHTML = `
    ${buildProgressBar()}
    <div class="card slide-in">
      <div class="challenge-meta">
        CHALLENGE 3 / ${ESCAPE_ROOM_CONFIG.challenges.length} &nbsp;·&nbsp;
        RUNDE ${state.currentSubIndex + 1} / ${totalRounds}
      </div>
      <div class="challenge-title">
        ${escHtml(round.title)}
        ${difficultyBadge(round.difficulty)}
      </div>
      <p class="instructions">${escHtml(round.instructions)}</p>

      <div class="image-grid" id="image-grid">
        ${round.images.map(img => `
          <div class="image-tile" data-id="${escHtml(img.id)}" onclick="selectImage('${escHtml(img.id)}')">
            <img src="${escHtml(img.src)}" alt="${escHtml(img.label)}" draggable="false" />
            <div class="tile-label">${escHtml(img.label)}</div>
          </div>
        `).join('')}
      </div>

      <div id="image-feedback" style="min-height:20px;font-size:13px;margin-bottom:12px"></div>
      <button id="confirm-btn" class="btn btn-primary btn-full" disabled>
        ✓&nbsp; Auswahl bestätigen
      </button>
    </div>
  `;

  document.getElementById('confirm-btn').addEventListener('click', () => confirmImageSelection(round));

  window.selectImage = function(id) {
    selectedId = id;
    document.querySelectorAll('.image-tile').forEach(t => t.classList.remove('selected'));
    document.querySelector(`.image-tile[data-id="${id}"]`)?.classList.add('selected');
    document.getElementById('confirm-btn').disabled = false;
    document.getElementById('image-feedback').textContent = '';
  };

  window.confirmImageSelection = function(round) {
    if (!selectedId) return;
    const btn = document.getElementById('confirm-btn');
    const feedback = document.getElementById('image-feedback');

    if (selectedId === round.solution) {
      // Correct
      document.querySelector(`.image-tile[data-id="${selectedId}"]`)?.classList.add('correct');
      btn.disabled = true;
      showModal(`
        <div class="modal-box">
          <div class="modal-title" style="color:var(--green)">✓ Richtig!</div>
          <div class="modal-body">${escHtml(round.explanation)}</div>
          <div class="modal-actions">
            <button class="btn btn-primary" data-confirm>Weiter →</button>
          </div>
        </div>
      `, () => advanceStage());
    } else {
      // Wrong
      applyError();
      const tile = document.querySelector(`.image-tile[data-id="${selectedId}"]`);
      tile?.classList.remove('selected');
      tile?.classList.add('wrong');
      feedback.style.color = 'var(--red)';
      feedback.textContent = `✗ Falsche Auswahl. -${ESCAPE_ROOM_CONFIG.scoring.errorPenalty} Punkte. Versucht es erneut.`;
      document.getElementById('confirm-btn').disabled = true;
      selectedId = null;
      setTimeout(() => {
        tile?.classList.remove('wrong');
        feedback.textContent = '';
      }, 1500);
    }
  };
}

// ── Challenge 4: PDF ─────────────────────────────────────
function renderPdf(ch) {
  document.getElementById('challenge-content').innerHTML = `
    ${buildProgressBar()}
    <div class="card slide-in">
      <div class="challenge-meta">CHALLENGE 4 / ${ESCAPE_ROOM_CONFIG.challenges.length} &nbsp;·&nbsp; FINAL</div>
      <div class="challenge-title">${escHtml(ch.title)}</div>
      <p class="instructions">${escHtml(ch.instructions)}</p>

      <div style="margin-bottom:24px">
        <a href="${escHtml(ch.pdfSrc)}" download class="btn btn-cyan" style="text-decoration:none;display:inline-flex">
          ⬇&nbsp; Marktbericht herunterladen (PDF)
        </a>
      </div>

      <div class="section-label" style="margin-bottom:8px">Die 3 erfundenen Jahreszahlen</div>
      <input
        id="years-input"
        class="input-field"
        type="text"
        placeholder="z.B. 2018, 2021, 2024"
        autocomplete="off"
        style="margin-bottom:12px"
      />
      <div style="color:var(--gray);font-size:12px;margin-bottom:16px">
        Kommagetrennt eingeben — Reihenfolge egal
      </div>
      <div id="years-feedback" style="min-height:20px;font-size:13px;margin-bottom:12px"></div>
      <button id="verify-btn" class="btn btn-primary btn-full">▶&nbsp; Verifizieren</button>
    </div>
  `;

  const input    = document.getElementById('years-input');
  const feedback = document.getElementById('years-feedback');

  document.getElementById('verify-btn').addEventListener('click', () => submitYears());
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitYears(); });

  function submitYears() {
    const val = input.value;
    if (!val.trim()) return;
    if (validateYears(val, ch.solution)) {
      input.classList.add('success');
      feedback.style.color = 'var(--green)';
      feedback.textContent = '✓ Korrekt! Mission abgeschlossen. Ergebnis wird berechnet...';
      document.getElementById('verify-btn').disabled = true;
      setTimeout(() => finishGame(), 1500);
    } else {
      applyError();
      input.classList.add('error');
      feedback.style.color = 'var(--red)';
      feedback.textContent = `✗ Falsche Antwort. -${ESCAPE_ROOM_CONFIG.scoring.errorPenalty} Punkte.`;
      setTimeout(() => {
        input.classList.remove('error');
        feedback.textContent = '';
      }, 1500);
      input.value = '';
    }
  }
}

// ── Endscreen ────────────────────────────────────────────
function renderEnd() {
  const mins = Math.floor(state.finalTime / 60).toString().padStart(2, '0');
  const secs = (state.finalTime % 60).toString().padStart(2, '0');
  const timeStr  = `${mins}:${secs} min`;
  const scoreStr = state.finalScore.toLocaleString('de-CH');

  document.getElementById('view-end').innerHTML = `
    <div class="end-card slide-in">
      <pre class="ascii-art">
 ███▄ ▄███▓ ██▓  ██████   ██████  ██▓ ▒█████   ███▄    █
▓██▒▀█▀ ██▒▓██▒▒██    ▒ ▒██    ▒ ▓██▒▒██▒  ██▒ ██ ▀█   █
▓██    ▓██░▒██▒░ ▓██▄   ░ ▓██▄   ▒██▒▒██░  ██▒▓██  ▀█ ██▒
▒██    ▒██ ░██░  ▒   ██▒  ▒   ██▒░██░▒██   ██░▓██▒  ▐▌██▒
▒██▒   ░██▒░██░▒██████▒▒▒██████▒▒░██░░ ████▓▒░▒██░   ▓██░
░ ▒░   ░  ░░▓  ▒ ▒▓▒ ▒ ░▒ ▒▓▒ ▒ ░░▓  ░ ▒░▒░▒░ ░ ▒░   ▒ ▒
░  ░      ░ ▒ ░░ ░▒  ░ ░░ ░▒  ░ ░ ▒ ░  ░ ░ ▒░ ░ ░░   ░ ▒░
░      ░    ▒ ░░  ░  ░  ░  ░  ░   ▒ ░░ ░ ░ ▒     ░   ░ ░
       ░    ░        ░        ░   ░      ░ ░           ░ </pre>

      <div class="end-team">COMPLETE &nbsp;·&nbsp; ${escHtml(state.teamName)}</div>

      <div class="stats-block">
        <div class="stat-row">
          <span class="stat-label">⏱ GESAMTZEIT</span>
          <span class="stat-value stat-time">${timeStr}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">✗ FEHLVERSUCHE</span>
          <span class="stat-value stat-errors">${state.finalErrors}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">👁 HINWEISE GENUTZT</span>
          <span class="stat-value stat-hints">${state.finalHintsUsed}</span>
        </div>
        <div class="stat-row score-row">
          <span class="stat-label">◈ FINALE PUNKTE</span>
          <span class="stat-value stat-score">${scoreStr}</span>
        </div>
      </div>

      <button id="copy-btn" class="btn btn-primary btn-full">
        ⎘&nbsp; Ergebnis kopieren
      </button>
    </div>
  `;

  document.getElementById('copy-btn').addEventListener('click', copyResults);
}

function copyResults() {
  const timeStr  = formatTime(state.finalTime);
  const scoreStr = state.finalScore.toLocaleString('de-CH');
  const text = [
    '=== BLACKBOX · AI PUZZLE ROOM · ERGEBNIS ===',
    `Team:           ${state.teamName}`,
    `Gesamtzeit:     ${timeStr} min`,
    `Fehlversuche:   ${state.finalErrors}`,
    `Hinweise:       ${state.finalHintsUsed}`,
    `Finale Punkte:  ${scoreStr}`,
    '=================================',
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✓ Kopiert!';
    setTimeout(() => { btn.innerHTML = '⎘&nbsp; Ergebnis kopieren'; }, 2000);
  }).catch(() => {
    alert('Kopieren fehlgeschlagen. Bitte manuell kopieren:\n\n' + text);
  });
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
});
