import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AssistUser = () => {
  const { requestId } = useParams(); // Retrieve the request ID from the URL parameters
  const [request, setRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Fetch the specific help request details
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/help-requests/${requestId}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching help request:', error);
      }
    };

    fetchRequest();
  }, [requestId]);

  const handleResponseChange = (e) => {
    setResponseMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/help-requests/${requestId}/respond`, { message: responseMessage });
      alert('Response sent successfully');
      navigate('/help'); // Adjust the redirect path as needed
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  if (!request) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-4">Assist User</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Help Details</h2>
        <p><strong>ID:</strong> {request.id}</p>
        <p><strong>Message:</strong> {request.message}</p>
        <p><strong>Date:</strong> {new Date(request.date).toLocaleString()}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="responseMessage" className="block text-sm font-medium text-gray-700">Your Response</label>
          <textarea
            id="responseMessage"
            name="responseMessage"
            rows="4"
            value={responseMessage}
            onChange={handleResponseChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Response
        </button>
      </form>
    </div>
  );
};

export default AssistUser;
