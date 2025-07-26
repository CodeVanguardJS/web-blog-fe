import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeroArticle from "../components/HeroArticle.jsx";
import CardArticle from "../components/CardArticle.jsx";
import Footer from "../components/Footer.jsx";

const CategoryPage = () => {
  const { category_id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdateArticleState = (id, updatedFields) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, ...updatedFields } : article
      )
    );
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/articles/category/${category_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const result = await response.json();
        const validData = (result.data || []).filter((a) => a && a.id);
        setArticles(validData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category_id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const categoryName = articles[0]?.category?.name;

  return (
    <div className="min-h-screen mx-auto bg-backgroundlight px-4 sm:px-6 md:px-8 pb-0 pt-6">
      {articles.length > 0 && (
        <HeroArticle
          id={articles[0].id}
          title={articles[0].title}
          photo_url={articles[0].photo_url}
          description={articles[0].description}
        />
      )}

      <p className="text-center text-backgrounddark text-lg italic mb-4">
        Category: {categoryName}
      </p>

      {/* List Card Article */}
      {articles.length > 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <CardArticle
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              total_like={Number(article.total_like ?? 0)}
              is_like={article.is_like ?? false}
              is_bookmark={article.is_bookmark ?? false}
              photo_url={article.photo_url}
              onUpdate={handleUpdateArticleState}
            />
          ))}
        </div>
      ) : (
        <p className="text-backgrounddark text-center">No articles found</p>
      )}

      <div className="h-10" />
      <Footer />
    </div>
  );
};

export default CategoryPage;
