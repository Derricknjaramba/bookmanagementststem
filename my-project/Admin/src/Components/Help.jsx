import { useEffect, useState } from 'react';
import axios from 'axios';

const Help = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null); // Added state for error handling

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/help-requests');
        // Adjust URL as needed
        if (Array.isArray(response.data)) { // Check if response data is an array
          setRequests(response.data);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        console.error('Error fetching help requests:', error);
        setError('Failed to fetch help requests. Please try again later.'); // Update state on error
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-4 text-white">Help Requests</h1>
      {error && <p className="text-white">{error}</p>} {/* Display error message if any */}
      <ul>
        {requests.map(request => (
          <li key={request.id} className="border-b py-2">
            <p><strong>ID:</strong> {request.id}</p>
            <p><strong>Message:</strong> {request.message}</p>
            <p><strong>Date:</strong> {new Date(request.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Help;
