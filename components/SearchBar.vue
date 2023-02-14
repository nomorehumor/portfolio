/* eslint-disable vue/first-attribute-linebreak */
<script>
const placeholderValues = ["IoT", "embedded", "kitcar", "web"]
export default {
    data() {
        return {
            currentPlaceholderId: 0
        }
    },
    watch: {
        '$store.state.searchText'(text) {
            this.$refs.search.value = text
        }
    },
    mounted() {
        if (process.browser) {
            window.addEventListener('keypress', this.focusSearch);
        }
        this.timerId = setInterval(() => {
            this.$refs.search.placeholder = ""
            this.typewritePlaceholder(placeholderValues[this.currentPlaceholderId])
            this.currentPlaceholderId = (this.currentPlaceholderId + 1) % placeholderValues.length
        },3000)
    },
    methods: {
        typewritePlaceholder(placeholder) {
            if (placeholder.length == 0) return;
            this.$refs.search.placeholder += placeholder[0]
            setTimeout(this.typewritePlaceholder, 100, placeholder.slice(1, placeholder.length))
        },
        setSearchText(text) {
            this.$store.commit('setSearchText', text)
        },
        focusSearch(event) {
            if (this.$refs.search === document.activeElement) return;
            
            this.$refs.search.focus()
        },
    },
}
</script>

<template>
<div>
    <input
            ref="search" 
            type="text" 
            class="w-[40rem] h-16 bg-transparent text-3xl font-thin align-bottom focus:outline-none search-bar p-3 text-center"
            placeholder="Type something you want to find..."
            @input="text => setSearchText(text.target.value)"/>
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

.search-bar:focus::placeholder {
     color: transparent;
}
</style>