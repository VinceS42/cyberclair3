import Link from "next/link"
import { ArrowRightIcon, LockOpenIcon } from "@heroicons/react/24/outline"

type Props = {
    title: string
    description: string
    icon: React.ReactNode
    href: string
}

export default function CardFeature({
    title = "Vérification mot de passe",
    description = "Vérifiez si votre mot de passe a été compromis",
    icon = <LockOpenIcon className="w-6 h-6 text-white" />,
    href = "/dashboard",
}: Readonly<Props>) {
    return (
        <Link
            href={`dashboard/${href}`}
            className="flex w-full items-center mb-5 p-3.5 border border-solid border-gray-200 rounded-xl hover:border-transparent hover:shadow-2xl last:mb-0 group transition duration-300 ease-in-out"
        >
            <div className="relative flex justify-center items-center w-14 h-14 mr-6 bg-[#202324] rounded-xl">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-medium">{title}</span>
                <p className="text-sm text-[#6c7275]">{description}</p>
            </div>
            <ArrowRightIcon className="w-6 h-6 ml-auto opacity-50 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </Link>
    )
}
