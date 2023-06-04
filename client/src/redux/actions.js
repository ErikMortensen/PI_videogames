import axios from "axios";
import { GET_GENRES, GET_GAMES, GET_GAMES_BY_NAME, SORT_ARRAY_ASC, CLEAN_FILTERS, FILTER_BY_GENRE } from "./actions-types";

export const getVideogames = () => {
    return async function (dispatch) {
        const games = (await axios.get('http://localhost:3001/videogames')).data;

        dispatch({ type: GET_GAMES, payload: games });
    };
};

export const getVideogamesByName = (name) => {
    return async function (dispatch) {
        const games = (await axios.get(`http://localhost:3001/videogames?name=${name}`)).data;

        dispatch({ type: GET_GAMES_BY_NAME, payload: games });
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        const genres = (await axios.get('http://localhost:3001/genres')).data;

        dispatch({ type: GET_GENRES, payload: genres });
    };
};

export const sortAsc = (property) => {
    return async function (dispatch, getState) {
        const state = getState();
        let sorted = [];

        if (property === 'NameAsc') {
            sorted = [...state.games].sort((a, b) => {
                if (a.name < b.name) {
                    return -1; // a debe ser ordenado antes que b
                } else if (a.name > b.name) {
                    return 1; // a debe ser ordenado después que b
                } else {
                    return 0; // a y b son iguales en términos de ordenación
                }
            });
        }
        if (property === 'NameDesc') {
            sorted = [...state.games].sort((a, b) => {
                if (b.name < a.name) {
                    return -1; // a debe ser ordenado antes que b
                } else if (b.name > a.name) {
                    return 1; // a debe ser ordenado después que b
                } else {
                    return 0; // a y b son iguales en términos de ordenación
                }
            });
        }
        if (property === 'RatingAsc') {
            sorted = [...state.games].sort((a, b) => a.rating - b.rating);
        }
        if (property === 'RatingDesc') {
            sorted = [...state.games].sort((a, b) => b.rating - a.rating);
        }

        dispatch({ type: SORT_ARRAY_ASC, payload: sorted });
    };
};

export const filterByGenre = (genre) => {
    return async function (dispatch, getState) {
        const state = getState();
        const filtered = genre === 'all'
            ? state.gamesCopy
            : state.gamesCopy.filter(game => game.genres.includes(genre));

        dispatch({ type: FILTER_BY_GENRE, payload: filtered });
    };
};

export const cleanFilters = () => {
    return async function (dispatch) {
        dispatch({ type: CLEAN_FILTERS });
    };
};


