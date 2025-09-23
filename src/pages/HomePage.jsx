import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobList from '../components/JobList';    
import { useSelector } from 'react-redux';
import { selectAllJobs } from '../features/jobs/jobSlice';

const HomePage = () => {
    const jobs = useSelector(selectAllJobs);

    return (
        <div>
            <Navbar />
            <Hero className="h-screen" />
            <JobList jobs={jobs} />
        </div>
    );
};

export default HomePage;
