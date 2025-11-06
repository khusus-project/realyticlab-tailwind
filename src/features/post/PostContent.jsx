
export default function PostContent({post, loading}) {

  if(loading) return <>Loading...</>

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <article className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold mb-4">{post?.title?.rendered}</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}
        />
      </article>

      {/* SIDEBAR */}
      <aside className="w-full lg:w-80 flex-shrink-0">
        <div className="space-y-6">
          Komponen-komponen sidebar
          {/* <RecentPosts />
          <Categories />
          <SocialShare /> */}
        </div>
      </aside>
    </div>
  );
}
