import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  //Load from localStorage
  const [blogs, setBlogs] = useState(() => {
    const storedBlogs = localStorage.getItem("blogs");
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  });

  //Persist to localStorage
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  //Soft delete
  const softDeleteBlog = (id) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              isDeleted: true,
              deletedAt: new Date().toISOString(),
            }
          : blog
      )
    );
  };

  //Restore blog
  const restoreBlog = (id) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, isDeleted: false, deletedAt: null }
          : blog
      )
    );
  };

  //Permanent delete
  const permanentlyDeleteBlog = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  //Auto purge (7 days)
  useEffect(() => {
    const now = Date.now();
    const RETENTION_TIME = 7 * 24 * 60 * 60 * 1000;

    setBlogs((prev) =>
      prev.filter((blog) => {
        if (!blog.isDeleted) return true;
        if (!blog.deletedAt) return true;

        const deletedTime = new Date(blog.deletedAt).getTime();
        return now - deletedTime < RETENTION_TIME;
      })
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        blogs,
        setBlogs,
        softDeleteBlog,
        restoreBlog,
        permanentlyDeleteBlog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
