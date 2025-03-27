import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/AboutPage";
import CategoriesAdminPage from "./pages/dashboard/CategoriesAdminPage";
import SideBar from "./components/Sidebar";
import { useEffect, useState } from "react";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ArticleTablePage from "./pages/dashboard/ArticleTablePage";
import CategoryPage from "./pages/CategoryPage";
import BlogPost from "./pages/BlogPost";
import UpdateProfilePage from "./pages/dashboard/UpdateProfilePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Default light mode
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const location = useLocation();

  const listDashboard = [
    "/dashboard",
    "/categories",
    "/articles/list",
    "/profile/update",
  ];
  const isDashboardPage = listDashboard.includes(location.pathname);
  return (
    <div className="flex min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      {!isDashboardPage && <Navbar />}
      {isDashboardPage && <SideBar />}
      {/* <button className="absolute top-4 right-4" onClick={() => setDarkMode(!darkMode)} type="button">toogle</button> */}
      <div className={`w-full ${isDashboardPage ? "pt-0 " : "pt-[60px]"}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/articles/list" element={<ArticleTablePage />} />
          <Route path="/categories" element={<CategoriesAdminPage />} />
          <Route path="/category/:category_id" element={<CategoryPage />} />
          <Route path="/articles/:id" element={<BlogPost />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
