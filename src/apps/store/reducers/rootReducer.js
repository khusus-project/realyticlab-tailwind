import { combineReducers } from "@reduxjs/toolkit";
import asyncReducer from "./asyncReducer";
import postReducer from "./postReducer";
import categoryReducer from "./categoryReducer";

const rootReducers = combineReducers({
    async: asyncReducer,
    postData: postReducer,
    categories: categoryReducer,
})

export default rootReducers;