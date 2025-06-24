import { API } from '../_api';

// Ambil semua klaim berdasarkan item

export const getClaims = async () => {
  try {
    const res = await API.get("/claims");
    return res.data.data;
  } catch (error) {
    console.error("Gagal mengambil data claims:", error);
    throw error;
  }
};

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

export const updateClaim = async (id, updatedData) => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");

    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await API.post(`/claims/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate claim:", error.response?.data || error);
    throw error;
  }
};