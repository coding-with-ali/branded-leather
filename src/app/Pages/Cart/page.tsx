// "use client";

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { remove, updateQuantity } from "../../redux/cartslice";
// import { RootState } from "../../redux/store";
// import Image from "next/image";
// import Link from "next/link";
// import { urlFor } from "@/sanity/lib/image";
// import { useRouter } from "next/navigation";
// import NewCollectionBanner from "@/app/componets/NewCollectionBanner";
// import RelatedProducts from "@/app/componets/RelatedProducts";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   size?: string;
// }

// const Cart: React.FC = () => {
//   const dispatch = useDispatch();
//   const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);
//   const router = useRouter();

//   const handleQuantityChange = (_id: string, size: string | undefined, quantity: number) => {
//     if (quantity > 0) {
//       dispatch(updateQuantity({ _id, size, quantity }));
//     }
//   };

//   const handleRemove = (_id: string, size: string | undefined) => {
//     dispatch(remove({ _id, size }));
//   };

//   // ✅ Subtotal calculation with safe string coercion
//   const subtotal = cartItems.reduce((acc, product) => {
//     const price = parseFloat(String(product.price).replace("$", "")) || 0;
//     return acc + price * (product.quantity || 1);
//   }, 0);

//   const handleProceedToCheckout = () => {
//     sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
//     router.push("/Pages/Checkout");
//   };

//   return (
//     <div className="bg-[#fdf7ee]">
//       {/* Main Content */}
//       <div className="bg-[#fdf7ee] text-black max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Product List */}
//         <div className="col-span-2 space-y-6">
//           {cartItems.length === 0 ? (
//             <p className="text-center text-gray-500">Your cart is empty!</p>
//           ) : (
//             cartItems.map((item: CartItem) => (
//               <div key={`${item._id}-${item.size}`} className="flex items-center bg-white shadow-md rounded-lg p-4">
//                 {/* Image */}
//                 <div className="flex-shrink-0">
//                   <Image
//                     src={urlFor(item.image).url()}
//                     alt={item.name}
//                     height={100}
//                     width={100}
//                     className="rounded-md"
//                   />
//                 </div>

//                 {/* Info */}
//                 <div className="ml-4 flex-grow">
//                   <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
//                   {item.size && (
//                     <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
//                   )}
//                   <div className="flex items-center mt-2">
//                     <button
//                       onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span className="mx-4">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <h5 className="text-lg font-medium text-gray-600 mt-2">
//                     $
//                     {item.price}
//                   </h5>
//                 </div>

//                 {/* Remove */}
//                 <button
//                   className="bg-[#99582A] text-white px-4 py-2 rounded transition-colors"
//                   onClick={() => handleRemove(item._id, item.size)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Totals */}
// <div className="col-span-1">
//   <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
//     <h3 className="text-lg font-semibold">Cart Totals</h3>

//     {/* Subtotal */}
//     <div className="mt-4 flex justify-between text-sm md:text-base">
//       <p>Subtotal:</p>
//       <p>${subtotal.toFixed(2)}</p>
//     </div>

//     {/* Shipping Fee */}
//     <div className="mt-2 flex justify-between text-sm md:text-base">
//       <p>Shipping Fee:</p>
//       <p>$10.00</p>
//     </div>

//     {/* Divider */}
//     <hr className="my-3 border-t border-gray-300" />

//     {/* Final Total */}
//     <div className="flex justify-between text-base font-semibold">
//       <p>Total:</p>
//       <p>${(subtotal + 10).toFixed(2)}</p>
//     </div>

//     <button
//       onClick={handleProceedToCheckout}
//       className="block bg-[#99582A] text-white px-4 py-2 rounded mt-4 w-full text-center"
//     >
//       Proceed to Checkout
//     </button>
//   </div>
// </div>

//       </div>
//         <div className="mx-1 md:mx-20 lg:mx-48">
//         <RelatedProducts />
//       </div>
//     </div>
//   );
// };

// export default Cart;





"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateQuantity } from "../../redux/cartslice";
import { RootState } from "../../redux/store";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import RelatedProducts from "@/app/componets/RelatedProducts";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  // ✅ Shipping state
  const [shippingCost, setShippingCost] = useState<number>(0);

  const handleQuantityChange = (_id: string, size: string | undefined, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ _id, size, quantity }));
    }
  };

  const handleRemove = (_id: string, size: string | undefined) => {
    dispatch(remove({ _id, size }));
  };

  // ✅ Subtotal calculation
  const subtotal = cartItems.reduce((acc, product) => {
    const price = parseFloat(String(product.price).replace("$", "")) || 0;
    return acc + price * (product.quantity || 1);
  }, 0);

  const total = subtotal + shippingCost;

  const handleProceedToCheckout = () => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("shippingCost", String(shippingCost));
    router.push("/Pages/Checkout");
  };

  return (
    <div className="bg-[#fdf7ee]">
      <div className="bg-[#fdf7ee] text-black max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty!</p>
          ) : (
            cartItems.map((item: CartItem) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex items-center bg-white shadow-md rounded-lg p-4"
              >
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
                      onClick={() =>
                        handleQuantityChange(item._id, item.size, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.size, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <h5 className="text-lg font-medium text-gray-600 mt-2">
                    ${item.price}
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

            {/* Subtotal */}
            <div className="mt-4 flex justify-between text-sm md:text-base">
              <p>Subtotal:</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            {/* Shipping Options */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Shipping</h4>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="0"
                    checked={shippingCost === 0}
                    onChange={() => setShippingCost(0)}
                  />
                  Free Shipping / 10-12 Business Days: $0.00
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="40"
                    checked={shippingCost === 40}
                    onChange={() => setShippingCost(40)}
                  />
                  Expedited / 5-8 Business Days: $40.00
                </label>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-3 border-t border-gray-300" />

            {/* Final Total */}
            <div className="flex justify-between text-base font-semibold">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
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

      {/* Related Products */}
      <div className="mx-1 md:mx-20 lg:mx-48">
        <RelatedProducts />
      </div>
    </div>
  );
};

export default Cart;
