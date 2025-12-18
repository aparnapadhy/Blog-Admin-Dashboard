import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const BlogView = () => {
  const { blogs } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find(b => String(b.id) === id);

  if (!blog) {
    return (
      <div className="p-6">
        <p className="text-gray-800">Blog not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-gray-800 hover:text-gray-600 font-semibold">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-gray-800 hover:text-gray-600 font-semibold mb-6 cursor-pointer">
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>

      <p className="text-sm text-gray-600 mb-4">
        By <span className="font-medium">{blog.author}</span> •{" "}
        {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : "Not published"}
      </p>

      {blog.image && (
        <div className="border border-gray-300 rounded mb-6 p-2">
          <img src={blog.image} alt={blog.title} className="w-full max-h-[70vh] object-contain rounded" />
        </div>
      )}

      <table className="w-full border border-gray-300 mb-6">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2 font-semibold w-40">Category</td>
            <td className="border border-gray-300 p-2">{blog.category}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-semibold">Status</td>
            <td className="border border-gray-300 p-2 capitalize">{blog.status}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-semibold">Publish Date</td>
            <td className="border border-gray-300 p-2">{blog.publishDate ? new Date(blog.publishDate).toLocaleString() : "—"}</td>
          </tr>
        </tbody>
      </table>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{blog.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Main Content</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{blog.content || "No content provided."}</p>
      </div>
    </div>
  );
};

export default BlogView;
