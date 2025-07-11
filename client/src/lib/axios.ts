import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  adapter: 'fetch',
  withCredentials: true
})

export default api;
