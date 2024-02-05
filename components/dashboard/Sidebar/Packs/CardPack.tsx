import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Packs from "./Packs";

// Type pour les données de pack
type PackType = {
    id: string;
    name: string;
    descritpion: string;
    price: string;
};

export default function CardPack() {
    const [packs, setPacks] = useState<PackType[]>([]);

    useEffect(() => {
        async function loadData() {
            const { data, error } = await supabase.from("pack").select("*");
            if (error) {
                console.error("Error fetching packs:", error);
                return;
            }
            setPacks(data);
        }

        loadData();
    }, []);

    console.log(packs);

    return (
        <Card className=" w-full space-y-5 border rounded-xl bg-black">
            <CardHeader>
                <CardTitle className="text-white">Pack</CardTitle>
                <CardDescription className="text-white">
                    Choississez un pack pour commencer
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <ul>
                    <div className="flex gap-4 text-white ">
                        {packs.map((pack) => (
                            <Packs key={pack.id} pack={pack} />
                        ))}
                    </div>
                </ul>
            </CardContent>
        </Card>
    );
}
