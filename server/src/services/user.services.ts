import {prisma} from "../index.js"
import { normalizeFriendshipIds } from "../utils/friendships.utils.js";

export class UserService {

    async extractCurrentUserId(username:string) {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            throw new Error(`User with username "${username}" not found`);
        }

        return user?.id;
    }

    async getUserIdUsernames(usernames:string[]):Promise<Map<string,string>> {
        const users = await prisma.user.findMany({
            where : {
                username : {
                    in : usernames
                }
            },
            select : {
                id : true,
                username : true
            }
        });

        const usernameToIdMap = new Map<string , string>();
        users.forEach(user => {
            usernameToIdMap.set(user.username, user.id);
        });

        const notFound = usernames.filter(username => !usernameToIdMap.has(username));
        if (notFound.length > 0) {
            throw new Error(`Users not found: ${notFound.join(', ')}`);
        }

        return usernameToIdMap;
        
    }

    async searchUserByUsername(
        friendUsername:string,
        currentUserId:string
    ) {
        const user = await prisma.user.findUnique({
            where:{
                username: friendUsername.trim()
            },
            select: {
                id: true,
                name: true,
                email: true,
                username:true
            }
        })

        if (!user) {
            return null;
        }

        if(user.id === currentUserId) {
            return null;
        }

        return {
            user
        }
    }

    async checkFriendshipExists(userId1:string,userId2:string) {
        const {user1Id,user2Id} = normalizeFriendshipIds(userId1,userId2)

        const friendship = await prisma.friendship.findUnique({
            where: {
                user1Id_user2Id: {
                    user1Id,
                    user2Id
                }
            }
        })

        if (friendship) {
            return {
                exists:true,
                friendship
            }
        }

        return {
            exists:false,
            friendship:null
        }
    }

    async addFriend(currentUserId:string,friendUserId:string) {
        if (currentUserId === friendUserId) {
            throw new Error("You cannot add yourself as Friend");
        }
        
        const checkResult = await this.checkFriendshipExists(currentUserId,friendUserId);

        if (checkResult.exists) {
            throw new Error("Both are already friends");
        }

        const users = await prisma.user.findMany({
            where: {
                id: {
                    in:
                    [
                        currentUserId,
                        friendUserId
                    ]
                }
            }
        });

        if (users.length !== 2) {
            throw new Error("One or both users do not exists");
        }

        const {user1Id,user2Id} = normalizeFriendshipIds(currentUserId,friendUserId);

        const [friendship,balance] = await prisma.$transaction([
            prisma.friendship.create({
                data: {
                    user1Id,
                    user2Id
                },
            }),
            prisma.balance.create({
                data: {
                    user1Id,
                    user2Id,
                    amount:0
                }
            })
        ]);

        return {
            message: "Friend added successfully",
            friendship,
            balance
        }
    }

    async getAllFriends( currentUserId : string ) {
        const friendship = await  prisma.friendship.findMany({
            where: {
                OR:[
                    {user1Id: currentUserId},
                    {user2Id: currentUserId}
                ]
            },
            include: {
                user1:{
                    select: {
                        id:true,
                        username:true,
                        name:true,
                        email:true
                    }
                },
                user2: {
                    select: {
                        id:true,
                        username:true,
                        name:true,
                        email:true
                    }
                }
            }
        });

        if (friendship.length === 0) {
            return {
                friends: [],
                summary: {
                    totalFriends: 0,
                    youOwe:0,
                    youAreOwed:0
                }
            }
        }

        const balance = await prisma.balance.findMany({
            where:{
                OR:[
                    {user1Id : currentUserId},
                    {user2Id : currentUserId}
                ]
            }
        });

        const balanceMap = new Map<string,any>();
        balance.forEach(b => {
            const key = `${b.user1Id}_${b.user2Id}`;
            balanceMap.set(key,b)
        })

        let friendList:any[] = [];
        let youOwe = 0;
        let youAreOwed = 0;

        for(const f of friendship) {
            const friend = f.user1Id === currentUserId ? f.user2 : f.user1;

            const friendId = friend.id;

            const {user1Id,user2Id} = normalizeFriendshipIds(currentUserId,friendId);
            const balanceKey = `${user1Id}_${user2Id}`

            const balance = balanceMap.get(balanceKey);
            let finalBalance = 0;

            if (balance) {
                finalBalance = balance.user1Id === currentUserId ? balance.amount : -balance.amount

                if (finalBalance > 0) youAreOwed += finalBalance;
                if(finalBalance < 0) youOwe += Math.abs(finalBalance);
            }
            friendList.push({
                id:friend.id,
                name:friend.name,
                username: friend.username,
                email: friend.email,
                balance:finalBalance,
                friendshipCreatedAt: f.createdAt
            })
        }

        const summary = {
            totalFriends: friendList.length,
            youOwe,
            youAreOwed
        };

        return {
            friends: friendList,
            summary
        }
    }

    async extractNameFromId(userId:string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user?.name;
    }

    async getUserDetails(userId : string) {
        const user = await prisma.user.findUnique({
            where : {
                id : userId
            }
        });

        if (!user) {
            throw new Error("User not found!!");
        }

        return {user};
    }

    async calulateUserOwedAmounts(userId : string) {
        // Get all expenses where user is involved (both friend and group expenses)
        const expenses = await prisma.expense.findMany({
            where: {
                splits: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                splits: {
                    include: {
                        user: true
                    }
                },
                paidBy: true
            }
        });

        let totalOwedToUser = 0;
        let totalUserOwes = 0;

        for (const expense of expenses) {
            // Find current user's split
            const userSplit = expense.splits.find(s => s.userId === userId);
            if (!userSplit) continue;

            const userOwed = userSplit.amount;
            const userPaid = expense.paidById === userId ? expense.amount : 0;

            // Net position: positive means user is owed, negative means user owes
            const netPosition = userPaid - userOwed;

            if (netPosition > 0) {
                totalOwedToUser += netPosition;
            } else if (netPosition < 0) {
                totalUserOwes += Math.abs(netPosition);
            }
        }

        return {
            totalOwedToUser,
            totalUserOwes
        };
    }

    async getAllUserGroups(userId: string) {
        const groups = await prisma.groupMember.findMany({
            where : {
                userId : userId
            }, 
            include : {
                group : {
                    include: {
                        members: true,
                        expenses: {
                            include: {
                                splits: true
                            }
                        }
                    }
                }
            }

        });

        // Calculate balance for each group
        const groupsWithBalance = groups.map(groupMember => {
            let balance = 0;
            
            // Calculate user's balance in this group
            for (const expense of groupMember.group.expenses) {
                const userSplit = expense.splits.find(s => s.userId === userId);
                if (!userSplit) continue;

                const userOwed = userSplit.amount;
                const userPaid = expense.paidById === userId ? expense.amount : 0;

                balance += (userPaid - userOwed);
            }

            return {
                ...groupMember,
                balance
            };
        });

        return groupsWithBalance;
        
    }

    async friendDetails(friendId: string, currentUserId : string) {
        // Get friend information
        const friend = await prisma.user.findUnique({
            where: {
                id : friendId
            },
            select : {
                id: true,
                name: true,
                username: true,
                email: true
            }
        })

        if (!friend) {
            throw new Error("Friend not found!!");
        }

        // Get all expenses between current user and friend
        const expenses = await prisma.expense.findMany({
            where: {
                groupId : null,
                splits : {
                    some : {
                        userId : currentUserId
                    }
                },
                AND : {
                    splits : {
                        some : {
                            userId : friendId
                        }
                    }
                }
            },
            orderBy : {
                date : 'desc'
            },
            include : {
                paidBy : {
                    select : {
                        id : true,
                        username : true,
                        name : true, 
                    }
                },
                splits : {
                    include : {
                        user : {
                            select : {
                                id : true,
                                username : true,
                                name : true
                            }
                        }
                    }
                }
            },
        });

        // Get balance between current user and friend
        const {user1Id, user2Id} = normalizeFriendshipIds(currentUserId, friendId);
        
        const balance = await prisma.balance.findUnique({
            where: {
                user1Id_user2Id: {
                    user1Id,
                    user2Id
                }
            }
        });

        // Calculate final balance from perspective of current user
        // The balance.amount represents how much user1 is owed by user2 (positive means user1 lent to user2)
        let finalBalance = 0;
        if (balance) {
            // If current user is user1, balance is from their perspective
            // If current user is user2, invert the balance
            finalBalance = balance.user1Id === currentUserId ? balance.amount : -balance.amount;
        }

        // console.log('Get friend details balance:', {
        //     currentUserId,
        //     friendId,
        //     user1Id,
        //     user2Id,
        //     storedBalance: balance?.amount,
        //     isCurrentUserUser1: balance?.user1Id === currentUserId,
        //     finalBalance
        // });

        return {
            friend,
            expenses,
            balance: finalBalance,
            expenseCount: expenses.length
        };
    }
}