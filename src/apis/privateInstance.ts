import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { instance } from './instance';

import { API_HEADERS, API_TIMEOUT } from '../constants/apiConstants';
import { useUserStore } from '../store/useUserStore';

const privateInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: API_TIMEOUT,
  headers: API_HEADERS.JSON,
  withCredentials: true,
});

privateInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await instance.post('/api/auth/refresh', {}, { withCredentials: true });

        return privateInstance(originalRequest);
      } catch (refreshError) {
        const { clearUser } = useUserStore();
        clearUser();
        console.log('토큰만료');
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { privateInstance };
