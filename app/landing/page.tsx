// app/landing/page.tsx
"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/assets/img/logo.svg";
import cyber from "@/public/assets/img/cybersecu.png";

export default function Page() {
    return (
        <>
            <Head>
                <title>CyberClair3 - Protégez votre identité en ligne</title>
                <meta
                    name="description"
                    content="CyberClair3 est une plateforme SaaS qui aide à gérer et à protéger votre identité sur Internet."
                />
                <meta
                    name="keywords"
                    content="identité en ligne, protection de la vie privée, suppression de contenu, gestion de la réputation, sécurité en ligne"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <div className="container mx-auto px-4">
                <header className="text-center py-10">
                    <h1 className="text-4xl font-bold">
                        <Link
                            href="/dashboard"
                            className="flex flex-row justify-center items-center  gap-x-2"
                        >
                            <Image
                                src={logo}
                                alt="logo-cyberclaire"
                                className="w-20 h-20 lg:items-center"
                            />
                            <h1 className="xl:block hidden text-white text-2xl font-bold">
                                CyberClair3 - Votre Bouclier de Confidentialité
                                en Ligne
                            </h1>
                        </Link>
                    </h1>
                    <p className="mt-2 text-xl text-white">
                        Protégez, gérez et contrôlez votre identité numérique en
                        toute simplicité
                    </p>
                </header>
                <main>
                    <section className="my-8">
                                          
                        <div className="flex m-8 justify-center w-full">
                            <Image
                                src={cyber}
                                alt="cyber-securité"
                                className="w-80 h-80 justify-center lg:items-center"
                            />
                        </div>
                        <h2 className="text-3xl font-semibold mb-5 text-white">
                            Protégez votre vie privée
                        </h2>
                        <p className="text-lg text-white">
                            Avec CyberClair3, prenez le contrôle de votre
                            présence en ligne et protégez vos informations
                            personnelles des regards indiscrets. Découvrez nos
                            outils de surveillance de l'identité, de suppression
                            de contenu indésirable et de gestion de votre
                            réputation en ligne pour naviguer sur Internet en
                            toute sécurité.
                        </p>
                        <Link
                            href="/dashboard"
                            className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Découvrez CyberClair3
                        </Link>
                    </section>
                    <section className="my-8">
                        <h2 className="text-3xl font-semibold mb-5 text-white">
                            Nos services
                        </h2>
                        <ul className="list-disc list-inside text-lg text-white">
                            <li>
                                Suppression efficace de contenu indésirable sur
                                Internet.
                            </li>
                            <li>
                                Protection avancée de la vie privée et de la
                                sécurité en ligne.
                            </li>
                            <li>
                                Analyse et gestion proactive de votre réputation
                                numérique.
                            </li>
                            <li>
                                Outils conviviaux pour une gestion simplifiée de
                                votre identité en ligne.
                            </li>
                        </ul>
                        <p className="mt-4 text-white">
                            Rejoignez les nombreux utilisateurs qui font
                            confiance à CyberClair3 pour sécuriser leur présence
                            en ligne. Prenez dès maintenant le contrôle de votre
                            identité numérique.
                        </p>
                    </section>
                </main>

                <footer className="py-10 border-t mt-10 text-center text-white">
                    © 2024 CyberClair3. Tous droits réservés.
                </footer>
            </div>
        </>
    );
}
