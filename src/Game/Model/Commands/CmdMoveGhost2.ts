import { Direction, eDirection } from '../../Direction';
import { ICommand } from '../Command';
import { IContext } from '../Context/Context';
import { ICellObject } from '../Context/Internal/CellObject';

export class CmdMoveGhost2 implements ICommand {
    _direction: eDirection;


    public constructor(direction: eDirection) {
        this._direction = direction;
    }


    public Exec(context: IContext): void {
        let ghost2: ICellObject = context.ghost('Ghost2');
        const isCanMove: boolean = context.Field.IsCanMove(ghost2.X, ghost2.Y, this._direction);
        if (isCanMove) {
            const nextPosition = Direction.GetNextPosition(ghost2.X, ghost2.Y, this._direction);
            ghost2.UpdatePosition(nextPosition.x, nextPosition.y);
            context.EventManager.UpdateGhost2Position(nextPosition.x, nextPosition.y, this._direction);
        }
    }
}