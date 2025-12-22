import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { getUserActivitiesController } from "../controllers/activity.controllers.js";

const activityRouter: Router = Router();

activityRouter.get("/activities", jwtVerify, getUserActivitiesController);

export { activityRouter };
