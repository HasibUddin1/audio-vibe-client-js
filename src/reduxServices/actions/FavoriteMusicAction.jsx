import { GET_FAVORITE_MUSIC, GET_FAVORITE_MUSIC_FAILED, GET_FAVORITE_MUSIC_SUCCESS } from "../constants/FavoriteMusicConstants"




const getFavoriteMusic = (email) => async (dispatch) => {
    dispatch({ type: GET_FAVORITE_MUSIC })
    try {
        fetch(`https://audio-vibe-server.vercel.app/favoriteMusicByUser/${email}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: GET_FAVORITE_MUSIC_SUCCESS, payload: data })
            })
    }
    catch (error) {
        dispatch({ type: GET_FAVORITE_MUSIC_FAILED, payload: error.message })
    }
}

export default getFavoriteMusic;