/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * An animation item animate stage
 *
 * @summary An animation item animate stage
 * @author Maple Yin<i@maple.im>
 *
 * Created at     : 2018-11-02 15:38:32 
 * Last modified  : 2018-11-02 15:39:25
 */


import { AnimationProperty } from "./AnimationProperty";

export class AnimationStage {
    readonly offset: number
    readonly property: AnimationProperty

    constructor(offset: number, property: AnimationProperty = new AnimationProperty()) {
        this.offset = offset
        this.property = property
    }

    to(stage: AnimationStage, offset: number): AnimationProperty {
        let taget = stage.property
        let start = this.property

        let current = new AnimationProperty()

        let ratio = (offset - this.offset) / (stage.offset - this.offset)

        current.x = this.result(start.x, taget.x, ratio)
        current.y = this.result(start.y, taget.y, ratio)
        current.scale = this.result(start.scale, taget.scale, ratio)
        current.rotate = this.result(start.rotate, taget.rotate, ratio)
        current.alpha = this.result(start.alpha, taget.alpha, ratio)

        return current
    }

    private result(startValue: number, targetValue: number, ratio: number) {
        return (targetValue - startValue) * ratio + startValue
    }
}