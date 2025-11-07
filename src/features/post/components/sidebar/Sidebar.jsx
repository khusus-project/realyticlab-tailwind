import RecentPost from "./RecentPost";

export default function Sidebar({ posts, loading }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Share</h2>
      </div>
      <div>
        <RecentPost posts={posts} loading={loading} />
      </div>
    </div>
  );
}
