import { API } from '../_api';

// Ambil semua klaim berdasarkan item
export const getClaimsByItem = async (item_id) => {
  try {
    const { data } = await API.get(`/items/${item_id}/claims`);
    return data.data;
  } catch (error) {
    console.error("Gagal mengambil klaim:", error);
    throw error;
  }
};

// Tambah klaim baru
export const createClaim = async (claimData) => {
  try {
    const response = await API.post(`/claims`, claimData);
    return response.data;
  } catch (error) {
    console.error("Gagal membuat klaim:", error);
    throw error;
  }
};

// Hapus klaim
export const deleteClaim = async (id) => {
  try {
    await API.delete(`/claims/${id}`);
  } catch (error) {
    console.error("Gagal menghapus klaim:", error);
    throw error;
  }
};

// Ambil detail klaim
export const showClaim = async (id) => {
  try {
    const response = await API.get(`/claims/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail klaim:", error);
    throw error;
  }
};
