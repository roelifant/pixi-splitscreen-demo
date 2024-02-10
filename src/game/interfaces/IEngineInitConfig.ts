import { IScreenConfig } from "./IScreenConfig";

export interface IEngineInitConfig {
    screens: Array<IScreenConfig>
    updateLoop: CallableFunction
}