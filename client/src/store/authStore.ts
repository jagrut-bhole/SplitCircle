import {create} from 'zustand';
import {persist} from 'zustand/middleware'

interface User {
    id : string;
    username : string;
    email : string;
    name : string;
    createdAt : string;
    updatedAt : string;
}

interface AuthState {
    user : User | null;
    isAuthenticated : boolean;
    setAuth : (user : User) => void; // updates the user and auth status
    logout : () => void // clears the user and auth status
}



export const useAuthStore = create<AuthState>() (
    //persist -> saves to localstorage , reloads it automatically when app refreshes
    persist (

        //initial state when the user is not authenticated so isAuthenticated is false
        (set) => ({
            user : null,
            isAuthenticated : false,

            setAuth : (user) => {
                // No need to store token - it's in httpOnly cookies
                set({
                    user,
                    isAuthenticated :  !!user 
                // if user exists -> true 
                // if user is null -> false
            })
        },
            logout : () => set({
                user : null,
                isAuthenticated : false
            })
        }),
            {
                name : 'authStore' //this is the localStorage key
            }
    )
)
// persist => survives page refresh

//this stores the auth status and the user information and provided the setUser function to update the user information in the store and logout function