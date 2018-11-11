const { minBy } = require('lodash');

class MiniMax {
    constructor(props = {}) {
        this.moveFinder = props.moveFinder;
        this.endChecker = props.endChecker;
        this.scorer = props.scorer;
        this.maxTurns = Math.min(props.maxTurns, 50);
        this.max = 50000;
        this.count = 0;
    }

    play(gameState) {
        return this.recursive(gameState, 0);
    }

    recursive(gameState, turnNo, index) {
        this.count++;
        if (this.count > this.max) return;
        const gameOver = this.endChecker(gameState);
        if (
            gameOver ||
            turnNo >= this.maxTurns
        ) {
            const score = this.scorer(gameState);

            return {
                turns: turnNo,
                nextState: gameState,
                wins: gameOver && score > 0,
                score,
                index,
            };
        }

        const invokersTurn = turnNo % 2 === 0;
        const nextStates = this.moveFinder(gameState, invokersTurn);

        // TODO pruning
        const results = nextStates
            .map((s, i) => this.recursive(s, turnNo + 1, i));

        const optimiser = invokersTurn ? 'max' : 'min';
        const bestScore = Math[optimiser](...results.map(r => r.score));

        const desiredMoves = results
            .filter(({ score }) => score === bestScore);

        const quickest = minBy(desiredMoves, m => m.turns);

        return {
            ...quickest,
            nextState: nextStates[quickest.index],
            index,
        };
    }
}

module.exports = MiniMax;
