import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCredentials,
  clearCredentials,
  setLoading,
  setError,
  setSuccessMessage,
  clearMessages
} from '../features/auth/authSlice';
import axiosInstance from '../api/axiosInstance';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedin, token, loading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  // On app load, sync Redux with localStorage
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      dispatch(setCredentials({ loggedin: true, token: storedToken }));
    }
  }, [dispatch, token]);

  const registerUser = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearMessages());

      const response = await axiosInstance.post('/auth/register', data);

      // Expecting only a success message, no user/token
      if (response.data.loggedin) {
        dispatch(setSuccessMessage(response.data.message || 'Registration successful!'));
      } else {
        dispatch(setError(response.data.message || 'Registration failed.'));
      }

    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
      navigate('/login');
    }
  };


  const login = async (credentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearMessages());
      const response = await axiosInstance.post('/auth/login', credentials);
      if (response.data.loggedin && response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        dispatch(setCredentials(response.data));
        dispatch(setSuccessMessage('Login successful!'));
        navigate('/welcome');
      } else {
        dispatch(setError('Invalid login response'));
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.token || 'Login failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    dispatch(clearCredentials());
    dispatch(clearMessages());
    navigate('/login');
  };

  const clearAuthMessages = () => {
    dispatch(clearMessages());
  };

  return {
    loggedin,
    token,
    loading,
    error,
    successMessage,
    login,
    logout,
    clearAuthMessages,
    registerUser
  };
};