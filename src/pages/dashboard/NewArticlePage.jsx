import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const NewArticlePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    description: "",
    contents: [""],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/categories`);
        const result = await res.json();
        setCategories(result.data || []);
      } catch (error) {
        console.error("Gagal fetch kategori:", error);
        Swal.fire("Error", "Gagal mengambil kategori.", "error");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (index, value) => {
    const updated = [...formData.contents];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, contents: updated }));
  };

  const addContentStep = () => {
    setFormData((prev) => ({ ...prev, contents: [...prev.contents, ""] }));
  };

  const removeContentStep = (index) => {
    const updated = [...formData.contents];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, contents: updated }));
  };

  const handleSubmit = async (type) => {
    try {
      const form = new FormData();
      if (formData.title) form.append("title", formData.title);
      if (formData.category) form.append("categoryId", formData.category);
      if (formData.description) form.append("description", formData.description);
      if (formData.image instanceof File) form.append("photo", formData.image);
      form.append("articleType", type); // DRAFT or PUBLISHED

      for (const step of formData.contents) {
        form.append("recipes", step);
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/articles`, {
        method: "POST",
        body: form,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Failed to create article",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: type === "PUBLISHED" ? "Article published!" : "Draft saved!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/articles/list");
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong while creating the article.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">New Article</h1>

      <motion.div
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
          <input type="file" accept="image/*" onChange={handleImageUpload} />
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
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">-- Choose Category --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
          ></textarea>
        </div>

        {/* Content / Recipe Steps */}
        <div>
          <label className="block text-sm font-semibold mb-1">Content / Recipe</label>
          {formData.contents.map((content, index) => (
            <div key={index} className="flex items-start gap-2 mb-2">
              <textarea
                value={content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                rows={2}
                className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder={`Step ${index + 1}`}
              />
              {formData.contents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContentStep(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                  title="Delete step"
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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/articles/list")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition font-semibold"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubmit("DRAFT")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition font-semibold"
          >
            Save as Draft
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubmit("PUBLISHED")}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition font-semibold"
          >
            Publish
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
};

export default NewArticlePage;
