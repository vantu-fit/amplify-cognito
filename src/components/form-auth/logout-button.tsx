import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { handleSignOut } from '@/action/sign-out'
import { useRouter } from 'next/navigation'
import { set } from 'react-hook-form'
import { AUTH_ROUTE } from '@/constants/route'

function LogoutButton() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const handleLogout = () => {
        setIsLoading(true)
        handleSignOut()
        .then(() => {
            setIsLoading(false)
            router.push(AUTH_ROUTE.LOGIN)
        })
        .catch((error) => {
            setError(error.message)
            setIsLoading(false)
            
        })
    }
    return (
        <Button
            className={isLoading ? "cursor-not-allowed" : ""}
            onClick={handleLogout}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>
                        Loading...
                    </span>
                </>
            ) : (
                "Logout"
            )}
        </Button>
    )
}

export default LogoutButton