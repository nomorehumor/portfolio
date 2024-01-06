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
<div class="bg-zinc-700 p-10 text-xl max-w-2xl max-h-xl">
    <nuxt-content :document="text" /> 
    <div class="flex flex-row mt-4 gap-2">
        <a href="http://www.linkedin.com/in/popov-maxim"><img src="/social/linkedin.png" class="w-8"></a>
        <a href="http://www.linkedin.com/in/popov-maxim"><img src="/social/github.png" class="w-8"></a>
        <a href="https://www.instagram.com/nomorehumor/"><img src="/social/instagram.png" class="w-8"></a>
    </div>
</div>
</template>