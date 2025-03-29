export const loginUser = async (email, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const user = await response.json();
  if (!response.ok) {
    throw new Error(user.error || "Login failed");
  }

  // localStorage.setItem("token", user.data.token);
  console.log(`loginUser`, user);
  return user.data;
};

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/auth/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const user = await response.json();
  console.log(`user`, user);
  return user.data;
};
