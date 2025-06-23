import axios from "axios";
import { API } from "../_api";

export const login = async (email, password) => {
  try {
    const response = await API.post("/login", {
      email,
      password
    });

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token };
  } catch (error) {
    throw error.response?.data?.message || "Login gagal";
  }
};


// Fungsi untuk mendaftar akun
export const register = async (name, email, password) => {
  const response = await API.post('/register', {
    name,
    email,
    password,
  });
  return response.data;
};


// Fungsi untuk logout
export const logout = async () => {
  try {
    await API.post("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete API.defaults.headers.common["Authorization"];
  } catch (error) {
    console.error("Gagal logout:", error);
    throw error.response?.data?.message || "Logout gagal";
  }
};

export const loginAdmin = async ({ email, password }) => {
  const response = await API.post('/admin/login', {
    email,
    password,
  });

  return response.data;
};
