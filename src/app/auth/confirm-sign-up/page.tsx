import ConfirmForm from '@/components/form-auth/confirm-code'
import { AUTH_ROUTE } from '@/constants/route'
import { redirect} from 'next/navigation'
import React from 'react'

function Page({searchParams} : {searchParams?: {email?: string}}) {
    if (!searchParams) {
        redirect(AUTH_ROUTE.LOGIN)
    }
    const email = searchParams.email

    if (!email) {
        redirect(AUTH_ROUTE.LOGIN)
    }

    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <ConfirmForm email={email}/>
        </div>
    )
}

export default Page