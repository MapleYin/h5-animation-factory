<template>
    <div>
        <el-button icon="el-icon-plus" circle @click="dialogVisible = true"></el-button>
        <el-dialog title="添加元素" width="80%" :visible.sync="dialogVisible" @opened="opened" @close="close">
            <el-container class="image-list" v-loading="loading">
                <!-- <el-upload action="" 
                    list-type="picture-card" 
                    multiple 
                    :file-list="imageList"
                    :http-request="uploadFiles" >
                    <i class="el-icon-plus"></i>
                </el-upload> -->
                <section class="items">
                    <div class="item" v-for="(item, index) in imageList" v-bind:key="item.url" @click="selectedItem(index)">
                        <img :src="item.url" :alt="item.name">
                    </div>
                </section>
                <!-- <el-pagination class="pagination" 
                    :page-size="pageSize" 
                    layout="prev, pager, next" 
                    :total="dataList.length"
                    v-on:current-change="pageChange">
                </el-pagination> -->
            </el-container>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addItem()">添 加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';
import { ResourceManager, ImageItem } from '../resourceManager/ResourceManager'

const resourceManager = new ResourceManager()

@Component
export default class AnimationItemAdd extends Vue {
    dialogVisible: boolean = false
    loading = false

    imageList: ImageItem[] = []
    dataList: ImageItem[] = []
    pageSize: number = 20

    private currentSelectedItem: ImageItem[] = []


    private opened() {
        this.loading = true
        resourceManager.fileList().then((res)=>{
            this.loading = false
            this.dataList = res
            this.imageList = res.map(item=>{
                return {
                    url : `${item.url}_thumbnail`,
                    name: item.name
                }
            })
            // this.pageChange(1)
        }).catch(err=>{
            this.loading = false
            this.$message.error('图片列表获取错误');
        })
    }


    private uploadFiles(event: any) {
        console.log(event)
        let file = event.file as File
        resourceManager.upload(file).then((res)=>{
            this.imageList.push(res)
        }).catch((err: any)=>{
            this.$message.error('上传图片错误');
        })
    }

    private pageChange(page: number) {
        let startIndex = (page - 1) * this.pageSize
        let endIndex = startIndex + this.pageSize
        this.imageList = this.dataList.slice(startIndex, endIndex)
    }

    private selectedItem(index: number) {
        let item = this.dataList[index]
        this.currentSelectedItem.push(item)
    }

    @Emit()
    private addItem() {
        this.dialogVisible = false
        return this.currentSelectedItem
    }

    private close() {
        this.currentSelectedItem = []
        this.dataList = []
        this.imageList = []
    }
}

</script>


<style scoped>
.image-list {
    display: flex;
    flex-direction: column;
}


.items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    height: 400px;
    overflow-y: scroll;
}

.item {
    flex-basis: 18%;
    border: solid 1px #ccc;
    box-sizing: border-box;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;
    border-radius: 3px;
    height: 100px;
    cursor: pointer;
}

</style>
