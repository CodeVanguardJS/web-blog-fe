/* eslint-disable no-unused-vars */
// src/hooks/useUpdateProfile.js
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { fetchUpdateProfile } from "../services/authService";

export const useUpdateProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.photo_url || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPreview(user?.photo_url || "");
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (photo) formData.append("photo", photo);

      const updatedUser = await fetchUpdateProfile(token, formData);

      // Update state AuthContext
      setUser((prevUser) => ({
        ...prevUser,
        name: updatedUser.data.name,
        email: updatedUser.data.email,
        photo_url: updatedUser.photo_url || prevUser.photo_url,
      }));

      // Simpan ke localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...updatedUser,
          photo_url: updatedUser.photo_url || user.photo_url,
        })
      );

      alert("Profile updated successfully");
      navigate("/dashboard"); //sasasasa
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    preview,
    handlePhotoChange,
    handleSubmit,
    loading,
  };
};
