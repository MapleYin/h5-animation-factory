<template>
    <section class="container">
        <div class="split" v-for="(item, index) in range" v-bind:key="index" :style="`left:${item.start}%;width:${item.length}%;`">
        
        </div>
    </section>
</template>

<script lang="ts">

import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';

@Component
export default class AnimationTimelineItem extends Vue {

    @Prop() range!: object[]

    constructor() {
        super()
        
    }
}

</script>


<style scoped>

.container {
    position: relative;
    border: solid 1px #DCDFE6;
    cursor: pointer;
}

.split {
    position: absolute;
    height: 100%;
    background: #409EFF;
    top: 0;
}

</style>
