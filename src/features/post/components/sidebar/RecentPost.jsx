import React from "react";
import RecentPostItem from "./RecentPostItem";

export default function RecentPost({ posts, loading }) {
  if (loading) return <>Loading...</>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      {posts.slice(0, 3).map((post) => (
        <RecentPostItem key={post?.id} post={post} />
      ))}
    </div>
  );
}
