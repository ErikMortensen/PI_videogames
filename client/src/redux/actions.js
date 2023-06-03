import axios from "axios";
import { GET_GENRES, GET_GAMES, GET_GAMES_BY_NAME } from "./actions-types";

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
