/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";

const CategoriesAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const {
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
  } = useCategory();

  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedCategory();
    setCategoryName("");
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">📁 Category Manager</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          <Plus size={18} />
          <span className="hidden md:inline">Create Category</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 border-b">
                <td className="px-6 py-3">{category.name}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      icon={Pencil}
                      text="Edit"
                      color="yellow"
                      onClick={() => openUpdateModal(category)}
                    />
                    <Button
                      icon={Trash2}
                      text="Delete"
                      color="red"
                      onClick={() => openDeleteModal(category)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md transition-all ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
            )
            .map((page, i, arr) => (
              <span key={page} className="inline-block">
                {i > 0 && page - arr[i - 1] > 1 && <span className="mx-1">...</span>}
                <button
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 border rounded-md transition-all ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </span>
            ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md transition-all ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <Modal title="Create Category" onClose={() => setIsCreateModalOpen(false)}>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4 bg-white text-slate-800"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button text="Cancel" color="gray" onClick={() => setIsCreateModalOpen(false)} />
              <Button text="Create" color="blue" onClick={handleCreateCategory} icon={Plus} />
            </div>
          </Modal>
        )}

        {isUpdateModalOpen && (
          <Modal title="Update Category" onClose={closeUpdateModal}>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4 bg-white text-slate-800"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button text="Cancel" color="gray" onClick={closeUpdateModal} />
              <Button text="Update" color="yellow" onClick={handleUpdateCategory} icon={Pencil} />
            </div>
          </Modal>
        )}

        {isDeleteModalOpen && (
          <Modal title="Delete Category" onClose={() => setIsDeleteModalOpen(false)}>
            <p className="mb-4">
              Are you sure you want to delete <strong>{selectedCategory?.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button text="Cancel" color="gray" onClick={() => setIsDeleteModalOpen(false)} />
              <Button text="Delete" color="red" onClick={handleDeleteCategory} icon={Trash2} />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
      <button
        className="absolute top-3 right-4 text-gray-500 text-xl hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>
    </motion.div>
  </motion.div>
);

const Button = ({ text, color, onClick, icon: Icon }) => {
  const colorMap = {
    gray: "bg-gray-400 hover:bg-gray-500",
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-500 hover:bg-red-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-3 py-2 text-white rounded-md transition-all ${colorMap[color]}`}
    >
      {Icon && <Icon size={18} />}
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
};

export default CategoriesAdminPage;
