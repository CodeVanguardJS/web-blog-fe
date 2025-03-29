import { motion } from "motion/react";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

const UpdateProfilePage = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    preview,
    handlePhotoChange,
    handleSubmit,
    loading,
  } = useUpdateProfile();

  return (
    <div className="flex h-full w-full items-center justify-center bg-orange-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-5xl"
      >
        <h1 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <motion.img
              src={preview}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
            <input type="file" onChange={handlePhotoChange} accept="image/*" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border rounded bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border rounded bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg shadow hover:bg-orange-600 transition font-semibold"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Saving..." : "Save"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfilePage;
