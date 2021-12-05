class Field {

    static nextId: number = 0;
    private _id: number = 0;
    private _val: number = 0;
    private _rowId: number = 0;
    private _colId: number = 0;

    public constructor(val: number, rowId: number, colId: number) {
        this._id = Field.nextId;
        Field.nextId += 1;
        this._val = val;
        this._rowId = rowId;
        this._colId = colId;
    }

    public getId(): number {
        return this._id;
    }

    public getVal(): number {
        return this._val;
    }

    public getRowId(): number {
        return this._rowId;
    }

    public getColId(): number {
        return this._colId;
    }

}

export default Field;
