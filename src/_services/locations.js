import { API } from "../_api";

export const getLocations = async () => {
  try {
    const { data } = await API.get("/locations");
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createLocation = async (data) => {
  try {
    const response = await API.post("/locations", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    await API.delete(`/locations/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLocation = async (id, updatedData) => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");

    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await API.post(`/locations/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate lokasi:", error.response?.data || error);
    throw error;
  }
};