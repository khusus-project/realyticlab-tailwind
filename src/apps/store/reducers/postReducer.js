export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"

const initialState = {
  listPosts: [],
};

export default function postReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_POSTS:
      return {
        ...state,
        listPosts: payload,
      };
    default:
      return state;
  }
}