/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * A `pixi.js` implement of this animation, contain canvas item
 *
 * @summary A `pixi.js` implement
 * @author Maple Yin<i@maple.im>
 *
 * Created at     : 2018-11-02 15:39:42 
 * Last modified  : 2018-11-02 16:22:17
 */

import { AnimateItem, AnimationObject, AnimationProperty } from "./AnimateItem";
import * as PIXI from "pixi.js"
import { __read } from 'tslib';


/**
 * `pixi.js` animation object
 *
 * @export
 * @class CanvasAnimationItem
 * @extends {PIXI.DisplayObject}
 * @implements {AnimationObject}
 */
export class CanvasAnimationItem extends PIXI.DisplayObject implements AnimationObject {
    update(property: AnimationProperty) {
        this.x = property.x
        this.y = property.y
        this.scale.set(property.scale, property.scale)
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
     */
    private maxOffset = 0

    /**
     * Animation defined
     */
    readonly animateItems: AnimateItem<CanvasAnimationItem>[] = []

    /**
     * Display container
     */
    private app = new PIXI.Application({resolution: 2})

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
            this.maxOffset = Math.max(this.maxOffset, item.end)
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
     * @param item custom animation item
     */
    addAnimateItem(item: AnimateItem<CanvasAnimationItem>) {
        this.animateItems.push(item)
    }


    /**
     * Update animation offset
     * 
     * @param offset 
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
     * Update each animate item static
     * 
     * @param offset 
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

