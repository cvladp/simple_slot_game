import { Container, Graphics } from "pixi.js";
import { Symbol } from './Symbol';
import * as PIXI from 'pixi.js';
import gsap, { random } from "gsap";

export class Reel extends Container {

    private _symArray: Array<Symbol> = [];
    // @ts-ignore
    public _symbol: Symbol;
    // @ts-ignore
    private _landingSymbol: Symbol;

    private _symbolsPool: Array<Symbol> = [];

    constructor() {
        super();
        this.populateSymbolPool();
        this.addInitialSymbol();
        this.addMask();
        this.spinReels();
    }

    private populateSymbolPool(): void {
        for (let i = 1; i < 15; i++) {
            let randomIndex = Math.floor(gsap.utils.random(1, 8));
            let texture = PIXI.Loader.shared.resources['symbol' + randomIndex].texture;
            let sym = new Symbol(texture);
            this._symbolsPool.push(sym);
        }
    }


    private addInitialSymbol(): void {
        let texture = PIXI.Loader.shared.resources['symbol1'].texture;
        this._symbol = new Symbol(texture);
        this._symArray.push(this._symbol);
        this.addChild(this._symbol);

    }

    private addMask(): void {
        // Determine the dimensions of the _symbol
        const symbolWidth = this._symbol.width;
        const symbolHeight = this._symbol.height;

        // Create a mask with the same size as the _symbol
        const mask = new Graphics();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, symbolWidth, symbolHeight);
        mask.endFill();

        // Apply the mask to the _symbol
        this.mask = mask;

        // Add the mask to the container
        this.addChild(mask);
    }

    private addVirtualReels(): void {

        this._symbolsPool = this.shuffleArray(this._symbolsPool);

        for (let i = 1; i < this._symbolsPool.length; i++) {
            let sym = this._symbolsPool[i];
            sym.x = this._symbol.x;
            sym.y = this._symbol.y - (this._symbol.height * i);
            this.addChild(sym);
            this._symArray.push(sym);
        }
    }

    private addLandingSymbol(): void {
        // random landing symbol
        let randomIndex = Math.floor(gsap.utils.random(1, 8));
        let landingTexture = PIXI.Loader.shared.resources['symbol' + randomIndex].texture;
        this._landingSymbol = new Symbol(landingTexture);
        this._landingSymbol.x = this._symArray[0].x;
        this._landingSymbol.y = this._symArray[this._symArray.length - 1].y - this._symArray[0].height;

        this._symArray.push(this._landingSymbol);
        this.addChild(this._landingSymbol);
    }


    private spinReels(): void {
        this.addVirtualReels();
        this.addLandingSymbol();

        for (let i = 0; i < this._symArray.length; i++) {
            gsap.to(this._symArray[i], {
                y: this._symArray[i].y + this._symArray[i].height * (this._symArray.length - 1), duration: 4, ease: "power1.inOut", onComplete: () => {
                    if (i == this._symArray.length - 1) {
                        this.resetReels();
                        this.spinReels();
                    }

                }
            });
        }
    }

    private resetReels(): void {
        this._symbol = this._landingSymbol;
        this._symArray = [];
        this._symArray.push(this._symbol);
    }

    private shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
        }
        return array;
    }

}