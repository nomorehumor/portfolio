<script>

export default {
    props: {
        text: String
    },
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
}

</script>

<template>
<div class="bg-neutral-900 text-neutral-50 w-auto h-auto p-2 absolute z-10 border border-neutral-600" :style="{'top': mousePosY + 10 +'px', 'left': mousePosX + 10 +'px'}">
    {{ text }}
</div>

</template>