import React, { useState } from 'react';

import Board from './board/Board';
import Button from './components/Button';
import GameBoard from './conteners/GameBoard';
import GameInfo from './conteners/GameInfo'
import { scramble, reshape, isSolvable, pyRange } from './utils/arr2d';

import './App.css';

const App: React.FC = () => {

    const [gameBoard, setGameBoard] = useState(
        new Board(reshape(pyRange(1, 17, 1), 4, 4)));
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
        setGameBoard(new Board(gameBoard.get2dArrOfNums()));
        setGameStatus(getGameStatus());
    }

    const newGame = (): void => {
        let arr1d: number[] = [];
        let arr2d: number[][] = [];
        let puzzleSolvable: boolean = false;
        do {
            arr1d = pyRange(1, 17, 1);
            arr1d = scramble(arr1d, 15);
            arr2d = reshape(arr1d, 4, 4);
            puzzleSolvable = isSolvable(arr2d);
            console.log("is game solvable:", puzzleSolvable);
        } while (!puzzleSolvable)
        setGameBoard(new Board(arr2d));
        setGameStatus("In progress");
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
