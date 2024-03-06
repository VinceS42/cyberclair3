import AuthForm from "@/components/login/AuthForm";
import { signInUser, signUp } from "@/lib/service";


export default function Login({
    searchParams,
}: Readonly<{
    searchParams: { message: string };
}>) {
    const handleSignIn = async (formData: FormData) => {
        "use server";    
        await signInUser(formData);
    };

    const handleSignUp = async (formData: FormData) => {
        "use server";
        await signUp(formData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 border-2 border-cyberBorder rounded-xl p-6">
                <AuthForm signIn={handleSignIn} signUp={handleSignUp} />
                {searchParams?.message && (
                    <p className="mt-4 p-2 bg-foreground/10 border rounded-lg text-foreground text-center text-sm text-white">
                        {searchParams.message}
                    </p>
                )}
            </div>
        </div>
    );
}
