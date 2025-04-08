import { useEffect, useState } from "react";
import { getArticles, deleteArticleById } from "../services/articleService";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const deleteArticle = async (id) => {
    try {
      await deleteArticleById(id);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  return { articles, loading, error, deleteArticle };
};
