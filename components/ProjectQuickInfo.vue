<script>

export default {
    data() {
        return {
            mousePosX: 0,
            mousePosY: 0
        }
    },
    mounted() {
        document.addEventListener("mousemove", (event) => {
          this.mousePosX = event.clientX;
          this.mousePosY = event.clientY;
        });
    },
    props: {
        text: String
    },
}

</script>

<template>
<div class="bg-white w-auto h-auto p-2 absolute z-10 text-black" :style="{'top': this.mousePosY + 10 +'px', 'left': this.mousePosX + 10 +'px'}">
    {{ text }}
</div>

</template>