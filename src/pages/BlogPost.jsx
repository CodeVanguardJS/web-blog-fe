import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bookmark, BookmarkCheck, Heart, HeartOff } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/articles/${id}`);
        const data = await response.json();
        console.log("fetch data", data)
        setArticle(data.data); 
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading article...</p>;
  }

  if (!article) {
    return <p className="text-center text-lg text-red-500">Article not found.</p>;
  }

  return (
    <div className="min-h-screen mx-auto p-4 bg-backgroundlight">
    <div className="max-w-4xl mx-auto p-4 ">
      {/* Judul Artikel */}
      <h1 className="text-3xl font-bold text-backgrounddark">{article.title}</h1>

      {/* Info Penulis */}
      <div className="flex items-center gap-4 mt-2">
        <img
          src={article.user.photo_url}
          alt={article.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-gray-800 font-semibold">{article.user.name}</p>
          <p className="text-gray-500 text-sm">{article.category.name}</p>
        </div>
      </div>

      {/* Gambar Artikel */}
      <img src={article.photo_url} alt={article.title} className="w-full h-64 w-64 object-cover rounded-md mt-4" />

      {/* Deskripsi */}
      <p className="text-gray-600 mt-4">{article.description}</p>

      {/* Status Like & Bookmark */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          {article.is_liked ? (
            <Heart className="text-red-500 w-6 h-6" />
          ) : (
            <HeartOff className="text-gray-400 w-6 h-6" />
          )}
          <span className="text-gray-700">{article.total_like} Likes</span>
        </div>
        <div>
          {article.is_bookmarked ? (
            <BookmarkCheck className="text-blue-500 w-6 h-6" />
          ) : (
            <Bookmark className="text-gray-400 w-6 h-6" />
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BlogPost;
