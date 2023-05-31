const { GET_USERS } = require("./actions-types");

const initialState = {
    users: [],
    user: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return { ...state, users: action.payload };

        default:
            return { ...state };
    }
};

export default rootReducer;