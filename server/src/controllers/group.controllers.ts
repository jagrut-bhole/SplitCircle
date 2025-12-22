import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { GroupService } from "../services/group.services.js";
const groupService = new GroupService();

import { UserService } from "../services/user.services.js";
const userService = new UserService();

import { EmailServices } from "../services/email.services.js";

import {prisma} from '../index.js'

export const createGroupController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const {name,description,memberUsernames} = req.body as {
            name:string,
            description?: string,
            memberUsernames: string[]
        }

        const currentUserId = req.user?.id as string;

        const groupData = {
            name,
            description,
            memberUsernames
        }

        const result = await groupService.createGroup( currentUserId , groupData )

        return res.status(201).json({
            message : "Group Created Successfully!!",
            success : true,
            data : result,
            status : 201
        })
    } catch ( error : any ) {
        console.log("Error: ",error.message);
    }
})

export const getGroupUsersController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const currentUserId = req.user?.id as string;

        if (!currentUserId) {
            return res.status(401).json({
                message : "Id not found, please login again",
                success : false
            });
        }

        const result = await groupService.getGroupUsers(currentUserId)

        return res.status(200).json({
            message : "Groups fetched SuccessFully!!",
            success : true,
            data : result
        })
    } catch (error:any) {
        console.log("Error: ",error.member);

        if (error.message === "Groups Not Made") {
            return res.status(404).json({
                message:"Groups Not found",
                group:[],
                success:false
            })
        }

        return res.status(500).json({
            message:"Error while fetching the groups",
            success:false,
            groups: []
        })
    }
})

export const getGroupDetailController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const userId = req.user?.id as string;

        if (!userId) {
            return res.status(401).json({
                message: "Unable to get User ID"
            })
        }

        const groupId = req.params.groupId as string;

        if (!groupId) {
            return res.status(401).json({
                message : "Group Id not Found!!",
                success : true
            })
        }

        const result = await groupService.getGroupDetails(userId,groupId);

        return res.status(201).json({
            message : "Group Details Fetched SuccessFully!!",
            success : true,
            data : result
        })

    } catch (error:any) {
        console.log("Error: ",error.message);

        if(error.message === "You are not a member of this group!!") {
            return res.status(401).json({
                message: "You are not a member of this group!!",
                success: false
            })
        }

        if (error.message === "Group Not Found") {
            return res.status(401).json()
        }
        
        return res.status(500).json({
            message: "Unable to fetch Group Details",
            success:false
        })
    }
})

export const addMemberController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const { username } = req.body as {
            username : string
        };

        if (!username) {
            return res.status(400).json({
                message: "Please enter the username!!",
                success: false
            })
        }

        const groupId = req.params.groupId as string

        if (!groupId) {
            return res.status(401).json({
                message: "Invalid Group ID",
                success : false
            })
        }

        const userId = req.user?.id as string;

        const result = await groupService.addMembers(username , groupId, userId);

        const group = await prisma.group.findUnique({
            where : {
                id : groupId
            }
        })

        const currentUser = await userService.getUserDetails(userId);

        const currentFriend = await userService.getUserDetails(result.data.userToBeAdded);

        const emailService = new EmailServices();
        await emailService.sendGroupInviteEmail(
            currentFriend.user.name,
            currentFriend.user.email,
            group?.name as string,
            currentUser.user.name,
            currentUser.user.username
        );

        return res.status(200).json({
            message: "Ding Ding !!",
            success : true,
            data : result
        })

    } catch (error : any) {
        console.log("Error: ", error.message);

        if(error.message === "Group Not Found") {
            return res.status(400).json({
                message: error.message,
                success : false
            })
        }

        if(error.message === "User is already a member of this group.") {
            return res.status(400).json({
                message: error.message,
                success : false
            })
        }

        return res.status(500).json({
            message : "Unable to fetch group details",
            success : false
        })
    }
})

export const addGroupExpenseController = asyncHandler(async(req:Request, res:Response) => {
    try {
        const {groupId} = req.params;
        
        const { 
            title, 
            note, 
            amount, 
            paidByUsername, 
            splitType, 
            splits, 
            participantUsernames 
        } = req.body;

        const currentUserId = req.user?.id as string;

        if (!title || !amount || !note || !paidByUsername || !splitType) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false,
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than 0'
            });
        }

        const validSplitTypes = ['EQUAL', 'UNEQUAL', 'PERCENTAGE'];

        if (!validSplitTypes.includes(splitType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid split type. Must be EQUAL, UNEQUAL, or PERCENTAGE'
            });
        }

        if (splitType === 'EQUAL') {
            if (!participantUsernames || !Array.isArray(participantUsernames) || participantUsernames.length === 0) {
                return res.status(400).json({
                    message : 'Participants array required for EQUAL split',
                    success : false
                })
            }
        }

        if ((splitType === 'UNEQUAL' || splitType === 'PERCENTAGE') && !splits) {
            return res.status(400).json({
                success: false,
                message: `Splits array required for ${splitType} split type`
            });
        }

        if (splitType === 'UNEQUAL') {
            const totalSplitAmount = splits.reduce((sum: number, s: any) => sum + (s.amount || 0), 0);

            if (Math.abs(totalSplitAmount - amount) > 0.01) {
                return res.status(400).json({
                    success: false,
                    message: `Split amounts (${totalSplitAmount}) don't add up to total (${amount})`
                });
            }
        }

        if (splitType === 'PERCENTAGE') {
            const totalPercentage = splits.reduce((sum: number, s: any) => sum + (s.percentage || 0), 0);
            
            if (Math.abs(totalPercentage - 100) > 0.01) {
                return res.status(400).json({
                    success: false,
                    message: `Percentages must add up to 100 (got ${totalPercentage})`
                });
            }
        }

        let allParticipantUsernames : string[];

        if (splitType === 'EQUAL') {
            allParticipantUsernames = participantUsernames;
        } else {
            // Extract from splits
            allParticipantUsernames = splits.map((s: any) => s.username);
        }

        if (!allParticipantUsernames.includes(paidByUsername)) {
            return res.status(400).json({
                success: false,
                message: 'Payer must be one of the participants'
            });
        }
        
        const expense = await groupService.addGroupExpense(
            groupId,
            currentUserId,
            title,
            note,
            amount,
            paidByUsername,
            splitType,
            splits,
            allParticipantUsernames
        )

        return res.status(201).json({
            success: true,
            data: expense,
            message: 'Group expense added successfully'
        });

    } catch (error:any) {
        console.log("Error: ",error.message);

        return res.status(500).json({
            messsage : error.message || "Internal Server Error",
            success : false
        });
    }
})

export const updateGroupExpenseController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const {groupId}  = req.params;

        const {expenseId} = req.params;

        const currentUserId = req.user?.id as string;

        const {
            title,
            amount,
            paidByUsername,
            participantUsernames
        } = req.body;

        if (amount !== undefined && amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than 0'
            });
        }

        if (!title && !amount && !paidByUsername && !participantUsernames) {
            return res.status(400).json({
                success: false,
                message: 'At least one field must be provided to update'
            });
        }

        const expense = await groupService.updateGroupExpense(
            expenseId,
            groupId,
            currentUserId,
            title,
            amount,
            paidByUsername,
            participantUsernames
        );

        return res.status(200).json({
            success: true,
            data: expense,
            message: 'Expense updated successfully'
        });

    } catch (error : any) {
        console.log("Error: ",error.message);

        return res.status(500).json({
            message : "Server Error while updating the group expense",
            success: false 
        })
    }
})

export const deleteGroupExpenseController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const currentUserId = req.user?.id as string;
        const {groupId} = req.params;
        const {expenseId} = req.params;

        const result = await groupService.deleteGroupExpense(
            expenseId,
            groupId,
            currentUserId
        )

        return res.status(200).json(({
            message: "Expense deleted Successfully!!",
            success: true,
            data : result
        }))
    } catch (error:any) {
        console.log("Error: ",error.message);

        return res.status(500).json({
            message : "Internal Error while deleteing the expense",
            success : false
        });
    }
})

export const deleteGroupController = asyncHandler(async(req:Request,res:Response) => {
    try {

        const currentUserId = req.user?.id as string;

        const {groupId} = req.params;

        const result = await groupService.deleteGroup(
            currentUserId,
            groupId
        );

        return res.status(200).json({
            message : "Group Deleted SuccessFully!!",
            success : true,
            data : result
        })

        if (!groupId) {
            return res.status(404).json({
                message : "GroupId not found!!",
                success : false
            })
        }
        
    } catch (error : any) {
        console.log("Error: ",error.message);

        return res.status(500).json({
            message : "Internal Server Error while Deleting the Group!!",
            success: false
        })
    }
})