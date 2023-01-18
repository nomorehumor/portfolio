<script>
export default {
    methods: {
        updateSearchText(text) {
            this.$store.commit('setSearchText', text)
        }
    }
}
</script>

<template>
<div>
    <input type="text" 
            class="w-[40rem] h-16 bg-transparent text-3xl font-extralight align-bottom focus:outline-none search-bar p-3 text-center" 
            @input="text => updateSearchText(text.target.value)"
            placeholder="Type something you want to find..."/>
</div>
</template>

<style>

.search-bar {
    border-bottom: 2px solid gray;
    transition: border-color 0.2s;
}

.search-bar:focus {
    border-bottom: 2px solid white;
}
</style>