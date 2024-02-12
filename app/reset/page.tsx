import ResetPassword from "@/components/login/ResetPassword/ResetPassword";

export default function Login({
    searchParams,
}: Readonly<{
    searchParams: { message: string };
}>) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 border-2 border-cyberBorder rounded-xl p-6">
                <ResetPassword />
                {searchParams?.message && (
                    <p className="mt-4 p-2 bg-foreground/10 border rounded-lg text-foreground text-center text-sm text-white">
                        {searchParams.message}
                    </p>
                )}
            </div>
        </div>
    );
}
