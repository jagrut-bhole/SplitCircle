import React from 'react'
import { useCurrentUser } from '@/hooks/useAuth'

function UserProfile() {

  const {data : user , isLoading} = useCurrentUser();

  if(isLoading) return <div>Loading....</div>
  if (!user) return <div>Not Logged In</div>

  return (
    <div>Hello , {user.name}</div>
  )
}

export default UserProfile