"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";
import {
    AtSymbolIcon,
    LockClosedIcon,
    PencilSquareIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

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
import { cn } from "@/utils/utils";

const FormSchema = z
    .object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string().min(6, {
            message: "Mot de passe requis",
        }),
        confirm: z.string().min(6, {
            message: "Le mot de passe ne correspond pas",
        }),
    })

    /* la méthode refine() est utilisée pour s'assurer que la valeur du champ confirm est égale à la valeur du champ password.
     * Si cette condition n'est pas remplie, une erreur de validation est générée avec le message "Password did not match",
     * et le chemin de l'erreur est spécifié comme ["confirm"].
     * refine() est une fonctionnalité spécifique à la bibliothèque Zod qui permet d'ajouter des validations personnalisées à un schéma de données.
     *
     */
    .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
    });

export default function RegisterForm({
    signUp,
}: Readonly<{
    signUp: (formData: FormData) => Promise<void>;
}>) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

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
            const formData = new FormData();
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            signUp(formData);
        });

        // const { email, password } = data

        // let { error } = await supabase.auth.signUp({
        //     email: email,
        //     password: password,
        // })

        // if (error) {
        //     setErrorMessage(error.message)
        // } else {
        //     setErrorMessage(null)
        //     console.log("Signup success!")
        // }
    }

    return (
        <div className="">
            <Form {...form}>
                <form
                    action="../../auth/signup"
                    method="POST"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <div className="flex gap-2 mt-9">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center">
                                        <UserIcon className="w-5 h-5 mr-2" />
                                        <p>Nom :</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="family-name"
                                            placeholder="Nom..."
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
                                    <FormLabel className="flex items-center">
                                        <UserIcon className="w-5 h-5 mr-2" />
                                        <p>Prénom :</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="given-name"
                                            placeholder="Prénom..."
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
                                    <AtSymbolIcon className="w-5 h-5 mr-2" />
                                    <p>Email :</p>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="email"
                                        placeholder="exemple@gmail.com"
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
                                <FormLabel className="flex items-center">
                                    <LockClosedIcon className="w-5 h-5 mr-2" />
                                    <p>Mot de passe :</p>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="new-password"
                                        placeholder="Mot de passe..."
                                        {...field}
                                        type="password"
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
                                <FormLabel className="flex items-center">
                                    <LockClosedIcon className="w-5 h-5 mr-2" />
                                    Confirmez votre mot de passe :
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="new-password"
                                        placeholder="Confirmez votre password"
                                        {...field}
                                        type="password"
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full flex gap-2">
                        <PencilSquareIcon className="w-5 h-5 mr-3" />
                        {/* Suite a un probleme sur vercel, tu peux aussi le faire comme ça <p>S&apos;inscrire</p> */}
                        <p>S{"'"}inscrire</p>
                        <AiOutlineLoading3Quarters
                            className={cn("animate-spin", {
                                hidden: !isPending,
                            })}
                        />
                    </Button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </Form>
        </div>
    );
}
