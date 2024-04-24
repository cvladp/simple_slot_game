import { Application, Container } from 'pixi.js';
import { Background } from './Background';
import { Reels } from './Reels';


export class MainSlot extends Container {
    private _app: Application;
    private _background: Background;
    private _reels: Reels;

    constructor(app: Application) {
        super();

        this._app = app;
        this._background = new Background();
        this._reels = new Reels();
        this.addBackground();
        this.addReels();


    }

    private addBackground(): void {
        this._app.stage.addChild(this._background);
        this._background.x = 0;
        this._background.y = 0;
    }

    private addReels(): void {
        this._app.stage.addChild(this._reels);
        this._reels.x = this._background.width * 0.5 - this._reels.width * 0.5;
        this._reels.y = this._background.height * 0.5 - this._reels.height * 0.5;;
    }

}
