import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { figtree } from "@/components/fonts"


export const metadata: Metadata = {
    title: "Cyberclair3",
    description: "",
    icons: {
        icon: "/assets/img/Nico.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body className={figtree.className}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
