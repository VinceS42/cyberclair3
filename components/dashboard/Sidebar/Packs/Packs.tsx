import { useSession } from "@/context/user";
import { checkout } from "@/lib/stripe";
import { usePathname } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useTransition } from "react";

export default function Packs() {
    const { user } = useSession();
    const pathname = usePathname();
    const [isPending, startTansition] = useTransition();
    const handleSubscriptionStart = async (e: any) => {
        console.log(user.email);
        console.log(process.env.NEXT_PUBLIC_BASE_URL);
        console.log(pathname);

        if (!user) {
            console.log("Utilisateur non connecté.");
            return;
        }
        e.preventDefault();
        startTansition(async () => {
            const data = JSON.parse(await checkout(user?.email, location.origin + pathname));

            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
            );
            await stripe?.redirectToCheckout({ sessionId: data.id });
        });
    };

    return (
        <form
            onSubmit={handleSubscriptionStart}
            className="p-5 text-white border rounded-xl"
        >
            <div className="my-4">
                <h2>Test</h2>
            </div>
            <div className="my-4">
                <p>Abbone toi</p>
            </div>
            <div className="my-4">
                <p>9.99 €</p>
            </div>
            <button className="w-full p-2 my-4 rounded-lg bg-red-800 ">
                Selectionner
            </button>
        </form>
    );
}
