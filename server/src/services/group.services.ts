import {prisma} from '../index.js'
import { UserService } from './user.services.js';
const userService = new UserService();

export class GroupService {

    async createGroup(
        userId:string,
        groupData: {
            name:string,
            description?:string,
            memberUsernames:string[],
        }
    ) {
        const extractName = await userService.extractNameFromId(userId);

        
        const {name,description,memberUsernames} = groupData;
        
        console.log("Incoming usernames:", memberUsernames);

        if (!name || name.trim().length < 3 || name.trim().length > 50) {
            throw new Error("Group name must be between 3 and 50 characters.");
        }
        const cleanUsernames = memberUsernames.map(u => u.trim());

        console.log("Clean usernames:", cleanUsernames);

        if (!cleanUsernames || cleanUsernames.length === 0) {
            throw new Error("Group must have at least one member.");
        }

        //verifying users exists in database
        const users = await prisma.user.findMany({
            where: {
                username: {
                    in: cleanUsernames
                }
            },
            select: {
                id : true,
                name : true,
                username:true   
            }
        });

        console.log("DB users found:", users.map(u => u.username));

        if (users.length !== cleanUsernames.length) {
            throw new Error("One or more usernames are invalid!!")
        }

        let memberIds = users.map(u => u.id);

        if (!memberIds.includes(userId)) {
            memberIds.push(userId);
        }

        console.log("Final memberIds:", memberIds);

        const result = await prisma.$transaction(async(tx) => {

            const group = await tx.group.create({
                data: {
                    name,
                    description: description ?? "",
                    createdById: userId
                }
            })

            const groupMembersData = memberIds.map(uid => ({
                userId:uid,
                groupId: group.id
            }))

            await tx.groupMember.createMany({
                data: groupMembersData
            });


            await tx.activity.create({
                data: {
                    userId:userId,
                    groupId: group.id,
                    note: `${extractName} created group ${name}`,
                }
            })


            const createdGroup =  await tx.group.findUnique({
                where: {
                    id:group.id
                },
                include: {
                    members: {
                        include: {
                            user: {
                                select: {
                                    id : true,
                                    name : true,
                                    email : true,
                                    username : true
                                }
                            }
                        }
                    }
                }
            })
            return createdGroup;
        }
    )
    return {
        message:"Group created successfully!!",
        group:result
    }
    }

    async getGroupUsers(userId:string) {
        const groups = await prisma.groupMember.findMany({
            where: {
                userId
            },
            include: {
                group: {
                    include : {
                        members : {
                            include : {
                                user: {
                                    select : {
                                        id : true,
                                        name : true,
                                        username : true
                                    }
                                }
                            } 
                        },
                        _count: {
                            select: {
                                expenses:true
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
        })

        return {
            group: groups,
            success: true
        }
    }

    async getGroupDetails(userId : string, groupId : string) {

        const isMember = await prisma.groupMember.findUnique({
            where : {
                groupId_userId: {
                    groupId,
                    userId
                }
            } 
        })
        if (!isMember) {
            throw new Error("You are not a member of this group!!")
        }

        const group = await prisma.group.findMany({
            where : {
                id : groupId
            },
            include : {
                members : {
                    include : {
                        user : {
                            select : {
                                id : true,
                                name : true,
                                username : true 
                            }
                        }
                    }
                }
            }
        })

        if (!group) {
            throw new Error("Group Not Found");
        }

        const recentExpenses = await prisma.expense.findMany({
            where : {
                groupId : groupId
            },
            orderBy : {
                createdAt : 'desc' 
            },
            include : {
                paidBy: {
                    select: {
                        id :  true,
                        name : true,
                        username : true,
                    }
                }
            }
        })

        return {
            group,
            recentExpenses
        }
    }

    async addMembers(username : string, groupId : string, addedByUserId : string) {

        const userToBeAdded = await userService.extractCurrentUserId(username) as string;

        const group = await prisma.group.findUnique({
            where : {
                id : groupId 
            } 
        })

        if (!group) {
            throw new Error("Group Not Found");
        }

        const existingMember = await prisma.groupMember.findUnique({
            where: {
                groupId_userId : {
                    groupId,
                    userId : userToBeAdded
                }
            }
        })

        if (existingMember) {
            throw new Error("User is already a member of this group.")
        }

        const result = await prisma.$transaction(async tx => {
            await tx.groupMember.create({
                data: {
                    groupId,
                    userId : userToBeAdded
                }
            })

            const addedName = await userService.extractNameFromId(userToBeAdded) as string;
            const addedBy = await userService.extractNameFromId(addedByUserId) as string;

            await tx.activity.create({
                data: {
                    userId:addedByUserId,
                    groupId,
                    note: `${addedBy} added ${addedName} to the group`
                }
            })

            return await tx.group.findUnique({
                where : {
                    id : groupId
                },
                include: {
                    members : {
                        include : {
                            user : {
                                select : {
                                    id : true,
                                    name : true,
                                    email : true,
                                    username : true
                                } 
                            }
                        }
                    }
                }
            })

        })
        return {
            message: "Member added successfully!!",
            data: result
        }
    }

    //TODO
    async removeMember(userId : string, groupId : string) {
        const removed = await prisma.groupMember.delete({
            where : {
                id : groupId
            }
        })
    }

}