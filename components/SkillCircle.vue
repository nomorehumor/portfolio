<script>
export default {
    data() {
        return {
            projectInfoVisible: false,
            highlightedProject: "",
            techs: [],
            maxProjectNum: 0,
            two: null
        };
    },
    async fetch() {
        const techsInfos = await this.$content("techs", { deep: true })
            .where({ slug: "tech" })
            .fetch();
        const techs = [];
        for (let id1 = 0; id1 < techsInfos.length; id1++) {
            const projects = await this.$content(techsInfos[id1].dir)
                .where({ slug: { $ne: "tech" } })
                .only(["title", "tags", "path"])
                .fetch();
            const techProjects = [];
            for (let id = 0; id < projects.length; id++) {
                techProjects.push({
                    id,
                    name: projects[id].title,
                    path: projects[id].path,
                    filter: false,
                    tags: projects[id].tags.map(tag => tag.toLowerCase()),
                    block: null
                });
            }
            techs.push({
                techId: id1,
                name: techsInfos[id1].name,
                color: techsInfos[id1].color,
                projects: techProjects,
            });
            if (techProjects.length > this.maxProjectNum) {
                this.maxProjectNum = techProjects.length;
            }
        }
        this.techs = techs;
    },
    
    watch: {
        "$store.state.searchText": "highlightModules",
        "$store.state.filters.type": "highlightModules",
    },
    mounted() {
        const elem = this.$refs.circle;
        const params = { width: elem.clientWidth, height: elem.clientHeight };
        this.two = new this.$Two(params).appendTo(elem);

        const circleRadius = 20;
        const circleX = params.width / 2;
        const circleY = params.height / 2;
        const circleStrokeWidth = 2

        const mainCircle = this.two.makeCircle(circleX, circleY, circleRadius);
        mainCircle.fill = 'none';
        mainCircle.stroke = 'gray';
        mainCircle.linewidth = circleStrokeWidth;

        const spaceBetweenArcs = Math.PI / 20;
        const arcAngle = (Math.PI - (this.techs.length - 1) * spaceBetweenArcs) / this.techs.length;
        const arcHeight = 30;

        let radiuses = [circleRadius];
        const circles = [mainCircle];
        for (let i = 0; i < this.maxProjectNum; i++) {
            radiuses.push(radiuses[i] + arcHeight)
            const circle = this.two.makeCircle(circleX, circleY, radiuses[i+1]);
            circle.fill = 'none';
            circle.stroke = 'gray';
            circle.linewidth = circleStrokeWidth;
            circles.push(circle);
        }


        const projectBlocks = []
        for (let techId = 0; techId < this.techs.length; techId++) {
            const tech = this.techs[techId];
            // const techName = two.makeText(tech.name, 20 + id * 50, 100);
            // techName.fill = 'white';
            // techName.size = 12;
            // techName.rotation = 25 * tech.techId;
            
            const arcStart = -Math.PI + spaceBetweenArcs * techId;
            const angleStart = arcStart + arcAngle * techId;
            const angleEnd = arcStart + arcAngle * (techId + 1);
            for (let projectId = 0; projectId < tech.projects.length; projectId++) {
                const project = tech.projects[projectId];

                const projectBlock = this.two.makeArcSegment(circleX, circleY, radiuses[projectId] + circleStrokeWidth * 2, radiuses[projectId+1] - circleStrokeWidth * 2, angleStart, angleEnd );
                projectBlock.fill = tech.color;
                // projectBlock.rotation = 25 * tech.techId;
                projectBlock.noStroke()


                this.two.update()
                const element = this.two.renderer.domElement.querySelector(`#${projectBlock.id}`)
                element.addEventListener('mouseenter', () => {
                    this.showProjectInfo(project.name);
                });
                element.addEventListener('mouseleave', () => {
                    this.closeProjectInfo();
                });
                element.addEventListener('click', () => {
                    this.openDetails(project.path);
                });
                
                // projectBlocks.push(projectBlock);
                project.block = projectBlock;
            }
        }

    this.two.update();
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
                for (const project of tech.projects) {
                    
                    let correctType = false;
                    let correctName = false;

                    if (this.$store.state.filters.type === "" || project.tags.includes(this.$store.state.filters.type)) {
                        correctType = true
                    }

                    if (searchText === "" || project.name.toLowerCase().includes(searchText) || project.tags.includes(searchText)) {
                        correctName = true;
                    } 

                    if (correctType && correctName) {
                        project.block.opacity = 1;
                        project.block.color = tech.color;
                    } else {
                        project.block.opacity = 0.2;
                        project.block.color = "#A3A3A3";
                    }
                }
            }
            this.two.update()
        },
    },
};
</script>

<template>
    <div class="diagram-container grid place-items-center w-96 aspect-square">
        <ProjectQuickInfo
            v-if="projectInfoVisible"
            :text="highlightedProject"
        ></ProjectQuickInfo>
        <div ref="circle" class="w-full aspect-square"></div>
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
