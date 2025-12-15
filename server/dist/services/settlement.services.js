import { prisma } from '../index.js';
import { normalizeFriendshipIds } from '../utils/friendships.utils.js';
import { EmailServices } from './email.services.js';
import { UserService } from './user.services.js';
export class SettlementService {
    async getFriendSettlementInfo(currentUserId, friendId) {
        console.log("currentUserId: ", currentUserId);
        console.log("friendId: ", friendId);
        const friendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1Id: currentUserId, user2Id: friendId },
                    { user1Id: friendId, user2Id: currentUserId }
                ]
            }
        });
        if (!friendship) {
            throw new Error(`You are not friends with ${friendId}`);
        }
        const { user1Id, user2Id } = normalizeFriendshipIds(currentUserId, friendId);
        const balance = await prisma.balance.findUnique({
            where: {
                user1Id_user2Id: {
                    user1Id,
                    user2Id
                }
            }
        });
        if (!balance) {
            throw new Error("Balance not found");
        }
        let actualBalance;
        if (currentUserId === user1Id) {
            actualBalance = balance.amount;
        }
        else {
            actualBalance = -balance.amount;
        }
        const friend = await prisma.user.findUnique({
            where: {
                id: friendId
            },
            select: {
                id: true,
                username: true,
                name: true,
                email: true
            }
        });
        let message;
        let youOwe = 0;
        let theyOwe = 0;
        if (actualBalance > 0) {
            youOwe = actualBalance;
            message = `You Owe ${friend.name} ₹${actualBalance.toFixed(2)}`;
        }
        else if (actualBalance < 0) {
            theyOwe = Math.abs(actualBalance);
            message = `${friend.name} Owes You ₹${Math.abs(actualBalance).toFixed(2)}`;
        }
        else {
            message = `You are settled up with ${friend.name}`;
        }
        return {
            friend: {
                id: friend.id,
                username: friend.username,
                name: friend.name
            },
            balance: actualBalance,
            message,
            youOwe,
            theyOwe,
            isSettled: Math.abs(actualBalance) < 0.01
        };
    }
    async settleFriendSettlement(currentUserId, friendId, amount, note) {
        const friendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    {
                        user1Id: currentUserId,
                        user2Id: friendId,
                    },
                    {
                        user1Id: friendId,
                        user2Id: currentUserId
                    }
                ]
            }
        });
        if (!friendship) {
            throw new Error("You are not friends with this user");
        }
        const { user1Id, user2Id } = normalizeFriendshipIds(currentUserId, friendId);
        const balance = await prisma.balance.findUnique({
            where: {
                user1Id_user2Id: {
                    user1Id,
                    user2Id
                }
            }
        });
        if (!balance) {
            throw new Error("Balance not found");
        }
        let actualBalance = 0;
        if (currentUserId === user1Id) {
            actualBalance = balance.amount;
        }
        else {
            actualBalance = -balance.amount;
        }
        if (actualBalance <= 0) {
            throw new Error(`You don't owe any money to ${friendId}`);
        }
        if (amount > actualBalance) {
            throw new Error(`You can't settle more than you owe. You owe ₹${actualBalance.toFixed(2)}, but trying to pay ₹${amount.toFixed(2)}`);
        }
        let balanceChange = 0;
        if (currentUserId === user1Id) {
            balanceChange = -amount;
        }
        else {
            balanceChange = amount;
        }
        const isFullSettlement = Math.abs(amount - actualBalance) < 0.01;
        const result = await prisma.$transaction(async (tx) => {
            const settlementExpense = await tx.expense.create({
                data: {
                    title: isFullSettlement ? 'Full Settlement' : 'Partial Settlement',
                    note: note || `Payment of ₹${amount}`,
                    amount: amount,
                    currency: 'INR',
                    paidById: currentUserId,
                    groupId: null,
                    splitType: 'SETTLEMENT',
                    scenario: null,
                    createdById: currentUserId,
                    date: new Date()
                }
            });
            await tx.expenseSplit.createMany({
                data: [
                    {
                        expenseId: settlementExpense.id,
                        userId: currentUserId,
                        amount: 0
                    },
                    {
                        expenseId: settlementExpense.id,
                        userId: friendId,
                        amount: amount
                    }
                ]
            });
            const newBalance = await tx.balance.update({
                where: {
                    id: balance.id,
                },
                data: {
                    amount: balance.amount + balanceChange
                }
            });
            let newActualBalance = 0;
            if (currentUserId === user1Id) {
                newActualBalance = newBalance.amount;
            }
            else {
                newActualBalance = -newBalance.amount;
            }
            const settlementType = isFullSettlement ? 'full' : 'partial';
            await tx.activity.create({
                data: {
                    note: `Settled ${settlementType} settlement of ₹${amount.toFixed(2)}`,
                    userId: currentUserId,
                    expenseId: settlementExpense.id,
                    metadata: {
                        amount: amount,
                        friendId,
                        note: note,
                        isFullSettlement,
                        remainingBalance: newActualBalance
                    }
                }
            });
            await tx.activity.create({
                data: {
                    note: `Settled ${settlementType} settlement of ₹${amount.toFixed(2)}`,
                    userId: friendId,
                    expenseId: settlementExpense.id,
                    metadata: {
                        amount: amount,
                        friendId,
                        note: note,
                        isFullSettlement,
                        remainingBalance: -newActualBalance
                    }
                }
            });
            return {
                settlement: settlementExpense,
                oldBalance: actualBalance,
                newBalance: newActualBalance,
                isFullSettlement,
                remainingAmount: Math.max(0, newActualBalance)
            };
        });
        const emailService = new EmailServices();
        const [currentUser, friendUser] = await Promise.all([
            prisma.user.findUnique({
                where: {
                    id: currentUserId
                },
                select: {
                    email: true,
                    name: true,
                    username: true
                }
            }),
            prisma.user.findUnique({
                where: {
                    id: friendId
                },
                select: {
                    name: true,
                    username: true,
                    email: true
                }
            })
        ]);
        await emailService.sendSettlementEmail({
            name: friendUser.name,
            email: friendUser.email
        }, {
            amount: amount,
            isGroupSettlement: false,
            friendName: currentUser.name
        }, {
            name: currentUser.name,
            username: currentUser.username
        });
        return result;
    }
    async groupSettlementInfo(currentUserId, groupId) {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                name: true
                            }
                        }
                    }
                },
                expenses: {
                    include: {
                        splits: true
                    }
                }
            }
        });
        if (!group) {
            throw new Error("Group not found");
        }
        const isMember = group.members.find(m => m.userId === currentUserId);
        if (!isMember) {
            throw new Error("You are not a member of the group");
        }
        // Calculating net balance for each member
        const memberBalance = new Map();
        group.members.forEach(m => {
            memberBalance.set(m.userId, 0);
        });
        for (const expense of group.expenses) {
            for (const split of expense.splits) {
                const userId = split.userId;
                const amountPaid = expense.paidById === userId ? expense.amount : 0;
                const amountOwed = split.amount;
                const netPosition = amountPaid - amountOwed;
                const currentBalance = memberBalance.get(userId) || 0;
                memberBalance.set(userId, currentBalance + netPosition);
            }
        }
        const currentUserBalance = memberBalance.get(currentUserId) || 0;
        const yourDebts = [];
        let totalYouOwe = 0;
        let totalOwedToYou = 0;
        for (const member of group.members) {
            if (member.userId === currentUserId) {
                const otherBalance = memberBalance.get(member.userId) || 0;
                if (currentUserBalance < 0 && otherBalance > 0) {
                    const proportionalDebt = Math.min(Math.abs(currentUserBalance), otherBalance);
                    yourDebts.push({
                        user: {
                            id: member.user.id,
                            username: member.user.username,
                            name: member.user.name
                        },
                        youOwe: proportionalDebt,
                        message: `You owe ${member.user.name} ₹${proportionalDebt.toFixed(2)}`
                    });
                    totalYouOwe += proportionalDebt;
                }
                else if (currentUserBalance > 0 && otherBalance < 0) {
                    // They owe you
                    const proportionalDebt = Math.min(currentUserBalance, Math.abs(otherBalance));
                    yourDebts.push({
                        user: {
                            id: member.user.id,
                            username: member.user.username,
                            name: member.user.name
                        },
                        theyOwe: proportionalDebt,
                        message: `${member.user.name} owes you ₹${proportionalDebt.toFixed(2)}`
                    });
                    totalOwedToYou += proportionalDebt;
                }
            }
            yourDebts.sort((a, b) => {
                if (a.youOwe && b.youOwe)
                    return b.youOwe - a.youOwe;
                if (a.youOwe)
                    return -1;
                if (b.youOwe)
                    return 1;
                return 0;
            });
            return {
                group: {
                    id: group.id,
                    name: group.name
                },
                yourDebts,
                totalYouOwe,
                totalOwedToYou,
                netPosition: currentUserBalance
            };
        }
    }
    async settleGroupDebt(currentUserId, groupId, recipientId, amount, note) {
        const userService = new UserService();
        // const recipientId = await userService.extractCurrentUserId(payToUsername);
        const info = await this.groupSettlementInfo(currentUserId, groupId);
        const recipientName = await userService.extractNameFromId(recipientId);
        const debtToUser = info?.yourDebts.find(d => d.user.id === recipientId);
        if (!debtToUser || !debtToUser.youOwe) {
            throw new Error(`You don't owe money to ${recipientName} in this group`);
        }
        if (amount > debtToUser.youOwe) {
            throw new Error(`You can't settle more than you owe. You owe ₹${debtToUser.youOwe.toFixed(2)}, but trying to pay ₹${amount.toFixed(2)}`);
        }
        const areFriends = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1Id: currentUserId, user2Id: recipientId },
                    { user1Id: recipientId, user2Id: currentUserId }
                ]
            }
        });
        const isFullSettlement = Math.abs(amount - debtToUser.youOwe) < 0.01;
        const result = await prisma.$transaction(async (tx) => {
            const settlementExpense = await tx.expense.create({
                data: {
                    title: isFullSettlement ? 'Full Group Settlement' : 'Partial Group Settlement',
                    note: note || `Group payment of ₹${amount}`,
                    amount: amount,
                    currency: 'INR',
                    paidById: currentUserId,
                    groupId: groupId,
                    splitType: 'SETTLEMENT',
                    scenario: null,
                    createdById: currentUserId,
                    date: new Date()
                }
            });
            await tx.expenseSplit.createMany({
                data: [
                    {
                        expenseId: settlementExpense.id,
                        userId: currentUserId,
                        amount: 0
                    },
                    {
                        expenseId: settlementExpense.id,
                        userId: recipientId,
                        amount: amount
                    }
                ]
            });
            if (areFriends) {
                const { user1Id, user2Id } = normalizeFriendshipIds(currentUserId, recipientId);
                const friendBalance = await tx.balance.findUnique({
                    where: { user1Id_user2Id: { user1Id, user2Id } }
                });
                if (friendBalance) {
                    let balanceChange = 0;
                    if (currentUserId === user1Id) {
                        balanceChange = -amount;
                    }
                    else {
                        balanceChange = amount;
                    }
                    await tx.balance.update({
                        where: { id: friendBalance.id },
                        data: { amount: friendBalance.amount + balanceChange }
                    });
                }
            }
            await tx.activity.create({
                data: {
                    note: `Group settlement: ₹${amount} to ${debtToUser.user.name}`,
                    userId: currentUserId,
                    expenseId: settlementExpense.id,
                    groupId: groupId,
                    metadata: {
                        amount: amount,
                        recipientId,
                        isFullSettlement,
                        remainingDebt: debtToUser.youOwe - amount
                    }
                }
            });
            await tx.activity.create({
                data: {
                    note: `Received group settlement: ₹${amount}`,
                    userId: recipientId,
                    expenseId: settlementExpense.id,
                    groupId: groupId,
                    metadata: {
                        amount: amount,
                        fromUserId: currentUserId,
                        isFullSettlement
                    }
                }
            });
            return {
                settlement: settlementExpense,
                paidTo: debtToUser.user,
                amountPaid: amount,
                remainingDebt: Math.max(0, debtToUser.youOwe - amount),
                isFullSettlement
            };
        });
        const emailService = new EmailServices();
        const [currentUser, group] = await Promise.all([
            prisma.user.findUnique({
                where: { id: currentUserId },
                select: { name: true, username: true, email: true }
            }),
            prisma.group.findUnique({
                where: { id: groupId },
                select: { name: true }
            })
        ]);
        const recipient = await prisma.user.findUnique({
            where: { id: recipientId },
            select: { name: true, email: true }
        });
        await emailService.sendSettlementEmail({ name: recipient.name, email: recipient.email }, {
            amount: amount,
            isGroupSettlement: true,
            groupName: group.name
        }, { name: currentUser.name, username: currentUser.username });
        return result;
    }
}
//# sourceMappingURL=settlement.services.js.map