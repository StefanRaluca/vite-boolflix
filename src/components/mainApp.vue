<script>
/* import axios from 'axios'; */
import { state } from '../../state.js';
import { reactive } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css'

export default {
    setup() {
        const movies = reactive(state);
        let showDetailsId = null;

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
            return flagCountries[countriesCode] || 'https://flagcdn.com/16x12/aq.png';
        };

        const urlImg = (poster_path) => {
            return poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` : 'https://t3.ftcdn.net/jpg/03/23/92/38/360_F_323923845_sB6dVDxEFFJOqJB6Rn6kCyf3tBe1RRaA.jpg';
        };

        //transformare il vote average in numero inntero
        const starVote = (vote_average) => {
            return Math.ceil(vote_average / 2);
        };

        const showDetails = (id) => {
            showDetailsId = id;
        };

        const hideDetails = () => {
            showDetailsId = null;
        };

        return {
            state: movies,
            urlFlag,
            urlImg,
            showDetails,
            hideDetails,
            starVote,
        };

    },
    methods: {
        overviewMax(overview) {
            const maxCharacters = 120;
            if (overview.length > maxCharacters) {
                return overview.slice(0, maxCharacters) + '...';
            }
            return overview;
        }
    },
};

</script>


<template>
    <main>



        <div class="search-results">

            <div v-if="state.searchResults.length">
                <h2>Movies</h2>
                <div class="card-container">

                    <div class="card" v-for="movie in state.searchResults" :key="movie.id">
                        <div class="card-image">
                            <div class="hoverDetails" @mouseover="showDetails(movie.id)" @mouseleave="hideDetails()">
                                <h4>{{ movie.title }}</h4>
                                <h5>Original Title: {{ movie.original_title }}</h5>
                                <p>Language: <img :src="urlFlag(movie.original_language)" alt="Flag"></p>
                                <!--  <p>Vote Average: {{ movie.vote_average }}</p> -->
                                <p> <span v-for="star in starVote(movie.vote_average)"> <i
                                            class="fa fa-star"></i></span></p>
                                <ul v-if="movie.cast && movie.cast.length > 0">
                                    <li v-for="actor in movie.cast" :key="actor.name">
                                        <strong>{{ actor.name }}</strong> / {{ actor.character }}
                                    </li>
                                </ul>
                                <p>Overview: {{ overviewMax(movie.overview) }}</p>
                            </div>
                            <img :src="urlImg(movie.poster_path)" alt="Movie poster" class="img_poster">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="search-results">
            <div v-if="state.tvShows.length">
                <h2>TV Shows</h2>
                <div class="card-container">
                    <div class="card" v-for="tvShow in state.tvShows" :key="tvShow.id">
                        <div class="card-image">
                            <div class="hoverDetails" @mouseover="showDetails(tvShow.id)" @mouseleave="hideDetails()">
                                <h4>{{ tvShow.name }}</h4>
                                <h5> {{ tvShow.original_name }}</h5>
                                <p>Language: <img :src="urlFlag(tvShow.original_language)" alt="Flag"></p>
                                <!--   <p>Vote Average: {{ tvShow.vote_average }}</p> -->
                                <p><span v-for="star in starVote(tvShow.vote_average)"> <i
                                            class="fa fa-star"></i></span></p>
                                <p>Overview:{{ overviewMax(tvShow.overview) }}</p>
                                <ul v-if="tvShow.cast && tvShow.cast.length > 0">
                                    <li v-for="actor in tvShow.cast" :key="actor.name">
                                        <strong>{{ actor.name }}</strong> /{{ actor.character }}
                                    </li>
                                </ul>
                            </div>
                            <img :src="urlImg(tvShow.poster_path)" alt="TvShow poster" class="img_poster">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>

</template>



<style>
.fa-star {
    color: yellow;
}



.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem;
}

.search-results {
    h2 {
        text-align: center;
        background-color: white;
    }
}


.card {
    margin: 10px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

}


.card-image {
    background-repeat: no-repeat;
    height: auto;
}

.img_poster {
    width: 100%;
    height: 400px;
    object-fit: cover;
}


.hoverDetails {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    padding: 5px;
    opacity: 0;
    transition: opacity 0.3s;

    ul {
        list-style: none;
    }
}


.card:hover .hoverDetails {
    opacity: 1;
}
</style>
