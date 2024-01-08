import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import logo from "../../public/assets/img/logo.svg";
import {
    ArrowRightStartOnRectangleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
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
                        <h1 className="text-white">CyberClair3</h1>
                    </a>
                </div>
                <div>
                    <ul>
                        <li className="text-white">Test2</li>
                        <li className="text-white">Test3</li>
                        <li className="text-white">Test1</li>
                    </ul>
                </div>
                <div className=" absolute text-white left-0 bottom-0 right-0 pb-6 px-4 before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none max-md:px-3">
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
                                    <div className="font-medium text-xs text-[#e8ecef]/[.5]">
                                        nicolas.odin@codaza.fr
                                    </div>
                                </div>
                            </div>
                            <button className="group flex items-center w-full h-12 base2 font-semibold transition-colors hover:text-primary-1">
                                <ArrowRightStartOnRectangleIcon className="inline-block mr-4 fill-n-4 transition-colors group-hover:fill-primary-1 h-6 w-6 opacity-30" />
                                Log out
                            </button>
                            <button className="group flex items-center w-full h-12 base2 font-semibold transition-colors hover:text-primary-1">
                                <Cog6ToothIcon className="inline-block mr-4 fill-n-4 transition-colors group-hover:fill-primary-1 h-6 w-6 opacity-30" />
                                Setting
                            </button>
                            <div className="btn-stroke-dark w-full mt-2">Update</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-6 max-md:py-0 h-screen">
                <div className="relative flex-grow max-w-full rounded-[1.25rem] pr-[22.5rem] 2xl:pr-80 lg:pr-0 bg-white">
                    <p className="p-20">jazgduizagdyuizagduyzagduyazgdyuazg</p>
                </div>
            </div>
        </main>
    );
}
