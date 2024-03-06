"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import * as z from "zod";

import { User, Mail, Lock, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const FormSchema = z
    .object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email({
            message: "Veuillez entrer une adresse email valide.",
        }),
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères",
        }),
        confirm: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères",
        }),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirm"],
    });

export default function RegisterForm({
    signUp,
}: Readonly<{
    signUp: (formData: FormData) => Promise<void>;
}>) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            
            // L'utilisation de append() pour ajouter chaque paire clé/valeur à un nouvel objet FormData est la manière standard de procéder. Cela permet de séparer la logique de validation des données (avec Zod) de la logique d'envoi de ces données à votre backend ou à une API externe qui attend du FormData.

            // FormData, correspondant à un champ de votre formulaire.
            // Ceci est particulièrement utile pour préparer les données à être envoyées dans une requête HTTP, notamment dans le cadre d'une inscription utilisateur où vous envoyez les informations du formulaire à un serveur ou une API.

            // append(). Chaque appel à append() ajoute une nouvelle paire clé/valeur à l'objet

            const formData = new FormData();
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("email", data.email);
            formData.append("password", data.password);

            try {
                await signUp(formData);

                // Si signUp réussit, vous pouvez gérer ici les actions après l'inscription.
                console.log("Signup success!");
                setErrorMessage(null);
            } catch (error: any) {
                // Si signUp échoue, vous pouvez gérer ici les erreurs.
                setErrorMessage(error.message);
            }
        });
    }

    return (
        <div className="">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <div className="flex gap-2 mt-9">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-2">
                                        <User className="w-5 h-5" />
                                        <p className="text-base">Nom :</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white text-black"
                                            autoComplete="family-name"
                                            placeholder="Nom"
                                            {...field}
                                            type="first_name"
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-2">
                                        <User className="w-5 h-5" />
                                        <p className="text-base">Prénom :</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white text-black"
                                            autoComplete="given-name"
                                            placeholder="Prénom"
                                            {...field}
                                            type="last_name"
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center">
                                    <Mail className="w-5 h-5 mr-2" />
                                    <p className="text-base">Email :</p>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white text-black"
                                        autoComplete="email"
                                        placeholder="email@gmail.com"
                                        {...field}
                                        type="email"
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-x-2">
                                    <Lock className="w-5 h-5" />
                                    <p className="text-base">Mot de passe :</p>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white text-black"
                                        autoComplete="new-password"
                                        placeholder="Mot de passe"
                                        {...field}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-x-2">
                                    <Lock className="w-5 h-5" />
                                    <p className="text-base">
                                        Confirmez votre mot de passe :
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white text-black"
                                        autoComplete="new-password"
                                        placeholder="Confirmez votre mot de passe"
                                        {...field}
                                        type= "password"
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div onClick={() => setShowPassword(!showPassword)}>
                        <p className="text-sm text-white cursor-pointer hover:underline">
                            Rendre le mot de passe visible
                        </p>
                    </div>
                    <Button
                        type="submit"
                        className="w-full flex gap-2 text-white text-base"
                    >
                        {!isPending ? (
                            <UserPlus className="w-5 h-5" />
                        ) : (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {isPending ? (
                            <span className="opacity-50">Inscription...</span>
                        ) : (
                            "S'inscrire"
                        )}
                    </Button>
                    {errorMessage && (
                        <p className="text-white">{errorMessage}</p>
                    )}
                </form>
            </Form>
        </div>
    );
}
