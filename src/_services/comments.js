// src/_services/comments.js
import { API } from '../_api';

export const getComments = async (item_id) => {
  try {
    const { data } = await API.get(`/items/${item_id}/comments`);
    return data.data;
  } catch (error) {
    console.error("Gagal mengambil komentar:", error);
    throw error;
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
