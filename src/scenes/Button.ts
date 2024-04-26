import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import gsap from "gsap";
import { EventEmitter } from "../system/EventEmitter";
import { NotificationNames } from "../system/NotificationNames";
import { Howl } from 'howler';

/**
 * The Button class represents a clickable button component in a PIXI.js application. 
 * It encapsulates the functionality to create a button with customizable appearance, behavior, and event handling.
 */
export class Button extends Container {
    private _background: PIXI.Graphics;
    private _callback: () => void;
    private _clickSound: Howl;


    constructor(callback: () => void) {
        super();
        this.initButton();
        this._callback = callback;
        this.enableButton();

        EventEmitter.getInstance().on(NotificationNames.REELS_SPIN_STOPPED, this.enableButton.bind(this));
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

        this._clickSound = new Howl({
            src: ['assets/music/btnClick.mp3'],
            loop: false
        });
    }

    /**
     * Event handler for button click.
     * Disables the button, triggers a click animation, executes a callback, and re-enables the button after a delay.
     */
    private onClick(): void {
        this.disableButton();
        this._clickSound.play();
        gsap.to(this._background, {
            y: this._background.y + 5, ease: "power1.inOut", duration: 0.1, onComplete: () => {
                if (this._callback) {
                    // triggers the onClick callback to be managed outside of this class
                    this._callback();
                }
                gsap.to(this._background, {
                    y: this._background.y - 5, ease: "power1.inOut", duration: 0.1
                });
            }
        });

    }

    /**
     * Enables the button by adding interactivity and listeners.
     */
    private enableButton(): void {
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', this.onClick.bind(this));
        this.alpha = 1;
    }


    /**
     * Disables the button by removing interactivity and listeners.
     */
    private disableButton(): void {
        this.alpha = 0.5;
        this.interactive = false;
        this.buttonMode = false;
        this.removeAllListeners();
    }
}