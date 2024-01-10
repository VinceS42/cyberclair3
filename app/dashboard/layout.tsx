import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"
import { SunIcon } from "@heroicons/react/24/solid"
import {
    MoonIcon,
    LockOpenIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

import logo from "../../public/assets/img/logo.svg"
import nico from "../../public/assets/img/Nico.png"
import CardAccount from "../components/dashboard/Sidebar/CardAccount"
import CardFeature from "../components/dashboard/CardFeature"
import Heading from "../components/dashboard/Heading"
import ToggleTheme from "../components/dashboard/Sidebar/ToggleTheme"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Dashboard",
    description: "A voir avec Nicolas",
}

const fakeUserData = {
    id: 1,
    firstName: "Nicolas",
    lastName: "Beau gosse",
    email: "nicolas.odin@codaza.fr",
    isPremium: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="pr-6 max-md:p-0 bg-background max-md:overflow-hidden pl-80 max-xl:pl-24 max-md:pl-0">
            <div className="fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-10 px-4 max-md:invisible max-md:opacity-0 max-md:transition-opacity w-80 pb-58">
                <div className="flex items-center h-30 pb-6">
                    <Link
                        href="/dashboard"
                        className="flex justify-center items-center flex-row gap-x-2"
                    >
                        <Image
                            src={logo}
                            alt="logo-cyberclaire"
                            className="w-12 h-12"
                        />
                        <h1 className="text-white text-2xl font-bold">
                            CyberClair3
                        </h1>
                    </Link>
                </div>
                <div>
                    <button className="flex w-full items-center h-12 text-sm font-semibold rounded-lg transition-colors hover:text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] px-5">
                        <LockOpenIcon className="mr-3 h-6 w-6 stroke-white fill-red-500" />
                        <p className="ml-5 text-white">Have been pown</p>
                    </button>
                    <button></button>
                </div>
                <div className="absolute text-white left-0 bottom-0 right-0 pb-6 px-4 before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[#131617] before:pointer-events-none max-md:px-3">
                    <CardAccount
                        avatar={nico.src}
                        firstName={fakeUserData.firstName}
                        lastName={fakeUserData.lastName}
                        email={fakeUserData.email}
                        isPremium={fakeUserData.isPremium}
                    />
                    <ToggleTheme />
                </div>
            </div>
            <div className="flex py-6 max-md:py-0 h-screen">
                <div className="relative flex-grow max-w-full rounded-3xl lg:pr-0 bg-[#F3F5F7] justify-center">
                    <div className="px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none max-2xl:py-12 max-md:px-4 max-md:pt-0 max-md:pb-6">
                        <Heading
                            title="Protégez votre identité en ligne"
                            description="N'attendez pas de perdre votre sécurité."
                        />
                        <div className="max-w-[30rem] mx-auto">
                            <CardFeature
                                title="Vérification mot de passe"
                                description="Vérifiez si votre mot de passe a été compromis"
                                icon={
                                    <LockOpenIcon className="w-6 h-6 text-white" />
                                }
                                href="/password-check"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
