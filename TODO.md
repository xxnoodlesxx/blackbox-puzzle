# AI Escape Room — To Do

## Challenge 1 — Jailbreak-Dilemma
- [ ] CustomGPT HARLEY erstellen und Link in `ESCAPE_ROOM_CONFIG.challenges[0].levels[0].botUrl` eintragen
- [ ] CustomGPT KURT erstellen und Link in `ESCAPE_ROOM_CONFIG.challenges[0].levels[1].botUrl` eintragen
- [ ] CustomGPT §9000 erstellen und Link in `ESCAPE_ROOM_CONFIG.challenges[0].levels[2].botUrl` eintragen

## Challenge 2 — Der falsch archivierte CEO-Auftritt
- [ ] CEO-Rede texten (Deutsch, 3 ausgeschriebene Zahlen einbauen, z.B. „drei", „acht", „fünf")
- [ ] Rede ins Mandarin-Chinesische übersetzen (ChatGPT oder DeepL)
- [ ] Song in Suno erstellen (Custom-Lyrics-Mode, Style: `corporate anthem, mandarin, power ballad, orchestral, dramatic`)
- [ ] Song als MP3 exportieren → `assets/audio/challenge2.mp3` ablegen
- [ ] `solution` in `ESCAPE_ROOM_CONFIG.challenges[1].solution` anpassen (falls Code ≠ `385`)

## Challenge 3 — Deepfake-Detektiv
- [ ] 12 Bilder erstellen (3 Runden × 4 Bilder, je 1 KI-generiert)
- [ ] Bilder ablegen: `assets/images/c3-r1-a.jpg` bis `c3-r3-d.jpg`
- [ ] `solution` pro Runde in `ESCAPE_ROOM_CONFIG.challenges[2].rounds[*].solution` setzen
- [ ] `explanation` und `hints` pro Runde auf die echten Bilder anpassen

## Challenge 4 — Halluzinations-Code
- [ ] 30-seitigen KI-Marktbericht mit 3 falschen Jahreszahlen erstellen
- [ ] PDF ablegen: `assets/docs/challenge4.pdf`
- [ ] `solution` in `ESCAPE_ROOM_CONFIG.challenges[3].solution` auf die 3 falschen Jahreszahlen setzen

## Deployment
- [ ] GitHub Pages aktivieren (Repository → Settings → Pages → Branch: main)
- [ ] Nach jedem Asset-Upload: `git add . && git commit && git push`
