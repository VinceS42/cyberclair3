"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AsteriskSquare } from "lucide-react"

type Props = {
    title: string
    icon: React.ReactNode
    href: string
}

export default function MenuItem({
    title = "Vérification mot de passe",
    icon = <AsteriskSquare className="text-white" />,
    href = "/dashboard",
}: Readonly<Props>) {
    const pathname = usePathname()

    const pathnameSegments = pathname.split("/")
    const hrefSegments = href.split("/")
    const isActive =
        pathnameSegments[pathnameSegments.length - 1] ===
        hrefSegments[hrefSegments.length - 1]

    return (
        <Link
            href={href}
            className={`flex w-full mb-2 group items-center h-12 font-medium rounded-lg transition-colors duration-300 ease-in-out px-5 dark:bg-cyberPrimary ${
                isActive &&
                "bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]"
            }`}
        >
            <div className="w-6 h-6 mr-5">{icon}</div>
            <span
                className={`text-white group-hover:opacity-100 transition duration-300 ease-in-out  ${
                    isActive ? "opacity-100" : "opacity-50"
                }`}
            >
                {title}
            </span>
        </Link>
    )
}
