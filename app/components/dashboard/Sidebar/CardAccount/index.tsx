import Image from "next/image"
import {
    ArrowRightStartOnRectangleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline"

import BtnUpgrade from "../BtnUpgrade"

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
    return (
        <div className="mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]">
            <div className="p-2.5 bg-[#202324] rounded-xl">
                <div className="text-white flex items-center px-2.5 py-2.5 pb-4.5">
                    <div className="relative w-10 h-10">
                        <Image
                            src={avatar}
                            alt="Nicol le beaugoss"
                            className="rounded-full object-cover"
                            layout="fill"
                        />
                    </div>
                    <div className="ml-4 mr-4">
                        <div className="flex flex-row gap-x-1 font-semibold text-sm">
                            <span>{firstName}</span>
                            <span>{lastName}</span>
                        </div>
                        <div></div>
                        <div className="font-medium text-xs text-[#e8ecef]/[.5]">
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <button className="flex gap-x-2 items-center w-full h-12 font-semibold transition-colors hover:text-[#0084ff] text-sm">
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5 opacity-30" />
                        <span>Log out</span>
                    </button>
                    <button className="flex gap-x-2 items-center w-full h-12 font-semibold transition-colors hover:text-[#0084ff] text-sm">
                        <Cog6ToothIcon className="h-5 w-5 opacity-30" />
                        <span>Settings</span>
                    </button>
                </div>
                <BtnUpgrade isPremium={isPremium} />
            </div>
        </div>
    )
}
