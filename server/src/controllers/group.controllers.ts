import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { GroupService } from "../services/group.services.js";
const groupService = new GroupService();

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
            statusCode : 201
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
            return res.status(401).json({
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

        return res.status(200).json({
            message: "Ding Ding !!",
            success : true,
            data : result
        })

    } catch (error : any) {
        console.log("Error: ", error.message);

        if(error.message === "Group Not Found") {
            return res.status(400).json({
                message: "Group Not Found!!",
                success : false
            })
        }

        if(error.message === "User is already a member of this group.") {
            return res.status(401).json({
                message:"User is already a member of this group!!",
                success : false
            })
        }

        return res.status(500).json({
            messsage : "Unable to fetch group details",
            success : false
        })
    }
})

//YODO
export const removeMemberController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const userId = req.user?.id as string;

        const groupId = req.params.groupId  as string;

        const result = await groupService.removeMember(userId,groupId);
    } catch (error : any) {
        console.log("Error: ",error.message);
    }
})