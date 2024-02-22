import React, { useEffect, useState } from "react";

import { getStripeData } from "@/app/produitStripe/fetchData";
import { PlanType } from "@/types/supabase";
import Packs from "./Packs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CardPack() {
    const [plans, setPlans] = useState<PlanType[]>([]);

    useEffect(() => {
        // On récupère les données directement de stripe
        const fetchPlans = async () => {
            const stripePlans = await getStripeData();
            setPlans(stripePlans);
        };

        fetchPlans();
    }, []);

    return (
        <Card className="w-full space-y-5 border rounded-xl bg-black">
            <CardHeader>
                <CardTitle className="text-white">Pack</CardTitle>
                <CardDescription className="text-white">
                    Choississez un pack pour commencer
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-row">
                <ul>
                    <div className="grid grid-col-6 gap-4 text-white">
                        {plans.map((plan) => (
                            <li key={plan.id}>
                                <Packs plan={plan} />
                            </li>
                        ))}
                    </div>
                </ul>
            </CardContent>
        </Card>
    );
}
