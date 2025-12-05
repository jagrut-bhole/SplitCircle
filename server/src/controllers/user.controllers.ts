import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";

import { UserService } from "../services/user.services.js";
const userService = new UserService();

import { prisma } from "../index.js";

export const userSearchControler = asyncHandler(async(req:Request,res:Response) => {
    try {
        const friendUsername = req.query.username as string;
        
        const currentUserId = req.user?.id as string;

        if (!friendUsername || friendUsername.trim().length === 0) {
            return res.status(400).json({
                message:"Please enter the username!!",
                success: false
            })
        }

        const result = await userService.searchUserByUsername(friendUsername,currentUserId);

        if (!result) {
            return res.status(404).json({
                message: "User not found!!"
            })
        }

        return res.status(200).json({
            success:true,
            data: result
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Server error while searching user"
        })
    }
})

export const addFriendController = asyncHandler(async(req:Request,res:Response) => {
    try {
        // const {friendUserId} = req.body;

        const {username} = req.body;

        if (!username || username.length === 0) {
            return res.status(400).json({
                message: "Username not provided!!"
            });
        }

        const friendUserId = await userService.extractCurrentUser(username);

        if(!friendUserId || friendUserId.length === 0) {
            return res.status(400).json({
                message:"Please provide the valid friend"
            })
        }

        const userId = req.user?.id;

        if (!userId) {
            return res.status(404).json({
                message: "Tokens not get!!"
            });
        }

        const addFriend = await userService.addFriend(userId,friendUserId);

        return res.json({
            message:"Friend added Successfully!!",
            success:true,
            data:addFriend
        }).status(201)        

    } catch (error:any) {
        console.log("Error Message: ",error.message);
        if (error.message === "Both are already friends" || error.message === "You cannot add yourself as Friend") {
            return res.status(400).json({
                message: error.message,
                success: false
            });
        }

        if (error.message === "One or both users do not exists") {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(500).json({
            message:"Can't add friends !! Please try again later!!",
            success: false
        });
    }
})

export const getAllFriendsController  = asyncHandler(async(req:Request,res:Response) => {
    try {
        const id = req.user?.id as string;

        const result = await userService.getAllFriends(id)

        return res.status(200).json({
            message : "Feched the friends successfully!!",
            success : true,
            data : result
        })
    } catch (error:any) {
        console.log("Error: ",error.message);

        return res.status(500).json({
            message:"Can't find the friends, Please try again later!!"
        })
    }
});
