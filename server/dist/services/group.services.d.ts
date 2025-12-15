export declare class GroupService {
    createGroup(userId: string, groupData: {
        name: string;
        description?: string;
        memberUsernames: string[];
    }): Promise<{
        message: string;
        group: ({
            members: ({
                user: {
                    email: string;
                    name: string;
                    id: string;
                    username: string;
                };
            } & {
                userId: string;
                id: string;
                groupId: string;
                joinedAt: Date;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            createdById: string;
        }) | null;
    }>;
    getGroupUsers(userId: string): Promise<{
        group: ({
            group: {
                _count: {
                    expenses: number;
                };
                members: ({
                    user: {
                        name: string;
                        id: string;
                        username: string;
                    };
                } & {
                    userId: string;
                    id: string;
                    groupId: string;
                    joinedAt: Date;
                })[];
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                createdById: string;
            };
        } & {
            userId: string;
            id: string;
            groupId: string;
            joinedAt: Date;
        })[];
        success: boolean;
    }>;
    getGroupDetails(userId: string, groupId: string): Promise<{
        group: ({
            members: ({
                user: {
                    name: string;
                    id: string;
                    username: string;
                };
            } & {
                userId: string;
                id: string;
                groupId: string;
                joinedAt: Date;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            createdById: string;
        })[];
        recentExpenses: ({
            paidBy: {
                name: string;
                id: string;
                username: string;
            };
        } & {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            createdById: string;
            groupId: string | null;
            title: string;
            note: string;
            currency: string;
            paidById: string;
            splitType: import("../generated/prisma/enums.js").SplitType;
            scenario: string | null;
        })[];
    }>;
    addMembers(username: string, groupId: string, addedByUserId: string): Promise<{
        message: string;
        data: {
            result: ({
                members: ({
                    user: {
                        email: string;
                        name: string;
                        id: string;
                        username: string;
                    };
                } & {
                    userId: string;
                    id: string;
                    groupId: string;
                    joinedAt: Date;
                })[];
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                createdById: string;
            }) | null;
            userToBeAdded: string;
        };
    }>;
    addGroupExpense(groupId: string, currentUserId: string, title: string, note: string, amount: number, paidByUsername: string, splitType: string, splits: Array<{
        username: string;
        amount?: number;
        percentage?: number;
    }>, participantUsernames: string[]): Promise<({
        group: {
            name: string;
            id: string;
        } | null;
        paidBy: {
            name: string;
            id: string;
            username: string;
        };
        splits: ({
            user: {
                name: string;
                id: string;
                username: string;
            };
        } & {
            userId: string;
            id: string;
            amount: number;
            expenseId: string;
            percentage: number | null;
        })[];
    } & {
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        createdById: string;
        groupId: string | null;
        title: string;
        note: string;
        currency: string;
        paidById: string;
        splitType: import("../generated/prisma/enums.js").SplitType;
        scenario: string | null;
    }) | null | undefined>;
    updateGroupExpense(expenseId: string, groupId: string, currentUserId: string, title: string, amount: number, paidByUsername: string, participantUsernames: string[]): Promise<({
        group: {
            name: string;
            id: string;
        } | null;
        paidBy: {
            name: string;
            id: string;
            username: string;
        };
        splits: ({
            user: {
                name: string;
                id: string;
                username: string;
            };
        } & {
            userId: string;
            id: string;
            amount: number;
            expenseId: string;
            percentage: number | null;
        })[];
    } & {
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        createdById: string;
        groupId: string | null;
        title: string;
        note: string;
        currency: string;
        paidById: string;
        splitType: import("../generated/prisma/enums.js").SplitType;
        scenario: string | null;
    }) | null>;
    deleteGroupExpense(expenseId: string, groupId: string, currentUserId: string): Promise<{
        success: boolean;
        deletedExpense: {
            title: string;
            amount: number;
            paidBy: string;
            paidByUsername: string;
            participants: {
                username: string;
                name: string;
                amount: number;
            }[];
            groupId: string;
        };
    }>;
    deleteGroup(currentUserId: string, groupId: string): Promise<{
        success: boolean;
        deletedGroup: {
            id: string;
            name: string;
            description: string;
        };
    }>;
}
//# sourceMappingURL=group.services.d.ts.map