import { Container } from 'pixi.js';
import { IPacMan, PacMan } from './Objects/PacMan';
import { Ghost, IGhost } from './Objects/Ghost';
import { ITweenerManager } from '../../Common/Tweener/Tweener';
import { Cherry, ICherry } from './Objects/Cherry';
import { Coin, ICoin } from './Objects/Coin';


export interface IObjectsFactory
{
    CreatePacMan() : IPacMan;
    CreateGhost(img: string) : IGhost;
    CreateCherry(label: string) : ICherry;
    RemoveCherry(label: string) : boolean;
    CreateCoin(label: string) : ICoin;
    RemoveCoin(label: string) : boolean;
    get Cherries() : Record<string, Cherry>
}

export class ObjectsFactory implements IObjectsFactory {
    private readonly _parent: Container;
    private readonly _tweenManager: ITweenerManager;
    private _pacMan!: PacMan;
    private _ghosts: Record<string, Ghost> = {};
    private _cherries: Record<string, Cherry> = {};
    private _coins: Record<string, Coin> = {};

    public constructor(parent: Container, tweenManager: ITweenerManager) {
        this._parent = parent;
        this._tweenManager = tweenManager;
        this._ghosts = {}
        this._cherries = {};
        this._coins = {};
    }

    public CreatePacMan(): IPacMan {
        if (!this._pacMan) {
            this._pacMan = new PacMan(this._tweenManager);
            this._parent.addChild(this._pacMan);
        }
        return this._pacMan;
    }

    public CreateGhost(img: string): IGhost {
        if (!this._ghosts[img]) {
            this._ghosts[img] = new Ghost(this._tweenManager, img);
            this._parent.addChild(this._ghosts[img]);
        }
        return this._ghosts[img];
    }

    public CreateCherry(label: string): ICherry {
        if (!this._cherries[label]) {
            this._cherries[label] = new Cherry(this._tweenManager);
            this._parent.addChild(this._cherries[label]);
        }
        return this._cherries[label];
    }

    public CreateCoin(label: string): ICoin {
        if (!this._coins[label]) {
            this._coins[label] = new Coin(this._tweenManager);
            this._parent.addChild(this._coins[label]);
        }
        return this._coins[label];
    }

    public RemoveCherry(label: string): boolean {
        if (this._cherries[label]) {
            this._parent.removeChild(this._cherries[label]);
            this._cherries[label].destroy();
            delete this._cherries[label];
            return true;
        }
        return false
    }

    public RemoveCoin(label: string): boolean {
        if (this._coins[label]) {
            this._parent.removeChild(this._coins[label]);
            this._coins[label].destroy();
            delete this._coins[label];
            return true;
        }
        return false
    }

    get Cherries() : Record<string, Cherry> {
        return this._cherries
    }
}
