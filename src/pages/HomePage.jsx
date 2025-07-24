import { motion } from "framer-motion";
import "aos/dist/aos.css";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

import { useHome } from "../hooks/useHome.js";

const HomePage = () => {
  const {
    scrollToTopArticle,
    sectionTopArticle,
    categories,
    articles,
    loading,
    loadingArticle,
    handleBookmarkClick,
    handleCategoryClick,
    handleTopArticleList,
  } = useHome();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.div
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 text-white relative"
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
        <div className="relative z-10 px-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            Welcome to Our Food Blog
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 max-w-xl sm:max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            Discover delicious recipes, cooking tips, and food adventures that
            will tantalize your taste buds!
          </motion.p>
          <motion.button
            onClick={() => scrollToTopArticle(sectionTopArticle)}
            className="text-sm sm:text-base bg-white text-orange-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 hover:text-white transition"
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

        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {categories.map((category, index) => (
              <div
                role="button"
                tabIndex={0}
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center w-24 sm:w-28"
                data-aos="fade-in"
                data-aos-delay={index * 50}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full mb-2"></div>
                <p className="text-sm sm:text-base font-medium text-center">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="py-12 bg-white text-center px-4" data-aos="fade-in">
        <h2 className="text-2xl font-semibold mb-4">
          Find Your Favorite Recipes
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search for a recipe..."
            className="w-full bg-white text-slate-800 sm:w-64 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Link to="/category/101">
            <button className="w-full sm:w-auto bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition">
              Search
            </button>
          </Link>
        </div>
      </div>

      {/* Articles Section */}
      <div
        ref={sectionTopArticle}
        className="py-12 bg-orange-50 px-4"
        data-aos="fade-in"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          More Recipes
        </h2>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
            Top Western Food
          </h1>
          {loadingArticle ? (
            <p>Loading article...</p>
          ) : (
            <div>
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="w-full md:w-64">
                    <img
                      loading="lazy"
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-left flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        {article.total_like} Likes
                      </p>
                      <Link to={`/articles/${article.id}`}>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-sm">
                          Read Article
                        </button>
                      </Link>
                      <button
                        onClick={() => handleBookmarkClick(article.id)}
                        className="text-lg text-orange-500 hover:text-orange-600"
                      >
                        {article.bookmarks ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Category Swiper */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <motion.button
                  onClick={() => handleTopArticleList(category.id)}
                  className="w-full text-sm sm:text-base bg-white text-orange-500 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 hover:text-white transition"
                  data-aos="fade-in"
                  data-aos-delay={index * 100}
                >
                  {category.name}
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-controls mt-4 text-center">
            <button className="custom-prev px-4 py-4 bg-gray-300 rounded-full mr-2">
              <CircleChevronLeft />
            </button>
            <button className="custom-next px-4 py-4 bg-blue-500 text-white rounded-full">
              <CircleChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-white py-12 flex flex-col items-center text-center px-4 sm:px-8">
        <motion.p
          className="text-gray-800 max-w-lg mb-4 text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Lorem ipsum dolor sit amet consectetur. Adipiscing quis fusce a vel
          congue scelerisque...
        </motion.p>

        <motion.input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-64 px-4 py-2 border rounded-md text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        <motion.button
          className="w-full sm:w-auto mt-4 bg-gray-500 text-white px-6 py-2 rounded-md"
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
