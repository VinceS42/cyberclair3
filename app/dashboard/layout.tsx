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
        <section className="pr-6 max-md:p-0 bg-backgroundCyber max-md:overflow-hidden pl-80 max-xl:pl-24 max-md:pl-0">
            <Sidebar />
            <div className="flex py-6 max-md:py-0 h-screen">
                <div className="relative flex-grow max-w-full rounded-3xl lg:pr-0 bg-[#F4F5F7] px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none">
                    {children}
                </div>
            </div>
        </section>
    )
}
