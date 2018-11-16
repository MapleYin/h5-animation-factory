<!-- 
/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * Animation Page Component
 *
 * @summary Animation Page Component
 * @author Maple Yin <i@maple.im>
 *
 * Created at     : 2018-11-06 15:59:25 
 * Last modified  : 2018-11-06 22:13:22
 */    
 -->
<template>
    <aside class="container">
        <section class="item" 
        v-bind:class="{ active: selectedIndex == index }" 
        v-on:click="selectedPage(index)"
        v-for="(item, index) in pageList" 
        :key="index" >
            <span class="index">{{index + 1}}</span>
            <i class="el-icon-setting setting" @click="editPage"></i>
            <div class="preview">
                <img :src="item.url" height="100%">
            </div>
        </section>
    </aside>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';
import AnimationPageEdit from './AnimationPageEdit.vue'

@Component({
    components: {
        AnimationPageEdit
    }
})
export default class AnimationPageList extends Vue {
    @Prop() pageList!:any[]

    private selectedIndex: number = 0

    @Emit('page-selected')
    private selectedPage(index: number) {
        this.selectedIndex = index
        return index
    }

    editPage() {

    }
}

</script>


<style scoped>
.container {
    background: #F2F6FC;
}

.item {
    padding: 5px 10px 5px 0;
    position: relative;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
}

.item.active {
    background-color: #409EFF;
}

.item .setting {
    position: absolute;
    left: 5px;
    top: 8px;
    cursor: pointer;
    color: #fff;
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
    box-shadow: 0 0 5px #aaa;
    height: 60px;
    background-color: #909399;
    flex-grow: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.active .preview {
    border-color: #FFE24F;
}
</style>
