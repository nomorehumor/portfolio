/* eslint-disable nuxt/no-env-in-hooks */
<script>
const paper = require('paper');
let values = {
    friction: 100,
    timeStep: 0.07,
    amount: 15,
    mass: 20,
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
    var delta = new paper.Point(this.b.x - this.a.x, this.b.y - this.a.y);
    var dist = delta.length;
    var normDistStrength = (dist - this.restLength) /
            (dist * this.mamb) * this.strength;
    // console.log("delta", delta)
    delta.y *= normDistStrength * values.invMass * 0.2;
    if (!this.a.fixed)
        this.a.y += delta.y;
    if (!this.b.fixed)
        this.b.y -= delta.y;
};

export default {
    props: {
        color: String,
        strength: Number,
    },
    data() {
        return {
            path: null,
            springs: null,
            size: null,
            scope: null,
            tool: null,
        }
    },
    mounted() {
        // paper.install(window)
        // paper.setup("background_lines")
        this.scope = new paper.PaperScope();
        this.scope.setup("background_lines");
        this.scope.activate();

        this.scope.view.onFrame = this.onFrame;

        this.size = new paper.Size(this.scope.view.size.width * 1.4, this.scope.view.size.height)
        console.log(this.size)

        document.addEventListener("mousemove", (event) => {
            this.onMouseMove(event)
        })
        document.addEventListener("resize", (event) => {
            this.onResize()
        });
        this.createPath(this.strength)
    },
    methods: {
        createPath(strength) {
            this.path = new paper.Path({
                strokeColor: this.color
            });
            this.springs = [];
            for (let i = 0; i <= values.amount; i++) {
                let segment = this.path.add(new paper.Point((i / values.amount) * this.size.width, 0.5 * this.size.height));
                let point = segment.point;
                // if (i === 0 || i === values.amount)
                //     point.y += this.size.height;
                point.px = point.x;
                point.py = point.y;
                // The first two and last two points are fixed:
                point.fixed = i < 1 || i > values.amount - 1;
                if (i > 0) {
                    let spring = new Spring(segment.previous.point, point, strength);
                    this.springs.push(spring);
                }
            }
            this.path.position.x -= this.size.width / 4;
            // return path;
        },
        onResize() {
            if (this.path)
                this.path.remove();
            this.size = new paper.Size(this.scope.view.size.width * 1.5, this.scope.view.size.height);
            this.path = createPath(this.strength);
        },
        onMouseMove(event) {
            let location = this.path.getNearestLocation(new paper.Point(event.clientX, event.clientY));
            // console.log(this.path)
            // console.log(event)
            // console.log(location)
            let segment = location.segment;
            let point = segment.point;

            if (!point.fixed && location.distance < this.size.height / 10) {
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
        },
        onFrame(event) {
            this.updateWave(this.path);
        },
        updateWave(path) {
            var force = 1 - values.friction * values.timeStep * values.timeStep;
            for (var i = 0, l = path.segments.length; i < l; i++) {
                var point = path.segments[i].point;
                var dy = (point.y - point.py) * force;
                point.py = point.y;
                point.y = Math.max(point.y + dy, 0);
            }

            for (var j = 0, l = this.springs.length; j < l; j++) {
                this.springs[j].update();
            }
            path.smooth({ type: 'continuous' });
        },
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>