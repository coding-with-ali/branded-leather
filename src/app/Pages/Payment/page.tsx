// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import StripeCheckoutForm from "@/app/componets/StripeCheckoutForm"; // adjust if needed

// // const PaymentPage = () => {
// //   const router = useRouter();
// //   const [orderData, setOrderData] = useState<any>(null);
// //   const [amount, setAmount] = useState<number>(0);

// //   useEffect(() => {
// //     const storedOrder = sessionStorage.getItem("checkoutOrderData");
// //     if (storedOrder) {
// //       const parsed = JSON.parse(storedOrder);
// //       setOrderData(parsed);
// //       setAmount(parsed.totalPrice);
// //     } else {
// //       // if no data found, go back to checkout
// //       router.push("/Pages/Checkout");
// //     }
// //   }, [router]);

// //   if (!orderData) return <div className="p-6">Loading...</div>;

// //   return (
// //     <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
// //       <h1 className="text-2xl font-bold mb-4">Secure Payment</h1>
// //       <StripeCheckoutForm
// //         amount={amount}
// //         orderData={orderData}
// //         onSuccess={() => {
// //           alert("Order placed successfully!");
// //           sessionStorage.removeItem("cartItems");
// //           sessionStorage.removeItem("checkoutOrderData");
// //           router.push("/Pages/Order");
// //         }}
// //       />
// //     </div>
// //   );
// // };

// // export default PaymentPage;




// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import StripeCheckoutForm from "@/app/componets/StripeCheckoutForm";
// import { FaLock, FaCcVisa, FaCcMastercard, FaCcStripe } from "react-icons/fa";
// import Image from "next/image";

// const PaymentPage = () => {
//   const router = useRouter();
//   const [orderData, setOrderData] = useState<any>(null);
//   const [amount, setAmount] = useState<number>(0);

//   useEffect(() => {
//     const storedOrder = sessionStorage.getItem("checkoutOrderData");
//     if (storedOrder) {
//       const parsed = JSON.parse(storedOrder);
//       setOrderData(parsed);
//       setAmount(parsed.totalPrice);
//     } else {
//       router.push("/Pages/Checkout");
//     }
//   }, [router]);

//   if (!orderData) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//         {/* Product Images */}
//         <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
//           {orderData.products?.slice(0, 4).map((item: any, index: number) => (
//             <div key={index} className="relative w-full aspect-square border rounded-xl overflow-hidden">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Payment Info */}
//         <div className="w-full md:w-1/2">
//           <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
//             <FaLock className="text-green-600" /> Secure Payment
//           </h1>

//           <p className="text-gray-600 mb-2 text-sm">
//             You're purchasing:
//           </p>
//           <ul className="text-sm text-gray-800 list-disc pl-5 mb-4">
//             {orderData.products?.map((item: any, idx: number) => (
//               <li key={idx}>{item.name} x {item.quantity}</li>
//             ))}
//           </ul>

//           <p className="text-lg font-semibold text-black mb-4">
//             Total: ${amount.toFixed(2)}
//           </p>

//           <StripeCheckoutForm
//             amount={amount}
//             orderData={orderData}
//             onSuccess={() => {
//               alert("Order placed successfully!");
//               sessionStorage.removeItem("cartItems");
//               sessionStorage.removeItem("checkoutOrderData");
//               router.push("/Pages/Order");
//             }}
//           />

//           <div className="flex items-center justify-center gap-3 mt-6 text-gray-500 text-sm">
//             <FaCcVisa className="text-blue-700 text-2xl" />
//             <FaCcMastercard className="text-red-600 text-2xl" />
//             <FaCcStripe className="text-purple-600 text-2xl" />
//             <span>All major cards accepted</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



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
