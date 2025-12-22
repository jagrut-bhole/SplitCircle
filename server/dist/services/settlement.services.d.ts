export declare class SettlementService {
    getFriendSettlementInfo(currentUserId: string, friendId: string): Promise<{
        friend: {
            id: string;
            username: string;
            name: string;
        };
        balance: number;
        message: string;
        youOwe: number;
        theyOwe: number;
        isSettled: boolean;
    }>;
    settleFriendSettlement(currentUserId: string, friendId: string, amount: number, note: string): Promise<{
        settlement: {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            title: string;
            note: string;
            currency: string;
            paidById: string;
            groupId: string | null;
            splitType: import("../generated/prisma/enums.js").SplitType;
            scenario: string | null;
            createdById: string;
        };
        oldBalance: number;
        newBalance: number;
        isFullSettlement: boolean;
        remainingAmount: number;
    }>;
    groupSettlementInfo(currentUserId: string, groupId: string): Promise<{
        group: {
            id: string;
            name: string;
        };
        yourDebts: {
            user: {
                id: string;
                username: string;
                name: string;
            };
            youOwe?: number;
            theyOwe?: number;
            message: string;
        }[];
        totalYouOwe: number;
        totalOwedToYou: number;
        netPosition: number;
    }>;
    settleGroupDebt(currentUserId: string, groupId: string, recipientId: string, amount: number, note?: string): Promise<{
        settlement: {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            title: string;
            note: string;
            currency: string;
            paidById: string;
            groupId: string | null;
            splitType: import("../generated/prisma/enums.js").SplitType;
            scenario: string | null;
            createdById: string;
        };
        paidTo: {
            id: string;
            username: string;
            name: string;
        };
        amountPaid: number;
        remainingDebt: number;
        isFullSettlement: boolean;
    }>;
}
//# sourceMappingURL=settlement.services.d.ts.map