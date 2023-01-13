<script>

export default {
    methods: {
        showProjectInfo(projectName) {
            this.projectInfoVisible = true;
            this.highlightedProject = projectName;
        },
        closeProjectInfo() {
            this.projectInfoVisible = false;
        },
        openDetails(projectPath) {
            this.$store.commit('toggleNav')
            this.$store.commit('setSelectedProjectPath', projectPath)
        }
    },
  data() {
    return {
      projectInfoVisible: false,
      highlightedProject: "",
      techs: []
    }
  },

    async fetch() {
        const techsInfos = await this.$content('techs', {deep:true}).where({ slug: 'tech' }).fetch()
        var techs = []
        for (let id1 = 0; id1 < techsInfos.length; id1++) {
            const projects = await this.$content(techsInfos[id1].dir).where({slug: {$ne: 'tech'}}).only(['title', 'tags', 'path']).fetch()
            var techProjects = []
            for (let id = 0; id < projects.length; id++) {
                techProjects.push({id: id, name: projects[id].title, path: projects[id].path})
            }
            techs.push({techId: id1, name: techsInfos[id1].name, color: techsInfos[id1].color, projects: techProjects})
        }
        this.techs = techs
    } 

}

</script>

<template>
<div class="diagram-container grid place-items-center w-80 aspect-square">
    <ProjectQuickInfo v-if="projectInfoVisible" :text="highlightedProject"></ProjectQuickInfo>
    <div class="circle absolute border-2 border-rose-500 w-64 aspect-square rounded-full"></div>
    <div v-for="tech in techs" :key="tech.techId" class="tech absolute w-96 aspect-square grid place-items-center pointer-events-none" :style="{'--r': 25*tech.techId + 'deg'}">
        <div class="tech-name absolute text-center mb-56 text-xs w-full"><p>{{tech.name}}</p></div>
        <div v-for="project in tech.projects" 
            @click="openDetails(project.path)" 
            class="project-block cursor-pointer absolute rounded-lg inline-grid justify-center w-11 h-4 z-40 pointer-events-auto" 
            :style="{'--w':-17 - 3*project.id  +'vh', 'background-color': tech.color}" 
            @mouseenter="showProjectInfo(project.name)" 
            @mouseleave="closeProjectInfo">
        </div>
    </div>
</div>
</template>


<style scoped>
.project-block {
    transform: translate(0, var(--w));
    transition: 0.1s;
}

.project-block:hover {
    transform: translate(0, var(--w)) scale(1.2);
}

.tech {
    transform: rotate(var(--r));
}

</style>