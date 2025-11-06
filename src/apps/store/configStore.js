import { configureStore } from "@reduxjs/toolkit";
// import rootReducers from "./reducers/rootReducers";
import { APP_LOADED } from "./reducers/asyncReducer";
import { loadThemeInfoOnce } from "./actions/themeInfoAction";
import rootReducers from "./reducers/rootReducer";

export function configStore() {
  const store = configureStore({
    reducer: rootReducers,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  store.dispatch({ type: APP_LOADED });
  loadThemeInfoOnce(store.dispatch, store.getState)
  return store;
}