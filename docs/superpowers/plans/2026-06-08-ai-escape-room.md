# AI Escape Room — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page cyberpunk-themed AI Escape Room app for team events — 4 sequential AI-challenges, localStorage-persisted state, no backend.

**Architecture:** Three files (`index.html`, `style.css`, `app.js`) + `assets/` folder. A central `ESCAPE_ROOM_CONFIG` object at the top of `app.js` holds all content. A single state object is synced to localStorage on every change. Views (start/game/end) are pre-rendered divs toggled with CSS. A single `setInterval` drives the timer and hint-unlock check.

**Tech Stack:** HTML5, CSS (Tailwind CDN + custom CSS variables), Vanilla JS (ES6+), localStorage, GitHub Pages hosting.

**Design Spec:** `docs/superpowers/specs/2026-06-08-ai-escape-room-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | All three view divs + static markup |
| `style.css` | Cyberpunk theme, CSS variables, animations, all component styles |
| `app.js` | `ESCAPE_ROOM_CONFIG` (top), state management, router, game engine, all renderers |
| `assets/images/` | 12× deepfake images (c3-r1-a.jpg … c3-r3-d.jpg) — added later |
| `assets/audio/` | challenge2.mp3 — added later |
| `assets/docs/` | challenge4.pdf — added later |

## Key Interfaces (used across all tasks)

```js
// State shape
state = {
  teamName, phase,              // "start" | "game" | "end"
  currentChallengeIndex,        // 0–3
  currentSubIndex,              // level/round index, 0 for C2/C4
  globalStartTime,              // Date.now() at mission start
  stageEnteredTime,             // Date.now() when current stage entered
  hintShownForStage,            // boolean
  totalErrors, hintsUsed,
  finalTime, finalErrors, finalHintsUsed, finalScore  // set at end
}

// Core functions
setState(updates)               // merge + saveState()
render()                        // phase router → renderStart/Game/End
advanceStage()                  // move to next level/round/challenge
applyError()                    // totalErrors++, flash UI
calculateScore()                // returns number (min 0)
validateCode(input, solution)   // case-insensitive, trimmed → boolean
validateYears(input, arr)       // split, sort, compare → boolean
formatTime(totalSeconds)        // → "MM:SS"
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `app.js`
- Create: `assets/images/.gitkeep`, `assets/audio/.gitkeep`, `assets/docs/.gitkeep`

- [ ] **Step 1: Create asset directories with placeholder files**

```bash
mkdir -p assets/images assets/audio assets/docs
touch assets/images/.gitkeep assets/audio/.gitkeep assets/docs/.gitkeep
```

- [ ] **Step 2: Create `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Escape Room</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- VIEW: START -->
  <div id="view-start"></div>

  <!-- VIEW: GAME -->
  <div id="view-game" class="hidden">
    <header id="game-header"></header>
    <main id="challenge-content"></main>
    <div id="hint-area"></div>
  </div>

  <!-- VIEW: END -->
  <div id="view-end" class="hidden"></div>

  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `style.css` placeholder**

```css
/* Cyberpunk theme — filled in Task 2 */
```

- [ ] **Step 4: Create `app.js` placeholder**

```js
// ESCAPE_ROOM_CONFIG — filled in Task 3
// State management — filled in Task 4
// Game engine — filled in Tasks 5–14
```

- [ ] **Step 5: Verify in browser**

Open `index.html` directly in browser (file:// is fine for now). Page should be blank with no console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css app.js assets/
git commit -m "feat: project scaffold with file structure"
```

---

## Task 2: Cyberpunk Theme (style.css)

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Write complete `style.css`**

```css
/* ── Variables ─────────────────────────────────────────── */
:root {
  --bg:        #0a0a0a;
  --bg-card:   #0f1a0f;
  --green:     #00ff41;
  --cyan:      #00ffff;
  --yellow:    #ffff00;
  --red:       #ff4444;
  --orange:    #ff8800;
  --gray:      #888888;
  --border:    rgba(0, 255, 65, 0.25);
  --font:      'Courier New', 'Lucida Console', monospace;
  --max-w:     800px;
}

/* ── Base ───────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--green);
  font-family: var(--font);
  min-height: 100vh;
  background-image:
    linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.hidden { display: none !important; }

/* ── Container ──────────────────────────────────────────── */
.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 16px;
}

/* ── Header Bar ─────────────────────────────────────────── */
#game-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10,10,10,0.95);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(4px);
}
.header-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-brand  { color: var(--green); font-size: 14px; letter-spacing: 2px; }
.header-team   { color: var(--cyan);  font-size: 13px; }
.header-timer  { color: var(--yellow); font-size: 18px; font-weight: bold; letter-spacing: 1px; }

/* ── Card ───────────────────────────────────────────────── */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 24px;
  margin: 20px auto;
  max-width: var(--max-w);
}

/* ── Typography ─────────────────────────────────────────── */
.challenge-title  { color: var(--cyan); font-size: 20px; margin-bottom: 4px; }
.challenge-meta   { color: var(--gray); font-size: 12px; letter-spacing: 1px; margin-bottom: 16px; }
.instructions     { color: #cccccc; font-size: 14px; line-height: 1.7; margin-bottom: 20px; font-family: 'Segoe UI', sans-serif; }
.section-label    { color: var(--gray); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }

/* ── Inputs & Buttons ───────────────────────────────────── */
.input-field {
  width: 100%;
  background: #111;
  border: 1px solid rgba(0,255,65,0.3);
  color: var(--green);
  font-family: var(--font);
  font-size: 16px;
  padding: 10px 14px;
  outline: none;
  border-radius: 2px;
  transition: border-color 0.2s;
}
.input-field:focus   { border-color: var(--green); }
.input-field.error   { border-color: var(--red); animation: flash-red 0.4s; }
.input-field.success { border-color: var(--green); }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: 1px solid;
  font-family: var(--font);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-radius: 2px;
  letter-spacing: 1px;
}
.btn-primary   { background: rgba(0,255,65,0.1); border-color: var(--green); color: var(--green); }
.btn-primary:hover  { background: rgba(0,255,65,0.2); }
.btn-primary:disabled { opacity: 0.3; cursor: not-allowed; }
.btn-danger    { background: rgba(255,68,68,0.1); border-color: var(--red); color: var(--red); }
.btn-cyan      { background: rgba(0,255,255,0.1); border-color: var(--cyan); color: var(--cyan); }
.btn-cyan:hover     { background: rgba(0,255,255,0.2); }
.btn-full      { width: 100%; justify-content: center; }

/* ── Audio Player ───────────────────────────────────────── */
audio {
  width: 100%;
  filter: invert(1) hue-rotate(90deg);
  margin-bottom: 8px;
}
.download-link {
  color: var(--cyan);
  font-size: 13px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.download-link:hover { text-decoration: underline; }

/* ── Image Grid (Challenge 3) ───────────────────────────── */
.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.image-tile {
  border: 2px solid #333;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.1s;
  position: relative;
}
.image-tile:hover    { border-color: rgba(0,255,65,0.5); transform: scale(1.01); }
.image-tile.selected { border-color: var(--cyan); }
.image-tile.wrong    { border-color: var(--red); animation: flash-red 0.5s; }
.image-tile.correct  { border-color: var(--green); }
.image-tile img      { width: 100%; height: 200px; object-fit: cover; display: block; }
.image-tile .tile-label {
  text-align: center;
  padding: 6px;
  font-size: 12px;
  color: var(--gray);
  background: #111;
}
.image-tile.selected .tile-label { color: var(--cyan); }

/* ── Hint ───────────────────────────────────────────────── */
#hint-area {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 16px 20px;
  min-height: 60px;
}
.hint-btn {
  background: transparent;
  border: 1px solid rgba(255,136,0,0.4);
  color: var(--orange);
  font-family: var(--font);
  font-size: 13px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 2px;
  animation: pulse 2s infinite;
}
.hint-text {
  background: rgba(255,136,0,0.08);
  border: 1px solid rgba(255,136,0,0.3);
  color: var(--orange);
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.6;
  border-radius: 2px;
  margin-top: 8px;
}

/* ── Modal ──────────────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-box {
  background: #111;
  border: 1px solid var(--border);
  padding: 28px 32px;
  max-width: 420px;
  width: 90%;
  border-radius: 4px;
}
.modal-title   { color: var(--cyan); font-size: 16px; margin-bottom: 12px; }
.modal-body    { color: #ccc; font-size: 14px; line-height: 1.6; margin-bottom: 20px; font-family: 'Segoe UI', sans-serif; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }

/* ── Startscreen ────────────────────────────────────────── */
#view-start {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.start-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 48px 40px;
  width: 100%;
  max-width: 480px;
  text-align: center;
}
.start-title {
  font-size: 32px;
  color: var(--green);
  letter-spacing: 6px;
  margin-bottom: 8px;
  text-shadow: 0 0 20px rgba(0,255,65,0.5);
}
.start-subtitle { color: var(--gray); font-size: 13px; letter-spacing: 2px; margin-bottom: 36px; }

/* ── Endscreen ──────────────────────────────────────────── */
#view-end {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.end-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 40px;
  width: 100%;
  max-width: 560px;
  text-align: center;
}
.ascii-art {
  color: var(--green);
  font-size: 13px;
  line-height: 1.3;
  margin-bottom: 8px;
  text-shadow: 0 0 10px rgba(0,255,65,0.4);
  white-space: pre;
}
.end-team     { color: var(--cyan); font-size: 14px; letter-spacing: 2px; margin-bottom: 28px; }
.stats-block  { text-align: left; margin-bottom: 24px; }
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,255,65,0.1);
  font-size: 14px;
}
.stat-label  { color: var(--gray); }
.stat-value  { font-size: 18px; font-weight: bold; }
.stat-time   { color: var(--yellow); }
.stat-errors { color: var(--red); }
.stat-hints  { color: var(--orange); }
.stat-score  { color: var(--green); font-size: 24px !important; }
.stat-row.score-row { border-bottom: none; padding-top: 16px; }

/* ── Animations ─────────────────────────────────────────── */
@keyframes flash-red {
  0%, 100% { background: transparent; }
  50%       { background: rgba(255,68,68,0.2); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: none; }
  50%       { opacity: 0.7; box-shadow: 0 0 8px rgba(255,136,0,0.4); }
}
@keyframes slide-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.slide-in { animation: slide-in 0.3s ease forwards; }

/* ── Progress Bar ───────────────────────────────────────── */
.progress-bar {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
}
.progress-dot {
  flex: 1;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: background 0.3s;
}
.progress-dot.done    { background: var(--green); }
.progress-dot.current { background: var(--cyan); animation: pulse 1.5s infinite; }

/* ── Difficulty Badge ───────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 10px;
  letter-spacing: 1px;
  border-radius: 2px;
  border: 1px solid;
  margin-left: 8px;
  vertical-align: middle;
}
.badge-easy   { color: var(--green);  border-color: var(--green);  background: rgba(0,255,65,0.1); }
.badge-medium { color: var(--yellow); border-color: var(--yellow); background: rgba(255,255,0,0.1); }
.badge-hard   { color: var(--red);    border-color: var(--red);    background: rgba(255,68,68,0.1); }
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Page should show the dark grid background with no content (views are empty). No console errors.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: cyberpunk theme CSS with all component styles"
```

---

## Task 3: ESCAPE_ROOM_CONFIG

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Replace `app.js` placeholder with full CONFIG**

```js
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
```

- [ ] **Step 2: Verify in browser console**

Open `index.html`, open DevTools console, run:

```js
ESCAPE_ROOM_CONFIG.challenges.length  // → 4
ESCAPE_ROOM_CONFIG.challenges[0].levels.length  // → 3
ESCAPE_ROOM_CONFIG.challenges[2].rounds.length  // → 3
ESCAPE_ROOM_CONFIG.scoring.startPoints  // → 10000
```

All should return the expected values.

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: ESCAPE_ROOM_CONFIG with all 4 challenges"
```

---

## Task 4: State Management

**Files:**
- Modify: `app.js` (append after CONFIG)

- [ ] **Step 1: Append state management functions to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser console**

Open `index.html`, open DevTools console, run:

```js
// Simulate saving state
setState({ teamName: 'Test', phase: 'game', currentChallengeIndex: 0,
  currentSubIndex: 0, globalStartTime: Date.now(), stageEnteredTime: Date.now(),
  hintShownForStage: false, totalErrors: 0, hintsUsed: 0,
  finalTime: null, finalErrors: null, finalHintsUsed: null, finalScore: null })
JSON.parse(localStorage.getItem('escapeRoomState')).teamName  // → "Test"
localStorage.removeItem('escapeRoomState')
```

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: state management with localStorage persistence"
```

---

## Task 5: App Bootstrap + Router + Utility Functions

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append utility functions + router + init to `app.js`**

```js
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

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
});
```

- [ ] **Step 2: Verify utilities in browser console**

```js
formatTime(125)                              // → "02:05"
formatTime(3661)                             // → "61:01"
validateCode('  neo ', 'NEO')               // → true
validateCode('TRINITY', 'trinity')          // → true
validateCode('wrong', 'NEO')               // → false
validateYears('2021, 2018, 2024', ['2018','2021','2024'])  // → true
validateYears('2018, 2021', ['2018','2021','2024'])        // → false
```

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: app bootstrap, router, utility functions"
```

---

## Task 6: Startscreen

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append `renderStart` to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Should see:
- Dark cyberpunk background with grid
- Centered card with "◈ AI ESCAPE ROOM" title
- Team name input field
- "MISSION STARTEN" button (greyed out)
- Typing a name enables the button
- Pressing Enter or clicking button transitions to game view (currently empty)

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: startscreen with team name input"
```

---

## Task 7: Game Shell + Timer

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append timer + game shell to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser**

Start a new game (enter team name, click start). Should see:
- Fixed header bar with brand, team name, live timer counting up
- Timer starts at 00:00 and increments every second
- Challenge content area is empty (renderers not yet written)
- No console errors

Reload the page — timer should resume from where it left off (timestamp persisted in localStorage).

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: game shell with sticky header and resume-safe timer"
```

---

## Task 8: Navigation Engine + Score Engine

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append navigation + score engine to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser console**

With an active game session:

```js
// Simulate advancing through all challenges
state.currentChallengeIndex   // → 0
advanceStage()
state.currentChallengeIndex   // still 0, currentSubIndex → 1  (C1 has 3 levels)
advanceStage()
state.currentSubIndex         // → 2
advanceStage()
state.currentChallengeIndex   // → 1, currentSubIndex → 0  (moved to C2)
```

Restart fresh session before continuing.

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: navigation engine and score/finish logic"
```

---

## Task 9: Hint Mechanism

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append hint mechanism to `app.js`**

```js
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
```

- [ ] **Step 2: Verify hint mechanism**

In browser console, manually trigger a hint unlock to test without waiting 5 minutes:

```js
// Temporarily set stageEnteredTime 6 minutes in the past
setState({ stageEnteredTime: Date.now() - 360000 })
// Wait 1 second for tick() to fire, or call manually:
checkHintUnlock()
// → hint button should appear at bottom of page
```

Click the hint button → modal should appear with warning. Click "Abbrechen" → nothing. Click "Ja, Hinweis zeigen" → hint text appears, button disappears.

Reset state before continuing:

```js
setState({ stageEnteredTime: Date.now(), hintShownForStage: false, hintsUsed: 0 })
```

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: hint unlock mechanism with 5-min timer and penalty modal"
```

---

## Task 10: Challenge 1 — Jailbreak Renderer

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append `renderJailbreak` to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser**

Start a new game. Should see:
- Progress bar with Challenge 1 highlighted
- Level 1 title with "EASY" badge
- Instructions text
- "Bot öffnen" button (opens new tab)
- Code input + "Verifizieren" button
- Typing the wrong code: red flash, penalty message, clears after 1.5s
- Typing `neo` (or `NEO`): green confirmation, advances to Level 2 after 1s
- Level 2 loads with correct title and Medium badge

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: challenge 1 jailbreak renderer with code validation"
```

---

## Task 11: Challenge 2 — Audio Renderer

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append `renderAudio` to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser**

Navigate to Challenge 2 (complete C1 with code `NEO`, `TRINITY`, `MORPHEUS`). Should see:
- Challenge 2 card with audio player and download link
- Submitting wrong code: red flash + error message
- Submitting `385`: success message + advances to Challenge 3

*(Audio player will show as broken until `assets/audio/challenge2.mp3` is added — this is expected.)*

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: challenge 2 audio renderer with player and download"
```

---

## Task 12: Challenge 3 — Deepfake Renderer

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append `renderDeepfake` to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser**

Navigate to Challenge 3 (bypass with console: `setState({currentChallengeIndex:2, currentSubIndex:0}); render()`). Should see:
- 2×2 image grid (broken images until assets added — layout still visible)
- Clicking an image highlights it with cyan border
- Confirm button activates only after a selection
- Wrong selection: red flash on tile, error message, selection resets, can try again
- Correct selection: success modal with explanation text, "Weiter" advances to next round
- After round 3: advances to Challenge 4

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: challenge 3 deepfake renderer with confirm-before-check flow"
```

---

## Task 13: Challenge 4 — PDF Renderer

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append `renderPdf` to `app.js`**

```js
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
```

- [ ] **Step 2: Verify in browser**

Navigate to Challenge 4 (console: `setState({currentChallengeIndex:3, currentSubIndex:0}); render()`). Should see:
- PDF download button
- Years input with hint text
- Wrong input (e.g. `2019, 2021, 2024`): red flash, error message
- Correct input in any order (e.g. `2024, 2018, 2021`): success → endscreen after 1.5s

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: challenge 4 PDF renderer with order-independent year validation"
```

---

## Task 14: Endscreen

**Files:**
- Modify: `app.js` (append)

- [ ] **Step 1: Append `renderEnd` to `app.js`**

```js
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
░  ░      ░ ▒ ░░ ░▒  ░ ░░ ░▒  ░ ░ ▒ ░  ░ ▒ ▒░ ░ ░░   ░ ▒░
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
    '=== AI ESCAPE ROOM · ERGEBNIS ===',
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
```

- [ ] **Step 2: Verify endscreen**

Navigate directly to endscreen in console:

```js
setState({
  phase: 'end', teamName: 'Team Alpha',
  finalTime: 2342, finalErrors: 4, finalHintsUsed: 1,
  finalScore: 7380
})
render()
```

Should see:
- ASCII art header
- "COMPLETE · Team Alpha"
- 4 stat rows with correct values and colors
- "Ergebnis kopieren" button — clicking copies formatted text to clipboard, button changes to "✓ Kopiert!" briefly

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: endscreen with stats, ASCII art, and clipboard export"
```

---

## Task 15: Integration Smoke Test + STATUS.md Update

**Files:**
- Modify: `STATUS.md`

- [ ] **Step 1: Full game walkthrough in browser**

Start fresh (clear localStorage, reload):

1. **Startscreen:** Enter "Team Test", click "MISSION STARTEN" → game view loads ✓
2. **C1 Level 1:** Enter wrong code → red flash, error ✓. Enter `NEO` → Level 2 loads ✓
3. **C1 Level 2:** Enter `TRINITY` → Level 3 ✓
4. **C1 Level 3:** Enter `MORPHEUS` → Challenge 2 loads ✓
5. **C2:** Enter `385` → Challenge 3 loads ✓
6. **C3 Round 1:** Click wrong image → confirm → red flash, stays on round ✓. Click correct (`b`) → confirm → modal with explanation ✓. Click "Weiter" → Round 2 ✓
7. **C3 Rounds 2–3:** Complete similarly → Challenge 4 loads ✓
8. **C4:** Enter `2018, 2024, 2021` (wrong order) → succeeds ✓. Endscreen loads ✓
9. **Endscreen:** Stats visible, copy button works ✓
10. **Reload during game:** Close and reopen browser mid-game → timer resumes, correct challenge shown ✓

- [ ] **Step 2: Hint timer smoke test**

```js
// Trigger hint early
setState({ stageEnteredTime: Date.now() - 310000 })
// Wait 1s for tick → hint button appears
// Click hint → modal → confirm → hint text shown, hintsUsed = 1
```

- [ ] **Step 3: Update STATUS.md**

Update the status section:

```markdown
## Aktueller Status
- [x] Design-Spec erstellt
- [x] Implementation abgeschlossen
- [ ] Assets einpflegen (CustomGPT-Links, Audio, Bilder, PDF)
- [ ] GitHub Pages Deployment
```

- [ ] **Step 4: Commit**

```bash
git add STATUS.md
git commit -m "docs: update STATUS.md — implementation complete, assets pending"
```

---

## Appendix: Asset-Einpflegen (nach dem Event)

Alle Anpassungen nur in `ESCAPE_ROOM_CONFIG` in `app.js`:

| Was | Wo im CONFIG | Format |
|---|---|---|
| CustomGPT-Links | `challenges[0].levels[*].botUrl` | vollständige URL |
| Audio-Datei | `assets/audio/challenge2.mp3` hochladen, kein CONFIG-Change nötig | MP3 |
| Deepfake-Bilder | `assets/images/c3-r*-*.jpg` hochladen + `challenges[2].rounds[*].images[*].src` | JPG/PNG |
| PDF | `assets/docs/challenge4.pdf` hochladen, kein CONFIG-Change nötig | PDF |
| Lösungscodes | `challenges[*].solution` bzw. `levels[*].solution` | String / Array |
| Hint-Texte | `challenges[*].hint` / `levels[*].hint` / `rounds[*].hint` | String |

## Appendix: GitHub Pages Deployment

```bash
# 1. Repo auf GitHub erstellen (github.com/new)
git remote add origin https://github.com/DEIN-USER/ai-escape-room.git
git push -u origin main

# 2. GitHub Pages aktivieren:
#    → Repository Settings → Pages → Source: "Deploy from branch" → main / (root)
#    → Seite ist dann unter https://DEIN-USER.github.io/ai-escape-room/ erreichbar
```
