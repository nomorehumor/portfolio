<script>
export default {
    data() {
        return {
            projectInfoVisible: false,
            highlightedProject: "",
            techs: [],
        };
    },

    async fetch() {
        const techsInfos = await this.$content("techs", { deep: true })
            .where({ slug: "tech" })
            .fetch();
        let techs = [];
        for (let id1 = 0; id1 < techsInfos.length; id1++) {
            const projects = await this.$content(techsInfos[id1].dir)
                .where({ slug: { $ne: "tech" } })
                .only(["title", "tags", "path"])
                .fetch();
            let techProjects = [];
            for (let id = 0; id < projects.length; id++) {
                techProjects.push({
                    id: id,
                    name: projects[id].title,
                    path: projects[id].path,
                    filter: false,
                    tags: projects[id].tags.map(tag => tag.toLowerCase())
                });
            }
            techs.push({
                techId: id1,
                name: techsInfos[id1].name,
                color: techsInfos[id1].color,
                projects: techProjects,
            });
        }
        this.techs = techs;
    },
    watch: {
        "$store.state.searchText": "highlightModules",
        "$store.state.filters.type": "highlightModules",
    },
    methods: {
        showProjectInfo(projectName) {
            this.projectInfoVisible = true;
            this.highlightedProject = projectName;
        },
        closeProjectInfo() {
            this.projectInfoVisible = false;
        },
        openDetails(projectPath) {
            this.$store.commit("toggleNav");
            this.$store.commit("setSelectedProjectPath", projectPath);
        },
        highlightModules() {
            const searchText = this.$store.state.searchText.toLowerCase();
            for (const tech of this.techs) {
                for (let project of tech.projects) {
                    
                    let correctType = false;
                    let correctName = false;

                    if (this.$store.state.filters.type == "" || project.tags.includes(this.$store.state.filters.type)) {
                        correctType = true
                    }

                    if (searchText == "" || project.name.toLowerCase().includes(searchText) || project.tags.includes(searchText)) {
                        correctName = true;
                    } 

                    project.filter = !(correctType && correctName);
        
                }
            }
        },
    },
};
</script>

<template>
    <div class="diagram-container grid place-items-center w-80 aspect-square">
        <ProjectQuickInfo
            v-if="projectInfoVisible"
            :text="highlightedProject"
        ></ProjectQuickInfo>
        <div
            class="circle absolute border-2 border-zinc-100 transition-colors duraion-100 w-64 aspect-square rounded-full"
        ></div>
        <div
            v-for="tech in techs"
            :key="tech.techId"
            class="tech absolute w-96 aspect-square grid place-items-center pointer-events-none"
            :style="{ '--r': 25 * tech.techId + 'deg' }"
        >
            <div class="tech-name absolute text-center mb-56 text-xs w-full">
                <p>{{ tech.name }}</p>
            </div>
            <div
                v-for="project in tech.projects"
                :style="{
                    '--w': -17 - 3 * project.id + 'vh',
                    '--c': tech.color,
                }"
                :class="{ filtered: project.filter, colored: !project.filter }"
                class="project-block cursor-pointer absolute rounded-lg inline-grid justify-center w-11 h-4 z-40 pointer-events-auto ease-in duration-100"
                @click="openDetails(project.path)"
                @mouseenter="showProjectInfo(project.name)"
                @mouseleave="closeProjectInfo"
            ></div>
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

.colored {
    /* transition: .1s; */
    background-color: var(--c);
}

.filtered {
    /* transition: .1s; */
    opacity: .2;
    background-color: #A3A3A3 !important;
}
</style>
