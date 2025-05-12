import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");
        
        const result = await res.json();
        console.log("Profile Result:", result); // Debugging line

        if (result.status) {
          setUser(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-100">
        <p className="text-orange-600 font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-100">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-100">
        <p className="text-red-500 font-semibold">User not found</p>
      </div>
    );
  }

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
            src={
              user.photo_url
                ? user.photo_url
                : "https://placehold.co/600x400?text=No+Photo"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg object-cover"
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="w-full mt-1 p-3 border rounded bg-orange-100">{user.name}</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="w-full mt-1 p-3 border rounded bg-orange-100">{user.email}</p>
        </div>
        <div className="mt-6">
          <motion.a
            href="/profile/update"
            className="w-full inline-block text-center bg-orange-500 text-white px-4 py-3 rounded-lg shadow hover:bg-orange-600 transition font-semibold"
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
