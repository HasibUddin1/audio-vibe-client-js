import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import allMusicReducer from "./reduxServices/reducer/allMusicReducer";
import FavoriteMusicReducer from "./reduxServices/reducer/FavoriteMusicReducer";
import allFeaturedMusicReducer from "./reduxServices/reducer/FeaturedMusicReducer";
import allUsersReducer from "./reduxServices/reducer/allUsersReducer";



const rootReducer = combineReducers({
    allMusic: allMusicReducer,
    favoriteMusic: FavoriteMusicReducer,
    allFeaturedMusic: allFeaturedMusicReducer,
    allUsers: allUsersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;