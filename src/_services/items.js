import { API } from "../_api";

// Ambil semua item
export const getItems = async () => {
  try {
    const { data } = await API.get("/items");
    console.log("Response dari /items:", data);
    return data;
  } catch (error) {
    console.error("Gagal mengambil data items:", error);
    throw error;
  }
};

// Tambah item baru (FormData untuk image + validasi)
export const createItem = async (data) => {
  try {
    const response = await API.post("/items", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal membuat item:", error.response?.data || error);
    throw error;
  }
};

// Ambil detail item by ID
export const showItem = async (id) => {
  try {
    const { data } = await API.get(`/items/${id}`);
    console.log("Data item detail:", data);
    return data;
  } catch (error) {
    console.error("Gagal mengambil detail item:", error);
    throw error;
  }
};


// Update item (dengan method override PUT)
export const updateItem = async (id, data) => {
  try {
    data.append('_method', 'PUT'); // penting untuk method override di Laravel
    const response = await API.post(`/items/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal memperbarui item:", error.response?.data || error);
    throw error;
  }
};

// Hapus item
export const deleteItem = async (id) => {
  try {
    await API.delete(`/items/${id}`);
  } catch (error) {
    console.error("Gagal menghapus item:", error.response?.data || error);
    throw error;
  }
};

export const claimItem = async (id) => {
  try {
    const response = await API.post(`/items/${id}/claim`);
    return response.data;
  } catch (error) {
    console.error("Gagal klaim item:", error.response?.data || error);
    throw error;
  }
};