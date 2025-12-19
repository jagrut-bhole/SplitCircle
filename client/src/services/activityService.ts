import { api } from "./api";
import type { GetActivityFeedResponse } from "@/types/ActivityTypes";

export const activityService = {
    getActivityFeed: async (limit: number = 20): Promise<GetActivityFeedResponse> => {
        const response = await api.get(`/activities?limit=${limit}`);
        return response as unknown as GetActivityFeedResponse;
    },
};
