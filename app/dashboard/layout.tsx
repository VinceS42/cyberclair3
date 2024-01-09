import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import logo from "../../public/assets/img/logo.svg";
import {
    ArrowRightStartOnRectangleIcon,
    Cog6ToothIcon,
    MoonIcon,
    ChatBubbleBottomCenterTextIcon,
    LockOpenIcon,
} from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import nico from "../../public/assets/img/Nico.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "A voir avec Nicolas",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="pr-6 max-md:p-0 bg-background max-md:overflow-hidden pl-80 max-xl:pl-24 max-md:pl-0">
            <div className="fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-10 px-4 max-md:invisible max-md:opacity-0 max-md:transition-opacity w-80 pb-58">
                <div className="flex items-center h-30 pl-7 pr-6 pb-6">
                    <a
                        href="/"
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
                    </a>
                </div>
                <div>
                    <a className="flex items-center h-12 text-sm tracking-[-.02em] font-semibold rounded-lg transition-colors hover:text-n-1 text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] px-5">
                        <LockOpenIcon className="mr-3 h-6 w-6 stroke-white fill-red-500" />
                        <p className="ml-5 text-white">Have been pown</p>
                    </a>
                    <button></button>
                </div>
                <div className=" absolute text-white left-0 bottom-0 right-0 pb-6 px-4 before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[#131617] before:pointer-events-none max-md:px-3">
                    <div className="mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]">
                        <div className="p-2.5 bg-[#202324] rounded-xl">
                            <div className="text-white flex items-center px-2.5 py-2.5 pb-4.5">
                                <div className="relative w-10 h-10">
                                    <Image
                                        src={nico}
                                        alt="Nicol le beaugoss"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="ml-4 mr-4">
                                    <div className="font-semibold text-sm">
                                        Nicolas Le Meilleur Patron Du Monde
                                    </div>
                                    <div></div>
                                    <div className="font-medium text-xs text-[#e8ecef]/[.5]">
                                        nicolas.odin@codaza.fr
                                    </div>
                                </div>
                            </div>
                            <button className="group flex items-center w-full h-12 font-semibold transition-colors hover:text-[#0084ff]">
                                <ArrowRightStartOnRectangleIcon className=" inline-block mr-4 fill-n-4 h-6 w-6 opacity-30" />
                                Log out
                            </button>
                            <button className="group flex items-center w-full h-12 font-semibold transition-colors hover:text-[#0084ff]">
                                <Cog6ToothIcon className="inline-block mr-4 fill-n-4 h-6 w-6 opacity-30" />
                                Setting
                            </button>
                            <div className="inline-flex justify-center items-center w-full mt-2 h-24 px-0.5 font-semibold leading-normal border-2 border-[#343839]">
                                Update
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full p-1 bg-[#202324] rounded-xl before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-n-7 before:rounded-[0.625rem] before:transition-all false">
                        <button className="relative z-1 group flex justify-center items-center h-10 basis-1/2 text-sm tracking-[-.02em] font-semibold transition-colors hover:text-n-1 text-n-1">
                            <SunIcon className="h-6 w-6 mr-3 fill-white" />
                            Light
                        </button>
                        <button className="relative z-1 group flex justify-center items-center h-10 basis-1/2 text-sm tracking-[-.02em] font-semibold transition-colors hover:text-n-1 text-n-1">
                            <MoonIcon className="h-6 w-6 mr-3 fill-white" />
                            Dark
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
                            <a
                                href="#"
                                className="group flex items-center mb-5 p-3.5 border-4 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                            >
                                <div className="relative flex justify-center items-center w-15 h-15 mr-6">
                                    <LockOpenIcon className="inline-block w-6 h-6 relative z-1" />
                                </div>
                                test
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
