import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Post from "./post/Post";
import PageNotFound from "../common/error-page/PageNotFound";

export default function MainRoutes({ initialized }) {
  if (!initialized) return <>Loading...</>;
  return (
    <Routes>
      {/* redirect "/" ke "/home" */}
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="post/:slug" element={<Post />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
