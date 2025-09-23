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
  const { user, token, loading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const login = async (credentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearMessages());
      const response = await axiosInstance.post('/auth/login', credentials);
      dispatch(setCredentials(response.data));
      dispatch(setSuccessMessage('Login successful!'));
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Login failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = () => {
    dispatch(clearCredentials());
    dispatch(clearMessages());
    navigate('/login');
  };

  const clearAuthMessages = () => {
    dispatch(clearMessages());
  };

  return {
    user,
    token,
    loading,
    error,
    successMessage,
    login,
    logout,
    clearAuthMessages
  };
};