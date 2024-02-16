"use client";

import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { useSession } from "@/context/user";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut, Settings, User } from "lucide-react";

import BtnUpgrade from "../BtnUpgrade";
import CardUpdate from "../UpdateProfil/CardUpdate";

type Props = {
    isPremium: boolean;
};

export default function CardAccount({ isPremium }: Readonly<Props>) {
    const router = useRouter();
    const { user } = useSession();
    console.log("User ID:", user);
    // console.log(user);

    // if (user && "first_name" in user) {
    //     console.log(user.first_name);
    // } else {
    //     console.log("first_name property does not exist on user object");
    // }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return console.error(error);
        } else {
            router.push("/");
        }
    }
    // console.log("Image URL:", user?.avatar);

    return (
        user && (
            <div className="mb-3 shadow-xl">
                <div className="p-2.5 bg-cyberSecondary rounded-xl">
                    <div className="flex items-center justify-between gap-x-2 text-white px-2.5 py-2.5 pb-4.5">
                        <div className="relative flex flex-row min-w-10 min-h-10 gap-x-3 w-full">
                            {user.avatar_url ? (
                                <Image
                                    src={user.avatar_url}
                                    alt="Image de l'utilisateur"
                                    className="rounded-full object-cover h-10 w-10"
                                    width={100}
                                    height={100}
                                    sizes="100vw"
                                />
                            ) : (
                                <div className="rounded-full bg-gray-300 h-10 w-10 flex items-center justify-center">
                                    <User className="h-6 w-6 text-gray-600" />
                                </div>
                            )}
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row gap-x-1 font-semibold text-sm">
                                    <span>{user.last_name}</span>
                                    <span>{user.first_name}</span>
                                    <div className="flex self-start h-full ml-auto">
                                        <div className="bg-lightGreen rounded-lg px-3">
                                            <span className="text-black text-xs font-semibold">
                                                {isPremium ? "Pro" : "Free"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-medium text-sm text-cyberTextSecondary mt-1">
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <button
                            onClick={signOut}
                            className="flex gap-x-1 items-center justify-end w-full h-12 font-medium group"
                        >
                            <LogOut className="h-5 w-5 opacity-30 group-hover:opacity-100 transition duration-100 ease-in-out" />
                            <span className="text-white opacity-50 group-hover:opacity-100 transition duration-100 ease-in-out">
                                Déconnexion
                            </span>
                        </button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex gap-x-1 items-center justify-start w-full h-12 font-medium group">
                                    <Settings className="h-5 w-5 opacity-30 group-hover:opacity-100 transition duration-100 ease-in-out" />
                                    <span className="text-white opacity-50 group-hover:opacity-100 transition duration-100 ease-in-out">
                                        Paramètres
                                    </span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:min-w-[425px] w-4 p-0 m-0">
                                <DialogHeader>
                                    <CardUpdate />
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <BtnUpgrade />
                </div>
            </div>
        )
    );
}
