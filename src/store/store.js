// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/jobs/jobSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobReducer,
    },
});
export default store;