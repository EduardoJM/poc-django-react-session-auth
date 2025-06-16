import axios from 'axios';
import { generateCSRFToken, getCSRFSecret } from './csrf-token';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  adapter: 'fetch',
  withCredentials: true
})

api.interceptors.request.use((req) => {
  if (!req.method) {
    return req;
  }
  if (!['PUT', 'POST', 'PATCH'].includes(req.method.toUpperCase())) {
    return req;
  }
  const secret = getCSRFSecret();
  if (!secret) {
    return req;
  }
  const token = generateCSRFToken(secret);
  req.headers['X-CSRFToken'] = token;
  return req;
});

export default api;
