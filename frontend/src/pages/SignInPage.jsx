// src/pages/SignInPage.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/user';

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/signin', { username, password });
      if (response.data.success) {
        login(); // Set authenticated state
        navigate(from, { replace: true }); // Redirect to the intended page
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <form onSubmit={handleSignIn} className="mt-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Sign In</button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignInPage;


