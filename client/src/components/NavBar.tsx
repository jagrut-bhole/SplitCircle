import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { User, LogOut, LayoutDashboard, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export function NavBar() {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    async function handleLogout() {
        logout();
        await authService.logout();
        navigate('/');
    }

    const handleActivityClick = () => {
        toast.success('This feature coming soon!!');
        // setTimeout(() => {
        //     navigate('/activity-logs');
        // }, 2000);
    }

    return (
        <header className={cn(
            'sticky mt-5 z-50',
            'mx-auto w-full max-w-7xl rounded-2xl border shadow',
            'bg-background/95 supports-backdrop-filter:bg-background/80 backdrop-blur-lg',
        )}>
            <nav className="mx-auto flex items-center justify-between p-3">
                <Link to='/'>
                    <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
                        <NavbarLogo />
                    </div>
                </Link>
                <div className="flex gap-4">
                    {
                        isAuthenticated ? (
                            <div className="flex items-center gap-8">
                                <button onClick={() => handleActivityClick()} className="bg-white text-black p-2 rounded-full relative hover:cursor-pointer">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="rounded-full overflow-hidden p-0 border-2 hover:border-primary transition-colors"
                                            aria-label="Open account menu"
                                        >
                                            <img
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <DropdownMenuLabel className="flex items-start gap-3">
                                            <img
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                                alt="Avatar"
                                                width={32}
                                                height={32}
                                                className="shrink-0 rounded-full"
                                            />
                                            <div className="flex min-w-0 flex-col">
                                                <span className="truncate text-sm font-medium text-foreground">
                                                    {user?.username || 'User'}
                                                </span>
                                                <span className="truncate text-xs font-normal text-muted-foreground">
                                                    {user?.email || 'user@example.com'}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                                                <LayoutDashboard size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                                                <span>Dashboard</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                                <User size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button className="hover:cursor-pointer" variant="ghost">Login</Button>
                                </Link>
                                <Link to='/register'>
                                    <Button className="hover:cursor-pointer" variant="outline">Register</Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export const NavbarLogo = () => {
    return (
        <div className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black">
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-600"
            >
                {/* Circle representing the group */}
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />

                {/* Rupee symbol in the center */}
                <path
                    d="M11 10 L20 10 M11 14 L18 14 M11 18 L20 26"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18 14 Q20 14 20 16 Q20 18 18 18 L11 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Split arrows pointing outward in different directions (not clock-like) */}
                <path
                    d="M16 4 L16 7 M14 5 L16 4 L18 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M28 16 L25 16 M27 14 L28 16 L27 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 16 L7 16 M5 14 L4 16 L5 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M23 9 L21 11 M24 8 L23 9 L22 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 23 L11 21 M8 24 L9 23 L8 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="text-xl font-bold tracking-tight text-slate-800">
                Split<span className="text-[#059669]">Circle</span>
            </span>
        </div>
    )
}