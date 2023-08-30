import { GET_ALL_FEATURED_MUSIC, GET_ALL_FEATURED_MUSIC_FAILED, GET_ALL_FEATURED_MUSIC_SUCCESS } from "../constants/FeaturedMusicConstants";


const initialFeaturedMusicState = {
    isLoading: false,
    allFeaturedMusic: [],
    error: null
}

const allFeaturedMusicReducer = (state = initialFeaturedMusicState, action) => {
    switch (action.type) {
        case GET_ALL_FEATURED_MUSIC:

            return {
                ...state,
                isLoading: true
            };

        case GET_ALL_FEATURED_MUSIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allFeaturedMusic: action.payload
            }
        case GET_ALL_FEATURED_MUSIC_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default allFeaturedMusicReducer;