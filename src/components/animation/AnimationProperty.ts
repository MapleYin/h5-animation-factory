/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * Properties that support to animate
 *
 * @summary Property that support to animate
 * @author Maple Yin<i@maple.im>
 *
 * Created at     : 2018-11-02 15:37:43 
 * Last modified  : 2018-11-02 15:38:10
 */


export class AnimationProperty {
    x: number = 0
    y: number = 0
    scale: number = 1
    rotate: number = 0
    alpha: number = 1

    constructor(prop?: AnimationProperty) {
        if (prop) {
            this.x = prop.x
            this.y = prop.y
            this.scale = prop.scale
            this.rotate = prop.rotate
            this.alpha = prop.alpha
        }
    }
}