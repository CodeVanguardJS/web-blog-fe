import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState({
    totalArticles: 0,
    totalLikes: 0,
    totalBookmarks: 0,
  });
  const [myArticle, setMyArticles] = useState([]);
  const [myBookmark, setMyBookmarks] = useState([]);
  useEffect(() => {
    const getMyBookmarks = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/bookmarks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setMyBookmarks(result.data);
    };

    const getMyArticles = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/articles/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setMyArticles(result.data.data);
    };

    const getDashboard = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setDashboard(result.data);
    };

    getDashboard();
    getMyArticles();
    getMyBookmarks();
  }, []);

  return (
    <div className="bg-orange-50 px-4 py-6 sm:px-6 lg:px-8 min-h-screen">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Article", value: dashboard.totalArticles },
          { label: "Total Likes", value: dashboard.totalLikes },
          { label: "Total Bookmarks", value: dashboard.totalBookmarks },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <p className="text-md md:text-lg font-semibold text-orange-600">
              {item.label}
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-700">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* All Recipes */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-orange-700 mb-4">
            All Recipes
          </h2>
          <div className="space-y-4 md:space-y-6">
            {myArticle.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={item.photo_url}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover bg-gray-300 rounded-lg"
                  alt={item.title}
                />
                <div className="mt-2 sm:mt-0 sm:ml-4">
                  <h3 className="text-md md:text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bookmark */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-orange-700 mb-4">
            Bookmark
          </h2>
          <div className="space-y-4 md:space-y-6">
            {myBookmark.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={item.article.photo_url}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover bg-gray-300 rounded-lg"
                  alt={item.article.title}
                />
                <div className="mt-2 sm:mt-0 sm:ml-4">
                  <h3 className="text-md md:text-lg font-bold text-gray-800">
                    {item.article.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.article.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
