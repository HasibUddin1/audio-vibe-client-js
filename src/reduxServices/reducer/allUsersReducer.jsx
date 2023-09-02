import { GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS } from "../constants/allUsersConstants";


const initialUsersState = {
    isLoading: false,
    allUsers: [],
    error: null
}

const allUsersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:

            return {
                ...state,
                isLoading: true
            };

        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allUsers: action.payload
            }
        case GET_ALL_USERS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default allUsersReducer;