import React from 'react';

import Field from '../board/Field';
import GameRow from './GameRow';

import './GameBoard.css';

interface Props {
    gameBoard: Field[][];
    fieldOnClick: Function;
    time: string;
    moveNo: number;
    isSolved: boolean;
}

// manual says to avoid map with index, but that is the best solution I found
// for the 2d array:
// https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react
const GameBoard: React.FC<Props> = (props) => {
    const gameBoardIn: Field[][] = props.gameBoard;
    const fieldOnClickIn: Function = props.fieldOnClick;
    const timeIn: string = props.time;
    const moveNoIn: number = props.moveNo;
    const isSolvedIn: boolean = props.isSolved;
    let customClasses: string = [isSolvedIn ? 'solved' : ' ',
    timeIn === '00:00' ? 'noTime' : ''].join(" ");
    return (
        <div>
            <table className={'gameBoard ' + customClasses}>
                <thead className={customClasses}>
                    <tr>
                        <th className='white'>Move: {moveNoIn}</th>
                        <th className='white'>Time: {timeIn}</th>
                    </tr>
                </thead>
                <tbody>
                    {gameBoardIn.map((row, rowId) => {
                        return <GameRow key={rowId} arrFields={row}
                            fieldOnClick={fieldOnClickIn} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GameBoard;
