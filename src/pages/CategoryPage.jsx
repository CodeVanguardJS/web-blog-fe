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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://6ee3d88c-4e61-40dc-9cb3-172889b02220.mock.pstmn.io/article/category/${category_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const result = await response.json();
        setArticles(result.data || []);
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

  return (
    <div className="min-h-screen mx-auto bg-backgroundlight p-6 pb-0">
      {articles.length > 0 && (
        <HeroArticle
          title={articles[0].title}
          photo_url={articles[0].photo_url}
          description={articles[0].description}
        />
      )}

      <h1 className="text-4xl font-bold mb-4 text-center text-backgrounddark my-6">
        Articles in {articles[0]?.Category?.name || "Unknown"} Category
      </h1>

      {articles.length > 1 ? (
        <div className="grid grid-cols-2 gap-6">
          {articles.slice(1).map((article) => (
            <CardArticle
              key={article.id}
              title={article.title}
              description={article.description}
              photo_url={article.photo_url}
              total_like={article.total_like}
              is_bookmark={article.is_bookmark}
            />
          ))}
        </div>
      ) : (
        <p className="text-backgrounddark text-center">No articles found</p>
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
