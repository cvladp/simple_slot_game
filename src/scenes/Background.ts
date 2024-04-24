import { Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js'

export class Background extends PIXI.Container {
    private _bgSprite: Sprite;

    constructor() {
        super();
        this.addElements();
        this._bgSprite = new Sprite();
        window.addEventListener('resize', () => {
            this.scaleSprite();
        });
    }

    private addElements(): void {
        const texture = PIXI.Loader.shared.resources['background'].texture;
        this._bgSprite = new Sprite(texture);

        this.addChild(this._bgSprite);
    }

    public resize(width: number, height: number): void {
        // Resize the sprite to fit the screen
        // this._bgSprite.width = width;
        // this._bgSprite.height = height;
    }

    private scaleSprite(): void {
        // Calculate scale factors
        const scaleX = window.innerWidth / this._bgSprite.texture.width;
        const scaleY = window.innerHeight / this._bgSprite.texture.height;
        // Set the scale to the smaller of the two scale factors to maintain aspect ratio
        const scale = Math.min(scaleX, scaleY);
        this._bgSprite.scale.set(scale, scale);
        // Center the sprite
        this._bgSprite.x = (window.innerWidth - this._bgSprite.width) / 2;
        this._bgSprite.y = (window.innerHeight - this._bgSprite.height) / 2;
    }
}