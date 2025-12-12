import { api } from "./api";
import type {
    CreateFriendExpenseData,
    CreateFriendExpenseResponse,
    GetFriendExpensesResponse,
    GetExpenseDetailResponse,
    UpdateFriendExpenseData,
    UpdateFriendExpenseResponse,
    DeleteExpenseResponse,
    CreateGroupExpenseData,
    CreateGroupExpenseResponse,
    UpdateGroupExpenseData,
    UpdateGroupExpenseResponse,
} from "@/types/ExpenseTypes";

export const expensesService = {
    // Friend Expense Operations
    createFriendExpense: async (
        friendId: string,
        expenseData: CreateFriendExpenseData
    ): Promise<CreateFriendExpenseResponse> => {
        const response = await api.post(
            `/expense/friend/${friendId}/add-expense`,
            expenseData
        );
        return response as unknown as CreateFriendExpenseResponse;
    },

    getFriendExpenses: async (friendId: string): Promise<GetFriendExpensesResponse> => {
        const response = await api.get(`/expense/friend/${friendId}`);
        return response as unknown as GetFriendExpensesResponse;
    },

    getExpenseDetail: async (
        friendId: string,
        expenseId: string
    ): Promise<GetExpenseDetailResponse> => {
        const response = await api.get(`/expense/friend/${friendId}/${expenseId}`);
        return response as unknown as GetExpenseDetailResponse;
    },

    updateFriendExpense: async (
        friendId: string,
        expenseId: string,
        updates: UpdateFriendExpenseData
    ): Promise<UpdateFriendExpenseResponse> => {
        const response = await api.patch(
            `/expense/friend/${friendId}/${expenseId}`,
            updates
        );
        return response as unknown as UpdateFriendExpenseResponse;
    },

    deleteFriendExpense: async (
        friendId: string,
        expenseId: string
    ): Promise<DeleteExpenseResponse> => {
        const response = await api.delete(`/expense/friend/${friendId}/${expenseId}`);
        return response as unknown as DeleteExpenseResponse;
    },

    // Group Expense Operations
    createGroupExpense: async (
        groupId: string,
        expenseData: CreateGroupExpenseData
    ): Promise<CreateGroupExpenseResponse> => {
        const response = await api.post(
            `/group/groups/${groupId}/add-expense`,
            expenseData
        );
        return response as unknown as CreateGroupExpenseResponse;
    },

    updateGroupExpense: async (
        groupId: string,
        expenseId: string,
        updates: UpdateGroupExpenseData
    ): Promise<UpdateGroupExpenseResponse> => {
        const response = await api.patch(
            `/group/groups/${groupId}/${expenseId}`,
            updates
        );
        return response as unknown as UpdateGroupExpenseResponse;
    },

    deleteGroupExpense: async (
        groupId: string,
        expenseId: string
    ): Promise<DeleteExpenseResponse> => {
        const response = await api.delete(`/group/groups/${groupId}/${expenseId}`);
        return response as unknown as DeleteExpenseResponse;
    },
};
