import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { groupsService } from "@/services/groupsService";
import type { CreateGroupData } from "@/types/GroupTypes";

export const useGroups = () => {
    return useQuery({
        queryKey: ['groups'],
        queryFn: groupsService.getGroups,
        staleTime: 2 * 60 * 1000
    });
};

export const useGroupDetails = (groupId: string) => {
    return useQuery({
        queryKey: ['groups', groupId],
        queryFn: () => groupsService.getGroupDetails(groupId),
        enabled: !!groupId,
        staleTime: 30 * 1000
    });
};

export const useCreateGroup = () => {
    return useMutation({
        mutationFn: (groupData: CreateGroupData) => groupsService.createGroup(groupData),
        onSuccess: (newGroup) => {
            queryClient.setQueryData(['groups', newGroup.data.group.id], newGroup);
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            console.log('Group created successfully:', newGroup.data.group.name);
        },
        onError: (error) => {
            console.error('Group creation failed:', error);
        }
    });
};

export const useAddGroupMember = () => {
    return useMutation({
        mutationFn: ({ groupId, username }: { groupId: string; username: string }) => 
            groupsService.addGroupMembers(groupId, username),
        onSuccess: (data, variables) => {

            // Invalidate the specific group to reflect new member
            queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
            // Invalidate groups list
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            console.log('Member added successfully');
        },
        onError: (error) => {
            console.error('Failed to add member:', error);
        }
    });
};

export const useDeleteGroup = () => {
    return useMutation({
        mutationFn: (groupId: string) => groupsService.deleteGroup(groupId),
        onSuccess: (data, groupId) => {
            // Removes the specific group from cache
            queryClient.removeQueries({ queryKey: ['groups', groupId] });

            // Invalidate groups list
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            console.log('Group deleted successfully');
        },
        onError: (error) => {
            console.error('Failed to delete group:', error);
        }
    });
};