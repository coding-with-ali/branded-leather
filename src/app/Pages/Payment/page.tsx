
// app/Pages/Payment/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StripeCheckoutForm from "@/app/componets/StripeCheckoutForm"; // adjust if needed
import { FaLock, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

const PaymentPage = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("checkoutOrderData");
    if (storedOrder) {
      const parsed = JSON.parse(storedOrder);
      setOrderData(parsed);
      setAmount(parsed.totalPrice);
    } else {
      router.push("/Pages/Checkout");
    }
  }, [router]);

  if (!orderData) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <FaLock className="text-green-600 text-xl" />
        <h1 className="text-2xl font-bold text-gray-800">Secure Payment</h1>
      </div>

      <div className="flex justify-center gap-3 mb-4 text-3xl text-gray-600">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcAmex />
        <FaCcDiscover />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <StripeCheckoutForm
          amount={amount}
          orderData={orderData}
          onSuccess={() => {
            alert("Order placed successfully!");
            sessionStorage.removeItem("cartItems");
            sessionStorage.removeItem("checkoutOrderData");
            router.push("/Pages/Order");
          }}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
