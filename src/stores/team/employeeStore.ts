import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { ApiError } from '@/types';
import { employeeAPI } from '@/services/employeeAPI';

// Employee Types
export interface EmployeeMember {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  joinDate: string;
  positionId: string;
  photo_url: string;
  position?: Position;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

// Employee State
export interface EmployeeState {
  employees: EmployeeMember[];
  loading: boolean;
  error: string | null;
  total: number;
  positions: string[];
}

interface EmployeeStore extends EmployeeState {
  // Async Actions
  fetchActiveEmployee: () => Promise<void>;

  // Sync Actions
  clearError: () => void;
  clearEmployees: () => void;
  filterByPosition: (position: string) => EmployeeMember[];
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    immer((set, get) => ({
      // ================= INITIAL STATE =================
      employees: [],
      loading: false,
      error: null,
      total: 0,
      positions: [],

      // ================= ASYNC ACTIONS =================
      fetchActiveEmployee: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await employeeAPI.getAllActive();
          if (!response || !response.data) {
            throw new Error('Invalid response from API');
          }

          set((state) => {
            state.employees = response.data;
            state.total = response.data.length;
            state.positions = extractPositions(response.data);
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch active employees';
          });
        }
      },

      // ================= SYNC ACTIONS =================
      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      clearEmployees: () => {
        set((state) => {
          state.employees = [];
          state.total = 0;
          state.positions = [];
        });
      },

      filterByPosition: (position: string): EmployeeMember[] => {
        return get().employees.filter((emp) => {
          if (emp.position && typeof emp.position === 'object') {
            return emp.position.name === position;
          }
          return emp.position === position;
        });
      },
    })),
    {
      name: 'employee-store',
      partialize: (state) => ({
        employees: state.employees,
        positions: state.positions,
        total: state.total,
      }),
    }
  )
);

/**
 * Helper untuk ekstrak posisi unik dengan type-safety
 */
const extractPositions = (employees: EmployeeMember[]): string[] => {
  return Array.from(
    new Set(
      employees
        .map((emp) => {
          if (emp.position && typeof emp.position === 'object') {
            return emp.position.name;
          }
          return typeof emp.position === 'string' ? emp.position : '';
        })
        .filter((pos): pos is string => pos.length > 0)
    )
  );
};
