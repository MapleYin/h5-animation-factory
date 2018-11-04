<template>
    <section class="container">
        <div class="front">
            <AnimationPageList class="page-list"></AnimationPageList>
            <AnimationItemList class="item-list"></AnimationItemList>
        </div>
        <div class="overlay">
            <AniamtionEdit class="item-edit"></AniamtionEdit>
        </div>
    </section>
</template>

<script lang="ts">

import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import AniamtionEdit from "./edit/AnimationEdit.vue";
import AnimationPageList from "./edit/AnimationPageList.vue";
import AnimationItemList from "./edit/AnimationItemList.vue";

import { 
    CanvasScrollAnimation, 
    CanvasAnimationItem
} from "./animation/CanvasScrollAnimate";
import { AnimateItem } from '@/components/animation/AnimateItem';
@Component({
    components: {
        AniamtionEdit,
        AnimationPageList,
        AnimationItemList
    }
})
export default class EditView extends Vue {
    private pageScrollAnimate!: CanvasScrollAnimation

    setupPageScrollAnimation(animation: CanvasScrollAnimation) {
        this.pageScrollAnimate = animation
    }

    addAnimationItem(item: AnimateItem<CanvasAnimationItem>) {
        this.pageScrollAnimate.addAnimateItem(item)
    }
}

</script>

<style scoped>

.container {
    position: relative;
    overflow: hidden;
}

.front {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
}

.page-list {
    width: 130px;
    border-right: solid 1px #B4B1B4;
    overflow-y: scroll;
}

.item-list {

}

.overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 100%;
    top: 0;
}

.item-edit {
    width: 80%;
    height: 100%;
}
</style>

