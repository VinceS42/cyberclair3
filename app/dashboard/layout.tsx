import type { Metadata } from "next"

import Sidebar from "@/components/dashboard/Sidebar"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "A voir avec Nicolas",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {    
    
    return (
        <section className="pr-0 md:pr-6 bg-cyberPrimary max-md:overflow-hidden pl-0 xl:pl-80 sm:pl-24">
            <Sidebar />
            <div className="flex py-6 max-md:py-0 h-screen">
                <div className="relative flex-grow max-w-full rounded-3xl lg:pr-0 bg-[#F4F5F7] px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none dark:bg-cyberSecondary">
                    {children}
                </div>
            </div>
        </section>
    )
}
