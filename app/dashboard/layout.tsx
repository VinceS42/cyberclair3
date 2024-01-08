import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import "../globals.css"
import logo from "../../public/assets/img/logo.svg"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Dashboard",
    description: "A voir avec Nicolas",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="pr-6 max-md:p-0 bg-background max-md:overflow-hidden pl-80 max-xl:pl-24 max-md:pl-0">
            <div className="fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-10 px-4 max-md:invisible max-md:opacity-0 max-md:transition-opacity w-80 pb-58">
                <div className="flex items-center h-30 pl-7 pr-6">
                    <a href="/" className="flex w-[11.88rem] justify-center">
                        <Image
                            src={logo}
                            width={100}
                            height={40}
                            className="inline-block"
                            alt="logo-cyberclaire"
                        />
                    </a>
                </div>
                <div></div>
                <div></div>
            </div>
            <div className="flex py-6 max-md:py-0 h-screen bg-white">
                <div className="relative flex-grow max-w-full rounded-[1.25rem] pr-[22.5rem] 2xl:pr-80 lg:pr-0">
                    <p className="p-20 text-white">
                        jazgduizagdyuizagduyzagduyazgdyuazg
                    </p>
                </div>
            </div>
        </main>
    )
}
