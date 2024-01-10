type Props = {
    isPremium: boolean
}

export default function BtnUpgrade({ isPremium = false }: Readonly<Props>) {
    return (
        isPremium && (
            <button className="w-full text-sm text-center mt-2 h-12 px-0.5 font-semibold border-2 border-[#343839] rounded-xl hover:bg-[#343839] transition duration-300 ease-in-out">
                {isPremium && "Upgrade"}
            </button>
        )
    )
}
