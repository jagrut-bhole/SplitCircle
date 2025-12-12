import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { data, useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

// useQuery for fetching the data

//note => queryKey: ['auth', 'currentUser'] - Unique identifier for this query, react query uses this to cache the data, we can access this data anywhere using this keys
// note => queryFn - Function that fetches the data, calls API from the backend

export const useCurrentUser = () => {
    return useQuery ({
        queryKey : ['auth' , 'currentUser'],
        queryFn : authService.getCurrentUser,
        retry : false,
        staleTime : 10 * 60 * 1000
    })
}

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn : authService.register,

        onSuccess : (data) => {
            localStorage.setItem('user',JSON.stringify(data.user));

            queryClient.setQueryData(['suth','currentUser'],data.user);

            navigate('/dashboard');
        },
        onError : (error) => {
            console.log("Register Falied: ",error.message);
        }
    })
}

export const useLogin = () => {
    const navigate = useNavigate();


    return useMutation({
        mutationFn : authService.login,

        onSuccess : (data) => {
            localStorage.setItem('user',JSON.stringify(data.user));

            queryClient.setQueryData(['auth','currentUser'],data.user);

            navigate('dashboard');
        },
        onError : (error) => {
            console.log("Login Failed: ",error.message);
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn : authService.logout,

        onSuccess : () => {
            localStorage.removeItem('user');

            queryClient.clear();

            navigate('/');
        }
    })
}

export const changeEmail = () => {

    return useMutation({
        mutationFn : authService.changeEmail,

        onSuccess : (updatedUser) => {
            queryClient.setQueryData(['auth','currentUser'],updatedUser);

            localStorage.setItem('user',JSON.stringify(updatedUser));

            console.log('Email changed successfully');
        }
    })
}

export const changePassword = () => {
    return useMutation({
        mutationFn: authService.changePassword,

        onSuccess : () => {
            console.log('Password changed successfully');
        }
    })
}