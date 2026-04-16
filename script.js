let currentPlayer = 1;
let gameOver = false;

// 1. Das logische Spielfeld (2D-Array)
// 6 Reihen (Zeilen), jede Reihe hat 7 Spalten. '0' bedeutet das Feld ist leer.
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

// Es ist guter Code-Stil, Zeilen und Spalten als Konstanten zu speichern
const ROWS = 6;
const COLS = 7;

// 2. DOM-Verknüpfungen (Die Elemente aus dem HTML)
// cells ist eine NodeList (fast wie ein Array) mit allen 42 runden DIVs
const cells = document.querySelectorAll('.cell');
// Wir gehen jede einzelne Zelle (cell) durch und merken uns auch ihren Index (0 bis 41)
cells.forEach((cell, index) => {
    
    // Füge einen "Klick-Lauscher" an die Zelle an
    cell.addEventListener('click', () => {
        
        // Berechne die Spalte (0 bis 6) durch die Modulo-Rechnung (% COLS)
        let clickedCol = index % COLS;
        
        // Wir übergeben die geklickte Spalte an unsere Logik-Funktion
        handleCellClick(clickedCol);
    });
});

// Diese Funktion kümmert sich um die Spiellogik NACH einem Klick
function handleCellClick(col) {
    if (gameOver) return; // Wenn das Spiel zu Ende ist, blockiere weitere Klicks
    
    console.log("Es wurde auf Spalte " + col + " geklickt!");
    
    // Gravitation (korrigiert):
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer; // Stein wird im Array platziert
            
            // 1. Zelle im HTML anhand der Zeile und Spalte genau identifizieren
            let exactCellIndex = (row * 7) + col; 
            
            // 2. Farbe der HTML Zelle updaten
            if (currentPlayer === 1) {
                cells[exactCellIndex].classList.add('red');
            } else {
                cells[exactCellIndex].classList.add('yellow');
            }
            
            // 3. Prüfen, ob dieser Zug ein Sieg war!
            if (checkWin(row, col)) {
                gameOver = true; // Spiel sofort einfrieren
                
                // Gewinnername ermitteln
                let winnerName = (currentPlayer === 1) ? document.getElementById('name1-display').textContent : document.getElementById('name2-display').textContent;
                
                setTimeout(() => alert("🎉 Herzlichen Glückwunsch " + winnerName + ", du hast gewonnen!"), 10);
                
                // Alle UI Anzeigen voll sichtbar machen für die Feier
                spieler1Anzeige.style.opacity = '1';
                spieler2Anzeige.style.opacity = '1';
                break; 
            }
            
            // 4. Wenn niemand gewonnen hat, Spieler wechseln und Anzeige updaten
            currentPlayer = (currentPlayer === 1) ? 2 : 1; 
            updatePlayerTurnUI();
            
            // 5. Stein gefunden und gesetzt -> for-Schleife beenden
            break; 
        }
    }
}
// DOM-Verknüpfungen für die Spieleranzeigen
const spieler1Anzeige = document.querySelector('.spieler1');
const spieler2Anzeige = document.querySelector('.spieler2');

// Starte das UI sauber (Spieler 2 wird am Anfang abgedunkelt)
updatePlayerTurnUI();

// Funktion: Ändert das Aussehen (Deckkraft/Opacity), je nachdem, wer dran ist
function updatePlayerTurnUI() {
    if (gameOver) return;
    
    if (currentPlayer === 1) {
        spieler1Anzeige.style.opacity = '1';    // 100% sichtbar
        spieler2Anzeige.style.opacity = '0.3';  // 30% sichtbar (verblasst)
    } else {
        spieler1Anzeige.style.opacity = '0.3';
        spieler2Anzeige.style.opacity = '1';
    }
}

// Phase 4: GEWINNERMITTLUNG (Prüft nach jedem Klick auf "4 am Stück")
function checkWin(r, c) {
    // Unser kleiner Helfer: Geht Schritt für Schritt in EINE Richtung und zählt Steine der gleichen Farbe
    function countDirection(rowDelta, colDelta) {
        let count = 0;
        let rTemp = r + rowDelta;
        let cTemp = c + colDelta;
        
        // Solange das nächste Feld noch auf dem Brett liegt UND denselben Spieler gegehört: Weiterzählen!
        while (rTemp >= 0 && rTemp < ROWS && cTemp >= 0 && cTemp < COLS && board[rTemp][cTemp] === currentPlayer) {
            count++;
            rTemp += rowDelta;
            cTemp += colDelta;
        }
        return count;
    }

    // Wir prüfen alle 4 Linien, die durch den gesetzten Stein entstehen:
    // Die "+ 1" steht immer für den Stein, den wir GERADE gesetzt haben!
    let horizontal = 1 + countDirection(0, -1) + countDirection(0, 1);     // links + rechts schauen
    let vertical   = 1 + countDirection(1, 0);                             // nach unten schauen (oben ist eh leer)
    let diag1      = 1 + countDirection(-1, -1) + countDirection(1, 1);    // oben-links nach unten-rechts
    let diag2      = 1 + countDirection(1, -1) + countDirection(-1, 1);    // unten-links nach oben-rechts
    
    // Haben wir irgendwo 4 Steine?
    if (horizontal >= 4 || vertical >= 4 || diag1 >= 4 || diag2 >= 4) {
        return true; 
    }
    return false;
}

// --- Phase 5: Namenseingabe und Reset ---

const modal = document.getElementById('start-modal');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const inputP1 = document.getElementById('player1-name');
const inputP2 = document.getElementById('player2-name');
const name1Display = document.getElementById('name1-display');
const name2Display = document.getElementById('name2-display');

// Modal beim Laden der Seite öffnen
window.addEventListener('DOMContentLoaded', () => {
    modal.showModal();
});

// "Spiel Starten" geklickt
startBtn.addEventListener('click', () => {
    if (inputP1.value.trim() !== '') {
        name1Display.textContent = inputP1.value.trim();
    }
    if (inputP2.value.trim() !== '') {
        name2Display.textContent = inputP2.value.trim();
    }
    modal.close();
});

// "Neues Spiel" geklickt
resetBtn.addEventListener('click', () => {
    // 1. Daten (Arrays) nullen
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            board[r][c] = 0;
        }
    }
    
    // 2. Spielstatus resetten
    currentPlayer = 1;
    gameOver = false;
    
    // 3. HTML (Kreise) leeren
    cells.forEach(cell => {
        cell.classList.remove('red', 'yellow');
    });
    
    // 4. UI wieder sauber machen
    updatePlayerTurnUI();
});
