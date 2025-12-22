import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { instance } from './instance';

import { API_HEADERS, API_TIMEOUT } from '../constants/apiConstants';
import { useUserStore } from '../store/useUserStore';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const privateInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URI,
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
        useUserStore.getState().clearUser();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { privateInstance };
