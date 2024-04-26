import { Application, Container } from 'pixi.js';
import { EventEmitter } from '../system/EventEmitter';
import { NotificationNames } from '../system/NotificationNames';
import { Background } from './Background';
import { Button } from './Button';
import { Reels } from './Reels';
import { Howl } from 'howler';

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
        this.onResize();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    /**
     * Add the background to the stage.
     */
    private addBackground(): void {
        this._app.stage.addChild(this._background);
        this._background.x = 0;
        this._background.y = 0;
        this.startBackgroundMusic();
    }

    private startBackgroundMusic(): void {
        const bgMusic = new Howl({
            src: ['assets/music/tribalBG.mp3'],
            loop: true, volume: 0.25
        });
        bgMusic.play();
    }

    private onResize(): void {


        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = height > width;

        // Adjust the scaling and positioning based on orientation
        if (isPortrait) {

            this._background.x = 0;
            this._background.y = 0;

            this._reels.x = 800
            this._reels.y = 700;

            this._button.x = 1250;
            this._button.y = 1500;

        } else {

            this._background.x = 0;
            this._background.y = 0;

            this._reels.x = 825;
            this._reels.y = 1100;

            this._button.x = 2000;
            this._button.y = 1250;

        }
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
