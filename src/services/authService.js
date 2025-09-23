import axiosInstance from '../api/axiosInstance';

export const authService = {
  validateResetToken: async (token) => {
    try {
      const response = await axiosInstance.get(`/auth/validate-token/${token}`);
      return { isValid: true, data: response.data };
    } catch (error) {
      return { 
        isValid: false, 
        error: error.response?.data?.message || 'Invalid or expired token' 
      };
    }
  },

  resetPassword: async (token, password) => {
    const response = await axiosInstance.post('/auth/reset-password', {
      token,
      password
    });
    return response.data;
  }
};