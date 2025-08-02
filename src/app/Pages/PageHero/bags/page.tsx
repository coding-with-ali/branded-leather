"use client";
import ProductSection from "../../../componets/ProductSection"; // Adjust the path if needed
import NewCollectionBanner from "../../../componets/NewCollectionBanner";
import Question from "../../HomePage/Question";
import Featured from "@/app/componets/featured";
import MenLeatherJacketSection from "../../../componets/MenLeatherJacketSection";
import Image from "next/image";

export default function Heritage() {
  return (
    <div className="bg-[#fdf7ee] px-4">
      <div className=" w-full flex justify-center">
            <Image
              src="/leather-bags.webp"
              alt="New Collection Jacket"
              width={900}
              height={900}
              className="object-contain w-[90vw] h-auto"
              priority
            />
          </div>
      <Featured />
      <ProductSection category="bag" />
      <Question className="bg-[#fdf7ee]" /> 
      <MenLeatherJacketSection />
    </div>
  );
}
