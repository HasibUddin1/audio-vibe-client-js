import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import allMusicReducer from "./reduxServices/reducer/allMusicReducer";



const rootReducer = combineReducers({
    allMusic: allMusicReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;