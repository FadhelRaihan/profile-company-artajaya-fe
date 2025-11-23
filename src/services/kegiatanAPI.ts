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
 */
export const kegiatanAPI = {
  /**
   * Get all active kegiatan
   * Backend: GET /api/v1/kegiatan/active
   */
  getAllActive: async (): Promise<ActivitiesResponse> => {
    return api.get<ActivitiesResponse>('/kegiatan/active');
  },

  /**
   * Get all inactive kegiatan
   * Backend: GET /api/v1/kegiatan/inactive
   */
  getAllInactive: async (): Promise<ActivitiesResponse> => {
    return api.get<ActivitiesResponse>('/kegiatan/inactive');
  },

  /**
   * Get all kegiatan (active and inactive)
   * Backend: GET /api/v1/kegiatan
   */
  getAll: async (filters?: ActivitiesFilters): Promise<ActivitiesResponse> => {
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

    const queryString = params.toString();
    const url = queryString ? `/kegiatan?${queryString}` : '/kegiatan';
    
    return api.get<ActivitiesResponse>(url);
  },

  /**
   * Get kegiatan by ID
   * Backend: GET /api/v1/kegiatan/:kegiatanId
   */
  getById: async (kegiatanId: string): Promise<ActivitiesDetailResponse> => {
    return api.get<ActivitiesDetailResponse>(`/kegiatan/${kegiatanId}`);
  },
};

export default kegiatanAPI;