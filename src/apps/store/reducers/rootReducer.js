import asyncReducer from "./asyncReducer";
import postReducer from "./postReducer";

const rootReducers = {
    async: asyncReducer,
    posts: postReducer,
}

export default rootReducers;