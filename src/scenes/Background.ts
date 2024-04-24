import { Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js'

export class Background extends PIXI.Container {
    private _bgSprite: Sprite;

    constructor() {
        super();
        this.addElements();
        this._bgSprite = new Sprite();
    }

    private addElements(): void {
        const texture = PIXI.Loader.shared.resources['background'].texture;
        this._bgSprite = new Sprite(texture);

        this.addChild(this._bgSprite);
    }
}