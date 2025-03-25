import { ICommand } from "../Command";
import { IContext } from "../Context/Context";
import { CellObject } from '../Context/Internal/CellObject';

export class CmdCreateCherry implements ICommand
{
    _x: number;
    _y: number;

    // ==========================

    public constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    public Exec(context: IContext): void
    {
        const label = String(this._x) + '_' + String(this._y);
        context.EventManager.CreateCherry(this._x, this._y, label);
    }
}