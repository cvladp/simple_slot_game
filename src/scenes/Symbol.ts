import { Container, Sprite, Texture } from "pixi.js";

/**
 * Represents a single symbol displayed on a slot machine reel.
 */
export class Symbol extends Container {
    private _texture: Texture;
    private _symbSprite: Sprite;

    /**
     * Creates an instance of the Symbol class.
     * @param texture The texture used for the symbol.
     */
    constructor(texture: Texture) {
        super();
        this._texture = texture;
        this._symbSprite = new Sprite(this._texture);
        this.addChild(this._symbSprite);
    }

    /**
     * Getter for symbol texture
     */
    public getSymbolTexture(): Texture {
        return this._texture;
    }
}