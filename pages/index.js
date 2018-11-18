import React, { Component } from 'react';
import Square from '../components/Square';
import { moveFinder, endChecker, scorer } from '../player';
import MiniMax from '../models/MiniMax';

import '../static/styles/index.css';

// Object.defineProperty(Array.prototype, 'flat', {
//     value: function(depth = 1) {
//       return this.reduce(function (flat, toFlatten) {
//         return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
//       }, []);
//     }
// });

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedColor: 'white',
            squares: new Array(3).fill(0)
                .map((a, i) => {
                    return new Array(3).fill(0)
                        .map(() => ({
                            occupied: false,
                            playerColor: null,
                        }));
                }),
        };
        this.handleClick = this.handleClick.bind(this);

        this.minimax = new MiniMax({ endChecker, scorer, moveFinder })
    }

    handleClick(index) {
        const row = Math.floor(index / 3);
        const col = Math.floor(index % 3);

        // update board
        const squares = JSON.parse(JSON.stringify(this.state.squares));
        squares[row][col] = {
            occupied: true,
            playerColor: this.state.pickedColor,
        };

        this.setState({ squares }, () => {
            const { nextState } = this.minimax.play(squares);
            this.setState({ squares: nextState });
        })
    }

    render() {
        const { squares } = this.state;
        return (
            <div className="page">
                <div className="board">
                    {squares
                        .flat()
                        .map((props, i) => (
                            <Square
                                key={i}
                                onClick={() => this.handleClick(i)}
                                {...props}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

export default MainPage;
