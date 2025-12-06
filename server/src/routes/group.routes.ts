import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { addMemberController, createGroupController, getGroupDetailController, getGroupUsersController } from "../controllers/group.controllers.js";

const groupRouter:Router = Router();

groupRouter.post('/create-group',jwtVerify,createGroupController);
groupRouter.get('/groups',jwtVerify,getGroupUsersController);
groupRouter.get('/groups/:groupId',jwtVerify,getGroupDetailController)
groupRouter.post('/groups/:groupId/members',jwtVerify,addMemberController);

export {groupRouter}