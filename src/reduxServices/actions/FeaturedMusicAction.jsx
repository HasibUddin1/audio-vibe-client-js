import { GET_ALL_FEATURED_MUSIC, GET_ALL_FEATURED_MUSIC_FAILED, GET_ALL_FEATURED_MUSIC_SUCCESS } from "../constants/FeaturedMusicConstants"




const getAllFeaturedMusic = () => async (dispatch) => {
    dispatch({ type: GET_ALL_FEATURED_MUSIC })
    try {
        fetch("https://audio-vibe-server.vercel.app/allMusicFeatured")
            .then(res => res.json())
            .then(data => {
                dispatch({ type: GET_ALL_FEATURED_MUSIC_SUCCESS, payload: data })
            })
    }
    catch (error) {
        dispatch({ type: GET_ALL_FEATURED_MUSIC_FAILED, payload: error.message })
    }
}

export default getAllFeaturedMusic;