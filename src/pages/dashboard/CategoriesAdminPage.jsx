/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const CategoriesAdminPage = () => {
  // State untuk modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State untuk input form
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Data dummy untuk kategori
  const [categories, setCategories] = useState([  ]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/categories`)
      .then((res) => res.json())
      .then((categories) => setCategories(categories.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fungsi Tambah Kategori
  const handleCreateCategory = () => {
    const newCategory = {
      name: categoryName,
      // slug: categoryName.toLowerCase(),
    };

    fetch(`${import.meta.env.VITE_BACKEND_API}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("Raw response:", text); // Debugging
        return JSON.parse(text);
      })
      .then((category) => {
        setCategories([...categories, category.data]);
        setCategoryName("");
        setIsCreateModalOpen(false);
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  // Fungsi Update Kategori
  const handleUpdateCategory = () => {
    if (!selectedCategory) return;

    fetch(`${import.meta.env.VITE_BACKEND_API}/categories/${selectedCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: categoryName,
        // slug: categoryName.toLowerCase(),
      }),
    })
      .then((res) => res.json())
      .then((updatedCategory) => {
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id ? updatedCategory.data : cat
          )
        );
        setIsUpdateModalOpen(false);
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  // Fungsi Delete Kategori
  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    fetch(
      `${import.meta.env.VITE_BACKEND_API}/categories/${selectedCategory.id}`,
      { method: "DELETE" }
    )
      .then(() => {
        setCategories(
          categories.filter((cat) => cat.id !== selectedCategory.id)
        );
        setIsDeleteModalOpen(false);
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full h-full">
      <h1 className="text-3xl font-semibold mb-5">Categories</h1>

      {/* Tombol Create */}
      <button
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={() => setIsCreateModalOpen(true)}
      >
        + Create Category
      </button>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="border border-gray-300 px-4 py-2">Categories</th>
              <th className="border border-gray-300 px-4 py-2">Slug</th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {category.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-500">
                  {category.slug}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="px-3 py-1 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryName(category.name);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 transition ml-2"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL CREATE */}
      {isCreateModalOpen && (
        <Modal
          title="Create New Category"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-4 bg-white text-slate-800"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              text="Cancel"
              color="gray"
              onClick={() => setIsCreateModalOpen(false)}
            />
            <Button text="Create" color="blue" onClick={handleCreateCategory} />
          </div>
        </Modal>
      )}

      {/* MODAL UPDATE */}
      {isUpdateModalOpen && (
        <Modal
          title="Update Category"
          onClose={() => setIsUpdateModalOpen(false)}
        >
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-4 bg-white text-slate-800"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              text="Cancel"
              color="gray"
              onClick={() => setIsUpdateModalOpen(false)}
            />
            <Button
              text="Update"
              color="yellow"
              onClick={handleUpdateCategory}
            />
          </div>
        </Modal>
      )}

      {/* MODAL DELETE */}
      {isDeleteModalOpen && (
        <Modal
          title="Delete Category"
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <p className="mb-4">
            Are you sure you want to delete{" "}
            <strong>{selectedCategory?.name}</strong>?
          </p>
          <div className="flex justify-end">
            <Button
              text="Cancel"
              color="gray"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <Button text="Delete" color="red" onClick={handleDeleteCategory} />
          </div>
        </Modal>
      )}
    </div>
  );
};

// Component Modal Reusable
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
      <button
        className="absolute top-2 right-3 text-gray-600"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  </div>
);

// Component Button Reusable
// eslint-disable-next-line no-unused-vars
const Button = ({ text, color, onClick }) => (
//   <button
//     className={`px-4 py-2 text-white rounded-md hover:bg-${color}-700 transition mx-1 bg-${color}-600`}
//     onClick={onClick}
//   >
//     {text}
//   </button>
  <button
    className={`px-4 py-2  rounded-md hover:bg-yellow-700 transition mx-1 bg-yellow-600`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default CategoriesAdminPage;
