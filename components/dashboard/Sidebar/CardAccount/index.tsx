"use client"
import Image from "next/image"
import {
    ArrowRightStartOnRectangleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

import BtnUpgrade from "../BtnUpgrade"
import { useEffect } from "react"
import { get } from "http"

type Props = {
    avatar: string
    firstName: string
    lastName: string
    email: string
    isPremium: boolean
}

export default function CardAccount({
    avatar,
    firstName,
    lastName,
    email,
    isPremium,
}: Readonly<Props>) {
    const router = useRouter()
    const supabase = createClient()

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            return console.error(error)
        } else {
            router.push("/")
        }
    }

    return (
        <div className="mb-3 shadow-xl">
            <div className="p-2.5 bg-[#202324] rounded-xl">
                <div className="flex items-center gap-x-2 text-white px-2.5 py-2.5 pb-4.5">
                    <div className="relative min-w-10 min-h-10">
                        <Image
                            src={avatar}
                            alt="Nico le beaugoss"
                            className="rounded-full object-cover"
                            sizes="100vw"
                            fill
                        />
                    </div>
                    <div>
                        <div className="flex flex-row gap-x-1 font-semibold text-sm">
                            <span>{firstName}</span>
                            <span>{lastName}</span>
                        </div>
                        <div className="font-medium text-xs text-[#e8ecef]/[.5]">
                            <span>{email}</span>
                        </div>
                    </div>
                    <div className="flex self-start h-full">
                        <div className="bg-green-500 rounded-lg px-3 py-0.5">
                            <span className="text-black text-xs font-semibold">
                                {isPremium ? "Premium" : "Free"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <button
                        onClick={signOut}
                        className="flex gap-x-2 items-center w-full h-12 font-semibold transition-colors hover:text-[#0084ff] text-sm"
                    >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5 opacity-30" />
                        <span>Log out</span>
                    </button>
                    <button className="flex gap-x-2 items-center w-full h-12 font-semibold text-sm group">
                        <Cog6ToothIcon className="h-5 w-5 opacity-30 group-hover:opacity-100 transition duration-100 ease-in-out" />
                        <span className="text-white opacity-50 group-hover:opacity-100 transition duration-100 ease-in-out">
                            Settings
                        </span>
                    </button>
                </div>
                <BtnUpgrade isPremium={isPremium} />
            </div>
        </div>
    )
}
