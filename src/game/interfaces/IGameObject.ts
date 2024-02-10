export interface IGameObject {
    update: () => void,
    position: {
        x: number,
        y: number
    }
}