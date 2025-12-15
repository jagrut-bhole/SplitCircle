import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import { addFriendExpenseController, deleteFriendExpenseController, friendExpenseListController, singleExpenseDetailController, updateFriendExpenseController } from "../controllers/expense.controllers.js";
const expenseRouter = Router();
expenseRouter.get('/friend/:friendId', jwtVerify, friendExpenseListController);
expenseRouter.post('/friend/:friendId/add-expense', jwtVerify, addFriendExpenseController);
expenseRouter.get('/friend/:friendId/:expenseId', jwtVerify, singleExpenseDetailController);
expenseRouter.patch('/friend/:friendId/:expenseId', jwtVerify, updateFriendExpenseController);
expenseRouter.delete('/friend/:friendId/:expenseId', jwtVerify, deleteFriendExpenseController);
export { expenseRouter };
//# sourceMappingURL=expense.routes.js.map