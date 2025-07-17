"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AiFillLock } from "react-icons/ai";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  amount: number;
  orderData: any;
  onSuccess: () => void;
}

const CheckoutForm = ({ amount, orderData, onSuccess }: CheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (result.error) {
      setMessage(result.error.message || "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setMessage("Payment done, but failed to save order.");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-200 max-w-xl mx-auto">
      <div className="flex items-center gap-2 text-gray-700">
        <AiFillLock />
        <span className="text-sm font-medium">Secure credit card payment</span>
      </div>

      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-gradient-to-r from-black via-gray-900 to-black hover:opacity-90 transition text-white w-full py-3 rounded-lg font-semibold tracking-wide"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
};

const StripeCheckoutForm = ({ amount, orderData, onSuccess }: CheckoutProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret) return <p className="p-4">Loading payment form...</p>;

  const appearance = {
    theme: "flat" as const, // Try "stripe", "night", "flat", or "none"
    variables: {
      fontFamily: "Inter, sans-serif",
      borderRadius: "8px",
      colorPrimary: "#000000",
      colorText: "#333333",
      spacingUnit: "6px",
    },
    rules: {
      ".Input": {
        borderColor: "#D1D5DB",
        boxShadow: "none",
      },
      ".Input:focus": {
        borderColor: "#000",
      },
      ".Label": {
        fontWeight: "500",
        marginBottom: "4px",
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} orderData={orderData} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripeCheckoutForm;
