import React from "react";
import useDataCollections from "../../apps/hooks/useDataCollections";
import { useDispatch, useSelector } from "react-redux";
import { listenToAllPosts } from "../../apps/store/actions/postAction";
import Posts from "../post/Posts";

export default function Home() {
  const dispatch = useDispatch();
  const { listPosts } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.async);

  useDataCollections({
    uri: "https://realyticlab.local/wp-json/wp/v2/posts?_embed",
    data: (response) => dispatch(listenToAllPosts(response.data)),
    deps: [],
  });
  return <Posts data={listPosts} loading={loading} />;
}
