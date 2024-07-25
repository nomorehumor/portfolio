<script>
export default {
    data() {
        return {
            projectPage: {}
        }
    },
    async fetch() {
        this.projectPage = await this.$content(this.$store.state.selectedProjectPath).fetch()
    },
    computed: {
        isPanelOpen() {
            return this.$store.state.isNavOpen
        },
    },
    watch: {
        '$store.state.selectedProjectPath': '$fetch'
    },
    methods: {
        closeSidebarPanel() { 
            this.$store.commit('toggleNav')
        },
        clickTag(tag) {
            this.closeSidebarPanel()
            this.$store.commit('setSearchText', tag)
        }
    }
}
</script>



<template>
    <div class="sidebar">
        <transition name="backdrop"> <div v-if="isPanelOpen" class="sidebar-backdrop pointer-events-auto" @click="closeSidebarPanel"></div> </transition>
        <transition name="slide">
            <div
                v-if="isPanelOpen"
                class="sidebar-panel bg-neutral-900	overflow-y-auto">
                <p v-if="$fetchState.pending" class="font-bold">Loading....</p>
                <div v-else class="p-2"> 
                    <h1 class="text-3xl font-bold px-6"> {{ projectPage.emoji }} {{projectPage.title}} </h1>
                    <h2 class="text-l italic px-6">{{projectPage.date}}</h2>
                    <div class="mt-6 px-6"><nuxt-content  :document="projectPage" /> </div>
                    <div class="mt-6 p-4 rounded-3xl bg-neutral-800">
                        <div class="font-bold text-lg">Tags:</div> 
                        <ul class="flex flex-wrap text-base gap-x-3 gap-y-3 mt-3"> 
                            <li v-for="tag in projectPage.tags" class="bg-neutral-700 hover:bg-[#9f9f9f] hover:cursor-pointer rounded-full px-2 inline-block" @click="clickTag(tag)">{{tag}} </li>
                        </ul>
                    </div>
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
    /* background-color: #171717; */
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 500px;
}

.nuxt-content {
    font-weight: 100;
}

</style>
