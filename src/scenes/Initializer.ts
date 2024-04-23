import * as PIXI from 'pixi.js'

import { MainSlot } from './MainSlot';

/** 
 *    Entry point of the game
 *    Serves as the loader for game resources
 */
export class Initializer {
    public app: PIXI.Application;

    /**
     * Constructor method, used to initialize the main pixi application
     */
    constructor() {
        this.app = new PIXI.Application({
            backgroundColor: 0x331133, resolution: window.devicePixelRatio || 1,
        });

        // Display application properly
        document.body.style.margin = '0';
        this.app.renderer.view.style.position = 'absolute';
        this.app.renderer.view.style.display = 'block';

        this.resizeApp();
        window.addEventListener('resize', () => {
            this.resizeApp();
        });

        // Load assets
        document.body.appendChild(this.app.view);

        this.startAppLoader();
    }

    // Method to resize the application to fill the screen
    private resizeApp(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.app.renderer.resize(width, height);
    }

    /**
     * Method used to load ressources into pixi loader
     */
    private startAppLoader(): void {
        let loader = PIXI.Loader.shared;

        loader.add('background', 'assets/background/background.jpg');
        loader.add('symbol', 'assets/symbols/symbol_1.png');
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
    }
}

