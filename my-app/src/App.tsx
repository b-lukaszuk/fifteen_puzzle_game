import React, { useState } from 'react';

import Board from './board/Board';
import GameBoard from './conteners/GameBoard';
import GameInfo from './conteners/GameInfo'

import './App.css';

const App: React.FC = () => {

    const [gameBoard, setGameBoard] = useState(new Board());
    const getGameStatus = (): string => {
        if (gameBoard.isSolved()) {
            return "Game Over";
        } else {
            return "In progress";
        }
    }
    const [gameStatus, setGameStatus] = useState(getGameStatus());

    const moveNumber = (numToMove: number): void => {
        gameBoard.makeMove(numToMove);
        setGameBoard(new Board(gameBoard.getBoard()));
        setGameStatus(getGameStatus);
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
