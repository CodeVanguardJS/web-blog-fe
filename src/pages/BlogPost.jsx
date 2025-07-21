import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, Heart, HeartOff } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [isProcessingLike, setIsProcessingLike] = useState(false);
  const [isProcessingBookmark, setIsProcessingBookmark] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);

      setArticle (null);
      setIsLiked (false);
      setIsBookmarked (false);
      setTotalLikes (0);

      try {
        const token = localStorage.getItem("token");
        const response =await fetch (
          `${import.meta.env.VITE_BACKEND_API}/articles/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}`})
            },
          }
        )
        const data = await response.json();

        if (data && data.data) {
          setArticle(data.data);
          setIsLiked(data.data.is_like || false);
          setIsBookmarked(data.data.is_bookmark || false);
          setTotalLikes(data.data.total_like || 0);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/articles?articleType=PUBLISHED&take=10`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        const data = await response.json();

        const articlesArray = Array.isArray(data.data?.data)
          ? data.data.data
          : [];

        const filtered = articlesArray.filter((item) => item.id !== Number(id));
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setRelatedArticles(selected);
      } catch (error) {
        console.error("Error fetching related articles:", error);
        setRelatedArticles([]);
      }
    };

    fetchRelatedArticles();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleToggleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to like this article.");

    setIsProcessingLike(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ article_id: Number(id) }),
        }
      );

      const data = await response.json();

      if (response.ok && data?.data?.liked !== undefined) {
        setIsLiked(data.data.liked);
        setTotalLikes((prev) =>
          data.data.liked ? prev + 1 : Math.max(prev - 1, 0)
        );
      } else {
        alert(`Failed to toggle like: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsProcessingLike(false);
    }
  };

  const handleToggleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to bookmark this article.");

    setIsProcessingBookmark(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/bookmarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ article_id: Number(id) }),
        }
      );

      const result = await response.json();

      if (response.ok && result?.data?.bookmarked !== undefined) {
        setIsBookmarked(result.data.bookmarked);
      } else {
        alert(
          `Failed to toggle bookmark: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsProcessingBookmark(false);
    }
  };

  const handleReadMore = (id) => navigate(`/articles/${id}`);

  if (loading) return <p className="text-center text-lg">Loading article...</p>;
  if (!article)
    return (
      <p className="text-center text-lg text-red-500">Article not found.</p>
    );

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-backgroundlight">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
        {article.title}
      </h1>

      {/* Author & Category */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={article.user?.photo_url}
          alt={article.user?.name || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-backgrounddark font-semibold">
            {article.user?.name}
          </p>
          <p className="text-gray-500 text-sm">{article.category?.name}</p>
        </div>
      </div>

      {/* Article Image with Ratio and Like/Bookmark */}
      <div className="relative mb-8 w-full max-w-3xl mx-auto aspect-[4/3]">
        <img
          src={article.photo_url}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
        <div className="absolute bottom-4 right-4 flex flex-col gap-4 bg-white bg-opacity-80 p-2 rounded-md shadow-md">
          <button
            onClick={handleToggleLike}
            disabled={isProcessingLike}
            className="flex items-center gap-1"
          >
            {isLiked ? (
              <Heart className="text-red-500 w-6 h-6" />
            ) : (
              <HeartOff className="text-gray-400 w-6 h-6" />
            )}
            <span className="text-gray-700 text-sm">{totalLikes} Likes</span>
          </button>
          <button
            onClick={handleToggleBookmark}
            disabled={isProcessingBookmark}
          >
            {isBookmarked ? (
              <BookmarkCheck className="text-blue-500 w-6 h-6" />
            ) : (
              <Bookmark className="text-gray-400 w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-secondary px-4 py-4 rounded-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-backgrounddark">
          {article.title}
        </h2>
        <p className="text-backgrounddark mt-4 text-justify">
          {article.description}
        </p>
      </div>

      {/* Recipe and Related Articles */}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* Recipe Section */}
        <div className="w-full lg:w-2/3 bg-secondary px-6 py-4 rounded-md">
          <h1 className="text-2xl text-center font-bold text-backgrounddark mb-4">
            Recipe & How To Cook
          </h1>
          {article.recipes?.length > 0 && (
            <div className="mt-4 text-justify">
              <h2 className="text-xl font-semibold text-backgrounddark mb-2">
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

        {/* Related Articles */}
        <div className="w-full lg:w-1/3 bg-backgroundlight px-6 py-4 rounded-md">
          <h2 className="text-xl font-semibold text-backgrounddark mb-4 text-center">
            More Recipes
          </h2>
          <div className="grid gap-4">
            {relatedArticles.map((relatedArticle) => (
              <div
                key={relatedArticle.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="relative w-full aspect-[4/3]">
                  <img
                    src={relatedArticle.photo_url}
                    alt={relatedArticle.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  />
                </div>
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
  );
};

export default BlogPost;
