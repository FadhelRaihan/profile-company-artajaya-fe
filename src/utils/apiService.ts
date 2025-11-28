import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ApiError } from '../types';

// ✅ PENTING: Ambil dari .env.local
const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;
const CACHE_DURATION = Number(import.meta.env.VITE_CACHE_DURATION) || 5 * 60 * 1000; // 5 menit default

// Cache entry interface
interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
}

// Zustand store untuk cache
interface CacheStore {
  cache: Map<string, CacheEntry>;
  setCache: <T>(key: string, data: T) => void;
  getCache: <T>(key: string) => T | null;
  deleteCache: (key: string) => void;
  clearCache: () => void;
  clearByPattern: (pattern: string) => void;
}

// Custom storage untuk Map
const mapStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    
    try {
      const parsed = JSON.parse(str);
      
      // Konversi array entries kembali ke Map
      if (parsed.state?.cache && Array.isArray(parsed.state.cache)) {
        parsed.state.cache = new Map(parsed.state.cache);
      }
      
      // ✅ Kembalikan string JSON untuk Zustand
      return JSON.stringify(parsed);
    } catch (error) {
      console.error('Cache parse error:', error);
      return null;
    }
  },
  
  setItem: (name: string, value: any) => {
    try {
      const state = {
        ...value.state,
        cache: value.state.cache instanceof Map 
          ? Array.from(value.state.cache.entries())
          : [],
      };
      localStorage.setItem(name, JSON.stringify({ state }));
    } catch (error) {
      console.error('Cache save error:', error);
    }
  },
  
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};


// Zustand store dengan persist
const useCacheStore = create<CacheStore>()(
  persist(
    (set, get) => ({
      cache: new Map<string, CacheEntry>(),

      setCache: <T>(key: string, data: T) => {
        set((state) => {
          const newCache = new Map(state.cache);
          newCache.set(key, {
            data,
            timestamp: Date.now(),
          });
          return { cache: newCache };
        });
      },

      getCache: <T>(key: string): T | null => {
        const entry = get().cache.get(key);
        
        if (!entry) return null;

        // Check if cache expired
        if (Date.now() - entry.timestamp > CACHE_DURATION) {
          get().deleteCache(key);
          return null;
        }

        return entry.data as T;
      },

      deleteCache: (key: string) => {
        set((state) => {
          const newCache = new Map(state.cache);
          newCache.delete(key);
          return { cache: newCache };
        });
      },

      clearCache: () => {
        set({ cache: new Map() });
      },  

      clearByPattern: (pattern: string) => {
        set((state) => {
          const newCache = new Map(state.cache);
          Array.from(newCache.keys()).forEach((key) => {
            if (key.includes(pattern)) {
              newCache.delete(key);
            }
          });
          return { cache: newCache };
        });
      },
    }),
    {
      name: 'api-cache-storage',
      storage: createJSONStorage(() => mapStorage),
    }
  )
);

// Generate cache key from URL and params
function generateCacheKey(url: string, config?: AxiosRequestConfig): string {
  const params = config?.params ? JSON.stringify(config.params) : '';
  return `${url}${params}`;
}

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
        useCacheStore.getState().clearCache(); // Clear cache on logout
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

// GENERIC API WRAPPER
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig & { useCache?: boolean }) => {
    const useCache = config?.useCache !== false; // Default true
    const { getCache, setCache } = useCacheStore.getState();
    
    if (useCache) {
      const cacheKey = generateCacheKey(url, config);
      const cachedData = getCache<T>(cacheKey);
      
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
    }

    return apiClient.get<T>(url, config).then((res) => {
      if (useCache) {
        const cacheKey = generateCacheKey(url, config);
        setCache(cacheKey, res.data);
      }
      return res.data;
    });
  },

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    // Invalidate related cache after POST
    const { clearByPattern } = useCacheStore.getState();
    clearByPattern(url.split('/')[0]);
    return apiClient.post<T>(url, data, config).then((res) => res.data);
  },

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    // Invalidate related cache after PUT
    const { clearByPattern } = useCacheStore.getState();
    clearByPattern(url.split('/')[0]);
    return apiClient.put<T>(url, data, config).then((res) => res.data);
  },

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    // Invalidate related cache after PATCH
    const { clearByPattern } = useCacheStore.getState();
    clearByPattern(url.split('/')[0]);
    return apiClient.patch<T>(url, data, config).then((res) => res.data);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    // Invalidate related cache after DELETE
    const { clearByPattern } = useCacheStore.getState();
    clearByPattern(url.split('/')[0]);
    return apiClient.delete<T>(url, config).then((res) => res.data);
  },

  upload: <T>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ) => {
    // Invalidate related cache after upload
    const { clearByPattern } = useCacheStore.getState();
    clearByPattern(url.split('/')[0]);
    return apiClient
      .post<T>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      })
      .then((res) => res.data);
  },

  // Cache utilities
  cache: {
    clear: () => useCacheStore.getState().clearCache(),
    clearByPattern: (pattern: string) => useCacheStore.getState().clearByPattern(pattern),
    delete: (url: string, config?: AxiosRequestConfig) => {
      const cacheKey = generateCacheKey(url, config);
      useCacheStore.getState().deleteCache(cacheKey);
    },
  },
};

// Export cache store untuk digunakan di komponen lain jika perlu
export { useCacheStore };

export default apiClient;