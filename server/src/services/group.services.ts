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

    async getGroupUsers(userId : string) {
        const allgroups = await prisma.group.findMany({
            where:  {
                id : userId
            },
            select : {
                name : true,
                description:true
            }
        });

        if (allgroups.length === 0) {
            throw new Error("Groups Not Made")
        }
        return {
            group : allgroups,
            success : true
        }
    }

}