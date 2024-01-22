import Image from "next/image"
import Link from "next/link"

import logo from "../../../../public/assets/img/logo.svg"
import nico from "../../../../public/assets/img/Nico.png"
import CardAccount from "./CardAccount"
import ToggleTheme from "./ToggleTheme"
import MenuItem from "../MenuItem"
import { HomeModernIcon, LockClosedIcon } from "@heroicons/react/24/outline"

const fakeUserData = {
    id: 1,
    firstName: "Nicolas",
    lastName: "Beau gosse",
    email: "nicolas.odin@codaza.fr",
    isPremium: false,
}

export default function Sidebar() {
    return (
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
            <div className="flex flex-col">
                <MenuItem
                    title="Tableau de bord"
                    icon={<HomeModernIcon className="text-white" />}
                    href="/dashboard"
                />
                <MenuItem
                    title="Vérification mot de passe"
                    icon={<LockClosedIcon className="text-white" />}
                    href="dashboard/password-check"
                />
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
    )
}
