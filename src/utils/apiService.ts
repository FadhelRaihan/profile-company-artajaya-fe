import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { ApiError } from '../types';

// Base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

// Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// =======================
// REQUEST INTERCEPTOR
// =======================
// Interceptor untuk menambahkan Authorization header jika token ada
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },

  (error: AxiosError<ApiError>) => {
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
    }

    if (error.response) {
      const apiError: ApiError = {
        success: false,
        message: error.response.data?.message || 'An error occurred',
        errors: error.response.data?.errors,
        statusCode: error.response.status,
      };

      // 401 → token invalid → clear token
      if (error.response.status === 401) {
        localStorage.removeItem('token');
      }

      // 429 → rate limit
      if (error.response.status === 429) {
        apiError.message = 'Terlalu banyak request. Silakan coba beberapa saat lagi.';
      }

      return Promise.reject(apiError);
    }

    if (error.request) {
      return Promise.reject({
        success: false,
        message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        statusCode: 0,
      } as ApiError);
    }

    return Promise.reject({
      success: false,
      message: error.message || 'Terjadi kesalahan yang tidak terduga',
      statusCode: 0,
    } as ApiError);
  }
);

// =======================
// GENERIC API WRAPPER
// =======================
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),

  upload: <T>(url: string, formData: FormData, onUploadProgress?: (progressEvent: any) => void) =>
    apiClient
      .post<T>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      })
      .then((res) => res.data),
};

export default apiClient;
