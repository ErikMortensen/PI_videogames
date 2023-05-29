import axios from "axios";
import { GET_USERS } from "./actions-types";

export const getUsers = () => {
    return async function (dispatch) {
        const users = (await axios.get('http://localhost:3001/videogames')).data;
        console.log(users);
        // const users = (await axios.get('https://jsonplaceholder.typicode.com/users')).data;

        dispatch({ type: GET_USERS, payload: users });
    };
};