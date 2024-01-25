import { Button } from "@/components/ui/button"

interface OAuthFormProps {
    name: string
}

export default function OAuthForm({ name }: OAuthFormProps) {
    return <Button className="w-full dark:text-white text-base">{name}</Button>
}
