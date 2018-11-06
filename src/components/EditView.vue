<template>
    <section class="container">
        <div class="front">
            <AnimationPageList class="page-list" @page-selected="pageSelected" :pageList="pageList"></AnimationPageList>
            <AnimationItemList class="item-list" @add-item="addAnimationItem"></AnimationItemList>
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
import { AnimationItem } from '@/components/animation/AnimationItem';

@Component({
    components: {
        AniamtionEdit,
        AnimationPageList,
        AnimationItemList
    }
})
export default class EditView extends Vue {
    private pageScrollAnimate!: CanvasScrollAnimation
    private pageList: any[]= []

    setupPageScrollAnimation(animation: CanvasScrollAnimation) {
        this.pageScrollAnimate = animation
        let url = this.pageScrollAnimate.screenShort()
        this.pageList.push({
            url: url
        })
    }

    addAnimationItem(itemList: any[]) {
        itemList.forEach(item => {
            this.pageScrollAnimate.addAnimationItem(item.url).then(()=>{
                this.pageScrollAnimate.updateOffet(0)
            })
        })
        
    }

    pageSelected(index: number) {
        console.log(index);
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
    flex-grow: 1;
}

.overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 100%;
    top: 0;
    transition: left 1.5s;
}

.overlay.active {
    left: 0;
}

.item-edit {
    width: 80%;
    height: 100%;
}
</style>

