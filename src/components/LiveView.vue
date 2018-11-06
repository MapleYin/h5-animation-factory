<template>
    <section class="container">
        <div class="warppar" ref="warppar"></div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import {
    CanvasScrollAnimation, 
    CanvasAnimationItem
} from "./animation/CanvasScrollAnimate";

@Component
export default class LiveView extends Vue {
    readonly pageScrollAnimate: CanvasScrollAnimation

    constructor() {
        super()
        this.pageScrollAnimate = new CanvasScrollAnimation()
    }


    mounted() {
        this.pageScrollAnimate.start(this.$refs['warppar'] as HTMLElement)
    }
}
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}
.warppar {
    width: 375px;
    height: 667px;
}
</style>