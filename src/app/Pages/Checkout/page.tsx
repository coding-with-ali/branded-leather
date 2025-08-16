
// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import { urlFor } from "@/sanity/lib/image";

// // interface CartItem {
// //   _id: string;
// //   name: string;
// //   price: number;
// //   image: string;
// //   quantity: number;
// //   size?: string;
// // }

// // const CheckoutPage = () => {
// //   const router = useRouter();
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
// //   const [email, setEmail] = useState("");
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [state, setState] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [city, setCity] = useState("");
// //   const [postalCode, setPostalCode] = useState("");

// //   useEffect(() => {
// //     const storedCart = sessionStorage.getItem("cartItems");
// //     if (storedCart) {
// //       setCartItems(JSON.parse(storedCart));
// //     } else {
// //       router.push("/Pages/Cart");
// //     }
// //   }, [router]);

// //   const subtotal = cartItems.reduce(
// //     (acc, item) => acc + item.price * item.quantity,
// //     0
// //   );

// //   const orderData = {
// //     customerName: `${firstName} ${lastName}`,
// //     email,
// //     phone,
// //     state,
// //     address,
// //     city,
// //     postalCode,
// //     products: cartItems.map((item) => ({
// //       _type: "product",
// //       _ref: item._id,
// //       id: item._id,
// //       name: item.name,
// //       price: item.price,
// //       quantity: item.quantity,
// //       size: item.size,
// //       image: item.image,
// //     })),
// //     totalPrice: subtotal,
// //     status: "pending",
// //     orderDate: new Date().toISOString(),
// //   };

// //   const handleContinue = () => {
// //     sessionStorage.setItem("checkoutOrderData", JSON.stringify(orderData));
// //     router.push("/Pages/Payment");
// //   };

// //   return (
// //     <div className="bg-[#fdf7ee] min-h-screen py-10 px-4 md:px-10">
// //       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
// //         {/* Left Form Section */}
// //         <div className="flex-1 bg-white p-6 rounded-md shadow border">
// //           <h2 className="text-[18px] font-bold font-sans mb-6 border-b pb-2 uppercase">Contact Information</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <h2 className="text-[15px] font-bold font-sans">Email Address *</h2>
// //             <input
// //               type="email"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //             />
// //           </div>

// //           <h2 className="text-[18px] font-bold font-sans mb-6 border-b pb-2 uppercase">Shipping To</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <h2 className="text-[15px] font-bold font-sans">First Name *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={firstName}
// //               onChange={(e) => setFirstName(e.target.value)}
// //             />
// //             <h2 className="text-[15px] font-bold font-sans">Last Name *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={lastName}
// //               onChange={(e) => setLastName(e.target.value)}
// //             />
// //             <h2 className="text-[15px] font-bold font-sans">Phone *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //             />
// //             <h2 className="text-[15px] font-bold font-sans">Street Address *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={address}
// //               onChange={(e) => setAddress(e.target.value)}
// //             />
// //             <h2 className="text-[15px] font-bold font-sans">City *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={city}
// //               onChange={(e) => setCity(e.target.value)}
// //             />
// //             <h2 className="text-[15px] font-bold font-sans">State *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={state}
// //               onChange={(e) => setState(e.target.value)}
// //             />
// //             <h2 className="text-[15px] font-bold font-sans">Postal Code/Zip *</h2>
// //             <input
// //               type="text"
// //               placeholder=""
// //               className="border p-3 rounded w-full md:col-span-2"
// //               value={postalCode}
// //               onChange={(e) => setPostalCode(e.target.value)}
// //             />
// //           </div>

// //           {/* Continue to Payment */}
// //           {email && firstName && lastName && phone && state && address && city && postalCode && cartItems.length > 0 && (
// //             <button
// //               onClick={handleContinue}
// //               className="mt-8 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
// //             >
// //               Continue to Payment
// //             </button>
// //           )}
// //         </div>

// //         {/* Right Order Summary Section */}
// //         <div className="w-full md:w-[400px] bg-white p-6 rounded-md shadow border">
// //           <h2 className="text-2xl font-bold mb-6 border-b pb-2">Order Summary</h2>
// //           <div className="space-y-4">
// //             {cartItems.map((item) => (
// //               <div key={item._id} className="flex gap-4 items-start">
// //                 <Image
// //                   src={urlFor(item.image).url()}
// //                   alt={item.name}
// //                   width={80}
// //                   height={80}
// //                   className="rounded-md border"
// //                 />
// //                 <div className="flex-1">
// //                   <h3 className="font-semibold text-[15px]">{item.name}</h3>
// //                   <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
// //                   <p className="text-sm text-gray-600">Size: {item.size}</p>
// //                   <p className="text-sm text-gray-800 font-medium">
// //                     Total: ${(item.price * item.quantity).toFixed(2)}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="mt-6 text-lg font-semibold flex justify-between border-t pt-4">
// //             <span>Subtotal:</span>
// //             <span>${subtotal.toFixed(2)}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;





// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   size?: string;
// }

// const CheckoutPage = () => {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [state, setState] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [shipping, setShipping] = useState(0);

//   useEffect(() => {
//     const storedCart = sessionStorage.getItem("cartItems");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     } else {
//       router.push("/Pages/Cart");
//     }
//   }, [router]);

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const total = subtotal + shipping;

//   const orderData = {
//     customerName: `${firstName} ${lastName}`,
//     email,
//     phone,
//     state,
//     address,
//     city,
//     postalCode,
//     shipping,
//     products: cartItems.map((item) => ({
//       _type: "product",
//       _ref: item._id,
//       id: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       size: item.size,
//       image: item.image,
//     })),
//     totalPrice: total,
//     status: "pending",
//     orderDate: new Date().toISOString(),
//   };

//   const handleContinue = () => {
//     sessionStorage.setItem("checkoutOrderData", JSON.stringify(orderData));
//     router.push("/Pages/Payment");
//   };

//   return (
//     <div className="bg-[#f9f9f9] min-h-screen py-10 px-4 md:px-10 font-sans">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
//         {/* Left Form Section */}
//         <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border">
//           <h2 className="text-xl font-bold mb-6 border-b pb-3 uppercase tracking-wide text-gray-800">
//             Contact Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <input
//               type="email"
//               placeholder="Email Address *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="First Name *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Last Name *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Phone *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Street Address *"
//               className="border p-3 rounded-md w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="City *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="State *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Postal Code *"
//               className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
//               value={postalCode}
//               onChange={(e) => setPostalCode(e.target.value)}
//             />
//           </div>

//           {/* Note for seller */}
//           <textarea
//             placeholder="Order Notes (optional)"
//             className="border p-3 rounded-md w-full mt-5 h-24 focus:outline-none focus:ring-2 focus:ring-black"
//           ></textarea>

//           {/* Continue to Payment */}
//           {email &&
//             firstName &&
//             lastName &&
//             phone &&
//             state &&
//             address &&
//             city &&
//             postalCode &&
//             cartItems.length > 0 && (
//               <button
//                 onClick={handleContinue}
//                 className="mt-8 w-full bg-black text-white py-4 rounded-md hover:bg-gray-900 transition text-lg font-semibold"
//               >
//                 Continue to Payment
//               </button>
//             )}
//         </div>

//         {/* Right Order Summary Section */}
//         <div className="w-full md:w-[420px] bg-white p-8 rounded-2xl shadow-lg border">
//           <h2 className="text-xl font-bold mb-6 border-b pb-3 uppercase tracking-wide text-gray-800">
//             Order Summary
//           </h2>

//           <div className="space-y-5">
//             {cartItems.map((item) => (
//               <div key={item._id} className="flex gap-4 items-start border-b pb-4">
//                 <Image
//                   src={urlFor(item.image).url()}
//                   alt={item.name}
//                   width={80}
//                   height={80}
//                   className="rounded-md border"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-[15px] text-gray-900">{item.name}</h3>
//                   <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                   {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
//                   <p className="text-sm text-gray-800 font-medium">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Shipping Options */}
//           <div className="mt-6">
//             <h3 className="font-semibold mb-3">Shipping Method</h3>
//             <div className="space-y-3">
//               <label className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   name="shipping"
//                   checked={shipping === 0}
//                   onChange={() => setShipping(0)}
//                 />
//                 <span className="text-gray-700">Free Shipping (10-12 Business Days) — $0.00</span>
//               </label>
//               <label className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   name="shipping"
//                   checked={shipping === 40}
//                   onChange={() => setShipping(40)}
//                 />
//                 <span className="text-gray-700">Expedited (5-8 Business Days) — $40.00</span>
//               </label>
//             </div>
//           </div>

//           {/* Summary Totals */}
//           <div className="mt-6 space-y-3 border-t pt-4 text-lg font-medium">
//             <div className="flex justify-between">
//               <span>Subtotal:</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping:</span>
//               <span>${shipping.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-xl text-gray-900">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;



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

const countries = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "United Arab Emirates",
  "Saudi Arabia",
  "Turkey",
  "Italy",
  "Spain",
  "Brazil",
  "South Africa",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Other",
];

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
  const [country, setCountry] = useState("Pakistan");
  const [shipping, setShipping] = useState(0);
  const [sameAsShipping, setSameAsShipping] = useState(true);

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

  const total = subtotal + shipping;

  const orderData = {
    customerName: `${firstName} ${lastName}`,
    email,
    phone,
    state,
    address,
    city,
    postalCode,
    country,
    shipping,
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
    totalPrice: total,
    status: "pending",
    orderDate: new Date().toISOString(),
  };

  const handleContinue = () => {
    sessionStorage.setItem("checkoutOrderData", JSON.stringify(orderData));
    router.push("/Pages/Payment");
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen py-10 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Form Section */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 uppercase tracking-wide text-gray-800">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="email"
              placeholder="Email Address *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="First Name *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Country Dropdown */}
            <select
              className="border p-3 rounded-md w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Street Address *"
              className="border p-3 rounded-md w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="City *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="text"
              placeholder="State *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

            <input
              type="text"
              placeholder="Postal Code *"
              className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Billing Section */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-3">Billing Address</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={() => setSameAsShipping(!sameAsShipping)}
              />
              <span>Same as shipping address</span>
            </label>
          </div>

          {/* Note for seller */}
          <textarea
            placeholder="Order Notes (optional)"
            className="border p-3 rounded-md w-full mt-5 h-24 focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>

          {/* Continue to Payment */}
          {email &&
            firstName &&
            lastName &&
            phone &&
            state &&
            address &&
            city &&
            postalCode &&
            cartItems.length > 0 && (
              <button
                onClick={handleContinue}
                className="mt-8 w-full bg-black text-white py-4 rounded-md hover:bg-gray-900 transition text-lg font-semibold"
              >
                Continue to Payment
              </button>
            )}
        </div>

        {/* Right Order Summary Section */}
        <div className="w-full md:w-[420px] bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 uppercase tracking-wide text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 items-start border-b pb-4">
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[15px] text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  {item.size && (
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-gray-800 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Options */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Shipping Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 0}
                  onChange={() => setShipping(0)}
                />
                <span className="text-gray-700">
                  Free Shipping (10-12 Business Days) — $0.00
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 40}
                  onChange={() => setShipping(40)}
                />
                <span className="text-gray-700">
                  Expedited (5-8 Business Days) — $40.00
                </span>
              </label>
            </div>
          </div>

          {/* Summary Totals */}
          <div className="mt-6 space-y-3 border-t pt-4 text-lg font-medium">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
