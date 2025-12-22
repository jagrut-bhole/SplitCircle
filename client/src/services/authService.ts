import { api } from "./api";

import type { 
    RegisterData, 
    LoginData, 
    AuthResponse, 
    User, 
    ChangeEmailData, 
    ChangePasswordData 
} from "@/types/AuthTypes";

interface UserResponse {
    user: User;
}

export const authService = {
    register : async (data : RegisterData):Promise<AuthResponse> => {
        const response = await api.post('/auth/register',data);
        return response as unknown as AuthResponse;
    },

    login : async (data : LoginData) : Promise<AuthResponse> => {
        const response = await api.post('/auth/login',data);
        return response as unknown as AuthResponse;
    },

    logout : async ():Promise<void> => {
        await api.post('/auth/logout');

        localStorage.removeItem('user');
    },

    getCurrentUser : async ():Promise<User> => {
        const response = await api.get('/auth/refresh') as unknown as UserResponse;

        return response.user;
    },

    changeEmail: async (data: ChangeEmailData): Promise<User> => {
        const response = await api.patch('/auth/change-email', data) as unknown as UserResponse;
        return response.user;
    },

    changePassword: async (data: ChangePasswordData): Promise<void> => {
        // Server expects { oldPassword, newPassword }
        const payload = {
            oldPassword: (data as any).currentPasssword || (data as any).oldPassword,
            newPassword: data.newPassword
        };
        await api.patch('/auth/change-password', payload);
    },


}