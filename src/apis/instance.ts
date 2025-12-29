import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { API_HEADERS, API_TIMEOUT } from '../constants/apiConstants';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const instance: AxiosInstance = axios.create({
  baseURL: BACKEND_URI,
  timeout: API_TIMEOUT,
  headers: API_HEADERS.JSON,
});

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (typeof message === 'string') return message;
    if (status) {
      switch (status) {
        case 400:
          return '🚨 잘못된 요청입니다. (400)';
        case 401:
          return '🚨 인증이 필요합니다. (401)';
        case 403:
          return '🚨 권한이 없습니다. (403)';
        case 404:
          return '🚨 요청한 리소스를 찾을 수 없습니다. (404)';
        case 500:
          return '🚨 서버 내부 오류가 발생했습니다. (500)';
        default:
          return `🚨 요청에 실패했습니다. (Status: ${status})`;
      }
    }
  }

  if (error instanceof Error && error.message === 'Network Error') {
    return '🚨 네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
  }

  return '🚨 알 수 없는 오류가 발생했습니다.';
};

const MAX_RETRY = 3;

const retryCounts = new Map<string, number>();

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

    if (!config || !config.url) {
      return Promise.reject(new Error(getErrorMessage(err)));
    }

    if (config.url.includes('/api/auth/kakao')) {
      retryCounts.delete(config.url);
      return Promise.reject(new Error(getErrorMessage(err)));
    }

    const currentRetry = retryCounts.get(config.url) || 0;

    if (
      (err.message === 'Network Error' ||
        (err.response && err.response.status >= 500)) &&
      currentRetry < MAX_RETRY
    ) {
      retryCounts.set(config.url, currentRetry + 1);
      return instance(config);
    }

    retryCounts.delete(config.url);
    return Promise.reject(new Error(getErrorMessage(err)));
  },
);

export { instance };
