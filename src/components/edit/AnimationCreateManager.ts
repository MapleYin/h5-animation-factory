import {CanvasScrollAnimation, CanvasAnimationItem} from '../animation/CanvasScrollAnimate'
import * as PIXI from "pixi.js"


const Loader = PIXI.loader
const Resources = Loader.resources

export class AnimationCreateManager {

    private scrollAnimation!: CanvasScrollAnimation

    timeLineItemList: object[] = []

    constructor() {
        // document.addEventListener('contextmenu', function(e) {
        //     alert("You've tried to open context menu"); //here you draw your own menu
        //     e.preventDefault();
        // }, false);
    }

    setup(scrollAnimation: CanvasScrollAnimation) {
        this.scrollAnimation = scrollAnimation
    }

    /**
     * Add new item (IMAGE ONLY)
     * TODO:
     *   - Text, Figure support
     *   - Edit image (clip...)
     * 
     * @param {(string | string[])} url 
     * 
     * @memberOf AnimationCreateManager
     */
    addItem(url: string | string[]) {
        if (typeof url == 'string') {
            url = [url]
        }
        this.loadSourceIfNeeded(url).then(res => {
            res.forEach( url => {
                let item = this.createItem(url)
                if (item) {
                    this.scrollAnimation.addAnimationItem(item)
                    this.updateTimeLineItem()
                }
            })
        })
    }

    updateTimeLineItem() {
        let maxOffset = this.scrollAnimation.maxOffset
        let timeLineItemList: any[] = []
        this.scrollAnimation.animateItems.forEach(item => {
            let timeLine: any[] = []
            let start: number
            item.stageList.forEach(stage => {
                if (start != undefined) {
                    timeLine.push({
                        start: ~~(start / maxOffset * 100),
                        length: ~~((stage.offset - start) / maxOffset * 100)
                    })
                }
                start = stage.offset
            })
            timeLineItemList.push(timeLine)
        })

        this.timeLineItemList = timeLineItemList
    }

    updateItem(atIndex: number, operation: any) {
        let item = this.scrollAnimation.animateItems[atIndex]

    }


    updateOffset(offsetRatio: number) {
        let offset = ~~(this.scrollAnimation.maxOffset * offsetRatio)
        this.scrollAnimation.updateOffet(offset)
    }


    private loadSourceIfNeeded(urls: string[]): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let needCacheList = urls.filter(url => {
                return Resources[url] == undefined
            });
            if (needCacheList.length) {
                Loader.add(needCacheList, {
                    loadType: PIXI.loaders.Resource.LOAD_TYPE.IMAGE,
                    xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BLOB
                }).load(() => {
                    resolve(urls)
                })
            } else {
                resolve(urls)
            }
        })
    }

    private createItem(url: string): CanvasAnimationItem | null {
        let resource = Resources[url]
        if (resource) {
            let canvasAnimationItem = new CanvasAnimationItem(resource.texture, 2)
            this.bindMoveEvent(canvasAnimationItem)
            return canvasAnimationItem
        } else {
            return null
        }
        
    }

    private bindMoveEvent(item: PIXI.DisplayObject) {
        item.interactive = true

        let startMove = false

        item.on('mousedown', event => {
            startMove = true
            item.alpha = 0.5
        })

        item.on('mousemove', event => {
            if (startMove) {
                let originalEvent = event.data.originalEvent as PointerEvent
                item.x += originalEvent.movementX
                item.y += originalEvent.movementY
            }
        })

        item.on('mouseupoutside', event => {
            startMove = false
            item.alpha = 1
        })
        item.on('mouseup', event => {
            startMove = false
            item.alpha = 1
        })
    }
}