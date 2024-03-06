"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/assets/img/logo.svg";
import cyber from "@/public/assets/img/cybersecu.png";
import { MovingBorderBtn } from "@/components/ui/moving-border";

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
                <header className="text-center py-10 bg-gradient-to-r text-white">
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src={logo}
                            alt="logo-cyberclaire"
                            width={80}
                            height={80}
                        />
                        <h1 className="text-3xl font-bold mt-2">
                            CyberClair3 - Votre Bouclier de Confidentialité en
                            Ligne
                        </h1>
                        <p className="mt-2 text-xl">
                            Protégez, gérez et contrôlez votre identité
                            numérique en toute simplicité
                        </p>
                    </div>
                </header>
                <main>
                    <section className="bg-cyberSecondary text-white p-6 my-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold mb-4">
                            Nos Services
                        </h2>

                        <h3 className="text-2xl font-semibold mt-4">
                            Suppression Efficace de Contenu Indésirable
                        </h3>
                        <p className="text-lg mt-2">
                            Notre plateforme offre une solution proactive dans
                            la lutte contre le contenu indésirable...
                        </p>

                        <h3 className="text-2xl font-semibold mt-4">
                            Pourquoi Choisir CyberClair3 ?
                        </h3>
                        <h4 className="text-xl font-semibold mt-3">
                            Démocratisation de la Cybersécurité
                        </h4>
                        <p className="text-lg mt-2">
                            Chez CyberClair3, nous croyons que la sécurité en
                            ligne devrait être accessible à tous, pas seulement
                            aux experts en technologie. Notre mission est de
                            simplifier la cybersécurité, rendant nos outils
                            intuitifs et faciles à utiliser pour chacun. Notre
                            plateforme SaaS élimine la complexité
                            traditionnellement associée à la gestion de la
                            sécurité en ligne, vous permettant de contrôler
                            facilement votre présence numérique avec confiance
                            et sérénité.
                        </p>

                        <h4 className="text-xl font-semibold mt-3">
                            Une Approche Unique de la Sécurité des Données
                        </h4>
                        <p className="text-lg mt-2">
                            Nous adoptons une approche sans précédent pour la
                            sécurité des données, en intégrant les dernières
                            technologies de chiffrement et de protection de la
                            vie privée dès la conception de nos services. Cela
                            garantit que vos données personnelles restent
                            privées, sécurisées, et sous votre contrôle total à
                            tout moment.
                        </p>

                        <h4 className="text-xl font-semibold mt-3">
                            Partenariats Stratégiques
                        </h4>
                        <p className="text-lg mt-2 mb-4">
                            Notre engagement envers une cybersécurité de pointe
                            nous a amenés à établir des partenariats
                            stratégiques avec des leaders de l'industrie de la
                            sécurité. Ces collaborations nous permettent
                            d'offrir des solutions de sécurité en ligne encore
                            plus robustes et avancées, vous assurant que vous
                            bénéficiez toujours des protections les plus
                            efficaces contre les menaces numériques.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/dashboard">
                                <MovingBorderBtn
                                    borderRadius="0.5rem"
                                    className="p-6"
                                >
                                    <h2 className=" text-xl">
                                        Découvrez CyberClair3
                                    </h2>
                                </MovingBorderBtn>
                            </Link>
                        </div>
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
