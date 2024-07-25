<script>
export default {
    data() {
        return {
            text: {}
        }
    },
    async fetch() {
        this.text = await this.$content("brief_info").fetch()
    }
}
</script>

<template>
<div class="bg-zinc-800 p-10 text-xl max-w-2xl max-h-m h-fit">
    <nuxt-content :document="text" /> 
    <div class="flex flex-row mt-4 gap-2">
        <a href="http://www.linkedin.com/in/popov-maxim"><img src="/svg/linkedin.svg" class="w-8 hover:fill-gray-600 hover:scale-125 transition-transform"></a>
        <a href="http://www.linkedin.com/in/popov-maxim"><img src="/svg/github.svg" class="w-8 hover:fill-gray-600 hover:scale-125 transition-transform"></a>
    </div>
</div>
</template>

