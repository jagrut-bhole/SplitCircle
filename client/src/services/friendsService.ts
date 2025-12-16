import { api } from "./api";
import type {
    SearchUserResponse,
    AddFriendResponse,
    GetFriendsResponse,
    UserOwedAmountResponse,
} from "@/types/FriendsTypes";

export const friendsService = {
    
    searchUsers: async (username: string): Promise<SearchUserResponse> => {
        const response = await api.get(`/user/search?username=${username}`);
        return response as unknown as SearchUserResponse;
    },

    addFriend: async (username: string): Promise<AddFriendResponse> => {
        const response = await api.post('/user/add-friend', { username });
        return response as unknown as AddFriendResponse;
    },

    getFriends: async (): Promise<GetFriendsResponse> => {
        const response = await api.get('/user/friends');
        return response as unknown as GetFriendsResponse;
    },

    userOwedAmount : async() : Promise<UserOwedAmountResponse> => {
        const response = await api.get('/user/total-balance');
        return response as unknown as UserOwedAmountResponse;
    }

};
