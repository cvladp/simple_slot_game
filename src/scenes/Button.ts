import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import gsap from "gsap";

/**
 * The Button class represents a clickable button component in a PIXI.js application. 
 * It encapsulates the functionality to create a button with customizable appearance, behavior, and event handling.
 */
export class Button extends Container {
    private _background: PIXI.Graphics;
    private _callback: () => void;

    constructor(callback: () => void) {
        super();
        this.initButton();
        this._callback = callback;
        this.enableButton();
    }

    /**
     * Initializes the button by creating background graphics and label text.
     */
    private initButton(): void {
        // Create background graphics
        this._background = new PIXI.Graphics();
        this._background.lineStyle(10, 0xF5F5F5, 1);
        this._background.beginFill(0xffffff, 0.2);
        this._background.drawCircle(0, 0, 75); // Adjust width and height as needed
        this._background.endFill();
        this.addChild(this._background);

        // Create label text
        let label = new PIXI.Text("SPIN", {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 0xF5F5F5,
            fontWeight: 'bold' // Set the font weight to bold
        });
        label.anchor.set(0.5, 0.5);
        this._background.addChild(label);
        this._background.cacheAsBitmap = true;
    }

    /**
     * Event handler for button click.
     * Disables the button, triggers a click animation, executes a callback, and re-enables the button after a delay.
     */
    private onClick(): void {
        this.disableButton();
        gsap.to(this._background, {
            y: this._background.y + 10, x: this._background.x + 1, ease: "power1.inOut", duration: 0.1, onComplete: () => {
                if (this._callback) {
                    this._callback();
                }
                gsap.to(this._background, {
                    y: this._background.y - 10, x: this._background.x - 1, ease: "power1.inOut", duration: 0.1
                });
            }
        });

        // Re-enable the button after a delay using GSAP delayedCall
        gsap.delayedCall(4.5, this.enableButton.bind(this));
    }

    /**
     * Enables the button by adding interactivity and listeners.
     */
    private enableButton(): void {
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', this.onClick.bind(this));
    }


    /**
     * Disables the button by removing interactivity and listeners.
     */
    private disableButton(): void {
        this.interactive = false;
        this.buttonMode = false;
        this.removeAllListeners();
    }
}