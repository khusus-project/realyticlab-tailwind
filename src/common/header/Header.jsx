import React, { useEffect, useRef, useState } from "react";

export default function Header({ title, menus, loading }) {
  // header visible at load
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const inactivityDelay = 100;

    function onScroll() {
      const y = window.scrollY || window.pageYOffset;

      // if at the very top, ensure header is visible
      if (y <= 0) {
        setVisible(true);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      // user scrolled -> hide header immediately
      setVisible(false);

      // clear existing timer and start a new one to show header after inactivity
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(true);
        timerRef.current = null;
      }, inactivityDelay);
    }

    // run once to set state
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loading]);

  if (loading) return <>Loading...</>;

  return (
    <header
      role="banner"
      className={`fixed left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 p-4 sm:p-5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* left: site title */}
            <div className="flex items-center flex-1">
              <a
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {title || "Site Title"}
              </a>
            </div>

            {/* center: navigation - centered absolutely */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex items-center space-x-8">
                {menus && menus.length > 0 ? (
                  menus.map((menu) => (
                    <li key={menu?.ID}>
                      <a
                        href={menu?.url || "#"}
                        className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                      >
                        {menu?.title}
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a
                        href="/"
                        className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                      >
                        Home
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                      >
                        About
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/posts"
                        className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                      >
                        Posts
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                      >
                        Contact
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* right: social icons */}
            <div className="flex items-center justify-end flex-1 space-x-4">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 19c7.732 0 11.965-6.405 11.965-11.965 0-.182 0-.364-.012-.545A8.56 8.56 0 0022 4.92a8.27 8.27 0 01-2.357.646A4.115 4.115 0 0021.448 3.3a8.224 8.224 0 01-2.605.996A4.107 4.107 0 0015.448 3c-2.27 0-4.11 1.84-4.11 4.11 0 .322.036.636.106.936A11.65 11.65 0 013 4.898a4.106 4.106 0 001.27 5.483 4.07 4.07 0 01-1.86-.514v.052c0 1.987 1.414 3.644 3.291 4.02a4.1 4.1 0 01-1.853.07c.523 1.63 2.038 2.816 3.833 2.848A8.235 8.235 0 012 17.556a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.5-.75a1.25 1.25 0 11-1.25-1.25 1.25 1.25 0 011.25 1.25z" />
                </svg>
              </a>

              <a
                href="/rss.xml"
                aria-label="RSS"
                className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.18 17.82A2.18 2.18 0 108 20a2.18 2.18 0 00-1.82-2.18zM3 4v3.06A16.94 16.94 0 0119.94 21H23V4zM3 9.25v3.06A11.69 11.69 0 0114.69 21H18V9.25z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
