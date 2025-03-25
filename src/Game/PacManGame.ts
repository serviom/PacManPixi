import { Point, Texture } from 'pixi.js';
import { GameBase } from '../Base/GameBase';
import { ITweener, ITweenerManager, TweenerManager } from '../Common/Tweener/Tweener';
import { ViewCanvas } from './View/ViewCanvas';
import { IPositionManager, PositionManager } from './View/PositionManager';
import { IObjectsFactory, ObjectsFactory } from './View/ObjectsFactory';
import { IViewModelHandler, ViewModelHanlder } from './View/ViewModelHandler';
import { IModel, Model } from './Model/Model';

export class PacManGame extends GameBase {
    private readonly COORDINATE_FAULT = 0.171;
    private readonly ITERATION_TIME: number = 0.5;

    private _tweenManager: ITweenerManager = new TweenerManager();
    private _viewCanvas!: ViewCanvas;
    private _positionManager!: IPositionManager;
    private _objectsFactory!: IObjectsFactory;
    private _viewModelHandler!: IViewModelHandler;
    private _model!: IModel;
    private _gameLoopTweener: ITweener = this._tweenManager.Create();
    private _loop: boolean = true;

    protected OnResourcesLoaded(): void {
        this._model = new Model();

        const backTexture: Texture = Texture.from('Background');

        this._viewCanvas = new ViewCanvas(backTexture, this.Width, this.Height);
        this._app.stage.addChild(this._viewCanvas);

        this._positionManager = this.CreatePositionManager(backTexture.width, backTexture.height);

        this._objectsFactory = new ObjectsFactory(this._viewCanvas, this._tweenManager);

        this._viewModelHandler = new ViewModelHanlder(this._viewCanvas, this._positionManager, this._objectsFactory,
            this._model.EventManager, this.ITERATION_TIME, this._model.getContext());

        this.GameLoop();
    }

    protected async OnUpdate(deltaTime: number): Promise<void> {
        this._tweenManager.Update(deltaTime);
        const pacMan = this._objectsFactory.CreatePacMan();
        const ghosts = this._model.ghostNames.map(ghost => this._objectsFactory.CreateGhost(ghost.name));

        const isCollision = ghosts.some(ghost =>
            Math.abs(pacMan.X - ghost.X) < this.COORDINATE_FAULT &&
            Math.abs(pacMan.Y - ghost.Y) < this.COORDINATE_FAULT,
        );

        if (isCollision && this._loop) {
            this._loop = false;
            await this._tweenManager.DisposeAllTweeners();
            alert('Game over');
        }

        if (this.youWin() && this._loop) {
            this._loop = false;
        }
    }

    protected OnResize(width: number, height: number): void {
        this._viewCanvas.Resize(width, height);
    }

    private async GameLoop(): Promise<void> {
        this._model.Init();
        while (this._loop) {
            this._model.Update();
            await this._gameLoopTweener.Timer(this.ITERATION_TIME);
        }

        if (!this._loop && this.youWin()) {
            alert('You win');
        }
    }

    private youWin(): boolean {
        return this._model.getContext().PacMan.countCherries === 0;
    }

    private CreatePositionManager(width: number, height: number): IPositionManager {
        const fieldWidth: number = 16;
        const fieldHeight: number = 12;
        const halfWidth: number = width / 2;
        const halfHeight: number = height / 2;
        const halfCellSizeX: number = width / fieldWidth / 2;
        const halfCellSizeY: number = height / fieldHeight / 2;
        return new PositionManager(new Point(-halfWidth + halfCellSizeX, -halfHeight + halfCellSizeY), new Point(halfWidth - halfCellSizeX, halfHeight - halfCellSizeY), fieldWidth, fieldHeight);
    }
}