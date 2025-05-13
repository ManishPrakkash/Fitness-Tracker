import api from './axiosConfig';

// Log an activity
export const logActivity = async (activityData) => {
  try {
    const response = await api.post('/activities/', activityData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get user activities
export const getUserActivities = async (params = {}) => {
  try {
    const response = await api.get('/activities/', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get a specific activity
export const getActivity = async (activityId) => {
  try {
    const response = await api.get(`/activities/${activityId}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update an activity
export const updateActivity = async (activityId, activityData) => {
  try {
    const response = await api.put(`/activities/${activityId}/`, activityData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete an activity
export const deleteActivity = async (activityId) => {
  try {
    const response = await api.delete(`/activities/${activityId}/`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get activities for a specific challenge
export const getChallengeActivities = async (challengeId, params = {}) => {
  try {
    const response = await api.get(`/challenges/${challengeId}/activities/`, { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get activity stats (summary)
export const getActivityStats = async (params = {}) => {
  try {
    const response = await api.get('/activities/stats/', { params });
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
  return new Error('An error occurred with the activities API');
};