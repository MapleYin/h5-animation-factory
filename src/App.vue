<template>
    <section id="app">
        <LiveView class="live-view" :animateDefined="animateDefined"></LiveView>
        <EditView class="edit-view"></EditView>
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
    private animateDefined: string[] = []
    
    mounted() {
    }
}
</script>

<style>

#app {
    display: flex;
    justify-content: stretch;
}

.live-view {
    width: 375px;
    height: 667px;
    border: solid 1px #cccccc;
    flex-grow: 0;
    flex-shrink: 1;
}

.edit-view {
    flex-grow: 1;
}
 

</style>
