const { GET_USERS, GET_GENRES } = require("./actions-types");

const initialState = {
    users: [],
    user: {},
    genres: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return { ...state, users: action.payload };

        case GET_GENRES:
            return { ...state, genres: action.payload }

        default:
            return { ...state };
    }
};

export default rootReducer;