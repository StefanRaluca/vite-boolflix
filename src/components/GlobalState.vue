<script>
import axios from 'axios';
import { state } from '../../state.js';
import { reactive } from 'vue';


export default {
    setup() {
        // facciamo una variabile per state 
        const movies = state;

        // metodo per fare la ricerca
        const searchMovies = () => {
            axios
                .get(`${movies.urlSearch}?api_key=${movies.api_key}&query=${movies.searchInput}`)
                .then(response => {
                    movies.searchResults = response.data.results;
                    console.log(response.data.results);
                })
        };
        return {
            state: movies,
            searchMovies
        };
    }
}
</script>

<template>
    <div>
        <input v-model="state.searchInput" placeholder="Type the name of the movie">
        <button @click="searchMovies">Search </button>
        <h2>Search results:</h2>
        <ul>
            <li v-for="movie in state.searchResults">
                <p>Title: {{ movie.title }}</p>
                <p>Original title: {{ movie.original_title }}</p>
                <p>Language: {{ movie.original_language }}</p>
                <p>Vote average: {{ movie.vote_average }}</p>
            </li>
        </ul>
    </div>
</template>
<style></style>