<script>
export default {

}
</script>

<template>

<div class="text-white text-sm font-semibold align-middle flex justify-between ">
    <input type="radio" id="studyProjectFilter" name="projectType" value="" class="w-4 h-4">
    <label for="studyProjectFilter" class="cursor-pointer">All</label>
    <input type="radio" id="studyProjectFilter" name="projectType" value="study" class="w-4 h-4">
    <label for="studyProjectFilter" class="cursor-pointer">Study</label>
    <input type="radio" id="workProjectFilter" name="projectType" value="work" class="w-4 h-4">
    <label for="workProjectFilter">Work</label>
</div>

</template>