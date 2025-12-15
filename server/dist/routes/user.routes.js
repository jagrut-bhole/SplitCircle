import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { addFriendController, getAllFriendsController, userSearchControler } from "../controllers/user.controllers.js";
const userRouter = Router();
userRouter.get('/search', jwtVerify, userSearchControler);
userRouter.post('/add-friend', jwtVerify, addFriendController);
userRouter.get('/friends', jwtVerify, getAllFriendsController);
export { userRouter };
//# sourceMappingURL=user.routes.js.map