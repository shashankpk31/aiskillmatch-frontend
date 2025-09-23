// jobSlice.js with selectAllJobs
import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
    },
    reducers: { 
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
    },
});

export const { setJobs } = jobSlice.actions;

export const selectAllJobs = (state) => state.jobs.jobs;

export default jobSlice.reducer;
