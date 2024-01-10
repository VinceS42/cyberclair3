import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"
import { SunIcon } from "@heroicons/react/24/solid"
import { MoonIcon, LockOpenIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

import logo from "../../public/assets/img/logo.svg"
import nico from "../../public/assets/img/Nico.png"
import CardAccount from "../components/dashboard/Sidebar/CardAccount"

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
                <div className="flex items-center h-30 pl-7 pr-6 pb-6">
                    <Link
                        href="/dashboard"
                        className="flex justify-center items-center flex-row gap-x-2"
                    >
                        <div>
                            <Image
                                src={logo}
                                width={100}
                                height={120}
                                alt="logo-cyberclaire"
                            />
                        </div>
                        <h1 className="text-white text-">CyberClair3</h1>
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
                    <div className="relative flex w-full p-1 bg-[#202324] rounded-xl before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-n-7 before:rounded-[0.625rem] before:transition-all false">
                        <button className="relative z-1 group flex justify-center items-center h-10 basis-1/2 text-sm tracking-[-.02em] font-semibold transition-colors hover:text-n-1 text-n-1">
                            <SunIcon className="h-6 w-6 mr-3 fill-white" />
                            <span>Light</span>
                        </button>
                        <button className="relative z-1 group flex justify-center items-center h-10 basis-1/2 text-sm tracking-[-.02em] font-semibold transition-colors hover:text-n-1 text-n-1">
                            <MoonIcon className="h-6 w-6 mr-3 fill-white" />
                            <span>Dark</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex py-6 max-md:py-0 h-screen">
                <div className="relative flex-grow max-w-full rounded-[1.25rem] lg:pr-0 bg-white justify-center">
                    <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none max-2xl:py-12 max-md:px-4 max-md:pt-0 max-md:pb-6">
                        <div className="mb-10 text-center">
                            <div className="text-[2.5rem] font-bold leading-[4rem] max-2xl:mb-2 max-2xl:h4">
                                Bienvenue sur CyberClair3
                            </div>
                            <div className="text-2xl text-[#6c7275] leading-10 tracking-tight text-n-4 max-2xl:body1S">
                                Features
                            </div>
                        </div>
                        <div className="max-w-[30.75rem] mx-auto">
                            <button className="flex w-full items-center mb-5 p-3.5 border rounded-xl transition-all hover:border-transparent hover:shadow-2xl last:mb-0 2xl:p-2.5 lg:p-3.5 group">
                                <div className="relative flex justify-center items-center w-14 h-14 mr-6 bg-[#202324] rounded-xl">
                                    <LockOpenIcon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-lg font-medium">Vérification mot de passe</span>
                                <ArrowRightIcon className="w-6 h-6 ml-auto opacity-50 group-hover:opacity-100 transition duration-100 ease-in-out" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
