import axios from "axios";
import { GET_GENRES, GET_GAMES, GET_GAMES_BY_NAME, CLEAN_FILTERS, FILTER } from "./actions-types";

export const getVideogames = () => {
    return async function (dispatch) {
        let games = (await axios.get('http://localhost:3001/videogames')).data;
        games = games.slice(0, 100);
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

const sortByProperty = (properties, data) => {
    let sorted = data;
    const { NameAsc, NameDesc, RatingAsc, RatingDesc } = properties;

    if (NameAsc === 'NameAsc') {
        sorted = [...sorted].sort((a, b) => {
            if (a.name < b.name) {
                return -1; // a debe ser ordenado antes que b
            } else if (a.name > b.name) {
                return 1; // a debe ser ordenado después que b
            } else {
                return 0; // a y b son iguales en términos de ordenación
            }
        });
    }
    if (NameDesc === 'NameDesc') {
        sorted = [...sorted].sort((a, b) => {
            if (b.name < a.name) {
                return -1; // a debe ser ordenado antes que b
            } else if (b.name > a.name) {
                return 1; // a debe ser ordenado después que b
            } else {
                return 0; // a y b son iguales en términos de ordenación
            }
        });
    }
    if (RatingAsc === 'RatingAsc') {
        sorted = [...sorted].sort((a, b) => a.rating - b.rating);
    }
    if (RatingDesc === 'RatingDesc') {
        sorted = [...sorted].sort((a, b) => b.rating - a.rating);
    }

    return sorted;
}

export const filters = (genre, origin, properties) => {
    return async function (dispatch, getState) {
        const state = getState();
        let filtered = genre === 'all'
            ? state.gamesCopy
            : state.gamesCopy.filter(game => game.genres.includes(genre));

        if (origin !== 'all') {
            filtered = origin === 'database'
                ? filtered.filter(game => isNaN(game.id))
                : filtered.filter(game => !isNaN(game.id));
        }

        filtered = sortByProperty(properties, filtered);

        dispatch({ type: FILTER, payload: filtered });
    };

};

export const cleanFilters = () => {
    return async function (dispatch) {
        dispatch({ type: CLEAN_FILTERS });
    };
};


