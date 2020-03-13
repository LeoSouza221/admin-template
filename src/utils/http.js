import axios from 'axios';
// import router from '@/router/index';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use((response) => response,
  (error) => {
    throw error;
  });

export default axiosInstance;
