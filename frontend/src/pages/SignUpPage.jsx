// src/pages/SignUpPage.jsx
import { useState } from 'react';
import axios from '../api/api';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/signup', { username, password });
      if (response.data.success) {
        // Redirect to sign-in page or user dashboard
        window.location.href = '/signin'; // Example redirect
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignUp} className="mt-4">
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Sign Up</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignUpPage;


