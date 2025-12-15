import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import React from "react";

interface UnProtectedRouteProps {
    children : React.ReactNode
}

export const PublicRoute = ({children} : UnProtectedRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace/>
    }

    return <>{children}</>
}