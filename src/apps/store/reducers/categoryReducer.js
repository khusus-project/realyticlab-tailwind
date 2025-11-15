const initialState = {
  listCategories: [],
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "LISTEN_ALL_CATEGORIES":
      return {
        ...state,
        listCategories: action.payload,
      };
    default:
      return state;
  }
}