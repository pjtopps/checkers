import { minBy } from 'lodash';

class MinMax {
    constructor(moveFinder, endChecker) {
        this.moveFinder = moveFinder;
        this.endChecker = endChecker;
    }

    play(gameState) {
        const gameOver = this.endChecker(gameState);
        if (gameOver) {
            // work out how to return here
        }

        const nextStates = this.moveFinder(gameState);

        // TODO how to get goNumber
        const results = nextSquares
            .map(sq => this.play(sq, goNumber + 1));

        // TODO make this generic
        const desiredMoves = results
            .filter(({ blackWins }) => {
                return (goNumber % 2) === 0 ? blackWins : !blackWins;
            });

        // TODO handle no desired moves

        const quickest = minBy(desiredMoves, m => m.goNumber);

        return { ...quickest, squares };
    }
}
