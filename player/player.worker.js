import { moveFinder, endChecker, scorer } from './index';
import MiniMax from '../models/MiniMax';

const minimax = new MiniMax({
    moveFinder,
    endChecker,
    scorer,
});

onmessage = (e) => {
    const bestMove = minimax.play(e.data);
    postMessage(bestMove);
}
