"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartslice"; // 👈 apna slice ka path check kar lena

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Page load hone ke baad localStorage se cart load karo
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  return <>{children}</>;
}
