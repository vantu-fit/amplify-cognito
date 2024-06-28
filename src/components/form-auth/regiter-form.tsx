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
import {
    TabsContent,
} from "@/components/ui/tabs"
import SuccessForm from './success'
import { SignUpParameters, handleSignUp } from '@/action/sign-up'
import ErrorForm from './error'
import { useRouter } from 'next/navigation'
import useCurrentUser from '@/hooks/use-current'
import { AUTH_ROUTE, PROTECTED_ROUTE } from '@/constants/route'

function Register() {
    const router = useRouter()
    const {user , error : errorCurrent} = useCurrentUser()
    if (user.username) {
        router.push(PROTECTED_ROUTE.DASHBOARD)
    }
    
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')

    const nameRef = React.useRef<HTMLInputElement>(null)
    const emailRef = React.useRef<HTMLInputElement>(null)
    const passwordRef = React.useRef<HTMLInputElement>(null)

    const handleRegister = () => {
        // validate the form
        // if the form is valid, call the handleSignUp function
        // if the form is not valid, show the error message
        if (!nameRef.current?.value) {
            setError('Name is required')
            return
        }
        if (!emailRef.current?.value) {
            setError('Email is required')
            return
        }
        if (!passwordRef.current?.value) {
            setError('Password is required')
            return
        }

        const signUpParams: SignUpParameters = {
            name: nameRef.current?.value,
            password: passwordRef.current?.value,
            email: emailRef.current?.value,
        }

        setError('')
        setIsLoading(true)
        handleSignUp(signUpParams)
        .then((data) => {
            setSuccess('You have successfully registered')
            if (data.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                // redirect to the confirm sign up page
                // redirect('/confirm-sign-up')
                // redirect(`/auth/confirm-sign-up?email=${emailRef.current?.value}`)
                router.push(`${AUTH_ROUTE.CONFIRM}?email=${emailRef.current?.value}`)
            }
        })
        .catch((error) => {
            setError(error.message)
            setIsLoading(false)
        })
        // handleSignUp({})
    }
    return (
        <div>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you will be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" ref={nameRef} type="text" placeholder='Your Name' />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" ref={emailRef} placeholder="mail@examle.com" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">password</Label>
                            <Input id="password" ref={passwordRef} placeholder="*******" />
                        </div>
                        <div className="c">
                            {/* <SuccessForm message='You have successfully registered' /> */}
                            {error && <ErrorForm message={error} />}
                            {success && <SuccessForm message={success} />}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className={isLoading ? "cursor-not-allowed" : ""}
                            onClick={handleRegister}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    <span>
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </div>
    )
}

export default Register