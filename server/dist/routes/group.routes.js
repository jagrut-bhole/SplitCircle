import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { addGroupExpenseController, addMemberController, createGroupController, deleteGroupExpenseController, getGroupDetailController, getGroupUsersController, updateGroupExpenseController, deleteGroupController, } from "../controllers/group.controllers.js";
const groupRouter = Router();
groupRouter.post('/create-group', jwtVerify, createGroupController);
groupRouter.get('/groups', jwtVerify, getGroupUsersController);
groupRouter.get('/groups/:groupId', jwtVerify, getGroupDetailController);
groupRouter.post('/groups/:groupId/members', jwtVerify, addMemberController);
//expense
groupRouter.post('/groups/:groupId/add-expense', jwtVerify, addGroupExpenseController);
groupRouter.patch('/groups/:groupId/:expenseId', jwtVerify, updateGroupExpenseController);
groupRouter.delete('/groups/:groupId/:expenseId', jwtVerify, deleteGroupExpenseController);
groupRouter.delete('/groups/:groupId', jwtVerify, deleteGroupController);
export { groupRouter };
//# sourceMappingURL=group.routes.js.map