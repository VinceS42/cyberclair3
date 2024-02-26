import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";

import { useSession } from "@/context/user";
import { checkout } from "@/lib/stripe";
import { PlanType } from "@/types/supabase";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/utils";
export default function Packs({ plan }: { plan: PlanType }) {
    const { user } = useSession();
    const pathname = usePathname();
    const [isLoading, setLoading] = useState(false);

    const handleSubscriptionStart = async (e: any) => {
        if (!user) {
            console.log("Utilisateur non connecté.");
            return;
        }
        const priceId = plan.id;
        e.preventDefault();
        setLoading(true);
        const data = JSON.parse(
            await checkout(user?.email, location.origin + pathname, priceId)
        );

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
        );
        await stripe?.redirectToCheckout({ sessionId: data.id });
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubscriptionStart}
            className="p-5 h-full border rounded-xl text-white"
        >
            <div className="my-4 space-y-3 text-2xl font-bold">
                <h2>{plan.name}</h2>
            </div>
            <div className="my-4 text-2xl font-bold">
                <p>{plan.interval}</p>
            </div>
            <div className="my-4">
                <p>{plan.price} €</p>
            </div>
            <button className="flex justify-center items-center gap-2 w-full p-2 my-4 rounded-lg bg-red-800">
                Selectionner{" "}
                <Loader2
                    className={cn(
                        "animate-spin",
                        isLoading ? "block" : "hidden"
                    )}
                />
            </button>
        </form>
    );
}
