"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import logo from "@/public/assets/img/logo.svg";
import { Loader2, Lock, Save } from "lucide-react";
import Image from "next/image";
import { confirmResetPassword, updateUserPassword } from "@/lib/service";
import { supabase } from "@/utils/supabase/client";

//////////////////////////////// Pour le Mot de passe //////////////////////////////////////

const FormPasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères",
        }),
        confirmPassword: z.string().min(6, {
            message: "Le mot de passe ne correspond pas.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmNewPassword"],
    });

type ResetPasswordFormValues = z.infer<typeof FormPasswordSchema>;

//******************************** Début de la Fonction ********************************//

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null); // Ajoutez cet état pour stocker le token d'accès

    //////////////////////////////// Pour Reset le Mot de passe //////////////////////////////////////

    const formResetPassword = useForm<z.infer<typeof FormPasswordSchema>>({
        resolver: zodResolver(FormPasswordSchema),
        defaultValues: {
            password: "", // Valeur initiale définie à une chaîne vide
            confirmPassword: "", // Valeur initiale définie à une chaîne vide
        },
    });

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                // Vous pouvez stocker le token d'accès ici pour l'utiliser lors de la mise à jour du mot de passe
                setAccessToken(session?.access_token || null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);


    const handleSubmitResetPassword = async (
        values: ResetPasswordFormValues
    ) => {
        try {
            setIsLoading(true);
            await updateUserPassword(values.email, values.password);
        } catch (error) {
            console.error(error); // Gérer l'erreur ici, par exemple en mettant à jour l'état d'erreur
            setErrorMessage(
                "Une erreur est survenue lors de la mise à jour du mot de passe."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full space-y-5">
            <div className="flex items-center justify-center gap-2">
                <Image
                    src={logo}
                    alt="logo-cyberclaire"
                    className="w-12 h-12"
                />
                <h1 className="text-white text-2xl font-bold">CyberClair3</h1>
            </div>
            <Form {...formResetPassword}>
                <form
                    onSubmit={formResetPassword.handleSubmit(
                        handleSubmitResetPassword
                    )}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={formResetPassword.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-x-2">
                                    <Lock className="w-5 h-5" />
                                    <p className="text-base">
                                        Entrez votre nouveau mot de passe :
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white text-black"
                                        autoComplete="new-password"
                                        placeholder="Nouveau mot de passe"
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
                        control={formResetPassword.control}
                        name="confirmPassword"
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
                    <div onClick={() => setShowPassword(!showPassword)}>
                        <p className="text-sm text-white cursor-pointer hover:underline">
                            Rendre le mot de passe visible
                        </p>
                    </div>
                    <Button
                        type="submit"
                        className="w-full flex gap-2 text-white text-base"
                    >
                        {!isLoading ? (
                            <Save className="w-5 h-5" />
                        ) : (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {isLoading ? (
                            <span className="opacity-50">Modification...</span>
                        ) : (
                            "Modifier"
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
