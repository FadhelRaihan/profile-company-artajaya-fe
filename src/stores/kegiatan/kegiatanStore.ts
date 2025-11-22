import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { ActivitiesState, ApiError } from '@/types/index';
import { kegiatanAPI } from '@/services/kegiatanAPI';

interface KegiatanStore extends ActivitiesState {
  // Actions
  fetchActiveKegiatan: () => Promise<void>;
  fetchInactiveKegiatan: () => Promise<void>;
  fetchAllKegiatan: (filters?: {
    is_active?: boolean;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchKegiatanById: (kegiatanId: string) => Promise<void>;
  
  // Synchronous Actions
  clearError: () => void;
  clearSelectedKegiatan: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useKegiatanStore = create<KegiatanStore>()(
  persist(
    immer((set) => ({
      // Initial State
      kegiatan: [],
      selectedKegiatan: null,
      loading: false,
      error: null,
      total: 0,
      page: 1,
      limit: 20,

      // Async Actions
      fetchActiveKegiatan: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await kegiatanAPI.getAllActive();
          set((state) => {
            state.kegiatan = response.data;
            state.total = response.data.length;
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch active kegiatan';
          });
        }
      },

      fetchInactiveKegiatan: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await kegiatanAPI.getAllInactive();
          set((state) => {
            state.kegiatan = response.data;
            state.total = response.data.length;
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch inactive kegiatan';
          });
        }
      },

      fetchAllKegiatan: async (filters) => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await kegiatanAPI.getAll(filters);
          set((state) => {
            state.kegiatan = response.data || [];
            state.total = response.total || response.data.length;
            if (filters?.page) state.page = filters.page;
            if (filters?.limit) state.limit = filters.limit;
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch kegiatan';
          });
        }
      },

      fetchKegiatanById: async (kegiatanId: string) => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await kegiatanAPI.getById(kegiatanId);
          set((state) => {
            state.selectedKegiatan = response.data;
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch kegiatan details';
            state.selectedKegiatan = null;
          });
        }
      },

      // Synchronous Actions
      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      clearSelectedKegiatan: () => {
        set((state) => {
          state.selectedKegiatan = null;
        });
      },

      setPage: (page: number) => {
        set((state) => {
          state.page = page;
        });
      },

      setLimit: (limit: number) => {
        set((state) => {
          state.limit = limit;
        });
      },
    })),
    {
      name: 'kegiatan-store',
      partialize: (state) => ({ kegiatan: state.kegiatan }), // Persist hanya kegiatan list
    }
  )
);