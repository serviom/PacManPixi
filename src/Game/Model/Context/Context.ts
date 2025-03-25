import { IEventManagerWritable } from '../EventManager';
import { Field, IField } from './Internal/Field';
import { ICellObject, CellObject } from './Internal/CellObject';
import { IPacManObject, PacMan } from './Internal/PacMan';
import { IGhost } from '../../View/Objects/Ghost';
import { Ghost, IGhostObject } from './Internal/Ghost';

export interface IContext {
    get EventManager(): IEventManagerWritable;

    get Field(): IField;

    CreatePacMan(x: number, y: number): void;

    CreateGhost(x: number, y: number, img: string): void;

    CreateCherry(x: number, y: number): void;

    get PacMan(): IPacManObject;

    ghost(img: string): IGhostObject;
}

export class Context implements IContext {
    private readonly _eventManager: IEventManagerWritable;
    private readonly _field: IField;
    private _pacMan!: IPacManObject;
    private _ghosts: Record<string, IGhostObject> = {};
    private _cherries: Record<string, ICellObject> = {};

    public constructor(eventManager: IEventManagerWritable) {
        this._eventManager = eventManager;
        this._field = new Field();
    }

    public get EventManager(): IEventManagerWritable {
        return this._eventManager;
    }

    public get Field(): IField {
        return this._field;
    }

    public CreatePacMan(x: number, y: number): void {
        this._pacMan = new PacMan(x, y);
        this._eventManager.CreatePacMan(x, y);
    }

    public CreateGhost(x: number, y: number, img: string): void {
        if (!this._ghosts[img]) {
            this._ghosts[img] = new Ghost(x, y);
        }

        this._eventManager.CreateGhost(x, y, img);
    }

    public CreateCherry(x: number, y: number): void {
        const label = String(x) + '_' + String(y);
        if (!this._cherries[label]) {
            this._cherries[label] = new CellObject(x, y);
        }

        this._eventManager.CreateCherry(x, y, label);
    }


    public get PacMan(): IPacManObject {
        return this._pacMan;
    }

    public ghost(img: string): IGhostObject {
        return this._ghosts[img];
    }
}