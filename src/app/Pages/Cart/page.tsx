"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateQuantity } from "../../redux/cartslice";
import { RootState } from "../../redux/store";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handleQuantityChange = (_id: string, size: string | undefined, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ _id, size, quantity }));
    }
  };

  const handleRemove = (_id: string, size: string | undefined) => {
    dispatch(remove({ _id, size }));
  };

  // ✅ Subtotal calculation with safe string coercion
  const subtotal = cartItems.reduce((acc, product) => {
    const price = parseFloat(String(product.price).replace("$", "")) || 0;
    return acc + price * (product.quantity || 1);
  }, 0);

  const handleProceedToCheckout = () => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    router.push("/Pages/Checkout");
  };

  return (
    <div>
      {/* Header Section */}
      <div className="w-full h-[286px] bg-black relative">
        <div className="absolute top-28 left-10 md:top-28 md:left-60">
          <h2 className="text-white font-dancing lg:font-[forte] text-[36px] md:text-[36px] font-[700]">
            Your Cart
          </h2>
          <Link href="/" className="px-2 text-white font-playfair">Home</Link>
          <span className="px-2 text-white">/</span>
          <span className="text-white text-[16px] font-[500] px-2 font-playfair">Cart</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty!</p>
          ) : (
            cartItems.map((item: CartItem) => (
              <div key={`${item._id}-${item.size}`} className="flex items-center bg-white shadow-md rounded-lg p-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.name}
                    height={100}
                    width={100}
                    className="rounded-md"
                  />
                </div>

                {/* Info */}
                <div className="ml-4 flex-grow">
                  <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
                  {item.size && (
                    <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                  )}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <h5 className="text-lg font-medium text-gray-600 mt-2">
                    {item.price}
                  </h5>
                </div>

                {/* Remove */}
                <button
                  className="bg-[#99582A] text-white px-4 py-2 rounded transition-colors"
                  onClick={() => handleRemove(item._id, item.size)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="col-span-1">
          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Cart Totals</h3>
            <div className="mt-4 flex justify-between text-sm md:text-base">
              <p>Subtotal:</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="block bg-[#99582A] text-white px-4 py-2 rounded mt-4 w-full text-center"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
