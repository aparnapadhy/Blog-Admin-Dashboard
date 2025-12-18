import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

const DeletedBlogs = () => {
  const { blogs, restoreBlog, permanentlyDeleteBlog } = useAppContext();

  const deletedBlogs = blogs.filter(blog => blog.isDeleted);

  if (deletedBlogs.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No deleted blogs
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
        Deleted Blogs
      </h1>

      {deletedBlogs.map(blog => (
        <div
          key={blog.id}
          className="border rounded p-4 bg-white shadow-sm"
        >
          <h2 className="font-semibold text-lg">{blog.title}</h2>

          <p className="text-sm text-gray-500">
            Deleted on{" "}
            {blog.deletedAt
              ? new Date(blog.deletedAt).toLocaleDateString()
              : "—"}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => restoreBlog(blog.id)}
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Restore
            </button>

            <button
              onClick={() => permanentlyDeleteBlog(blog.id)}
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Delete Forever
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeletedBlogs;
