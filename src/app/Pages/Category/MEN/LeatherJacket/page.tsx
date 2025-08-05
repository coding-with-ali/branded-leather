"use client";
import ProductSection from "../../../../componets/ProductSection"; // Adjust the path if needed
import NewCollectionBanner from "../../../../componets/NewCollectionBanner";
import Question from "../../../HomePage/Question";
import Featured from "@/app/componets/featured";
import MenLeatherJacketSection from "../../../../componets/MenLeatherJacketSection";

export default function LeatherJacket() {
  return (
    <div className="bg-[#fdf7ee] px-4">
      <NewCollectionBanner />
      <Featured />
      <ProductSection category="jacket" />
      <Question className="bg-[#fdf7ee]" /> 
      <MenLeatherJacketSection />
    </div>
  );
}
