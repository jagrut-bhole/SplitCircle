import { api } from "./api";
import type {
    CreateGroupData,
    CreateGroupResponse,
    GetGroupsResponse,
    GetGroupDetailsResponse,
    AddMemberResponse,
    DeleteGroupResponse,
    GetUserGroupsResponse
} from "@/types/GroupTypes";

export const groupsService = {
    createGroup: async (groupData: CreateGroupData): Promise<CreateGroupResponse> => {
        const response = await api.post('/group/create-group', groupData);
        return response as unknown as CreateGroupResponse;
    },

    getGroups: async (): Promise<GetGroupsResponse> => {
        const response = await api.get('/group/groups');
        return response as unknown as GetGroupsResponse;
    },

    getGroupDetails: async (groupId: string): Promise<GetGroupDetailsResponse> => {
        const response = await api.get(`/group/groups/${groupId}`);
        return response as unknown as GetGroupDetailsResponse;
    },

    addGroupMembers: async (groupId: string, username: string): Promise<AddMemberResponse> => {
        const response = await api.post(`/group/groups/${groupId}/members`, { username });
        return response as unknown as AddMemberResponse;
    },

    deleteGroup: async (groupId: string): Promise<DeleteGroupResponse> => {
        const response = await api.delete(`/group/groups/${groupId}`);
        return response as unknown as DeleteGroupResponse;
    },

    getUserGroups : async() : Promise<GetUserGroupsResponse> => {
        const response = await api.get('/user/groups');
        return response as unknown as GetUserGroupsResponse;
    }
};
