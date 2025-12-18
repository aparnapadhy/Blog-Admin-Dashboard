import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load from localStorage on first render
  const [blogs, setBlogs] = useState(() => {
    const storedBlogs = localStorage.getItem("blogs");
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  });

  // Save to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);


  //Auto purge logic
  useEffect(() => {
  const now = Date.now();

  setBlogs(prev =>
    prev.filter(blog => {
      if (!blog.isDeleted) return true;
      if (!blog.deletedAt) return true;

      return now - blog.deletedAt < 7 * 24 * 60 * 60 * 1000;
    })
  );
}, []);



  return (
    <AppContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
