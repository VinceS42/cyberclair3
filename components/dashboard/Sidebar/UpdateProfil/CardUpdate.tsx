"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/context/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    updateUserEmail,
    updateUserPassword,
} from "@/lib/service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

import { Loader2, Lock, Mail, Save } from "lucide-react";
import UpdateAvatars from "./UpdateAvatars";
import { supabase } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";

//////////////////////////////// Pour le Mail //////////////////////////////////////

const FormProfilSchema = z
    .object({
        email: z.string().email({
            message: "Veuillez entrer une adresse email valide.",
        }),
        confirmEmail: z.string().email({
            message: "Veuillez entrer une adresse email valide.",
        }),
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères",
        }),
    })
    .refine((data) => data.email === data.confirmEmail, {
        message: "Les adresses email ne correspondent pas",
        path: ["confirmEmail"], // Indiquez le chemin de l'élément qui doit être marqué en cas d'erreur
    });

type UpdateUserEmailFormValues = z.infer<typeof FormProfilSchema>;

//////////////////////////////// Pour le Mot de passe //////////////////////////////////////

const FormPasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères",
        }),
        newPassword: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères",
        }),
        confirmNewPassword: z.string().min(6, {
            message: "Le mot de passe ne correspond pas.",
        }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmNewPassword"],
    });

type UpdateUserPasswordFormValues = z.infer<typeof FormPasswordSchema>;

//******************************** Début de la Fonction ********************************//

export default function CardUpdate() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSession();

    //////////////////////////////// Pour le Mail //////////////////////////////////////

    const formProfil = useForm<z.infer<typeof FormProfilSchema>>({
        resolver: zodResolver(FormProfilSchema),
        mode: "onSubmit",
    });

    const handleSubmitEmail = async (values: UpdateUserEmailFormValues) => {
        try {
            setIsLoading(true);
            await updateUserEmail(values.email, {
                email: user?.email || "",
                password: values.password,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    //////////////////////////////// Pour le Mot de passe //////////////////////////////////////

    const formPassword = useForm<z.infer<typeof FormPasswordSchema>>({
        resolver: zodResolver(FormPasswordSchema),
        mode: "onSubmit",
    });

    const handleSubmitPassword = async (
        values: UpdateUserPasswordFormValues
    ) => {
        try {
            setIsLoading(true);
            await updateUserPassword(
                values.newPassword, // Utilisez la nouvelle valeur de mot de passe sous la clé attendue
                {
                    email: user?.email || "",
                    password: values.password, // Le mot de passe actuel de l'utilisateur
                }
            );
        } catch (error) {
            console.error(error); // Gérer l'erreur ici, par exemple en mettant à jour l'état d'erreur
            setErrorMessage(
                "Une erreur est survenue lors de la mise à jour du mot de passe."
            );
        } finally {
            setIsLoading(false);
        }
    };

    //**************************/ UPDATE AVATAR_URL /***************************//

    const updateAvatarUrl = async (url: string) => {
        const { user } = useSession();

        const { error } = await supabase
            .from("profiles")
            .update({ avatar_url: url })
            .eq("id", user?.id);
        if (error) {
            toast({
                title: "Error",
                description: error.message,
                duration: 9000,
            });
        }
        toast({
            title: "Avatar url updated",
            duration: 9000,
        });
    };

    //**************************/ UPLOAD AIMAGE DANS LE STORAGE /***************************//

    const uploadAvatar = async (event: any) => {
        const { user } = useSession();
        if (!event.target.files || event.target.files.length === 0) {
            throw new Error("You must select an image to upload.");
        }

        setUploading(true);
        const file = event.target.files[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${user?.email}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

        if (uploadError) {
            setUploading(false);
            throw uploadError;
        }

        updateAvatarUrl(filePath);
        setAvatarUrl(filePath);
        setUploading(false);
    };

    return (
        <div className="w-full space-y-5 border rounded-xl bg-black">
            <Tabs defaultValue="update" className="p-9 w-full">
                <TabsList className="relative grid w-full grid-cols-3 mb-6 p-1 bg-[#202324] ">
                    <TabsTrigger
                        value="profil"
                        className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                    >
                        Profil
                    </TabsTrigger>
                    <TabsTrigger
                        value="avatar"
                        className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                    >
                        Avatar
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                    >
                        Mot de passe
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="profil">
                    <div className="">
                        <Form {...formProfil}>
                            <form
                                onSubmit={formProfil.handleSubmit(
                                    handleSubmitEmail
                                )}
                                className="w-full space-y-6"
                            >
                                <h2 className="text-white text-lg">
                                    Adresse actuelle : {user?.email}
                                </h2>
                                <FormField
                                    control={formProfil.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center">
                                                <Mail className="w-5 h-5 mr-2" />
                                                <p className="text-base">
                                                    Nouvel email :
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white text-black"
                                                    autoComplete="email"
                                                    placeholder="Entrez votre nouvel email"
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

                                <FormField
                                    control={formProfil.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-2">
                                                <Lock className="w-5 h-5" />
                                                <p className="text-base">
                                                    Mot de passe :
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white text-black"
                                                    autoComplete="new-password"
                                                    placeholder="Mot de passe"
                                                    {...field}
                                                    type="password"
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
                    </div>
                </TabsContent>
                <TabsContent value="avatar">
                    <div className="">
                        <Form {...formPassword}>
                            <form
                                onSubmit={formPassword.handleSubmit(
                                    handleSubmitPassword
                                )}
                                className="w-full space-y-6"
                            >
                                <UpdateAvatars />
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
                    </div>
                </TabsContent>
                <TabsContent value="password">
                    <div className="">
                        <Form {...formPassword}>
                            <form
                                onSubmit={formPassword.handleSubmit(
                                    handleSubmitPassword
                                )}
                                className="w-full space-y-6"
                            >
                                <FormField
                                    control={formPassword.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-2">
                                                <Lock className="w-5 h-5" />
                                                <p className="text-base">
                                                    Entrez votre nouveau mot de
                                                    passe :
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white text-black"
                                                    autoComplete="new-password"
                                                    placeholder="Nouveau mot de passe"
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
                                    control={formPassword.control}
                                    name="confirmNewPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-2">
                                                <Lock className="w-5 h-5" />
                                                <p className="text-base">
                                                    Confirmez votre mot de passe
                                                    :
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white text-black"
                                                    autoComplete="new-password"
                                                    placeholder="Confirmez votre mot de passe"
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
                                    control={formPassword.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-2">
                                                <Lock className="w-5 h-5" />
                                                <p className="text-base">
                                                    Mot de passe actuel :
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white text-black"
                                                    placeholder="*******"
                                                    {...field}
                                                    type="password"
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
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
