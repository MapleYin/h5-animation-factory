<template>
    <section class="container"></section>
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
        this.pageScrollAnimate.start(this.$el)
    }
}
</script>

<style scoped>

</style>