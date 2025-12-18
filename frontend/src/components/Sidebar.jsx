import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/asset";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Statistics", path: "/" },
    { name: "Dashboard", path: "/blogs" },
    { name: "Deleted Blogs", path: "/deleted-blogs" },
  ];

  return (
    <div className="w-30 sm:w-64 bg-gray-800 text-white flex flex-col min-h-screen p-4 transition-width duration-300">
      <img
        src={assets.blogIcon}
        alt=""
        width={30}
        className="mb-8 mx-auto sm:mx-0"
      />
      <nav className="flex flex-col gap-2 text-xs sm:text-sm">
        {links.map((link) => {
          const isActive =
            link.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(link.path);

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`p-2 rounded hover:bg-gray-700 text-center sm:text-left ${
                isActive ? "bg-gray-700" : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
