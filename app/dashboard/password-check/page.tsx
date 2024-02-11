import Heading from "@/components/dashboard/Heading"
import PasswordChecker from "@/components/password-breach/password-checker"

export default function Page() {
    return (
        <div className="w-full">
            <div className="max-w-[60rem] mx-auto">
                <Heading
                    title="Vérification mot de passe"
                    description="Vérifiez si votre mot de passe a été compromis"
                    align="text-left"
                    isPremium={false}
                />

                <hr className="dark:bg-[#343839] h-0.5" />

                <PasswordChecker />
            </div>
        </div>
    )
}
