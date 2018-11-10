import React, { Component } from 'react';
import Square from '../components/Square';

import '../static/styles/index.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedColor: 'white',
            squares: new Array(64).fill(0)
                .map((a, i) => {
                    const oddCol = i % 2 !== 0;
                    const oddRow = Math.floor(i / 8) % 2 !== 0;
                    const darkSquare = oddRow ? !oddCol : oddCol;

                    let occupied = false;
                    let playerColor = null;
                    if (i < 24 && darkSquare) {
                        occupied = true;
                        playerColor = 'black';
                    } else if (i > 39 && darkSquare) {
                        occupied = true;
                        playerColor = 'white';
                    }

                    return ({ occupied, playerColor, darkSquare });
                }),
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        // TODO check whether it's the players go
        // TODO check whether it's a legitimate move

        // update board
        const squares = [...this.state.squares];
        squares[index] = {
            occupied: true,
            playerColor: this.state.pickedColor,
        };
        this.setState({ squares }, () => {
            // invoke web worker to calc computers move
        })
    }

    render() {
        const { squares } = this.state;
        return (
            <div className="page">
                <div className="board">
                    {squares
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
