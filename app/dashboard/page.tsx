"use client";

import { AsteriskSquare } from "lucide-react";

import CardFeature from "@/components/dashboard/CardFeature";
import Heading from "@/components/dashboard/Heading";

export default function Page() {
    return (
        <>
            <Heading
                title="Protégez votre identité en ligne"
                description="N'attendez pas de perdre votre sécurité."
            />
            <div className="max-w-[30rem] mx-auto">
                <CardFeature
                    title="Vérifier mon mot de passe"
                    description="Vérifiez si votre mot de passe a été compromis"
                    icon={<AsteriskSquare className="text-white" />}
                    href="/password-check"
                />
            </div>
        </>
    );
}

