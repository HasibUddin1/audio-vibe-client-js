import { GET_FAVORITE_MUSIC, GET_FAVORITE_MUSIC_FAILED, GET_FAVORITE_MUSIC_SUCCESS } from "../constants/FavoriteMusicConstants";


const initialFavoriteMusicState = {
    isLoading: false,
    favoriteMusic: [],
    error: null
}

const FavoriteMusicReducer = (state = initialFavoriteMusicState, action) => {
    switch (action.type) {
        case GET_FAVORITE_MUSIC:

            return {
                ...state,
                isLoading: true
            };

        case GET_FAVORITE_MUSIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                favoriteMusic: action.payload
            }
        case GET_FAVORITE_MUSIC_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default FavoriteMusicReducer;