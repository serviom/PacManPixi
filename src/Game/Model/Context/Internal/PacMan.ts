import { CellObject } from './CellObject';
import { eDirection } from '../../../Direction';

export interface IPacManObject
{
    get X(): number;
    get Y(): number;

    UpdatePosition(x: number, y: number, direction?: eDirection): void;
    decrementCherries(): void;
    incrementCherries(): void;
    incrementCoins(): void;
    get countCherries(): number | null;
    get countCoins(): number;

}

export class PacMan extends CellObject implements IPacManObject
{
    private _countCherries: number | null;
    private _countCoins: number;

    public constructor(x: number, y: number)
    {
        super(x,y)
        this._countCherries = null;
        this._countCoins = 0;
    }

    public decrementCherries()
    {
        if (this._countCherries === null) {
            this._countCherries = 0;
        }
        this._countCherries -= 1;
    }

    public incrementCherries()
    {
        if (this._countCherries === null) {
            this._countCherries = 0;
        }
        this._countCherries += 1;
    }

    get countCherries(): number | null
    {
        return this._countCherries;
    }

    get countCoins(): number
    {
        return this._countCoins;
    }

    public incrementCoins()
    {
        this._countCoins += 1;
    }

}