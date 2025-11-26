import { api } from '@/utils/apiService';
import type { 
  ActivitiesResponse, 
  ActivitiesDetailResponse,
  ActivitiesFilters 
} from '@/types/index';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

/**
 * Kegiatan API Service
 * Menghandle fetch data kegiatan beserta relasi photos
 */
export const kegiatanAPI = {
  /**
   * Get all active kegiatan with photos
   * Backend: GET /api/v1/kegiatan/active
   * Response akan include photos array dari tabel photo_kegiatan
   */
  getAllActive: async (): Promise<ActivitiesResponse> => {
    try {
      const response = await api.get<ActivitiesResponse>('/kegiatan/active');
      
      // Log untuk debugging di development
      if (import.meta.env.DEV) {
        console.log('📸 Kegiatan with photos:', response);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error fetching active kegiatan:', error);
      throw error;
    }
  },

  /**
   * Get all inactive kegiatan with photos
   * Backend: GET /api/v1/kegiatan/inactive
   */
  getAllInactive: async (): Promise<ActivitiesResponse> => {
    try {
      const response = await api.get<ActivitiesResponse>('/kegiatan/inactive');
      
      if (import.meta.env.DEV) {
        console.log('📸 Inactive kegiatan with photos:', response);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error fetching inactive kegiatan:', error);
      throw error;
    }
  },

  /**
   * Get all kegiatan (active and inactive) with photos
   * Backend: GET /api/v1/kegiatan
   */
  getAll: async (filters?: ActivitiesFilters): Promise<ActivitiesResponse> => {
    try {
      const params = new URLSearchParams();
      
      if (filters?.is_active !== undefined) {
        params.append('is_active', String(filters.is_active));
      }
      if (filters?.page) {
        params.append('page', String(filters.page));
      }
      if (filters?.limit) {
        const limit = Math.min(filters.limit, MAX_PAGE_SIZE);
        params.append('limit', String(limit));
      } else {
        params.append('limit', String(DEFAULT_PAGE_SIZE));
      }
      if (filters?.search) {
        params.append('search', filters.search);
      }
      if (filters?.sort_by) {
        params.append('sort_by', filters.sort_by);
      }

      const queryString = params.toString();
      const url = queryString ? `/kegiatan?${queryString}` : '/kegiatan';
      
      const response = await api.get<ActivitiesResponse>(url);
      
      if (import.meta.env.DEV) {
        console.log('📸 All kegiatan with photos:', response);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error fetching all kegiatan:', error);
      throw error;
    }
  },

  /**
   * Get kegiatan by ID with photos
   * Backend: GET /api/v1/kegiatan/:kegiatanId
   */
  getById: async (kegiatanId: string): Promise<ActivitiesDetailResponse> => {
    try {
      const response = await api.get<ActivitiesDetailResponse>(
        `/kegiatan/${kegiatanId}`
      );
      
      if (import.meta.env.DEV) {
        console.log(`📸 Kegiatan detail ${kegiatanId} with photos:`, response);
      }
      
      return response;
    } catch (error) {
      console.error(`❌ Error fetching kegiatan ${kegiatanId}:`, error);
      throw error;
    }
  },
};

export default kegiatanAPI;