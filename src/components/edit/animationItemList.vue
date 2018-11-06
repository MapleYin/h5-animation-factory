<!-- 
/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * To display each animation item
 *
 * @summary Animation item list components
 * @author Maple Yin <i@maple.im>
 *
 * Created at     : 2018-11-06 16:01:31 
 * Last modified  : 2018-11-06 17:41:46
 */    
 -->
<template>
    <section class="container">
        <AnimtionItemAdd class="plus" @add-item="addItem"></AnimtionItemAdd>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';
import AnimtionItemAdd from './AnimtionItemAdd.vue'


@Component({
    components: {
        AnimtionItemAdd
    }
})
export default class AnimationItemList extends Vue {

    @Emit()
    addItem(item: any) {
        return item
    }
}

</script>


<style scoped>
.container {
    background: #EBEEF5;
    position: relative;
}

.plus {
    position: absolute;
    right: 20px;
    top: 20px;
}
</style>
