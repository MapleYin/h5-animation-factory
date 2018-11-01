import { AnimationStage } from "./AnimationStage";
import { AnimationProperty } from "./AnimationProperty";
import * as PIXI from "pixi.js"

type AnimationStageDefinedBlock = (lastOffset: number, editProperty: AnimationProperty) => number

export class AnimateItem {

    readonly item: PIXI.Text | PIXI.Sprite | PIXI.Graphics

    private stageList: AnimationStage[] = []

    private start: number = 0
    private end: number = 0

    isRemoved: boolean = true

    constructor(item: PIXI.Text | PIXI.Sprite | PIXI.Graphics) {
        this.item = item;
    }

    /**
     * create new animate stage
     * 
     * @param defineBlock make change of property
     */
    addStage(defineBlock: AnimationStageDefinedBlock) {
        // get last stage of create a new one
        let lastStage = this.stageList[this.stageList.length - 1] || new AnimationStage(this.start)

        // make new property as last value
        let editProperty = new AnimationProperty(lastStage.property)

        // get offset take eidt property
        let offset = defineBlock(lastStage.offset, editProperty)

        // create new stage
        let stage = new AnimationStage(offset, editProperty)

        // find right index
        let index = this.stageList.findIndex(item => {
            return item.offset > offset
        })
        
        // insert into right index
        if (index == -1) {
            this.stageList.push(stage)  
            // update end offset 
            this.end = stage.offset
        } else {
            this.stageList.splice(index, 0, stage);
        }
    }

    upadte(offset: number) {
        // if (this.needRemove(offset)) {
        //     return
        // }

        // let index = this.range.findIndex((value) => {
        //     return offset - value < 0
        // })

        // index -= 1

        // let start = this.range[index]
        // let end = this.range[index + 1]

        // let ratio = (offset - start) / (end - start)

        // this.updateProperty(ratio, index)
    }

    needRemove(offset: number) {
        if (offset > this.end || offset < this.start) {
            return false
        } else {
            return true
        }
    }

    private updateProperty(ratio: number, start: number) {
        // let startProperty = this.properties[start];
        // let endProperty = this.properties[start + 1];
        // if (!startProperty || !endProperty) {
        //     return
        // }
        // let computProperties = endProperty.comput(startProperty, ratio);
        // computProperties.forEach((prop) => {
        //     this.element.style[prop.name] = prop.value
        // })
    }
}