"use server";

import { stripe } from "@/utils/stripe/stripe";

export async function getStripeData() {
    const pricesResponse = await stripe.prices.list();
    const prices = pricesResponse.data;

    const plans = await Promise.all(
        prices.map(async (price) => {
            const product = await stripe.products.retrieve(
                price.product as string
            );
            return {
                name: product.name,
                id: price.id,
                price: price.unit_amount! / 100,
                interval: price.recurring?.interval ?? null,
            };
        })
    );

    return plans;
}
