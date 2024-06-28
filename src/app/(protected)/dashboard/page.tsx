"use client"
import useCurrentUser from '@/hooks/use-current'
import React from 'react'
import "@/utils/config"
import LogoutButton from '@/components/form-auth/logout-button'
import { redirect } from 'next/navigation'
import { AUTH_ROUTE } from '@/constants/route'
import "@/utils/config"

function Page() {
    const { user, error, loading } = useCurrentUser()
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        redirect(AUTH_ROUTE.LOGIN)
    }

    return (
        <div> 
            {user.userId}
            <LogoutButton />
        </div>
        
    )
}

export default Page