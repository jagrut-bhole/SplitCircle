import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { addFriendController, getAllFriendsController, getUserTotalOwedController, userSearchControler } from "../controllers/user.controllers.js";
const userRouter = Router();
userRouter.get('/search', jwtVerify, userSearchControler);
userRouter.post('/add-friend', jwtVerify, addFriendController);
userRouter.get('/friends', jwtVerify, getAllFriendsController);
userRouter.get('/total-balance', jwtVerify, getUserTotalOwedController);
export { userRouter };
//# sourceMappingURL=user.routes.js.map