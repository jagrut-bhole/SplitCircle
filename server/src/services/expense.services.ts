import { prisma } from "../index.js";
import { UserService } from "../services/user.services.js";
import { SplitType } from "../generated/prisma/enums.js";
import { normalizeFriendshipIds } from "../utils/friendships.utils.js";
const userService = new UserService();
import { calculateBalanceChange } from "../utils/balance.utils.js";

export class ExpenseServices {
  async addFriendExpense(
    currentUserId: string,
    friendId: string,
    description: string,
    amount: number,
    date: Date,
    title: string,
    scenario: string,
  ) {
    const friendship = await this.checkFriendshipExists(
      currentUserId,
      friendId,
    );

    if (!friendship) {
      throw new Error("Not friends with the user!!");
    }

    const { paidById, currentUserOwes, friendOwes, splitType } =
      this.calculateSplits(friendId, currentUserId, amount, scenario);

    const balanceChange = calculateBalanceChange(
      currentUserId,
      friendId,
      currentUserOwes,
      friendOwes,
      paidById,
    );

    console.log("Balance calculation:", {
      currentUserId,
      friendId,
      paidById,
      currentUserOwes,
      friendOwes,
      balanceChange,
    });

    const result = await prisma.$transaction(async (tx) => {
      const expense = await tx.expense.create({
        data: {
          title,
          note: description,
          amount,
          currency: "INR",
          date,
          paidById,
          createdById: currentUserId,
          groupId: null,
          splitType,
        },
      });

      await tx.expenseSplit.createMany({
        data: [
          {
            expenseId: expense.id,
            userId: currentUserId,
            amount: currentUserOwes,
          },
          {
            expenseId: expense.id,
            userId: friendId,
            amount: friendOwes,
          },
        ],
      });

      await this.updateBalance(currentUserId, friendId, balanceChange, tx);

      await this.createActivity(tx, expense, currentUserId);

      return expense;
    });
    return result;
  }

  async friendExpenseList(currentUserId: string, friendId: string) {
    const friendship = await this.checkFriendshipExists(
      currentUserId,
      friendId,
    );

    if (!friendship) {
      throw new Error("Not friends with the user!!");
    }

    const totalCount = await prisma.expense.count({
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
    });

    const expense = await prisma.expense.findMany({
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
    return {
      count: totalCount,
      data: expense,
    };
  }

  async friendSingleExpenseDetail(expenseId: string, currentUserId: string) {
    const user = await prisma.expense.findUnique({
      where: {
        id: expenseId,
        OR: [
          {
            paidById: currentUserId,
          },
          {
            createdById: currentUserId,
          },
        ],
        splits: {
          some: {
            userId: currentUserId,
          },
        },
      },
    });
    if (!user) {
      throw new Error("You Don't have access in the expense!!");
    }

    const expense = await prisma.expense.findMany({
      where: {
        id: expenseId,
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
                email: true,
              },
            },
          },
        },
        group: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });
    return {
      expense,
    };
  }

  async updateFriendExpense(
    currentUserId: string,
    expenseId: string,
    updates: {
      title?: string;
      description?: string;
      amount?: number;
      scenario?: string;
    },
  ) {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      include: {
        splits: {
          select: {
            id: true,
            expenseId: true,
            userId: true,
            amount: true,
          },
        },
        paidBy: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    const userSplit = expense?.splits.find((s) => s.userId === currentUserId);

    if (!userSplit) {
      throw new Error("You don\'t have access to this expense");
    }

    if (expense?.groupId !== null) {
      throw new Error("This is a group expense");
    }

    const toChange =
      (updates.description && updates.description !== expense.note) ||
      (updates.amount && updates.amount !== expense.amount) ||
      (updates.title && updates.title !== expense.title) ||
      (updates.scenario && updates.scenario !== expense.scenario);

    if (!toChange) {
      throw new Error("No changes to update");
    }

    const [split1, split2] = expense.splits;

    const user1Id = split1.userId;
    const user2Id = split2.userId;

    const friendId = user1Id === currentUserId ? user2Id : user1Id;

    const currentUserOldOwes = expense.splits.find(
      (s) => s.userId === currentUserId,
    )!.amount;
    const friendOldOwes = expense.splits.find(
      (s) => s.userId === friendId,
    )!.amount;

    const oldBalanceChange = calculateBalanceChange(
      currentUserId,
      friendId,
      currentUserOldOwes,
      friendOldOwes,
      expense.paidById,
    );

    const newAmount = updates.amount ?? expense.amount;
    const newDescription = updates.description ?? expense.note;
    const newTitle = updates.title ?? expense.title;
    const newScenario = updates.scenario ?? expense.scenario;

    if (!newScenario) {
      throw new Error("Scenario is required");
    }

    console.log("newScenario: ", newScenario);

    //calculating new split
    const { paidById, currentUserOwes, friendOwes, splitType } =
      this.calculateSplits(friendId, currentUserId, newAmount, newScenario);

    const newBalanceChange = calculateBalanceChange(
      currentUserId,
      friendId,
      currentUserOwes,
      friendOwes,
      paidById,
    );

    const netBalanceChange = -oldBalanceChange + newBalanceChange;

    const result = await prisma.$transaction(async (tx) => {
      const updateExpense = await tx.expense.update({
        where: {
          id: expenseId,
        },
        data: {
          note: newDescription,
          amount: newAmount,
          title: newTitle,
          paidById,
          splitType,
        },
      });

      await tx.expenseSplit.deleteMany({
        where: {
          expenseId,
        },
      });

      await tx.expenseSplit.createMany({
        data: [
          {
            expenseId,
            userId: currentUserId,
            amount: currentUserOwes,
          },
          {
            expenseId,
            userId: friendId,
            amount: friendOwes,
          },
        ],
      });

      if (netBalanceChange !== 0) {
        const { user1Id, user2Id } = normalizeFriendshipIds(
          currentUserId,
          friendId,
        );

        const balance = await tx.balance.findUnique({
          where: {
            user1Id_user2Id: {
              user1Id,
              user2Id,
            },
          },
        });

        if (!balance) {
          throw new Error("Balance Not Found!!");
        }

        await tx.balance.update({
          where: {
            id: balance.id,
          },
          data: {
            amount: balance.amount + netBalanceChange,
          },
        });

        await tx.activity.create({
          data: {
            note: `Updated Expense: ${newDescription}`,
            userId: currentUserId,
            expenseId,
            metadata: {
              oldValues: {
                description: expense.note,
                title: expense.title,
                amount: expense.amount,
                splitType: expense.splitType,
              },
              newValues: {
                description: newDescription,
                title: newTitle,
                amount: newAmount,
                splitType,
              },
            },
          },
        });
      }
      return {
        updateExpense,
      };
    });
    return {
      result,
    };
  }

  async deleteFriendExpense(currentUserId: string, expenseId: string) {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      include: {
        splits: true,
        paidBy: true,
      },
    });

    if (!expense) {
      throw new Error("Expense not found");
    }

    if (expense.groupId !== null) {
      throw new Error("Cannot delete group expense with this endpoint");
    }

    const userThere = expense?.splits.find((s) => s.userId === currentUserId);

    if (!userThere) {
      throw new Error("you can\'t delete this expense");
    }

    const [split1, split2] = expense?.splits;

    const user1Id = split1.userId;
    const user2Id = split2.userId;

    const friendId = user1Id === currentUserId ? user2Id : user1Id;

    const currentUserOwes = expense.splits.find(
      (s) => s.userId === currentUserId,
    )!.amount;
    const friendOwes = expense.splits.find(
      (s) => s.userId === friendId,
    )!.amount;

    const oldBalanceChange = calculateBalanceChange(
      currentUserId,
      friendId,
      currentUserOwes,
      friendOwes,
      expense.paidById,
    );

    const deletedExpenseDetails = {
      note: expense.note,
      amount: expense.amount,
      title: expense.title,
      paidBy: expense.paidBy,
      paidById: expense.paidById,
      splitType: expense.splitType,
      currentUserOwed: currentUserOwes,
      friendOwed: friendOwes,
    };

    const result = await prisma.$transaction(async (tx) => {
      const { user1Id, user2Id } = normalizeFriendshipIds(
        currentUserId,
        friendId,
      );

      const balance = await tx.balance.findUnique({
        where: {
          user1Id_user2Id: {
            user1Id,
            user2Id,
          },
        },
      });

      if (!balance) {
        throw new Error("Balance record not found");
      }

      await tx.balance.update({
        where: {
          id: balance.id,
        },
        data: {
          amount: balance.amount - oldBalanceChange,
        },
      });

      // deleting the expense
      await tx.expenseSplit.deleteMany({
        where: {
          expenseId: expenseId,
        },
      });

      // delete the expense
      await tx.expense.delete({
        where: {
          id: expenseId,
        },
      });

      await tx.activity.create({
        data: {
          note: `Deleted expense: ${deletedExpenseDetails}`,
          userId: currentUserId,
          metadata: {
            deletedExpense: deletedExpenseDetails,
          },
        },
      });
      return {
        success: true,
        deletedExpense: deletedExpenseDetails,
      };
    });

    return {
      expense,
    };
  }

  // methods

  private calculateSplits(
    friendId: string,
    currentUserId: string,
    amount: number,
    scenario: string,
  ) {
    let paidById: string;
    let currentUserOwes: number;
    let friendOwes: number;
    let splitType: SplitType;

    let trimedScenario = scenario.trim();
    switch (trimedScenario) {
      case "I_PAID_SPLIT_EQUAL":
        paidById = currentUserId;
        currentUserOwes = amount / 2;
        friendOwes = amount / 2;
        splitType = SplitType.EQUAL;
        break;

      case "I_OWED_FULL":
        paidById = currentUserId;
        currentUserOwes = 0;
        friendOwes = amount;
        splitType = SplitType.UNEQUAL;
        break;

      case "FRIEND_PAID_SPLIT_EQUAL":
        paidById = friendId;
        currentUserOwes = amount / 2;
        friendOwes = amount / 2;
        splitType = SplitType.EQUAL;
        break;

      case "FRIEND_OWED_FULL":
        paidById = friendId;
        currentUserOwes = amount;
        friendOwes = 0;
        splitType = SplitType.UNEQUAL;
        break;

      default:
        throw new Error("Invalid Scenario");
    }
    return { paidById, currentUserOwes, friendOwes, splitType };
  }

  private async checkFriendshipExists(user1: string, user2: string) {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: user1, user2Id: user2 },
          { user1Id: user2, user2Id: user1 },
        ],
      },
    });
    return friendship;
  }

  private async updateBalance(
    userId1: string,
    userId2: string,
    change: number,
    tx: any,
  ) {
    const { user1Id, user2Id } = normalizeFriendshipIds(userId1, userId2);

    const balance = await tx.balance.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id,
          user2Id,
        },
      },
    });

    console.log("Update balance:", {
      userId1,
      userId2,
      user1Id,
      user2Id,
      change,
      existingBalance: balance?.amount,
      newBalance: balance ? balance.amount + change : change,
    });

    if (!balance) {
      // Create the balance record if it doesn't exist
      await tx.balance.create({
        data: {
          user1Id,
          user2Id,
          amount: change,
        },
      });
    } else {
      // Update existing balance
      await tx.balance.update({
        where: {
          id: balance.id,
        },
        data: {
          amount: balance.amount + change,
        },
      });
    }
  }

  private async createActivity(tx: any, expense: any, userId: string) {
    await tx.activity.create({
      data: {
        note: `Added expense :${expense.note}`,
        userId,
        expenseId: expense.id,
        metadata: {
          amount: expense.amount,
        },
      },
    });
  }
}
