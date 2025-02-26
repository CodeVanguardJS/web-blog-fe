import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

const ArticleTablePage = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [articles, setArticles] = useState([
    { id: 1, title: "React Basics", slug: "react-basics" },
    { id: 2, title: "Advanced JavaScript", slug: "advanced-js" },
    { id: 3, title: "CSS Grid Layout", slug: "css-grid-layout" },
    { id: 4, title: "Node.js Crash Course", slug: "nodejs-crash-course" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setArticles(articles.filter((a) => a.id !== selectedArticle.id));
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">
        Article and Drafts
      </h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {["published", "draft"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === tab
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-600 text-white">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <motion.tr
                key={article.id}
                className="border-b hover:bg-orange-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="p-3">{article.title}</td>
                <td className="p-3">{article.slug}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleDelete(article)}
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg">
              Are you sure you want to delete &quot;{selectedArticle.title}&quot;?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleTablePage;
