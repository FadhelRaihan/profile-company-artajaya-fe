import { api } from "@/utils/apiService"
import type { EmployeeMemberResponse } from "@/stores/team/employeeStore"

/** 
 * Employee API Service
 * Routes: /api/v1/employee
 */
export const employeeAPI = {
    /**
     * Get All Employees
     * Backend GET /api/v1/employee
     */
    getAllEmployee: async (): Promise<EmployeeMemberResponse> => {
        return api.get<EmployeeMemberResponse>('/employee')
    },

    /**
     * Get All Active Employees
     * Backend GET /api/v1/employee/active
     */
    getAllActive: async (): Promise<EmployeeMemberResponse> => {
        return api.get<EmployeeMemberResponse>('/employee/active')
    },

    /**
     * Get All Inactive Employees
     * Backend GET /api/v1/employee/inactive
     */
    getAllInactive: async (): Promise<EmployeeMemberResponse> => {
        return api.get<EmployeeMemberResponse>('/employee/inactive')
    },

    /**
     * Get Employee by ID
     * Backend GET /api/v1/employee/:id
     */
    getEmployeeById: async (id: string): Promise<EmployeeMemberResponse> => {
        return api.get<EmployeeMemberResponse>(`/employee/${id}`)
    },
};

export default employeeAPI;