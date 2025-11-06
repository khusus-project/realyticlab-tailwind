import axios from "axios";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../reducers/asyncReducer";

export const THEME_INFO_SUCCESS = "THEME_INFO_SUCCESS";

export async function loadThemeInfoOnce(dispatch, getState) {
  const state = getState();
  if (state?.async?.theme) return;

  try {
    dispatch(asyncActionStart());

    const [themeRes, menusRes] = await Promise.all([
      axios.get("https://realyticlab.local/wp-json/theme/v1/info"),
      axios.get("https://realyticlab.local/wp-json/theme/v1/menus"),
    ]);

    const themeData = themeRes.data;
    const menusData = menusRes.data;

    const combinedData = {
      ...themeData,
      supports: {
        ...(themeData.supports || {}),
        menus: menusData, // semua lokasi otomatis masuk di sini
      },
    };

    dispatch({
      type: THEME_INFO_SUCCESS,
      payload: combinedData,
    });
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Unknown error occurred";
    dispatch(asyncActionError(message));
  } finally {
    dispatch(asyncActionFinish());
  }
}
