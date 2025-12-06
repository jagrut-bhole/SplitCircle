import { jwtVerify } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import { 
    addFriendExpenseController, 
    friendExpenseListController, 
    singleExpenseDetailController, 
    updateFriendExpenseController 
} from "../controllers/expense.controllers.js";

const expenseRouter:Router = Router();

expenseRouter.get('/friend/:friendId',jwtVerify,friendExpenseListController);
expenseRouter.post('/friend/:friendId/add-expense',jwtVerify,addFriendExpenseController);
expenseRouter.get('/friend/:friendId/:expenseId',jwtVerify,singleExpenseDetailController);
expenseRouter.patch('/friend/:friendId/:expenseId',jwtVerify,updateFriendExpenseController)

export { expenseRouter }