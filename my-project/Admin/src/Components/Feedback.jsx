// src/components/Feedback.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback'); 
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="p-4 text-white" >
      <h1 className="text-5xl font-bold mb-4">User Feedback</h1>
      <ul>
        {feedback.map(item => (
          <li key={item.id} className="border-b py-2">
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Feedback:</strong> {item.message}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
