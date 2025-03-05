import { useEffect, useState } from "react";
import { useParams,  useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, Heart, HeartOff } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReadMore = (id) => {
    navigate(`/articles/${id}`);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/articles/${id}`
        );
        const data = await response.json();
        setArticle(data.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/articles/101`);
        const data = await response.json();
        setRelatedArticles(data.data ? [data.data] : []);
      } catch (error) {
        console.error("Error fetching related articles:", error);
      }
    };
    fetchRelatedArticles();
  }, [id]);
  
  if (loading) {
    return <p className="text-center text-lg">Loading article...</p>;
  }

  if (!article) {
    return (
      <p className="text-center text-lg text-red-500">Article not found.</p>
    );
  }

  return (
    <div className="min-h-screen mx-auto p-4 bg-backgroundlight">
      <div className="min-h-screen mx-auto p-4">
        <h1 className="text-3xl font-bold text-primary">{article.title}</h1>

        <div className="flex items-center gap-4 mt-2">
          <img
            src={article.user.photo_url}
            alt={article.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-backgrounddark font-semibold">
              {article.user.name}
            </p>
            <p className="text-gray-500 text-sm">{article.category.name}</p>
          </div>
        </div>

        <div className="relative mt-4 max-2xl:mx-auto mb-32">
          <img
            src={article.photo_url}
            alt={article.title}
            className="h-72 w-72 object-cover rounded-md"
          />

          <div className="absolute bottom-0 left-80 flex flex-col gap-4 bg-white bg-opacity-75 p-2 rounded-md shadow-md">
            <button className="flex items-center gap-1">
              {article.is_liked ? (
                <Heart className="text-red-500 w-6 h-6" />
              ) : (
                <HeartOff className="text-gray-400 w-6 h-6" />
              )}
              <span className="text-gray-700 text-sm">
                {article.total_like} Likes
              </span>
            </button>

            <button>
              {article.is_bookmarked ? (
                <BookmarkCheck className="text-blue-500 w-6 h-6" />
              ) : (
                <Bookmark className="text-gray-400 w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 bg-secondary px-4 py-4">
          <h2 className="text-3xl font-semibold text-backgrounddark">
            {article.title}
          </h2>
          <p className="text-backgrounddark mt-4">{article.description}</p>
        </div>

        <div className="flex gap-8 mt-6">
          <div className="w-2/3 bg-secondary px-6 py-4">
            <h1 className="text-3xl text-center font-bold text-backgrounddark">
              Recipe & How To Cook
            </h1>
            {article.recipes && article.recipes.length > 0 && (
              <div className="mt-4 text-justify">
                <h2 className="text-2xl font-semibold text-backgrounddark mb-2">
                  Recipe Steps
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {article.recipes.map((recipe) => (
                    <li key={recipe.id} className="mt-2">
                      {recipe.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-1/3 bg-backgroundlight px-6 py-4">
            <h2 className="text-2xl font-semibold text-backgrounddark mb-4 text-center">
              More Recipes
            </h2>
            <div className="grid gap-4">
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle.id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={relatedArticle.photo_url} 
                    alt={relatedArticle.title} 
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2 text-backgrounddark">
                    {relatedArticle.title}
                  </h3>
                  <button
                    onClick={() => handleReadMore(relatedArticle.id)}
                    className="mt-2 bg-primary text-white hover:bg-secondary hover:text-backgrounddark px-3 py-2 rounded-md shadow-md text-sm whitespace-nowrap"
                  >
                    View Recipe
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
