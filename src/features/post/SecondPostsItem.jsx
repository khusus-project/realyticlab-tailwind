import React from "react";

export default function SecondPostsItem({ post }) {
  const postTitle = post?.title?.rendered;
  const excerpt = post?.excerpt?.rendered;
  const featuredImage = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const categories = post?._embedded?.["wp:term"]?.[0] || [];
  const author = post?._embedded?.["author"]?.[0]?.name || "Anonymous";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex gap-4 border-b border-gray-200 pb-4">
      {/* Thumbnail */}
      <div>
        <img
          src={featuredImage}
          alt={postTitle}
          className="w-[140px] h-[90px] rounded-md object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-1">
        {/* Categories */}
        <div className="flex gap-2 mb-1">
          {categories?.map((category, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
            >
              {category?.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-semibold text-[15px] leading-tight text-gray-900 hover:text-blue-600 transition">
          {postTitle}
        </h1>

        {/* Excerpt */}
        <div
          className="mt-1 text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        {/* Meta */}
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            {author}
          </span>

          <span className="flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
