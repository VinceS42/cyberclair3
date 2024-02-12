"use client";

import { useSession } from "@/context/user";

import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import OAuthForm from "./OAuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/public/assets/img/logo.svg";

import Image from "next/image";
import { useState } from "react";
import ResetPassword from "./ResetPassword/ResetPassword";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Loader2, Lock, Mail, Save } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendResetPassword } from "@/lib/service";

const FormSchema = z
    .object({
        email: z.string().email({
            message: "Veuillez entrer une adresse email valide.",
        }),
        confirmEmail: z.string().email({
            message: "Veuillez entrer une adresse email valide.",
        }),
    })
    .refine((data) => data.email === data.confirmEmail, {
        message: "Les adresses email ne correspondent pas",
        path: ["confirmEmail"], // Indiquez le chemin de l'élément qui doit être marqué en cas d'erreur
    });

type FormValues = z.infer<typeof FormSchema>;

export default function AuthForm({
    signIn,
    signUp,
}: Readonly<{
    signIn: (formData: FormData) => Promise<void>;
    signUp: (formData: FormData) => Promise<void>;
}>) {
    const [resetPassword, setResetPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithOAuth } = useSession();

    const handleLoginWithOAuth = (provider: "linkedin" | "google") => {
        signInWithOAuth(provider);
    };

    const formProfil = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onSubmit",
    });

    const handleSubmitSendResetPassword = async (values: FormValues) => {
        try {
            setIsLoading(true);
            await sendResetPassword(values.email);
            setErrorMessage(null);
        } catch (error) {
            console.log(error);
            setErrorMessage(
                errorMessage ||
                    "Une erreur est survenue lors de la tentative de réinitialisation du mot de passe."
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
            {!resetPassword && (
                <div>
                    <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="relative grid w-full grid-cols-2 mb-6 p-1 bg-[#202324] ">
                            <TabsTrigger
                                value="signin"
                                className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                            >
                                Connexion
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                            >
                                Inscription
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                            <SignInForm signIn={signIn} />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterForm signUp={signUp} />
                        </TabsContent>
                    </Tabs>
                    <div className="mt-5 flex gap-5">
                        <OAuthForm
                            name="Google"
                            onClick={() => handleLoginWithOAuth("google")}
                        />
                        <OAuthForm
                            name="Linkedin"
                            onClick={() => handleLoginWithOAuth("linkedin")}
                        />
                    </div>
                </div>
            )}{" "}
            {resetPassword && (
                <Form {...formProfil}>
                    <form
                        onSubmit={formProfil.handleSubmit(
                            handleSubmitSendResetPassword
                        )}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={formProfil.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center">
                                        <Mail className="w-5 h-5 mr-2" />
                                        <p className="text-base">
                                            Votre email :
                                        </p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white text-black"
                                            autoComplete="email"
                                            placeholder="Entrez votre email"
                                            type="email"
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formProfil.control}
                            name="confirmEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-2">
                                        <Lock className="w-5 h-5" />
                                        <p className="text-base">
                                            Confirmez votre email :
                                        </p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white text-black"
                                            placeholder="Confirmez votre adresse email"
                                            type="email"
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                <span className="opacity-50">
                                    Modification...
                                </span>
                            ) : (
                                "Modifier"
                            )}
                        </Button>
                        {errorMessage && (
                            <p className="text-white">{errorMessage}</p>
                        )}
                    </form>
                </Form>
            )}
            <div>
                <p
                    onClick={() => setResetPassword(!resetPassword)}
                    className="text-white cursor-pointer hover:underline"
                >
                    {!resetPassword
                        ? "Vous avez perdu votre mot de passe?"
                        : "Connexion"}
                </p>
            </div>
        </div>
    );
}
