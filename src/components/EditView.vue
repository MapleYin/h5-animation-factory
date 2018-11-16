<template>
    <section class="container">
        <AnimationTimeline class="time-line" :items-range="animationCreateManager.timeLineItemList" @offset-changed="updateOffset"></AnimationTimeline>
        <AnimtionItemAdd class="plus" @add-item="addItem"></AnimtionItemAdd>
    </section>
</template>

<script lang="ts">

import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';

import AnimtionItemAdd from '@/components/edit/AnimtionItemAdd.vue'
import AnimationTimeline from '@/components/edit/timeline/AnimationTimeline.vue'
import { 
    CanvasScrollAnimation, 
    CanvasAnimationItem
} from "./animation/CanvasScrollAnimate";

import { AnimationCreateManager } from '@/components/edit/AnimationCreateManager'

@Component({
    components: {
        AnimtionItemAdd,
        AnimationTimeline
    }
})
export default class EditView extends Vue {

    private animationCreateManager = new AnimationCreateManager()

    setupPageScrollAnimation(animation: CanvasScrollAnimation) {
        this.animationCreateManager.setup(animation)
    }

    addItem(itemList: string[]) {
        this.animationCreateManager.addItem(itemList)
    }

    updateOffset(offsetRatio: number) {
        this.animationCreateManager.updateOffset(offsetRatio)
    }

}

</script>

<style scoped>

.container {
    position: relative;
    overflow: hidden;
}
.plus {
    position: absolute;
    right: 20px;
    top: 20px;
}

.time-line {
    height: 100%;
}
</style>