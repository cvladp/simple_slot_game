import { Application, Container, Sprite, Graphics } from 'pixi.js';
import { Background } from './Background';


export class MainSlot extends Container {
    private _app: PIXI.Application;

    private _backgroud: Background;

    constructor(app: PIXI.Application) {
        super();

        this._app = app;
        this._backgroud = new Background();
        this.addBackground();

        window.addEventListener('resize', this.resizeApp);
    }

    private resizeApp(): void {
        if (this._backgroud != null) {
            this._backgroud.x = this._app.view.width * 0.5 - this._backgroud.width * 0.5;
            this._backgroud.y = this._app.view.height * 0.5 - this._backgroud.height * 0.5;
        }

    }


    private addBackground(): void {
        this._backgroud.x = this._app.view.width * 0.5 - this._backgroud.width * 0.5;
        this._backgroud.y = this._app.view.height * 0.5 - this._backgroud.height * 0.5;
        this._app.stage.addChild(this._backgroud);


    }
}
