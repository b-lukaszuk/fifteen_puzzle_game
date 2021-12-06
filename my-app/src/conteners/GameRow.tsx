import React from 'react';

import Field from '../board/Field';
import GameItem from './GameItem';

function getTableCell(cell: Field) {
    return (
        <GameItem key={cell.getId()} field={cell} />
    )
}

interface Props {
    arrFields: Field[];
}
const GameRow: React.FC<Props> = (props) => {
    const arrFieldsIn: Field[] = props.arrFields;
    return (
        <tr>
            {arrFieldsIn.map((aField) => { return getTableCell(aField) })}
        </tr>
    )
}

export default GameRow;
