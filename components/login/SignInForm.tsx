import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import * as z from "zod"
import { Mail, Lock, LogIn, Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
    password: z
        .string()
        .min(1, {
            message: "Veuillez entrer un mot de passe.",
        })
        .length(6, {
            message: "Votre mot de passe doit contenir au moins 6 caractères.", // TODO: mettre 8 caractères minimum
        }),
})

export default function SignInForm({
    signIn,
}: Readonly<{
    signIn: (formData: FormData) => Promise<void>
}>) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const formData = new FormData()
            formData.append("email", data.email)
            formData.append("password", data.password)

            signIn(formData)
        })

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
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
                                    placeholder="test03@gmail.com"
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
                                <Lock className="w-5 h-5 mr-2" />
                                <p className="text-base">Mot de passe :</p>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-white text-black"
                                    placeholder="azerty"
                                    {...field}
                                    type="password"
                                    onChange={field.onChange}
                                    autoComplete="current-password"
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
                    {!isPending ? (
                        <LogIn className="w-5 h-5" />
                    ) : (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    {isPending ? (
                        <span className="opacity-50">Connexion...</span>
                    ) : (
                        "Connexion"
                    )}
                </Button>
            </form>
        </Form>
    )
}
