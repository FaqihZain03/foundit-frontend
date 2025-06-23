// src/_services/user.js
import { API } from "../_api";

// Ambil profil user yang sedang login
export const getCurrentUser = async () => {
  try {
    const response = await API.get("/user");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    throw error;
  }
};

// Update profil user
export const updateUserProfile = async (formData) => {
  try {
    const response = await API.put("/user", formData);
    return response.data;
  } catch (error) {
    console.error("Gagal update profil user:", error);
    throw error;
  }
};

// (Opsional) Ambil semua user - hanya untuk admin
export const getAllUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil semua user:", error);
    throw error;
  }
};
