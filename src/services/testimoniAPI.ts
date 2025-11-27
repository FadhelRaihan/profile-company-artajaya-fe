import { api } from '@/utils/apiService';
import type { 
  TestimonialsResponse, 
  CreateTestimonialsResponse,
  CreateTestimonials,
  UpdateTestimonialsDTO
} from '@/stores/testimoni/testimoniStore';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

/**
 * Testimonials API Service
 */
export const testimoniAPI = {
  /**
   * Get all active testimonials
   * Backend: GET /api/v1/testimoni/active
   */
  getAllActive: async (): Promise<TestimonialsResponse> => {
    return api.get<TestimonialsResponse>('/testimoni/active');
  },
 /**
   * Get all testimonials dengan filter (PROTECTED - perlu autentikasi)
   * Backend: GET /api/v1/testimoni?show_all=true
   * 
   * ⚠️ PENTING: Hanya gunakan jika user sudah login
   */
  getAll: async (filters?: {
    is_active?: boolean;
    page?: number;
    limit?: number;
  }): Promise<TestimonialsResponse> => {
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
    const url = queryString ? `/testimoni?${queryString}` : '/testimoni';

    return api.get<TestimonialsResponse>(url);
  },

  /**
   * Get Authenticared
   * Method khusus untuk fetch yang authenticated
   */
  // 
  getAllAuthenticated: async (showAll: boolean = false): Promise<TestimonialsResponse> => {
    return api.get<TestimonialsResponse>(`/testimoni?show_all=${showAll}`);
  },
  /**
   * Create new testimonial
   * Backend: POST /api/v1/testimoni
   */
  create: async (data: CreateTestimonials): Promise<CreateTestimonialsResponse> => {
    return api.post<CreateTestimonialsResponse>('/testimoni', data);
  },

  /**
   * Update testimonial by ID
   * Backend: PUT /api/v1/testimoni/:testimoniId
   */
  update: async (
    testimoniId: string,
    data: Partial<UpdateTestimonialsDTO>
  ): Promise<CreateTestimonialsResponse> => {
    return api.put<CreateTestimonialsResponse>(`/testimoni/${testimoniId}`, data);
  },

  /**
   * Delete testimonial by ID
   * Backend: DELETE /api/v1/testimoni/:testimoniId
   */
  delete: async (testimoniId: string): Promise<{ success: boolean; message: string }> => {
    return api.delete<{ success: boolean; message: string }>(`/testimoni/${testimoniId}`);
  },
};

export default testimoniAPI;