import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTransition } from "react";
import {
    ArrowRightEndOnRectangleIcon,
    AtSymbolIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/utils/utils";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
});

export default function SignInForm({
    signIn,
}: Readonly<{
    signIn: (formData: FormData) => Promise<void>;
}>) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            signIn(formData);
        });

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
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
                                    autoComplete="current-password"
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
                <Button type="submit" className="w-full flex gap-2">
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5 mr-3" />
                    <p>Connexion</p>
                    <AiOutlineLoading3Quarters
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    );
}
