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
        const urlFlag = (countriesCode) => {
            const flagCountries = {
                en: 'https://flagcdn.com/16x12/us.png',
                de: 'https://flagcdn.com/16x12/de.png',
                it: 'https://flagcdn.com/16x12/it.png',
                ja: 'https://flagcdn.com/16x12/jp.png',
                ko: 'https://flagcdn.com/16x12/kr.png',
                zh: 'https://flagcdn.com/16x12/cn.png',
                ru: 'https://flagcdn.com/16x12/ru.png',
                es: 'https://flagcdn.com/16x12/es.png',
                fr: 'https://flagcdn.com/16x12/fr.png',
            };
            // verifica se nella const flagCountries c e il flag corispondente
            if (flagCountries.hasOwnProperty(countriesCode)) {
                return flagCountries[countriesCode];
            } else {
                // se non c e  fai vedere questa img  
                return 'https://flagcdn.com/16x12/aq.png';
            }
        };

        return {
            state: movies,
            searchMovies,
            urlFlag,
        };
    }
}
</script>

<template>
    <div>
        <input v-model="state.searchInput" placeholder="Type the name of the movie">
        <button @click="searchMovies">Search </button>
        <h2>Search results:</h2>
        <ol>
            <li v-for="movie in state.searchResults" :key="movie.id">
                <p>Title: {{ movie.title }}</p>
                <p>Original title: {{ movie.original_title }}</p>
                <p>Language: <img :src="urlFlag(movie.original_language)" alt="Flag"></p>
                <p>Vote average: {{ movie.vote_average }}</p>
            </li>
        </ol>
    </div>
</template>

<style></style>