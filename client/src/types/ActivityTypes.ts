export interface Activity {
    id: string;
    note: string;
    userId: string;
    groupId: string | null;
    expenseId: string | null;
    settlementId: string | null;
    metadata: Record<string, unknown> | null;
    createdAt: string;
}

export interface GetActivityFeedResponse {
    success: boolean;
    message: string;
    data: Activity[];
}
