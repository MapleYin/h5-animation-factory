<template>
    <el-popover placement="bottom">
        <div class="item-type-list">
            <el-button plain>文字</el-button>
            <el-button plain>图片</el-button>
            <el-button plain>形状</el-button>
        </div>
        <el-button slot="reference" icon="el-icon-plus" circle></el-button>
    </el-popover>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

export default class AnimationItemAdd extends Vue {

}

</script>


<style scoped>
.item-type-list {

}
</style>
