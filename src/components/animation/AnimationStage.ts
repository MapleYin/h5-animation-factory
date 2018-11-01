import * as PIXI from "pixi.js"
import { AnimationProperty } from "./AnimationProperty";

export class AnimationStage {
    readonly offset: number
    readonly property: AnimationProperty

    constructor(offset: number, property: AnimationProperty = new AnimationProperty()) {
        this.offset = offset
        this.property = property
    }

    comput() {
        
    }

    private result(currentValue: number, originValue: number, ratio: number) {
        return (currentValue - originValue) * ratio + originValue
    }
}