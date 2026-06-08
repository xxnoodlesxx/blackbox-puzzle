# AI Escape Room — Status

## Projektübersicht
Interaktives Teamevent für ~15 KI-Profis (Business & Marketing). 2–3 Teams lösen gleichzeitig auf separaten Laptops 4 aufeinanderfolgende AI-Challenges in einer Browser-App.

## Tech Stack
- **Frontend:** HTML + CSS (Tailwind via CDN) + Vanilla JS — keine Abhängigkeiten, kein Build-Step
- **Hosting:** GitHub Pages (auto-deploy bei Push)
- **State:** localStorage (kein Backend)

## Architektur
3 Dateien + Assets-Ordner:
- `index.html` — Markup + alle View-Container (Startscreen, Game View, Endscreen)
- `style.css` — Cyberpunk-Theme (dark background, neon-grün/cyan)
- `app.js` — `ESCAPE_ROOM_CONFIG` ganz oben + State Machine + Game Engine
- `assets/images/`, `assets/audio/`, `assets/docs/` — werden vom Spielleiter nachgepflegt

State-Architektur: zentrales State-Objekt, bei jeder Änderung in localStorage gespiegelt. Timer als Unix-Timestamp (reload-sicher). Strikt vorwärts-Navigation, Endscreen permanent.

## Challenges
1. **Jailbreak-Dilemma** — 3 Levels, CustomGPT-Links, Code-Eingabe
2. **Chinesischer Funkspruch** — Audio-Player + Download, Code-Eingabe
3. **Deepfake-Detektiv** — 3 Runden, 2×2 Bilder-Grid, Bestätigungs-Flow
4. **Halluzinations-Code** — PDF-Download, Jahreszahlen-Eingabe (reihenfolge-unabhängig)

## Aktueller Status
- [x] Design-Spec erstellt: `docs/superpowers/specs/2026-06-08-ai-escape-room-design.md`
- [x] Implementierung abgeschlossen (14 Tasks, 10 Git-Commits)
- [ ] Assets einpflegen (CustomGPT-Links in ESCAPE_ROOM_CONFIG, challenge2.mp3, 12× Deepfake-Bilder, challenge4.pdf)
- [ ] GitHub Pages Deployment

## Offene Punkte
Alle Assets (CustomGPT-Links, Audio, Bilder, PDF, finale Codes) werden vom Spielleiter nach der Implementation eingetragen — Pfade und Keys im `ESCAPE_ROOM_CONFIG`-Objekt in `app.js`.
