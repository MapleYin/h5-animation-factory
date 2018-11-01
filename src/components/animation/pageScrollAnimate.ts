import { AnimateItem } from "./AnimateItem";
export { IElementAnimateInit } from "./AnimateItem";
import * as PIXI from "pixi.js"

export class PageScrollAnimate {

    private currentOffset = 0
    private maxOffset = 0

    private animateElements: AnimateItem[] = []

    private app = new PIXI.Application({
        resolution: 2
    })

    constructor(containerElement: HTMLElement) {
        this.app.renderer.autoResize = true;
        this.app.renderer.resize(containerElement.clientWidth, containerElement.clientHeight);
        containerElement.appendChild(this.app.view);
    }

    init(elemAnimationList: AnimateItem[]) {
        this.animateElements = elemAnimationList
    }



    private scrollOffset(offset: number) {
        this.currentOffset = offset;
        if (this.currentOffset < 0) {
            this.currentOffset = 0
        } else if (this.currentOffset > this.maxOffset) {
            this.currentOffset = this.maxOffset
        }
        this.updateAnimateElement(this.currentOffset)
    }

    private updateAnimateElement(currentOffet: number) {
        this.animateElements.forEach( elemAnimate => {
            
        })
    }

}