<template>
    <section>
        <AnimationPageList></AnimationPageList>
        <AniamtionEdit></AniamtionEdit>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import AniamtionEdit from "./edit/animationEdit.vue";
import AnimationPageList from "./edit/animationPageList.vue";

@Component({
    components: {
        AniamtionEdit,
        AnimationPageList
    }
})
export default class EditView extends Vue {

}

</script>

<style scoped>

</style>

