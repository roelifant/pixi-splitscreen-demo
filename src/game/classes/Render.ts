import Engine from '../Engine';
import { Visual } from '../types/Visual';

export class Render {
    private privPosition: {x: number, y: number};
    public uuid: string;

    public get x () {
        return this.privPosition.x;
    }

    public set x (value: number) {
        this.privPosition.x = value;
        this.updatePosition();
    }

    public get y () {
        return this.privPosition.y;
    }

    public set y (value: number) {
        this.privPosition.y = value;
        this.updatePosition();
    }

    public get position() {
        return this.privPosition;
    }

    public set position (value: {x: number, y: number}) {
        this.privPosition = value;
        this.updatePosition();
    }

    private buildMethod: () => Visual;
    private builds: Map<string, Visual>;

    constructor(build: () => Visual) {
        this.builds = new Map<string, Visual>();
        this.buildMethod = build;
        this.privPosition = {x: 0, y: 0};
        this.uuid = window.crypto.randomUUID();
    }

    public getScreenBuild(screenKey: string) {
        if(!this.builds.has(screenKey)) this.setScreenBuild(screenKey);

        return this.builds.get(screenKey);
    }

    public setScreenBuild(screenKey: string) {
        this.builds.set(screenKey, this.buildMethod());
        this.updatePosition();
    }

    public updatePosition() {
    
        this.builds.forEach((visual: Visual) => {
                visual.position.x = this.privPosition.x;
                visual.position.y = this.privPosition.y;
        });
    }

    public addToScreen(screenKey: string) {
        Engine.addToScreen(screenKey, this);
    }

    public addToAllScreens() {
        Engine.add(this);
    }

    public show() {
        this.addToAllScreens();
    }
}