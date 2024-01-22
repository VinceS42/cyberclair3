import { LockOpenIcon } from "@heroicons/react/24/outline"

import CardFeature from "../components/dashboard/CardFeature"
import Heading from "../components/dashboard/Heading"

export default function Page() {
    return (
        <>
            <Heading
                title="Protégez votre identité en ligne"
                description="N'attendez pas de perdre votre sécurité."
            />
            <div className="max-w-[30rem] mx-auto">
                <CardFeature
                    title="Vérification mot de passe"
                    description="Vérifiez si votre mot de passe a été compromis"
                    icon={<LockOpenIcon className="w-6 h-6 text-white" />}
                    href="/password-check"
                />
            </div>
        </>
    )
}
