type Props = {
    title: string
    description: string
    align?: "text-left" | "text-center" | "text-right"
}

export default function Heading({
    title = "Protégez votre identité en ligne",
    description = "N'attendez pas de perdre votre sécurité.",
    align = "text-center",
}: Readonly<Props>) {
    return (
        <div className={`${align} mb-10`}>
            <h1 className="text-5xl font-semibold mb-4 text-cyberPrimary dark:text-white">
                {title}
            </h1>
            <p className="text-2xl text-cyberTextSecondary">{description}</p>
        </div>
    )
}
