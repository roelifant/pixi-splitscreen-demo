import { Graphics } from "pixi.js";
import { BaseGameObject } from "../classes/BaseGameObject";
import { Render } from "../classes/Render";
import Engine from "../Engine";
import { Keyboard } from "../Keyboard";

export class Player extends BaseGameObject {
    public type: string;
    public render: Render;

    private get pressedLeft() {
        if(this.type === 'red') return Keyboard.get('KeyA');
        return Keyboard.get('ArrowLeft');
    }

    private get pressedRight() {
        if(this.type === 'red') return Keyboard.get('KeyD');
        return Keyboard.get('ArrowRight');
    }

    private get pressedUp() {
        if(this.type === 'red') return Keyboard.get('KeyW');
        return Keyboard.get('ArrowUp');
    }

    private get pressedDown() {
        if(this.type === 'red') return Keyboard.get('KeyS');
        return Keyboard.get('ArrowDown');
    }

    constructor(x: number, y: number, type: string) {
        super();

        this.position.x = x;
        this.position.y = y;

        this.type = type;

        if(this.type === 'red') {
            this.render = new Render(() => {
                const graphics = new Graphics();
                graphics.beginFill('#ff0000');
                graphics.drawCircle(0, 0, 10);
                return graphics;
            });
            this.render.show();
            return;
        }

        this.render = new Render(() => {
            const graphics = new Graphics();
            graphics.beginFill('#0000ff');
            graphics.drawCircle(0, 0, 10);
            return graphics;
        });
        this.render.show();
    }

    public update() {
        // update position
        const speed = 1;
        if(this.pressedUp) {
            // console.log('up '+this.type);
            this.position.y -= speed;
        }
        if(this.pressedDown) {
            // console.log('down '+this.type);
            this.position.y += speed;
        }
        if(this.pressedLeft) {
            // console.log('left '+this.type);
            this.position.x -= speed;
        }
        if(this.pressedRight) {
            // console.log('right '+this.type);
            this.position.x += speed;
        }

        // update render
        this.render.x = this.position.x;
        this.render.y = this.position.y;

        // let correct screen track
        if(this.type == 'red') {
            Engine.screenManager.track('red', this);
        }
        if(this.type == 'blue') {
            Engine.screenManager.track('blue', this);
        }
    }
}