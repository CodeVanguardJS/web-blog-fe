import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    categoryId: "",
    description: "",
    contents: [""],
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthorized(!!token);

    if (token) {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/categories`);
      const result = await res.json();
      setCategories(result.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (index, value) => {
    const updatedContents = [...formData.contents];
    updatedContents[index] = value;
    setFormData((prev) => ({
      ...prev,
      contents: updatedContents,
    }));
  };

  const addContentStep = () => {
    setFormData((prev) => ({
      ...prev,
      contents: [...prev.contents, ""],
    }));
  };

  const removeContentStep = (index) => {
    if (formData.contents.length > 1) {
      const updatedContents = formData.contents.filter((_, idx) => idx !== index);
      setFormData((prev) => ({
        ...prev,
        contents: updatedContents,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }
  
    // Manual validation
    if (!formData.title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (!formData.categoryId) {
      alert("Please select a category.");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter a description.");
      return;
    }
    if (!formData.image) {
      alert("Please upload a photo.");
      return;
    }
  
    // Validating contents and ensuring no empty steps
    const validContents = formData.contents.filter(content => content.trim() !== "");
    if (validContents.length === 0) {
      alert("Please add at least one content step.");
      return;
    }
  
    // Membuat array untuk recipes dengan properti content sebagai string utuh
    const recipes = validContents.map(content => ({
      content: content.trim(), // Pastikan content adalah string utuh
    }));
  
    // Debug log untuk memastikan format data sebelum dikirim
    console.log("recipes data:", recipes);
  
    setLoading(true);
  
    try {
      const form = new FormData();
      form.append("title", formData.title.trim());
      form.append("categoryId", formData.categoryId);
      form.append("description", formData.description.trim());
      form.append("recipes", JSON.stringify(recipes)); // Kirim array objek dalam format JSON
      form.append("photo", formData.image);
  
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/articles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
  
      const result = await res.json();
      console.log("result", result);
  
      if (!res.ok) {
        console.error("Failed to create article:", result);
        alert(result.message || "Failed to create article.");
        return;
      }
  
      alert("Article created successfully!");
      navigate("/articles/list");
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-orange-700 font-bold">
          Please log in to create an article.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">Create New Article</h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block text-sm font-semibold mb-1">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-48 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Select Category */}
        <div>
          <label className="block text-sm font-semibold mb-1">Select Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Content / Recipe Steps */}
        <div>
          <label className="block text-sm font-semibold mb-1">Recipe Steps</label>
          {formData.contents.map((content, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-2">
              <textarea
                value={content}
                onChange={(e) => handleContentChange(idx, e.target.value)}
                rows={2}
                placeholder={`Step ${idx + 1}`}
                className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formData.contents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContentStep(idx)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                  title="Remove step"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addContentStep}
            className="mt-2 text-sm text-orange-600 hover:underline"
          >
            + Add Step
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg shadow font-semibold ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Publishing..." : "Publish"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default NewArticlePage;
