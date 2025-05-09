import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useArticles } from "../../hooks/useArticle";
import ConfirmationModal from "../../components/ConfirmationModal";

const ArticleTablePage = () => {
  // const { articles, loading, error, deleteArticle } = useArticles();
  const {
    articles,
    loading,
    error,
    currentPage,
    totalPage,
    setCurrentPage,
    deleteArticle,
    activeTab,
    setActiveTab,
  } = useArticles();

  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedArticle) {
      deleteArticle(selectedArticle.id);
      setShowModal(false);
    }
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">
        Article and Drafts
      </h1>
      <Link to="/articles/create">
        <button className="px-4 py-2 rounded-lg bg-orange-600 text-white mb-3">
          Create
        </button>
      </Link>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {["published", "draft"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${activeTab.toLowerCase() === tab ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"}`}
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
                  <Link to={`/articles/update/${article.id}`}>
                    <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                      <Pencil size={16} />
                    </button>
                  </Link>
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

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete "${selectedArticle?.title}"?`}
      />
    </div>
  );
};

export default ArticleTablePage;
