/* eslint-disable nuxt/no-env-in-hooks */
<script>
const paper = require('paper');
let values = {
    friction: 20,
    timeStep: 0.07,
    amount: 15,
    mass: 10,
};

values.invMass = 1 / values.mass;


let Spring = function(a, b, strength, restLength) {
    this.a = a;
    this.b = b;
    this.restLength = restLength || 80;
    this.strength = strength || 0.55;
    this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function() {
    const delta = new paper.Point(this.b.x - this.a.x, this.b.y - this.a.y);
    const dist = delta.length;
    const normDistStrength = (dist - this.restLength) /
            (dist * this.mamb) * this.strength;
    // console.log("delta", delta)
    delta.y *= normDistStrength * values.invMass * 0.2;
    if (!this.a.fixed)
        this.a.y += delta.y;
    if (!this.b.fixed)
        this.b.y -= delta.y;
};

class Wave {
    constructor(size, scopeSize, strength, color) {
        this.path = null;
        this.springs = null;
        this.size = size;
        this.scopeSize = scopeSize;
        this.strength = strength;
        this.color = color;
        this.createPath()
    }

    onMouseMove(event) {
        let location = this.path.getNearestLocation(new paper.Point(event.clientX, event.clientY));
        // console.log(this.path)
        // console.log(event)
        // console.log(location)
        let segment = location.segment;
        let point = segment.point;

        if (!point.fixed && location.distance < this.size.height / 20) {
            let y = event.clientY;
            point.y += (y - point.y) / 6;
            if (segment.previous && !segment.previous.fixed) {
                let previous = segment.previous.point;
                previous.y += (y - previous.y) / 24;
            }
            if (segment.next && !segment.next.fixed) {
                let next = segment.next.point;
                next.y += (y - next.y) / 24;
            }
        }
    }

    onResize(scopeSize) {
        if (this.path)
            this.path.remove();
        this.scopeSize = scopeSize;
        this.path = createPath(this.strength);
    }

    onFrame(event) {
        this.updateWave(this.path);
    }

    updateWave(path) {
        let force = 1 - values.friction * values.timeStep * values.timeStep;
        for (let i = 0, l = path.segments.length; i < l; i++) {
            const point = path.segments[i].point;
            const dy = (point.y - point.py) * force;
            point.py = point.y;
            point.y = Math.max(point.y + dy, 0);
        }

        for (let j = 0, l = this.springs.length; j < l; j++) {
            this.springs[j].update();
        }
        this.path.smooth({ type: 'continuous' });
    }

    createPath() {
        // this.path = new paper.Path({
        //     strokeColor: this.color
        // });
        // this.springs = [];
        // for (let i = 0; i <= values.amount; i++) {
        //     const x = (this.scopeSize.width / 2) + Math.cos((i / values.amount) * 2 * Math.PI) * 200
        //     const y = (this.scopeSize.height * 0.55) + Math.sin((i / values.amount) * 2 * Math.PI) * 200
        //     console.log( x, y)
        //     let segment = this.path.add(new paper.Point(x, y));
        //     let point = segment.point;
        //     // if (i === 0 || i === values.amount)
        //     //     point.y += this.size.height;
        //     point.px = point.x;
        //     point.py = point.y;
        //     // The first two and last two points are fixed:
        //     // point.fixed = i < 1 || i > values.amount - 1;
        //     if (i > 0) {
        //         let spring = new Spring(segment.previous.point, point, this.strength);
        //         this.springs.push(spring);
        //     }
        // }
        // this.path.position.x -= this.scopeSize.width / 4;
        // return path;

        this.path = new paper.Path.Circle({
            center: [this.scopeSize.width / 2, this.scopeSize.height * 0.55],
            radius: 5
        });
        this.path.style = {
            fillColor: 'blue',
            strokeColor: 'red',
            strokeWidth: 5
        };
        // this.path.style = {
        // }
    }
}

export default {
    data() {
        return {
            waves: [],
            scope: null,
        }
    },
    mounted() {
        // paper.install(window)
        // paper.setup("background_lines")
        this.scope = new paper.PaperScope();
        this.scope.setup("background_lines");
        this.scope.activate();


        let size = new paper.Size(this.scope.view.size.width * 1.4, this.scope.view.size.height)
        const colors = ["#4d4d4d", "#0d0d0d", "#1a1a1a", "#262626", "#333333", "#404040", "#4d4d4d"]
        const strengths = [0.30, 0.25, 0.2, 0.15, 0.1, 0.05]
        for (let i = 0; i < 1; i++) {
            let wave = new Wave(this.scope.view.size, size, strengths[i], colors[i]);
            this.waves.push(wave)
        }

        this.scope.view.onFrame = this.onFrame;
        document.addEventListener("mousemove", (event) => {
            this.onMouseMove(event)
        })
        document.addEventListener("resize", (event) => {
            this.onResize()
        });


    },
    methods: {
        
        onMouseMove(event) {
            for (let wave of this.waves) {
                wave.onMouseMove(event);
            }
        },

        onResize(event) {
            let size = new paper.Size(this.scope.view.size.width * 1.4, this.scope.view.size.height)
            for (let wave of this.waves) {
                wave.onResize()
                wave.scopeSize = size;
            }
        },

        onFrame(event) {
            for (let wave of this.waves) {
                wave.onFrame(event);
            }
        }
        
        // onKeyDown(event) {
        //     if (event.key == 'space') {
        //         path.fullySelected = !path.fullySelected;
        //         path.fillColor = path.fullySelected ? null : 'black';
        //     }
        // }
    },
}


</script>

<template>

<canvas id="background_lines" class="canvas-style" />

</template>

<style>
.canvas-style {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>