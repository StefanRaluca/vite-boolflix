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
                });
        };
        // metodo per fare la ricerca dei thshow?
        const searchTVShows = () => {
            axios.get(`${movies.urlSearchTv}?api_key=${movies.api_key}&query=${movies.searchInput}`)
                .then(response => {
                    movies.tvShows = response.data.results;
                    console.log(response.data.results);
                });
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
        const urlImg = (poster_path) => {
            if (!poster_path) {
                // se non e disponibile img fai vedere questa img
                return 'https://t3.ftcdn.net/jpg/03/23/92/38/360_F_323923845_sB6dVDxEFFJOqJB6Rn6kCyf3tBe1RRaA.jpg';
            }
            //completa il url con il path
            return `https://image.tmdb.org/t/p/w342/${poster_path}`;
        };
        //const per richiamare tutte 2 chiamate axios ?!
        const searchAll = () => {
            searchMovies();
            searchTVShows();
        };

        return {
            state: movies,
            searchMovies,
            urlFlag,
            searchTVShows,
            searchAll,
            urlImg,
        };
    }
}
</script>

<template>
    <div>
        <input v-model="state.searchInput" @keyup.enter="searchAll" placeholder="Type the name of the movie">
        <button @click="searchAll">Search</button>




        <h4>Search movies results:</h4>
        <ol>
            <li v-for="movie in state.searchResults" :key="movie.id">
                <p>Title: {{ movie.title }}</p>
                <p>Original title: {{ movie.original_title }}</p>
                <img :src="urlImg(movie.poster_path)" :alt="movie.title">
                <p>Language: <img :src="urlFlag(movie.original_language)" alt="Flag"></p>
                <p>Vote average: {{ movie.vote_average }}</p>
            </li>
        </ol>
        <h4>Search TV Shows results:</h4>
        <ol>
            <li v-for="tvShow in state.tvShows" :key="tvShow.id">
                <p>Title: {{ tvShow.name }}</p>
                <img :src="urlImg(tvShow.poster_path)" :alt="tvShow.name">
                <p>Original title: {{ tvShow.original_name }}</p>
                <p>Language: <img :src="urlFlag(tvShow.original_language)" alt="Flag"></p>
                <p>Vote average: {{ tvShow.vote_average }}</p>
            </li>
        </ol>
    </div>
</template>

<style></style>
