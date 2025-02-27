import { Bookmark, BookmarkCheck } from "lucide-react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CardArticle = ({
  id,
  title,
  description,
  photo_url,
  total_like,
  is_bookmark,
}) => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/article/${id}`);
  };
  return (
    <div className="w-full flex bg-white shadow-md rounded-lg p-4 pb-8 max-w-none mx-auto justify-between mb-6">
      <div className="relative w-48 h-48 flex-shrink-0">
        <img
          src={photo_url}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={handleReadMore}
          className="absolute bottom-[-20px] left-1/2 -translate-x-1/2  bg-primary text-white hover:bg-secondary hover:text-backgrounddark px-3 py-2 rounded-md shadow-md text-sm whitespace-nowrap
        "
        >
          Read More
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1 ml-4">
        <div>
          <h2 className="text-2xl font-bold text-backgrounddark text-center">
            {title}
          </h2>
          <p className="text-gray-600 text-sm mt-1 text-center">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-500 text-sm">{total_like} Likes</p>
          {is_bookmark ? (
            <BookmarkCheck className="text-gray-700 w-5 h-5" />
          ) : (
            <Bookmark className="text-gray-400 w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
};

CardArticle.propTypes = {
  id: propTypes.number,
  title: propTypes.string,
  description: propTypes.string,
  photo_url: propTypes.string,
  total_like: propTypes.number,
  is_bookmark: propTypes.bool,
};

export default CardArticle;
