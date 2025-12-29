import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export const kakaoAuthInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URI,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
