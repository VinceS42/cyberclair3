"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Fonction pour ajuster l'état en fonction de la taille de l'écran
        const handleResize = () => {
            // Détermine si le dispositif est en mode mobile
            const isMobile = window.innerWidth <= 768;

            // Pour les écrans mobiles, la Sidebar est fermée par défaut
            // Pour les écrans plus grands, la Sidebar est ouverte par défaut
            setIsSidebarOpen(!isMobile);
        };

        // Écouteur d'événement pour le redimensionnement de la fenêtre
        window.addEventListener("resize", handleResize);

        // Appel initial pour définir l'état basé sur la taille initiale de l'écran
        handleResize();

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            className={`pr-0 md:pr-6 bg-cyberPrimary xl:pl-80 md:pl-24 transition-transform duration-300 ease-in-out ${
                isSidebarOpen
                    ? "md:translate-x-0 pl-24 sm:pl-24"
                    : "md:-translate-x-full"
            }`}
        >
            <button
                className="text-4xl absolute top-5 right-5 z-30 sm:block md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <MenuIcon className="h-8 w-8" />
            </button>
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex md:py-6 h-screen">
                <div className="relative flex-grow max-w-full rounded-3xl lg:pr-0 bg-[#F4F5F7] px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none dark:bg-cyberSecondary">
                    {children}
                </div>
            </div>
        </section>
    );
}
