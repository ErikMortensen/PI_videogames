import axios from "axios";
import { GET_USERS } from "./actions-types";

export const getUsers = () => {
    return async function (dispatch) {
        const users = (await axios.get('http://localhost:3001/videogames')).data;

        dispatch({ type: GET_USERS, payload: users });
    };
};
