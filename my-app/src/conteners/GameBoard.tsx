import React from 'react';

import Board from '../board/Board';
import Field from '../board/Field';
import GameRow from './GameRow';

import './GameBoard.css';

function getTableRow(arr1d: Field[], arrId: number) {
    return (
        <GameRow key={arrId} arrFields={arr1d} />
    );
};

interface Props {
    gameBoard: Board;
}

// manual says to avoid map with index, but that is the best solution I found:
// https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react
const GameBoard: React.FC<Props> = (props) => {
    const gameBoardIn: Board = props.gameBoard;
    return (
        <div>
            <table>
                <tbody>
                    {gameBoardIn.getBoard().map((row, rowId) => {
                        return getTableRow(row, rowId);
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GameBoard;
