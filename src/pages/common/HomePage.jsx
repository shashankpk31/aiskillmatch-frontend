import React from 'react';
import Navbar from '../../components/common/Navbar';
import Hero from '../../components/common/Hero';
import JobList from '../../components/jobs/JobList';    
import { useSelector } from 'react-redux';
import { selectAllJobs } from '../../features/jobs/jobSlice';

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
