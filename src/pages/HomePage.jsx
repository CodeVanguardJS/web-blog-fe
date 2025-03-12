import { motion } from "framer-motion";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Footer from "../components/Footer";
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingArticle, setLoadingArticle] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/categories`
        ); // Ganti dengan endpoint API yang sesuai
        const categories = await response.json();
        setCategories(categories.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/articles?limit=2`
        ); // Ganti dengan endpoint API yang sesuai
        const articles = await response.json();
        setArticles(articles.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoadingArticle(false);
      }
    };

    fetchArticles();
    fetchCategories();
  }, []);

  // const articles = [
  //   {
  //     title: "Chicken Soup",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur. Adipiscing quis fusce a vel congue scelerisque.Lorem ipsum dolor sit amet consectetur. Adipiscing quis fusce a vel congue scelerisque.Lorem ipsum dolor sit amet consectetur. Adipiscing quis fusce a vel congue scelerisque.",
  //     likes: 12,
  //     image:
  //       "https://downshiftology.com/wp-content/uploads/2023/10/Chicken-Soup-main-2-500x375.jpg",
  //     bookmarks: true,
  //   },
  //   {
  //     title: "Chicken Katsu",
  //     description:
  //       "Dui eu fames imperdiet donec feugiat nam. Ac massa urna viverra auctor mi pellentesque.",
  //     likes: 15,
  //     image:
  //       "https://downshiftology.com/wp-content/uploads/2023/10/Chicken-Soup-main-2-500x375.jpg",
  //     bookmarks: false,
  //   },
  // ];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="h-screen flex flex-col justify-center items-center text-center px-4 text-white relative"
        style={{
          backgroundImage:
            "url('https://img-cdn.medkomtek.com/NB0CDxTtOcGUoS1UvfDzZmCyOEc=/0x0/smart/filters:quality(100):format(webp)/article/ety2TliWToJL9aRu_J8er/original/24mlji190zvfxtjabasz48zea17jmuin.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-9">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            Welcome to Our Food Blog
          </motion.h1>
          <motion.p
            className="text-lg mb-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            Discover delicious recipes, cooking tips, and food adventures that
            will tantalize your taste buds!
          </motion.p>
          <motion.button
            className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-orange-600 hover:text-white transition"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Recipes
          </motion.button>
        </div>
      </motion.div>

      {/* Category Section */}
      <div className="py-12 bg-orange-50 text-center" data-aos="fade-in">
        <h2 className="text-3xl font-semibold mb-6">Browse by Category</h2>
        {/* <div className="flex justify-center flex-wrap gap-6">
          {categories2.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              data-aos="fade-in"
              data-aos-delay={index * 50}
            >
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
              <p className="text-lg font-medium">{category}</p>
            </div>
          ))}
        </div> */}
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="flex justify-center flex-wrap gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                data-aos="fade-in"
                data-aos-delay={index * 50}
              >
                <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
                <p className="text-lg font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="py-12 bg-white text-center" data-aos="fade-in">
        <h2 className="text-2xl font-semibold mb-4">
          Find Your Favorite Recipes
        </h2>
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search for a recipe..."
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <span className="text-lg">or</span>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition">
            View All Recipes
          </button>
        </div>
      </div>

      {/* Articles Section */}
      <div className="py-12 bg-orange-50" data-aos="fade-in">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          More Recipes
        </h2>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Top Western Food</h1>
          <div className="">
            {/* {articles.map((article, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md mb-6 flex gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="min-w-64">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="text-left flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold flex-shrink-1 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{article.description}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      {article.likes} Likes
                    </p>
                    <p className="text-sm text-gray-500">
                      {article.bookmarks ? <FaBookmark /> : <FaRegBookmark />}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))} */}
            {loadingArticle ? (
              <p>Loading article...</p>
            ) : (
              <div className="">
                {articles.map((article, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md mb-6 flex gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="min-w-64">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-64 h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-left flex flex-col justify-between w-full">
                      <div>
                        <h3 className="text-2xl font-bold flex-shrink-1 mb-3">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {article.description}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">
                          {article.likes} Likes
                        </p>
                        <p className="text-sm text-gray-500">
                          {article.bookmarks ? (
                            <FaBookmark />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-6">
            {categories.map((category, index) => (
              <button
                className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-orange-600 hover:text-white transition"
                data-aos="fade-in"
                data-aos-delay={index * 100}
                key={index}
              >
                {category.name}
              </button>
              // <div key={index} data-aos="fade-in" data-aos-delay={index * 100}>
              //   <h2 className="text-3xl font-semibold mb-6">{category}</h2>
              // </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-12 flex flex-col items-center text-center px-4">
        <motion.p
          className="text-gray-800 max-w-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Lorem ipsum dolor sit amet consectetur. Adipiscing quis fusce a vel
          congue scelerisque. Mauris morbi vitae nam velit. Dui eu fames
          imperdiet donec feugiat nam. Ac massa urna viverra auctor mi
          pellentesque.
        </motion.p>

        <motion.input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border rounded-md w-64 text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        <motion.button
          className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Subscribe for more recipes
        </motion.button>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
