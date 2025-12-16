export declare class UserService {
    extractCurrentUserId(username: string): Promise<string>;
    getUserIdUsernames(usernames: string[]): Promise<Map<string, string>>;
    searchUserByUsername(friendUsername: string, currentUserId: string): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
            username: string;
        };
    } | null>;
    checkFriendshipExists(userId1: string, userId2: string): Promise<{
        exists: boolean;
        friendship: {
            id: string;
            createdAt: Date;
            user1Id: string;
            user2Id: string;
        };
    } | {
        exists: boolean;
        friendship: null;
    }>;
    addFriend(currentUserId: string, friendUserId: string): Promise<{
        message: string;
        friendship: {
            id: string;
            createdAt: Date;
            user1Id: string;
            user2Id: string;
        };
        balance: {
            id: string;
            user1Id: string;
            user2Id: string;
            amount: number;
            lastUpdated: Date;
        };
    }>;
    getAllFriends(currentUserId: string): Promise<{
        friends: any[];
        summary: {
            totalFriends: number;
            youOwe: number;
            youAreOwed: number;
        };
    }>;
    extractNameFromId(userId: string): Promise<string | undefined>;
    getUserDetails(userId: string): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
            username: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    calulateUserOwedAmounts(userId: string): Promise<{
        totalOwedToUser: number;
        totalUserOwes: number;
    }>;
}
//# sourceMappingURL=user.services.d.ts.map