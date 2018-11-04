<template>
    <aside class="container">
        <section class="item" v-bind:class="{ active: selectedIndex == index }" v-for="(item, index) in pageList" :key="item.previewUrl">
            <span class="index">{{index + 1}}</span>
            <div class="preview">
                <img :src="item.previewUrl">
            </div>
        </section>
    </aside>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { AnimationPage } from "./AnimationPage";

@Component
export default class AnimationPageList extends Vue {
    @Prop() pageList = [{
        previewUrl: ""
    }, {
        previewUrl: ""
    }, {
        previewUrl: ""
    }]

    private selectedIndex: number = 0
}

</script>


<style scoped>
.container {
    background: #F7F3F2;
}

.item {
    padding: 5px 10px 5px 0;
    position: relative;
    display: flex;
    align-items: flex-end;
}

.item.active {
    background-color: #4696F7;
}

.index {
    text-align: right;
    padding: 0 5px;
    width: 15px;
    font-size: 12px;
}

.active .index {
    color: white;
}

.preview {
    border: solid 2px #fff;
    box-shadow: 0 0 1px #333;
    height: 60px;
    background-color: #F7F3F2;
    flex-grow: 1;
    border-radius: 3px;
}

.active .preview {
    border-color: #FFE24F;
}
</style>
