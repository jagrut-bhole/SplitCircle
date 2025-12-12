import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { expensesService } from "@/services/expensesService";
import type { CreateFriendExpenseData, UpdateFriendExpenseData, CreateGroupExpenseData, UpdateGroupExpenseData } from "@/types/ExpenseTypes";

// Get all expenses for a specific friend
export const useGetFriendExpenses = (friendId: string) => {
    return useQuery({
        queryKey: ['expense', 'friend', friendId],
        queryFn: () => expensesService.getFriendExpenses(friendId),
        enabled: !!friendId,
        staleTime: 2 * 60 * 1000
    });
};


export const useGetFriendExpenseDetails = (friendId: string, expenseId: string) => {
    return useQuery({
        queryKey: ['expense', 'friend', friendId, expenseId],
        queryFn: () => expensesService.getExpenseDetail(friendId, expenseId),
        enabled: !!friendId && !!expenseId,
        staleTime: 30 * 1000
    });
};

export const useAddFriendExpense = () => {
    return useMutation({
        mutationFn: ({ friendId, expenseData }: { friendId: string; expenseData: CreateFriendExpenseData }) => 
            expensesService.createFriendExpense(friendId, expenseData),
        onSuccess: (data, variables) => {
            
            queryClient.invalidateQueries({ queryKey: ['expense', 'friend', variables.friendId] });
            
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            console.log('Friend expense added successfully');
        },
        onError: (error) => {
            console.error('Failed to add friend expense:', error);
        }
    });
};

export const useUpdateFriendExpense = () => {
    return useMutation({
        mutationFn: ({ 
            friendId, 
            expenseId, 
            updates 
        }: { 
            friendId: string; 
            expenseId: string; 
            updates: UpdateFriendExpenseData 
        }) => expensesService.updateFriendExpense(friendId, expenseId, updates),
        onSuccess: (data, variables) => {
            
            queryClient.invalidateQueries({ 
                queryKey: ['expense', 'friend', variables.friendId, variables.expenseId] 
            });
            
            queryClient.invalidateQueries({ queryKey: ['expense', 'friend', variables.friendId] });
            
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            console.log('Friend expense updated successfully');
        },
        onError: (error) => {
            console.error('Failed to update friend expense:', error);
        }
    });
};

export const useDeleteFriendExpense = () => {
    return useMutation({
        mutationFn: ({ friendId, expenseId }: { friendId: string; expenseId: string }) => 
            expensesService.deleteFriendExpense(friendId, expenseId),
        onSuccess: (data, variables) => {
            // Removes the specific expense from cache
            queryClient.removeQueries({ 
                queryKey: ['expense', 'friend', variables.friendId, variables.expenseId] 
            });
            // Invalidate the friend's expense list
            queryClient.invalidateQueries({ queryKey: ['expense', 'friend', variables.friendId] });
            // Invalidate friends list to update balance
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            console.log('Friend expense deleted successfully');
        },
        onError: (error) => {
            console.error('Failed to delete friend expense:', error);
        }
    });
};

export const useAddGroupExpense = () => {
    return useMutation({
        mutationFn: ({ groupId, expenseData }: { groupId: string; expenseData: CreateGroupExpenseData }) => 
            expensesService.createGroupExpense(groupId, expenseData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
            
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            console.log('Group expense added successfully');
        },
        onError: (error) => {
            console.error('Failed to add group expense:', error);
        }
    });
};

export const useUpdateGroupExpense = () => {
    return useMutation({
        mutationFn: ({ 
            groupId, 
            expenseId, 
            updates 
        }: { 
            groupId: string; 
            expenseId: string; 
            updates: UpdateGroupExpenseData 
        }) => expensesService.updateGroupExpense(groupId, expenseId, updates),
        onSuccess: (data, variables) => {
            
            queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });

            queryClient.invalidateQueries({ queryKey: ['groups'] });
            console.log('Group expense updated successfully');
        },
        onError: (error) => {
            console.error('Failed to update group expense:', error);
        }
    });
};


export const useDeleteGroupExpense = () => {
    return useMutation({
        mutationFn: ({ groupId, expenseId }: { groupId: string; expenseId: string }) => 
            expensesService.deleteGroupExpense(groupId, expenseId),
        onSuccess: (data, variables) => {
            // Invalidate the group details to reflect deleted expense
            queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
            // Invalidate groups list to update balances
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            console.log('Group expense deleted successfully');
        },
        onError: (error) => {
            console.error('Failed to delete group expense:', error);
        }
    });
};