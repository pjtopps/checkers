import React, { Component } from 'react';

class Square extends Component {
    render() {
        const { occupied, playerColor, onClick } = this.props;
        return (
            <div className="square" onClick={onClick}>
                {occupied &&
                    <div className={`piece ${playerColor === 'black' ? 'piece--dark' : ''}`} />}
            </div>
        );
    }
}

export default Square;
