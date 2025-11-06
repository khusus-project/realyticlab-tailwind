import React from "react";
import PostContent from "./PostContent";
import { useParams } from "react-router-dom";
import useDataCollections from "../../apps/hooks/useDataCollections";
import { useDispatch, useSelector } from "react-redux";
import { listenToReadPost } from "../../apps/store/actions/postAction";

export default function Post() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { post } = useSelector((state) => state.postData);
  const { slug } = useParams();

  useDataCollections({
    uri: `https://realyticlab.local/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    data: (postData) => dispatch(listenToReadPost(postData.data[0])),
    deps: [dispatch, slug],
  });
  
  return <PostContent post={post} loading={loading} />;
}
