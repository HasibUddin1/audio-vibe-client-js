import { GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS } from "../constants/allUsersConstants"




const getAllUsers = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USERS })
    try {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => {
                dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data })
            })
    }
    catch (error) {
        dispatch({ type: GET_ALL_USERS_FAILED, payload: error.message })
    }
}

export default getAllUsers;