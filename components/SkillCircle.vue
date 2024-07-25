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
                filtered_out: false
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

        const initialWhiteValue = 0.6;
        const mainCircle = this.two.makeCircle(circleX, circleY, circleRadius);
        mainCircle.fill = 'none';
        mainCircle.stroke = 'rgba(255,255,255,' + initialWhiteValue + ')';
        mainCircle.linewidth = circleStrokeWidth;

        const spaceBetweenArcs = Math.PI / 20;
        const arcAngle = (2 * Math.PI - (this.techs.length) * spaceBetweenArcs) / this.techs.length;
        const arcHeight = 30;

        const radiuses = [circleRadius];
        const circles = [mainCircle];

        for (let i = 0; i < this.maxProjectNum; i++) {
            radiuses.push(radiuses[i] + arcHeight)
            const circle = this.two.makeCircle(circleX, circleY, radiuses[i+1]);
            circle.fill = 'none';
            circle.stroke = 'rgba(255,255,255,' + initialWhiteValue / (i+2) + ')';
            circle.linewidth = circleStrokeWidth;
            circles.push(circle);
        }

        // const arcEndX = circleX + Math.cos(angleStart + (angleEnd - angleStart) / 2) * outerRadius
        // const arcEndY = circleY + Math.sin(angleStart + (angleEnd - angleStart) / 2) * outerRadius
        

        // this.two.update();

        for (let techId = 0; techId < this.techs.length; techId++) {
            const tech = this.techs[techId];
            
            const angleStart = -Math.PI + spaceBetweenArcs * techId + arcAngle * techId;
            const angleEnd = angleStart + arcAngle;
            let lastProjectRadius = circleRadius;
            for (let projectId = 0; projectId < tech.projects.length; projectId++) {
                const project = tech.projects[projectId];

                const innerRadius = radiuses[projectId] + circleStrokeWidth * 2;
                const outerRadius = radiuses[projectId+1] - circleStrokeWidth * 2;
                const projectBlock = this.two.makeArcSegment(circleX, circleY, innerRadius, outerRadius, angleStart, angleEnd);

                const gradient = this.two.makeRadialGradient(0, 0, radiuses.at(radiuses.length-1),
                    new this.$Two.Stop(0, tech.color, 1),
                    new this.$Two.Stop(1, tech.color, 1),
                )
                gradient.units = 'userSpaceOnUse';

                // projectBlock.path.cap = 'round'
                projectBlock.fill = gradient;
                // projectBlock.fill = tech.color;
                projectBlock.curved = true;
                // projectBlock.rotation = 25 * tech.techId;
                projectBlock.noStroke()


                this.two.update()
                const element = this.two.renderer.domElement.querySelector(`#${projectBlock.id}`)
                element.addEventListener('mouseenter', () => {
                    this.showProjectInfo(project.name);
                    projectBlock.opacity = 0.5;
                     this.two.update()
                    document.body.style.cursor = 'pointer';
                });
                element.addEventListener('mouseleave', () => {
                    this.closeProjectInfo();
                    if (!project.filteredOut) {
                        projectBlock.opacity = 1;
                    } else {
                        projectBlock.opacity = 0.3
                    }
                    this.two.update()
                    document.body.style.cursor = 'default';

                });
                element.addEventListener('click', () => {
                    this.openDetails(project.path);
                });
                
                // element.style.pointer = 'pointer'
                // projectBlocks.push(projectBlock);
                project.block = projectBlock;

                lastProjectRadius = outerRadius;
            }

            const middleAngle = angleStart + (angleEnd - angleStart) / 2;
            const textX = circleX + Math.cos(middleAngle) * (lastProjectRadius + 15 + 4 * tech.name.length * Math.abs(Math.cos(middleAngle)));
            const textY = circleY + Math.sin(middleAngle) * (lastProjectRadius + 15 + 4 * tech.name.length * Math.abs(Math.cos(middleAngle)));
            const techName = this.two.makeText(tech.name, textX, textY, {'family': 'JetBrains Mono'});
            techName.fill = 'white';
            techName.size = 16;
            this.two.update();
            // techName.rotation = 25 * tech.techId;
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
                        project.filteredOut = false;
                    } else {
                        project.block.opacity = 0.3;
                        project.block.color = "#A3A3A3";
                        project.filteredOut = true;
                    }
                }
            }
            this.two.update()
        },
    },
};
</script>

<template>
    <div class="w-full h-fit grid items-center justify-items-center">
        <ProjectQuickInfo
            v-if="projectInfoVisible"
            :text="highlightedProject"
        ></ProjectQuickInfo>
        <div ref="circle" class="circle w-full h-full"></div>
    </div>
</template>

<style scoped>

.circle {
    width: 32rem;
    height: 28rem;
}

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
