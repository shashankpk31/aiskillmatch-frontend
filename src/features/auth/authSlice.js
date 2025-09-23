import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  successMessage: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    clearCredentials: (state) => {
      state.user = null;
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