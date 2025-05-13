import api from './axiosConfig';

// Get all challenges
export const getAllChallenges = async (params = {}) => {
  try {
    const response = await api.get('/challenges/', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get a specific challenge
export const getChallenge = async (challengeId) => {
  try {
    const response = await api.get(`/challenges/${challengeId}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Create a new challenge (admin only)
export const createChallenge = async (challengeData) => {
  try {
    const response = await api.post('/challenges/', challengeData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update a challenge (admin only)
export const updateChallenge = async (challengeId, challengeData) => {
  try {
    const response = await api.put(`/challenges/${challengeId}/`, challengeData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete a challenge (admin only)
export const deleteChallenge = async (challengeId) => {
  try {
    const response = await api.delete(`/challenges/${challengeId}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Join a challenge
export const joinChallenge = async (challengeId) => {
  try {
    const response = await api.post(`/challenges/${challengeId}/join/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Leave a challenge
export const leaveChallenge = async (challengeId) => {
  try {
    const response = await api.post(`/challenges/${challengeId}/leave/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get user's joined challenges
export const getUserChallenges = async () => {
  try {
    const response = await api.get('/challenges/user/');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get challenge leaderboard
export const getChallengeLeaderboard = async (challengeId) => {
  try {
    const response = await api.get(`/challenges/${challengeId}/leaderboard/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Error handling helper function
const handleError = (error) => {
  if (error.response && error.response.data) {
    // Return the error message from the API
    const errorMessage = error.response.data.message || error.response.data.detail || Object.values(error.response.data)[0];
    return new Error(errorMessage);
  }
  return new Error('An error occurred with the challenges API');
};