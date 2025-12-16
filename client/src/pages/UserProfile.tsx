import { useAuthStore } from "@/store/authStore";
import { ArrowLeft, Mail, Lock, LogOut, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { authService } from "@/services/authService";
import { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { AuthResponse } from "@/types/AuthTypes";

export const UserProfile = () => {
    const user = useAuthStore((state) => state.user);
    const setAuth = useAuthStore((state) => state.setAuth);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    
    // Email change modal states
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [showEmailPassword, setShowEmailPassword] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    
    // Password change modal states
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    async function handleLogout() {
        logout();
        await authService.logout();
        navigate("/");  
    }

    function handleOnBack() {
        navigate('/dashboard');
    }

    function openEmailModal() {
        setNewEmail("");
        setEmailPassword("");
        setShowEmailPassword(false);
        setIsEmailModalOpen(true);
    }

    function openPasswordModal() {
        setOldPassword("");
        setNewPassword("");
        setShowOldPassword(false);
        setShowNewPassword(false);
        setIsPasswordModalOpen(true);
    }

    async function handleEmailChange() {
        if (!newEmail.trim() || !emailPassword.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsEmailLoading(true);

        try {
            const updatedUser = await authService.changeEmail({
                newEmail: newEmail.trim(),
                password: emailPassword.trim()
            });

            setAuth(updatedUser);
            
            toast.success("Email changed successfully!");
            setIsEmailModalOpen(false);
            setNewEmail("");
            setEmailPassword("");
        } catch (error) {
            console.error("Error while changing email:", error);
            const errorMessage = error as AxiosError<AuthResponse>
            toast.error(errorMessage.response?.data.message || "Failed to change email");
        } finally {
            setIsEmailLoading(false);
        }
    }

    async function handlePasswordChange() {
        if (!oldPassword.trim() || !newPassword.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters");
            return;
        }

        if (oldPassword === newPassword) {
            toast.error("New password cannot be the same as old password");
            return;
        }

        setIsPasswordLoading(true);

        try {
            await authService.changePassword({
                currentPasssword: oldPassword.trim(),
                newPassword: newPassword.trim()
            });

            toast.success("Password changed successfully!");
            setIsPasswordModalOpen(false);
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Error while changing password:", error);
            const axiosError = error as AxiosError<AuthResponse>;

            const errorMessage = axiosError.response?.data.message
            toast.error(errorMessage);
        } finally {
            setIsPasswordLoading(false);
        }
    }

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto animate-fade-in min-h-full">
       {/* Back Link */}
       <div className="mb-8">
         <button 
           onClick={() => handleOnBack()}
           className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors font-medium group px-4 py-2 hover:bg-white rounded-lg hover:cursor-pointer"
         >
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           Back to Dashboard
         </button>
       </div>

       <div className="bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden">
          
          <div className="px-8 md:px-12 pb-12 relative">

             <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 mt-10">
                <div>
                   <h1 className="text-3xl font-bold text-slate-900">{user?.name}</h1>
                   
                </div>
                
             </div>

             <div className="grid gap-8 max-w-3xl">
                
                {/* Username Section */}
                <div className="group">
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Username</label>
                   <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-200 group-hover:border-indigo-200 transition-colors">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-700 flex-1">@{user?.username || user?.name.toLowerCase().replace(/\s+/g, '')}</span>
                   </div>
                </div>

                {/* Email Section */}
                <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                   <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="flex-1 flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                           <Mail className="w-5 h-5" />
                         </div>
                         <span className="font-medium text-slate-700">{user?.email}</span>
                      </div>
                      <Button 
                        onClick={openEmailModal}
                        className="px-6 py-6 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 whitespace-nowrap hover:cursor-pointer"
                      >
                        Change Email
                      </Button>
                   </div>
                </div>

                 {/* Password Section */}
                <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Password</label>
                   <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="flex-1 flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                         <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
                           <Lock className="w-5 h-5" />
                         </div>
                         <span className="font-black text-slate-400 tracking-[0.2em] text-lg flex-1">••••••••••••••••</span>
                      </div>
                      <Button 
                        onClick={openPasswordModal}
                        className="px-6 py-6 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 whitespace-nowrap hover:cursor-pointer"
                      >
                        Change Password
                      </Button>
                   </div>
                </div>

             </div>

             <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm"></span>
                <Button 
                  onClick={() => handleLogout()}
                  className="flex items-center gap-2 px-6 py-6 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 hover:shadow-lg hover:shadow-red-100 transition-all active:scale-[0.98] hover:cursor-pointer"
                >
                   <LogOut className="w-5 h-5" />
                   Log Out
                </Button>
             </div>

          </div>
       </div>

       {/* Change Email Modal */}
       <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
            <DialogDescription>
              Enter your new email address and your current password to confirm the change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="newEmail" className="text-sm font-medium">
                New Email Address
              </label>
              <Input
                id="newEmail"
                type="email"
                placeholder="your.new@email.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={isEmailLoading}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="emailPassword" className="text-sm font-medium">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="emailPassword"
                  type={showEmailPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={emailPassword}
                  onChange={(e) => setEmailPassword(e.target.value)}
                  disabled={isEmailLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowEmailPassword(!showEmailPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showEmailPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEmailModalOpen(false)}
              disabled={isEmailLoading} >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleEmailChange}
              disabled={isEmailLoading}
            >
              {isEmailLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your account security.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="oldPassword" className="text-sm font-medium">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={isPasswordLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isPasswordLoading}
                  className="pr-10"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
              disabled={isPasswordLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handlePasswordChange}
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    )
}
