let currentPlayer = 1;
let gameOver = false;

// Das ist das Spielfeld-Array und speichert die gesetzten Steine. 0 ist ein leeres Feld.
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

// Das sind Konstanten und speichern die Spielfeldgröße.
const ROWS = 6;
const COLS = 7;

// Das ist die cells-Liste und speichert alle HTML-Kreise.
const cells = document.querySelectorAll('.cell');

// Das ist eine Schleife und fügt jedem Kreis ein Klick-Event hinzu.
cells.forEach((cell, index) => {
    
    cell.addEventListener('click', () => {
        
        // Das ist die Spaltenberechnung und findet die geklickte Spalte.
        let clickedCol = index % COLS;
        
        // Das ist der Funktionsaufruf und startet den Spielzug.
        handleCellClick(clickedCol);
    });
});

// Das ist die Spiellogik-Funktion und führt den Zug aus.
function handleCellClick(col) {
    if (gameOver) return; // Bricht ab, wenn das Spiel vorbei ist.
    
    console.log("Es wurde auf Spalte " + col + " geklickt!");
    
    // Das ist die Gravitations-Schleife und findet die unterste freie Reihe.
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer; // Setzt den Stein im Array.
            
            // Das ist der Zellen-Index und findet den richtigen HTML-Kreis.
            let exactCellIndex = (row * 7) + col; 
            
            // Das ist die Farb-Logik und färbt den HTML-Kreis ein.
            if (currentPlayer === 1) {
                cells[exactCellIndex].classList.add('red');
            } else {
                cells[exactCellIndex].classList.add('yellow');
            }
            
            // Das ist der Gewinn-Check und prüft, ob jemand gewonnen hat.
            if (checkWin(row, col)) {
                gameOver = true; // Setzt den Status auf "Spiel vorbei".
                
                // Das ist die Gewinner-Ermittlung und findet den Namen.
                let winnerName = (currentPlayer === 1) ? document.getElementById('name1-display').textContent : document.getElementById('name2-display').textContent;
                
                setTimeout(() => alert("🎉 Herzlichen Glückwunsch " + winnerName + ", du hast gewonnen!"), 10);
                
                // Macht beide Spieleranzeigen voll sichtbar.
                spieler1Anzeige.style.opacity = '1';
                spieler2Anzeige.style.opacity = '1';
                break; 
            }
            
            // Das ist der Spieler-Wechsel und ändert, wer dran ist.
            currentPlayer = (currentPlayer === 1) ? 2 : 1; 
            updatePlayerTurnUI();
            
            break; // Beendet die Schleife nach dem Setzen.
        }
    }
}

// Das sind UI-Verknüpfungen und speichern die HTML-Spieleranzeigen.
const spieler1Anzeige = document.querySelector('.spieler1');
const spieler2Anzeige = document.querySelector('.spieler2');

updatePlayerTurnUI();

// Das ist die UI-Funktion und aktualisiert die Anzeige für den aktuellen Spieler.
function updatePlayerTurnUI() {
    if (gameOver) return;
    
    if (currentPlayer === 1) {
        spieler1Anzeige.style.opacity = '1';    
        spieler2Anzeige.style.opacity = '0.3';  
    } else {
        spieler1Anzeige.style.opacity = '0.3';
        spieler2Anzeige.style.opacity = '1';
    }
}

// Das ist die Gewinn-Prüffunktion und sucht nach 4 Steinen in einer Reihe.
function checkWin(r, c) {
    // Das ist die Hilfsfunktion und zählt Steine in eine bestimmte Richtung.
    function countDirection(rowDelta, colDelta) {
        let count = 0;
        let rTemp = r + rowDelta;
        let cTemp = c + colDelta;
        
        // Zählt solange weiter, wie das Feld dem gleichen Spieler gehört.
        while (rTemp >= 0 && rTemp < ROWS && cTemp >= 0 && cTemp < COLS && board[rTemp][cTemp] === currentPlayer) {
            count++;
            rTemp += rowDelta;
            cTemp += colDelta;
        }
        return count;
    }

    // Das sind die Richtungs-Checks und prüfen horizontal, vertikal und diagonal.
    let horizontal = 1 + countDirection(0, -1) + countDirection(0, 1);     
    let vertical   = 1 + countDirection(1, 0);                             
    let diag1      = 1 + countDirection(-1, -1) + countDirection(1, 1);    
    let diag2      = 1 + countDirection(1, -1) + countDirection(-1, 1);    
    
    // Prüft, ob einer der Zähler 4 oder höher ist.
    if (horizontal >= 4 || vertical >= 4 || diag1 >= 4 || diag2 >= 4) {
        return true; 
    }
    return false;
}

// Das sind die Start/Reset-Verknüpfungen und holen HTML-Elemente für das Menü.
const modal = document.getElementById('start-modal');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const inputP1 = document.getElementById('player1-name');
const inputP2 = document.getElementById('player2-name');
const name1Display = document.getElementById('name1-display');
const name2Display = document.getElementById('name2-display');

// Öffnet das Modal beim Seitenstart.
window.addEventListener('DOMContentLoaded', () => {
    modal.showModal();
});

// Startet das Spiel und übernimmt die Namen bei Klick.
startBtn.addEventListener('click', () => {
    if (inputP1.value.trim() !== '') {
        name1Display.textContent = inputP1.value.trim();
    }
    if (inputP2.value.trim() !== '') {
        name2Display.textContent = inputP2.value.trim();
    }
    modal.close();
});

// Setzt das Spiel zurück bei Klick.
resetBtn.addEventListener('click', () => {
    // Leert das Spielfeld-Array.
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            board[r][c] = 0;
        }
    }
    
    // Setzt den Spielstatus zurück.
    currentPlayer = 1;
    gameOver = false;
    
    // Entfernt die Farben von allen HTML-Kreisen.
    cells.forEach(cell => {
        cell.classList.remove('red', 'yellow');
    });
    
    // Aktualisiert die Anzeige.
    updatePlayerTurnUI();
});
