class Field {

    static nextId: number = 0;
    private _id: number = 0;
    private _val: number = 0;

    public constructor(val: number) {
        this._id = Field.nextId;
        Field.nextId += 1;
        this._val = val;
    }

    public getId(): number {
        return this._id;
    }

    public getVal(): number {
        return this._val;
    }

    public setVal(newVal: number): void {
        this._val = newVal;
    }

    public toString(): string {
        if (this.getVal() === 16) { // 16 is empty field
            return "";
        } else {
            return this.getVal().toString();
        }
    }
}

export default Field;
