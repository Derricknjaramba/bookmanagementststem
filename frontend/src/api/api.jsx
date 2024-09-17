// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
