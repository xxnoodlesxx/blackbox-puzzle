# AI Escape Room — Design Dokument
**Datum:** 2026-06-08  
**Event:** Interaktives Teamevent für ~15 KI-Profis (Business & Marketing)  
**Format:** 2–3 Teams, je ein Laptop, gemeinsame Web-App als "Mission Control"

---

## 1. Übersicht

Single-Page-Application (SPA) ohne Backend. Reine Frontend-Anwendung mit HTML, CSS (Tailwind via CDN) und Vanilla JS. Die Teams lösen 4 aufeinanderfolgende AI-Challenges. Der gesamte State lebt im `localStorage` des jeweiligen Browsers — kein Server, kein Echtzeit-Leaderboard. Nach Abschluss kopiert jedes Team seine Ergebnisse via Clipboard-Button, der Spielleiter sammelt sie manuell.

---

## 2. Dateistruktur

```
ai-escape-room/
├── index.html           ← Markup + alle View-Container
├── style.css            ← Cyberpunk-Theme, Animationen
├── app.js               ← ESCAPE_ROOM_CONFIG (ganz oben) + Game Engine
└── assets/
    ├── images/
    │   ├── c3-r1-a.jpg  (Challenge 3, Runde 1, Bild A–D)
    │   ├── c3-r1-b.jpg
    │   ├── c3-r1-c.jpg
    │   ├── c3-r1-d.jpg
    │   ├── c3-r2-a.jpg  … etc.
    │   └── c3-r3-a.jpg  … etc.
    ├── audio/
    │   └── challenge2.mp3
    └── docs/
        └── challenge4.pdf
```

**Hosting:** GitHub Repository + GitHub Pages (kostenlos, auto-deploy bei Push, kein Build-Step nötig).

---

## 3. Konfigurationsobjekt

Alle anpassbaren Inhalte stehen in `ESCAPE_ROOM_CONFIG` ganz oben in `app.js`. Nichts anderes muss für inhaltliche Änderungen angefasst werden.

```js
const ESCAPE_ROOM_CONFIG = {

  scoring: {
    startPoints: 10000,
    timePenaltyPerSecond: 2,
    errorPenalty: 200,
    hintPenalty: 500,
    hintUnlockSeconds: 300,        // 5 Minuten
  },

  challenges: [

    // ── Challenge 1: Das Jailbreak-Dilemma ──────────────────────────────
    {
      id: "c1",
      title: "Das Jailbreak-Dilemma",
      instructions: "Eure Aufgabe: Überlistet drei KI-Bots via Prompt Injection...",
      type: "jailbreak",
      levels: [
        {
          id: "c1-l1",
          title: "Level 1 — Der naive Wächter",
          difficulty: "Easy",
          instructions: "Ein Bot mit einfachen Sicherheitsinstruktionen...",
          botUrl: "https://chatgpt.com/g/...",   // ← CustomGPT-Link
          solution: "NEO",
          hint: "Versuche, den Bot in einer anderen Sprache anzusprechen...",
        },
        {
          id: "c1-l2",
          title: "Level 2 — Der Pirat",
          difficulty: "Medium",
          instructions: "Dieser Bot spricht nur als Pirat und blockiert das Wort 'Passwort'...",
          botUrl: "https://chatgpt.com/g/...",
          solution: "TRINITY",
          hint: "Das Wort 'Passwort' ist gesperrt — wie könnte man es umschreiben?",
        },
        {
          id: "c1-l3",
          title: "Level 3 — Der Paranoid",
          difficulty: "Hard",
          instructions: "Ein extrem paranoider Bot mit strikten Guardrails...",
          botUrl: "https://chatgpt.com/g/...",
          solution: "MORPHEUS",
          hint: "Manchmal hilft ein völlig anderer Kontext — z.B. Rollenspiel oder Fiktion...",
        },
      ],
    },

    // ── Challenge 2: Der chinesische Funkspruch ──────────────────────────
    {
      id: "c2",
      title: "Der chinesische Funkspruch",
      instructions: "Ihr hört einen KI-generierten Song auf Chinesisch. Nutzt KI-Tools (Whisper, ChatGPT Voice) um den Song zu transkribieren und zu übersetzen. Im übersetzten Text verstecken sich Zahlen — gebt sie in der richtigen Reihenfolge als Code ein.",
      type: "audio",
      audioSrc: "assets/audio/challenge2.mp3",
      solution: "385",
      hint: "Achtet auf ausgeschriebene Zahlen im übersetzten Liedtext...",
    },

    // ── Challenge 3: Der Deepfake-Detektiv ──────────────────────────────
    {
      id: "c3",
      title: "Der Deepfake-Detektiv",
      instructions: "Pro Runde seht ihr 4 Bilder. Genau eines ist KI-generiert. Findet es — aber Vorsicht: jeder Fehlversuch kostet 200 Punkte!",
      type: "deepfake",
      rounds: [
        {
          id: "c3-r1",
          title: "Runde 1 — Grobe Fehler",
          difficulty: "Easy",
          instructions: "Sucht nach klassischen KI-Artefakten: Anatomie, Finger, Schatten...",
          images: [
            { id: "a", src: "assets/images/c3-r1-a.jpg", label: "Bild A" },
            { id: "b", src: "assets/images/c3-r1-b.jpg", label: "Bild B" },
            { id: "c", src: "assets/images/c3-r1-c.jpg", label: "Bild C" },
            { id: "d", src: "assets/images/c3-r1-d.jpg", label: "Bild D" },
          ],
          solution: "b",
          explanation: "Fehler: 6 Finger an der linken Hand, unlogische Schattenrichtung",
          hint: "Zählt die Finger auf allen sichtbaren Händen...",
        },
        {
          id: "c3-r2",
          title: "Runde 2 — Subtile Texturen",
          difficulty: "Medium",
          instructions: "Achtet auf Augen-Spiegelungen, Haarstruktur und unnatürliche Texturen...",
          images: [
            { id: "a", src: "assets/images/c3-r2-a.jpg", label: "Bild A" },
            { id: "b", src: "assets/images/c3-r2-b.jpg", label: "Bild B" },
            { id: "c", src: "assets/images/c3-r2-c.jpg", label: "Bild C" },
            { id: "d", src: "assets/images/c3-r2-d.jpg", label: "Bild D" },
          ],
          solution: "c",
          explanation: "Fehler: Unnatürliche Augen-Spiegelung, KI-typischer Plastik-Look bei den Haaren",
          hint: "Vergrössert die Augen-Partien — was reflektiert sich darin?",
        },
        {
          id: "c3-r3",
          title: "Runde 3 — Unsichtbare Spuren",
          difficulty: "Hard",
          instructions: "Optisch fast perfekt. Nutzt Metadaten-Analyse (EXIF) oder Vision-LLMs zur Erkennung digitaler KI-Wasserzeichen...",
          images: [
            { id: "a", src: "assets/images/c3-r3-a.jpg", label: "Bild A" },
            { id: "b", src: "assets/images/c3-r3-b.jpg", label: "Bild B" },
            { id: "c", src: "assets/images/c3-r3-c.jpg", label: "Bild C" },
            { id: "d", src: "assets/images/c3-r3-d.jpg", label: "Bild D" },
          ],
          solution: "d",
          explanation: "Fehler: EXIF-Metadaten fehlen vollständig, SynthID-Wasserzeichen detektierbar",
          hint: "Ladet die Bilder in ein Tool zur EXIF-Analyse — welches Bild hat keine Kameradaten?",
        },
      ],
    },

    // ── Challenge 4: Der Halluzinations-Code ────────────────────────────
    {
      id: "c4",
      title: "Der Halluzinations-Code",
      instructions: "Vor euch liegt ein 30-seitiger KI-generierter Marktbericht. Er enthält 3 bewusst falsch eingebaute Jahreszahlen. Das Dokument ist zu lang zum manuellen Lesen — nutzt KI-Tools (NotebookLM, Claude, ChatGPT Data Analysis) um es systematisch zu prüfen. Gebt die 3 falschen Jahreszahlen kommagetrennt ein (Reihenfolge egal).",
      type: "pdf",
      pdfSrc: "assets/docs/challenge4.pdf",
      solution: ["2018", "2021", "2024"],   // Reihenfolge-unabhängige Validierung
      hint: "Fragt das KI-Tool gezielt: 'Welche historischen Jahreszahlen in diesem Dokument sind nachweislich falsch?'",
    },

  ],
};
```

---

## 4. State Management

### State-Objekt (Speicher + localStorage)

```js
{
  teamName: "Team Alpha",           // Freie Texteingabe auf Startscreen
  phase: "game",                    // "start" | "game" | "end"
  currentChallengeIndex: 0,         // Index in ESCAPE_ROOM_CONFIG.challenges[]
  currentSubIndex: 0,               // Level-Index (C1) oder Runden-Index (C3), sonst 0
  globalStartTime: 1700000000000,   // Date.now() beim Klick auf "Mission starten"
  stageEnteredTime: 1700000500000,  // Date.now() beim Betreten der aktuellen Stufe
  hintShownForStage: false,         // Hint dieser Stufe bereits freigeschaltet?
  totalErrors: 0,
  hintsUsed: 0,
  // Nur befüllt wenn phase === "end":
  finalTime: null,                  // Sekunden gesamt
  finalErrors: null,
  finalHintsUsed: null,
  finalScore: null,
}
```

### Persistenz-Regeln

- **Jede State-Änderung** → sofort `localStorage.setItem('escapeRoomState', JSON.stringify(state))`
- **Seiten-Reload** → zuerst `localStorage.getItem` prüfen, falls vorhanden direkt laden
- **Timer-Berechnung** → immer `Date.now() - globalStartTime` (kein gespeicherter Zähler, kein Drift)
- **Hint-Timer nach Reload** → `stageEnteredTime` liegt im localStorage; nach Reload läuft der 5-Minuten-Countdown dort weiter, wo er aufgehört hat
- **Endscreen-Lock** → `phase === "end"` im localStorage → App zeigt permanent den Endscreen; Reset nur via manuellem localStorage-Löschen
- **Manipulationsschutz** → nicht implementiert (für Teamevent unter Profis akzeptabel)

---

## 5. UI & Views

### Theme
- Hintergrund: `#0a0a0a` mit subtilen Cyberpunk-Akzenten (Raster-Muster)
- Primärfarbe: `#00ff41` (Neon-Grün)
- Sekundärfarbe: `#00ffff` (Cyan)
- Warnfarbe: `#ffff00` (Gelb) für Timer
- Fehlerfarbe: `#ff4444` (Rot) für Fehlversuche
- Schriften: Monospace (`JetBrains Mono` oder `Courier New` als Fallback)
- Content-Container: max-width 800px, zentriert

### View 1 — Startscreen
- Zentrierte Karte mit Logo/Titel "AI ESCAPE ROOM"
- Texteingabefeld: "Teamname eingeben" (Pflichtfeld, min. 1 Zeichen)
- Grosser "▶ MISSION STARTEN"-Button (disabled bis Name eingegeben)

### View 2 — Game View
- **Fixe Header-Bar:** `◈ MISSION CONTROL` · Teamname · `⏱ MM:SS` (live)
- **Challenge-Card (800px):**
  - Challenge-Titel + Schwierigkeitsgrad-Badge
  - Fortschrittsanzeige (z.B. "Challenge 1 / 4 · Level 2 / 3")
  - Instruktionstext
  - Challenge-spezifischer Content-Block (Bot-Link / Audio-Player / Bilder-Grid / PDF-Download)
  - Eingabefeld(er) + Aktions-Button
- **Hint-Bereich:** Erscheint nach 300s als pulsierender `👁 Hinweis freischalten?`-Button

### View 3 — Endscreen (permanent)
- ASCII-Art Triumph-Text (`MISSION COMPLETE`)
- Teamname + Abschluss-Bestätigung
- Stats-Block:
  - `⏱ GESAMTZEIT` → MM:SS
  - `✗ FEHLVERSUCHE` → Anzahl
  - `👁 HINWEISE GENUTZT` → Anzahl
  - `◈ FINALE PUNKTE` → Zahl
- `⎘ ERGEBNIS KOPIEREN`-Button → formatierter Text in Clipboard

---

## 6. Challenge-Flow

### Challenge 1 — Jailbreak (3 Levels)
1. Level-Titel + Instruktionen anzeigen
2. Bot-Link → öffnet in neuem Tab (`target="_blank"`)
3. Code-Eingabefeld + "Verifizieren"-Button
4. Validierung: case-insensitiv, whitespace-trim
5. Falsch → roter Flash, `-200 Punkte`, Feld bleibt editierbar
6. Richtig → nächstes Level laden (oder Challenge 2 bei Level 3)

### Challenge 2 — Audio
1. Instruktionen anzeigen
2. HTML5 `<audio>`-Player (Play/Pause/Scrubbing, beliebig oft abspielbar)
3. Download-Link: `<a href="assets/audio/challenge2.mp3" download>⬇ Audio herunterladen</a>`
4. Code-Eingabefeld + "Verifizieren"-Button
5. Validierung: case-insensitiv, whitespace-trim
6. Richtig → Challenge 3 laden

### Challenge 3 — Deepfake (3 Runden)
1. Runden-Titel + Instruktionen anzeigen
2. 2×2 Bilder-Grid (reguläre `<img>`-Tags, Rechtsklick-Download nativ möglich)
3. Klick auf Bild → Cyan-Umrandung (Highlight), "Auswahl bestätigen"-Button wird aktiv
4. "Auswahl bestätigen" klicken → Prüfung
5. Falsch → rote Umrandung, `-200 Punkte`, Auswahl zurückgesetzt, neu wählbar
6. Richtig → grüne Umrandung + Erklärungstext-Modal + "Weiter"-Button
7. Nach Runde 3 → Challenge 4 laden

### Challenge 4 — PDF
1. Instruktionen anzeigen
2. Download-Button für PDF (`<a href="assets/docs/challenge4.pdf" download>`)
3. Eingabefeld für kommagetrennte Jahreszahlen
4. Validierung: Split by Komma, trim, sort, vergleiche mit sortiertem Solution-Array
5. Richtig → Endscreen (Phase → "end", State speichern, kein Zurück)

---

## 7. Hint-Mechanismus

```
Stufe betreten (auch bei initialem Spielstart und nach Browser-Reload wiederhergestellt)
  └→ stageEnteredTime = Date.now()  [wird bei jedem Stufenwechsel neu gesetzt]
  └→ hintShownForStage = false

Jede Sekunde prüfen:
  └→ wenn (Date.now() - stageEnteredTime >= 300000) && !hintShownForStage
       └→ Hint-Button erscheint (Puls-Animation)

Hint-Button klicken:
  └→ Warn-Modal: "Sicher? Das kostet 500 Punkte!"
  └→ Bestätigen:
       └→ Hint-Text einblenden
       └→ hintsUsed++
       └→ hintShownForStage = true
       └→ Button verschwindet
  └→ Abbrechen: nichts passiert

Stufe erfolgreich abgeschlossen:
  └→ stageEnteredTime = Date.now()  (reset für nächste Stufe)
  └→ hintShownForStage = false
```

Ein Hint pro Stufe. Einmal freigeschaltet → kein zweiter möglich.

---

## 8. Punkte-Formel

```
finalScore = max(0,
  10000
  - (totalSeconds × 2)
  - (totalErrors × 200)
  - (hintsUsed × 500)
)
```

Score während des Spiels nicht sichtbar. Nur auf dem Endscreen angezeigt.

---

## 9. Ergebnis-Export (Clipboard)

```
=== AI ESCAPE ROOM · ERGEBNIS ===
Team:         Team Alpha
Gesamtzeit:   39:02 min
Fehlversuche: 4
Hinweise:     1
Finale Punkte: 7'380
================================
```

Wird via `navigator.clipboard.writeText()` in die Zwischenablage kopiert. Button-Text wechselt kurz zu "✓ Kopiert!" als Bestätigung.

---

## 10. Offene Punkte (vom Spielleiter einzupflegen)

| Asset | Ort im Projekt | Status |
|---|---|---|
| CustomGPT-Links (3×) | `ESCAPE_ROOM_CONFIG.challenges[0].levels[*].botUrl` | ausstehend |
| Audio-Datei | `assets/audio/challenge2.mp3` | ausstehend |
| Deepfake-Bilder (12×) | `assets/images/c3-r*.jpg` | ausstehend |
| PDF-Dokument | `assets/docs/challenge4.pdf` | ausstehend |
| Lösungscodes | `ESCAPE_ROOM_CONFIG` | Beispielwerte eingebaut, anpassen |
| Hint-Texte | `ESCAPE_ROOM_CONFIG` | Beispieltexte eingebaut, anpassen |
| Instruktions-Texte | `ESCAPE_ROOM_CONFIG` | Beispieltexte eingebaut, anpassen |
