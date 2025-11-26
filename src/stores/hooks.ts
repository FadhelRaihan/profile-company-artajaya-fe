/**
 * Custom hooks untuk mengakses stores dengan selector
 * Ini membantu prevent unnecessary re-renders
 */

import { useShallow } from 'zustand/react/shallow';
import { useKegiatanStore } from './kegiatan/kegiatanStore';
import { useTestimoniStore } from './testimoni/testimoniStore';
import { useEmployeeStore } from './team/employeeStore';

// ============================================
// KEGIATAN HOOKS
// ============================================

export const useKegiatanLoading = () =>
  useKegiatanStore(useShallow((state) => state.loading));

export const useKegiatanError = () =>
  useKegiatanStore(useShallow((state) => state.error));

export const useKegiatanList = () =>
  useKegiatanStore(useShallow((state) => state.kegiatan));

export const useKegiatanSelected = () =>
  useKegiatanStore(useShallow((state) => state.selectedKegiatan));

export const useKegiatanPagination = () =>
  useKegiatanStore(useShallow((state) => ({ page: state.page, limit: state.limit, total: state.total })));

export const useKegiatanActions = () =>
  useKegiatanStore(useShallow((state) => ({
    fetchActiveKegiatan: state.fetchActiveKegiatan,
    fetchInactiveKegiatan: state.fetchInactiveKegiatan,
    fetchAllKegiatan: state.fetchAllKegiatan,
    fetchKegiatanById: state.fetchKegiatanById,
    clearError: state.clearError,
    clearSelectedKegiatan: state.clearSelectedKegiatan,
    setPage: state.setPage,
    setLimit: state.setLimit,
  })));

// Full hook for components that need everything
export const useKegiatan = () => useKegiatanStore();

// ============================================
// TESTIMONI HOOKS
// ============================================

export const useTestimoniLoading = () =>
  useTestimoniStore(useShallow((state) => state.loading));

export const useTestimoniError = () =>
  useTestimoniStore(useShallow((state) => state.error));

export const useTestimoniList = () =>
  useTestimoniStore(useShallow((state) => state.testimonials));

export const useTestimoniSubmitting = () =>
  useTestimoniStore(useShallow((state) => ({
    submitting: state.submitting,
    submitSuccess: state.submitSuccess,
  })));

export const useTestimoniActions = () =>
  useTestimoniStore(useShallow((state) => ({
    fetchActiveTestimoni: state.fetchActiveTestimoni,
    createTestimoni: state.createTestimoni,
    clearError: state.clearError,
    clearSubmitSuccess: state.clearSubmitSuccess,
    resetSubmitState: state.resetSubmitState,
    addTestimonial: state.addTestimonial,
    removeTestimonial: state.removeTestimonial,
  })));

// Full hook
export const useTestimoni = () => useTestimoniStore();

// ============================================
// EMPLOYEE HOOKS
// ============================================

export const useEmployeeLoading = () =>
  useEmployeeStore(useShallow((state) => state.loading));

export const useEmployeeError = () =>
  useEmployeeStore(useShallow((state) => state.error));

export const useEmployeeList = () =>
  useEmployeeStore(useShallow((state) => state.employees));

export const useEmployeePositions = () =>
  useEmployeeStore(useShallow((state) => state.positions));

export const useEmployeeTotal = () =>
  useEmployeeStore(useShallow((state) => state.total));

export const useEmployeeActions = () =>
  useEmployeeStore(useShallow((state) => ({
    fetchAllEmployee: state.fetchAllEmployee,
    fetchActiveEmployee: state.fetchActiveEmployee,
    fetchInactiveEmployee: state.fetchInactiveEmployee,
    fetchEmployeeById: state.fetchEmployeeById,
    clearError: state.clearError,
    clearEmployees: state.clearEmployees,
    filterByPosition: state.filterByPosition,
    searchEmployee: state.searchEmployee,
  })));

// Full hook for components that need everything
export const useEmployee = () => useEmployeeStore();

