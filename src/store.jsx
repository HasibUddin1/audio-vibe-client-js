import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import allMusicReducer from "./reduxServices/reducer/allMusicReducer";
import FavoriteMusicReducer from "./reduxServices/reducer/FavoriteMusicReducer";



const rootReducer = combineReducers({
    allMusic: allMusicReducer,
    favoriteMusic: FavoriteMusicReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;