import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    navigate("/login", { state: { success: "Registration successful!" } });
  };

  const handleLearnMore = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/3 bg-primary text-white flex items-center justify-center">
        <form onSubmit={handleSubmit} noValidate className="space-y-6 w-3/4">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>

          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-highlightAction bg-backgroundlight text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-highlightAction bg-backgroundlight text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-highlightAction bg-backgroundlight text-black"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-highlightAction bg-backgroundlight text-black"
          />
          <button
            type="submit"
            className="bg-highlightAction text-black font-semibold w-full py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Right Side - Text */}
      <div className="w-2/3 bg-backgroundlight flex items-center">
        <div className="w-3/4 mx-auto">
          <h2 className="text-4xl font-bold text-black mb-4">Welcome !</h2>
          <p className="text-black text-lg leading-relaxed">
          Discover a world of flavors with our curated collection of global recipes. From savory delights and indulgent desserts to refreshing beverages, our blog is your ultimate guide to culinary adventures. Learn new techniques, explore diverse cuisines, and bring the vibrant tastes of the world to your table. Let&apos;s turn every meal into a flavorful celebration of culture and creativity!
          </p>
          <button
            className="mt-6 bg-secondary text-black py-2 px-6 rounded-md hover:bg-accent hover:text-white transition-all duration-300"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
