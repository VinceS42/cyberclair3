import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateAvatars() {
    return (
        <>
            <div className="flex justify-center">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                </Avatar>
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture">Changez votre avatars :</Label>
                <Input id="picture" type="file" />
            </div>
        </>
    );
}
