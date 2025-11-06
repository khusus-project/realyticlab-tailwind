// import moment from "moment";
import React from "react";
import { formatDateTime, timeAgo } from "../../apps/utils/utils";

export default function Post({ data }) {
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
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <span>{data?._embedded?.author?.[0].name}</span>
          <span className="text-gray-300">•</span>
          <span>
            {formatDateTime(data?.date)} - {timeAgo(data?.date)}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-[13px] text-gray-600 leading-relaxed text-justify line-clamp-4">
          {data?.excerpt?.rendered ? (
            <div
              dangerouslySetInnerHTML={{ __html: data?.excerpt?.rendered }}
            ></div>
          ) : (
            `Senja tiba dengan langit jingga yang perlahan memudar. Di tepi jalan,
          aroma kopi bercampur dengan angin sore yang lembut. Orang-orang
          berlalu tanpa suara, seolah waktu berhenti sejenak. Hanya detik yang
          terus berjalan, meninggalkan kenangan kecil yang diam-diam hangat di
          hati.`
          )}
        </p>

        {/* Read more */}
        <a
          href={data.link}
          className="text-blue-600 text-[12px] font-medium mt-2 hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     borderRadius: 8,
    //     border: "1px solid #ddd",
    //     width: 300,
    //     overflow: "hidden",
    //     backgroundColor: "#fff",
    //   }}
    // >
    //   {/* Gambar */}
    //   <div
    //     style={{
    //       position: "relative",
    //       backgroundImage: "url('https://placehold.co/300x200.png')",
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       width: "100%",
    //       height: 200,
    //     }}
    //   >
    //     {/* Kategori */}
    //     <div
    //       style={{
    //         position: "absolute",
    //         top: 10,
    //         right: 10,
    //         display: "flex",
    //         gap: 5,
    //         flexWrap: "wrap",
    //       }}
    //     >
    //       {data._embedded?.["wp:term"]?.[0]?.map((cat) => (
    //         <span
    //           key={cat.id}
    //           style={{
    //             borderRadius: 12,
    //             border: "1px solid rgba(0,0,0,0.3)",
    //             padding: "2px 8px",
    //             fontSize: 11,
    //             background: "rgba(255,255,255,0.85)",
    //             backdropFilter: "blur(4px)",
    //           }}
    //         >
    //           {cat.name}
    //         </span>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Konten */}
    //   <div style={{ display: "flex", flexDirection: "column", padding: 12 }}>
    //     {/* Title */}
    //     <div
    //       style={{
    //         fontWeight: 700,
    //         fontSize: 17,
    //         lineHeight: 1.4,
    //         marginBottom: 4,
    //         color: "#222",
    //       }}
    //     >
    //       {data?.title?.rendered}
    //     </div>

    //     {/* Author & Date */}
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 6,
    //         fontSize: 12,
    //         color: "#777",
    //         marginBottom: 8,
    //       }}
    //     >
    //       <div
    //         style={{
    //           width: 20,
    //           height: 20,
    //           borderRadius: "50%",
    //           backgroundColor: "#ccc",
    //         }}
    //       />
    //       <div>Nama</div>
    //       <span style={{ color: "#bbb" }}>•</span>
    //       <div>Tanggal</div>
    //     </div>

    //     {/* Excerpt */}
    //     <div
    //       style={{
    //         color: "#555",
    //         fontSize: 13,
    //         lineHeight: 1.5,
    //         textAlign: "justify",
    //       }}
    //     >
    //       Senja tiba dengan langit jingga yang perlahan memudar. Di tepi jalan,
    //       aroma kopi bercampur dengan angin sore yang lembut. Orang-orang
    //       berlalu tanpa suara, seolah waktu berhenti sejenak. Hanya detik yang
    //       terus berjalan, meninggalkan kenangan kecil yang diam-diam hangat di
    //       hati.
    //     </div>

    //     {/* Read more */}
    //     <a
    //       href={data.link}
    //       style={{
    //         color: "#0077cc",
    //         fontSize: 12,
    //         textDecoration: "none",
    //         marginTop: 8,
    //         alignSelf: "flex-start",
    //         fontWeight: 500,
    //       }}
    //     >
    //       Read more →
    //     </a>
    //   </div>
    // </div>
  );
}
