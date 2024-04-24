import { Application, Container, Sprite, Graphics } from 'pixi.js';
import { Background } from './Background';


export class MainSlot extends Container {
    private _app: PIXI.Application;

    private _background: Background;

    constructor(app: PIXI.Application) {
        super();

        this._app = app;
        this._background = new Background();
        this.addBackground();

        window.addEventListener('resize', () => {
            this.resizeBackground();
        })
    }

    private addBackground(): void {
        this._app.stage.addChild(this._background);
    }

    private resizeBackground(): void {
        this._background.resize(window.innerWidth, window.innerHeight);
    }
}
