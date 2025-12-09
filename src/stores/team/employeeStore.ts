import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { ApiError } from '@/types';
import { employeeAPI } from '@/services/employeeAPI';

// Employee Types
export interface EmployeeMember {
  id: string;
  full_name: string;
  phoneNumber: string;
  email: string;
  joinDate: string;
  positionId: string;
  photo_url: string;
  position?: Position;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeMemberResponse {
  success: boolean;
  data: EmployeeMember[];
  total: number;
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


/**
 * Helper untuk ekstrak posisi unik dengan type-safety
 */
const extractPositions = (employees: EmployeeMember[]): string[] => {
  return Array.from(
    new Set(
      employees
        .map((emp) => {
          // ✅ Handle jika position adalah object
          if (emp.position && typeof emp.position === 'object') {
            return emp.position.name;
          }
          return typeof emp.position === 'string' ? emp.position : '';
        })
        .filter((pos): pos is string => pos.length > 0)
    )
  );
};

interface EmployeeStore extends EmployeeState {
  // Async Actions
  fetchAllEmployee: () => Promise<void>;
  fetchActiveEmployee: () => Promise<void>;
  fetchInactiveEmployee: () => Promise<void>;
  fetchEmployeeById: (id: string) => Promise<EmployeeMember | null>;
  
  // Sync Actions
  clearError: () => void;
  clearEmployees: () => void;
  filterByPosition: (position: string) => EmployeeMember[];
  searchEmployee: (query: string) => EmployeeMember[];
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
      fetchAllEmployee: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await employeeAPI.getAllEmployee();
          if (!response || !response.data) {
            throw new Error('Invalid response from API');
          }

          // Menyimpan data ke state
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
            state.error = apiError.message || 'Failed to fetch employees';
          });
        }
      },

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

      fetchInactiveEmployee: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await employeeAPI.getAllInactive();
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
            state.error = apiError.message || 'Failed to fetch inactive employees';
          });
        }
      },

      fetchEmployeeById: async (id: string) => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await employeeAPI.getEmployeeById(id);
          const employee = response.data[0] ?? null;

          set((state) => {
            state.loading = false;
          });

          return employee;
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch employee';
          });

          return null;
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

      searchEmployee: (query: string): EmployeeMember[] => {
        const lowerQuery = query.toLowerCase();

        return get().employees.filter((emp) => {
          const positionName = emp.position && typeof emp.position === 'object' 
            ? emp.position.name 
            : emp.position || '';

          return (
            emp.full_name.toLowerCase().includes(lowerQuery) ||
            emp.email.toLowerCase().includes(lowerQuery) ||
            positionName.toLowerCase().includes(lowerQuery)
          );
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
