
import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({
    urlSearch: "https://api.themoviedb.org/3/search/movie",
    urlSearchTv: "https://api.themoviedb.org/3/search/tv",
    searchResults: [],
    searchInput: "",
    api_key: "469e4b80883ef4c7db4929cf6be9c097",
    tvShows: [],
});

export const searchAll = () => {
    axios.get(`${state.urlSearch}?api_key=${state.api_key}&query=${state.searchInput}`)
        .then(response => {
            state.searchResults = response.data.results;
            state.searchResults.forEach(movie => {
                castSearch(movie.id, 'movie')
                    .then(cast => movie.cast = cast);
            });
        });

    axios.get(`${state.urlSearchTv}?api_key=${state.api_key}&query=${state.searchInput}`)
        .then(response => {
            state.tvShows = response.data.results;
            state.tvShows.forEach(tvShow => {
                castSearch(tvShow.id, 'tv')
                    .then(cast => tvShow.cast = cast);
            });
        });

    state.searchInput = "";
};

const castSearch = (id, mediaType) => {
    let cast = [];

    return axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${state.api_key}`)
        .then(response => {
            const castArray = response.data.cast;
            if (Array.isArray(castArray)) {
                cast = castArray.slice(0, 5).map(actor => ({
                    name: actor.name,
                    character: actor.character,
                }));
            }
            return cast;
        })
};
;
