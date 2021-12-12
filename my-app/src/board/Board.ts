import Field from './Field';
import { reshape } from '../utils/arr2d';

class Board {

    private _board: Field[][] = [];
    private _solvedBoard: Field[][] = [];

    public constructor(initBoard?: Field[][]) {
        this._solvedBoard = reshape(this._get1dArrOfFields(1, 16), 4, 4);
        if (initBoard === undefined) {
            this._board = reshape(this._get1dArrOfFields(1, 16), 4, 4);
        }
        else {
            this._board = initBoard;
        }
        for (let r = 0; r < this._board.length; r++) {
            for (let c = 0; c < this._board[r].length; c++) {
                this._board[r][c].setIsLegalMove(this._isMoveLegal(
                    this._board[r][c].getVal()));
            }
        }
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

    private _isMoveLegal(numToMove: number): boolean {
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
        if (this._isMoveLegal(move)) {
            this._swapNumsOnBoard(move, 16); // 16 is empty
        } else {
            window.alert("illegal move");
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
