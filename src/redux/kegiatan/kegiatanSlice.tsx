import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { ActivitiesState, Activities, ApiError } from '@/types/index';
import { kegiatanAPI } from '@/services/kegiatanAPI';

// Initial state
const initialState: ActivitiesState = {
  kegiatan: [],
  selectedKegiatan: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 20,
};

// Async thunks
/**
 * Fetch all active kegiatan
 */
export const fetchActiveKegiatan = createAsyncThunk(
  'kegiatan/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await kegiatanAPI.getAllActive();
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Failed to fetch active kegiatan');
    }
  }
);

/**
 * Fetch all inactive kegiatan
 */
export const fetchInactiveKegiatan = createAsyncThunk(
  'kegiatan/fetchInactive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await kegiatanAPI.getAllInactive();
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Failed to fetch inactive kegiatan');
    }
  }
);

/**
 * Fetch all kegiatan
 */
export const fetchAllKegiatan = createAsyncThunk(
  'kegiatan/fetchAll',
  async (filters: { is_active?: boolean; page?: number; limit?: number } | undefined, { rejectWithValue }) => {
    try {
      const response = await kegiatanAPI.getAll(filters);
      return response.data || [];
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Failed to fetch kegiatan');
    }
  }
);

/**
 * Fetch kegiatan by ID
 */
export const fetchKegiatanById = createAsyncThunk(
  'kegiatan/fetchById',
  async (kegiatanId: string, { rejectWithValue }) => {
    try {
      const response = await kegiatanAPI.getById(kegiatanId);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Failed to fetch kegiatan details');
    }
  }
);

// Slice
const kegiatanSlice = createSlice({
  name: 'kegiatan',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedKegiatan: (state) => {
      state.selectedKegiatan = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Active Kegiatan
    builder
      .addCase(fetchActiveKegiatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveKegiatan.fulfilled, (state, action) => {
        state.loading = false;
        state.kegiatan = action.payload;
        state.total = action.payload.length;
        state.error = null;
      })
      .addCase(fetchActiveKegiatan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Inactive Kegiatan
    builder
      .addCase(fetchInactiveKegiatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInactiveKegiatan.fulfilled, (state, action) => {
        state.loading = false;
        state.kegiatan = action.payload;
        state.total = action.payload.length;
        state.error = null;
      })
      .addCase(fetchInactiveKegiatan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch All Kegiatan
    builder
      .addCase(fetchAllKegiatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllKegiatan.fulfilled, (state, action) => {
        state.loading = false;
        state.kegiatan = action.payload;
        state.total = action.payload.length;
        state.error = null;
      })
      .addCase(fetchAllKegiatan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Kegiatan By ID
    builder
      .addCase(fetchKegiatanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKegiatanById.fulfilled, (state, action: PayloadAction<Activities>) => {
        state.loading = false;
        state.selectedKegiatan = action.payload;
        state.error = null;
      })
      .addCase(fetchKegiatanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedKegiatan = null;
      });
  },
});

export const { clearError, clearSelectedKegiatan } = kegiatanSlice.actions;
export default kegiatanSlice.reducer;