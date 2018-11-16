<template>
    <section class="container">
        <h1>Time Line <span>Offset: 0</span></h1>
        <section class="time-line-edit">
            <section class="time-line">
                <AnimationTimelineItem class="item" 
                    v-for="(item, index) in itemsRange" 
                    :range="item" 
                    v-bind:key="index">
                </AnimationTimelineItem>
            </section>
            <section class="full-time-line" ref="fullTimeLine"></section>
            <div class="reference-line" :style="`left:${referenceLineX}px`"></div>
        </section>
        
    </section>
</template>

<script lang="ts">

import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';
import AnimationTimelineItem from './AnimationTimelineItem.vue'

@Component({
    components: {
        AnimationTimelineItem
    }
})
export default class AnimationTimeline extends Vue {

    @Prop() itemsRange!: object[]

    private referenceLineX: number = 0
    private fullTimeAreaWidth: number = 0
    @Watch('referenceLineX')
    onReferenceLineXChanged(val: number, oldVal: number) {
        this.offsetChanged()
    }

    @Emit()
    offsetChanged() {
        return Math.max(0, Math.min(this.referenceLineX / this.fullTimeAreaWidth, 1))
    }

    mounted() {
        this.bindEvent()
    }

    private bindEvent() {
        let fullTimeLine = this.$refs['fullTimeLine'] as HTMLElement

        let start = false
        fullTimeLine.addEventListener('mousedown', event => {
            this.referenceLineX = event.layerX
            this.fullTimeAreaWidth = fullTimeLine.clientWidth
            start =  true
        })
        document.addEventListener('mousemove', event => {
            if (start) {
                this.referenceLineX += event.movementX
            }
        })
        document.addEventListener('mouseup', event => {
            start = false
        })

        // this.$el.addEventListener('mousewheel', event => {
        //     if (!event.ctrlKey) return
        //     event.preventDefault()
        //     event.stopImmediatePropagation()
        //     console.log(event)
        // });

    }

}

</script>


<style scoped>

.container {
    display: flex;
    flex-direction: column;
    position: relative;
}

.time-line-edit {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
}

.time-line {
    flex-grow: 1;
}

.item {
    height: 15px;
    margin-bottom: 10px;
}

.full-time-line {
    height: 30px;
    background: #6DB2F8;
    cursor: crosshair;
}

.reference-line {
    position: absolute;
    height: 100%;
    width: 1px;
    background: #F56C6C;
    top: 0;
    left: 0;
    cursor: crosshair;
}

</style>
