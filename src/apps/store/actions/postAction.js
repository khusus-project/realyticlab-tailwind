import { FETCH_ALL_POSTS, READ_POST } from "../reducers/postReducer";


export function listenToAllPosts(posts) {
    return {
        type: FETCH_ALL_POSTS,
        payload: posts
    }
}

export function listenToReadPost(post) {
    return {
        type: READ_POST,
        payload: post
    }
}