import { eDirection } from '../../../Direction';

export interface ICellObject {
    get X(): number;

    get Y(): number;

    UpdatePosition(x: number, y: number, direction?: eDirection): void;
}

export class CellObject implements ICellObject {
    _x: number;
    _y: number;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get X(): number {
        return this._x;
    }

    public get Y(): number {
        return this._y;
    }


    public UpdatePosition(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }
}