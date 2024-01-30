"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ToggleTheme() {
    const { resolvedTheme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Je m'assure ici que le thème est monté côté client avant de l'utiliser
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            className={`relative flex w-full p-1 bg-cyberSecondary rounded-xl before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-cyberPrimary before:rounded-[0.625rem] 
            before:transition-all dark:bg-cyberSecondary dark:before:dark:bg-cyberPrimary dark:border-solid dark:border-white ${
                resolvedTheme === "dark" && "before:translate-x-full"
                // resolvedTheme est une propriété qui contient le thème actuellement résolu après que la bibliothèque next-themes a effectué sa logique d'initialisation. Cela permet de connaître le thème réellement appliqué après le chargement initial de la page. J'utilise cette propriété pour déterminer si le thème actuel est "dark" ou "light" et ainsi déterminer la position du curseur.
            }`}
        >
            <button
                className="relative z-1 group flex justify-center items-center h-10 basis-1/2 font-medium transition-colors hover:text-n-1"
                onClick={
                    () => setTheme(resolvedTheme === "light" ? "dark" : "light")
                    // et donc ici, je change le thème en fonction de la valeur de la propriété resolvedTheme
                }
            >
                <Sun className="h-5 w-5 mr-3" />
                <span>Light</span>
            </button>
            <button
                className="relative z-1 group flex justify-center items-center h-10 basis-1/2 font-semibold transition-colors hover:text-n-1"
                onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
            >
                <Moon className="h-5 w-5 mr-3" />
                <span>Dark</span>
            </button>
        </div>
    )
}
