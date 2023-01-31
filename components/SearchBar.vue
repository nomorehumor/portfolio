/* eslint-disable vue/first-attribute-linebreak */
<script>
export default {
    watch: {
        '$store.state.searchText'(text) {
            this.$refs.search.value = text
        }
    },
    mounted() {
        if (process.browser) {
            window.addEventListener('keypress', this.focusSearch);
        }
    },
    methods: {
        setSearchText(text) {
            this.$store.commit('setSearchText', text)
        },
        focusSearch(event) {
            if (this.$refs.search == document.activeElement) return;
            
            this.$refs.search.focus()
        },
    },
}
</script>

<template>
<div>
    <input type="text" 
            class="w-[40rem] h-16 bg-transparent text-3xl font-extralight align-bottom focus:outline-none search-bar p-3 text-center" 
            ref="search"
            @input="text => setSearchText(text.target.value)"
            placeholder="Type something you want to find..."/>
</div>
</template>

<style>

.search-bar {
    border-bottom: 2px solid rgba(255,255,255,0.5);
    transition: border-color 0.2s;
}

.search-bar:focus {
    border-bottom: 2px solid white;
}
</style>