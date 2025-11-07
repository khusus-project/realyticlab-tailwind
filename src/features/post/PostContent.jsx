import { useDispatch, useSelector } from "react-redux";
import useDataCollections from "../../apps/hooks/useDataCollections";
import Sidebar from "./components/sidebar/Sidebar";
import { listenToAllPosts } from "../../apps/store/actions/postAction";
import PageNotFound from "../../common/error-page/PageNotFound";

export default function PostContent({ post, loading }) {
  const { listPosts } = useSelector((state) => state.postData);
  const dispatch = useDispatch();

  useDataCollections({
    uri: "https://realyticlab.local/wp-json/wp/v2/posts?_embed",
    data: (response) => dispatch(listenToAllPosts(response.data)),
    deps: [dispatch],
  });

  if (loading) return <>Loading...</>;

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
    <>
      <div className="mb-6">
        <div className="relative w-full h-64 sm:h-72 md:h-160 rounded-lg overflow-hidden bg-gray-100 shadow-sm ring-1 ring-black/5">
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
                fontSize: "clamp(20px, 4vw, 36px)",
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

      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0">
          {/* hidden H1 for accessibility/SEO since visible title is over the image */}
          <h1 className="sr-only">{post?.title?.rendered}</h1>

          <div className="prose prose-lg max-w-none text-gray-800 dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}
            />
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24">
          <div className="lg:mt-0">
            <Sidebar posts={listPosts} loading={loading} />
          </div>
        </aside>
      </div>
    </>
  );
}
