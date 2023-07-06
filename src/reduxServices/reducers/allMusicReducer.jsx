import { GET_ALL_MUSIC, GET_ALL_MUSIC_FAILED, GET_ALL_MUSIC_SUCCESS } from "../constants/allMusicConstants";

const initialState = {
    isLoading: false,
    allMusic: [],
    error: null
}

const allMusicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MUSIC:

            return {
                ...state,
                isLoading: true
            };

        case GET_ALL_MUSIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allMusic: action.payload
            }
        case GET_ALL_MUSIC_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default allMusicReducer;