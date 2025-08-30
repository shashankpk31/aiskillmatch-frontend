import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');

   const fetchJobs = async () => {
      
      try {
        const response = await axios.get('http://localhost:8080/api/jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setJobs(response.data);
      } catch (err) {
        setError('Failed to fetch jobs');
      }
    };

  useEffect(() => {
   
    fetchJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      skills: e.target.skills.value,
      location: e.target.location.value,
      salary: e.target.salary.value,
      userId: localStorage.getItem('userId')
    };
    try {      
      let response =await axios.post('http://localhost:8080/api/jobs', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      fetchJobs();
      e.target.reset()
    } catch (err) {
      setError('Failed to create job');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {role === 'RECRUITER' || role === 'ADMIN' ? (
        <form onSubmit={handleCreateJob} className="mb-8 space-y-4 max-w-md">
          <h3 className="text-xl font-semibold">Post a Job</h3>
          <input name="title" placeholder="Job Title" className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" required />
          <input name="skills" placeholder="Skills (comma-separated)" className="w-full p-2 border rounded" />
          <input name="location" placeholder="Location" className="w-full p-2 border rounded" />
          <input name="salary" placeholder="Salary" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-accent text-white p-2 rounded w-full">Post Job</button>
        </form>
      ) : null}
      <h3 className="text-xl font-semibold mb-4">Available Jobs</h3>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;