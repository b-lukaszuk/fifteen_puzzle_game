import React, { useState } from 'react';

import Board from './board/Board';
import Button from './components/Button';
import Field from './board/Field';
import GameBoard from './conteners/GameBoard';
import GameInfo from './conteners/GameInfo'
import { scramble, reshape } from './utils/arr2d';

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
        setGameStatus(getGameStatus());
    }

    const newGame = (): void => {
        let tmp: Field[] = [];
        tmp = gameBoard.get1dArrOfFields(1, 16);
        tmp = scramble(tmp, 15);
        setGameBoard(new Board(reshape(tmp, 4, 4)));
        setGameStatus(getGameStatus());
    }

    return (
        <div className="App">
            <GameInfo gameStatus={gameStatus} />
            <Button className={"normalBut"}
                btnText={"new game"} onClick={() => { newGame() }} />
            <GameBoard gameBoard={gameBoard.getBoard()}
                fieldOnClick={moveNumber} />
        </div>
    );
}

export default App;
