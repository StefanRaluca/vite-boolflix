<script>
import { reactive } from 'vue';
import { state, searchAll } from '../../state.js';

export default {
    setup() {
        const movies = reactive(state);

        const search = () => {
            searchAll();
        };
        return {
            movies,
            search,
        };
    }
}
</script>

<template>
    <header>
        <img class="logo" src="/Netflix-Logo.png" alt="Netflix Logo">
        <div class="search">
            <input v-model="movies.searchInput" @keyup.enter="search" placeholder="Type a movie or series TV">
            <button @click="search">Search </button>
        </div>
    </header>
</template>

<style></style>