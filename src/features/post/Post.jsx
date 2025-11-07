import React from "react";
import PostContent from "./PostContent";
import { useParams } from "react-router-dom";
import useDataCollections from "../../apps/hooks/useDataCollections";
import { useDispatch, useSelector } from "react-redux";
import { listenToReadPost } from "../../apps/store/actions/postAction";
import getPostData from "../../apps/hooks/getPostData";
import ErrorMessage from "../../common/error/ErrorMessage";

export default function Post() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const { post } = useSelector((state) => state.postData);
  const { slug } = useParams();

  getPostData({
    slug,
    data: (postData) => {
      dispatch(listenToReadPost(postData));
    },
    deps: [dispatch, slug],
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage error={error} />
      </div>
    );
  }

  return <PostContent post={post} loading={loading} />;
}
