import React, { useEffect, useState } from 'react';

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
    const [moveCount, setMoveCount] = useState(0);
    const [time, setTime] = useState(300);

    const timeToTimer = (curTime: number): string => {
        let min: number = Math.floor(curTime / 60);
        let sec: number = curTime % 60;
        let minStr: string = min.toString();
        let secStr: string = sec.toString();
        if (minStr.length === 1) { minStr = "0" + minStr };
        if (secStr.length === 1) { secStr = "0" + secStr };
        return minStr + ":" + secStr;
    }

    useEffect(() => {
        if (time > 0) {
            let intervalId = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            return () => { clearInterval(intervalId) };
        }
    }, [time])

    const moveNumber = (numToMove: number): void => {
        if (gameBoard.isMoveLegal(numToMove)) {
            gameBoard.makeMove(numToMove);
            setGameBoard(new Board(gameBoard.get2dArrOfNums()));
            setGameStatus(getGameStatus());
            setMoveCount(moveCount + 1);
        }
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
        } while (!puzzleSolvable)
        setGameBoard(new Board(arr2d));
        setGameStatus("In progress");
        setMoveCount(0);
        setTime(300);
    }

    return (
        <div className="App">
            <GameInfo gameStatus={gameStatus} moveCount={moveCount} />
            <p>Timer: {timeToTimer(time)}</p>
            <Button className={"normalBut"}
                btnText={"new game"} onClick={() => { newGame() }} />
            <GameBoard gameBoard={gameBoard.getBoard()}
                fieldOnClick={moveNumber} />
        </div>
    );
}

export default App;
