import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const UpdateArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    categoryId: "",
    description: "",
    recipes: [{ id: null, step: "" }],
  });

  const [originalRecipeIds, setOriginalRecipeIds] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/categories`
        );
        const result = await res.json();
        setCategories(result.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/articles/${id}`
        );
        const result = await res.json();
        if (!res.ok)
          throw new Error(result.message || "Failed to fetch article");

        const data = result.data;
        const fetchedRecipes = (data.recipes || []).map((r) => ({
          id: r.id,
          step: r.content,
        }));

        setFormData({
          title: data.title || "",
          categoryId: data.category_id?.toString() || "",
          description: data.description || "",
          image: null,
          recipes: fetchedRecipes.length
            ? fetchedRecipes
            : [{ id: null, step: "" }],
        });

        setOriginalRecipeIds(fetchedRecipes.map((r) => r.id));
        setImagePreview(data.photo_url || null);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        Swal.fire("Error", "Article not found.", "error").then(() => {
          navigate("/articles/list");
        });
      }
    };

    fetchCategories();
    fetchArticle();
  }, [id, navigate]);

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

  const handleRecipeChange = (index, value) => {
    const updated = [...formData.recipes];
    updated[index].step = value;
    setFormData((prev) => ({ ...prev, recipes: updated }));
  };

  const addRecipeStep = () => {
    setFormData((prev) => ({
      ...prev,
      recipes: [...prev.recipes, { id: null, step: "" }],
    }));
  };

  const removeRecipeStep = (index) => {
    const updated = [...formData.recipes];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, recipes: updated }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      return Swal.fire(
        "Validation Error",
        "Title must not be empty!",
        "warning"
      );
    }

    if (!formData.categoryId) {
      return Swal.fire("Validation Error", "Choose a category!", "warning");
    }

    if (formData.recipes.some((r) => !r.step.trim())) {
      return Swal.fire(
        "Validation Error",
        "Recipe steps cannot be empty!",
        "warning"
      );
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        return Swal.fire("Authentication Error", "Token not found.", "error");
      }

      // 1. Update article first
      const form = new FormData();
      form.append("title", formData.title);
      form.append("categoryId", formData.categoryId);
      form.append("description", formData.description);
      if (formData.image) form.append("photo", formData.image);

      const articleRes = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/articles/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );

      if (!articleRes.ok) {
        const result = await articleRes.json();
        return Swal.fire(
          "Update Failed",
          result.message || "Failed to update article",
          "error"
        );
      }

      // 2. Handle recipes in sequence
      const currentIds = formData.recipes.filter((r) => r.id).map((r) => r.id);
      const deletedIds = originalRecipeIds.filter(
        (oid) => !currentIds.includes(oid)
      );

      // Delete removed recipes
      await Promise.all(
        deletedIds.map((recipeId) =>
          fetch(`${import.meta.env.VITE_BACKEND_API}/recipes/${recipeId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      // Process recipes (update existing or create new)
      const recipesPromises = formData.recipes.map(async (recipe) => {
        const payload = {
          article_id: parseInt(id),
          content: recipe.step,
        };

        if (recipe.id) {
          // Update existing recipe
          return fetch(
            `${import.meta.env.VITE_BACKEND_API}/recipes/${recipe.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            }
          );
        } else {
          // Create new recipe
          return fetch(
            `${import.meta.env.VITE_BACKEND_API}/recipes/articles/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                data: [{ content: recipe.step }],
              }),
            }
          );
        }
      });

      // Wait for all recipe operations to complete
      const recipesResults = await Promise.all(recipesPromises);

      // Check if any recipe operation failed
      const failedRecipe = recipesResults.find((res) => !res.ok);
      if (failedRecipe) {
        const errorData = await failedRecipe.json();
        throw new Error(errorData.message || "Failed to process some recipes");
      }

      Swal.fire("Success", "Article updated successfully!", "success").then(
        () => {
          navigate("/articles/list");
        }
      );
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">
        Update Article
      </h1>
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
          <label className="block text-sm font-semibold mb-1">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
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
          <label className="block text-sm font-semibold mb-1">
            Select Category
          </label>
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
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Recipe Steps */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Recipe Steps
          </label>
          {formData.recipes.map((r, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <textarea
                value={r.step}
                onChange={(e) => handleRecipeChange(i, e.target.value)}
                rows={2}
                className="w-full p-3 border rounded bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder={`Step ${i + 1}`}
              />
              {formData.recipes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRecipeStep(i)}
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
            onClick={addRecipeStep}
            className="mt-2 text-sm text-orange-600 hover:underline"
          >
            + Add Step
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/articles/list")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition font-semibold"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg shadow font-semibold transition ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateArticlePage;
