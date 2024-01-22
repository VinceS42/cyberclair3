import { Button } from "@/components/ui/button";

interface OAuthFormProps {
    name: string;
}

export default function OAuthForm({ name }: OAuthFormProps) {
    return <Button className="w-full">Login With {name}</Button>;
}
