import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listenToAllPosts } from "../../apps/store/actions/postAction";
import useDataCollections from "../../apps/hooks/useDataCollections";
import Sidebar from "../../features/post/components/sidebar/Sidebar";

export default function PageNotFound() {
  const { listPosts } = useSelector((state) => state.postData);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  useDataCollections({
    uri: "https://realyticlab.local/wp-json/wp/v2/posts?_embed",
    data: (response) => dispatch(listenToAllPosts(response.data)),
    deps: [dispatch]
  });

  return (
    <div className="min-h-[80vh] flex flex-col lg:flex-row gap-8 py-8">
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-3xl font-medium text-gray-600 mb-4">Page Not Found</p>
            <p className="text-gray-600">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">Helpful Links</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-blue-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <Link to="/" className="hover:underline">Return to Homepage</Link>
                </li>
                <li className="flex items-center text-blue-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <Link to="/blog" className="hover:underline">Browse Our Blog</Link>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-green-800 mb-4">What You Can Do</h2>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Check out our recent posts in the sidebar</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact our support team for assistance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar with Recent Posts */}
      <aside className="w-full lg:w-80 flex-shrink-0">
        {listPosts && listPosts.length > 0 && (
          <div className="sticky top-24">
            <Sidebar posts={listPosts} loading={loading} />
          </div>
        )}
      </aside>
    </div>
  );
}

