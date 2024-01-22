"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const FormSchema = z
    .object({
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
    })

export default function RegisterForm({
    signUp,
}: Readonly<{
    signUp: (formData: FormData) => Promise<void>
}>) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: "",
        },
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append("email", data.email)
        formData.append("password", data.password)
        signUp(formData)

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
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Password"
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
                                <FormLabel>Confirm</FormLabel>
                                <FormControl>
                                    <Input
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
                        Enregistrer
                    </Button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </Form>
        </div>
    )
}
