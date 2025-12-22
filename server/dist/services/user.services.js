import { prisma } from "../index.js";
import { normalizeFriendshipIds } from "../utils/friendships.utils.js";
export class UserService {
    async extractCurrentUserId(username) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            throw new Error(`User with username "${username}" not found`);
        }
        return user?.id;
    }
    async getUserIdUsernames(usernames) {
        const users = await prisma.user.findMany({
            where: {
                username: {
                    in: usernames,
                },
            },
            select: {
                id: true,
                username: true,
            },
        });
        const usernameToIdMap = new Map();
        users.forEach((user) => {
            usernameToIdMap.set(user.username, user.id);
        });
        const notFound = usernames.filter((username) => !usernameToIdMap.has(username));
        if (notFound.length > 0) {
            throw new Error(`Users not found: ${notFound.join(", ")}`);
        }
        return usernameToIdMap;
    }
    async searchUserByUsername(friendUsername, currentUserId) {
        const user = await prisma.user.findUnique({
            where: {
                username: friendUsername.trim(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
            },
        });
        if (!user) {
            return null;
        }
        if (user.id === currentUserId) {
            return null;
        }
        return {
            user,
        };
    }
    async checkFriendshipExists(userId1, userId2) {
        const { user1Id, user2Id } = normalizeFriendshipIds(userId1, userId2);
        const friendship = await prisma.friendship.findUnique({
            where: {
                user1Id_user2Id: {
                    user1Id,
                    user2Id,
                },
            },
        });
        if (friendship) {
            return {
                exists: true,
                friendship,
            };
        }
        return {
            exists: false,
            friendship: null,
        };
    }
    async addFriend(currentUserId, friendUserId) {
        if (currentUserId === friendUserId) {
            throw new Error("You cannot add yourself as Friend");
        }
        const checkResult = await this.checkFriendshipExists(currentUserId, friendUserId);
        if (checkResult.exists) {
            throw new Error("Both are already friends");
        }
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: [currentUserId, friendUserId],
                },
            },
        });
        if (users.length !== 2) {
            throw new Error("One or both users do not exists");
        }
        const { user1Id, user2Id } = normalizeFriendshipIds(currentUserId, friendUserId);
        const [friendship, balance] = await prisma.$transaction([
            prisma.friendship.create({
                data: {
                    user1Id,
                    user2Id,
                },
            }),
            prisma.balance.create({
                data: {
                    user1Id,
                    user2Id,
                    amount: 0,
                },
            }),
        ]);
        return {
            message: "Friend added successfully",
            friendship,
            balance,
        };
    }
    async getAllFriends(currentUserId) {
        const friendship = await prisma.friendship.findMany({
            where: {
                OR: [{ user1Id: currentUserId }, { user2Id: currentUserId }],
            },
            include: {
                user1: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                    },
                },
                user2: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (friendship.length === 0) {
            return {
                friends: [],
                summary: {
                    totalFriends: 0,
                    youOwe: 0,
                    youAreOwed: 0,
                },
            };
        }
        // Calculate balances from actual friend-to-friend expenses (groupId = null)
        // This ensures group expenses don't affect friend balances
        let friendList = [];
        let youOwe = 0;
        let youAreOwed = 0;
        for (const f of friendship) {
            const friend = f.user1Id === currentUserId ? f.user2 : f.user1;
            const friendId = friend.id;
            // Get all friend-to-friend expenses between current user and this friend
            // Include settlements - they are payments that reduce debt
            const expenses = await prisma.expense.findMany({
                where: {
                    groupId: null, // Only friend-to-friend expenses
                    splits: {
                        some: {
                            userId: currentUserId,
                        },
                    },
                    AND: {
                        splits: {
                            some: {
                                userId: friendId,
                            },
                        },
                    },
                },
                include: {
                    splits: true,
                },
            });
            // Calculate balance for this friend
            let finalBalance = 0;
            for (const expense of expenses) {
                const currentUserSplit = expense.splits.find((s) => s.userId === currentUserId);
                const friendSplit = expense.splits.find((s) => s.userId === friendId);
                if (currentUserSplit && friendSplit) {
                    const currentUserPaid = expense.paidById === currentUserId ? expense.amount : 0;
                    const currentUserOwed = currentUserSplit.amount;
                    // Net position for this expense from current user's perspective
                    const netPosition = currentUserPaid - currentUserOwed;
                    finalBalance += netPosition;
                }
            }
            if (finalBalance > 0)
                youAreOwed += finalBalance;
            if (finalBalance < 0)
                youOwe += Math.abs(finalBalance);
            friendList.push({
                id: friend.id,
                name: friend.name,
                username: friend.username,
                email: friend.email,
                balance: finalBalance,
                friendshipCreatedAt: f.createdAt,
            });
        }
        const summary = {
            totalFriends: friendList.length,
            youOwe,
            youAreOwed,
        };
        return {
            friends: friendList,
            summary,
        };
    }
    async extractNameFromId(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user?.name;
    }
    async getUserDetails(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new Error("User not found!!");
        }
        return { user };
    }
    async calulateUserOwedAmounts(userId) {
        // Get ALL expenses where user is involved (both friend-to-friend AND group expenses)
        // Include settlements - they are payments that reduce debt
        const expenses = await prisma.expense.findMany({
            where: {
                splits: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                splits: {
                    include: {
                        user: true,
                    },
                },
                paidBy: true,
            },
        });
        let totalOwedToUser = 0;
        let totalUserOwes = 0;
        for (const expense of expenses) {
            // Find current user's split
            const userSplit = expense.splits.find((s) => s.userId === userId);
            if (!userSplit)
                continue;
            const userOwed = userSplit.amount;
            const userPaid = expense.paidById === userId ? expense.amount : 0;
            // Net position: positive means user is owed, negative means user owes
            const netPosition = userPaid - userOwed;
            if (netPosition > 0) {
                totalOwedToUser += netPosition;
            }
            else if (netPosition < 0) {
                totalUserOwes += Math.abs(netPosition);
            }
        }
        return {
            totalOwedToUser,
            totalUserOwes,
        };
    }
    async getAllUserGroups(userId) {
        const groups = await prisma.groupMember.findMany({
            where: {
                userId: userId,
            },
            include: {
                group: {
                    include: {
                        members: true,
                        expenses: {
                            include: {
                                splits: true,
                            },
                        },
                    },
                },
            },
        });
        // Calculate balance for each group
        const groupsWithBalance = groups.map((groupMember) => {
            let balance = 0;
            // Calculate user's balance in this group
            // Include settlements - they are payments that reduce debt
            for (const expense of groupMember.group.expenses) {
                const userSplit = expense.splits.find((s) => s.userId === userId);
                if (!userSplit)
                    continue;
                const userOwed = userSplit.amount;
                const userPaid = expense.paidById === userId ? expense.amount : 0;
                balance += userPaid - userOwed;
            }
            return {
                ...groupMember,
                balance,
            };
        });
        return groupsWithBalance;
    }
    async friendDetails(friendId, currentUserId) {
        // Get friend information
        const friend = await prisma.user.findUnique({
            where: {
                id: friendId,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
            },
        });
        if (!friend) {
            throw new Error("Friend not found!!");
        }
        // Get all expenses between current user and friend (including settlements)
        // Settlements are payments that reduce debt
        const expenses = await prisma.expense.findMany({
            where: {
                groupId: null,
                splits: {
                    some: {
                        userId: currentUserId,
                    },
                },
                AND: {
                    splits: {
                        some: {
                            userId: friendId,
                        },
                    },
                },
            },
            orderBy: {
                date: "desc",
            },
            include: {
                paidBy: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
                splits: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        // Calculate balance from actual friend-to-friend expenses
        // This ensures group expenses don't affect friend balances
        let finalBalance = 0;
        for (const expense of expenses) {
            const currentUserSplit = expense.splits.find((s) => s.userId === currentUserId);
            const friendSplit = expense.splits.find((s) => s.userId === friendId);
            if (currentUserSplit && friendSplit) {
                const currentUserPaid = expense.paidById === currentUserId ? expense.amount : 0;
                const currentUserOwed = currentUserSplit.amount;
                // Net position for this expense from current user's perspective
                const netPosition = currentUserPaid - currentUserOwed;
                finalBalance += netPosition;
            }
        }
        // console.log('Get friend details balance:', {
        //     currentUserId,
        //     friendId,
        //     calculatedBalance: finalBalance,
        //     expenseCount: expenses.length
        // });
        return {
            friend,
            expenses,
            balance: finalBalance,
            expenseCount: expenses.length,
        };
    }
}
//# sourceMappingURL=user.services.js.map