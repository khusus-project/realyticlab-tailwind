import React from "react";
import { formatDateTime } from "../../apps/utils/utils";

export default function FirstPostItem({ post, large = false }) {
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
    <div
      className={`flex flex-col rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ${
        large ? "md:col-span-2" : ""
      }`}
    >
      {/* Gambar */}
      <div className="relative w-full h-64 sm:h-72 md:h-[400px] rounded-lg overflow-hidden bg-gray-100 shadow-sm ring-1 ring-black/5">
        <img
          src={featuredImage || "https://placehold.co/1200x400.png"}
          alt={post?.title?.rendered || "featured"}
          className="w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
          aria-hidden
        ></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h1
            className="text-black font-bold leading-tight line-clamp-2"
            style={{
              fontSize: "clamp(20px, 4vw, 28px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.95)",
              textShadow: "0 0 6px rgba(255,255,255,0.85)",
            }}
          >
            {post?.title?.rendered}
          </h1>

          <div className="mt-2 flex flex-wrap gap-1">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-block px-2 py-0.5 text-[11px] font-medium text-gray-800 bg-white rounded-full shadow-sm"
                >
                  {cat.name}
                </span>
              ))
            ) : (
              <span className="inline-block px-2 py-0.5 text-[11px] font-medium text-gray-800 bg-white rounded-full shadow-sm">
                Uncategorized
              </span>
            )}

            {/* author + date row */}
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-white/90">
            <span className="flex items-center text-[13px]">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {author}
            </span>

            <span className="flex items-center text-[13px]">
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
      </div>
    </div>
  );
}
