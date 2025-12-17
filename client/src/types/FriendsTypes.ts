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
export interface UserOwedAmountResponse {
    message : string;
    success : boolean;
    data : {
        totalOwedToUser : number;
        totalUserOwes : number;
    }
}

export interface Split {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  percentage: number | null;
  user: User;
}

export type SplitType = 'EQUAL' | 'UNEQUAL' | 'PERCENTAGE';

export interface FriendExpense {
  id: string;
  title: string;
  note: string | null;
  currency: string;
  amount: number;
  date: string;
  paidById: string;
  groupId: string | null;
  splitType: SplitType;
  scenario: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  paidBy: User;
  splits: Split[];
}

export interface GetFriendDetails {
    success : boolean;
    message : string;
    data : {
        friend : User,
        expenses : FriendExpense[],
        balance : number,
        expenseCount : number
    };
}
