export class AnimationProperty {
    x: number = 0
    y: number = 0
    scale: number = 1
    rotate: number = 0

    constructor(prop?: AnimationProperty) {
        if (prop) {
            this.x = prop.x
            this.y = prop.y
            this.scale = prop.scale
            this.rotate = prop.rotate
        }
    }
}