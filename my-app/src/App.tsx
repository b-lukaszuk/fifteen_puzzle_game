import React, { useEffect, useState } from 'react';

import Board from './board/Board';
import Button from './components/Button';
import GameBoard from './conteners/GameBoard';
import GameInfo from './conteners/GameInfo'
import { scramble, reshape, isSolvable, pyRange } from './utils/arr2d';

import './App.css';

const App: React.FC = () => {

    const getRandomSolvablePuzzle = (): number[][] => {
        let arr1d: number[] = [];
        let arr2d: number[][] = [];
        let puzzleSolvable: boolean = false;
        do {
            arr1d = pyRange(1, 17, 1);
            arr1d = scramble(arr1d, 15);
            arr2d = reshape(arr1d, 4, 4);
            puzzleSolvable = isSolvable(arr2d);
        } while (!puzzleSolvable)
        return arr2d;
    }

    const [gameBoard, setGameBoard] = useState(
        new Board(getRandomSolvablePuzzle()));
    const [gameOver, setGameOver] = useState(false);
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
        document.title = "Fifteen puzzle game";
    }, [])

    useEffect(() => {
        if (time > 0 && (!gameOver)) {
            let intervalId = setInterval(() => {
                setTime((prevTime) => { return prevTime - 1; });
            }, 1000);
            return () => { clearInterval(intervalId) };
        }
        if (time <= 0) {
            setGameOver(true);
        }
    }, [time, gameOver])

    const moveNumberOnPuzzle = (numToMove: number): void => {
        if (gameOver) {
            alert("Game is over. Click new game to start again.");
        } else if (gameBoard.isMoveLegal(numToMove)) {
            gameBoard.makeMove(numToMove);
            setGameBoard(new Board(gameBoard.get2dArrOfNums()));
            setGameOver(gameBoard.isSolved());
            setMoveCount((prevMoveCount) => { return prevMoveCount + 1; });
        }
    }

    const newGame = (): void => {
        setGameBoard(new Board(getRandomSolvablePuzzle()));
        setGameOver(false);
        setMoveCount(0);
        setTime(300);
    }

    return (
        <div className="App">
            <br />
            <GameInfo gameStatus={gameOver ? "Game Over" : "In Progress"} />
            <br />
            <Button className={"normalBut"}
                btnText={"new game"} onClick={() => { newGame() }} />
            <br />
            <br />
            <GameBoard time={timeToTimer(time)} moveNo={moveCount}
                gameBoard={gameBoard.getBoard()}
                fieldOnClick={moveNumberOnPuzzle}
                isSolved={gameBoard.isSolved()} />
        </div>
    );
}

export default App;
