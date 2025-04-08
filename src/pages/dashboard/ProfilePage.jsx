import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "John Doe",
    email: "4tM4I@example.com",
    avatar: "https://placehold.co/600x400",
  });

  const handleEdit = () => {
    navigate("/profile/update");
  };

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
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="w-full mt-1 p-3 border rounded bg-orange-100 text-gray-800">
            {user.name}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
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
