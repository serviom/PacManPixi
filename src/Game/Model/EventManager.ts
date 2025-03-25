import { Event, IEvent } from "../../Common/Event";
import { eDirection } from '../Direction';

export interface IEventManager
{
    get OnCreatePacMan(): IEvent<[x: number, y: number]>;
    get OnUpdatePacManPosition(): IEvent<[x: number, y: number, direction: eDirection]>;

    get OnCreateGhost(): IEvent<[x: number, y: number, img: string]>;
    get OnUpdateGhostPosition(): IEvent<[x: number, y: number, direction: eDirection]>;

    get OnCreateGhost2(): IEvent<[x: number, y: number]>;
    get OnUpdateGhost2Position(): IEvent<[x: number, y: number, direction: eDirection]>;

    get OnCreateCherry(): IEvent<[x: number, y: number, label: string]>;
    get OnCreateCoin(): IEvent<[x: number, y: number, label: string]>;
}

export interface IEventManagerWritable
{
    CreatePacMan(x: number, y: number): void;
    UpdatePacManPosition(x: number, y: number, direction: eDirection): void;

    CreateGhost(x: number, y: number, img: string): void;
    UpdateGhostPosition(x: number, y: number, direction: eDirection): void;

    CreateGhost2(x: number, y: number): void;
    UpdateGhost2Position(x: number, y: number, direction: eDirection): void;

    CreateCherry(x: number, y: number, label: string): void;
    CreateCoin(x: number, y: number, label: string): void;
}

export class EventManager implements IEventManager, IEventManagerWritable
{
    private _onCreatePacMan = new Event<[x: number, y: number]>();
    private _onUpdatePacManPosition = new Event<[x: number, y: number,  direction: eDirection]>();

    private _onCreateGhost = new Event<[x: number, y: number, img: string]>();
    private _onUpdateGhostPosition = new Event<[x: number, y: number, direction: eDirection]>();

    private _onCreateGhost2 = new Event<[x: number, y: number]>();
    private _onUpdateGhost2Position = new Event<[x: number, y: number, direction: eDirection]>();

    private _onCreateCherry = new Event<[x: number, y: number, label: string]>();
    private _onCreateCoin = new Event<[x: number, y: number, label: string]>();


    public get OnCreatePacMan(): IEvent<[x: number, y: number]>
    { return this._onCreatePacMan; }

    public get OnUpdatePacManPosition(): IEvent<[x: number, y: number, direction: eDirection]>
    { return this._onUpdatePacManPosition; }

    public get OnCreateGhost(): IEvent<[x: number, y: number, img: string]>
    { return this._onCreateGhost; }

    public get OnUpdateGhostPosition(): IEvent<[x: number, y: number, direction: eDirection]>
    { return this._onUpdateGhostPosition; }

    public get OnCreateGhost2(): IEvent<[x: number, y: number]>
    { return this._onCreateGhost2; }

    public get OnUpdateGhost2Position(): IEvent<[x: number, y: number, direction: eDirection]>
    { return this._onUpdateGhost2Position; }

    public get OnCreateCherry(): IEvent<[x: number, y: number, label: string]>
    { return this._onCreateCherry; }

    public get OnCreateCoin(): IEvent<[x: number, y: number, label: string]>
    { return this._onCreateCoin; }

    public CreatePacMan(x: number, y: number): void
    { this._onCreatePacMan.Invoke(x, y); }

    public UpdatePacManPosition(x: number, y: number, direction: eDirection): void
    { this._onUpdatePacManPosition.Invoke(x, y, direction); }

    public CreateGhost(x: number, y: number, img: string): void
    { this._onCreateGhost.Invoke(x, y, img); }

    public UpdateGhostPosition(x: number, y: number, direction: eDirection): void
    { this._onUpdateGhostPosition.Invoke(x, y, direction); }

    public CreateGhost2(x: number, y: number): void
    { this._onCreateGhost2.Invoke(x, y); }

    public UpdateGhost2Position(x: number, y: number, direction: eDirection): void
    { this._onUpdateGhost2Position.Invoke(x, y, direction); }

    public CreateCherry(x: number, y: number, label: string): void
    { this._onCreateCherry.Invoke(x, y, label); }

    public CreateCoin(x: number, y: number, label: string): void
    { this._onCreateCoin.Invoke(x, y, label); }

}