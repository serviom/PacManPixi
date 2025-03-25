import { Action } from '../../Common/Action';
import { eDirection } from '../Direction';
import { CmdCreatePacMan } from './Commands/CmdCreatePacMan';
import { CmdMovePacMan } from './Commands/CmdMovePacMan';
import { Context, IContext } from './Context/Context';
import { EventManager, IEventManager } from './EventManager';
import { ITurn, ITurnInternal, Turn } from './Turn';
import { CmdCreateGhost } from './Commands/CmdCreateGhost';
import { CmdMoveGhost } from './Commands/CmdMoveGhost';
import { CmdMoveGhost2 } from './Commands/CmdMoveGhost2';
import { CmdCreateCherry } from './Commands/CmdCreateCherry';
import { CmdCreateCoin } from './Commands/CmdCreateCoin';

export interface IModel {
    get EventManager(): IEventManager;
    Init(): void;
    Update(): void;
    getContext(): IContext;
    ghostNames: readonly GhostData[];
}

type GhostData = {
    name: string;
    x: number;
    y: number;
};

type CherryData = {
    x: number;
    y: number;
};

type CoinData = {
    x: number;
    y: number;
};


export class Model implements IModel {
    private readonly _eventManager: EventManager;
    private readonly _context: IContext;
    private _directionGhost2: eDirection;
    private _direction: eDirection;

    public readonly ghostNames: readonly GhostData[] = [
        { name: 'Ghost1', x: 0, y: 5 },
        { name: 'Ghost2', x: 0, y: 6 },
    ];

    private readonly _cherries: readonly CherryData[] = [
        { x: 8, y: 8 },
        { x: 10, y: 11 },
        { x: 5, y: 11 },
        { x: 2, y: 10 },
        { x: 10, y: 3 },
    ];

    private readonly _coins: readonly CoinData[] = [
        { x: 9, y: 9 },
        { x: 1, y: 1 },
        { x: 3, y: 10 },
    ];

    public constructor() {
        this._eventManager = new EventManager();
        this._context = new Context(this._eventManager);
        this._directionGhost2 = eDirection.DOWN;
        this._direction = eDirection.RIGHT;
        this.HandleKeyboardInput();
        this.StartRandomDirectionChange();
    }


    private CreateAndExecuteTurn(onInitTurn: Action<[ITurn]>): void {
        const turn: ITurnInternal = new Turn();
        onInitTurn.Invoke(turn);
        turn.Exec(this._context);
    }

    public get EventManager(): IEventManager {
        return this._eventManager;
    }

    public Init(): void {
        this.CreateAndExecuteTurn(new Action((turn: ITurn) => {
            turn.Push(new CmdCreatePacMan(0, 0));
            for (const ghost of this.ghostNames) {
                turn.Push(new CmdCreateGhost(ghost.x, ghost.y, ghost.name));
            }

            for (const cherry of this._cherries) {
                turn.Push(new CmdCreateCherry(cherry.x, cherry.y));
            }

            for (const coin of this._coins) {
                turn.Push(new CmdCreateCoin(coin.x, coin.y));
            }
        }, this));
    }

    public Update(): void {
        this.CreateAndExecuteTurn(new Action((turn: ITurn) => {
            turn.Push(new CmdMovePacMan(this._direction));
            turn.Push(new CmdMoveGhost(this.getContext().ghost('Ghost1').Direction, 'Ghost1'));
            //turn.Push(new CmdMoveGhost(this._directionGhost2, 'Ghost2'));
            turn.Push(new CmdMoveGhost2(this._directionGhost2));
        }, this));
    }

    public getContext() {
        return this._context;
    }

    private HandleKeyboardInput(): void {
        window.addEventListener('keydown', (event) => {
            let direction = eDirection.UP;
            switch (event.key) {
                case 'ArrowUp':
                    direction = eDirection.UP;
                    break;
                case 'ArrowDown':
                    direction = eDirection.DOWN;
                    break;
                case 'ArrowLeft':
                    direction = eDirection.LEFT;
                    break;
                case 'ArrowRight':
                    direction = eDirection.RIGHT;
                    break;
                default:
                    return;
            }
            this.saveMove(direction);
            if (this.validDirection(direction)) {
                this._direction = direction;
            }
        }, { capture: true });
    }

    private StartRandomDirectionChange(): void {
        const directions = [eDirection.UP, eDirection.DOWN, eDirection.LEFT, eDirection.RIGHT];

        const changeDirection = () => {
            this._directionGhost2 = directions[Math.floor(Math.random() * directions.length)];
            const randomTime = Math.floor(Math.random() * 5000) + 1000;
            setTimeout(changeDirection, randomTime);
        };

        changeDirection();
    }

    public saveMove(direction: eDirection): void {
        if (this.validDirection(direction)) {
            if (this._direction === eDirection.RIGHT || this._direction === eDirection.LEFT) {
                if (direction === eDirection.UP || direction === eDirection.DOWN) {
                    this.saveDirection(direction);
                }
            } else {
                if (direction === eDirection.LEFT || direction === eDirection.RIGHT) {
                    this.saveDirection(direction);
                }
            }
        }
    }

    private saveDirection(direction: eDirection): void {
        const { X, Y } = this._context.PacMan;
        this.getContext().ghost('Ghost1').Moves.push({ x: X, y: Y, direction });
    }

    private validDirection(direction: eDirection): boolean {
        const { X, Y } = this._context.PacMan;
        return this.getContext().Field.IsCanMove(X, Y, direction);
    }
}