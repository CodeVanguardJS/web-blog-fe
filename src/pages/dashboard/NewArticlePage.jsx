import { useState } from "react";
import { motion } from "framer-motion";

const NewArticlePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    description: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (status) => {
    console.log("Submitted as:", status);
    console.log(formData);
    // Logic to handle post based on status (publish/draft)
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">New Article</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-4 w-48 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Select Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="">-- Choose Category --</option>
            <option value="appetizer">Appetizer</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Content / Recipe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe / Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 border rounded bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
            onClick={() => alert("New Content feature not implemented yet")}
          >
            + New Content
          </motion.button>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition font-semibold"
              onClick={() => handleSubmit("publish")}
            >
              Publish
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition font-semibold"
              onClick={() => handleSubmit("save as draft")}
            >
              Save as Draft
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewArticlePage;
