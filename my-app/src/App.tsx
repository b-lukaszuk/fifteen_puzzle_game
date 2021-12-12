import React, { useState } from 'react';

import Board from './board/Board';
import GameBoard from './conteners/GameBoard';

import './App.css';

const App: React.FC = () => {

    const [gameBoard, setGameBoard] = useState(new Board());

    const moveNumber = (numToMove: number): void => {
        gameBoard.makeMove(numToMove);
        setGameBoard(new Board(gameBoard.getBoard()));
    }

    return (
        <div className="App">
            <p>React App</p>
            <GameBoard gameBoard={gameBoard.getBoard()}
                fieldOnClick={moveNumber} />
        </div>
    );
}

export default App;
