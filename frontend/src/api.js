import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('shopsphere_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
export const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));
export const getError = error => error.response?.data?.message || 'Something went wrong. Please try again.';
