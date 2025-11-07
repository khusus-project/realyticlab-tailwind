import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/reducers/asyncReducer";
import axios from "axios";

export default function useDataCollections({ uri, data, deps = [] }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    let isSubscribed = true;
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      dispatch(asyncActionStart());
      try {
        const response = await axios.get(uri, {
          cancelToken: source.token,
          validateStatus: function (status) {
            return status >= 200 && status < 300; // default
          },
        });

        if (isSubscribed) {
          if (response.data) {
            data(response);
            dispatch(asyncActionFinish());
          } else {
            throw new Error("No data received");
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
          if (isSubscribed) {
            dispatch(asyncActionError(error));
          }
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isSubscribed = false;
      source.cancel("Component unmounted");
    };
  }, [uri, dispatch, ...(deps || [])]);
}