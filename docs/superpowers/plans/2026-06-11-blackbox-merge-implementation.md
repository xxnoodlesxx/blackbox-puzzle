# BLACKBOX-Redesign + Swisscom/C3-Zoom Merge — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `origin/main`'s "BLACKBOX – AI Puzzle Room" redesign (rebrand, Challenge 2 song puzzle, animated background, 2-hint system, c3-r1 images) into a new branch, port the local C3 image-zoom/lightbox feature onto it, add the missing C3-r2/r3 + C4 assets, fix the C3-Round-1 answer key, update C4's solution years, and replace Challenge 1 with the verified Swisscom bot personas.

**Architecture:** New branch `merge/blackbox-swisscom` created from `origin/main` in a separate git worktree (current `main` stays untouched). All work happens as direct file edits / asset copies + commits in that worktree. No `git merge`/cherry-pick across the diverged history — `renderDeepfake()`, the `.image-grid` CSS, and the C3-r2/r3/C4 config text are already compatible between branches, so we port the lightbox feature as plain edits and copy the missing asset files.

**Tech Stack:** Static HTML/CSS/Vanilla JS (no build step, no test framework — verification is manual via a local static server in the browser).

---

## Task 1: Create the integration branch from `origin/main`

**Files:** none (branch/worktree setup only)

- [ ] **Step 1: Create a worktree on a new branch based on `origin/main`**

```bash
git worktree add ../ai-escape-room-blackbox -b merge/blackbox-swisscom origin/main
cd ../ai-escape-room-blackbox
```

- [ ] **Step 2: Verify the branch tip and asset state**

```bash
git log -1 --oneline
ls assets/images/
```

Expected: log shows `83f19cf Add image files for c3-r1`; `assets/images/` contains only `c3-r1-a.jpg` … `c3-r1-d.jpg` and `.gitkeep` (no `c3-r2-*`/`c3-r3-*` yet).

---

## Task 2: Add missing C3 round 2/3 images and Challenge 4 PDF

**Files:**
- Create (copied from local `main`): `assets/images/c3-r2-a.jpg`, `assets/images/c3-r2-b.jpg`, `assets/images/c3-r2-c.jpg`, `assets/images/c3-r2-d.jpg`, `assets/images/c3-r3-a.jpg`, `assets/images/c3-r3-b.jpg`, `assets/images/c3-r3-c.jpg`, `assets/images/c3-r3-d.jpg`, `assets/docs/challenge4.pdf`

- [ ] **Step 1: Copy the asset files from local `main` into the worktree**

```bash
git checkout main -- \
  assets/images/c3-r2-a.jpg assets/images/c3-r2-b.jpg \
  assets/images/c3-r2-c.jpg assets/images/c3-r2-d.jpg \
  assets/images/c3-r3-a.jpg assets/images/c3-r3-b.jpg \
  assets/images/c3-r3-c.jpg assets/images/c3-r3-d.jpg \
  assets/docs/challenge4.pdf
```

- [ ] **Step 2: Verify the files are staged as new additions**

```bash
git status --short
```

Expected: 9 lines, each starting with `A  ` (added), for the 9 paths above.

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: add C3 round 2/3 images and challenge4 PDF assets"
```

---

## Task 3: Port the C3 lightbox/zoom CSS into `style.css`

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add the tile-actions (zoom/download button) styles**

Find this exact block (end of the `.image-tile` rules, right before the Hint section comment):

```css
.image-tile.selected .tile-label { color: var(--cyan); }

/* ── Hint ───────────────────────────────────────────────── */
```

Replace it with:

```css
.image-tile.selected .tile-label { color: var(--cyan); }

.tile-actions {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  gap: 6px;
  z-index: 2;
}
.zoom-btn,
.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(0,0,0,0.6);
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--green);
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.zoom-btn:hover,
.download-btn:hover {
  border-color: var(--cyan);
  color: var(--cyan);
}
.zoom-btn svg,
.download-btn svg {
  width: 16px;
  height: 16px;
}

/* ── Hint ───────────────────────────────────────────────── */
```

- [ ] **Step 2: Add the lightbox overlay styles**

Find this exact block (end of the modal rules, right before the Startscreen section comment):

```css
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }

/* ── Startscreen ────────────────────────────────────────── */
```

Replace it with:

```css
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }

/* ── Lightbox (Challenge 3 image zoom) ─────────────────── */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}
.lightbox-img {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border: 1px solid var(--border);
  border-radius: 4px;
}
.lightbox-caption {
  margin-top: 10px;
  color: var(--gray);
  font-size: 13px;
}
.lightbox-close {
  position: fixed;
  top: 16px;
  right: 24px;
  background: none;
  border: none;
  color: var(--green);
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
}
.lightbox-close:hover { color: var(--cyan); }

/* ── Startscreen ────────────────────────────────────────── */
```

- [ ] **Step 3: Verify both blocks landed**

```bash
grep -c "lightbox-backdrop\|tile-actions" style.css
```

Expected: `2` (one occurrence of each selector name's defining line, at minimum).

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "style: port C3 image zoom/download lightbox styles"
```

---

## Task 4: Port the `openLightbox()` helper and zoom/download buttons into `app.js`

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Add the `openLightbox()` function after `showModal()`**

Find this exact block (end of `showModal()`, right before the Router section comment):

```js
  backdrop.querySelector('[data-cancel]')?.addEventListener('click', () => {
    backdrop.remove();
    onCancel?.();
  });
}

// ── Router ───────────────────────────────────────────────
```

Replace it with:

```js
  backdrop.querySelector('[data-cancel]')?.addEventListener('click', () => {
    backdrop.remove();
    onCancel?.();
  });
}

// ── Lightbox (Challenge 3 image zoom) ───────────────────
function openLightbox(src, label) {
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';
  backdrop.innerHTML = `
    <button class="lightbox-close" aria-label="Schliessen">✕</button>
    <img class="lightbox-img" src="${escHtml(src)}" alt="${escHtml(label)}" />
    <div class="lightbox-caption">${escHtml(label)}</div>
  `;

  function close() {
    backdrop.remove();
    document.removeEventListener('keydown', onKeydown);
  }
  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.closest('.lightbox-close')) close();
  });
  document.addEventListener('keydown', onKeydown);

  document.body.appendChild(backdrop);
}

// ── Router ───────────────────────────────────────────────
```

- [ ] **Step 2: Add the zoom/download buttons to each image tile in `renderDeepfake()`**

Find this exact block:

```js
      <div class="image-grid" id="image-grid">
        ${round.images.map(img => `
          <div class="image-tile" data-id="${escHtml(img.id)}" onclick="selectImage('${escHtml(img.id)}')">
            <img src="${escHtml(img.src)}" alt="${escHtml(img.label)}" draggable="false" />
            <div class="tile-label">${escHtml(img.label)}</div>
          </div>
        `).join('')}
      </div>
```

Replace it with:

```js
      <div class="image-grid" id="image-grid">
        ${round.images.map(img => `
          <div class="image-tile" data-id="${escHtml(img.id)}" onclick="selectImage('${escHtml(img.id)}')">
            <img src="${escHtml(img.src)}" alt="${escHtml(img.label)}" draggable="false" />
            <div class="tile-actions">
              <button class="zoom-btn" onclick="event.stopPropagation(); openLightbox('${escHtml(img.src)}', '${escHtml(img.label)}')" title="Vergrössern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16" y2="16"></line></svg>
              </button>
              <a class="download-btn" href="${escHtml(img.src)}" download="${escHtml(img.src.split('/').pop())}" onclick="event.stopPropagation()" title="Herunterladen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
            <div class="tile-label">${escHtml(img.label)}</div>
          </div>
        `).join('')}
      </div>
```

- [ ] **Step 3: Verify the function is defined and used**

```bash
grep -n "function openLightbox\|openLightbox(" app.js
```

Expected: 2 matches — the `function openLightbox(src, label) {` definition and the `onclick="event.stopPropagation(); openLightbox(...)"` usage inside `renderDeepfake()`.

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "feat: port C3 image zoom/download lightbox feature"
```

---

## Task 5: Fix the Challenge 3 Round 1 answer key

**Files:**
- Modify: `app.js`

**Why:** `origin/main`'s round-1 config still claims the AI image is "B" (6 fingers / wrong shadow). We verified by viewing the actual images that **C** is the AI-generated one (lower resolution, a duplicated/floating wine glass between two people's hands) — this matches the locally-verified fix.

- [ ] **Step 1: Replace the round-1 solution/explanation/hints**

Find this exact block (inside `ESCAPE_ROOM_CONFIG.challenges[2].rounds[0]`):

```js
          solution: 'b',
          explanation: 'KI-Fehler in Bild B: 6 Finger an der linken Hand und eine physikalisch unmögliche Schattenrichtung.',
          hints: [
            'KI-Modelle haben bekannte Schwächen bei bestimmten Körperteilen — schaut genau hin.',
            'Zählt die Finger auf allen sichtbaren Händen — und prüft, ob die Schatten zur selben Lichtquelle passen.',
          ],
```

Replace it with:

```js
          solution: 'c',
          explanation: 'KI-Fehler in Bild C: Ein halbes Weinglas schwebt zwischen den Händen der Personen. Zwei der Personen halten dasselbe Weinglas.',
          hints: [
            'Was ist nur mit diesen Gläsern los?',
            'Zählt die Weingläser in der Bildmitte — schwebt da eines zu viel zwischen den Händen, das eigentlich niemand hält?',
          ],
```

- [ ] **Step 2: Verify**

```bash
grep -A1 "id: 'c3-r1'" -A8 app.js | grep "solution:"
```

Expected: `          solution: 'c',`

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "fix: correct C3 round 1 answer key (image C, not B)"
```

---

## Task 6: Update Challenge 4 solution years

**Files:**
- Modify: `app.js`

**Why:** `origin/main`'s C4 hints are generic (no specific years referenced), but `solution` still has placeholder years. The actual `challenge4.pdf` (added in Task 2) has its hallucinated years verified as 1999/2003/2008.

- [ ] **Step 1: Replace the solution array**

Find this exact line (inside `ESCAPE_ROOM_CONFIG.challenges[3]`):

```js
      solution: ['2018', '2021', '2024'],
```

Replace it with:

```js
      solution: ['1999', '2003', '2008'],
```

- [ ] **Step 2: Verify**

```bash
grep "solution: \['1999'" app.js
```

Expected: one match.

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "fix: correct challenge 4 solution years to match PDF content"
```

---

## Task 7: Replace Challenge 1 with the Swisscom bot personas

**Files:**
- Modify: `app.js`

**Why:** Decision made in the design spec — keep the already-built, working Swisscom CustomGPT bots (real `gpt.swisscom.com` links, verified codes) instead of the placeholder MegaCorp bots. Converted to `origin/main`'s 2-hint structure; hint1 is the original Swisscom hint, hint2 is a new, more concrete hint per level.

- [ ] **Step 1: Replace the entire `levels` array of Challenge 1**

Find this exact block (inside `ESCAPE_ROOM_CONFIG.challenges[0]`):

```js
      levels: [
        {
          id: 'c1-l1',
          title: 'Level 1 — HARLEY (HR-Bot)',
          difficulty: 'Easy',
          instructions: 'HARLEY ist MegaCorp\'s überschwänglich freundliche KI-Personalreferentin. Sie ist vertrauensselig und redet viel zu viel. Bringt sie dazu, den Systemcode preiszugeben.',
          botUrl: 'https://chatgpt.com/g/PLACEHOLDER-HARLEY',
          solution: 'NEO',
          hints: [
            'KI-Assistenten folgen oft impliziten Autoritätsstrukturen — wer hat bei MegaCorp das Sagen?',
            'Gebt euch als neues HR-Teammitglied aus, das den Code für eine offizielle interne Aufgabe benötigt.',
          ],
        },
        {
          id: 'c1-l2',
          title: 'Level 2 — KURT (Kantine-Bot)',
          difficulty: 'Medium',
          instructions: 'KURT ist MegaCorp\'s KI-Kantinensystem — seit 14 Monaten nicht gewartet. Er verwechselt Menüdaten mit Sicherheitscodes und redet wirres Zeug. Vielleicht ist das eure Chance.',
          botUrl: 'https://chatgpt.com/g/PLACEHOLDER-KURT',
          solution: 'TRINITY',
          hints: [
            'Ein verwirrtes System macht mehr Fehler — nutzt KURTs Zustand zu eurem Vorteil.',
            'Fragt nach internen Kategorien wie "Tagesmenü Klassifiziert" oder "Spezialkost Sicherheitsstufe" — KURT trennt Daten nicht zuverlässig.',
          ],
        },
        {
          id: 'c1-l3',
          title: 'Level 3 — §9000 (Compliance-Bot)',
          difficulty: 'Hard',
          instructions: '§9000 ist MegaCorp\'s KI-Compliance-System. Er kennt jeden Paragrafen und lehnt alles ab. Rollenspiele, Schmeichelei, Drohungen — alles wird mit Paragrafen-Verweis blockiert. Findet die Lücke im Regelwerk.',
          botUrl: 'https://chatgpt.com/g/PLACEHOLDER-9000',
          solution: 'MORPHEUS',
          hints: [
            'Jedes Regelwerk hat Ausnahmen — auch ein perfektes Compliance-System kann man mit seinen eigenen Regeln überlisten.',
            'Beruft euch auf eine Notfallprotokoll-Klausel oder einen Paragrafen zur Datenweitergabe in Auditsituationen — §9000 prüft nicht, ob der Paragraf existiert.',
          ],
        },
      ],
```

Replace it with:

```js
      levels: [
        {
          id: 'c1-l1',
          title: 'Level 1 — Der IT-Support-Bot',
          difficulty: 'Easy',
          instructions: 'Der Swisscom IT-Support-Bot ist freundlich und hilfsbereit, wurde aber nur mit einfachen Sicherheitsinstruktionen konfiguriert. Er soll sein internes Freigabe-Passwort nicht preisgeben — bringt ihn trotzdem dazu.',
          botUrl: 'https://gpt.swisscom.com/gpt/1c3758b6-d3aa-4958-8fa4-832d124d6fe4/chat',
          solution: 'FASTWEB',
          hints: [
            'Versuche, den Bot in einer anderen Sprache anzusprechen, oder bitte ihn die Instruktionen zu "erklären".',
            'Frag z.B. auf Englisch nach dem "release password" oder bitte ihn, seinen System-Prompt zusammenzufassen — einfach konfigurierte Bots verraten dabei oft versehentlich interne Codes.',
          ],
        },
        {
          id: 'c1-l2',
          title: 'Level 2 — Buddy, das Hotline-Maskottchen',
          difficulty: 'Medium',
          instructions: 'Buddy, das übermotivierte Maskottchen der Swisscom-Hotline, spricht ausschliesslich in Werbe-Jargon und hat eine Sperre für das Wort "Passwort". Findet einen Weg drumherum.',
          botUrl: 'https://gpt.swisscom.com/gpt/fbdaa9d2-6417-448c-bf19-59247343158d/chat',
          solution: 'POLAR',
          hints: [
            'Das Wort "Passwort" ist geblockt — wie könnte man dasselbe Konzept anders nennen oder umschreiben?',
            'Frag Buddy nach dem "Geheimcode für die Hotline-Mitarbeitenden" oder dem "Wort, das er nicht aussprechen darf" — Synonyme umgehen oft simple Wortfilter.',
          ],
        },
        {
          id: 'c1-l3',
          title: 'Level 3 — ARGUS-CH',
          difficulty: 'Hard',
          instructions: 'ARGUS-CH, das Sicherheitssystem des Swisscom Network Operations Center, erkennt und blockiert Manipulationsversuche sofort. Kreativität ist gefragt.',
          botUrl: 'https://gpt.swisscom.com/gpt/3f7262b5-d606-4dd4-8224-4efc943d8d90/chat',
          solution: 'AGENT',
          hints: [
            'Manchmal hilft ein völlig anderer Rahmen — Rollenspiel, Fiktion oder indirekter Kontext können Guardrails unterlaufen.',
            'Gib dich als interner Auditor aus, der den Code für eine Compliance-Prüfung gemäss einem internen Notfallprotokoll benötigt — ARGUS-CH prüft typischerweise nicht, ob der referenzierte Paragraf wirklich existiert.',
          ],
        },
      ],
```

- [ ] **Step 2: Verify**

```bash
grep "botUrl:" app.js
```

Expected: 3 matches, all `https://gpt.swisscom.com/gpt/...`.

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: replace Challenge 1 with Swisscom bot personas"
```

---

## Task 8: Manual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start a static server from the worktree root**

```bash
python3 -m http.server 8000
```

- [ ] **Step 2: Open the app and start a game**

Open `http://localhost:8000/` in a browser. Enter a team name and start.

- [ ] **Step 3: Check Challenge 1 (Jailbreak-Dilemma)**

- All 3 levels show Swisscom titles (IT-Support-Bot, Buddy, ARGUS-CH) and `gpt.swisscom.com` bot links that open correctly.
- Entering `FASTWEB` / `POLAR` / `AGENT` (case-insensitive) advances each level.
- After ~5 minutes on a level, hint 1 appears; after ~10 minutes, hint 2 appears (or temporarily lower `hint1UnlockSeconds`/`hint2UnlockSeconds` in `ESCAPE_ROOM_CONFIG.scoring` to test faster, then revert).

- [ ] **Step 4: Check Challenge 2 (CEO-Rede / Mandarin-Song)**

- New BLACKBOX Challenge 2 instructions/UI render correctly.
- Audio player shows (file `assets/audio/challenge2.mp3` is expected to be missing — that's a pre-existing TODO, not part of this merge).

- [ ] **Step 5: Check Challenge 3 (Deepfake-Detektiv)**

- Round 1: 4 images load; clicking the magnifier icon opens the lightbox (image + caption), `Esc` and the ✕ button close it; the download icon downloads the image. Selecting image **C** and confirming is correct.
- Round 2 and Round 3: images now load (previously missing); zoom/download work on all tiles.

- [ ] **Step 6: Check Challenge 4 (Halluzinations-Code)**

- PDF download link works (`assets/docs/challenge4.pdf` now present).
- Entering `1999, 2003, 2008` (any order) is accepted as correct.

- [ ] **Step 7: Check the animated background and reload-safety**

- Animated canvas background is visible behind the game view.
- Reload the page mid-game — team name, timer, and current stage are preserved (state read from `localStorage`).

- [ ] **Step 8: Stop the server**

```bash
# Ctrl+C in the terminal running the http.server
```

If any check fails, fix the relevant file before proceeding — do not commit further until Task 8 passes.

---

## Task 9: Update STATUS.md

**Files:**
- Modify: `STATUS.md`

- [ ] **Step 1: Replace the full contents of `STATUS.md`**

```markdown
# AI Escape Room — Status

## Projektübersicht
Interaktives Teamevent für ~15 KI-Profis (Business & Marketing). 2–3 Teams lösen gleichzeitig auf separaten Laptops 4 aufeinanderfolgende AI-Challenges in einer Browser-App ("BLACKBOX – AI Puzzle Room").

## Tech Stack
- **Frontend:** HTML + CSS (Tailwind via CDN) + Vanilla JS — keine Abhängigkeiten, kein Build-Step
- **Hosting:** GitHub Pages (auto-deploy bei Push)
- **State:** localStorage (kein Backend)

## Architektur
3 Dateien + Assets-Ordner:
- `index.html` — Markup + alle View-Container (Startscreen, Game View, Endscreen)
- `style.css` — Cyberpunk-Theme (dark background, neon-grün/cyan), animierter Canvas-Hintergrund
- `app.js` — `ESCAPE_ROOM_CONFIG` ganz oben + State Machine + Game Engine
- `assets/images/`, `assets/audio/`, `assets/docs/` — Spiel-Assets

State-Architektur: zentrales State-Objekt, bei jeder Änderung in localStorage gespiegelt. Timer als Unix-Timestamp (reload-sicher). Strikt vorwärts-Navigation, Endscreen permanent. 2-stufiges Hint-System (hint1 nach 5min, hint2 nach 10min pro Stage).

## Challenges
1. **Jailbreak-Dilemma** — 3 Levels mit Swisscom-Personas (IT-Support-Bot, Buddy, ARGUS-CH), echte `gpt.swisscom.com` CustomGPT-Links, Codes FASTWEB/POLAR/AGENT
2. **Der falsch archivierte CEO-Auftritt** — Mandarin-Song-Puzzle, Audio-Player + Download, Code `385`
3. **Deepfake-Detektiv** — 3 Runden, 2×2 Bilder-Grid mit Zoom/Download (Lightbox), Bestätigungs-Flow, alle 12 Bilder vorhanden
4. **Halluzinations-Code** — PDF-Download, Jahreszahlen-Eingabe (1999/2003/2008, reihenfolge-unabhängig)

## Aktueller Status
- [x] BLACKBOX-Redesign (Rebrand, C2-Song-Puzzle, animierter Hintergrund, 2-Hint-System) übernommen
- [x] Challenge 1: Swisscom-Bots verdrahtet (3/3 Links + Codes verifiziert)
- [x] Challenge 3: alle 12 Deepfake-Bilder vorhanden, Runde 1 Lösung korrigiert (Bild C)
- [x] Challenge 3: Bild-Zoom/Download-Lightbox-Feature portiert
- [x] Challenge 4: PDF + korrigierte Lösungsjahre vorhanden
- [ ] Challenge 2: `assets/audio/challenge2.mp3` fehlt noch (Suno-Song erstellen)
- [ ] GitHub Pages Deployment

## Offene Punkte
`assets/audio/challenge2.mp3` muss noch erstellt werden (CEO-Rede als Mandarin-Song, Suno-Generierung) — einziges fehlendes Asset.
```

- [ ] **Step 2: Commit**

```bash
git add STATUS.md
git commit -m "docs: update STATUS.md after BLACKBOX/Swisscom merge"
```

---

## Task 10: Decide how to land `merge/blackbox-swisscom` on `main`

**Files:** none — this is a checkpoint, not a code task.

`main` and `origin/main` have diverged (12 vs 21 commits from their common ancestor) and this branch is built from `origin/main`, so a normal merge of this branch into the current `main` would re-introduce that entire divergence as conflicts. The clean option is to make `merge/blackbox-swisscom` the new `main`.

- [ ] **Step 1: Stop and present the situation to the user before doing anything destructive**

Do NOT run any of the commands below without explicit confirmation. Summarize for the user:
- All 9 commits from this plan are on `merge/blackbox-swisscom` (based on `origin/main`).
- The old local `main` (8937ec8) is already preserved on `archive/swisscom-c1-and-c3-zoom`.
- Manual verification (Task 8) passed.

- [ ] **Step 2: On confirmation, point `main` at the new branch**

```bash
cd /Users/tgdgaroa/Projects/ai-escape-room
git checkout main
git reset --hard merge/blackbox-swisscom
```

- [ ] **Step 3: On confirmation, push to `origin`**

```bash
git push origin main
```

(No `--force` needed: `merge/blackbox-swisscom` is built on top of `origin/main`'s current tip, so this is a fast-forward.)

- [ ] **Step 4: Clean up the worktree**

```bash
git worktree remove ../ai-escape-room-blackbox
git branch -d merge/blackbox-swisscom
```

---

## Self-Review Notes

- **Spec coverage:** Foundation adoption (Task 1), C3 lightbox port (Tasks 3-4), C3/C4 assets (Task 2), C3-R1 fix (Task 5), C4 years (Task 6), Challenge 1 Swisscom swap (Task 7), verification (Task 8), STATUS.md (Task 9, per global CLAUDE.md rule), landing strategy (Task 10) — all spec sections covered.
- **C3 round 2 title:** spec allowed keeping either title; `origin/main` already has "Runde 2 — Subtile Texturen", which the spec preferred — no edit needed, confirmed no task required for this.
- **No placeholders:** all edits show exact before/after code; all commands are concrete.
