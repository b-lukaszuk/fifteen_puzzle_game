import Field from './Field';
import { reshape, pyRange } from '../utils/arr2d';

class Board {

    private _board: Field[][] = [];
    private _solvedBoard: Field[][] = [];

    public constructor(initBoard: number[][]) {
        this._board = this._transformToArrOfFields(initBoard);
        let tmp: number[][] = reshape(pyRange(1, 17, 1), 4, 4);
        this._solvedBoard = this._transformToArrOfFields(tmp);

        for (let r = 0; r < this._board.length; r++) {
            for (let c = 0; c < this._board[r].length; c++) {
                this._board[r][c].setIsLegalMove(this.isMoveLegal(
                    this._board[r][c].getVal()));
            }
        }
    }

    private _transformToArrOfFields(arr2dNums: number[][]): Field[][] {
        let result: Field[][] = [];
        for (let r = 0; r < arr2dNums.length; r++) {
            let newRow: Field[] = [];
            for (let c = 0; c < arr2dNums[r].length; c++) {
                newRow.push(new Field(arr2dNums[r][c]));
            }
            result.push(newRow);
        }
        return result;
    }

    public getBoard(): Field[][] {
        return this._board;
    }

    public get2dArrOfNums(): number[][] {
        let result: number[][] = [];
        for (let r = 0; r < this._board.length; r++) {
            let rowOfNums: number[] = [];
            for (let c = 0; c < this._board[r].length; c++) {
                rowOfNums.push(this._board[r][c].getVal());
            }
            result.push(rowOfNums);
        }
        return result;
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

    public isMoveLegal(numToMove: number): boolean {
        let [mvRow, mvCol] = this._getLocOfNum(numToMove);
        let [emptyRow, emptyCol] = this._getLocOfEmpty();
        if (mvRow === emptyRow) {
            if ((mvCol - 1) === emptyCol || (mvCol + 1) === emptyCol) {
                return true;
            }
        } else if (mvCol === emptyCol) {
            if ((mvRow - 1) === emptyRow || (mvRow + 1) === emptyRow) {
                return true;
            }
        }
        return false;
    }

    private _swapNumsOnBoard(num1: number, num2: number): void {
        let [n1row, n1col] = this._getLocOfNum(num1);
        let [n2row, n2col] = this._getLocOfNum(num2);
        let v1: number = this._board[n1row][n1col].getVal();
        let v2: number = this._board[n2row][n2col].getVal();
        this._board[n1row][n1col].setVal(v2);
        this._board[n2row][n2col].setVal(v1);
    }

    public makeMove(move: number): void {
        if (this.isMoveLegal(move)) {
            this._swapNumsOnBoard(move, 16); // 16 is empty
        }
    }

    public isSolved(): boolean {
        for (let r = 0; r < this._board.length; r++) {
            for (let c = 0; c < this._board[r].length; c++) {
                if (this._board[r][c].getVal() !==
                    this._solvedBoard[r][c].getVal()) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Board;
