"use client";

import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import * as z from "zod";
import {
    Loader2,
    Radar,
    AlertCircle,
    Shield,
    AtSign,
    Fingerprint,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import NordPassBanner from "@/public/assets/img/NordPass/Nordpass-680x250.png";

// Je définis un schéma pour la validation du mot de passe, en utilisant Zod, exigeant au moins 6 caractères.
const passwordSchema = z.object({
    password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

/**
 * Vérifie si un mot de passe a été compromis en utilisant l'API Have I Been Pwned.
 * @param password Le mot de passe à vérifier.
 * @param setIsPwned Fonction pour définir l'état de compromission du mot de passe.
 * @param setPwnedCount Fonction pour définir le nombre de fois que le mot de passe a été vu dans les fuites.
 */

/**
 * Fonction pour vérifier si un mot de passe a été compromis en utilisant l'API Have I Been Pwned.
 * Je hash le mot de passe avec SHA1 pour ne pas exposer le mot de passe en clair lors de la vérification.
 */
async function verifyPassword(
    password: string,
    setIsPwned: (isPwned: boolean | null) => void,
    setPwnedCount: (count: number) => void // Ajout de l'argument pour le nombre de compromissions
) {
    // Hashage du mot de passe et préparation pour la requête API.
    const hash = CryptoJS.SHA1(password) // Je convertis le hash en une chaîne de caractères hexadécimaux, car l'API Have I Been Pwned travaille avec des hashes
        .toString(CryptoJS.enc.Hex)
        .toUpperCase(); // L'API exige que le hash soit en majuscules, donc je convertis toute la chaîne en majuscules.

    // Je divise le hash SHA-1 en deux parties : le préfixe et le suffixe.
    // Cela est conforme à la méthode k-anonymity utilisée par Have I Been Pwned pour vérifier les mots de passe sans compromettre la sécurité.

    const prefix = hash.slice(0, 5); // Le préfixe contient les 5 premiers caractères du hash.
    const suffix = hash.slice(5); // Le suffixe contient le reste du hash après le préfixe.

    // Le préfixe est utilisé pour la requête API, et le suffixe est utilisé pour vérifier localement la réponse de l'API.

    try {
        
        // J'envoie une requête à l'API Have I Been Pwned pour récupérer une liste de hashes de mots de passe commençant par le préfixe.
        const response = await fetch(
            `https://api.pwnedpasswords.com/range/${prefix}`
        );


        // Je convertis la réponse en texte pour pouvoir la traiter.
        const text = await response.text();

        // Je chercher le suffixe de mon hash dans la liste des réponses.
        const regex = new RegExp(`^${suffix}:([0-9]+)`, "m");

        // J'exécute sur le texte de la réponse.
        const match = regex.exec(text);

        // Si un match est trouvé, cela signifie que le suffixe de mon hash est dans la liste et donc le mot de passe a été compromis.
        if (match) {

            // Si le suffixe est trouvé, définir le mot de passe comme compromis et mettre à jour le nombre de fois qu'il a été vu
            setIsPwned(true);

            // J'extrais le nombre de fois que ce mot de passe a été vu dans les fuites et je mets à jour l'état correspondant.
            setPwnedCount(parseInt(match[1], 10));
        } else {
            // Si le suffixe n'est pas trouvé, le mot de passe n'est pas compromis
            setIsPwned(false);
            setPwnedCount(0);
        }
    } catch (error) {
        console.error(
            "Erreur lors de la vérification du mot de passe :",
            error
        );
        // Je réinitialise les états pour indiquer qu'une erreur est survenue pendant la vérification.
        setIsPwned(null);
        setPwnedCount(0); // Réinitialiser le compte en cas d'erreur
    }
}

const PasswordChecker = () => {
    const [password, setPassword] = useState("");
    const [isPwned, setIsPwned] = useState<boolean | null>(null);
    const [pwnedCount, setPwnedCount] = useState(0); // État pour stocker le nombre de fois que le mot de passe a été compromis
    const [errorMessage, setErrorMessage] = useState(""); // Nouvel état pour gérer les messages d'erreur de validation
    const [isPending, setIsPending] = useState(false);
    const [badge, setBadge] = useState({
        status: "Non vérifié",
        color: "bg-red-500",
        date: new Date(),
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validation du mot de passe avec Zod
        const validationResult = passwordSchema.safeParse({ password });
        if (!validationResult.success) {
            setErrorMessage(validationResult.error.errors[0].message); // Affiche le premier message d'erreur
            setIsPwned(null);
            setPwnedCount(0);
            return; // Arrête la fonction si la validation échoue
        }

        setIsPending(true);

        // Réinitialise le message d'erreur si la validation réussit
        setErrorMessage("");

        // Continue avec la vérification du mot de passe
        setTimeout(() => {
            verifyPassword(password, setIsPwned, setPwnedCount);
            setIsPending(false);
        }, 3000); // Ajout d'un délai pour simuler une requête asynchrone
    };

    // TODO: Gérer le status du badge côté base de données
    useEffect(() => {
        if (isPwned === true) {
            setBadge({
                status: "Vérifié",
                color: "bg-red-500",
                date: new Date(),
            });
        } else if (isPwned === false) {
            setBadge({
                status: "Vérifié",
                color: "bg-green-500",
                date: new Date(),
            });
        }
    }, [isPwned]);

    return (
        <div className="flex flex-row w-full gap-x-20 mt-10">
            <div className="flex flex-col gap-y-2 basis-1/3">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="flex flex-col gap-y-4 mb-4">
                        <div
                            className={`px-2 py-1 text-xs font-medium text-white ${badge.color} rounded-md w-fit`}
                        >
                            {badge.status}{" "}
                            {badge.status === "Vérifié" && (
                                <span className="text-white">
                                    le {badge.date.toLocaleDateString()} à{" "}
                                    {badge.date.toLocaleTimeString()}
                                </span>
                            )}
                        </div>
                        <span className="text-lg font-medium">
                            Mot de passe
                        </span>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez un mot de passe à vérifier"
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm">
                                {errorMessage}
                            </p>
                        )}
                    </label>
                    <button
                        className="flex flex-row p-2 gap-x-2 bg-blue-500 text-white justify-center items-center rounded-md hover:bg-blue-600 transition-colors"
                        type="submit"
                    >
                        {!isPending ? (
                            <Radar className="w-5 h-5" />
                        ) : (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {isPending ? (
                            <span>Analyse en cours...</span>
                        ) : (
                            "Lancer la vérification"
                        )}
                    </button>
                </form>
            </div>
            <div className="flex flex-col basis-2/3 gap-y-4">
                <h2 className="flex flex-row gap-x-2 text-lg font-semibold">
                    <Shield className="w-6 h-6" />
                    Résultat de votre analyse de mot de passe
                </h2>
                {isPwned !== null ? (
                    <div className="flex flex-col gap-y-4">
                        {isPwned ? ( // Mot de passe compromis
                            <>
                                <span className="flex flex-row text-red-500 items-center gap-x-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Alerte : Le mot de passe a été compromis{" "}
                                    {pwnedCount} fois !
                                </span>
                                <p>
                                    <span className="font-semibold">
                                        Votre mot de passe a été trouvé dans une
                                        fuite de données en ligne.
                                    </span>{" "}
                                    Cela signifie que vos informations
                                    personnelles et votre compte peuvent être à
                                    risque.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Ne paniquez pas !
                                    </span>{" "}
                                    Nous sommes là pour vous aider à sécuriser
                                    votre compte et à vous protéger contre les
                                    pirates informatiques.
                                </p>
                                <p className="font-semibold">
                                    Pour vous aider à sécuriser vos mots de
                                    passe, nous vous recommandons
                                    d&apos;utiliser un gestionnaire de mots de
                                    passe fiable comme NordPass.
                                </p>
                                <p className="font-semibold">
                                    NordPass est un gestionnaire de mots de
                                    passe qui vous permet de :
                                </p>
                                <ul className="flex flex-col gap-y-2 list-disc list-inside">
                                    <li>
                                        Stocker tous vos mots de passe en toute
                                        sécurité dans un coffre-fort crypté.
                                    </li>
                                    <li>
                                        Générer des mots de passe forts et
                                        uniques pour chaque site Web.
                                    </li>
                                    <li>
                                        Accéder à vos mots de passe depuis tous
                                        vos appareils.
                                    </li>
                                    <li>
                                        Surveiller vos mots de passe pour
                                        détecter les fuites de données.
                                    </li>
                                </ul>
                                <p className="font-semibold">
                                    Profitez d&apos;une offre spéciale pour les
                                    utilisateurs de notre plateforme :
                                </p>
                                <ul className="flex flex-col gap-y-2 list-disc list-inside">
                                    <li>
                                        Bénéficiez d&apos;un essai gratuit de 30
                                        jours de NordPass Premium.
                                    </li>
                                    <li>
                                        Obtenez 50% de réduction sur votre
                                        abonnement annuel.
                                    </li>
                                    <li>
                                        Profitez de 3 mois supplémentaires
                                        offert
                                    </li>
                                </ul>
                                <p className="font-semibold">
                                    Cliquez sur la bannière ci-dessous pour en
                                    savoir plus et profiter de cette offre
                                    exclusive :
                                </p>
                            </>
                        ) : (
                            // Mot de passe non compromis
                            <div className="flex flex-col gap-y-4">
                                <p className="text-green-500">
                                    Votre mot de passe n&apos;a pas été trouvé
                                    dans des fuites de données connues.
                                </p>
                                <p className="font-semibold">
                                    Félicitations ! Vous utilisez un mot de
                                    passe fort et sécurisé.
                                </p>
                                <p>
                                    Pour une sécurité optimale, nous vous
                                    recommandons de :
                                </p>
                                <ul className="flex flex-col gap-y-2 list-disc list-inside">
                                    <li className="font-semibold">
                                        Changer régulièrement votre mot de
                                        passe.
                                    </li>
                                    <li className="font-semibold">
                                        Activer l&apos;authentification à deux
                                        facteurs.
                                    </li>
                                    <li className="font-semibold">
                                        Utiliser un gestionnaire de mots de
                                        passe fiable comme NordPass.
                                    </li>
                                </ul>
                                <h2 className="text-lg font-semibold">
                                    Vérification de l&apos;adresse e-mail
                                </h2>
                                <p className="font-semibold">
                                    Souhaitez-vous vérifier la sécurité de
                                    l&apos;adresse e-mail associée à votre
                                    compte ?
                                </p>
                                <p>
                                    Nous pouvons vous aider à identifier les
                                    risques potentiels liés à votre adresse
                                    e-mail, tels que le phishing et les
                                    logiciels malveillants.
                                </p>
                                <Link
                                    href="/email-check"
                                    className="flex flex-row gap-x-2 items-center text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                    <AtSign className="w-5 h-5" />
                                    <span className="font-semibold underline">
                                        Je veux vérifier mon adresse e-mail
                                    </span>
                                </Link>
                                <h2 className="text-lg font-semibold">
                                    Diagnostic de sécurité
                                </h2>
                                <p>
                                    Vous souhaitez bénéficier d&apos;un rapport
                                    avancé ?
                                </p>
                                <p>
                                    En fonction de vos réponses, nous vous
                                    proposerons des conseils personnalisés pour
                                    améliorer votre sécurité.
                                </p>
                                <Link
                                    href="/security-check"
                                    className="flex flex-row gap-x-2 items-center text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                    <Fingerprint className="w-5 h-5" />
                                    <span className="font-semibold underline">
                                        Je veux un diagnostic de sécurité
                                    </span>
                                </Link>
                                <p className="font-semibold">
                                    Même si votre mot de passe est fort et
                                    sécurisé, NordPass peut vous aider à
                                    améliorer encore votre sécurité et votre
                                    tranquillité d&apos;esprit.
                                </p>
                                <p className="font-semibold">
                                    Voici quelques avantages de
                                    l&apos;utilisation de NordPass :
                                </p>
                                <ul className="flex flex-col gap-y-2 list-disc list-inside">
                                    <li>
                                        Génération de mots de passe forts et
                                        uniques pour chaque site Web.
                                    </li>
                                    <li>
                                        Stockage sécurisé de tous vos mots de
                                        passe dans un coffre-fort crypté.
                                    </li>
                                    <li>
                                        Accès à vos mots de passe depuis tous
                                        vos appareils.
                                    </li>
                                    <li>
                                        Authentification automatique sur vos
                                        sites Web préférés.
                                    </li>
                                </ul>
                                <p className="font-semibold">
                                    Profitez d&apos;une offre spéciale pour les
                                    utilisateurs de notre plateforme :
                                </p>
                                <ul className="flex flex-col gap-y-2 list-disc list-inside">
                                    <li>
                                        Bénéficiez d&apos;un essai gratuit de 30
                                        jours de NordPass Premium.
                                    </li>
                                    <li>
                                        Obtenez 50% de réduction sur votre
                                        abonnement annuel.
                                    </li>
                                    <li>
                                        Profitez de 3 mois supplémentaires
                                        offert
                                    </li>
                                </ul>
                                <p className="font-semibold">
                                    Cliquez sur la bannière ci-dessous pour en
                                    savoir plus et profiter de cette offre
                                    exclusive :
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    // État initial
                    <div className="flex flex-col gap-y-4">
                        <p className="font-semibold">
                            Protégez vos comptes et vos données !
                        </p>
                        <p>
                            Avant de lancer l&apos;analyse de votre mot de
                            passe, prenez quelques instants pour réfléchir aux
                            risques liés à l&apos;utilisation d&apos;un mot de
                            passe faible :
                        </p>
                        <ul className="flex flex-col gap-y-4 list-disc list-inside">
                            <li>
                                <span className="font-semibold">
                                    Piratage de compte :
                                </span>{" "}
                                Un mot de passe faible peut facilement être
                                deviné ou piraté par des cybercriminels, ce qui
                                leur donne accès à vos comptes et à vos données
                                personnelles.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Vol d&apos;identité :
                                </span>{" "}
                                Les pirates informatiques peuvent utiliser vos
                                informations personnelles pour usurper votre
                                identité et commettre des fraudes à votre nom.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Perte de données sensibles :
                                </span>{" "}
                                Vos mots de passe peuvent donner accès à des
                                informations sensibles, telles que vos données
                                bancaires, vos photos privées ou vos documents
                                médicaux.
                            </li>
                        </ul>
                        <p className="font-semibold">
                            En utilisant un mot de passe faible, vous vous
                            exposez à de graves dangers.
                        </p>
                        <p className="italic">
                            En prenant quelques minutes pour renforcer vos mots
                            de passe, vous pouvez contribuer à protéger vos
                            comptes et vos données contre les pirates
                            informatiques.
                        </p>
                    </div>
                )}
                {isPwned !== null && ( // Afficher la bannière NordPass si le mot de passe a été vérifié
                    <div className="flex flex-col gap-y-4">
                        <Link
                            href="https://go.nordpass.io/aff_c?offer_id=488&aff_id=98872&url_id=9356"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                className="rounded-xl hover:shadow-2xl transition-shadow ease-in-out duration-300"
                                src={NordPassBanner}
                                layout="responsive"
                                sizes="100vw"
                                alt="Bannière NordPass partenariat"
                            />
                        </Link>
                        <p className="italic">
                            En suivant ces conseils et en utilisant un
                            gestionnaire de mots de passe fiable comme NordPass,
                            vous pouvez contribuer à protéger vos comptes et vos
                            informations personnelles contre les pirates
                            informatiques.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordChecker;
