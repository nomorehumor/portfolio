<script>
export default {
    computed: {
        projectsType: {
            get () {
                return this.$store.state.filters.type
            },
            set (type) {
                this.$store.commit('setTypeFilter', type)
            }
        }
    },
}
</script>

<template>
<div>
    <div class="text-white text-sm font-regular items-center flex justify-between">
        <input type="radio" id="allProjectFilter" name="projectsType" value="" class="w-4 h-4 accent-zinc-600 border border-zinc-600 rounded-full bg-zinc-800" v-model="projectsType"> 
        <label for="allProjectFilter" class="cursor-pointer ml-2">All</label>

        <input type="radio" id="studyProjectFilter" name="projectsType" value="study" class="w-4 h-4 ml-5 accent-zinc-700 border-zinc-700" v-model="projectsType">
        <label for="studyProjectFilter" class="cursor-pointer ml-2" >Study</label>

        <input type="radio" id="workProjectFilter" name="projectsType" value="work" class="w-4 h-4 ml-5 accent-zinc-700 border-zinc-700" v-model="projectsType">
        <label for="workProjectFilter" class="cursor-pointer ml-2" >Work</label>
        
        <input type="radio" id="personalProjectFilter" name="projectsType" value="personal" class="w-4 h-4 ml-5 accent-zinc-700 border-zinc-700" v-model="projectsType">
        <label for="personalProjectFilter" class="cursor-pointer ml-2" >Personal</label>
    </div>
    <!-- <div>

    </div> -->
</div>

</template>

<style>

</style>