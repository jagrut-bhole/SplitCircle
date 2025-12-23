export declare class EmailServices {
    private transporter;
    constructor();
    private createTransporter;
    private verifyConnection;
    private sendEmail;
    sendWelcomeEmail(name: string, email: string, username: string): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    sendEmailChangeNotification(name: string, email: string, newEmail: string): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    sendPasswordChangeConfirmation(name: string, email: string): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    sendFriendAddedEmail(frienAddedName: string, friendAddedEmail: string, addedByName: string, addedByUsername: string): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    sendGroupInviteEmail(invitedUsername: string, invitedEmail: string, groupName: string, invitedByName: string, invitedByUsername: string): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    sendSettlementEmail(recipient: {
        name: string;
        email: string;
    }, settlement: {
        amount: number;
        isGroupSettlement: boolean;
        groupName?: string;
        friendName?: string;
    }, paidBy: {
        name: string;
        username: string;
    }): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
}
//# sourceMappingURL=email.services.d.ts.map