import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { ApiError } from '../types';

// ✅ PENTING: Ambil dari .env.local
const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const API_BASE = VITE_API_URL.replace('/api/v1', '') || 'http://localhost:3000'; // Base tanpa /api/v1
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

// Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// REQUEST INTERCEPTOR
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

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const apiError: ApiError = {
        success: false,
        message: error.response.data?.message || 'An error occurred',
        errors: error.response.data?.errors,
        statusCode: error.response.status,
      };

      if (error.response.status === 401) {
        localStorage.removeItem('token');
      }

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

// ✅ TAMBAH: Utility function untuk resolve image URL
export const getImageUrl = (photoUrl: string | null | undefined): string => {
  if (!photoUrl) {
    return '/default-avatar.png'; // Fallback ke default avatar
  }

  // Jika sudah absolute URL, return as is
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }

  // Jika relative path, tambah base API URL
  return `${API_BASE}${photoUrl.startsWith('/') ? photoUrl : '/' + photoUrl}`;
};

// GENERIC API WRAPPER
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

  upload: <T>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ) =>
    apiClient
      .post<T>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      })
      .then((res) => res.data),
};

export default apiClient;
