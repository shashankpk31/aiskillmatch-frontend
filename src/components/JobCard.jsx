function JobCard({ job }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-secondary">{job.company}</p>
      <p className="mt-2">{job.description}</p>
      <p className="mt-2 text-sm"><strong>Skills:</strong> {job.skills}</p>
      <p className="text-sm"><strong>Location:</strong> {job.location || 'N/A'}</p>
      <p className="text-sm"><strong>Salary:</strong> {job.salary || 'N/A'}</p>
    </div>
  );
}

export default JobCard;