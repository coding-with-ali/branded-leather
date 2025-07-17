import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: Request) {
  const { amount } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // USD -> cents
      currency: "usd",
      payment_method_types: ["card"], // 👈 Only Card option shown
      automatic_payment_methods: {
        enabled: false, // 👈 Turn off auto options like Link, ApplePay
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: "Stripe payment setup failed" }, { status: 500 });
  }
}
