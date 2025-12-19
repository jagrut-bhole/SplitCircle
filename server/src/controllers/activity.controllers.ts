import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ActivityService } from "../services/activity.services.js";

const activityService = new ActivityService();

export const getUserActivitiesController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const currentUserId = req.user?.id as string;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

        if (!currentUserId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const activities = await activityService.getUserActivities(currentUserId, limit);

        return res.status(200).json({
            success: true,
            data: activities
        });

    } catch (error: any) {
        console.log("Error fetching activities:", error.message);

        return res.status(500).json({
            message: "Internal Server Error while fetching activities",
            success: false
        });
    }
});
