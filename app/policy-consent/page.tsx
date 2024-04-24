
export default function policyConsent() {
    return (
        <div className="container mx-auto px-4 text-white">
            <div className="text-white py-6 mt-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">
                    Politique de Confidentialité :
                </h2>
                <p className="text-lg mt-2">
                    Bienvenue ! Votre vie privée est de la plus
                    haute importance pour nous. Cette politique de
                    confidentialité explique comment nous collectons, utilisons,
                    partageons et protégeons vos informations personnelles,
                    ainsi que vos droits en matière de protection de données.
                </p>
            </div>

            <div className="text-white py-6 mt-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">
                    Collecte d&apos;informations :
                </h2>
                <p className="text-lg mt-2">
                    Nous collectons des informations pour fournir et améliorer
                    nos services.
                    <br />
                    Cela inclut :
                    <ul>
                        <li className="mt-3">
                            - Informations de compte : nom, email pour la
                            création de compte.
                        </li>
                        <li>
                            - Cookies et données d&apos;utilisation : pour améliorer
                            l&apos;expérience utilisateur et analyser l&apos;utilisation
                            du site.
                        </li>
                        <li>
                            - Documents d&apos;identification : cartes d&apos;identité ou
                            passeports, uniquement lorsqu&apos;il est strictement
                            nécessaire pour vérifier votre identité.
                        </li>
                    </ul>
                </p>
            </div>

            <div className="text-white my-8 py-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">
                    Utilisation des Informations :
                </h2>
                <p className="text-lg mt-2">
                    Vos données nous permettent d&apos;offrir nos services, tels que
                    :
                    <ul>
                        <li className="mt-3">
                            - Maintenir la sécurité de votre compte.
                        </li>
                        <li>- Personnaliser votre expérience utilisateur.</li>
                        <li>
                            - Traiter les paiements de manière sécurisée via
                            Stripe.
                        </li>
                    </ul>
                </p>
            </div>
        </div>
    );
}
