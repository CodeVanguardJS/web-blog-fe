import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/AboutPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[60px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category/:category_id" element={<CategoryPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
