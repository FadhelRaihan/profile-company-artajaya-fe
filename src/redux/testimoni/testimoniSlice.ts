import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {
  TestimonialsState,
  Testimonials,
  CreateTestimonials,
  ApiError,
} from '@/types/index';
import { testimoniAPI } from '@/services/testimoniAPI';

// Initial state
const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  error: null,
  submitting: false,
  submitSuccess: false,
  total: 0,
};

// Async thunks
/**
 * Fetch semua active testimonials (PUBLIC)
 * Without authentication
 */
export const fetchActiveTestimoni = createAsyncThunk(
  'testimoni/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await testimoniAPI.getAllActive();
      return response.data || [];
    } catch (error) {
      const apiError = error as ApiError;
      // ✅ Handle 401 gracefully untuk public endpoint
      if (apiError.statusCode === 401) {
        return []; // Return empty array, jangan reject
      }
      return rejectWithValue(apiError.message || 'Failed to fetch active testimonials');
    }
  }
);

/**
 * Create testimonial
 */
export const createTestimoni = createAsyncThunk(
  'testimoni/create',
  async (data: CreateTestimonials, { rejectWithValue }) => {
    try {
      const response = await testimoniAPI.create(data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Failed to create testimonial');
    }
  }
);

// Rest of slice...
const testimoniSlice = createSlice({
  name: 'testimoni',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
    resetSubmitState: (state) => {
      state.submitting = false;
      state.submitSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Active Testimonials
    builder
      .addCase(fetchActiveTestimoni.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveTestimoni.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
        state.total = action.payload.length;
        state.error = null;
      })
      .addCase(fetchActiveTestimoni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Testimonial
    builder
      .addCase(createTestimoni.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(createTestimoni.fulfilled, (state, action: PayloadAction<Testimonials>) => {
        state.submitting = false;
        state.submitSuccess = true;
        state.error = null;
        state.testimonials.push(action.payload);
        state.total = state.testimonials.length;
      })
      .addCase(createTestimoni.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
        state.submitSuccess = false;
      });
  },
});

export const { clearError, clearSubmitSuccess, resetSubmitState } = testimoniSlice.actions;
export default testimoniSlice.reducer;