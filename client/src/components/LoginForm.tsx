import { useLogin } from '@/hooks/useLogin'
import React from 'react'

function LoginForm() {

    const loginMutation = useLogin();
    
    const handleSubmit  = (email : string,password : string) => {

        loginMutation.mutate({email,password})
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="email" />
            <input type="password" />
            <button disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Loggging in..." : "Login"}
            </button>
            {
                loginMutation.isError && (
                    <div>Error: {loginMutation.error.message}</div>
                )
            }
        </form>
    </>
  )
}

export default LoginForm