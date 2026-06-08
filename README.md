# ◈ BLACKBOX — AI Puzzle Room

Interaktives Browser-Teamspiel für KI-Profis. 2–3 Teams lösen gleichzeitig auf separaten Laptops 4 aufeinanderfolgende KI-Challenges gegen die Zeit.

## Challenges

| # | Name | Was euch erwartet |
|---|------|-------------------|
| 1 | Das Jailbreak-Dilemma | Bringt drei KI-Bots mit zunehmend strikten Sicherheitsmechanismen dazu, ihr Geheimnis preiszugeben. |
| 2 | Der chinesische Funkspruch | Ihr empfangt eine verschlüsselte KI-Botschaft — entschlüsselt sie mithilfe von KI-Tools. |
| 3 | Der Deepfake-Detektiv | Drei Bilderrunden, steigende Schwierigkeit — findet das KI-generierte Bild, bevor euch die Fehlerpunkte einholen. |
| 4 | Der Halluzinations-Code | Ein langer KI-generierter Bericht enthält bewusst eingebaute Fehler. Findet sie — aber lest ihn nicht manuell. |

## Tech Stack

- Vanilla HTML / CSS / JS — kein Build-Step, keine Abhängigkeiten
- Tailwind CSS via CDN
- `localStorage` als State-Speicher (kein Backend)
- GitHub Pages Hosting

## Starten

```bash
# Lokal via HTTP-Server (Python)
python3 -m http.server 8080
# → http://localhost:8080
```

Oder einfach `index.html` im Browser öffnen (einige Features wie Audio brauchen einen Server).

## Konfiguration

Alle spielrelevanten Werte stehen ganz oben in `app.js` im `ESCAPE_ROOM_CONFIG`-Objekt:

- **Bot-URLs** für Challenge 1 (Jailbreak)
- **Audio-Datei** für Challenge 2 (`assets/audio/challenge2.mp3`)
- **Bilder** für Challenge 3 (`assets/images/c3-r*.jpg`)
- **PDF** für Challenge 4 (`assets/docs/challenge4.pdf`)
- **Lösungscodes** und **Scoring-Parameter**

## Projektstruktur

```
index.html          # Markup + View-Container
style.css           # Cyberpunk-Theme (neon grün/cyan auf schwarz)
app.js              # Config + State Machine + Game Engine
assets/
  audio/            # challenge2.mp3
  images/           # 12× Deepfake-Bilder (c3-r1-a.jpg … c3-r3-d.jpg)
  docs/             # challenge4.pdf
```

## Spielmodus

- **Scoring:** 10'000 Startpunkte − Zeitstrafe (2 Pkt/s) − Fehlversuche (200 Pkt) − Hinweise (500 Pkt)
- **Hinweise** schalten sich nach 5 Minuten pro Challenge frei
- **State** wird in `localStorage` gespeichert — reload-sicher
- **Endscreen** ist permanent; Reset nur via "Neues Spiel"-Button
