<script>
import { reactive } from 'vue';
import { state } from '../../state.js';
import axios from 'axios';

export default {
    setup() {
        const movies = reactive(state);

        const searchAll = () => {
            axios
                .get(`${state.urlSearch}?api_key=${state.api_key}&query=${state.searchInput}`)
                .then(response => {
                    state.searchResults = response.data.results;
                    state.searchResults.forEach(movie => {
                        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${state.api_key}`)
                            .then(castResponse => {
                                const castArray = castResponse.data.cast;
                                //console.log(castArray);
                                if (Array.isArray(castArray)) {
                                    movie.cast = castArray.slice(0, 5).map(actor => ({
                                        name: actor.name,
                                        character: actor.character,
                                    }));
                                    //console.log(movie.cast);
                                } else {
                                    movie.cast = [];
                                }
                            })
                    });
                })

            movies.searchInput = "";
            axios
                .get(`${state.urlSearchTv}?api_key=${state.api_key}&query=${state.searchInput}`)
                .then(response => {
                    state.tvShows = response.data.results;
                    state.tvShows.forEach(tvShow => {
                        axios.get(`https://api.themoviedb.org/3/tv/${tvShow.id}/credits?api_key=${state.api_key}`)
                            .then(castResponse => {
                                const castArray = castResponse.data.cast;
                                if (Array.isArray(castArray)) {
                                    tvShow.cast = castArray.slice(0, 5).map(actor => ({
                                        name: actor.name,
                                        character: actor.character,
                                    }));
                                    //console.log(tvShow.cast);
                                } else {
                                    tvShow.cast = [];
                                }
                            })

                    });
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