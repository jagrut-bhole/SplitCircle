export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

export interface ExpenseSplit {
    id: string;
    expenseId: string;
    userId: string;
    amount: number;
    percentage?: number | null;
    user: User;
}

export interface Expense {
    id: string;
    title: string;
    note: string;
    currency: string;
    amount: number;
    date: string;
    paidById: string;
    groupId: string | null;
    splitType: string;
    scenario: string | null;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    paidBy: User;
    splits: ExpenseSplit[];
    group?: {
        id: string;
        name: string;
    } | null;
}

// Friend Expense Types
export type FriendExpenseScenario = 
    | 'I_PAID_SPLIT_EQUAL'
    | 'I_OWED_FULL'
    | 'FRIEND_PAID_SPLIT_EQUAL'
    | 'FRIEND_OWED_FULL';

export interface CreateFriendExpenseData {
    username: string;
    title: string;
    amount: number;
    description: string;
    scenario: FriendExpenseScenario;
}

export interface CreateFriendExpenseResponse {
    success: boolean;
    message: string;
    data: Expense;
}

export interface GetFriendExpensesResponse {
    success: boolean;
    message: string;
    data: Expense[];
    count: number;
}

export interface GetExpenseDetailResponse {
    success: boolean;
    message: string;
    data: {
        expense: Expense;
    };
}

export interface UpdateFriendExpenseData {
    title?: string;
    description?: string;
    amount?: number;
    scenario?: FriendExpenseScenario;
}

export interface UpdateFriendExpenseResponse {
    success: boolean;
    message: string;
    data: Expense;
}

export interface DeleteExpenseResponse {
    success: boolean;
    message: string;
    data: {
        deletedExpense?: {
            id: string;
            title: string;
            amount: number;
        };
    };
}

// Group Expense Types
export type SplitType = 'EQUAL' | 'UNEQUAL' | 'PERCENTAGE';

export interface SplitDetail {
    username: string;
    amount?: number;
    percentage?: number;
}

export interface CreateGroupExpenseData {
    title: string;
    note: string;
    amount: number;
    paidByUsername: string;
    splitType: SplitType;
    splits?: SplitDetail[];
    participantUsernames: string[];
}

export interface CreateGroupExpenseResponse {
    success: boolean;
    message: string;
    data: Expense;
}

export interface UpdateGroupExpenseData {
    title?: string;
    amount?: number;
    paidByUsername?: string;
    participantUsernames?: string[];
}

export interface UpdateGroupExpenseResponse {
    success: boolean;
    message: string;
    data: Expense;
}
