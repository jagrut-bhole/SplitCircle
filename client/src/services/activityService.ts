import { api } from "./api";
import type { GetActivityFeedResponse } from "@/types/ActivityTypes";

export const activityService = {
    // Note: Activity feed endpoint is not yet implemented in backend
    // This is a placeholder for future implementation
    
    getActivityFeed: async (limit: number = 15): Promise<GetActivityFeedResponse> => {
        const response = await api.get(`/activity?limit=${limit}`);
        return response as unknown as GetActivityFeedResponse;
    },
};
