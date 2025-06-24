// src/_services/comments.js
import { API } from '../_api';

export const getComments = async () => {
  try {
    const res = await API.get("/comments");
    console.log("📦 Comment response:", res.data.data); // ini isi komentar
    return res.data.data; // ⬅️ gunakan data.data
  } catch (error) {
    console.error("Gagal ambil komentar:", error);
    return [];
  }
};


export const createComment = async (commentData) => {
  try {
    const response = await API.post(`/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Gagal membuat komentar:", error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    await API.delete(`/comments/${id}`);
  } catch (error) {
    console.error("Gagal menghapus komentar:", error);
    throw error;
  }
};

export const updateComment = async (id, updatedData) => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");

    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await API.post(`/comments/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate komentar:", error.response?.data || error);
    throw error;
  }
};