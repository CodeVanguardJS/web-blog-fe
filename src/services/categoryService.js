const API = import.meta.env.VITE_BACKEND_API;

export const fetchCategories = async () => {
  const res = await fetch(`${API}/categories`);
  const json = await res.json();
  return json.data;
};

export const createCategory = async (category) => {
  const res = await fetch(`${API}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  const text = await res.text();
  return JSON.parse(text).data;
};

export const updateCategory = async (id, category) => {
  const res = await fetch(`${API}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  const json = await res.json();
  return json.data;
};

export const deleteCategory = async (id) => {
  await fetch(`${API}/categories/${id}`, {
    method: "DELETE",
  });
};
