import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { createGroupController, getGroupUsers } from "../controllers/group.controllers.js";

const groupRouter:Router = Router();

groupRouter.post('/create-group',jwtVerify,createGroupController);
groupRouter.get('/groups',jwtVerify,getGroupUsers);

export {groupRouter}