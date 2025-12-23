import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
    children : React.ReactNode;
}

export const ProtectedRouter = ({children} : ProtectedRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/' replace />
    }

    return <>{children}</>
};
//wraps the protected pages in ProtectedRouter and checks if the user is authenticated and if not the redirected to login