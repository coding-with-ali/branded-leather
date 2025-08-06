"use client";
import ProductSection from "../../../../componets/ProductSection"; // Adjust the path if needed
import Image from "next/image";
import Question from "../../../HomePage/Question";
import Featured from "@/app/componets/featured";
import MenLeatherJacketSection from "../../../../componets/MenLeatherJacketSection";

export default function MotorcycleJacket() {
  return (
    <div className="bg-[#fdf7ee] px-4">
       <div className=" w-full flex justify-center ">
                  <Image
                    src="/banner/biker-leather.webp"
                    alt="New Collection Jacket"
                    width={900}
                    height={900}
                    className="object-contain w-[90vw] lg:w-[70vw] h-auto"
                    priority
                  />
                </div>
      <Featured />
      <ProductSection category="Men Motorcycle Jacket" />
      <Question className="bg-[#fdf7ee]" /> 
      <MenLeatherJacketSection />
    </div>
  );
}
