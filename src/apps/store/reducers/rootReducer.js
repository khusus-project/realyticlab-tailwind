import { combineReducers } from "@reduxjs/toolkit";
import asyncReducer from "./asyncReducer";
import postReducer from "./postReducer";

const rootReducers = combineReducers({
    async: asyncReducer,
    postData: postReducer,
})

export default rootReducers;