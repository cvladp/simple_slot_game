import { Container } from "pixi.js";
import { Reel } from "./Reel";
import * as PIXI from 'pixi.js';
import gsap from "gsap";
import { Units } from "../system/Units";
import { EventEmitter } from "../system/EventEmitter";
import { NotificationNames } from "../system/NotificationNames";
import { Symbol } from './Symbol';
import { Howl } from 'howler';

/**
 * Represents a collection of spinning reels in a slot machine game.
 */
export class Reels extends Container {

    private _reelsNumber: number = Units.MAX_REELS_NUMBER;
    private _reelsSpacer: number = 1.02;
    private _reelsArray: Array<Reel> = [];
    private _reelsSpinDelay: number = 0.1;
    private _winSound: Howl;

    private _topSymbols: Array<Symbol> = [];

    constructor() {
        super();
        this.initReels();
        this.addReelsFrame();
        this.initSounds();

        EventEmitter.getInstance().on(NotificationNames.REELS_SPIN_STOPPED, this.getTopSymbols.bind(this));
    }

    /**
     * Initializes the reels by creating instances of the Reel class and positioning them horizontally.
     */
    private initReels(): void {
        for (let i = 0; i < this._reelsNumber; i++) {
            var reel = new Reel(i);
            this._reelsArray.push(reel);
            this.addChild(reel);
            reel.x = reel.width * i * this._reelsSpacer;
        }
    }

    /**
     * Initializes sounds used in this class.
     */
    private initSounds(): void {
        this._winSound = new Howl({
            src: ['assets/music/winningSound.mp3'],
            loop: false, volume: 1
        });
    }

    /**
      * Adds a frame around the collection of reels.
      */
    private addReelsFrame(): void {
        const frame = new PIXI.Graphics();
        const xPos = this._reelsArray[0]._symbol.x - 5;
        const yPos = this._reelsArray[0]._symbol.y - 5;
        const frameWidth = this._reelsArray[0]._symbol.width * this._reelsNumber * this._reelsSpacer + 4.5;
        const frameHeight = this._reelsArray[0]._symbol.y + this._reelsArray[0]._symbol.height + 10;

        frame.lineStyle(10, 0xBEBEBE);
        frame.drawRect(xPos, yPos, frameWidth, frameHeight);
        this.addChild(frame);
    }

    /**
     * Initiates the spinning animation for each reel in the collection.
    */
    public startSpin(): void {
        this.resetTopSymbol();
        for (let i = 0; i < this._reelsArray.length; i++) {
            gsap.delayedCall(this._reelsSpinDelay * i, () => {
                this._reelsArray[i].spinReel();
            });
        }
    }

    /**
     * Retrieves the top symbols from each reel and prepares them for animation.
     */
    private getTopSymbols(): void {
        for (let i = 0; i < this._reelsArray.length; i++) {
            var sym = new Symbol(this._reelsArray[i]._symbol.getSymbolTexture());
            sym.pivot.set(sym.width * 0.5, sym.height * 0.5);
            sym.x = this._reelsArray[i].x + sym.width * 0.5;
            sym.y = sym.y + sym.height * 0.5;

            this._topSymbols.push(sym);
            this.addChild(sym);
        }

        this.checkForWins();
        this.animatTopSymbols();
    }

    /**
     * Checks if there is a winning combination on the top symbols
     */
    private checkForWins(): void {
        this._winSound.play();

        if (this._topSymbols.length != this._reelsArray.length) {
            throw new Error("Invalid number of top symbols");
        }

        // generate an array of textures corresponding to each top symbol
        const textures = this._topSymbols.map(symbol => symbol.getSymbolTexture());

        // Check for all three symbols being the same
        if (textures[0] === textures[1] && textures[0] === textures[2]) {
            // All three symbols are winning symbols
            return;
        }

        // Check for first two symbols being the same
        if (textures[0] === textures[1]) {
            this.removeChild(this._topSymbols[2]);
            this._topSymbols.pop(); // Remove last element from array
            return;
        }

        // Check for last two symbols being the same
        if (textures[1] === textures[2]) {
            this.removeChild(this._topSymbols[0]);
            this._topSymbols.shift(); // Remove first element from array
            return;
        }

        // Check for first and last symbols being the same
        if (textures[0] === textures[2]) {
            this.removeChild(this._topSymbols[1]);
            // Remove middle element from array
            this._topSymbols.splice(1, 1);
            return;
        }
        this._winSound.stop();
        // No wins
        this.resetTopSymbol();
    }

    /**
     * Animates the top symbols by calling the animateSymbol method.
     */
    private animatTopSymbols(): void {
        this.animateSymbol();
    }
    /**
     * 
     * Animates a single symbol in the top symbols array.
     * @param currentSymbolIndex The index of the symbol to animate. Defaults to 0.
     */
    private animateSymbol(currentSymbolIndex: number = 0): void {

        if (this._topSymbols[currentSymbolIndex] == null) {
            return;
        }

        let animationDelay: number = 0.25;

        this.setChildIndex(this._topSymbols[currentSymbolIndex], this.children.length - 1);
        gsap.to(this._topSymbols[currentSymbolIndex].scale, {
            duration: 0.25, x: 1.25, y: 1.25, onComplete: () => {
                // check if the symbol was not removed during the first tween
                if (this._topSymbols[currentSymbolIndex] == null) {
                    return;
                }
                gsap.to(this._topSymbols[currentSymbolIndex].scale, { duration: 0.25, x: 1, y: 1 });
                currentSymbolIndex++;

                if (currentSymbolIndex == this._topSymbols.length) {
                    animationDelay = 1;
                    currentSymbolIndex = 0;
                }

                gsap.delayedCall(animationDelay, () => {
                    this.animateSymbol(currentSymbolIndex);
                });
            }
        });
    }

    /**
     * Resets the top symbols array by removing all symbols from the display list and clearing the array.
     */
    private resetTopSymbol(): void {
        for (let i = 0; i < this._topSymbols.length; i++) {
            this.removeChild(this._topSymbols[i]);
        }
        this._topSymbols = [];
    }
}