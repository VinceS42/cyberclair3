type Props = {
    title: string
    description: string
}

export default function Heading({
    title = "Protégez votre identité en ligne",
    description = "N'attendez pas de perdre votre sécurité.",
}: Readonly<Props>) {
    return (
        <div className="mb-10 text-center">
            <h1 className="text-5xl font-semibold mb-4">{title}</h1>
            <p className="text-2xl text-[#6c7275]">{description}</p>
        </div>
    )
}
