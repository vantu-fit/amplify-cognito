"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import "@/utils/config"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ErrorForm from './error'
import { InputOTPControlled } from './input-otp'
import { handleSignUpConfirmation } from '@/action/sign-up'
import {  type ConfirmSignUpInput } from 'aws-amplify/auth';
import SuccessForm from './success'
import { handleAutoSignIn } from '@/action/sign-in'
import { useRouter } from 'next/navigation'
import useCurrentUser from '@/hooks/use-current'
import { PROTECTED_ROUTE } from '@/constants/route'

function ConfirmForm({email} : {email: string}) {
    const router = useRouter() 
    const {error : errorCurrent} = useCurrentUser()
    if (!errorCurrent) {
        router.push(PROTECTED_ROUTE.DASHBOARD)
    }
     
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [code, setCode] = React.useState('') // [1]
    const handleConfirm = () => {
        // validate the form
        // if the form is valid, call the handleSignUp function
        // if the form is not valid, show the error message
        if (!code) {
            setError('Code is required')
            return
        }
        setIsLoading(true)
        console.log(code)
        const signUpConfirmParams : ConfirmSignUpInput = {
            confirmationCode : code,
            username : email,
        } 
        handleSignUpConfirmation(signUpConfirmParams)
        .then((data) => {
            setSuccess('You have successfully registered')
            if (data.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
                // redirect to the login page
                handleAutoSignIn()
                .then((data) => {
                    console.log('auto sign in success', data)
                    router.push(PROTECTED_ROUTE.DASHBOARD)
                    setIsLoading(false)  
                })
                .catch((error) => {
                    console.log('error', error)
                    setError(error.message)
                })
            } else {
                setIsLoading(false)
            }
        })
    }

    return (
        <div className='max-w-[600px]'>
            <Card>
                <CardHeader>
                    <CardTitle>Confirm Code</CardTitle>
                    <CardDescription>
                        Make changes to your account here. Click save when done.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="mail@examle.com" value={email} />
                    </div>
                    <div className="space-y-1">
                        <Label >Code</Label>
                        <InputOTPControlled code={code} setCode={setCode}/>
                    </div>
                    <div className="c">
                        {/* <ErrorForm message='Password or Email is not correct' /> */}
                        {error && <ErrorForm message={error} />}
                        {success && <SuccessForm message={success} />}
                    </div>
                    <div className="text-xs">
                        if you don`t remeber your password, you can reset it <a href="#" className="text-blue-500">here</a>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className={isLoading ? "cursor-not-allowed" : ""}
                        onClick={handleConfirm}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} />
                                <span>
                                    Loading...
                                </span>
                            </>
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ConfirmForm