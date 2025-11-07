import React from "react";

export default function RecentPostItem({ post }) {
  const featuredImage = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const categories = post?._embedded?.["wp:term"]?.[0] || [];
  const author = post?._embedded?.["author"]?.[0]?.name || "Anonymous";
  const date = new Date(post?.date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-6 group">
      <a 
        href={`/post/${post.slug}`} 
        className="block hover:no-underline bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div
          className="relative w-full h-[200px] bg-cover bg-center"
          style={{
            backgroundImage: featuredImage
              ? `url(${featuredImage})`
              : "url('https://placehold.co/300x200.png')",
          }}
        />
        <div className="p-4 flex flex-col space-y-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {post.title.rendered}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-block px-1.5 py-0.5 text-[10px] leading-normal font-medium text-blue-600 bg-blue-50 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
              {categories.length === 0 && (
                <span className="inline-block px-1.5 py-0.5 text-[10px] leading-normal font-medium text-blue-600 bg-blue-50 rounded-full">
                  Uncategorized
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500 border-t pt-3">
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {author}
            </span>
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
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
      </a>
    </div>
  );
}
