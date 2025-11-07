import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/reducers/asyncReducer";
import axios from "axios";

export default function getPostData({ slug, data, deps = [] }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    const source = axios.CancelToken.source();

    const fetchPost = async () => {
      dispatch(asyncActionStart());
      try {
        const response = await axios.get(
          `https://realyticlab.local/wp-json/wp/v2/posts?slug=${slug}&_embed`,
          {
            cancelToken: source.token,
            validateStatus: function (status) {
              return status >= 200 && status < 300;
            },
          }
        );

        if (isSubscribed) {
          if (response.data.length === 0) {
            data(null);
            dispatch(asyncActionFinish());
            return;
          }
          
          if (response.data) {
            data(response.data[0]);
            dispatch(asyncActionFinish());
          } else {
            throw new Error("No data received");
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching post:", error);
          if (isSubscribed) {
            const errorMessage = error.response?.data?.message || error.message;
            dispatch(asyncActionError({
              message: errorMessage,
              statusCode: error.response?.status
            }));
          }
        }
      }
    };

    fetchPost();

    // Cleanup function
    return () => {
      isSubscribed = false;
      source.cancel("Component unmounted");
    };
  }, [slug, dispatch, ...(deps || [])]);
}
