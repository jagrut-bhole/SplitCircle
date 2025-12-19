import { prisma } from '../index.js';
export class ActivityService {
    async getUserActivities(userId, limit = 20) {
        try {
            // Fetch activities for the user (their own actions, group activities, or friend activities)
            const activities = await prisma.activity.findMany({
                where: {
                    OR: [
                        { userId: userId }, // Activities created by the user
                        {
                            // Activities in groups where user is a member
                            group: {
                                members: {
                                    some: {
                                        userId: userId
                                    }
                                }
                            }
                        },
                        {
                            // Settlement activities where user is involved
                            settlement: {
                                OR: [
                                    { paidById: userId },
                                    { paidToId: userId }
                                ]
                            }
                        },
                        {
                            // Expense activities where user is involved
                            expense: {
                                OR: [
                                    { paidById: userId },
                                    {
                                        splits: {
                                            some: {
                                                userId: userId
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                include: {
                    actor: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    group: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    expense: {
                        select: {
                            id: true,
                            title: true,
                            note: true,
                            amount: true,
                            splitType: true,
                            paidBy: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            splits: {
                                select: {
                                    userId: true,
                                    amount: true,
                                    user: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    settlement: {
                        select: {
                            id: true,
                            amount: true,
                            note: true,
                            paidBy: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            paidTo: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: limit,
                distinct: ['id'] // Avoid duplicates from multiple OR conditions
            });
            // Format activities with proper messages and "You" substitution
            const formattedActivities = activities.map((activity) => {
                let formattedNote = activity.note;
                // Handle settlement activities specifically
                if (activity.settlement) {
                    const paidByName = activity.settlement.paidBy.id === userId
                        ? 'You'
                        : activity.settlement.paidBy.name;
                    const paidToName = activity.settlement.paidTo.id === userId
                        ? 'You'
                        : activity.settlement.paidTo.name;
                    formattedNote = `${paidByName} paid ${paidToName}: ₹${activity.settlement.amount.toFixed(2)}`;
                }
                // Handle expense activities
                else if (activity.expense) {
                    const paidByName = activity.expense.paidBy.id === userId
                        ? 'You'
                        : activity.expense.paidBy.name;
                    if (activity.expense.splitType === 'SETTLEMENT') {
                        // This is a settlement recorded as an expense
                        const recipient = activity.expense.splits.find(s => s.amount > 0);
                        if (recipient) {
                            const recipientName = recipient.userId === userId
                                ? 'You'
                                : recipient.user.name;
                            formattedNote = `${paidByName} paid ${recipientName}: ₹${activity.expense.amount.toFixed(2)}`;
                        }
                    }
                    else {
                        // Regular expense
                        formattedNote = activity.note.replace(activity.expense.paidBy.name, paidByName);
                    }
                }
                // Handle other activities - replace actor name with "You" if it's the current user
                else {
                    const activityActor = activity.actor;
                    if (activityActor && activityActor.id === userId && activityActor.name) {
                        formattedNote = formattedNote.replace(activityActor.name, 'You');
                    }
                }
                return {
                    id: activity.id,
                    note: formattedNote,
                    userId: activity.userId,
                    groupId: activity.groupId,
                    expenseId: activity.expenseId,
                    settlementId: activity.settlementId,
                    metadata: activity.metadata,
                    createdAt: activity.createdAt,
                    actor: activity.actor,
                    group: activity.group,
                    expense: activity.expense,
                    settlement: activity.settlement
                };
            });
            return formattedActivities;
        }
        catch (error) {
            console.error('Error fetching user activities:', error);
            throw new Error('Failed to fetch user activities');
        }
    }
}
//# sourceMappingURL=activity.services.js.map