<script>
export default {
    methods: {
        closeSidebarPanel() { 
            this.$store.commit('toggleNav')
        }
    },
    computed: {
        isPanelOpen() {
            return this.$store.state.isNavOpen
        }
    }
}
</script>

<template>
    <div class="sidebar">
        <transition name="backdrop"> <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div> </transition>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active
{
    transition: transform 0.2s ease;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    transition: all 150ms ease-in 0s
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
    width: 300px;
}
</style>
