"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignInForm from "./SignInForm"
import RegisterForm from "./RegisterForm"
import OAuthForm from "./OAuthForm"

export default function AuthForm({
    signIn,
    signUp,
}: Readonly<{
    signIn: (formData: FormData) => Promise<void>
    signUp: (formData: FormData) => Promise<void>
}>) {
    return (
        <div className="w-full space-y-5">
            <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">SignIn</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <SignInForm signIn={signIn} />
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm signUp={signUp} />
                </TabsContent>
            </Tabs>
            <OAuthForm name="Google" />
            <OAuthForm name="Linkedin" />
        </div>
    )
}
