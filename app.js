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
          botUrl: 'https://chatgpt.com/g/PLACEHOLDER-LEVEL1',
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
      <div class="start-title">◈ AI ESCAPE ROOM</div>
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

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
});
