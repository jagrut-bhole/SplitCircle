export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

export interface GroupMember {
    id: string;
    groupId: string;
    userId: string;
    joinedAt: string;
    user: User;
}

export interface Group {
    id: string;
    name: string;
    description: string | null;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    members: GroupMember[];
    _count?: {
        expenses: number;
    };
}

export interface CreateGroupData {
    name: string;
    description?: string;
    memberUsernames: string[];
}

export interface CreateGroupResponse {
    success: boolean;
    message: string;
    data: {
        message: string;
        group: Group;
    };
}

export interface GetGroupsResponse {
    success: boolean;
    message: string;
    data: {
        group: Array<{
            id: string;
            groupId: string;
            userId: string;
            joinedAt: string;
            group: Group;
        }>;
        success: boolean;
    };
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
    createdAt: string;
    updatedAt: string;
    paidBy: User;
}

export interface GroupDetails {
    group: Group[];
    recentExpenses: Expense[];
}

export interface GetGroupDetailsResponse {
    success: boolean;
    message: string;
    data: GroupDetails;
}

export interface AddMemberData {
    username: string;
}

export interface AddMemberResponse {
    success: boolean;
    message: string;
    data: {
        message: string;
        data: Group;
    };
}

export interface DeleteGroupResponse {
    success: boolean;
    message: string;
    data: {
        success: boolean;
        deletedGroup: {
            id: string;
            name: string;
            description: string;
        };
    };
}
