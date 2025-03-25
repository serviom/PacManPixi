import { CellObject } from './CellObject';
import { eDirection } from '../../../Direction';

export interface IGhostObject
{
    get X(): number;
    get Y(): number;
    get Moves():  IMove[];
    get Direction() : eDirection;
    UpdatePosition(x: number, y: number, direction?: eDirection): void;
    UpdateDirection(targetX: number, targetY: number): void;
}

interface IMove {
    x: number,
    y: number,
    direction: eDirection
}

export class Ghost extends CellObject implements IGhostObject
{
    private _moves: IMove[];
    private _direction: eDirection;

    public constructor(x: number, y: number)
    {
        super(x,y)
        this._moves = [{
            x: 0,
            y: 0,
            direction: eDirection.RIGHT
        }];
        this._direction = eDirection.UP
    }

    public get Moves(): IMove[]
    {
        return this._moves;
    }

    public get Direction(): eDirection
    {
        return this._direction;
    }

    public UpdateDirection(targetX: number, targetY: number): void
    {
        if (!this._moves.length) {
            return
        }

        if (this._moves[0]['x'] === targetX && this._moves[0]['y'] === targetY) {
            const move = this._moves.shift();
            if (move) {
                this._direction = move.direction;
            }
        }
    }
}