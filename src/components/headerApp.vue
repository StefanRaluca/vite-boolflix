<script>
import { reactive } from 'vue';
import { state } from '../../state.js';
import axios from 'axios';

export default {
    setup() {
        const movies = reactive(state);

        const searchAll = () => {
            axios
                .get(`${movies.urlSearch}?api_key=${movies.api_key}&query=${movies.searchInput}`)
                .then(response => {
                    movies.searchResults = response.data.results;
                    console.log(response.data.results);
                })


            axios
                .get(`${movies.urlSearchTv}?api_key=${movies.api_key}&query=${movies.searchInput}`)
                .then(response => {
                    movies.tvShows = response.data.results;
                    console.log(response.data.results);
                })
        };

        return {
            movies,
            searchAll,
        };
    }
}
</script>

<template>
    <header>
        <img class="logo" src="/Netflix-Logo.png" alt="Netflix Logo">
        <div class="search">
            <input v-model="movies.searchInput" @keyup.enter="searchAll" placeholder="Type a movie or series TV">
            <button @click="searchAll">Search </button>
        </div>
    </header>
</template>
<style>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;

}

.logo {
    width: 100px;
}

.search {
    display: flex;
    align-items: center;
    padding: 10px;


    input {
        padding: 10px;
        margin: 5px;
    }

    button {
        color: white;
        padding: 10px;
        background-color: red;
    }
}
</style>