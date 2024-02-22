import Image from "next/image";
import Link from "next/link";
import { Home, AsteriskSquare } from "lucide-react";

import logo from "../../../public/assets/img/logo.svg";
import CardAccount from "./CardAccount";
import ToggleTheme from "./ToggleTheme";
import MenuItem from "../MenuItem";

export default function Sidebar() {
    return (
        <div className="fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-10 px-5 w-0 pb-58 xl:w-80 lg:w-24 sm:w-24">
            <div className="flex items-center h-30 pb-6 justify-center">
                <Link
                    href="/dashboard"
                    className="flex flex-row justify-center items-center  gap-x-2"
                >
                    <Image
                        src={logo}
                        alt="logo-cyberclaire"
                        className="w-12 h-12 lg:items-center"
                    />
                    <h1 className="xl:block hidden text-white text-2xl font-bold">
                        CyberClair3
                    </h1>
                </Link>
            </div>
            <div className="grow overflow-y-auto scroll-smooth scrollbar-none flex flex-col lg:items-center">
                <MenuItem
                    title="Tableau de bord"
                    icon={<Home className="text-white" />}
                    href="/dashboard"
                />
                <MenuItem
                    title="Vérifier mon mot de passe"
                    icon={<AsteriskSquare className="text-white" />}
                    href="dashboard/password-check"
                />
            </div>
            <div className="absolute text-white left-0 bottom-0 right-0 pb-6 px-3 before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[#131617] before:pointer-events-none max-md:px-3">
                <CardAccount />
                <ToggleTheme />
            </div>
        </div>
    );
}
