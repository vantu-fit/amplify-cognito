import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "./login-form"
import Register from "./regiter-form"

export function TabsLogin() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Login</TabsTrigger>
                <TabsTrigger value="password">Register</TabsTrigger>
            </TabsList>
            <LoginForm />
            <Register />
        </Tabs>
    )
}
