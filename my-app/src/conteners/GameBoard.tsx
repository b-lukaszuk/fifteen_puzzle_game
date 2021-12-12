import React from 'react';

import Field from '../board/Field';
import GameRow from './GameRow';

import './GameBoard.css';

interface Props {
    gameBoard: Field[][];
    fieldOnClick: Function;
}

// manual says to avoid map with index, but that is the best solution I found:
// https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react
const GameBoard: React.FC<Props> = (props) => {
    const gameBoardIn: Field[][] = props.gameBoard;
    const fieldOnClickIn: Function = props.fieldOnClick;
    return (
        <div>
            <table>
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
