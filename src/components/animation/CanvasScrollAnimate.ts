/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * A `pixi.js` implement of this animation, contain canvas item
 *
 * @summary A `pixi.js` implement
 * @author Maple Yin<i@maple.im>
 *
 * Created at     : 2018-11-02 15:39:42 
 * Last modified  : 2018-11-07 16:55:03
 */

import { AnimationItem, AnimationObject, AnimationProperty } from "./AnimationItem";
import * as PIXI from "pixi.js"


/**
 * `pixi.js` animation object
 *
 * @export
 * @class CanvasAnimationItem
 * @extends {PIXI.DisplayObject}
 * @implements {AnimationObject}
 */
export class CanvasAnimationItem extends PIXI.Sprite implements AnimationObject {

    private resolution: number

    constructor(texture: PIXI.Texture, resolution: number = 1) {
        super(texture)
        this.resolution = resolution
        this.scale.set(1 / resolution)
    }
        
    update(property: AnimationProperty) {
        this.x = property.x
        this.y = property.y
        this.scale.set(property.scale / this.resolution)
        this.alpha = property.alpha
        this.rotation = property.rotate
    }
}


/**
 * `pixi.js` animation implement
 *
 * @export
 * @class CanvasScrollAnimate
 */
export class CanvasScrollAnimation {

    /**
     * Animation max offset
     * 
     * @readonly
     * @type {number}
     * @memberOf CanvasScrollAnimation
     */
    get maxOffset() : number {
        return this._maxOffset
    }
    private _maxOffset = 0
    

    
    /**
     * Animation current offset
     * 
     * @private
     * 
     * @memberOf CanvasScrollAnimation
     */
    private currentOffset = 0


    /**
     * Animation defined
     * 
     * @type {AnimateItem<CanvasAnimationItem>[]}
     * @memberOf CanvasScrollAnimation
     */
    readonly animateItems: AnimationItem<CanvasAnimationItem>[] = []

    
    /**
     * Display container
     * 
     * @private
     * 
     * @memberOf CanvasScrollAnimation
     */
    private app = new PIXI.Application({resolution: 2})


    /**
     * Creates an instance of CanvasScrollAnimation.
     * 
     * @memberOf CanvasScrollAnimation
     */
    constructor() {
        this.app.renderer.autoResize = true;
    }

    
    /**
     * Start when resources are ready
     *
     * @memberof CanvasScrollAnimate
     */
    start(containerElement: HTMLElement) {
        this.animateItems.forEach(item => {
            this._maxOffset = Math.max(this.maxOffset, item.end)
        })
        
        this.resize(containerElement.clientWidth, containerElement.clientHeight)
        containerElement.appendChild(this.app.view);
        this.app.ticker.start()
    }


    /**
     * Resize canvas size
     *
     * @param {number} width
     * @param {number} height
     * @memberof CanvasScrollAnimate
     */
    resize(width: number, height: number) {
        this.app.renderer.resize(width, height);
    }


    /**
     * Add new animation item
     * 
     * @param {CanvasAnimationItem} item 
     * @param {number} [offset=this.currentOffset] 
     * 
     * @memberOf CanvasScrollAnimation
     */
    addAnimationItem(item: CanvasAnimationItem, offset: number = this.currentOffset) {
        let animationItem = new AnimationItem(item, offset)
        this._maxOffset = Math.max(this._maxOffset, animationItem.end)
        this.animateItems.push(animationItem)
        this.updateOffet(this.currentOffset)
    }


    /**
     * Update animation offset
     * 
     * @param {number} offset 
     * 
     * @memberOf CanvasScrollAnimation
     */
    updateOffet(offset: number) {
        if (offset < 0) {
            offset = 0
        } else if (offset > this.maxOffset) {
            offset = this.maxOffset
        }
        this.updateAnimateItem(offset)
    }


    /**
     * Screen Short at this offset
     * 
     * @param {number} [atOffset=0] 
     * @returns {string} Base 64 string
     * 
     * @memberOf CanvasScrollAnimation
     */
    screenShort(atOffset: number = 0): string {
        this.updateOffet(atOffset)
        return this.app.renderer.extract.base64()
    }


    /**
     * Update each animate item static
     * 
     * @private
     * @param {number} offset 
     * 
     * @memberOf CanvasScrollAnimation
     */
    private updateAnimateItem(offset: number) {
        this.animateItems.forEach(elemAnimate => {
            if (!elemAnimate.isRemoved) {
                if (elemAnimate.needRemove(offset)) {
                    this.app.stage.removeChild(elemAnimate.item)
                    elemAnimate.isRemoved = true
                } else {
                    elemAnimate.upadte(offset)
                }
            } else if (!elemAnimate.needRemove(offset)) {
                this.app.stage.addChild(elemAnimate.item)
                elemAnimate.isRemoved = false
            }
        })
    }
}

