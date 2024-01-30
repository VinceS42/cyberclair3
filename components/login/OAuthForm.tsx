"use client";

import { Button } from "@/components/ui/button";

interface OAuthFormProps {
    name: string;
    onClick: () => void;
}

export default function OAuthForm({ name, onClick }: OAuthFormProps) {
    return (
        <Button type="submit" className="w-full dark:text-white text-base" onClick={onClick}>
            {name}
        </Button>
    );
}
