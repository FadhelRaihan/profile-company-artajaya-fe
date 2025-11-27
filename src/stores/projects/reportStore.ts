import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ProjectService } from "@/services/reportAPI";

// Project Types
export interface ProjectPhoto {
  id: string;
  report_id: string;
  photo_name: string;
  url: string;
}

export interface ProjectDetail {
  id: string;
  report_id: string;
  detail_description: string;
  start_date: string;
  end_date: string;
  location: string;
  client: string;
  service: string;
  industry: string;
}

export interface Project {
  id: string;
  project_name: string;
  description: string;
  is_active: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  photos?: ProjectPhoto[];
  details?: ProjectDetail[];
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project[];
  total?: number;
  timestamp: string;
}

export interface ProjectDetailResponse {
  success: boolean;
  message: string;
  data: Project;
  timestamp: string;
}

// Project State
export interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
  total: number;
}



interface ProjectActions {
    fetchActiveProjects: () => Promise<void>;
    clearError: () => void;
    clearSelectedProject: () => void;
    clearProjects: () => void;
}

type ProjectStore = ProjectState & ProjectActions;

export const useProjectStore = create<ProjectStore>()(
    devtools(
        (set) => ({
            //initial state
            projects:[],
            selectedProject: null,
            loading: false,
            error: null,
            total: 0,

            //Actions
            fetchActiveProjects: async () => {
                set({ loading: true, error: null });
                try {
                    const response = await ProjectService.getActiveProjects();
                    set({
                        projects: response.data,
                        total: response.total || response.data.length,
                        loading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.message || "Failed to fetch active projects",
                        loading: false,
                        projects: [],
                    });
                }
            },
            clearError: () => set({ error: null }),
            clearSelectedProject: () => set({ selectedProject: null }),
            clearProjects: () => set({ projects: [], total: 0 }),
        }),
        {name: 'ProjectStore'}
    )
);