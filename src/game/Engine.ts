import { ScreenManager } from "./ScreenManager";
import { IEngineInitConfig } from "./interfaces/IEngineInitConfig";
import { Ticker } from "pixi.js";
import { Render } from './classes/Render';
import { IGameObject } from "./interfaces/IGameObject";

class Engine {
    public initialized: boolean = false;
    public screenManager!: ScreenManager;

    private updateLoop!: CallableFunction;
    private gameObjects: Array<IGameObject> = [];

    public init(config: IEngineInitConfig) {
        this.screenManager = new ScreenManager(config.screens);

        this.updateLoop = config.updateLoop;
        Ticker.shared.add(this.update.bind(this));

        window.addEventListener('resize', this.resize.bind(this));

        this.initialized = true;
    }

    public update() {
        this.checkInit();
        this.updateLoop();
        
        for (const object of this.gameObjects) {
            object.update();
        }
    }

    public add(render: Render) {
        this.checkInit();

        this.screenManager.addToAllScreens(render);
    }

    public addToScreen(screenKey: string, render: Render) {
        this.checkInit();

        this.screenManager.addToScreen(screenKey, render);
    }

    public registerGameObject(gameObject: IGameObject) {
        this.gameObjects.push(gameObject);
    }

    private resize() {
        if(!this.initialized) return;

        this.screenManager.resize();
    }

    private checkInit() {
        if(!this.initialized) throw Error('Engine not yet initialized');
    }
}

export default new Engine();