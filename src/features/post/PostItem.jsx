// import moment from "moment";
import React from "react";
import { formatDateTime, timeAgo } from "../../apps/utils/utils";

export default function PostItem({ data }) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Gambar */}
      <div
        className="relative w-full h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: data?.featured_media
            ? `url(${data?._embedded?.["wp:featuredmedia"]?.[0]?.link})`
            : "url('https://placehold.co/300x200.png')",
        }}
      >
        {/* Kategori */}
        <div className="absolute top-2 right-2 flex flex-wrap gap-1">
          {data._embedded?.["wp:term"]?.[0]?.map((cat) => (
            <span
              key={cat.id}
              className="rounded-full border border-black/30 bg-white/80 backdrop-blur-sm px-2 py-[2px] text-[11px]"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-col p-3">
        {/* Title */}
        <h2 className="font-semibold text-[17px] leading-snug text-gray-900 mb-1 line-clamp-2">
          {data?.title?.rendered}
        </h2>

        {/* Author & Date */}
        <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-2">
          <div
            className="w-5 h-5 rounded-full bg-gray-300 bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi14LmpwZw.jpg")`,
            }}
          ></div>
          <span>{data?._embedded?.author?.[0].name}</span>
          <span className="text-gray-300">•</span>
          <span>
            {formatDateTime(data?.date)} - {timeAgo(data?.date)}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-[13px] text-gray-600 leading-relaxed text-justify line-clamp-4">
          <div
            dangerouslySetInnerHTML={{ __html: data?.excerpt?.rendered }}
          ></div>
        </p>

        {/* Read more */}
        <a
          href={`post/${data?.slug}`}
          className="text-blue-600 text-[12px] font-medium mt-2 hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
