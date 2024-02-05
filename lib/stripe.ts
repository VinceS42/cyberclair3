"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);

export async function createCheckout(
    email: string,
    priceId: string,
    redirectTo: string
) {
    // On utilise l'API de Stripe pour créer une session de paiement et on JSON.stringify le résultat pour le renvoyer au client vu que l'on est en mode server.

    return JSON.stringify(
        await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            customer_email: email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: redirectTo || `${process.env.SITE_URL}/dashboard`,
            cancel_url: process.env.SITE_URL,
        })
    );
}
