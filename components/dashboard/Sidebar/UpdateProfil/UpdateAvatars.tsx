import { useSession } from "@/context/user";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function UpdateAvatars() {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { user, setUser } = useSession();
    const supabaseStorage =
        "https://hdsuwflzlalsilyekern.supabase.co/storage/v1/object/public/avatars/";

 
    //**************************/ UPDATE AVATAR_URL /***************************//

    const updateAvatarUrl = async (publicUrl: string) => {
        const { error } = await supabase
            .from("profiles")
            .update({ avatar_url: publicUrl })
            .eq("id", user?.id);

        if (error) {
            toast({
                title: "Error",
                description: error.message,
                duration: 9000,
            });
        }
        toast({
            title: "Avatar url updated",
            duration: 9000,
        });
    };

    //**************************/ UPLOAD AIMAGE DANS LE STORAGE /***************************//

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            throw new Error("Veuiller selectionner une image.");
        }

        try {
            setUploading(true);
            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `${user?.email}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            const publicUrl = `${supabaseStorage}${filePath}`;

            if (uploadError) {
                setUploading(false);
                throw uploadError;
            }

            await updateAvatarUrl(publicUrl);
            setAvatarUrl(publicUrl);
            setUser({ ...user, avatar_url: publicUrl });
        } catch (error) {
            console.error("L'upload de l'avatar a échoué:", error);
            toast({ title: "L'upload de l'avatar a échoué.", duration: 5000 });
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                {user.avatar_url ? (
                    <Avatar>
                        <AvatarImage
                            src={user.avatar_url}
                            alt={"Image de " + user.first_name}
                        />
                    </Avatar>
                ) : (
                    <div className="rounded-full bg-gray-300 h-10 w-10 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                    </div>
                )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture">Changez votre avatars :</Label>
                <Input
                    id="picture"
                    type="file"
                    disabled={uploading}
                    onChange={(e) => uploadAvatar(e)}
                />
            </div>
        </>
    );
}
