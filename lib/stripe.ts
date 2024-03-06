"use server";

import { supabase } from "@/utils/supabase/client";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
    apiVersion: "2023-10-16",
    typescript: true,
});

export async function checkout(email: string, redirectTo: string, priceId: string) {
    // pour passer cet objet ici, qui est utilisé dans le "use server" et qui va être envoyé dans un "use client" je suis obligé de le stringify sinon je via savoir des erreurs
    
    return JSON.stringify(
        await stripe.checkout.sessions.create({
            customer_email: email,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: redirectTo || process.env.NEXT_PUBLIC_BASE_URL,
            cancel_url: process.env.NEXT_PUBLIC_BASE_URL,
        })
    );
}

export async function createStripeCustomerForUser(
    supabaseUserId: string
): Promise<string> {
    try {
        // Je créez le client Stripe et je stocke l'ID utilisateur Supabase
        const customer = await stripe.customers.create({
            metadata: { supabaseUserId },  // J'ajoute l'ID utilisateur Supabase dans les métadonnées du client Stripe pour le référencer plus tard.
        });

         // Après la création, je récupère l'ID du client Stripe.
        const stripeCustomerId = customer.id;

          // J'utilise cet ID pour mettre à jour le profil de l'utilisateur dans Supabase.
        const { data, error } = await supabase
            .from("profiles")
            .update({ stripe_customer_id: stripeCustomerId }) // Je mets à jour la colonne 'stripe_customer_id' avec le nouvel ID client Stripe.
            .eq("stripe_customer_id", supabaseUserId); // Je m'assure de ne mettre à jour que le profil de l'utilisateur avec l'ID correspondant.

        if (error) {
            console.error("Error updating profiles:", error);
            throw error;
        }

        return stripeCustomerId;
    } catch (error) {
        console.error("Error creating Stripe customer:", error);
        throw error; // Propagez l'erreur pour gestion externe
    }
}
