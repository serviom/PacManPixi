import { Direction, eDirection } from "../../Direction";
import { ICommand } from "../Command";
import { IContext } from "../Context/Context";
import { ICellObject } from "../Context/Internal/CellObject";

export class CmdMovePacMan implements ICommand
{
    _direction: eDirection;

    public constructor(direction: eDirection)
    {
        this._direction = direction;
    }

    public Exec(context: IContext): void
    {
        let pacMan: ICellObject = context.PacMan;
        const isCanMove: boolean = context.Field.IsCanMove(pacMan.X, pacMan.Y, this._direction);
        if (isCanMove)
        {
            const nextPosition = Direction.GetNextPosition(pacMan.X, pacMan.Y, this._direction);
            pacMan.UpdatePosition(nextPosition.x, nextPosition.y, this._direction);
            context.EventManager.UpdatePacManPosition(nextPosition.x, nextPosition.y, this._direction);
        }
    }
}