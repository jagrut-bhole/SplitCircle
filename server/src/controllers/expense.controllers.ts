import {Request,Response} from "express"
import { asyncHandler } from "../utils/asyncHandler.js"

import { ExpenseServices } from "../services/expense.services.js"
const expenseServices = new ExpenseServices();

import { UserService } from "../services/user.services.js";
const userService = new UserService();

export const addFriendExpenseController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const {username , title, amount , description , scenario} = req.body as {
            username : string,
            amount : number,
            description : string,
            date : Date,
            scenario : string,
            title : string
        }

        
        if (!username || !amount || !description || !scenario || !title) {
            return res.status(400).json({
                message: "Missing required fields",
                success : false 
            })
        }

        if(amount < 0) {
            return res.status(400).json({
            message: "Please provide the amount.",
            success : false
            })
        }
        
        if (title.length === 0 || title.length > 20) {
            return res.status(400).json({
            message: "Title cannot be empty and must be under 20 characters!!",
            success : false
            })
        }
        
        if (description.length === 0 || description.length > 50) {
            return res.status(400).json({
            message: "Description cannot be empty and must be under 50 characters!!",
            success : false
            })
        }

        console.log("Received scenario:", scenario);
        
        const friendId = await userService.extractCurrentUserId(username) as string;

        const currentUserId = req.user?.id as string;

        const DATE = new Date();

        const expense = await expenseServices.addFriendExpense(
            currentUserId,
            friendId,
            description,
            amount,
            DATE,
            title,
            scenario
        )

        return res.status(201).json({
            success: true,
            data: expense,
            message: 'Expense added successfully'
        });
        
    } catch (error : any) {
        console.log("Error: ",error.message);

        if (error.member === 'Not friends with the user!!') {
            return res.status(400).json({
            message: "Not friends with the user!!",
            success : false
            })
        }

        if (error.member === 'Invalid Scenario') {
            return res.status(400).json({
            message: "Invalid Scenario",
            success : false
            })
        }
        if (error.member === 'IBalance not found!!') {
            return res.status(400).json({
            message: "Balance not found!!",
            success : false
            })
        }
        return res.status(500).json({
            message: "Error while adding the expense",
            success : false
        })
    }
})

export const friendExpenseListController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const friendId = req.params.friendId as string;

        if (!friendId) {
            return res.status(401).json({
                message : "Friend Id not found!!"
            })
        }

        const currentUserId = req.user?.id as string;

        const result = await expenseServices.friendExpenseList(currentUserId , friendId);

        return res.status(200).json({
            message : 'Friend Expense Feteched SuccessFully!!',
            success : true,
            data : result.data,
            count : result.count
        })
    } catch (error : any) {
        console.log("Error: ",error.message);

        if (error.message === "Not friends with the user!!") {
                return res.status(401).json({
                message: "Not friends with the user!!",
                success:true
            })
        }

        return res.status(500).json({
            message: "Failed to fetch the friends expenses",
            success:true
        })
    }
})

export const singleExpenseDetailController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const expenseId = req.params.expenseId as string;

        const currentUserId = req.user?.id as string;

        const result = await expenseServices.friendSingleExpenseDetail(expenseId,currentUserId);

        return res.status(200).json({
            message: "Expense Detail feched SuccessFully!!",
            success : true,
            data : result
        })
    } catch (error:any) {
        console.log("Error: ",error.message);

        if (error.message === "You Don't have access in the expense!!") {
            return res.status(403).json({
                message: "You Don't have access in the expense!!",
                success:false
            })
        }

        return res.status(500).json({
            message: "Can't fetched the Expense Detail, Server Error",
            success:false
        })
    }
})

export const updateFriendExpenseController = asyncHandler(async(req:Request,res:Response)  => {
    try {

        const { expenseId } = req.params;

        const currentUserId = req.user?.id as string;

        const {title,description ,amount,scenario} =  req.body as {
            title: string,
            description: string,
            amount : number,
            scenario : string
        };

        if (amount !== undefined && amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than 0'
            });
        }

        const validScenarios = [
            'I_PAID_SPLIT_EQUAL',
            'I_OWED_FULL',
            'FRIEND_PAID_SPLIT_EQUAL',
            'FRIEND_OWED_FULL'
        ];

            if (scenario && !validScenarios.includes(scenario)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid scenario'
                });
            }

        const updates = {
            title,
            description,
            amount,
            scenario
        }

        const expense = await expenseServices.updateFriendExpense(
            currentUserId,
            expenseId,
            updates
        );

        return res.status(200).json({
            message: "Expense Updated SuccessFully!!",
            success : true,
            data : expense
        })
    } catch (error:any) {
        console.log("Error: ",error.message);

        if (error.message === "You don\'t have access to this expense") {
            return res.status(403).json({
                message: "You don\'t have access to this expense",
                success:false
            })
        }
        if (error.message === "This is a group expense") {
            return res.status(400).json({
                message: "This is a group expense",
                success:false
            })
        }
        if (error.message === "No changes to update") {
            return res.status(400).json({
                message: "No changes to update",
                success:false
            })
        }
        if (error.message === "Balance Not Found!!") {
            return res.status(400).json({
                message: "Balance Not Found!!",
                success:false
            })
        }

        return res.status(500).json({
            message: "Can't fetched the Expense Detail, Server Error",
            success:false
        })
    }
})

export const deleteFriendExpenseController = asyncHandler(async(req:Request,res:Response)  => {
    try {

        const { expenseId } = req.params;

        const currentUserId = req.user?.id as string;

        if (!currentUserId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const expense = await expenseServices.deleteFriendExpense(
            currentUserId,
            expenseId,
        );

        return res.status(200).json({
            message: "Expense Deleted SuccessFully!!",
            success : true,
            data : expense
        })
    } catch (error:any) {
        console.log("Error: ",error.message);

        if (error.message === "Balance record not found") {
            return res.status(403).json({
                message: error.message,
                success:false
            })
        }
        if (error.message === "Cannot delete group expense with this endpoint") {
            return res.status(400).json({
                message: error.message,
                success:false
            })
        }
        if (error.message === "Expense not found") {
            return res.status(400).json({
                message: error.message,
                success:false
            })
        }
        if (error.message === "You can\'t delete this expense") {
            return res.status(400).json({
                message: error.message,
                success:false
            })
        }
        if (error.message === "Balance Not Found!!") {
            return res.status(400).json({
                message: error.message,
                success:false
            })
        }

        return res.status(500).json({
            message: "Can't fetched the Expense Detail, Server Error",
            success:false
        })
    }
})
