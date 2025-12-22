import { SplitType } from "../generated/prisma/enums.js";
export declare class ExpenseServices {
    addFriendExpense(currentUserId: string, friendId: string, description: string, amount: number, date: Date, title: string, scenario: string): Promise<{
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        title: string;
        note: string;
        currency: string;
        paidById: string;
        groupId: string | null;
        splitType: SplitType;
        scenario: string | null;
        createdById: string;
    }>;
    friendExpenseList(currentUserId: string, friendId: string): Promise<{
        count: number;
        data: ({
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
            title: string;
            note: string;
            currency: string;
            paidById: string;
            groupId: string | null;
            splitType: SplitType;
            scenario: string | null;
            createdById: string;
        })[];
    }>;
    friendSingleExpenseDetail(expenseId: string, currentUserId: string): Promise<{
        expense: ({
            paidBy: {
                name: string;
                id: string;
                username: string;
            };
            group: {
                name: string;
                id: string;
                createdAt: Date;
                description: string | null;
            } | null;
            splits: ({
                user: {
                    email: string;
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
            title: string;
            note: string;
            currency: string;
            paidById: string;
            groupId: string | null;
            splitType: SplitType;
            scenario: string | null;
            createdById: string;
        })[];
    }>;
    updateFriendExpense(currentUserId: string, expenseId: string, updates: {
        title?: string;
        description?: string;
        amount?: number;
        scenario?: string;
    }): Promise<{
        result: {
            updateExpense: {
                date: Date;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                amount: number;
                title: string;
                note: string;
                currency: string;
                paidById: string;
                groupId: string | null;
                splitType: SplitType;
                scenario: string | null;
                createdById: string;
            };
        };
    }>;
    deleteFriendExpense(currentUserId: string, expenseId: string): Promise<{
        expense: {
            paidBy: {
                email: string;
                name: string;
                id: string;
                username: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
            splits: {
                userId: string;
                id: string;
                amount: number;
                expenseId: string;
                percentage: number | null;
            }[];
        } & {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            title: string;
            note: string;
            currency: string;
            paidById: string;
            groupId: string | null;
            splitType: SplitType;
            scenario: string | null;
            createdById: string;
        };
    }>;
    private calculateSplits;
    private checkFriendshipExists;
    private updateBalance;
    private createActivity;
}
//# sourceMappingURL=expense.services.d.ts.map