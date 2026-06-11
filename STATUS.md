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
