import Link from "next/link"
import { AsteriskSquare, ArrowRight } from "lucide-react"

type Props = {
    title: string
    description: string
    icon: React.ReactNode
    href: string
}

export default function CardFeature({
    title = "Vérification mot de passe",
    description = "Vérifiez si votre mot de passe a été compromis",
    icon = <AsteriskSquare className="w-6 h-6 text-white" />,
    href = "/dashboard",
}: Readonly<Props>) {
    return (
        <Link
            href={`dashboard/${href}`}
            className="flex w-full items-center mb-5 p-3.5 border border-solid rounded-xl hover:border-transparent hover:shadow-2xl last:mb-0 group transition duration-300 ease-in-out dark:border-cyberBorder dark:hover:border-transparent dark:bg-gray-400 dark:text-black dark:hover:bg-cyberPrimary dark:hover:shadow-lg "
        >
            <div className="relative flex justify-center items-center w-14 h-14 mr-6 bg-cyberPrimary rounded-xl">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-medium">{title}</span>
                <p className="text-sm text-[#6c7275] dark:text-white">{description}</p>
            </div>
            <ArrowRight className="w-6 h-6 ml-auto opacity-50 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </Link>
    )
}
