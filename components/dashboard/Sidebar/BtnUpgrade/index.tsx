import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Rocket } from "lucide-react";
import CardPack from "../Packs/CardPack";

type Props = {
    isPremium: boolean;
};

export default function BtnUpgrade() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex flex-row justify-center items-center gap-x-2 w-full mt-2 h-12 px-0.5 font-medium text-center border-2 border-cyberBorder rounded-xl hover:bg-cyberBorder transition duration-300 ease-in-out">
                    <span>Mise à niveau</span>
                    <Rocket className="h-5 w-5" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-[425px] p-0 m-0 border-none">
                <DialogHeader>
                    <CardPack />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
