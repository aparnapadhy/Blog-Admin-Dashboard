import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const BlogForm = () => {
  const { blogs, setBlogs } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const emptyForm = {
    title: "",
    author: "",
    description: "",
    content: "",
    category: "",
    status: "draft",
    image: null,
  };

  const [form, setForm] = useState(emptyForm);
  const [initialForm, setInitialForm] = useState(null);

  useEffect(() => {
    if (id) {
      const blog = blogs.find(b => b.id === id);
      if (blog) {
        setForm(blog);
        setInitialForm(blog);
      }
    } else {
      setInitialForm(emptyForm);
    }
  }, [id, blogs]);

  const handleChange = e => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG or PNG images are allowed");
        e.target.value = "";
        return;
      }

      if (file.size > 1024 * 1024) {
        alert("Image must be less than 1MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const isFormChanged = () => {
    if (!initialForm) return false;
    const cleanForm = { ...form, image: null };
    const cleanInitial = { ...initialForm, image: null };
    return JSON.stringify(cleanForm) !== JSON.stringify(cleanInitial);
  };

  useEffect(() => {
    const handleBeforeUnload = e => {
      if (!isFormChanged()) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [form]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormChanged()) return;

    if (id) {
      setBlogs(prev => prev.map(b => (b.id === id ? { ...form } : b)));
    } else {
      setBlogs(prev => [
        ...prev,
        {
          ...form,
          id: Date.now().toString(),
          publishDate: form.status === "published" ? new Date().toISOString() : null,
          isDeleted: false,
          deletedAt: null,
        },
      ]);
    }

    navigate("/blogs");
  };

  return (
    <div className="p-4 max-w-3xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-800 hover:text-gray-600 font-semibold mb-4 cursor-pointer"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">{id ? "Edit Blog" : "Add Blog"}</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-xl">
        {/* Row 1: Title + Author */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="sm:col-span-2 border p-1 rounded focus:ring-2 focus:ring-gray-800 text-sm w-full"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
            className="sm:col-span-1 border p-1 rounded focus:ring-2 focus:ring-gray-800 text-sm w-full"
          />
        </div>

        {/* Row 2: Description */}
        <textarea
          name="description"
          placeholder="Description (short summary)"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-1 rounded focus:ring-2 focus:ring-gray-800 text-sm w-full"
        />

        {/* Row 3: Content */}
        <textarea
          name="content"
          placeholder="Main Content"
          rows="5"
          value={form.content}
          onChange={handleChange}
          required
          className="border p-1 rounded focus:ring-2 focus:ring-gray-800 text-sm w-full"
        />

        {/* Row 4: Image + Category + Status (stack on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
          {/* Image input */}
          <label
            htmlFor="image"
            className="border p-1 rounded text-sm w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200"
          >
            Choose File
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png,image/jpeg"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="border p-1 rounded focus:ring-2 focus:ring-gray-800 text-sm w-full"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Music">Music</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-1 rounded focus:ring-2 focus:ring-gray-800 text-sm w-full"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Row 5: Image preview */}
        <div className="flex items-center justify-start mt-1">
          {form.image ? (
            <img
              src={form.image}
              alt="Preview"
              className="w-28 h-28 object-cover border rounded"
            />
          ) : (
            <div className="w-28 h-28 border rounded flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isFormChanged()}
          className={`px-4 py-1 rounded text-white w-fit ${
            isFormChanged()
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-sm`}
        >
          {id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
