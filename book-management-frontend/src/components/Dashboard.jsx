import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      if (response.data.success) {
        // Clear any local authentication state or tokens
        localStorage.removeItem('authToken');
        // Redirect to the sign-in page
        navigate('/signin');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <nav className="mb-4">
        <ul className="space-y-2">
          <li>
            <Link to="/borrowed" className="text-blue-500 hover:underline">Borrowed Books</Link>
          </li>
          <li>
            <Link to="/purchased" className="text-blue-500 hover:underline">Purchased Books</Link>
          </li>
          <li>
            <Link to="/help" className="text-blue-500 hover:underline">Help</Link>
          </li>
        </ul>
      </nav>

      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-4">Logout</button>
    </div>
  );
};

export default Dashboard;
