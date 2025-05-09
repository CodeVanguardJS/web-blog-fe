const API_URL = import.meta.env.VITE_BACKEND_API;

export const getArticles = async (limit, page, type) => {
  const response = await fetch(`${API_URL}/articles?limit=${limit}&page=${page}&articleType=${type}`);
  if (!response.ok) throw new Error("Failed to fetch articles");
  const res = await response.json();
  console.log(`data`, res);
  return res.data;
};

export const deleteArticleById = async (id) => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete article");
  return response.json();
};
