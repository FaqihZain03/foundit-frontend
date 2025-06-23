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