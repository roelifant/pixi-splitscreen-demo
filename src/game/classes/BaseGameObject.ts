import Engine from "../Engine";
import { IGameObject } from "../interfaces/IGameObject";

export class BaseGameObject implements IGameObject{
    public position = {x: 0, y: 0};

    constructor() {
        Engine.registerGameObject(this);
    }

    public update() {
        
    }
}