"use client";

import { useSession } from "@/context/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader2, Lock, Mail, Save, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { updateUser } from "@/lib/service";

const FormProfilSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
    password: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
});

const FormPasswordSchema = z
    .object({
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

type UpdateUserFormValues = z.infer<typeof FormPasswordSchema>;

export default function CardUpdate() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSession();

    const formProfil = useForm<z.infer<typeof FormProfilSchema>>({
        resolver: zodResolver(FormProfilSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
        },
    });

    const formPassword = useForm<z.infer<typeof FormPasswordSchema>>({
        resolver: zodResolver(FormPasswordSchema),
        defaultValues: {
            password: "",
            confirm: "",
        },
    });

    const handleSubmit = async (values: UpdateUserFormValues) => {
        try {
            setIsLoading(true);
            // updateUser(values);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // console.log(user);

    return (
      
            <div className="w-full space-y-5 border rounded-xl bg-black">
                <Tabs defaultValue="update" className="p-9 w-full">
                    <TabsList className="relative grid w-full grid-cols-2 mb-6 p-1 bg-[#202324] ">
                        <TabsTrigger
                            value="profil"
                            className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                        >
                            Editer votre profil
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
                                    onSubmit={(e) => {}}
                                    className="w-full space-y-6"
                                >
                                    <div className="flex gap-2 mt-9">
                                        <FormField
                                            control={formProfil.control}
                                            name="first_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-x-2">
                                                        <User className="w-5 h-5" />
                                                        <p className="text-base">
                                                            Nom :
                                                        </p>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-white text-black"
                                                            autoComplete="family-name"
                                                            placeholder="Nom"
                                                            {...field}
                                                            type="first_name"
                                                            onChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={formProfil.control}
                                            name="last_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-x-2">
                                                        <User className="w-5 h-5" />
                                                        <p className="text-base">
                                                            Prénom :
                                                        </p>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-white text-black"
                                                            autoComplete="given-name"
                                                            placeholder="Prénom"
                                                            {...field}
                                                            type="last_name"
                                                            onChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={formProfil.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center">
                                                    <Mail className="w-5 h-5 mr-2" />
                                                    <p className="text-base">
                                                        Email :
                                                    </p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-white text-black"
                                                        autoComplete="email"
                                                        placeholder="dupont@gmail.com"
                                                        {...field}
                                                        type="email"
                                                        onChange={
                                                            field.onChange
                                                        }
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
                                        <p className="text-white">
                                            {errorMessage}
                                        </p>
                                    )}
                                </form>
                            </Form>
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div className="">
                            <Form {...formPassword}>
                                <form
                                    onSubmit={() => {}}
                                    className="w-full space-y-6"
                                >
                                    <FormField
                                        control={formPassword.control}
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
                                                        onChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formPassword.control}
                                        name="confirm"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-x-2">
                                                    <Lock className="w-5 h-5" />
                                                    <p className="text-base">
                                                        Confirmez votre mot de
                                                        passe :
                                                    </p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-white text-black"
                                                        autoComplete="new-password"
                                                        placeholder="Confirmez votre mot de passe"
                                                        {...field}
                                                        type="password"
                                                        onChange={
                                                            field.onChange
                                                        }
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
                                                        Nouveau mot de passe :
                                                    </p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-white text-black"
                                                        autoComplete="new-password"
                                                        placeholder="Mot de passe"
                                                        {...field}
                                                        type="password"
                                                        onChange={
                                                            field.onChange
                                                        }
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
                                        <p className="text-white">
                                            {errorMessage}
                                        </p>
                                    )}
                                </form>
                            </Form>
                        </div>
                    </TabsContent>
                </Tabs>
                <div className="flex gap-5"></div>
            </div>
       
    );
}
