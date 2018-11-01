<template>
    <aside>
        <section v-for="item in pageList" :key="item.previewUrl">
            <img :src="item.previewUrl">
        </section>
    </aside>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import AnimationPage from "./animationPage";

@Component
export default class AnimationPageList extends Vue {
    @Prop() pageList!: AnimationPage[]
}


</script>


<style scoped>

</style>
