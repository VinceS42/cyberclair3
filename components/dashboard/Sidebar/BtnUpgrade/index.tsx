type Props = {
    isPremium: boolean
}

export default function BtnUpgrade({ isPremium = false }: Readonly<Props>) {
    return (
        !isPremium && (
            <button className="w-full mt-2 h-12 px-0.5 text-sm font-semibold text-center border-2 rounded-xl hover:bg-[#343839] transition duration-300 ease-in-out">
                <span>Upgrade</span>
            </button>
        )
    )
}
