import React from 'react';

import Field from '../board/Field';

interface Props {
    field: Field;
    onClick: Function;
}

const GameItem: React.FC<Props> = (props) => {
    const fieldIn: Field = props.field;
    const onClickIn: Function = props.onClick;
    return (
        <td onClick={() => { onClickIn(fieldIn.getVal()) }}
            className={[fieldIn.getVal() === 16 ? 'empty' : 'digit',
            fieldIn.getIsLegalMove() ? 'legalMove' : ''].join(" ")}>
            {fieldIn.toString()}
        </td>
    )
}

export default GameItem;
