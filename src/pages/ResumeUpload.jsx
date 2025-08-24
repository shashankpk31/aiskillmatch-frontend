import { useState } from 'react';
import axios from 'axios';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 1); // Replace with actual user ID from auth
    try {
      await axios.post('http://localhost:8080/api/resumes/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setError('Resume uploaded successfully');
    } catch (err) {
      setError('Failed to upload resume');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      {error && <p className={error.includes('success') ? 'text-green-500' : 'text-red-500'}>{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-primary text-white p-2 rounded w-full">Upload</button>
      </form>
    </div>
  );
}

export default ResumeUpload;