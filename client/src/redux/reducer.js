const { GET_GAMES, GET_GENRES, GET_GAMES_BY_NAME, SORT_ARRAY_ASC, CLEAN_FILTERS, FILTER_BY_GENRE } = require("./actions-types");

const initialState = {
    games: [],
    gamesCopy: [],
    gamesByName: [],
    game: {},
    genres: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                gamesCopy: action.payload
            };

        case GET_GAMES_BY_NAME:
            return {
                ...state,
                gamesByName: action.payload
            }

        case GET_GENRES:
            return { ...state, genres: action.payload };

        case SORT_ARRAY_ASC:
            return {
                ...state,
                games: action.payload
            };

        case FILTER_BY_GENRE:
            return {
                ...state,
                games: action.payload
            }

        case CLEAN_FILTERS:
            return {
                ...state,
                games: state.gamesCopy
            };

        default:
            return { ...state };
    }
};

export default rootReducer;