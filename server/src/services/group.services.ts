import { prisma } from "../index.js";
import { normalizeFriendshipIds } from "../utils/friendships.utils.js";
import { UserService } from "./user.services.js";
const userService = new UserService();

import { EmailServices } from "./email.services.js";

export class GroupService {
  async createGroup(
    userId: string,
    groupData: {
      name: string;
      description?: string;
      memberUsernames: string[];
    },
  ) {
    const extractName = await userService.extractNameFromId(userId);

    const { name, description, memberUsernames } = groupData;

    // console.log("Incoming usernames:", memberUsernames);

    if (!name || name.trim().length < 3 || name.trim().length > 50) {
      throw new Error("Group name must be between 3 and 50 characters.");
    }
    const cleanUsernames = memberUsernames.map((u) => u.trim());

    console.log("Clean usernames:", cleanUsernames);

    if (!cleanUsernames || cleanUsernames.length === 0) {
      throw new Error("Group must have at least one member.");
    }

    //verifying users exists in database
    const users = await prisma.user.findMany({
      where: {
        username: {
          in: cleanUsernames,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    console.log(
      "DB users found:",
      users.map((u) => u.username),
    );

    if (users.length !== cleanUsernames.length) {
      throw new Error("One or more usernames are invalid!!");
    }

    let memberIds = users.map((u) => u.id);

    if (!memberIds.includes(userId)) {
      memberIds.push(userId);
    }

    console.log("Final memberIds:", memberIds);

    const result = await prisma.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          name,
          description: description ?? "",
          createdById: userId,
        },
      });

      const groupMembersData = memberIds.map((uid) => ({
        userId: uid,
        groupId: group.id,
      }));

      await tx.groupMember.createMany({
        data: groupMembersData,
      });

      await tx.activity.create({
        data: {
          userId: userId,
          groupId: group.id,
          note: `${extractName} created group ${name}`,
        },
      });

      const createdGroup = await tx.group.findUnique({
        where: {
          id: group.id,
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
        },
      });
      return createdGroup;
    });
    return {
      message: "Group created successfully!!",
      group: result,
    };
  }

  async getGroupUsers(userId: string) {
    const groups = await prisma.groupMember.findMany({
      where: {
        userId,
      },
      include: {
        group: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                  },
                },
              },
            },
            _count: {
              select: {
                expenses: true,
              },
            },
          },
        },
      },
      orderBy: {
        group: {
          updatedAt: "desc",
        },
      },
    });

    return {
      group: groups,
      success: true,
    };
  }

  async getGroupDetails(userId: string, groupId: string) {
    const isMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
    if (!isMember) {
      throw new Error("You are not a member of this group!!");
    }

    const group = await prisma.group.findMany({
      where: {
        id: groupId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new Error("Group Not Found");
    }

    const recentExpenses = await prisma.expense.findMany({
      where: {
        groupId: groupId,
        // Include all expenses including settlements
        // Settlements will show as "User X paid User Y" messages
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        paidBy: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        splits: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return {
      group,
      recentExpenses,
    };
  }

  async addMembers(username: string, groupId: string, addedByUserId: string) {
    const userToBeAdded = (await userService.extractCurrentUserId(
      username,
    )) as string;

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      throw new Error("Group Not Found");
    }

    const existingMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId: userToBeAdded,
        },
      },
    });

    if (existingMember) {
      throw new Error("User is already a member of this group.");
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.groupMember.create({
        data: {
          groupId,
          userId: userToBeAdded,
        },
      });

      const addedName = (await userService.extractNameFromId(
        userToBeAdded,
      )) as string;
      const addedBy = (await userService.extractNameFromId(
        addedByUserId,
      )) as string;

      await tx.activity.create({
        data: {
          userId: addedByUserId,
          groupId,
          note: `${addedBy} added ${addedName} to the group`,
        },
      });

      return await tx.group.findUnique({
        where: {
          id: groupId,
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
        },
      });
    });
    return {
      message: "Member added successfully!!",
      data: { result, userToBeAdded },
    };
  }

  async addGroupExpense(
    groupId: string,
    currentUserId: string,
    title: string,
    note: string,
    amount: number,
    paidByUsername: string,
    splitType: string,
    splits: Array<{ username: string; amount?: number; percentage?: number }>,
    participantUsernames: string[],
  ) {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new Error("Group Not Found!!");
    }

    const isMember = group.members.some((m) => m.userId === currentUserId);

    if (!isMember) {
      throw new Error("You are not a member of this group!!");
    }

    const usernameToIdMap =
      await userService.getUserIdUsernames(participantUsernames);

    const participantIds = participantUsernames.map(
      (username) => usernameToIdMap.get(username)!,
    );

    const paidById = usernameToIdMap.get(paidByUsername);

    if (!paidById) {
      throw new Error(`User "${paidByUsername}" not found`);
    }

    for (const participantId of participantIds) {
      const isGroupMember = group.members.some(
        (m) => m.userId === participantId,
      );
      if (!isGroupMember) {
        const username = participantUsernames.find(
          (un) => usernameToIdMap.get(un) === participantId,
        );
        throw new Error(`User "${username}" is not a member of this group`);
      }
    }

    const nonParticipantMembers = group.members.filter(
      (member) => !participantIds.includes(member.userId),
    );

    let calculatedSplits: Array<{
      userId: string;
      amount: number;
      percentage?: number;
    }>;

    if (splitType === "EQUAL") {
      const perPersonAmount = amount / group.members.length;

      calculatedSplits = participantIds.map((userId) => ({
        userId,
        amount: perPersonAmount,
        percentage: undefined,
      }));
    } else if (splitType === "UNEQUAL") {
      if (!splits || splits.length === 0) {
        throw new Error("Splits required for UNEQUAL split type");
      }

      calculatedSplits = splits.map((split) => ({
        userId: usernameToIdMap.get(split.username)!,
        amount: split.amount!,
        percentage: undefined,
      }));
    } else if (splitType === "PERCENTAGE") {
      if (!splits || splits.length === 0) {
        throw new Error("Splits required for PERCENTAGE split type");
      }

      calculatedSplits = splits.map((split) => ({
        userId: usernameToIdMap.get(split.username)!,
        amount: (amount * split.percentage!) / 100,
        percentage: split.percentage,
      }));
    } else {
      throw new Error("Invalid Split type");
    }

    // Verify all users in splits are group members
    for (const split of calculatedSplits) {
      const isMember = group.members.some((m) => m.userId === split.userId);
      if (!isMember) {
        throw new Error(`User ${split.userId} is not a group member`);
      }
    }

    // Group expenses should NOT update friend-to-friend Balance table
    // Group balances are calculated separately on-the-fly when needed
    const result = await prisma.$transaction(async (tx) => {
      const expense = await tx.expense.create({
        data: {
          title: title,
          note: note,
          amount: amount,
          currency: "INR",
          date: new Date(),
          paidById: paidById,
          groupId: groupId,
          splitType: splitType,
          scenario: null,
          createdById: currentUserId,
        },
      });

      await tx.expenseSplit.createMany({
        data: calculatedSplits.map((split) => ({
          expenseId: expense.id,
          userId: split.userId,
          amount: split.amount,
          percentage: split.percentage || null,
        })),
      });

      const currentUser = group.members.find(
        (m) => m.userId === currentUserId,
      )?.user;

      await tx.activity.create({
        data: {
          note: `${currentUser?.name} added expense: ${title}`,
          userId: currentUserId,
          expenseId: expense.id,
          groupId: groupId,
          metadata: {
            amount: amount,
            splitType: splitType,
            participants: participantUsernames,
            nonParticipants: nonParticipantMembers.map((m) => m.user.username),
          },
        },
      });

      for (const nonParticipant of nonParticipantMembers) {
        await tx.activity.create({
          data: {
            note: `${currentUser?.name} added expense: ${title}. You are not involved in this expense.`,
            userId: nonParticipant.userId,
            expenseId: expense.id,
            groupId: groupId,
            metadata: {
              amount: amount,
              involved: false,
              participants: participantUsernames,
            },
          },
        });
      }

      return await tx.expense.findUnique({
        where: { id: expense.id },
        include: {
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
          paidBy: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
          group: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    });

    return result;
  }

  async updateGroupExpense(
    expenseId: string,
    groupId: string,
    currentUserId: string,
    title: string,
    amount: number,
    paidByUsername: string,
    participantUsernames: string[],
  ) {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      include: {
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
        paidBy: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        group: {
          include: {
            members: {
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
        },
      },
    });

    if (!expense) {
      throw new Error("Expense Not Found!!");
    }

    if (!expense.groupId) {
      throw new Error(
        "This is not a group expense. Use friend expense update endpoint",
      );
    }

    const userInExpense = expense.splits.some(
      (s) => s.userId === currentUserId,
    );
    const userInGroup = expense.group!.members.some(
      (m) => m.userId === currentUserId,
    );

    if (!userInExpense && !userInGroup) {
      throw new Error("You don't have access to this expense");
    }

    const hasChanges =
      (title && title !== expense.title) ||
      (amount && amount !== expense.amount) ||
      (paidByUsername && paidByUsername !== expense.paidBy.username) ||
      (participantUsernames && participantUsernames.length > 0);

    if (!hasChanges) {
      throw new Error("No changes to update");
    }

    const oldParticipantIds = expense.splits.map((s) => s.userId);

    const newTitle = title ?? expense.title;
    const newAmount = amount ?? expense.amount;

    let newPaidById: string;
    let newParticipantIds: string[];

    const userService = new UserService();

    if (paidByUsername) {
      newPaidById = await userService.extractCurrentUserId(paidByUsername);
    } else {
      newPaidById = expense.paidById;
    }

    if (participantUsernames) {
      const usernameToIdMap =
        await userService.getUserIdUsernames(participantUsernames);

      newParticipantIds = participantUsernames.map(
        (un) => usernameToIdMap.get(un)!,
      );

      // Verify all are group members
      for (const participantId of newParticipantIds) {
        const isGroupMember = expense.group!.members.some(
          (m) => m.userId === participantId,
        );
        if (!isGroupMember) {
          const username = participantUsernames.find(
            (un) => usernameToIdMap.get(un) === participantId,
          );
          throw new Error(`User "${username}" is not a group member`);
        }
      }

      if (!newParticipantIds.includes(newPaidById)) {
        throw new Error("Payer must be one of the participants");
      }
    } else {
      // Keep existing participants
      newParticipantIds = oldParticipantIds;
    }

    const perPersonAmount = newAmount / newParticipantIds.length;
    const newSplits = newParticipantIds.map((userId) => ({
      userId,
      amount: perPersonAmount,
    }));

    const leavingParticipants = oldParticipantIds.filter(
      (id) => !newParticipantIds.includes(id),
    );
    const joiningParticipants = newParticipantIds.filter(
      (id) => !oldParticipantIds.includes(id),
    );

    const result = await prisma.$transaction(async (tx) => {
      const updateExpense = await tx.expense.update({
        where: {
          id: expenseId,
        },
        data: {
          title: newTitle,
          amount: newAmount,
          paidById: newPaidById,
        },
      });

      await tx.expenseSplit.deleteMany({
        where: { expenseId: expenseId },
      });

      await tx.expenseSplit.createMany({
        data: newSplits.map((split) => ({
          expenseId: expenseId,
          userId: split.userId,
          amount: split.amount,
        })),
      });

      const currentUser = expense.group!.members.find(
        (m) => m.userId === currentUserId,
      )?.user;

      await tx.activity.create({
        data: {
          note: `${currentUser?.name} updated expense: ${newTitle}`,
          userId: currentUserId,
          expenseId: expenseId,
          groupId: expense.groupId,
          metadata: {
            oldValues: {
              title: expense.title,
              amount: expense.amount,
              paidBy: expense.paidBy.username,
              participants: expense.splits.map((s) => s.user.username),
            },
            newValues: {
              title: newTitle,
              amount: newAmount,
              paidBy: paidByUsername ?? expense.paidBy.username,
              participants:
                participantUsernames ??
                expense.splits.map((s) => s.user.username),
            },
          },
        },
      });

      for (const leavingId of leavingParticipants) {
        const leavingUser = expense.splits.find(
          (s) => s.userId === leavingId,
        )?.user;
        await tx.activity.create({
          data: {
            note: `${currentUser?.name} removed you from expense: ${newTitle}`,
            userId: leavingId,
            expenseId: expenseId,
            groupId: expense.groupId,
            metadata: {
              removed: true,
            },
          },
        });
      }

      for (const joiningId of joiningParticipants) {
        await tx.activity.create({
          data: {
            note: `${currentUser?.name} added you to expense: ${newTitle}`,
            userId: joiningId,
            expenseId: expenseId,
            groupId: expense.groupId,
            metadata: {
              added: true,
              yourShare: perPersonAmount,
            },
          },
        });
      }

      return await tx.expense.findUnique({
        where: {
          id: expenseId,
        },
        include: {
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
          paidBy: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
          group: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    });
    return result;
  }

  async deleteGroupExpense(
    expenseId: string,
    groupId: string,
    currentUserId: string,
  ) {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      include: {
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
        paidBy: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!expense) {
      throw new Error("Expense not found!!");
    }

    if (!expense.groupId) {
      throw new Error(
        "This is not a group expense. Use friend expense delete endpoint.",
      );
    }

    const userInExpense = expense.splits.some(
      (s) => s.userId === currentUserId,
    );
    const userInGroup = expense.group!.members.some(
      (m) => m.userId === currentUserId,
    );

    if (!userInExpense && !userInGroup) {
      throw new Error("You don't have access to this expense");
    }

    const deletedExpenseDetails = {
      title: expense.title,
      amount: expense.amount,
      paidBy: expense.paidBy.name,
      paidByUsername: expense.paidBy.username,
      participants: expense.splits.map((s) => ({
        username: s.user.username,
        name: s.user.name,
        amount: s.amount,
      })),
      groupId: expense.groupId,
    };

    const participantIds = expense.splits.map((s) => s.userId);

    const currentUserName = await userService.extractNameFromId(currentUserId);

    const result = await prisma.$transaction(async (tx) => {
      await tx.expenseSplit.deleteMany({
        where: {
          expenseId: expenseId,
        },
      });

      await tx.expense.delete({
        where: {
          id: expenseId,
        },
      });

      const currentUser = expense.group!.members.find(
        (member) => member.userId === currentUserId,
      );

      for (const participantId of participantIds) {
        await tx.activity.create({
          data: {
            note: `${currentUserName} deleted expense: ${deletedExpenseDetails.title}`,
            userId: participantId,
            expenseId: null, // Expense is deleted
            groupId: expense.groupId,
            metadata: {
              deletedExpense: deletedExpenseDetails,
            },
          },
        });
      }

      const nonParticipantIds = expense
        .group!.members.map((m) => m.userId)
        .filter((id) => !participantIds.includes(id));

      for (const nonParticipantId of nonParticipantIds) {
        await tx.activity.create({
          data: {
            note: `${currentUserName} deleted expense: ${deletedExpenseDetails.title}`,
            userId: nonParticipantId,
            groupId: expense.groupId,
            metadata: {
              deletedExpense: deletedExpenseDetails,
              wasNotInvolved: true,
            },
          },
        });
      }
      return {
        success: true,
        deletedExpense: deletedExpenseDetails,
      };
    });
    return result;
  }

  async deleteGroup(currentUserId: string, groupId: string) {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
        expenses: {
          include: {
            splits: true,
            paidBy: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new Error("Group not Found!!");
    }

    if (group.createdById !== currentUserId) {
      throw new Error("Only Creator of the Group Can Delete it");
    }

    if (group.expenses.length > 0) {
      const memberBalance = new Map<string, number>();

      group.members.forEach((m) => {
        memberBalance.set(m.userId, 0);
      });

      //calculating the net balance of each member from all expenses
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

      const unsettledMembers: Array<{ username: string; balance: number }> = [];

      for (const [userId, balance] of memberBalance) {
        if (Math.abs(balance) > 0.01) {
          // Use 0.01 for float comparison
          const member = group.members.find((m) => m.userId === userId);
          unsettledMembers.push({
            username: member!.user.username,
            balance: balance,
          });
        }
      }

      if (unsettledMembers.length > 0) {
        const debtSummary = unsettledMembers
          .map((m) => {
            const status =
              m.balance > 0
                ? `is owed ₹${m.balance.toFixed(2)}`
                : `owes ₹${Math.abs(m.balance).toFixed(2)}`;

            return `${m.username} ${status}`;
          })
          .join(", ");

        throw new Error(
          `Cannot delete group with unsettled debts. Please settle all expenses first. Unsettled: ${debtSummary}`,
        );
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const expenseIds = group.expenses.map((e) => e.id);

      if (expenseIds.length > 0) {
        await tx.expenseSplit.deleteMany({
          where: {
            expenseId: {
              in: expenseIds,
            },
          },
        });
      }

      await tx.expense.deleteMany({
        where: {
          groupId: groupId,
        },
      });

      await tx.groupMember.deleteMany({
        where: {
          id: groupId,
        },
      });

      const currentUser = group.members.find((u) => u.userId === currentUserId);

      for (const member of group.members) {
        await tx.activity.create({
          data: {
            note: `${currentUser?.user.name} deleted group: ${group.name}`,
            userId: member.userId,
            groupId: null,
            metadata: {
              groupName: group.name,
              deletedBy: currentUser?.user.name,
            },
          },
        });
      }

      await tx.group.delete({
        where: {
          id: groupId,
        },
      });

      return {
        success: true,
        deletedGroup: {
          id: group.id,
          name: group.name,
          description: group.name,
        },
      };
    });
    return result;
  }

  async calculateGroupBalanceForUser(groupId: string, userId: string) {
    // Get all expenses for this group (including settlements)
    // Settlements are payments that reduce debt
    const expenses = await prisma.expense.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        splits: true,
      },
    });

    let balance = 0;

    for (const expense of expenses) {
      // Find current user's split
      const userSplit = expense.splits.find((s) => s.userId === userId);
      if (!userSplit) continue;

      const userOwed = userSplit.amount;
      const userPaid = expense.paidById === userId ? expense.amount : 0;

      // Net position: positive means user is owed, negative means user owes
      balance += userPaid - userOwed;
    }

    return balance;
  }
}
