import { Direction, eDirection } from "../../../Direction";
import obstacles from "./obstacles";


export interface IField
{
    get Width(): number;
    get Height(): number;

    IsCanMove(x: number, y: number, direction: eDirection): boolean;
}

export class Field implements IField
{
    private IsOutOfRange(x: number, y: number)
    { return x < 0 || y < 0 || x >= this.Width || y >= this.Height; }

    public get Width(): number
    { return 16; }

    public get Height(): number
    { return 12; }

    public IsCanMove(x: number, y: number, direction: eDirection): boolean
    {
        let newPosition = Direction.GetNextPosition(x, y, direction);
        return !this.IsOutOfRange(newPosition.x, newPosition.y) && !this.IsObstacle(newPosition.x, newPosition.y, direction);
    }

    private IsObstacle(x: number, y: number, direction: eDirection): boolean
    {
        if (direction === eDirection.RIGHT || direction === eDirection.LEFT) {
            const results = obstacles.filter(obstacle => obstacle.line === 'y'
                && obstacle.y.includes(y) && obstacle.x[direction === eDirection.RIGHT ? 1 : 0] === x);
            return results.length > 0;
        }

        if (direction === eDirection.UP || direction === eDirection.DOWN) {
            const results = obstacles.filter(obstacle => obstacle.line === 'x'
                && obstacle.x.includes(x) && obstacle.y[direction === eDirection.DOWN ? 1 : 0] === y);
            return results.length > 0;
        }
        return false;
    }
}