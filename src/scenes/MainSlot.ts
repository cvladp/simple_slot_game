import { Application, Container } from 'pixi.js';
import { EventEmitter } from '../system/EventEmitter';
import { NotificationNames } from '../system/NotificationNames';
import { Background } from './Background';
import { Button } from './Button';
import { Reels } from './Reels';

/**
 * Main game scene container.
 * Manages the background, reels, and button elements.
 */
export class MainSlot extends Container {
    private _app: Application;
    private _background: Background;
    private _reels: Reels;
    private _button: Button;

    /**
     * Constructor method for the main game scene.
     * @param app The PIXI Application instance.
     */
    constructor(app: Application) {
        super();

        this._app = app;
        this._background = new Background();
        this._reels = new Reels();
        this._button = new Button(this.buttonClicked.bind(this));
        this.addBackground();
        this.addReels();
        this.addButton();

    }

    /**
     * Add the background to the stage.
     */
    private addBackground(): void {
        this._app.stage.addChild(this._background);
        this._background.x = 0;
        this._background.y = 0;
    }

    /**
    * Add the reels to the stage.
     */
    private addReels(): void {
        this._app.stage.addChild(this._reels);
        this._reels.x = this._background.width * 0.5 - this._reels.width * 0.5;
        this._reels.y = this._background.height * 0.5 - this._reels.height * 0.5;;
    }

    /**
     * Add the button to the stage.
     */
    private addButton(): void {
        this._app.stage.addChild(this._button);
        this._button.x = this._reels.x + this._reels.width * 1.5;
        this._button.y = this._reels.y + this._button.height * 0.65;
    }

    /**
     * Event handler for button click.
     * Initiates the spin animation of the reels.
     */
    private buttonClicked(): void {
        this._reels.startSpin();
    }

}
