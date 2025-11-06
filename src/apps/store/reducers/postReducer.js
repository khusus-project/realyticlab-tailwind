export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
export const READ_POST = "READ_POST";

const initialState = {
  listPosts: [],
  post: null,
};

export default function postReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_POSTS:
      return {
        ...state,
        listPosts: payload,
      };
    case READ_POST: {
      return {
        ...state,
        post: payload,
      };
    }
    default:
      return state;
  }
}
