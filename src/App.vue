<template>
    <section id="app">
        <LiveView class="live-view" ref="LiveView"></LiveView>
        <EditView class="edit-view" ref="EditView"></EditView>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LiveView from "./components/LiveView.vue";
import EditView from "./components/EditView.vue";

@Component({
    components: {
        LiveView,
        EditView
    }
})
export default class App extends Vue {
    mounted() {
        let liveView = this.$refs['LiveView'] as LiveView
        let editView = this.$refs['EditView'] as EditView
        editView.setupPageScrollAnimation(liveView.pageScrollAnimate)
    }
}
</script>

<style>

html, body {
    margin: 0;
    height: 100%;
    width: 100%;
}

#app {
    display: flex;
    justify-content: stretch;
    height: 100%;
}

.live-view {
    width: 375px;
    flex-grow: 0;
    flex-shrink: 1;
    padding: 10px;
}

.edit-view {
    flex-grow: 1;
}
 

</style>
