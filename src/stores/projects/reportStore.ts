import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProjectState } from "@/types";
import { ProjectService } from "@/services/reportAPI";


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