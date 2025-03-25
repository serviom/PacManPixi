import { Direction, eDirection } from "../../Direction";
import { ICommand } from "../Command";
import { IContext } from "../Context/Context";
import { ICellObject } from "../Context/Internal/CellObject";

export class CmdMoveGhost implements ICommand
{
    _direction: eDirection;
    _img: string;


    public constructor(direction: eDirection, img: string)
    {
        this._direction = direction;
        this._img = img;
    }


    public Exec(context: IContext): void
    {
        let ghost: ICellObject = context.ghost(this._img);
        const isCanMove: boolean = context.Field.IsCanMove(ghost.X, ghost.Y, this._direction);
        if (isCanMove)
        {
            const nextPosition = Direction.GetNextPosition(ghost.X, ghost.Y, this._direction);
            ghost.UpdatePosition(nextPosition.x, nextPosition.y);
            context.EventManager.UpdateGhostPosition(nextPosition.x, nextPosition.y, this._direction);
        }
    }

}