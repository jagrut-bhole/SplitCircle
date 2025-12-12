import { api } from "./api";
import type {
    GetFriendSettlementInfoResponse,
    SettleFriendData,
    SettleFriendResponse,
    GetGroupSettlementInfoResponse,
    SettleGroupData,
    SettleGroupResponse,
} from "@/types/SettlementTypes";

export const settlementsService = {
    // Friend Settlement Operations
    getFriendSettlementInfo: async (
        friendId: string
    ): Promise<GetFriendSettlementInfoResponse> => {
        const response = await api.get(`/settlement/friend/${friendId}/info`);
        return response as unknown as GetFriendSettlementInfoResponse;
    },

    settleFriend: async (
        friendId: string,
        settlementData: SettleFriendData
    ): Promise<SettleFriendResponse> => {
        const response = await api.post(
            `/settlement/friend/${friendId}/settle`,
            settlementData
        );
        return response as unknown as SettleFriendResponse;
    },

    // Group Settlement Operations
    getGroupSettlementInfo: async (
        groupId: string
    ): Promise<GetGroupSettlementInfoResponse> => {
        const response = await api.get(`/settlement/groups/${groupId}/info`);
        return response as unknown as GetGroupSettlementInfoResponse;
    },

    settleGroup: async (
        groupId: string,
        friendId: string,
        settlementData: SettleGroupData
    ): Promise<SettleGroupResponse> => {
        const response = await api.post(
            `/settlement/groups/${groupId}/settle/${friendId}`,
            settlementData
        );
        return response as unknown as SettleGroupResponse;
    },
};
