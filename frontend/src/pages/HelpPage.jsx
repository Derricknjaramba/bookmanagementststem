import { useState } from 'react';
import axios from '../api/api';

const HelpPage = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/help-request', { message });
      setSuccess('Your help request has been submitted.');
      setMessage('');
    } catch (error) {
      setError('Failed to submit the help request.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Help</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
          rows="4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Submit Request</button>
      </form>
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default HelpPage;


