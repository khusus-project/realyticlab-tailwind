import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/reducers/asyncReducer";
import axios from "axios";

export default function useDataCollections({ uri, data, deps }) {
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(asyncActionStart());
    try {
      const response = await axios.get(uri);
      data(response);
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  }, deps);
}