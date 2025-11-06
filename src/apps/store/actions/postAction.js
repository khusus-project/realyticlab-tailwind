import { FETCH_ALL_POSTS } from "../reducers/postReducer";


export function listenToAllPosts(posts) {
    return {
        type: FETCH_ALL_POSTS,
        payload: posts
    }
}