# Challenge 2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update Challenge 2 config in `ESCAPE_ROOM_CONFIG` to reflect the new "Der falsch archivierte CEO-Auftritt" story and multi-step puzzle flow.

**Architecture:** Single config-only change inside `app.js`. The `renderAudio()` function and all game engine code remain untouched — only `title`, `instructions`, and `hints` inside `challenges[1]` change.

**Tech Stack:** Vanilla JS, no build step — edit and open `index.html` in browser to verify.

---

### Task 1: Update Challenge 2 config in `app.js`

**Files:**
- Modify: `app.js:63–75` (the `// ── Challenge 2` block inside `ESCAPE_ROOM_CONFIG`)

- [ ] **Step 1: Replace the Challenge 2 config block**

In `app.js`, find the block starting at line 63 (`// ── Challenge 2`) and replace the entire challenge object with:

```js
    // ── Challenge 2 ────────────────────────────────────────
    {
      id: 'c2',
      title: 'Der falsch archivierte CEO-Auftritt',
      instructions: 'Praktikant KIRA-7 hat die Jahresrede von CEO Dr. Helga Brandt versehentlich in einen chinesischen Song umgewandelt und als verschlüsseltes Archiv gespeichert. Eure Aufgabe:\n\n1. Hört den Song an und ladet ihn herunter.\n2. Transkribiert den chinesischen Text — kostenlos z.B. mit Whisper auf huggingface.co oder openai.com/research/whisper.\n3. Übersetzt das Transkript mit ChatGPT oder Claude ins Deutsche — ihr erhaltet die echte CEO-Rede.\n4. Sucht in der Rede nach ausgeschriebenen Zahlen und gebt sie der Reihe nach als Code ein.\n\nBonus: Erstellt den Song mit den übersetzten Lyrics in Suno neu!',
      type: 'audio',
      audioSrc: 'assets/audio/challenge2.mp3',
      solution: '385',
      hints: [
        'Der Code steckt nicht als Ziffern im Song — lasst den übersetzten Text nach ausgeschriebenen Zahlwörtern durchsuchen.',
        'Whisper-Tipp: Ladet die MP3 herunter und gebt sie auf huggingface.co/openai/whisper ein. Das Transkript direkt in ChatGPT einfügen und übersetzen lassen.',
      ],
    },
```

- [ ] **Step 2: Verify in browser**

Open `index.html` direkt im Browser (kein Server nötig). Startet eine Mission, klickt durch Challenge 1 (Code: NEO / TRINITY / MORPHEUS) bis Challenge 2 erscheint. Prüft:
- Titel zeigt "Der falsch archivierte CEO-Auftritt"
- Instruktionstext zeigt die 4-Schritt-Liste inkl. Bonus-Zeile
- Audio-Player und Download-Link sind sichtbar
- Code-Eingabe funktioniert (Test: "385" → grüner Erfolg, weiter zu Challenge 3)
- Falscher Code zeigt Fehlermeldung + -200 Punkte

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: redesign challenge 2 as CEO speech song puzzle

KIRA-7 story: intern accidentally converts CEO speech to Mandarin song.
Players transcribe (Whisper) + translate (ChatGPT/Claude) to find code."
```

---

## Offene Punkte (Spielleiter — ausserhalb dieser Implementation)

| Aufgabe | Details |
|---------|---------|
| CEO-Rede texten | Deutsche Rede mit 3 ausgeschriebenen Zahlen (z.B. drei, acht, fünf → Code 385) |
| Ins Chinesische übersetzen | ChatGPT oder DeepL |
| Song in Suno erstellen | Custom-Lyrics-Mode, Style: `corporate anthem, mandarin, power ballad, orchestral, dramatic` |
| MP3 ablegen | `assets/audio/challenge2.mp3` |
| Solution anpassen | `ESCAPE_ROOM_CONFIG.challenges[1].solution` falls Zahlen abweichen |
