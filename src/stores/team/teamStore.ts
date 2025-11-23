import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { TeamsState, TeamMember, ApiError } from '@/types';
import { teamAPI } from '@/services/teamAPI';

interface TeamStore extends TeamsState {
  // Async Actions
  fetchAllTeam: () => Promise<void>;
  fetchActiveTeam: () => Promise<void>;
  
  // Synchronous Actions
  clearError: () => void;
  clearSelectedTeam: () => void;
  filterByPosition: (position: string) => TeamMember[];
}

export const useTeamStore = create<TeamStore>()(
  persist(
    immer((set, get) => ({
      // Initial State
      teams: [],
      loading: false,
      error: null,
      total: 0,
      position: [],

      // Async Actions
      fetchAllTeam: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await teamAPI.getAllTeam();
          set((state) => {
            state.teams = response.data;
            state.total = response.data.length;
            // Extract unique positions
            state.position = Array.from(
              new Set(response.data.map((member) => member.position))
            );
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch all team';
          });
        }
      },

      fetchActiveTeam: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });

        try {
          const response = await teamAPI.getAllActive();
          set((state) => {
            state.teams = response.data;
            state.total = response.data.length;
            // Extract unique positions
            state.position = Array.from(
              new Set(response.data.map((member) => member.position))
            );
            state.loading = false;
          });
        } catch (error) {
          const apiError = error as ApiError;
          set((state) => {
            state.loading = false;
            state.error = apiError.message || 'Failed to fetch active teams';
          });
        }
      },

      // Synchronous Actions
      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      clearSelectedTeam: () => {
        set((state) => {
          state.teams = [];
        });
      },

      filterByPosition: (position: string): TeamMember[] => {
        const state = get();
        return state.teams.filter((member) => member.position === position);
      },
    })),
    {
      name: 'team-store',
      partialize: (state) => ({ teams: state.teams, position: state.position }),
    }
  )
);