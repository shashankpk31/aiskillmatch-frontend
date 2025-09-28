import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  successMessage: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.loggedin = payload.loggedin;
      state.token = payload.token;      
    },
    clearCredentials: (state) => {
      state.loggedin = false;
      state.token = null;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  }
});

export const {
  setCredentials,
  clearCredentials,
  setLoading,
  setError,
  setSuccessMessage,
  clearMessages
} = authSlice.actions;

export default authSlice.reducer;