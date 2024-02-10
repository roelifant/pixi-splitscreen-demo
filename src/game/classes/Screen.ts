import { Application, DisplayObject } from "pixi.js";
import { IScreenConfig } from "../interfaces/IScreenConfig";
import { IGameObject } from "../interfaces/IGameObject";
import { Visual } from "../types/Visual";

export class Screen {
    public key: string;
    public app: Application;
    public width: number;
    public height: number;

    constructor(config: IScreenConfig) {
        this.key = config.key;

        const canvas = config.canvas;

        this.app = new Application({
            view: canvas,
            resizeTo: canvas,
            resolution: window.devicePixelRatio || 1,
        });

        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;

        this.moveTo(0, 0);
    }

    public add(visual: Visual) {
        this.app.stage.addChild(<DisplayObject>visual);
    }

    public moveTo(x: number, y: number) {
        this.app.stage.position.x = -x + this.width/2;
        this.app.stage.position.y = -y + this.height/2;
    }

    public move(x: number, y: number) {
        this.app.stage.position.x += x;
        this.app.stage.position.y += y;
    }

    public track(gameObject: IGameObject) {
        this.moveTo(gameObject.position.x, gameObject.position.y);
    }

    public resize() {
        this.height = this.app.view.height;
        this.width = this.app.view.width;
    }
}