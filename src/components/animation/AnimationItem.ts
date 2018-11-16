/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * An animation item
 *
 * @summary An animation item
 * @author Maple Yin<i@maple.im>
 *
 * Created at     : 2018-11-02 15:36:48 
 * Last modified  : 2018-11-07 18:36:32
 */

import { AnimationStage } from "./AnimationStage";
import { AnimationProperty } from "./AnimationProperty";

export * from "./AnimationProperty";

type AnimationStageDefinedBlock = (lastOffset: number, editProperty: AnimationProperty) => number;


export interface AnimationObject {
    update(property: AnimationProperty): void
}


/**
 * An animation item
 *
 * @export
 * @class AnimateItem
 * @template T
 */
export class AnimationItem<T extends AnimationObject> {

    /**
     * An animation object
     *
     * @type {T : AnimationObject} confirm to `AnimationObject`
     * @memberof AnimateItem
     */
    readonly item: T

    
    /**
     * Animation stage of this animation item
     *
     * @type {AnimationStage[]} animation stage
     * @memberof AnimateItem
     */
    readonly stageList: AnimationStage[] = []

    private _start: number = 0

    /**
     * Start offset of this animation item
     *
     * @readonly
     * @memberof AnimateItem
     */
    get start() {
        return this._start
    }

    private _end: number = 0

    /**
     * End offset of this animation item
     *
     * @readonly
     * @memberof AnimateItem
     */
    get end() {
        return this._end
    }

    isRemoved: boolean = true

    /**
     *Creates an instance of AnimateItem.
     * @param {T} item
     * @param {number} [startIndex=0]
     * @memberof AnimateItem
     */
    constructor(item: T, startIndex: number = 0) {
        this.item = item;

        // create default stage
        this.addStage((lastOffset, editProperty)=>{
            return startIndex
        });
        this.addStage((lastOffset, editProperty) => {
            return lastOffset + 300
        })
    }

    /**
     * create new animate stage
     *
     * @param {AnimationStageDefinedBlock} defineBlock make change of property
     * @memberof AnimateItem
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
            this._end = stage.offset
        } else {
            this.stageList.splice(index, 0, stage);
        }
    }

    /**
     * Update current property
     *
     * @param {number} offset
     * @memberof AnimateItem
     */
    upadte(offset: number) {

        if (this.needRemove(offset)) {
            return
        }

        let index = this.stageList.findIndex((stage) => {
            return offset < stage.offset 
        })

        index -= 1

        let startStage = this.stageList[index]
        let endStage = this.stageList[index + 1]

        let property = startStage.to(endStage, offset)

        // apply to item
        this.item.update(property)
    }

    
    /**
     * Check if need remove
     *
     * @param {number} offset current offset
     * @returns {boolean} need remove
     * @memberof AnimateItem
     */
    needRemove(offset: number): boolean {
        if (offset > this.end || offset < this.start) {
            return true
        } else {
            return false
        }
    }


    editStage(atIndex: number) {
        let stage = this.stageList[atIndex]
    }
}