import { Point, Sprite, Texture } from 'pixi.js';
import { ITweener, ITweenerManager } from '../../../Common/Tweener/Tweener';
import { Action } from '../../../Common/Action';
import { eInterpolation, Interpolations } from '../../../Common/Tweener/Interpolation';
import { eDirection } from '../../Direction';

export interface IGhost
{
    UpdatePosition(position: Point, time: number, direction?: eDirection) : void;
    get X(): number;
    get Y(): number;
}

// ##################################

export class Ghost extends Sprite implements IGhost
{
    readonly _positionTweener : ITweener;

    public constructor(tweenManager : ITweenerManager, img: string)
    {
        super();

        this.scale.set(0.5);
        this.anchor.set(0.5);

        this._positionTweener = tweenManager.Create();
        this.texture = Texture.from(img);
    }


    // ========= Ghost ============

    public UpdatePosition(position: Point, time: number, direction?: eDirection) : void
    {
        if (time <= 0.0001)
        {
            this.position.set(position.x, position.y);
        }
        else
        {
            const startX: number = this.position.x;
            const startY: number = this.position.y;
            const endX: number = position.x;
            const endY: number = position.y;

            this._positionTweener.InterpolateNum(0.0, 1.0, time, new Action((delta: number) =>
            {
                this.position.set(Interpolations.InterpolateNum(startX, endX, delta, eInterpolation.INTERPOLATE_TYPE_LINEAR),
                    Interpolations.InterpolateNum(startY, endY, delta, eInterpolation.INTERPOLATE_TYPE_LINEAR));

            }, this));

            if (direction !== undefined) {
                this.SetDirection(direction);
            }
        }
    }

    private SetDirection(direction: eDirection): void {
        switch (direction) {
            case eDirection.RIGHT:
                this.scale.set(0.5, 0.5);
                break;
            case eDirection.LEFT:
                this.scale.set(-0.5, 0.5);
                break;
            case eDirection.UP:
                break;
            case eDirection.DOWN:
                break;
        }
    }


    public get X() : number
    {
        return this.position.x;
    }

    public get Y() : number
    {
        return this.position.y;
    }

}