import Aos from "aos";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../services/categoryService";

export const useHome = () => {
    const sectionTopArticle = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [activeCategory, setActiveCategory] = useState(101);

  const scrollToTopArticle = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (categoryId) => {
    // console.log(categoryId);
    navigate(`/category/${categoryId}`);
  };

  const handleBookmarkClick = (articleId) => {
    console.log("bookmark clicked", articleId);
  };

  const fetchArticles = async (categoryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/articles/category/${categoryId}`
      ); // Ganti dengan endpoint API yang sesuai
      const articles = await response.json();
      setArticles(articles.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoadingArticle(false);
    }
  };

  const handleTopArticleList = async (categoryId) => {
    setActiveCategory(categoryId);
    console.log(activeCategory);
  };

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-out", once: false });

    const consumeCategories = async () => {
      try {
        const listCategories = await fetchCategories()
        setCategories(listCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    consumeCategories();
  }, []);

  useEffect(() => {
    fetchArticles(activeCategory);
  }, [activeCategory]);

  return {
    sectionTopArticle,
    navigate,
    categories,
    articles,
    loading,
    loadingArticle,
    activeCategory,
    scrollToTopArticle,
    handleCategoryClick,
    handleBookmarkClick,
    handleTopArticleList
  }
};