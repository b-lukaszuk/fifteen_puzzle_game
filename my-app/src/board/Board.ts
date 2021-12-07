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

    private _getLocOfNum(searchedNum: number): number[] {
        let result: number[] = [];
        for (let r = 0; r < this.getBoard().length; r++) {
            for (let c = 0; c < this.getBoard()[r].length; c++) {
                if (this.getBoard()[r][c].getVal() === searchedNum) {
                    result = [r, c];
                    break;
                }
            }
        }
        return result
    }

    private _getLocOfEmpty(): number[] {
        return this._getLocOfNum(16); // 16 is empty
    }
}

export default Board;
