// Posts.jsx
import React from "react";
import PostItem from "./PostItem";
import FirstPostItem from "./FirstPostItem";
import SecondPostsItem from "./SecondPostsItem";

export default function Posts({ data, loading }) {
  if (loading) return <>Loading...</>;

  // Jika data kosong
  if (!data || data.length === 0) return <>No posts found</>;

  // Pisahkan berdasarkan urutan index
  const latestPost = data[0];
  const secondPosts = data.slice(1, 4); // 3 postingan berikut
  const sidebarPosts = data.slice(4, 6); // 2 postingan sidebar

  return (
    <div className="w-full">
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6
                   auto-rows-[minmax(260px,auto)] md:auto-rows-[minmax(280px,auto)]"
      >
        {/* Main column */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6 h-full">
          <FirstPostItem post={latestPost} large />

          <div className="flex flex-col gap-4">
            {secondPosts?.map((post) => (
              <SecondPostsItem key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 h-full">
          {sidebarPosts?.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </div>
      </div>

      <div className="px-6 pt-2">
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md border border-gray-300 transition">
          More Posts
        </button>
      </div>
    </div>
  );
}
