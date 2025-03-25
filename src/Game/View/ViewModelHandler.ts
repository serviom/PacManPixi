import { Container } from 'pixi.js';
import { IPositionManager } from './PositionManager';
import { IEventManager } from '../Model/EventManager';
import { IObjectsFactory } from './ObjectsFactory';
import { IPacMan } from './Objects/PacMan';
import { IGhost } from './Objects/Ghost';
import { eDirection } from '../Direction';
import { IContext } from '../Model/Context/Context';

export interface IViewModelHandler {
}

export class ViewModelHanlder implements IViewModelHandler {
    private readonly _viewCanvas: Container;
    private readonly _positionManager: IPositionManager;
    private readonly _objectsFactory: IObjectsFactory;
    private readonly _modelEventManager: IEventManager;
    private readonly _iterationTime: number;
    private readonly _context: IContext;

    private _pacMan!: IPacMan;
    private _ghosts: Record<string, IGhost> = {};

    public constructor(viewCanvas: Container, positionManager: IPositionManager, objectsFactory: IObjectsFactory,
                       modelEventManager: IEventManager, iterationTime: number, context: IContext) {
        this._viewCanvas = viewCanvas;
        this._positionManager = positionManager;
        this._objectsFactory = objectsFactory;
        this._modelEventManager = modelEventManager;
        this._iterationTime = iterationTime;
        this._context = context;

        this._modelEventManager.OnCreatePacMan.Add(this.OnCreatePacMan, this);
        this._modelEventManager.OnCreateGhost.Add(this.OnCreateGhost, this);
        this._modelEventManager.OnCreateCherry.Add(this.OnCreateCherry, this);
        this._modelEventManager.OnCreateCoin.Add(this.OnCreateCoin, this);

        this._modelEventManager.OnUpdatePacManPosition.Add(this.AnimationPacManPosition, this);
        this._modelEventManager.OnUpdatePacManPosition.Add(this.GetCherry, this);
        this._modelEventManager.OnUpdatePacManPosition.Add(this.GetCoin, this);
        this._modelEventManager.OnUpdateGhostPosition.Add(this.AnimationGhostPosition, this);
        this._modelEventManager.OnUpdateGhost2Position.Add(this.AnimationGhost2Position, this);

        this._modelEventManager.OnUpdateGhostPosition.Add(this.AddNewGhostDirection, this);
    }

    private OnCreatePacMan(fieldX: number, fieldY: number): void {
        this._pacMan = this._objectsFactory.CreatePacMan();
        this._pacMan.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private OnCreateGhost(fieldX: number, fieldY: number, img: string): void {
        if (!this._ghosts[img]) {
            this._ghosts[img] = this._objectsFactory.CreateGhost(img);
        }

        this._ghosts[img].UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private OnCreateCherry(fieldX: number, fieldY: number, label: string): void {
        const cherry = this._objectsFactory.CreateCherry(label);
        cherry.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
        this._context.PacMan.incrementCherries();
    }

    private OnCreateCoin(fieldX: number, fieldY: number, label: string): void {
        const coin = this._objectsFactory.CreateCoin(label);
        coin.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private AnimationPacManPosition(fieldX: number, fieldY: number, direction: eDirection): void {
        this._pacMan.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime, direction);
    }

    private AnimationGhostPosition(fieldX: number, fieldY: number, direction: eDirection): void {
        this._ghosts['Ghost1'].UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime, direction);
    }

    private AnimationGhost2Position(fieldX: number, fieldY: number, direction: eDirection): void {
        this._ghosts['Ghost2'].UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime, direction);
    }

    private GetCherry(fieldX: number, fieldY: number): void {
        const label = String(fieldX) + '_' + String(fieldY);
        const result = this._objectsFactory.RemoveCherry(label);
        if (result) {
            this._context.PacMan.decrementCherries();
        }
    }

    private GetCoin(fieldX: number, fieldY: number): void {
        const label = String(fieldX) + '_' + String(fieldY);
        const result = this._objectsFactory.RemoveCoin(label);
        if (result) {
            this._context.PacMan.incrementCoins();
        }
    }

    private AddNewGhostDirection(fieldX: number, fieldY: number): void {
        this._context.ghost('Ghost1').UpdateDirection(fieldX, fieldY);
    }
}