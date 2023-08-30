import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import allMusicReducer from "./reduxServices/reducer/allMusicReducer";
import FavoriteMusicReducer from "./reduxServices/reducer/FavoriteMusicReducer";
import allFeaturedMusicReducer from "./reduxServices/reducer/FeaturedMusicReducer";



const rootReducer = combineReducers({
    allMusic: allMusicReducer,
    favoriteMusic: FavoriteMusicReducer,
    allFeaturedMusic: allFeaturedMusicReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;