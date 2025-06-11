let gameMode = "normal";
let gameStarted = false;
let initialScore = 501;
let players = [];
let currentPlayerIndex = 0;
let multiplier = 1;
let throwsCurrentRound = 3;
let isDouble = false;
let history = [];
let startPlayerIndex = 0;

//Show possible checkout
const checkoutTable = {
  170: ["T20", "T20", "Bull"],
  167: ["T20", "T19", "Bull"],
  164: ["T20", "T18", "Bull"],
  161: ["T20", "T17", "Bull"],
  160: ["T20", "T20", "D20"],
  158: ["T20", "T20", "D19"],
  157: ["T20", "T19", "D20"],
  156: ["T20", "T20", "D18"],
  155: ["T20", "T19", "D19"],
  154: ["T20", "T18", "D20"],
  153: ["T20", "T19", "D18"],
  152: ["T20", "T20", "D16"],
  151: ["T20", "T17", "D20"],
  150: ["T20", "T18", "D18"],
  149: ["T20", "T19", "D16"],
  148: ["T20", "T16", "D20"],
  147: ["T20", "T17", "D18"],
  146: ["T20", "T18", "D16"],
  145: ["T20", "T15", "D20"],
  144: ["T20", "T20", "D12"],
  143: ["T20", "T17", "D16"],
  142: ["T20", "T14", "D20"],
  141: ["T20", "T15", "D18"],
  140: ["T20", "T20", "D10"],
  139: ["T19", "T14", "D20"],
  138: ["T20", "T18", "D12"],
  137: ["T19", "T16", "D20"],
  136: ["T20", "T20", "D8"],
  135: ["T20", "T17", "D12"],
  134: ["T20", "T14", "D16"],
  133: ["T20", "T19", "D8"],
  132: ["T20", "T16", "D12"],
  131: ["T20", "T13", "D16"],
  130: ["T20", "T18", "D8"],
  129: ["T19", "T16", "D12"],
  128: ["T18", "T14", "D16"],
  127: ["T20", "T17", "D8"],
  126: ["T19", "T19", "D6"],
  125: ["25", "T20", "D20"],
  124: ["T20", "T16", "D8"],
  123: ["T19", "T16", "D9"],
  122: ["T18", "T20", "D4"],
  121: ["T20", "T11", "D14"],
  120: ["T20", "20", "D20"],
  119: ["T19", "T10", "D16"],
  118: ["T20", "18", "D20"],
  117: ["T20", "17", "D20"],
  116: ["T20", "16", "D20"],
  115: ["T20", "15", "D20"],
  114: ["T20", "14", "D20"],
  113: ["T20", "13", "D20"],
  112: ["T20", "12", "D20"],
  111: ["T20", "11", "D20"],
  110: ["T20", "10", "D20"],
  109: ["T20", "9", "D20"],
  108: ["T20", "8", "D20"],
  107: ["T19", "10", "D20"],
  106: ["T20", "6", "D20"],
  105: ["T19", "8", "D20"],
  104: ["T18", "18", "D16"],
  103: ["T17", "12", "D20"],
  102: ["T20", "10", "D16"],
  101: ["T17", "10", "D20"],
  100: ["T20", "D20"],
  99: ["T19", "10", "D16"],
  98: ["T20", "D19"],
  97: ["T19", "D20"],
  96: ["T20", "D18"],
  95: ["T19", "D19"],
  94: ["T18", "D20"],
  93: ["T19", "D18"],
  92: ["T20", "D16"],
  91: ["T17", "D20"],
  90: ["T18", "D18"],
  89: ["T19", "D16"],
  88: ["T16", "D20"],
  87: ["T17", "D18"],
  86: ["T18", "D16"],
  85: ["T15", "D20"],
  84: ["T20", "D12"],
  83: ["T17", "D16"],
  82: ["T14", "D20"],
  81: ["T15", "D18"],
  80: ["T20", "D10"],
  79: ["T19", "D11"],
  78: ["T18", "D12"],
  77: ["T19", "D10"],
  76: ["T20", "D8"],
  75: ["T17", "D12"],
  74: ["T14", "D16"],
  73: ["T19", "D8"],
  72: ["T16", "D12"],
  71: ["T13", "D16"],
  70: ["T18", "D8"],
  69: ["T19", "D6"],
  68: ["T20", "D4"],
  67: ["T17", "D8"],
  66: ["T10", "D18"],
  65: ["T19", "D4"],
  64: ["T16", "D8"],
  63: ["T13", "D12"],
  62: ["T10", "D16"],
  61: ["T15", "D8"],
  60: ["20", "D20"],
  59: ["19", "D20"],
  58: ["18", "D20"],
  57: ["17", "D20"],
  56: ["16", "D20"],
  55: ["15", "D20"],
  54: ["14", "D20"],
  53: ["13", "D20"],
  52: ["12", "D20"],
  51: ["11", "D20"],
  50: ["10", "D20"],
  49: ["9", "D20"],
  48: ["16", "D16"],
  47: ["15", "D16"],
  46: ["14", "D16"],
  45: ["13", "D16"],
  44: ["12", "D16"],
  43: ["11", "D16"],
  42: ["10", "D16"],
  41: ["9", "D16"],
  40: ["D20"],
  39: ["7", "D16"],
  38: ["D19"],
  37: ["5", "D16"],
  36: ["D18"],
  35: ["3", "D16"],
  34: ["D17"],
  33: ["1", "D16"],
  32: ["D16"],
  31: ["15", "D8"],
  30: ["D15"],
  29: ["13", "D8"],
  28: ["D14"],
  27: ["11", "D8"],
  26: ["D13"],
  25: ["9", "D8"],
  24: ["D12"],
  23: ["7", "D8"],
  22: ["D11"],
  21: ["5", "D8"],
  20: ["D10"],
  19: ["3", "D8"],
  18: ["D9"],
  17: ["1", "D8"],
  16: ["D8"],
  15: ["7", "D4"],
  14: ["D7"],
  13: ["5", "D4"],
  12: ["D6"],
  11: ["3", "D4"],
  10: ["D5"],
  9: ["1", "D4"],
  8: ["D4"],
  7: ["3", "D2"],
  6: ["D3"],
  5: ["1", "D2"],
  4: ["D2"],
  3: ["1", "D1"],
  2: ["D1"]

};

//DOM elements
const numberButtonsDiv = document.getElementById("number-buttons");
const log = document.getElementById("log");
const changeBtn501 = document.getElementById("changeBtn-501");
const changeBtn301 = document.getElementById("changeBtn-301");
const trainingSingles = document.getElementById("trainingSingles");
const trainingDoubles = document.getElementById("trainingDoubles");
const btnDouble = document.getElementById("btn-double");
const btnTripple = document.getElementById("btn-tripple");
const btnSb = document.getElementById("btn-sb");
const btnOut = document.getElementById("btn-out");
const btnUndo = document.getElementById("btn-undo");
const playerListDiv = document.getElementById("player-list");
const newPlayerNameInput = document.getElementById("new-player-name");


for (let i = 1; i <= 20; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "btn btn-secondary btn-dart";
  btn.addEventListener("click", () => handleScore(i));
  numberButtonsDiv.appendChild(btn);
}

//Event-Listener
newPlayerNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const newName = newPlayerNameInput.value.trim();
    if (!newName) return;

    fetch("/api/addPlayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && !players.find(p => p.name === newName)) {
          players.push({
    name: newName,
    score: initialScore,
    roundStart: initialScore,
    dartsThrown: 0,
    scoreHistory: [] 
  });
          updatePlayerList();
        }
        newPlayerNameInput.value = "";
      });
  }
});

btnDouble.addEventListener("click", () => {
  if (multiplier === 2 && isDouble) {
    // Bereits aktiviert –> zurücksetzen
    multiplier = 1;
    isDouble = false;
    btnDouble.className = "btn btn-secondary btn-dart-control";
  } else {
    multiplier = 2;
    isDouble = true;
    btnDouble.className = "btn btn-secondary btn-dart-control-clicked";
    btnTripple.className = "btn btn-secondary btn-dart-control";
    btnSb.textContent = "DB";
  }
});
btnTripple.addEventListener("click", () => {
  if (multiplier === 3 && !isDouble) {
    // Bereits aktiviert –> zurücksetzen
    multiplier = 1;
    isDouble = false;
    btnTripple.className = "btn btn-secondary btn-dart-control";
  } else {
    multiplier = 3;
    isDouble = false;
    btnTripple.className = "btn btn-secondary btn-dart-control-clicked";
    btnDouble.className = "btn btn-secondary btn-dart-control";
    btnSb.textContent = "SB";
  }
});
btnSb.addEventListener("click", () => handleScore(25));
btnOut.addEventListener("click", () => handleScore(0));
btnUndo.addEventListener("click", undoLastThrow);

changeBtn501.addEventListener("click", () => {
  initialScore = 501;
  // Leave Traing Mode:
  players = [];
  currentPlayerIndex = 0;
  gameMode = "normal";
  gameStarted = false;
  throwsCurrentRound = 3;
  updatePlayerList();
  newPlayerNameInput.style.display = "block";
  updateLog("");
});
changeBtn301.addEventListener("click", () => {
  initialScore = 301;
  players = [];
  currentPlayerIndex = 0;
  gameMode = "normal";
  gameStarted = false;
  throwsCurrentRound = 3;
  updatePlayerList();
  newPlayerNameInput.style.display = "block";
  updateLog("");
});
trainingSingles.addEventListener("click", () => startTraining("singles"));
trainingDoubles.addEventListener("click", () => startTraining("doubles"));

document.getElementById("open-stats-game").addEventListener("click", e => {
  e.preventDefault();
  window.open("/stats_game.html", "_blank");
});
document.getElementById("open-stats-singles").addEventListener("click", e => {
  e.preventDefault();
  window.open("/stats_singles.html", "_blank");
});
document.getElementById("open-stats-doubles").addEventListener("click", e => {
  e.preventDefault();
  window.open("/stats_doubles.html", "_blank");
});

window.addEventListener('storage', (event) => {
  if (event.key === 'selectedTheme') {
    location.reload(); 
  }
});

//Functions

// Updates the visual player list with name, score, and current or last round throws
function updatePlayerList() {
  playerListDiv.innerHTML = "";
  players.forEach((player, index) => {
    let throwsDisplay;
    if (index === currentPlayerIndex) {
      const throws = player.currentRoundThrows || [];
      throwsDisplay = [0, 1, 2].map(i => throws[i] !== undefined ? throws[i] : "-").join(" ");
    } else {
      const throws = player.lastRoundThrows || [];
      throwsDisplay = [0, 1, 2].map(i => throws[i] !== undefined ? throws[i] : "-").join(" ");
    }

    let playerText = `${player.name} - ${player.score} | ${throwsDisplay}`;

    if (gameMode === "normal") {   
      let avgDisplay = "-";
      const total = player.scoreHistory?.reduce((sum, p) => sum + p, 0) || 0;
      const darts = player.scoreHistory?.length || 0;

      if (darts >= 3) {
        const avg = (total / darts) * 3;
        avgDisplay = avg.toFixed(2);
      }

      playerText += ` | Ø ${avgDisplay}`;
    }

    const playerDiv = document.createElement("div");
    playerDiv.textContent = playerText;
    if (index === currentPlayerIndex) {
      playerDiv.style.fontWeight = "bold";
    }
    playerListDiv.appendChild(playerDiv);
  });
}

// Handles a score input during gameplay or training mode
function handleScore(value) {
  if (players.length < 1) return;
  if (!gameStarted) {
    gameStarted = true;
    newPlayerNameInput.style.display = "none";
  }

  saveHistorySnapshot();

  const actualScore = value * multiplier;
  const doubleFlagThisThrow = isDouble;
  isDouble = false;
  multiplier = 1;
  btnDouble.className = "btn btn-secondary btn-dart-control";
  btnTripple.className = "btn btn-secondary btn-dart-control";
  btnSb.textContent = "SB";

  const currentPlayer = players[currentPlayerIndex];

- currentPlayer.scoreHistory.push(actualScore);  

  if (gameMode === "normal") {
+   currentPlayer.scoreHistory.push(actualScore);  
    currentPlayer.dartsThrown++;

    if (!currentPlayer.currentRoundThrows) currentPlayer.currentRoundThrows = [];
    currentPlayer.currentRoundThrows.push(actualScore);

    const newScore = currentPlayer.score - actualScore;
    if (newScore < 2 && newScore !== 0) {
      currentPlayer.score = currentPlayer.roundStart;
      currentPlayer.lastRoundThrows = [...(currentPlayer.currentRoundThrows || [])];
      currentPlayer.currentRoundThrows = [];
      nextPlayer();
      return;
    }

    currentPlayer.score = newScore;
    updateCheckoutLog(currentPlayer);

    if (newScore === 0 && doubleFlagThisThrow) {
      currentPlayer.lastRoundThrows = [...(currentPlayer.currentRoundThrows || [])];
      currentPlayer.currentRoundThrows = [];
      saveGame(currentPlayer);
      alert(`${currentPlayer.name} wins!`);
      resetScores();
      return;
    }

    if (newScore === 0 && !doubleFlagThisThrow) {
      alert("Check out with double!");
      currentPlayer.score = currentPlayer.roundStart;
      currentPlayer.lastRoundThrows = [...(currentPlayer.currentRoundThrows || [])];
      currentPlayer.currentRoundThrows = [];
      nextPlayer();
      return;
    }

    throwsCurrentRound--;
    if (throwsCurrentRound === 0) {
      currentPlayer.lastRoundThrows = [...(currentPlayer.currentRoundThrows || [])];
      currentPlayer.currentRoundThrows = [];
      nextPlayer();
      return;
    }

    updatePlayerList();
  } else {
+   handleTrainingScore(currentPlayer, actualScore);  
  }
};

// Moves to the next player and resets the round state
function nextPlayer() {
  players[currentPlayerIndex].roundStart = players[currentPlayerIndex].score;
  players[currentPlayerIndex].currentRoundThrows = [];
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  throwsCurrentRound = 3;
  updatePlayerList();
  updateCheckoutLog(players[currentPlayerIndex]);
};

// Resets all players' scores and state to the initial setup
function resetScores() {
  players.forEach(p => {
    p.score = initialScore;
    p.roundStart = initialScore;
    p.dartsThrown = 0;
    p.currentRoundThrows = [];
    p.lastRoundThrows = [];
    p.scoreHistory = []; // 👈 Score-Verlauf zurücksetzen
  });
  startPlayerIndex = (startPlayerIndex + 1) % players.length;
  currentPlayerIndex = startPlayerIndex;
  gameStarted = false;
  throwsCurrentRound = 3;
  updatePlayerList();
};

// Saves game data and updates stats for all players
function saveGame(winner) {
  players.forEach(player => {
    const isWinner = player.name === winner.name;

    fetch("/api/saveGame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerName: player.name,
        scoreStart: initialScore,
        scoreEnd: isWinner ? 0 : player.score,
        dartsThrown: player.dartsThrown
      })
    });
    fetch("/api/updateStats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerName: player.name,
        dartsThrown: player.dartsThrown,
        checkout: isWinner ? player.roundStart : 0,
        isWin: isWinner,
        scoreStart: initialScore
      })
    });
  });
};

// Starts a training session (singles or doubles)
function startTraining(mode) {
  newPlayerNameInput.style.display = "none";
 players = [{ name: "Training", score: 0, roundStart: 0, dartsThrown: 0 }];
players = [{
   name: "Training",
   score: 0,
   roundStart: 0,
   dartsThrown: 0,
  scoreHistory: [],
   currentRoundThrows: [],
   lastRoundThrows: [],
 }];

  currentPlayerIndex = 0;
  gameMode = mode === "singles" ? "trainingSingles" : "trainingDoubles";
  players[0].nextTarget = 1;
  players[0].attempts = {};
  players[0].currentAttempts = 0;
  updatePlayerList();
  updateLog(`${mode} Training gestartet.`);
};

// Handles a throw during training and progresses to the next target if hit
function handleTrainingScore(player, score) {
  const expected = gameMode === "trainingDoubles" ? player.nextTarget * 2 : player.nextTarget;
  player.currentAttempts++;
  if (score === expected) {
    player.attempts[player.nextTarget] = player.currentAttempts;
    player.nextTarget++;
    player.currentAttempts = 0;
    if (player.nextTarget > 20) {
    saveTraining(player);
    alert("Training finished");
    // Reset für neues Training
    startTraining(gameMode === "trainingDoubles" ? "doubles" : "singles");
    return;
  }
  }
  updateLog(`Target ${player.nextTarget}, Versuch ${player.currentAttempts}`);
};

// Saves training data (attempts and average) to the backend
function saveTraining(player) {
  const endpoint = gameMode === "trainingSingles" ? "/api/training/singles" : "/api/training/doubles";
  let attempts = {};
    for (let i = 1; i <= 20; i++) {
    attempts[`tries_target_${i}`] = player.attempts[i] !== undefined ? player.attempts[i] : null;
  }

  const attemptsArray = Object.values(attempts);
  const sumTries = attemptsArray.reduce((sum, n) => sum + (n !== null ? n : 0), 0); 
  const averageTries = attemptsArray.filter(n => n !== null).length ? (sumTries / attemptsArray.filter(n => n !== null).length) : null;

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attempts: attempts,
      averageTries: averageTries
    })
  });
};

// Undoes the last dart throw and restores the previous game state
function undoLastThrow() {
  if (history.length === 0) return;
  const last = history.pop();
  currentPlayerIndex = last.playerIndex;
  throwsCurrentRound = last.throwsCurrentRound;
  players[currentPlayerIndex].score = last.score;
  players[currentPlayerIndex].dartsThrown = last.dartsThrown;
  players[currentPlayerIndex].roundStart = last.roundStart;
  players[currentPlayerIndex].currentRoundThrows = [...last.currentRoundThrows];
  players[currentPlayerIndex].lastRoundThrows = [...last.lastRoundThrows];
  players.forEach((player, idx) => {
    if (idx !== currentPlayerIndex) {
      player.currentRoundThrows = [];
    }
  });
  updatePlayerList();
  updateLog("Cancelled last throw.");
}

// Updates the log with possible checkout options based on the current score
function updateCheckoutLog(player) {
  if (checkoutTable[Number(player.score)]) {
    updateLog(`Finish with: ${checkoutTable[Number(player.score)].join(" – ")}`);
  } else {
    updateLog("No checkout possible yet.");
  }
};

// Saves the current state to allow undoing later
function saveHistorySnapshot() {
  history.push({
    playerIndex: currentPlayerIndex,
    score: players[currentPlayerIndex].score,
    dartsThrown: players[currentPlayerIndex].dartsThrown,
    roundStart: players[currentPlayerIndex].roundStart,
    throwsCurrentRound: throwsCurrentRound,
    currentRoundThrows: [...(players[currentPlayerIndex].currentRoundThrows || [])],
    lastRoundThrows: [...(players[currentPlayerIndex].lastRoundThrows || [])],
  });
};

// Creates an HTML table from given stats data and supports sorting
function createTable(rows) {
  if (!rows || rows.length === 0) return "<p>No data.</p>";
  const keys = ["player_name", ...Object.keys(rows[0]).filter(k => k !== "id" && k !== "player_id" && k !== "player_name")];
  let html = "<table class='table table-dark'><thead><tr>";
  keys.forEach(key => {
    html += `<th style="cursor:pointer" onclick="sortStats('${key}')">${key} ${currentSort.key === key ? (currentSort.dir === 1 ? "▲" : "▼") : ""
      }</th>`;
  });
  html += "</tr></thead><tbody>";
  let displayRows = [...rows];
  if (currentSort.key) {
    displayRows.sort((a, b) => {
      let va = a[currentSort.key], vb = b[currentSort.key];
      if (!isNaN(va) && !isNaN(vb)) {
        va = Number(va); vb = Number(vb);
        return (va - vb) * currentSort.dir;
      }
      return (va + "").localeCompare(vb + "") * currentSort.dir;
    });
  }
  displayRows.forEach(row => {
    html += "<tr>";
    keys.forEach(key => {
      html += `<td>${row[key]}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";
  return html;
};

// Updates the log display with a message
function updateLog(msg) {
  log.innerHTML = msg;
};

// Sorts stats table by a given column and re-renders the table
function sortStats(key) {
  if (currentSort.key === key) {
    currentSort.dir *= -1;
  } else {
    currentSort.key = key;
    currentSort.dir = 1;
  }
  fetch("/api/gameStats")
    .then(res => res.json())
    .then(data => {
      statsTableDiv.innerHTML = createTable(data.rows);
    });
};


