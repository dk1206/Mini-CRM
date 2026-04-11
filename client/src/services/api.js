import axios from 'axios';

const defaultApiUrl = import.meta.env.PROD
  ? 'https://crm-2rmm.onrender.com/api'
  : '/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
