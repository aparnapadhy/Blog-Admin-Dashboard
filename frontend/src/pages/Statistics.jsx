import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

const Statistics = () => {
  const { blogs } = useAppContext();

 const activeBlogs = blogs.filter(blog => !blog.isDeleted);

const totalBlogs = activeBlogs.length;
const published = activeBlogs.filter(
  blog => blog.status === "published"
).length;

const draft = activeBlogs.filter(
  blog => blog.status === "draft"
).length;


  return (
    <div className="p-6">
      <h1 className="text-3xl text-gray-800 font-bold mb-6">Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Total Blogs</h2>
          <p className="text-2xl mt-2">{totalBlogs}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Published</h2>
          <p className="text-2xl mt-2">{published}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Draft</h2>
          <p className="text-2xl mt-2">{draft}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
