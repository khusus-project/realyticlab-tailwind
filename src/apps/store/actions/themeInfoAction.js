import axios from "axios";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../reducers/asyncReducer";

export const THEME_INFO_SUCCESS = "THEME_INFO_SUCCESS";

export async function loadThemeInfoOnce(dispatch, getState) {
  const state = getState();

  // Jangan fetch ulang kalau sudah ada
  if (state?.async?.theme) return;

  try {
    dispatch(asyncActionStart());

    const res = await axios.get("https://realyticlab.local/wp-json/theme/v1/info");

    dispatch({
      type: THEME_INFO_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // axios punya struktur error yang lebih rapi
    const message =
      err.response?.data?.message || err.message || "Unknown error occurred";
    dispatch(asyncActionError(message));
  } finally {
    dispatch(asyncActionFinish());
  }
}