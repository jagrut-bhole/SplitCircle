import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link ,useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Loader2 ,Eye, EyeOff } from "lucide-react";


export const LoginPage = () => {
    const [email , setEmail] =  useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading , setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setAuth } = useAuthStore()

    const onHandleSubmit = async(e : React.FormEvent) => {
      e.preventDefault();

      setIsLoading(true);

      try {
        const response = await authService.login({
          email : email.trim(),
          password : password.trim()
        });

        if (response.user) {
          setAuth(response.user);
        }

        toast.success(response.message || 'Login SuccessFull!!');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

            } catch (error : any) {
                console.log("Login Error: ", error);
                let errorMessage = error.response?.data?.message || "Login Failed. Please try again!!";
                toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Start splitting expenses with friends
                    </p>
                </div>
                
                {/* form  */}
                <form onSubmit={onHandleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                placeholder="Enter your email.." />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    id="password" 
                                    required 
                                    minLength={8}
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                    placeholder="••••••••" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Must be at least 8 characters
                            </p>
                        </div>

                    </div>
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                            Sign up
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}