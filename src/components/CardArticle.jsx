import { Bookmark, BookmarkCheck, Heart, HeartOff } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CardArticle = ({
  id,
  title,
  description,
  photo_url,
  total_like,
  is_like,
  is_bookmark,
  onUpdate,
}) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(is_like);
  const [likeCount, setLikeCount] = useState(total_like);
  const [bookmarked, setBookmarked] = useState(is_bookmark);
  const [isProcessingLike, setIsProcessingLike] = useState(false);
  const [isProcessingBookmark, setIsProcessingBookmark] = useState(false);

  useEffect(() => {
    setLiked(is_like);
    setLikeCount(total_like);
    setBookmarked(is_bookmark);
  }, [is_like, total_like, is_bookmark]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to like this article.");
    if (isProcessingLike) return;
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
          body: JSON.stringify({ article_id: id }),
        }
      );

      const data = await response.json();

      if (response.ok && data?.data?.liked !== undefined) {
        const newLiked = data.data.liked;
        const newCount = newLiked ? likeCount + 1 : Math.max(likeCount - 1, 0);

        setLiked(newLiked);
        setLikeCount(newCount);

        if (onUpdate) {
          onUpdate(id, { is_like: newLiked, total_like: newCount });
        }
      } else {
        alert(`Failed to toggle like: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsProcessingLike(false);
    }
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to bookmark this article.");
    if (isProcessingBookmark) return;
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
          body: JSON.stringify({ article_id: id }),
        }
      );

      const data = await response.json();

      if (response.ok && data?.data?.bookmarked !== undefined) {
        setBookmarked(data.data.bookmarked);

        if (onUpdate) {
          onUpdate(id, { is_bookmark: data.data.bookmarked });
        }
      } else {
        alert(`Failed to toggle bookmark: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsProcessingBookmark(false);
    }
  };

  const handleReadMore = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 max-w-none mx-auto justify-between mb-6">
      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={photo_url}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={handleReadMore}
          className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-primary text-white hover:bg-secondary hover:text-backgrounddark px-3 py-2 rounded-md shadow-md text-sm whitespace-nowrap"
        >
          Read More
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1 sm:ml-4">
        <div>
          <h2 className="text-xl font-bold text-backgrounddark text-center sm:text-left">
            {title}
          </h2>
          <p className="text-gray-600 text-sm mt-1 text-center sm:text-left">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 px-2 sm:px-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              disabled={isProcessingLike}
              className="focus:outline-none"
            >
              {liked ? (
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              ) : (
                <HeartOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <span className="text-sm text-gray-500">{likeCount} Likes</span>
          </div>

          <button
            onClick={handleBookmark}
            disabled={isProcessingBookmark}
            className="focus:outline-none"
          >
            {bookmarked ? (
              <BookmarkCheck className="text-gray-700 w-5 h-5" />
            ) : (
              <Bookmark className="text-gray-400 w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

CardArticle.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  total_like: PropTypes.number.isRequired,
  is_like: PropTypes.bool.isRequired,
  is_bookmark: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
};

export default CardArticle;
