import axios from "axios";

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Call JWT-Token from Http-only Cookie
export const getAuthTokenFromCookie = () => {
  const cookieName = "authToken";

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
};

// Register
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("user/register", userData);
  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("user/login", credentials);
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await axiosInstance.get("user/logout");
  return response.data;
};

// Update User
export const updateUserData = async (userId, userData) => {
  const response = await axiosInstance.patch(`user/${userId}`, userData);
  return response.data;
};

// Delete User
export const deleteUserData = async (userId) => {
  const response = await axiosInstance.delete(`user/${userId}`);
  return response.data;
};

// Create Group
export const createGroup = async (groupData) => {
  const response = await axiosInstance.post("group", groupData);
  return response.data;
};

// Get Groups by User
export const getGroupsByUser = async () => {
  const response = await axiosInstance.get("group/user/groups");
  return response.data;
};

// Update Group
export const updateGroup = async (groupId, groupData) => {
  const response = await axiosInstance.patch(`group/${groupId}`, groupData);
  return response.data;
};

// Delete Group
export const deleteGroup = async (groupId) => {
  const response = await axiosInstance.delete(`group/${groupId}`);
  return response.data;
};

// Create new Flashcard-Set
export const postNewFlashcardSet = async (setData) => {
  const response = await axiosInstance.post("sets", setData);
  return response.data;
};

// Get Flashcard-Set by User
export const getFlashcardSetsByUser = async () => {
  const response = await axiosInstance.get("sets/user/sets");
  return response.data;
};

export default axiosInstance;
