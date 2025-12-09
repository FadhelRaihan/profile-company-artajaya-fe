import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { ApiError } from '@/types/index';
import { testimoniAPI } from '@/services/testimoniAPI';
// Testimonials Types
export interface Testimonials {
  id: string;
  nama_tester: string;
  testimoni: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonials {
  nama_tester: string;
  testimoni: string;
  createdBy: string;
  isActive?: boolean;
}

export interface TestimonialsResponse {
  success: boolean;
  data: Testimonials[];
  total: number;
}

export interface CreateTestimonialsResponse {
  success: boolean;
  message: string;
  data: Testimonials;
}

// Testimonials State
export interface TestimonialsState {
  testimonials: Testimonials[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitSuccess: boolean;
  total: number;
}

/** 
 * *Create/Update Testimonials Types */ 
 export interface UpdateTestimonialsDTO {
   id: string; 
   testerName?: string; 
   message?: string; 
   isActive?: boolean; 
} 
/** 
 *End Create/Update Testimonials Types 
 */


interface TestimoniStore extends TestimonialsState {
  // Async Actions
  fetchActiveTestimoni: () => Promise<void>;
  createTestimoni: (data: CreateTestimonials) => Promise<void>;
  
  // Synchronous Actions
  clearError: () => void;
  clearSubmitSuccess: () => void;
  resetSubmitState: () => void;
  addTestimonial: (testimonial: Testimonials) => void;
  removeTestimonial: (id: string) => void;
}

export const useTestimoniStore = create<TestimoniStore>()(
  persist(
    immer((set) => ({
      // Initial State
      testimonials: [],
      loading: false,
      error: null,
      submitting: false,
      submitSuccess: false,
      total: 0,

      // Async Actions
      fetchActiveTestimoni: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await testimoniAPI.getAllActive();
          set((state) => {
            state.testimonials = response.data || [];
            state.total = response.data.length;
            state.loading = false;
            state.error = null;
          });
        } catch (error) {
          const apiError = error as ApiError;
          // ✅ Handle 401 gracefully untuk public endpoint
          if (apiError.statusCode === 401) {
            set((state) => {
              state.testimonials = [];
              state.loading = false;
              state.error = null;
            });
          } else {
            set((state) => {
              state.loading = false;
              state.error = apiError.message || 'Failed to fetch testimonials';
            });
          }
        }
      },

      createTestimoni: async (data: CreateTestimonials) => {
        set((state) => {
          state.submitting = true;
          state.error = null;
          state.submitSuccess = false;
        });

        try {
          const response = await testimoniAPI.create(data);
          if (!response.success) {
            throw new Error(response.message || 'Failed to create testimonial');
          }
          set((state) => {
            state.submitting = false;
            state.submitSuccess = true;
            state.error = null;

            if (response.data) {
            state.testimonials.push(response.data);
            state.total = state.testimonials.length;
            }
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.submitting = false;
            state.error = apiError.message || 'Failed to create testimonial';
            state.submitSuccess = false;
          });
          throw error;
        }
      },

      // Synchronous Actions
      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      clearSubmitSuccess: () => {
        set((state) => {
          state.submitSuccess = false;
        });
      },

      resetSubmitState: () => {
        set((state) => {
          state.submitting = false;
          state.submitSuccess = false;
          state.error = null;
        });
      },

      addTestimonial: (testimonial: Testimonials) => {
        set((state) => {
          state.testimonials.push(testimonial);
          state.total = state.testimonials.length;
        });
      },

      removeTestimonial: (id: string) => {
        set((state) => {
          state.testimonials = state.testimonials.filter((t) => t.id !== id);
          state.total = state.testimonials.length;
        });
      },
    })),
    {
      name: 'testimoni-store',
      partialize: (state) => ({ testimonials: state.testimonials }),
    }
  )
);