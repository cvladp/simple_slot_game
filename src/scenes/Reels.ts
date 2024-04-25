import { Container } from "pixi.js";
import { Reel } from "./Reel";
import * as PIXI from 'pixi.js';
import gsap from "gsap";

/**
 * Represents a collection of spinning reels in a slot machine game.
 */
export class Reels extends Container {

    private _reelsNumber: number;
    private _reelsSpacer: number = 1.02;
    private _reelsArray: Array<Reel> = [];
    private _reelsSpinDelay: number = 0.15;

    constructor(reelNumber: number) {
        super();
        this._reelsNumber = reelNumber;
        this.initReels();
        this.addReelsFrame();
    }

    /**
     * Initializes the reels by creating instances of the Reel class and positioning them horizontally.
     */
    private initReels(): void {
        for (let i = 0; i < this._reelsNumber; i++) {
            var reel = new Reel();
            this._reelsArray.push(reel);
            this.addChild(reel);
            reel.x = reel.width * i * this._reelsSpacer;
        }
    }

    /**
      * Adds a frame around the collection of reels.
      */
    private addReelsFrame(): void {
        const frame = new PIXI.Graphics();
        const xPos = this._reelsArray[0]._symbol.x - 5;
        const yPos = this._reelsArray[0]._symbol.y;
        const frameWidth = this._reelsArray[0]._symbol.width * this._reelsNumber * this._reelsSpacer + 5;
        const frameHeight = this._reelsArray[0]._symbol.y + this._reelsArray[0]._symbol.height;

        frame.lineStyle(10, 0xBEBEBE);
        frame.drawRect(xPos, yPos, frameWidth, frameHeight);
        this.addChild(frame);
    }

    /**
     * Initiates the spinning animation for each reel in the collection.
    */
    public startSpin(): void {
        for (let i = 0; i < this._reelsArray.length; i++) {
            gsap.delayedCall(this._reelsSpinDelay * i, () => {
                this._reelsArray[i].spinReel();
            })
        }
    }
}