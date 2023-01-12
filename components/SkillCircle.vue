<script>

export default {
    methods: {
        showProjectInfo() {
            this.projectInfoVisible = true;
        },
        closeProjectInfo() {
            this.projectInfoVisible = false;
        },
        openDetails() {
            this.$store.commit('toggleNav')
        }
    },

  data() {
    return {
      projectInfoVisible: false,
      techs: [
        {
          techId: 0,
          name: "name",
          color: "red",
          projects: [
            {
              id: 0,
              name: "bla"
            }
          ]
        },
        {
          techId: 1,
          name: "name2",
          color: "green",
          projects:[
            {
              id: 0,
              name: "bla"
            },
            { 
              id: 1,
              name: "blabla"
            }
          ]
        }
      ]
    }
  },
}

</script>

<template>
<div class="diagram-container grid place-items-center w-80 aspect-square">
    <ProjectQuickInfo v-if="projectInfoVisible"/>
    <div class="circle absolute border-2 border-rose-500 w-64 aspect-square rounded-full"></div>
    <div v-for="tech in techs" :key="tech.techId" class="tech absolute w-96 aspect-square grid place-items-center pointer-events-none" :style="{'--r': 25*tech.techId + 'deg'}">
        <div class="tech-name absolute text-center mb-56 text-xs w-full">{{tech.name}}</div>
        <div v-for="project in tech.projects" @click="openDetails" class="project-block cursor-pointer absolute rounded-lg inline-grid justify-center w-11 h-4 z-40 pointer-events-auto" :style="{'--w':-17 - 3*project.id  +'vh', 'background-color': tech.color}" @mouseenter="showProjectInfo" @mouseleave="closeProjectInfo"></div>
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