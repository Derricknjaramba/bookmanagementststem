import React, { useState } from 'react';
import axios from 'axios';

const HelpPage = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/help', { message })
      .then(response => setResponse(response.data.message))
      .catch(error => setResponse('An error occurred'));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Help</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Your Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Submit Help Request</button>
      </form>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
};

export default HelpPage;




