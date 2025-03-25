import { Point, Sprite, Texture } from 'pixi.js';
import { ITweener, ITweenerManager } from '../../../Common/Tweener/Tweener';
import { Action } from '../../../Common/Action';
import { eInterpolation, Interpolations } from '../../../Common/Tweener/Interpolation';

export interface ICoin
{
    UpdatePosition(position: Point, time: number) : void;
}

export class Coin extends Sprite implements ICoin
{
    readonly _positionTweener : ITweener;

    public constructor(tweenManager : ITweenerManager)
    {
        super();

        this.scale.set(0.5);
        this.anchor.set(0.5);

        this._positionTweener = tweenManager.Create();
        this.texture = Texture.from('Coin');
    }

    public UpdatePosition(position: Point, time: number) : void
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

        }
    }

}