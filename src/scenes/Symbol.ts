import { Container, Sprite, Texture } from "pixi.js";

export class Symbol extends Container {
    private _texture: Texture;
    private _symbSprite: Sprite;

    constructor(texture: Texture) {
        super();
        this._texture = texture;
        this._symbSprite = new Sprite(this._texture);
        this._symbSprite.scale.set(1);

        this.addChild(this._symbSprite);

    }
}