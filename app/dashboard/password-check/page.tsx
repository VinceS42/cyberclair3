import Heading from "@/app/components/dashboard/Heading"

export default function Page() {
    return (
        <div className="w-full">
            <div className="max-w-[60rem] mx-auto">
                <Heading
                    title="Vérification mot de passe"
                    description="Vérifiez si votre mot de passe a été compromis"
                    align="text-left"
                />
            </div>
        </div>
    )
}
