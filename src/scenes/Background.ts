import { Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js'

/**
 * Represents the background of the game.
 */
export class Background extends PIXI.Container {
    private _bgSprite: Sprite;

    /**
     * Creates an instance of the Background class.
     */
    constructor() {
        super();
        this.addElements();
        this._bgSprite = new Sprite();
    }

    /**
    * Adds elements to the background, such as the background sprite.
    */
    private addElements(): void {
        const texture = PIXI.Loader.shared.resources['background'].texture;
        this._bgSprite = new Sprite(texture);
        this._bgSprite.scale.set(0.5);
        this._bgSprite.tint = 0x44aa31;
        this.addChild(this._bgSprite);
    }
}