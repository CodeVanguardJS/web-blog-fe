import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[60px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
