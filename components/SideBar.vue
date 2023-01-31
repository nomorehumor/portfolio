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
        },
        clickTag(tag) {
            this.closeSidebarPanel()
            this.$store.commit('setSearchText', tag)
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
        <transition name="backdrop"> <div class="sidebar-backdrop pointer-events-auto" @click="closeSidebarPanel" v-if="isPanelOpen"></div> </transition>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel overflow-y-auto">
                <p v-if="$fetchState.pending" class="font-bold">Loading....</p>
                <div class="p-2" v-else> 
                    <h1 class="text-3xl font-bold"> {{projectPage.title}} </h1>
                    <h2 class="text-l italic">{{projectPage.date}}</h2>
                    <div class="mt-6"><nuxt-content  :document="projectPage" /> </div>
                    <div class="mt-6"><span class="font-bold">Tags:</span> <ul class="inline-block text-base"><li class="bg-[#2f2f2f] hover:bg-[#9f9f9f] hover:cursor-pointer rounded-full px-2 inline-block ml-3 mt-3" v-for="tag in projectPage.tags" @click="clickTag(tag)">{{tag}} </li></ul></div>
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
    background-color: #171717;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 500px;
}
</style>
