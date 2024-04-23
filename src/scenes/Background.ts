import { Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js'

export class Background extends PIXI.Container {


    constructor() {
        super();
        this.addElements();

    }

    private addElements(): void {
        const texture = PIXI.Loader.shared.resources['background'].texture;
        const bgSprite = new Sprite(texture);

        this.addChild(bgSprite);



    }
}