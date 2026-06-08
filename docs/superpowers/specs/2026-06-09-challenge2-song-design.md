# Design: Challenge 2 — Der falsch archivierte CEO-Auftritt

**Datum:** 2026-06-09  
**Status:** Genehmigt  

---

## Kontext

Challenge 2 wird von der ursprünglichen "Chinesischer Funkspruch"-Challenge zu einer mehrstufigen Rätsel-Challenge umgebaut. Zentral ist ein KI-generierter Song (Suno), den die Teams transkribieren, übersetzen und schliesslich selbst neu erstellen müssen.

---

## Story-Framing

> Praktikant KIRA-7 (ein KI-Roboter, natürlich) sollte die Jahresrede von CEO Dr. Helga Brandt archivieren. Durch einen katastrophalen API-Fehler wurde die Rede stattdessen in einen Mandarin-chinesischen Suno-Song umgewandelt und als verschlüsseltes Archiv gespeichert. Eure Aufgabe: die Rede rekonstruieren und den Freigabe-Code extrahieren.

---

## Challenge-Flow (3 Pflichtschritte + 1 Bonus)

| Schritt | Aufgabe | Tool (gratis) |
|---------|---------|---------------|
| 1 | Song anhören / herunterladen, chinesischen Liedtext transkribieren | Whisper (HuggingFace-Demo oder openai.com/research/whisper) |
| 2 | Transkript übersetzen → deutsche CEO-Rede | ChatGPT / Claude (free tier) |
| 3 | Ausgeschriebene Zahlen in der Rede finden → Code zusammensetzen | — |
| Bonus | Übersetzte Lyrics in Suno Custom-Mode einfügen → Song neu erstellen | Suno (gratis, 10 Songs/Tag) |

---

## Code-Mechanik

In der übersetzten deutschen CEO-Rede sind **3 Zahlen ausgeschrieben** eingebettet — natürlich in den Fliesstext integriert, nicht offensichtlich hervorgehoben. Beispiel:

> *„MegaCorp wächst seit **drei** Jahrzehnten, mit **acht** globalen Standorten und **fünf** patentierten KI-Systemen..."*

→ Code: `385`

Die Zahlen sind in der richtigen Reihenfolge zu lesen (von oben nach unten im Text).  
Validierung: case-insensitiv, whitespace-trim (wie alle anderen Challenges).

---

## Asset: Der Song

**Sprache:** Mandarin-Chinesisch  
**Stil:** Corporate-Hymne — Power Ballad oder Propaganda-Marsch (passend zur MegaCorp-Satire)  
**Länge:** ~1–2 Minuten (Suno Free-Tier-Limit)  
**Datei:** `assets/audio/challenge2.mp3`

**Erstellungsprozess (vom Spielleiter):**
1. Deutsche CEO-Rede texten — mit 3 eingebetteten ausgeschriebenen Zahlen
2. Text mit ChatGPT ins Mandarin-Chinesische übersetzen
3. Übersetzten Text in Sunos Custom-Lyrics-Mode eingeben
4. Style-Tag: z.B. `corporate anthem, mandarin, power ballad, orchestral, dramatic`
5. Generierten Song als MP3 herunterladen → in `assets/audio/challenge2.mp3` ablegen

---

## Config-Änderungen in `ESCAPE_ROOM_CONFIG`

```js
{
  id: "c2",
  title: "Der falsch archivierte CEO-Auftritt",
  instructions: `Praktikant KIRA-7 hat die Jahresrede von CEO Dr. Helga Brandt versehentlich in einen chinesischen Song umgewandelt. Eure Aufgabe:

1. Hört den Song an und ladet ihn herunter.
2. Transkribiert den chinesischen Text mit Whisper (kostenlos via HuggingFace).
3. Übersetzt das Transkript mit ChatGPT oder Claude — ihr erhaltet die echte CEO-Rede.
4. Sucht in der Rede nach ausgeschriebenen Zahlen — gebt sie der Reihe nach als Code ein.

Bonus: Erstellt den Song mit den übersetzten Lyrics in Suno neu!`,
  type: "audio",
  audioSrc: "assets/audio/challenge2.mp3",
  solution: "385",   // ← vom Spielleiter anpassen
  hint: "Achtet auf ausgeschriebene Zahlen im übersetzten Text — nicht auf Ziffern.",
}
```

---

## Offene Punkte (Spielleiter)

| Aufgabe | Details |
|---------|---------|
| CEO-Rede texten | Deutsche Rede mit 3 eingebetteten Zahlen (ausgeschrieben) |
| Ins Chinesische übersetzen | Mit ChatGPT oder DeepL |
| Song in Suno erstellen | Custom-Lyrics-Mode, Style: Corporate Anthem / Power Ballad |
| MP3 ablegen | `assets/audio/challenge2.mp3` |
| Solution anpassen | `ESCAPE_ROOM_CONFIG.challenges[1].solution` |
