import React from 'react';

import Field from '../board/Field';
import GameItem from './GameItem';

interface Props {
    arrFields: Field[];
    fieldOnClick: Function;
}
const GameRow: React.FC<Props> = (props) => {
    const arrFieldsIn: Field[] = props.arrFields;
    const fieldOnClickIn: Function = props.fieldOnClick;
    return (
        <tr>
            {arrFieldsIn.map((aField) => {
                return <GameItem key={aField.getId()} field={aField}
                    onClick={fieldOnClickIn} />
            })}
        </tr>
    )
}

export default GameRow;
