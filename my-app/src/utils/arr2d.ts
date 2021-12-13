function scramble(arr1d: any[], times: number): any[] {
    // the Fisher-Yates algorithm
    // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    if (times > (arr1d.length - 1) || times <= 0) { times = arr1d.length - 1 }
    let arrCopy: any[] = [...arr1d];
    for (let i = times; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arrCopy[i];
        arrCopy[i] = arrCopy[j];
        arrCopy[j] = temp;
    }
    return arrCopy;
}

function reshape(arr1d: any[], nrows: number, ncols: number): any[][] {
    if (arr1d.length !== (nrows * ncols)) {
        throw new RangeError("(nrows * ncols) must be equal arr1d.length");
    }
    let result: any[][] = []
    let arrCopy: any[] = [...arr1d];
    for (let r = 0; r < nrows; r++) {
        let row: any[] = [];
        for (let c = 0; c < ncols; c++) {
            let tmp: any = arrCopy.shift()
            row.push(tmp);
        }
        result.push(row);
    }
    return result;
}


// from
// https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
// modified by me
function flattenArr2d(arr2d: any[][]): any[] {
    let arr1d: any[] = [];
    for (let r = 0; r < arr2d.length; r++) {
        for (let c = 0; c < arr2d[r].length; c++) {
            arr1d.push(arr2d[r][c]);
        }
    }
    return arr1d;
}

function getInversionsCount(arr2d: number[][]): number {
    let invCount: number = 0;
    let nrows: number = arr2d.length;
    let arr1d: number[][] = flattenArr2d(arr2d);
    for (let i = 0; i < nrows * nrows - 1; i++) {
        for (let j = i + 1; j < nrows * nrows; j++) {
            // count pairs(arr[i], arr[j]) such that
            // i < j and arr[i] > arr[j]
            if ((i < j) && (arr1d[i] > arr1d[j])) {
                invCount += 1;
            }
        }
    }
    return invCount;
}

function isNumInArr(numToFind: number, arr1d: number[]): boolean {
    for (let i = 0; i < arr1d.length; i++) {
        if (arr1d[i] === numToFind) {
            return true;
        }
    }
    return false;
}

// find Position of blank (16) from bottom
function findBlankPosFromBottom(puzzle: number[][]): number {
    let numOfRow: number = -1;
    for (let r = 0; r < puzzle.length; r++) {
        if (isNumInArr(16, puzzle[r])) {
            numOfRow = r;
            break;
        }
    }
    if (numOfRow === -1) {
        throw new Error("Number 16 is not in the 2d array. It must be here");
    } else {
        return puzzle.length - numOfRow; // numbering strarts from bottom from 1
    }
}

function isEven(someNum: number): boolean {
    return someNum % 2 === 0;
}

function isOdd(someNum: number): boolean {
    return !isEven(someNum);
}

function isSolvable(puzzle: number[][]): boolean {
    let numberOfInversions: number = getInversionsCount(puzzle);
    // If grid is odd, return true if inversion
    // count is even.
    if (isOdd(puzzle.length) && isEven(numberOfInversions)) {
        return true;
    } else { // grid is even
        let posOfEmpty: number = findBlankPosFromBottom(puzzle);
        if (isEven(posOfEmpty) && isOdd(numberOfInversions)) {
            return true;
        }
        if (isOdd(posOfEmpty) && isEven(numberOfInversions)) {
            return true;
        }
        return false;
    }
}

/**
 * imitates python's range function, retruns arrOfConsecutiveNums
 * imitates a bit func overloading from c++, java, e.g.
 * range(2) -> [0, 1]; range(-2) -> [0, -1] (default end=start, start=0, by=1)
 * range(1, 3) -> [1, 2, 3]; range(-1, -3) -> [-1, -2] (default by=1)
 * @param {number} start first value (incl)
 * @param {number} end end value (excl)
 * @param {number} by step betw vals (always positive, even if numbers go down)
 * @returns {Array<number>} array of vals from, to, by
 */
function pyRange(start: number, end?: number, by?: number): Array<number> {
    let result: Array<number> = [];

    if (arguments.length === 1) {
        end = start;
        start = 0;
        by = 1;
    }

    // otherwise strict checker in Angular protests
    by = (by === undefined || by === 0) ? 1 : by;
    end = (end === undefined) ? (start + 1) : end;

    if (start < end) {
        for (let i = start; i < end; i += by) {
            result.push(i);
        }
    } else {
        for (let i = start; i > end; i -= by) {
            result.push(i);
        }
    }

    return result;
}


export { scramble, reshape, isSolvable, pyRange };
