/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { loginUser, fetchCurrentUser } from "../services/authService"; // Import dari services

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const userData = await fetchCurrentUser(token);
      setUser(userData);
      console.log(`user`, userData);
      localStorage.setItem("user", JSON.stringify(userData));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      console.log(`context`, data);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      await fetchUser();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
