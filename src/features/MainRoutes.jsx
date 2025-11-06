import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Post from "./post/Post";

export default function MainRoutes({ initialized }) {
  if (!initialized) return <>Loading...</>;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path=":slug" element={<Post />} />
    </Routes>
  );
}
