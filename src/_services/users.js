import { API } from "../_api";

// Ambil user yang sedang login
export const getCurrentUser = async () => {
  try {
    const response = await API.get("/user");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    throw error;
  }
};

// Update profil
export const updateUserProfile = async (formData) => {
  try {
    const response = await API.put(`/users/${formData.id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Gagal update profil user:", error);
    throw error;
  }
};

// Ambil semua user - admin
export const getAllUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil semua user:", error);
    throw error;
  }
};

// Buat user baru
export const createUser = async (formData) => {
  try {
    const response = await API.post("/users", formData);
    return response.data;
  } catch (error) {
    console.error("Gagal membuat user:", error);
    throw error;
  }
};

// Hapus user
export const deleteUser = async (id) => {
  try {
    await API.delete(`/users/${id}`);
  } catch (error) {
    console.error("Gagal menghapus user:", error);
    throw error;
  }
};
