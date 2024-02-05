import { Rocket } from "lucide-react"

type Props = {
    isPremium: boolean
}

export default function BtnUpgrade({ isPremium = false }: Readonly<Props>) {
    return (
        !isPremium && (
            <button className="flex flex-row justify-center items-center gap-x-2 w-full mt-2 h-12 px-0.5 font-medium text-center border-2 border-cyberBorder rounded-xl hover:bg-cyberBorder transition duration-300 ease-in-out">
                <span>Mise à niveau</span>
                <Rocket className="h-5 w-5" />
            </button>
        )
    )
}

