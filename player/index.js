import { minBy } from 'lodash';

// returns object with properties including:
// squares - the state of the board after move
// goNumber - the minimum number of moves it will take to beat a minmax opponent
// TODO make a generic function that can handle binary/scored games... ?
// TODO find a nice way to make minmax a module that can handle any moveFinder, and any definition of a win
// TODO optimizations - pruning branches
function minmax(squares, goNumber) {
    const numWhite = squares
        .filter(sq => sq.occupied && sq.playerColor === 'white')
        .length;
    const numBlack = squares
        .filter(sq => sq.occupied && sq.playerColor === 'black')
        .length;

    if (!numBlack) return { blackWins: false, goNumber, squares };
    if (!numWhite) return { blackWins: true, goNumber, squares };

    const nextSquares = moveFinder(squares);

    const results = nextSquares.map(sq => minmax(sq, goNumber + 1));

    const desiredMoves = results
        .filter(({ blackWins }) => {
            return (goNumber % 2) === 0 ? blackWins : !blackWins;
        });

    // TODO handle no possible wins

    const quickest = minBy(desiredMoves, m => m.goNumber);

    return { ...quickest, squares };
}

export default minmax;
