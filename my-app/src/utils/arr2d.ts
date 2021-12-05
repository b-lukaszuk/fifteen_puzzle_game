function scramble(arr1d: any[]): any[] {
    // the Fisher-Yates algorithm
    // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    let arrCopy: any[] = [...arr1d];
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arrCopy[i];
        arrCopy[i] = arrCopy[j];
        arrCopy[j] = temp;
    }
    return arrCopy;
}

function reshape(arr1d: any[], nrows: number, ncols: number): any[][] {
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

export { scramble, reshape };
