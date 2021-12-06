import React from 'react';

import Field from '../board/Field';

interface Props {
    field: Field;
}

const GameItem: React.FC<Props> = (props) => {
    const fieldIn: Field = props.field;
    return (
        <td>
            {fieldIn.toString()}
        </td>
    )
}

export default GameItem;
