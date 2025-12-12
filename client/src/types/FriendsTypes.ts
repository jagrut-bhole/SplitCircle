export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

export interface SearchUserResponse {
    success: boolean;
    data: {
        user: User;
    };
}

export interface AddFriendData {
    username: string;
}

export interface AddFriendResponse {
    success: boolean;
    message: string;
    data: {
        friendship: {
            id: string;
            user1Id: string;
            user2Id: string;
            createdAt: string;
        };
    };
}

export interface Friend {
    id: string;
    name: string;
    username: string;
    email: string;
    balance: number;
    friendshipCreatedAt: string;
}

export interface FriendsSummary {
    totalFriends: number;
    youOwe: number;
    youAreOwed: number;
}

export interface GetFriendsResponse {
    success: boolean;
    message: string;
    data: {
        friends: Friend[];
        summary: FriendsSummary;
    };
}
