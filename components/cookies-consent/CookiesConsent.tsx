"use client";

import { hasCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookiesConsent() {
    const [showConsent, setShowConsent] = useState(true);

    useEffect(() => {
        setShowConsent(hasCookie("localConsent"));
    }, []);

    const acceptCookie = () => {
        setShowConsent(true);
        setCookie("localConsent", true, {});
    };

    if (showConsent) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-slate-700 bg-opacity-70 z-[5000]">
            <div className="fixed bottom-0 left-0 flex items-center justify-center px-4 py-8 bg-zinc-600 text-white">
                <span className="text-white text-base mr-16">
                    Ce site utilise des cookies pour améliorer votre expérience
                    utilisateur, réaliser des analyses de trafic, et offrir un
                    contenu personnalisé. En poursuivant votre navigation sur ce
                    site, vous acceptez l&apos;utilisation de cookies pour les
                    objectifs décrits.
                    <Link
                        href={"/policy-consent"}
                        className="font-bold text-blue-500"
                    >
                        En savoir plus.
                    </Link>
                    <button
                        className="m-3 py-2 px-8 rounded bg-blue-500 text-white"
                        onClick={() => acceptCookie()}
                    >
                        Accepter
                    </button>
                </span>
            </div>
        </div>
    );
}
