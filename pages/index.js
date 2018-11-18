import React, { Component } from 'react';
import Square from '../components/Square';

import Worker from '../player/player.worker.js';

import '../static/styles/index.css';

if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, 'flat', {
        value: function(depth = 1) {
          return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
          }, []);
        }
    });
}

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
        this.playMove = this.playMove.bind(this);
        this.begin = this.begin.bind(this);
    }

    componentDidMount() {
        this.worker = new Worker();
        this.worker.onmessage = this.playMove;
    }

    componentWillUnmount() {
        this.worker.terminate();
    }

    begin() {
        this.worker.postMessage(this.state.squares);
    }

    reset() {
        this.worker.postMessage('stop');
        this.setState({
            squares: new Array(3).fill(0)
                .map((a, i) => {
                    return new Array(3).fill(0)
                        .map(() => ({
                            occupied: false,
                            playerColor: null,
                        }));
                }),
        });
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
            this.worker.postMessage(squares);
        })
    }

    playMove(e) {
        console.log('recieved message from worker');
        const bestMove = e.data;
        console.log(bestMove)
        this.setState({ squares: bestMove.nextState });
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
                <button onClick={this.begin}>Play</button>
                <textarea />
            </div>
        );
    }
}

export default MainPage;
