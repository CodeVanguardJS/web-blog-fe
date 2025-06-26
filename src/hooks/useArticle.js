// import { useEffect, useState } from "react";
// import { getArticles, deleteArticleById } from "../services/articleService";

// export const useArticles = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const data = await getArticles();
//         setArticles(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   const deleteArticle = async (id) => {
//     try {
//       await deleteArticleById(id);
//       setArticles(articles.filter((article) => article.id !== id));
//     } catch (err) {
//       console.error("Failed to delete article:", err);
//     }
//   };

//   return { articles, loading, error, deleteArticle };
// };


// hooks/useArticle.js
import { useEffect, useState } from "react";
import { getArticles, deleteArticleById } from "../services/articleService";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [activeTab, setActiveTab] = useState("published");
  const limit = 6;

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getArticles(limit, page, activeTab.toUpperCase()); // update service
      setArticles(res.data);
      console.log(`res`, res);
      setCurrentPage(res.currentPage);
      setTotalPage(res.totalPage);
    } catch (err) {
      setError(err.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage, activeTab]);

  const deleteArticle = async (id) => {
    try {
      await deleteArticleById(id);
      fetchArticles(currentPage);
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  return {
    activeTab,
    setActiveTab,
    articles,
    loading,
    error,
    currentPage,
    totalPage,
    setCurrentPage,
    deleteArticle,
  };
};
