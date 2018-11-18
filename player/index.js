function checkWin(gameState, sym) {
    let tl = 0;

    for (let i = 0; i < 3; i++) {
        let hCount = 0;
        let vCount = 0;
        for (let j = 0; j < 3; j++) {
            if (gameState[i][j].playerColor === sym) {
                hCount++;
                if (i === j) tl++;
            }
            if (gameState[j][i].playerColor === sym) vCount++;
        }
        if ([hCount, vCount].includes(3)) return true;
        hCount = 0;
        vCount = 0;
    }

    if (tl === 3) return true;

    if (
        gameState[2][0].playerColor === sym &&
        gameState[1][1].playerColor === sym &&
        gameState[0][2].playerColor === sym
    ) return true;
    return false;
}

function endChecker(gameState, log) {
    let occupied = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameState[i][j].occupied) occupied++
        }
    }
    if (
        occupied === 9 ||
        checkWin(gameState, 'white') ||
        checkWin(gameState, 'black')
    ) return true;
    return false;
}

function scorer(gameState) {
    if (checkWin(gameState, 'white')) return  -1;
    if (checkWin(gameState, 'black')) return  1;
    return  0;
}

function moveFinder(gameState, invokersTurn) {
    const sym = invokersTurn ? 'black' : 'white';
    const options = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!gameState[i][j].occupied) options.push([i, j]);
        }
    }
    const nextStates = options.map((opt, i) => {
        const newBoard = JSON.parse(JSON.stringify(gameState));
        newBoard[opt[0]][opt[1]] = {
            occupied: true,
            playerColor: sym,
        };
        return newBoard;
    });
    return nextStates;
}

export {
    moveFinder,
    scorer,
    endChecker,
};
