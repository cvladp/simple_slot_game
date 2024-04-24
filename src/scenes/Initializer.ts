import * as PIXI from 'pixi.js'

import { MainSlot } from './MainSlot';

/** 
 *    Entry point of the game
 *    Serves as the loader for game resources
 */
export class Initializer {
    public app: PIXI.Application;

    private appWidth: number = 1920;
    private appHeight: number = 1080;
    private aspectRatio = this.appWidth / this.appHeight;

    /**
     * Constructor method, used to initialize the main pixi application
     */
    constructor() {
        this.app = new PIXI.Application({
            backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
        });

        // Display application properly
        document.body.style.margin = '0';
        this.app.renderer.view.style.position = 'absolute';
        this.app.renderer.view.style.display = 'block';

        window.addEventListener('resize', this.onResize.bind(this));

        // Load assets
        document.body.appendChild(this.app.view);
        this.onResize();
        this.startAppLoader();
    }

    private resizeApp(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.app.renderer.resize(width, height);
    }

    private onResize(): void {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = this.app.renderer.width / this.appWidth;
        this.app.stage.scale.y = this.app.renderer.height / this.appHeight;

        if (this.app.renderer.width / this.app.renderer.height <= this.aspectRatio) {
            this.app.stage.scale.y = this.app.stage.scale.x;
        } else {
            this.app.stage.scale.x = this.app.stage.scale.y;
        }

        this.app.stage.x = window.innerWidth / 2 - this.app.stage.width / 2;
        this.app.stage.y = window.innerHeight / 2 - this.app.stage.height / 2;
    }

    /**
     * Method used to load ressources into pixi loader
     */
    private startAppLoader(): void {
        let loader = PIXI.Loader.shared;

        loader.add('background', 'assets/background/background.jpg');
        loader.add('symbol1', 'assets/symbols/symbol_1.png');
        loader.add('symbol2', 'assets/symbols/symbol_2.png');
        loader.add('symbol3', 'assets/symbols/symbol_3.png');
        loader.add('symbol4', 'assets/symbols/symbol_4.png');
        loader.add('symbol5', 'assets/symbols/symbol_5.png');
        loader.add('symbol6', 'assets/symbols/symbol_6.png');
        loader.add('symbol7', 'assets/symbols/symbol_7.png');
        loader.add('symbol8', 'assets/symbols/symbol_8.png');
        loader.onStart.add(this.onLoadingStarted.bind(this));
        loader.onComplete.add(this.onAssetsLoaded.bind(this));
        loader.load();
    }

    /**
     * Handler method for starting ressource loading event
     * Adds the preloader scene to the app
     */
    private onLoadingStarted(): void {

    }

    /**
     * Handler method for complete ressource loading event
     */
    private onAssetsLoaded(): void {
        const main = new MainSlot(this.app);
        this.onResize();
    }
}



