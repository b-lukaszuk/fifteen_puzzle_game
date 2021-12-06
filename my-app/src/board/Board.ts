import Field from './Field';
import { reshape } from '../utils/arr2d';

class Board {

    private _board: Field[][] = [];

    public constructor() {
        this._board = reshape(this._get1dArrOfFields(1, 16), 4, 4);
    }

    private _get1dArrOfFields(minIncl: number, maxIncl: number): Field[] {
        let result: Field[] = [];
        for (let i = minIncl; i <= maxIncl; i++) {
            result.push(new Field(i));
        }
        return result;
    }

    public getBoard(): Field[][] {
        return this._board;
    }
}

export default Board;
