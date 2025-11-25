/**
 * Central export untuk semua stores dan hooks
 * 
 * Usage:
 * import { useKegiatan, useTestimoni, useTeam } from '@/stores'
 * import { useKegiatanList, useTestimoniLoading, useTeamActions } from '@/stores'
 */

// ============================================
// STORE EXPORTS
// ============================================
export { useKegiatanStore } from './kegiatan/kegiatanStore';
export { useTestimoniStore } from './testimoni/testimoniStore';
export { useEmployeeStore } from './team/employeeStore';

// ============================================
// KEGIATAN HOOKS
// ============================================
export {
  useKegiatan,
  useKegiatanLoading,
  useKegiatanError,
  useKegiatanList,
  useKegiatanSelected,
  useKegiatanPagination,
  useKegiatanActions,
} from './hooks';

// ============================================
// TESTIMONI HOOKS
// ============================================
export {
  useTestimoni,
  useTestimoniLoading,
  useTestimoniError,
  useTestimoniList,
  useTestimoniSubmitting,
  useTestimoniActions,
} from './hooks';


// ============================================
// EMPLOYEE HOOKS
// ============================================
export {
  useEmployee,
  useEmployeeLoading,
  useEmployeeError,
  useEmployeeList,
  useEmployeePositions,
  useEmployeeTotal,
  useEmployeeActions,
} from './hooks';