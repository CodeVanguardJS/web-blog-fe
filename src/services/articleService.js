const API_URL = import.meta.env.VITE_BACKEND_API;

export const getArticles = async () => {
  const response = await fetch(`${API_URL}/articles`);
  if (!response.ok) throw new Error("Failed to fetch articles");
  const data = await response.json();
  return data.data.data;
};

export const deleteArticleById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete article");
  return response.json();
};
