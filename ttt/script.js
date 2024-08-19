const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;
let isMyTurn = true; // Indicates if it's the local player's turn

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes(null)) {
        statusText.innerText = 'Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isMyTurn = !isMyTurn;
    statusText.innerText = `It's ${currentPlayer}'s turn`;
}

function cellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== null || !isGameActive || !isMyTurn) {
        return;
    }

    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    handleResultValidation();
    
    if (isGameActive) {
        sendGameUpdate(index);
    }
}

function restartGame() {
    currentPlayer = 'X';
    isGameActive = true;
    isMyTurn = true;
    board = Array(9).fill(null);
    cells.forEach(cell => cell.innerText = '');
    statusText.innerText = `It's ${currentPlayer}'s turn`;
    sendGameUpdate(-1); // Signal restart to opponent
}

cells.forEach(cell => cell.addEventListener('click', cellClick));
restartButton.addEventListener('click', restartGame);

// Initialize Facebook Instant Games SDK
FBInstant.initializeAsync().then(() => {
    FBInstant.startGameAsync().then(() => {
        // Get player and context IDs
        const playerID = FBInstant.player.getID();
        const contextID = FBInstant.context.getID();
        
        // Handle incoming moves from opponent
        FBInstant.on('updateAsync', function(data) {
            if (data && data.data) {
                handleOpponentMove(data.data.moveIndex);
            }
        });

        // The game is ready to play
    });
});

function sendGameUpdate(moveIndex) {
    FBInstant.updateAsync({
        action: 'CUSTOM',
        cta: 'Play',
        template: 'play_turn',
        data: {
            moveIndex: moveIndex,
            board: board
        },
        strategy: 'IMMEDIATE',
        notification: 'NO_PUSH',
    });
}

function handleOpponentMove(moveIndex) {
    if (moveIndex === -1) {
        // Opponent restarted the game
        restartGame();
        return;
    }

    board[moveIndex] = currentPlayer;
    cells[moveIndex].innerText = currentPlayer;

    handleResultValidation();
    
    isMyTurn = true;
}