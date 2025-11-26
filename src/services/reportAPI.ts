import { api } from "@/utils/apiService";
import type { ProjectResponse } from "@/types";

export const ProjectService = {
    /**
     * Get All Active Projects
     */
    getActiveProjects: async (): Promise<ProjectResponse> => {
        return api.get<ProjectResponse>('/reports/active');
    }
}