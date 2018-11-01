<template>
    <section class="container"></section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import { PageScrollAnimate, IElementAnimateInit } from "./animation/pageScrollAnimate";

import * as PIXI from "pixi.js"

@Component
export default class LiveView extends Vue {
    @Prop() animateDefined!: IElementAnimateInit[]
    private pageScrollAnimate!: PageScrollAnimate

    @Watch('animateDefined')
    onChildChanged(val: IElementAnimateInit[], oldVal: IElementAnimateInit[]) { 
    }

    mounted() {
    }
}
</script>

<style scoped>

</style>