// Job Details Component
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectJobById } from './jobSlice';

const JobDetails = () => {
    const { id } = useParams();
    const job = useSelector((state) => selectJobById(state, id));
    if (!job) {
        return <div>Job not found</div>;
    }
    return (
        <div>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
        </div>
    );
};

export default JobDetails;
