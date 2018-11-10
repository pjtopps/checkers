import React, { Component } from 'react';

class Square extends Component {
    render() {
        const { darkSquare, occupied, playerColor } = this.props;
        return (
            <div className={`square ${darkSquare ? 'square--dark' : ''}`}>
                {occupied &&
                    <div className={`piece ${playerColor === 'black' ? 'piece--dark' : ''}`} />}
            </div>
        );
    }
}

export default Square;
