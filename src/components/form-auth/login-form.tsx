"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {type SignInInput } from 'aws-amplify/auth';

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
import {
    TabsContent,
} from "@/components/ui/tabs"
import ErrorForm from './error'
import { handleSignIn } from '@/action/sign-in';
import { useRouter } from 'next/navigation';
import SuccessForm from './success';
import useCurrentUser from '@/hooks/use-current';
import { PROTECTED_ROUTE } from '@/constants/route';

function LoginForm() {
    // check if the user is already logged in
    const router = useRouter()
    const {user , error : errorCurrent} = useCurrentUser()
    if (user.username) {
        router.push(PROTECTED_ROUTE.DASHBOARD)
    }
    
    // if (!errorCurrent) {
    //     router.push('/dashboard')
    // }

    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const emailRef = React.useRef<HTMLInputElement>(null)
    const passwordRef = React.useRef<HTMLInputElement>(null)

    const handleLogin = () => {
        // validate email and password
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            setError('Email and password are required')
            return
        }
        setIsLoading(true)

        const loginParams : SignInInput = {
            username: emailRef.current?.value,
            password: passwordRef.current?.value
        }
        handleSignIn(loginParams)
            .then((signInOutput) => {
                setSuccess('Login success')
                setIsLoading(false)
                router.push(PROTECTED_ROUTE.DASHBOARD)
                
            })
            .catch((error) => {
                setError('Email or password is not correct')
                setIsLoading(false)
            })
    }
    return (
        <div>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" ref={emailRef} placeholder="mail@examle.com" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password"ref={passwordRef} placeholder="*******" />
                        </div>
                        <div className="c">
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
                            onClick={handleLogin}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    <span>
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </div>
    )
}

export default LoginForm