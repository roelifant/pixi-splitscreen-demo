import { Graphics } from "pixi.js";
import { BaseGameObject } from "../classes/BaseGameObject";
import { Render } from "../classes/Render";

export class Background extends BaseGameObject {
    public render: Render;

    constructor(x: number, y: number) {
        super();

        this.position.x = x;
        this.position.y = y;

        this.render = new Render(() => {
            const graphics = new Graphics();
            graphics.beginFill('#828282');
            graphics.drawCircle(0, 0, 5);
            return graphics;
        });
        this.render.show();
        this.render.position = this.position;
    }
}