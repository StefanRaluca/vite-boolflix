import { reactive } from "vue";

export const state = reactive({
    urlSearch: "https://api.themoviedb.org/3/search/movie",
    searchResults: [],
    searchInput: "",
    api_key: "469e4b80883ef4c7db4929cf6be9c097",
});
