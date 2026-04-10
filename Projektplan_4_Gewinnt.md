# Projektplan: 4-Gewinnt (Labor 1)
**Abgabe:** 23.04.2026
**Zweck:** Leitfaden für die eigenständige Entwicklung des Spiels mit Unterstützung (HTML5, CSS3, Vanilla JS).

---

## Phase 1: Projekt-Setup & HTML-Struktur (Tag 1-2)
*Ziel: Die Grundbausteine legen.*
- [ ] Lege einen neuen Projektordner an.
- [ ] Erstelle die drei Hauptdateien: `index.html`, `style.css` und `script.js`.
- [ ] Baue das grundlegende HTML-Gerüst (`<!DOCTYPE html>`).
- [ ] **Header anlegen:** Binde das Logo der Hochschule Esslingen ein und füge deinen Namen, Studiengang und das zugehörige Kürzel hinzu.
- [ ] **Spielfeld-Bereich anlegen:** Erstelle einen Container (z. B. `<main>`), in dem Später das 7x6-Gitter (Das Spielfeld) sowie die Namen der Spieler und der aktuelle Status (wer ist am Zug?) angezeigt werden.

## Phase 2: Styling mit CSS (Tag 3-4)
*Ziel: Das Spielfeld soll nach "4-Gewinnt" aussehen und auf verschiedenen Bildschirmgrößen gut funktionieren.*
- [ ] Binde die `style.css` in der HTML-Datei ein.
- [ ] Style den Header so, dass er professionell wirkt und sich harmonisch einfügt.
- [ ] **Das Raster:** Nutze *CSS Grid* oder *Flexbox*, um das 7x6 Spielfeld darzustellen. Mach dir Gedanken, wie ein leeres Feld, ein roter Stein und ein gelber Stein visuell dargestellt werden (z. B. CSS-Klassen wie `.cell`, `.red`, `.yellow`).
- [ ] **Responsive Design:** Stelle sicher, dass das Spielfeld auf kleinen und großen Bildschirmen gut aussieht.

## Phase 3: Spielfeld-Logik & Interaktion in JS (Tag 5-7)
*Ziel: Die Spielmechanik zum Laufen bringen.*
- [ ] Binde die `script.js` Datei ein.
- [ ] **Datenstruktur:** Erstelle ein 2D-Array (`6 Reihen x 7 Spalten`) im JavaScript-Code, das den Status jedes Feldes speichert (z. B. `0` für leer, `1` für Spieler 1, `2` für Spieler 2).
- [ ] **DOM-Manipulation:** Schreibe eine Funktion, die basierend auf dem JS-Array das HTML-Spielfeld aufbaut/aktualisiert.
- [ ] Füge den Spalten Klick-Events (Event-Listener) hinzu.
- [ ] **Die Gravitation:** Schreibe die Funktion, die berechnet, wo der Stein landet (die *unterste* freie Zeile in der geklickten Spalte).
- [ ] **Spielerwechsel:** Wechsle nach jedem gültigen Zug den aktiven Spieler und zeige das im HTML an.

## Phase 4: Gewinnermittlung & Spielende (Tag 8-9)
*Ziel: Das Spiel muss erkennen, wenn jemand gewinnt oder das Spiel unentschieden ausgeht.*
- [ ] Schreibe eine Funktion `checkWin()`, die nach jedem gesetzten Stein aufgerufen wird.
- [ ] Prüfe horizontal (4 Steine in einer Reihe).
- [ ] Prüfe vertikal (4 Steine in einer Spalte).
- [ ] Prüfe diagonal (sowohl nach oben rechts als auch nach unten rechts).
- [ ] Erkennung eines **Unentschiedens**: Prüfe, ob das Array komplett voll ist, ohne dass jemand gewonnen hat.
- [ ] Stoppe weitere Klicks/Eingaben, wenn das Spiel vorbei ist, und zeige den Sieger deutlich an.

## Phase 5: Feinschliff & Optionale Erweiterungen (Tag 10-11)
*Ziel: Die Anwendung "polieren" und Extra-Punkte holen.*
- [ ] **Animationen:** Lass die Steine mit CSS-Transitions weich von oben nach unten "fallen".
- [ ] **Reset-Button:** Füge eine Möglichkeit hinzu, das Spielfeld zurückzusetzen und von vorn zu beginnen.
- [ ] *Optional:* Erlaube es Spielern, vor Spielbeginn Namen oder Farben auszuwählen.
- [ ] *Optional:* Implementiere eine rudimentäre KI als Gegner (falls du die Zeit hast).

## Phase 6: Code-Review, KI-Statement & Abgabe (Tag 12-13)
*Ziel: Fertigstellung zur Abgabe über Moodle.*
- [ ] Entferne Fehler (bspw. Fehlerhafte Klicks bei voller Spalte behandeln).
- [ ] Code aufräumen: Sind die Dateien (HTML/CSS/JS) sauber getrennt und kommentiert?
- [ ] Beantworte die **Reflexionsfragen** (Spiellogik-Strukturierung, Designentscheidungen, Herausforderungen etc.) in einer Textdatei oder direkt formatiert.
- [ ] Verfasse das **KI-Statement** (Wie hast du KIs wie mich in dem Prozess genutzt?).
- [ ] Erstelle das **ZIP-Archiv** (Wichtig: keine unnötigen Dateien wie `.git` einpacken) und prüfe nochmal lokal im Browser, ob aus dem Archiv heraus das Spiel startet.

---

**Wie wir zusammenarbeiten:**
Du sagst mir einfach immer, an welcher Phase oder bei welchem Punkt du gerade bist, versuchst es umzusetzen, und wenn du eine Erklärung, einen Code-Schnipsel (z.B. für CSS Grid oder den Gewinn-Check) brauchst oder einen Bug hast, zeigst du mir deinen aktuellen Code und ich erkläre dir den Lösungsweg.
