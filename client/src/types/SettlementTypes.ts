export interface Friend {
    id: string;
    username: string;
    name: string;
}

export interface FriendSettlementInfo {
    friend: Friend;
    balance: number;
    message: string;
    youOwe: number;
    theyOwe: number;
    isSettled: boolean;
}

export interface GetFriendSettlementInfoResponse {
    success: boolean;
    data: FriendSettlementInfo;
}

export interface SettleFriendData {
    amount: number;
    note?: string;
}

export interface Settlement {
    id: string;
    groupId: string | null;
    paidById: string;
    paidToId: string;
    amount: number;
    note: string | null;
    createdAt: string;
}

export interface SettleFriendResponse {
    success: boolean;
    data: {
        settlement: Settlement;
        updatedBalance: {
            newBalance: number;
            message: string;
        };
    };
}

export interface GroupMemberBalance {
    userId: string;
    username: string;
    name: string;
    balance: number;
    youOwe: number;
    theyOwe: number;
}

export interface GroupSettlementInfo {
    groupName: string;
    members: GroupMemberBalance[];
    totalGroupBalance: number;
}

export interface GetGroupSettlementInfoResponse {
    success: boolean;
    message: string;
    data: GroupSettlementInfo;
}

export interface SettleGroupData {
    amount: number;
    note?: string;
}

export interface SettleGroupResponse {
    success: boolean;
    message: string;
    data: {
        settlement: Settlement;
        updatedBalance: {
            newBalance: number;
            message: string;
        };
    };
}
