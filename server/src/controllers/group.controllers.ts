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

export const getGroupUsers = asyncHandler(async(req:Request,res:Response) => {
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

/*
Step 2: List User's Groups
Service Method
Method: getUserGroups
Parameters:

userId: string

What it should do:

Find all GroupMember records where userId matches
Include the related Group and its members
For each group, calculate:

Total members count
User's role (ADMIN/MEMBER)
Total expenses count (optional)
Outstanding balance (optional, can add later)


Sort by most recently updated
Return formatted list

Prisma hint:
typescriptconst groups = await prisma.groupMember.findMany({
  where: { userId },
  include: {
    group: {
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true
              }
            }
          }
        },
        _count: {
          select: {
            expenses: true
          }
        }
      }
    }
  },
  orderBy: {
    group: {
      updatedAt: 'desc'
    }
  }
});
*/