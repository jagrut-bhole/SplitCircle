import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { 
    addFriendController, 
    getAllFriendsController, 
    getUserTotalOwedController,
    getUserTotalGroupsController, 
    userSearchControler 
} from "../controllers/user.controllers.js";

const userRouter:Router = Router();

userRouter.get('/search',jwtVerify,userSearchControler)
userRouter.post('/add-friend',jwtVerify,addFriendController);
userRouter.get('/total-balance',jwtVerify,getUserTotalOwedController)
userRouter.get('/friends',jwtVerify,getAllFriendsController);
userRouter.get('/groups',jwtVerify,getUserTotalGroupsController);

export {userRouter}