type Props = {
    title: string
    description: string
    align?: "text-left" | "text-center" | "text-right" | null
    isPremium?: boolean | null
}

export default function Heading({
    title = "Protégez votre identité en ligne",
    description = "N'attendez pas de perdre votre sécurité.",
    align = null,
    isPremium = null, //TODO: Replace with actual premium check with supabase
}: Readonly<Props>) {
    return (
        <div className={`${align} mb-10`}>
            <h1
                className={`flex flex-row ${
                    !align && "justify-center"
                } items-center gap-x-2 text-5xl font-semibold mb-4 text-cyberPrimary dark:text-white`}
            >
                {title}
                {isPremium !== null ? (
                    <span className="flex flex-row gap-x-2 px-2 py-1 text-sm font-medium text-blue-800 bg-blue-200 rounded-md">
                        {isPremium ? "Premium" : "Gratuit"}
                    </span>
                ) : null}
            </h1>
            <p
                className={`text-2xl text-cyberTextSecondary ${
                    !align && "text-center"
                }`}
            >
                {description}
            </p>
        </div>
    )
}
