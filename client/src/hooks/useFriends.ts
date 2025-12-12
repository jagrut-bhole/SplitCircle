import { useMutation, useQuery } from "@tanstack/react-query";
import { friendsService } from "@/services/friendsService";
import { queryClient } from "@/lib/queryClient";

export const useFriends = () => {
    return useQuery({
        queryKey: ['friends'],
        queryFn: friendsService.getFriends,
        staleTime: 2 * 60 * 1000
    });
};

export const useSearchUsers = (username: string) => {
    return useQuery({
        queryKey: ['friends', 'search', username],
        queryFn: () => friendsService.searchUsers(username),
        enabled: username.length > 2,
        staleTime: 30 * 1000
    });
};

export const useAddFriend = () => {
    return useMutation({
        mutationFn: (username: string) => friendsService.addFriend(username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            console.log('Friend added successfully');
        },
        onError: (error) => {
            console.error('Failed to add friend:', error);
        }
    });
};