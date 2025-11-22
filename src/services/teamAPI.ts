import { api } from "@/utils/apiService"
import type { TeamMemberResponse } from "@/types"

/** 
 * TeamMember API Service
*/
export const teamAPI = {
    /**
     * Get All Team
     * Backend GET /api/v1/team
     */

    getAllTeam: async (): Promise<TeamMemberResponse> => {
        return api.get<TeamMemberResponse>('/')
    },

    /**
     * Get All Active Team
     */

    getAllActive: async (): Promise<TeamMemberResponse> => {
        return api.get<TeamMemberResponse>('/active')
    },
};

export default teamAPI;