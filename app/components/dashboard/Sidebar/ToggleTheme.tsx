"use client"
import { useState } from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

export default function ToggleTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    return (
        <div
            className={`relative flex w-full p-1 bg-[#202324] rounded-xl before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-background before:rounded-[0.625rem] before:transition-all ${
                theme === "dark" && "before:translate-x-full"
            }`}
        >
            <button
                className="relative z-1 group flex justify-center items-center h-10 basis-1/2 text-sm tracking-[-.02em] font-semibold transition-colors hover:text-n-1 text-n-1"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                <SunIcon className="h-6 w-6 mr-3 fill-white" />
                <span>Light</span>
            </button>
            <button
                className="relative z-1 group flex justify-center items-center h-10 basis-1/2 text-sm tracking-[-.02em] font-semibold transition-colors hover:text-n-1 text-n-1"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                <MoonIcon className="h-6 w-6 mr-3 fill-white" />
                <span>Dark</span>
            </button>
        </div>
    )
}
