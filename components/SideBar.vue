<script>
export default {
    data() {
        return {
            projectPage: {}
        }
    },
    methods: {
        closeSidebarPanel() { 
            this.$store.commit('toggleNav')
        }
    },
    computed: {
        isPanelOpen() {
            return this.$store.state.isNavOpen
        },
    },
    watch: {
        '$store.state.selectedProjectPath': '$fetch'
    },
    async fetch() {
        this.projectPage = await this.$content(this.$store.state.selectedProjectPath).fetch()
    }
}
</script>



<template>
    <div class="sidebar">
        <transition name="backdrop"> <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div> </transition>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel overflow-y-auto">
                <p v-if="$fetchState.pending" class="font-bold">Loading....</p>
                <div class="p-2" v-else> 
                    <h1 class="text-3xl font-bold"> {{projectPage.title}} </h1>
                    <div class="mt-6"><nuxt-content  :document="projectPage" /> </div>
                    <div class="mt-6">Tags: <ul class="inline-block"><li class="font-bold inline-block ml-3" v-for="tag in projectPage.tags">{{tag}} </li></ul></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active
{
    transition: transform 0.3s ease;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    transition: all 300ms ease-in 0s
}

.sidebar-backdrop {
    opacity: 1;
    background-color: rgba(255, 255, 255, .1);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.backdrop-enter-from,
.backdrop-leave-to {
    transition: opacity 0.5s ease;
    opacity: 0;
}

.sidebar-panel {
    overflow-y: auto;
    background-color: #130f40;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 500px;
}
</style>
