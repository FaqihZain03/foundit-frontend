import { API } from "../_api";

export const getNotifications = async () => {
  try {
    const { data } = await API.get("/notifications");
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNotification = async (data) => {
  try {
    const response = await API.post("/notifications", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await API.post(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    await API.delete(`/notifications/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};