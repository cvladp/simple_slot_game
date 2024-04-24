import { Container } from "pixi.js";
import { Reel } from "./Reel";
import * as PIXI from 'pixi.js';

export class Reels extends Container {

    private _reelsNumber = 5;
    private _reelsSpacer: number = 1.02;
    private _reelsArray: Array<Reel> = [];
    constructor() {
        super();

        this.initReels();
        this.addReelsFrame();
    }


    private initReels(): void {
        for (let i = 0; i < this._reelsNumber; i++) {
            var reel = new Reel();
            this._reelsArray.push(reel);
            this.addChild(reel);
            reel.x = reel.width * i * this._reelsSpacer;
        }
    }


    private addReelsFrame(): void {
        const frame = new PIXI.Graphics();
        const xPos = this._reelsArray[0]._symbol.x - 5;
        const yPos = this._reelsArray[0]._symbol.y;
        const frameWidth = this._reelsArray[0]._symbol.width * this._reelsNumber * this._reelsSpacer + 5;
        const frameHeight = this._reelsArray[0]._symbol.y + this._reelsArray[0]._symbol.height;

        frame.lineStyle(10, 0x076D15);
        frame.drawRect(xPos, yPos, frameWidth, frameHeight);
        this.addChild(frame);
    }
}