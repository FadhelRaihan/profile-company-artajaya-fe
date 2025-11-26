export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
} as const;

export const FILE_CONFIG = {
  MAX_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760,
  MAX_SIZE_MB: (Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760) / 1024 / 1024,
  ALLOWED_EXTENSIONS: import.meta.env.VITE_ALLOWED_FILE_EXTENSIONS?.split(',') || ['.xlsx', '.xls', '.csv'],
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const CORS_CONFIG = {
  CREDENTIALS: true, // Sesuai dengan backend CORS_CREDENTIALS
} as const;