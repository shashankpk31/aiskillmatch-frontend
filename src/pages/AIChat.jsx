import { useState } from 'react';
import axios from 'axios';

function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/ai/advice',
        prompt,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Failed to get AI advice');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">AI Chat</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask for resume or job advice..."
          className="w-full p-2 border rounded"
          rows="4"
        />
        <button type="submit" className="bg-primary text-white p-2 rounded w-full">Get Advice</button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AIChat;