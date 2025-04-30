import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok || !result.status) {
          if (result.message === "Invalid or expired token") {
            localStorage.removeItem("token");
            navigate("/login"); // Redirect to login page
          }
          throw new Error(result.message || "Failed to fetch profile");
        }

        setUser(result.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleEdit = () => {
    navigate("/profile/update");
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-orange-600 font-semibold text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-100">
        <div className="text-red-600 font-semibold text-xl text-center max-w-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-orange-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-5xl"
      >
        <h1 className="text-2xl font-bold text-orange-600 text-center mb-6">
          My Profile
        </h1>

        <div className="flex flex-col items-center gap-4">
          <motion.img
            src={user.photo_url || "https://placehold.co/600x400?text=No+Image"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg object-cover"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="w-full mt-1 p-3 border rounded bg-orange-100 text-gray-800">
            {user.name}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="w-full mt-1 p-3 border rounded bg-orange-100 text-gray-800">
            {user.email}
          </div>
        </div>

        <div className="mt-6">
          <motion.button
            onClick={handleEdit}
            className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg shadow hover:bg-orange-600 transition font-semibold"
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
