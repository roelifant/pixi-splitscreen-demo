import { Screen } from "./classes/Screen";
import { Render } from "./classes/Render";
import { IScreenConfig } from "./interfaces/IScreenConfig";
import { IGameObject } from "./interfaces/IGameObject";

export class ScreenManager {
    public screens: Array<Screen>;

    constructor(screens: Array<IScreenConfig>) {
        this.screens = [];
        for (const config of screens) {
            this.screens.push(new Screen(config));
        }
    }

    public addToAllScreens(render: Render) {
        this.screens.forEach(screen => {
            const build = render.getScreenBuild(screen.key);

            if(!build) {
                console.warn('unable to show render in '+screen.key+' screen');
                return;
            }

            screen.add(build);
        });
    }

    public addToScreen(key: string, render: Render) {
        const screen = this.screens.find(s => s.key === key);

        if(!screen) {
            console.warn('Unable to add display object to '+key+' screen, because it does not exist');
            return;
        }

        const build = render.getScreenBuild(key);

        if(!build) {
            console.warn('unable to show render in '+key+' screen');
            return;
        }

        screen.add(build);
    }

    public track(screenKey: string, gameObject: IGameObject) {
        const screen = this.screens.find(screen => screen.key === screenKey);

        if(!screen) {
            console.warn('Unable to track game object for screen '+screenKey);
            return;
        }

        screen.track(gameObject);
    }

    public resize() {
        for (const screen of this.screens) {
            screen.resize();
        }
    }
}