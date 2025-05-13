import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { login, register, logout as logoutAPI } from '../api/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token);
      const user = jwtDecode(data.token);
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await register(userData);
      localStorage.setItem('token', data.token);
      const user = jwtDecode(data.token);
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutAPI();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      setError(error.message || 'Logout failed');
      // Still remove token on error
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginUser,
        registerUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};