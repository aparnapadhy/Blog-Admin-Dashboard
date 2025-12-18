import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";

const BlogList = () => {
  const { blogs, setBlogs } = useAppContext();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  //Persistent Pagination
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("blogCurrentPage");
    return savedPage ? Number(savedPage) : 1;
  });

  const itemsPerPage = 5;

  //Active (not deleted)
  const activeBlogs = blogs.filter(blog => !blog.isDeleted);

  //Search + Status filter
  const filteredBlogs = activeBlogs.filter(blog =>
    (blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter ? blog.status === statusFilter : true)
  );

  //Sort by published date (newest first)
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (!a.publishDate && !b.publishDate) return 0;
    if (!a.publishDate) return 1;
    if (!b.publishDate) return -1;
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  //Pagination
  const totalPages = Math.max(Math.ceil(sortedBlogs.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = sortedBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //Delete (soft delete)
  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(prev =>
        prev.map(blog =>
          blog.id === id
            ? { ...blog, isDeleted: true, deletedAt: Date.now() }
            : blog
        )
      );
    }
  };

  //save current page to local storage
  useEffect(() => {
    localStorage.setItem("blogCurrentPage", currentPage);
  }, [currentPage]);

  //fix page if filter/delete reduces total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="p-4 md:p-6 pb-24 relative h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800 break-words">
          Dashboard
        </h1>
        <Link
          to="/blogs/new"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 w-full sm:w-auto text-center"
        >
          Add Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full text-center focus:ring-2 focus:ring-gray-800"
        />
        <select
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full sm:w-40 text-center focus:ring-2 focus:ring-gray-800"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* ---------------- DESKTOP TABLE ---------------- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white text-center">
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Author</th>
              <th className="p-2 border border-gray-300">Category</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Published</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map(blog => (
              <tr key={blog.id} className="hover:bg-gray-100 text-center text-sm">
                <td className="p-2 border border-gray-300">{blog.title}</td>
                <td className="p-2 border border-gray-300">{blog.author}</td>
                <td className="p-2 border border-gray-300">{blog.category || "-"}</td>
                <td className="p-2 border border-gray-300 capitalize">{blog.status}</td>
                <td className="p-2 border border-gray-300">
                  {blog.publishDate
                    ? new Date(blog.publishDate).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/blogs/view/${blog.id}`}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      View
                    </Link>
                    <Link
                      to={`/blogs/edit/${blog.id}`}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE CARDS ---------------- */}
      <div className="md:hidden space-y-4">
        {paginatedBlogs.map(blog => (
          <div key={blog.id} className="border rounded p-4 shadow-sm bg-white">
            <h2 className="font-bold text-lg">{blog.title}</h2>
            <p className="text-sm text-gray-600">By {blog.author}</p>

            <div className="mt-2 text-sm space-y-1">
              <p><strong>Category:</strong> {blog.category || "-"}</p>
              <p><strong>Status:</strong> {blog.status}</p>
              <p>
                <strong>Published:</strong>{" "}
                {blog.publishDate
                  ? new Date(blog.publishDate).toLocaleDateString()
                  : "—"}
              </p>
            </div>

            <div className="flex gap-2 mt-3">
              <Link
                to={`/blogs/view/${blog.id}`}
                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 flex-1 text-center"
              >
                View
              </Link>
              <Link
                to={`/blogs/edit/${blog.id}`}
                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 flex-1 text-center"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- DESKTOP PAGINATION ---------------- */}
      <div className="hidden md:flex absolute -bottom-6 left-1/2 -translate-x-1/2 mb-4">
        <div className="flex gap-2 items-center p-2 md:p-1 rounded shadow">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 md:px-2 md:py-0.5 text-sm md:text-xs rounded border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 md:px-2 md:py-0.5 text-sm md:text-xs rounded border ${
                currentPage === i + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 md:px-2 md:py-0.5 text-sm md:text-xs rounded border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            →
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE PAGINATION ---------------- */}
      <div className="md:hidden fixed bottom-6 left-2 z-10">
        <div className="flex flex-col gap-2 p-2 rounded shadow">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
