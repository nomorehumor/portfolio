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
        <input id="allProjectFilter" v-model="projectsType" type="radio" name="projectsType" value="" class="w-4 h-4 accent-zinc-600 border border-zinc-600 rounded-full bg-zinc-800"> 
        <label for="allProjectFilter" class="cursor-pointer font-bold ml-2">All</label>

        <input id="studyProjectFilter" v-model="projectsType" type="radio" name="projectsType" value="study" class="w-4 h-4 ml-5 accent-zinc-700 border-zinc-700">
        <label for="studyProjectFilter" class="cursor-pointer ml-2" >Study</label>

        <input id="workProjectFilter" v-model="projectsType" type="radio" name="projectsType" value="work" class="w-4 h-4 ml-5 accent-zinc-700 border-zinc-700">
        <label for="workProjectFilter" class="cursor-pointer ml-2" >Work</label>
        
        <input id="personalProjectFilter" v-model="projectsType" type="radio" name="projectsType" value="personal" class="w-4 h-4 ml-5 accent-zinc-700 border-zinc-700">
        <label for="personalProjectFilter" class="cursor-pointer ml-2" >Personal</label>
    </div>
    <!-- <div>

    </div> -->
</div>

</template>

<style>

</style>