import React from "react";
import useDataCollections from "../../apps/hooks/useDataCollections";
import { useDispatch, useSelector } from "react-redux";
import { listenToAllPosts } from "../../apps/store/actions/postAction";
import Posts from "../post/Posts";
import { listenToAllCategories } from "../../apps/store/actions/categoryActions";
import PostItem from "../post/PostItem";

export default function Home() {
  const dispatch = useDispatch();
  const { listPosts } = useSelector((state) => state.postData);
  const { listCategories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.async);

  const categories = listPosts?._embedded?.["wp:term"]?.[0] || [];

  useDataCollections({
    uri: "https://realyticlab.local/wp-json/wp/v2/posts?_embed",
    data: (response) => dispatch(listenToAllPosts(response.data)),
    deps: [],
  });

  useDataCollections({
    uri: "https://realyticlab.local/wp-json/wp/v2/categories?per_page=100",
    data: (response) => dispatch(listenToAllCategories(response.data)),
    deps: [],
  });

  return (
    <main className="w-full pt-16">
      {/* TOP SECTION – container */}
      <div
        className="px-4 sm:px-6 lg:px-8 mx-auto 
                  max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl py-8"
      >
        {/* BLOCK 1 — POSTS */}
        <Posts data={listPosts} loading={loading} />
      </div>

      {/* BLOCK 2 — HERO FULL WIDTH */}
      <div
        className="w-full py-12 px-6 relative overflow-hidden
             bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
             text-center shadow-lg"
      >
        {/* Decorative background circle */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-700/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-700/30 rounded-full blur-2xl"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-snug mb-4">
            “What is now proved was once only imagined.”
          </h1>
          <span className="text-gray-300 text-lg">— William Blake</span>

          <div className="mt-6 flex justify-center">
            {/* Dropdown Category */}
            <select
              className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-600 
             focus:border-blue-400 focus:ring-1 focus:ring-blue-400
             max-h-10 overflow-y-auto"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Post</option>

              {loading ? (
                <option>Loading...</option>
              ) : (
                listCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>

      {/* BLOCK 3 — POSTS BY CATEGORY (container) */}
      <div
        className="
    px-4 sm:px-6 lg:px-8 mx-auto
    max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl
    py-12
  "
      >
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            ALL POST
          </h1>
          <div className="mt-1 h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid Posts */}
        <div
          className="
      grid 
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-8
    "
        >
          {listPosts?.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
