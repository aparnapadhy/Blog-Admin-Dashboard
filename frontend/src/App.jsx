import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogForm from "./pages/BlogForm.jsx";
import BlogView from "./pages/BlogView.jsx";
import Statistics from "./pages/Statistics.jsx";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar />
          <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <Routes>
                <Route path="/" element={<Statistics />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/new" element={<BlogForm />} />
                <Route path="/blogs/edit/:id" element={<BlogForm />} />
                <Route path="/blogs/view/:id" element={<BlogView />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>

  );
}

export default App;
