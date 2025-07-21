"use client";
import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

function Notification({
  product,
  onAddToCart,
}: {
  product: { _id: string; name: string; quantity: number, image:string };
  onAddToCart: () => void;
}) {
  const handleAdd = () => {
    onAddToCart(); // Redux action ko trigger karega
    toast.success(`${product.name} added to cart successfully!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="inline-block bg-[#99582a] text-white px-6 py-3 rounded-lg mt-4 transition"
      >
        Add To Cart
      </button>
      <ToastContainer />
    </div>
  );
}

export default Notification;
