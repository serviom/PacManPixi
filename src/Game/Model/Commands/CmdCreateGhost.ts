import { ICommand } from "../Command";
import { IContext } from "../Context/Context";

export class CmdCreateGhost implements ICommand
{
    _x: number;
    _y: number;
    _img: string;

    public constructor(x: number, y: number, img: string)
    {
        this._x = x;
        this._y = y;
        this._img = img;
    }

    public Exec(context: IContext): void
    {
        context.CreateGhost(this._x, this._y, this._img);
    }
}