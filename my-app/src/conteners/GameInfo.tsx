import React from 'react';

interface Props {
    gameStatus: string;
}

const GameInfo: React.FC<Props> = (props) => {
    const gameStatusIn: string = props.gameStatus;
    return (
        <div>
            <span>
                <b>Fifteen Puzzle Game</b> &nbsp;
                <a href="https://en.wikipedia.org/wiki/15_puzzle">
                    About the Game
                </a>
            </span>
            <br />
            <span><b>Game status:</b> {gameStatusIn}</span>
        </div >
    );
}

export default GameInfo;
