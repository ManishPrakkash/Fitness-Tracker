import api from './axiosConfig';

// Login user
export const login = async (credentials) => {
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token', // Replace with a valid JWT for testing
      });
    }, 500);
  });
};

// Register new user
export const register = async (userData) => {
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token', // Replace with a valid JWT for testing
      });
    }, 500);
  });
};

// Logout user
export const logout = async () => {
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile/', userData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const response = await api.post('/auth/change-password/', passwordData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Reset password request
export const resetPasswordRequest = async (email) => {
  try {
    const response = await api.post('/auth/reset-password-request/', { email });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Reset password confirm
export const resetPasswordConfirm = async (resetData) => {
  try {
    const response = await api.post('/auth/reset-password-confirm/', resetData);
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
  return new Error('An error occurred during authentication');
};