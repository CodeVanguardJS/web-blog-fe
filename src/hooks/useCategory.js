import { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCreateCategory = () => {
    createCategory({ name: categoryName })
      .then((newCat) => {
        setCategories([...categories, newCat]);
        setCategoryName("");
        setIsCreateModalOpen(false);
      })
      .catch((err) => console.error("Error creating category:", err));
  };

  const handleUpdateCategory = () => {
    if (!selectedCategory) return;
    updateCategory(selectedCategory.id, { name: categoryName })
      .then((updatedCat) => {
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id ? updatedCat : cat
          )
        );
        setIsUpdateModalOpen(false);
      })
      .catch((err) => console.error("Error updating category:", err));
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    deleteCategory(selectedCategory.id)
      .then(() => {
        setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
        setIsDeleteModalOpen(false);
      })
      .catch((err) => console.error("Error deleting category:", err));
  };

  return {
    categories,
    categoryName,
    setCategoryName,
    selectedCategory,
    setSelectedCategory,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};
