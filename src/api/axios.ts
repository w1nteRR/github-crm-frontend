import axios from 'axios';
import { authApi } from '@/api/auth/auth.api.ts';

const baseURL = 'http://localhost:3000/api/v1/';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const accessToken = localStorage.getItem('access_token');
if (accessToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) return Promise.reject(error);

        const { tokens } = await authApi.refresh(refresh_token);

        const { access_token, refresh_token: newRefresh } = tokens;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', newRefresh);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
