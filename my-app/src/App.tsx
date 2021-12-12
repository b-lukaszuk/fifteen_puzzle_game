import React, { useState } from 'react';

import Board from './board/Board';
import GameBoard from './conteners/GameBoard';
import GameInfo from './conteners/GameInfo'

import './App.css';

const App: React.FC = () => {

    const [gameBoard, setGameBoard] = useState(new Board());
    const [gameStatus, setGameStatus] = useState("In progress");

    const moveNumber = (numToMove: number): void => {
        gameBoard.makeMove(numToMove);
        setGameBoard(new Board(gameBoard.getBoard()));
        if (gameBoard.isSolved()) {
            setGameStatus("Game Over");
        } else {
            setGameStatus("In progress");
        }
    }

    return (
        <div className="App">
            <GameInfo gameStatus={gameStatus} />
            <GameBoard gameBoard={gameBoard.getBoard()}
                fieldOnClick={moveNumber} />
        </div>
    );
}

export default App;
