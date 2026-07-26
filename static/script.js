let whiteSeconds;
let blackSeconds;
let current = null;
let running = false;

// Helper to update active class on clocks
function updateActiveClock() {
    const whiteBtn = document.getElementById('white');
    const blackBtn = document.getElementById('black');
    whiteBtn.classList.remove('active-white', 'active-black');
    blackBtn.classList.remove('active-white', 'active-black');
    if (running && current) {
        if (current === 'white') {
            whiteBtn.classList.add('active-white');
        } else {
            blackBtn.classList.add('active-black');
        }
    }
}

function startGame() {
    let mins = Number(document.getElementById("minutes").value);
    whiteSeconds = mins * 60;
    blackSeconds = mins * 60;

    document.getElementById("setup").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    updateDisplay();

    current = "white";
    document.getElementById("status").innerHTML = "White starts";
    document.getElementById("status").classList.remove("game-over");
    updateActiveClock(); // highlight white
}

function pressClock(player) {
    if (!running) {
        running = true;
        current = (player === "white") ? "black" : "white";
        document.getElementById("status").innerHTML = current + " turn";
        updateActiveClock();
        return;
    }

    if (player === current) {
        current = (player === "white") ? "black" : "white";
        document.getElementById("status").innerHTML = current + " turn";
        updateActiveClock();
    }
    // If wrong player, do nothing
}

setInterval(() => {
    if (!running) return;

    if (current === "white") {
        whiteSeconds--;
    } else if (current === "black") {
        blackSeconds--;
    }

    updateDisplay();

    if (whiteSeconds <= 0) {
        endGame("Black wins on time");
    }
    if (blackSeconds <= 0) {
        endGame("White wins on time");
    }
}, 1000);

function updateDisplay() {
    document.getElementById("whiteTime").innerHTML = formatTime(whiteSeconds);
    document.getElementById("blackTime").innerHTML = formatTime(blackSeconds);
}

function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return m + ":" + String(s).padStart(2, "0");
}

function endGame(message) {
    running = false;
    document.getElementById("status").innerHTML = message;
    document.getElementById("status").classList.add("game-over");
    // Remove active glow
    document.getElementById('white').classList.remove('active-white', 'active-black');
    document.getElementById('black').classList.remove('active-white', 'active-black');
}