import { GET_ALL_MUSIC, GET_ALL_MUSIC_FAILED, GET_ALL_MUSIC_SUCCESS } from "../constants/allMusicConstants"



const getAllMusic = () => async (dispatch) => {
    dispatch({ type: GET_ALL_MUSIC })
    try {
        fetch("http://localhost:5000/allMusicFeatured")
            .then(res => res.json())
            .then(data => {
                dispatch({ type: GET_ALL_MUSIC_SUCCESS, payload: data })
            })
    }
    catch (error) {
        dispatch({ type: GET_ALL_MUSIC_FAILED, payload: error.message })
    }
}

export default getAllMusic;