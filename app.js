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
