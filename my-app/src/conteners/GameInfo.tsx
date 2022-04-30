import React from 'react';

import './GameInfo.css';

interface Props {
    gameStatus: string;
}

const GameInfo: React.FC<Props> = (props) => {
    const gameStatusIn: string = props.gameStatus;
    return (
        <div className="gameInfo">
            <span>
                <b>Fifteen Puzzle Game:</b> &nbsp;
                <a href="https://en.wikipedia.org/wiki/15_puzzle">
                    About the Game
                </a>
                <br />
                <b>Hint: </b> &nbsp;
                <a href="https://www.youtube.com/results?search_query=how+to+solve+fifteen+puzzle">
                    How to solve a 15 slide puzzle
                </a>
            </span>
            <br />
            <b>Instructions: </b>
            <br />
            <span>Click on a field near the empty field to shift it to that spot</span>
            <br />
            <span>Order all numbers from 1 to 15 (left to right, top to bottom)</span>
            <br /> <br />
            <span><b>Game status:</b> {gameStatusIn}</span>
            <br />
        </div >
    );
}

export default GameInfo;
