import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("user/register", userData);
  return response.data;
};

// Confirm Email
export const confirmEmail = async (token) => {
  const response = await axiosInstance.get(`user/confirm?token=${token}`);
  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("user/login", credentials);
  return response.data;
};

// Validate Token
export const validateToken = async () => {
  const response = await axiosInstance.get("user/authenticate");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await axiosInstance.get("user/logout", { credentials: "include" });
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
export const createGroup = async (flashcardSetId, groupData) => {
  const response = await axiosInstance.post(
    `group/${flashcardSetId}`,
    groupData
  );
  return response.data;
};

// Push User to Group
export const pushUserToGroup = async (groupData) => {
  const response = await axiosInstance.put(`group/member`, groupData);
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

export const postNewSetFromPublicSet = async (setId) => {
  const response = await axiosInstance.post(`sets/${setId}`);
  return response.data;
};

// Get Flashcard-Set by User
export const getFlashcardSetsByUser = async () => {
  const response = await axiosInstance.get("sets");
  return response.data;
};

// Add a new Card to a set
export const postNewCardToSet = async (setId, cardData) => {
  const response = await axiosInstance.post(`sets/card/${setId}`, cardData);
  return response.data;
};

//Delete a card
export const deleteOneCardById = async (cardId) => {
  const response = await axiosInstance.delete(`sets/card/${cardId}`);
  return response;
};

//Update a Card by ID
export const updateCardById = async (cardId, data) => {
  const response = await axiosInstance.put(`sets/card/${cardId}`, data);
  return response;
};

//Get Set by Set ID
export const getSetBySetId = async (setId) => {
  const response = await axiosInstance.get(`sets/${setId}`);
  return response.data;
};

// Delete Set by ID
export const deleteSetBySetId = async (setId) => {
  const response = await axiosInstance.delete(`sets/${setId}`);
  return response;
};

// Update Set Infos by SetID
export const updateSetInfoById = async (setId, data) => {
  const response = await axiosInstance.put(`sets/${setId}`, data);
  return response.data;
};

// Get random public sets
export const getRandomPubSets = async () => {
  const response = await axiosInstance.get(`sets/public/random`);
  return response.data;
};

export const getRandomPubSetsExcludeUser = async () => {
  const response = await axiosInstance.get(`sets/public/random/nouser`);
  return response.data;
};

// start Learnsession
export const startLearnSession = async (setId) => {
  const response = await axiosInstance.post(`session/${setId}`);
  return response.data;
};

// update cards to learned
export const updateSessionCardToLearned = async (cardId) => {
  const response = await axiosInstance.put(`session/${cardId}`);
  return response.data;
};

// refresh learn session (all cards back to "tolearn")
export const refreshLearnSession = async (sessionId) => {
  const response = await axiosInstance.put(`session/refresh/${sessionId}`);
  return response.data;
};

export const getPublicSetById = async (setId) => {
  const response = await axiosInstance.get(`sets/public/${setId}`);
  return response.data;
};

export default axiosInstance;
