const readline = require('readline');
const MiniMax = require('../models/MiniMax');

const board = [
    ['X',null,null],
    [null,null,null],
    [null,null,null],
];

function checkWin(gameState, sym) {
    let tl = 0;

    for (let i = 0; i < 3; i++) {
        let hCount = 0;
        let vCount = 0;
        for (let j = 0; j < 3; j++) {
            if (gameState[i][j] === sym) {
                hCount++;
                if (i === j) tl++;
            }
            if (gameState[j][i] === sym) vCount++;
        }
        if ([hCount, vCount].includes(3)) return true;
        hCount = 0;
        vCount = 0;
    }

    if (tl === 3) return true;

    if (
        gameState[2][0] === sym &&
        gameState[1][1] === sym &&
        gameState[0][2] === sym
    ) return true;
    return false;
}

function endChecker(gameState, log) {
    let occupied = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameState[i][j]) occupied++
        }
    }
    if (
        occupied === 9 ||
        checkWin(gameState, 'X') ||
        checkWin(gameState, 'O')
    ) return true;
    return false;
}

function scorer(gameState, log) {
    let ans;
    if (checkWin(gameState, 'X')) ans =  -1;
    else if (checkWin(gameState, 'O')) ans =  1;
    else ans =  0;
    if (log) {
        console.log('***************')
        console.log('score', ans);
        console.log(gameState[0])
        console.log(gameState[1])
        console.log(gameState[2])
        console.log('***************')
    }
    return ans;
}

function moveFinder(gameState, invokersTurn) {
    const sym = invokersTurn ? 'O' : 'X';
    const options = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!gameState[i][j]) options.push([i, j]);
        }
    }

    const nextStates = options.map((opt, i) => {
        const newBoard = [
            [...gameState[0]],
            [...gameState[1]],
            [...gameState[2]],
        ];
        newBoard[opt[0]][opt[1]] = sym;
        return newBoard;
    });
    return nextStates;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(board[0]);
console.log(board[1]);
console.log(board[2]);

const player = new MiniMax({
    moveFinder,
    endChecker,
    scorer,
});

player.play(board)

const next = () => rl.question('2 numbers pls\n', (ans) => {
    if (ans === 'end') return rl.close();

    const pos = ans.split(':');
    board[pos[0]][pos[1]] = 'X';

    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);

    let gameOver = endChecker(board);
    if (gameOver) {
        console.log('GAME OVER')
        console.log('X\'s score:', scorer(board));
        return rl.close();
    }

    const nextMove = player.play(board);
    board = nextMove.nextState;

    console.log('comps turn');
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);

    gameOver = endChecker(board);
    if (gameOver) {
        console.log('GAME OVER');
        console.log('X\'s score:', scorer(board));
        return rl.close();
    }

    return next();
})

next();
