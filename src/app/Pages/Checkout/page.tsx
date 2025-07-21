
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      router.push("/Pages/Cart");
    }
  }, [router]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderData = {
    customerName: `${firstName} ${lastName}`,
    email,
    phone,
    state,
    address,
    city,
    postalCode,
    products: cartItems.map((item) => ({
      _type: "product",
      _ref: item._id,
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.image,
    })),
    totalPrice: subtotal,
    status: "pending",
    orderDate: new Date().toISOString(),
  };

  const handleContinue = () => {
    sessionStorage.setItem("checkoutOrderData", JSON.stringify(orderData));
    router.push("/Pages/Payment");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Form Section */}
        <div className="flex-1 bg-white p-6 rounded-md shadow border">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border p-3 rounded w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-3 rounded w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded w-full md:col-span-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-3 rounded w-full md:col-span-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded w-full md:col-span-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              className="border p-3 rounded w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border p-3 rounded w-full md:col-span-2"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Continue to Payment */}
          {email && firstName && lastName && phone && state && address && city && postalCode && cartItems.length > 0 && (
            <button
              onClick={handleContinue}
              className="mt-8 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
            >
              Continue to Payment
            </button>
          )}
        </div>

        {/* Right Order Summary Section */}
        <div className="w-full md:w-[400px] bg-white p-6 rounded-md shadow border">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 items-start">
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[15px]">{item.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-800 font-medium">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-lg font-semibold flex justify-between border-t pt-4">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
