import React from "react";
import Post from "./Post";

export default function Posts({ data, loading }) {
  if (loading) return <>Loading...</>;

  return (
    <div
      className="
        grid gap-2
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {data?.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </div>
  );
}
