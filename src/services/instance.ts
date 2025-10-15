import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  // You can add authorization headers or other custom logic here
  return config;
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.resolve({
    data: null,
    success: false,
    error: error.response ? error.response.data : error.message,
  });
});
export default instance;