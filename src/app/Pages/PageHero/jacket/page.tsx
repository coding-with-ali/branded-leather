
"use client";
import ProductSection from "../../../componets/ProductSection"; // Adjust the path if needed
import NewCollectionBanner from "../../../componets/NewCollectionBanner";
import Question from "../../HomePage/Question"
import Featured from "@/app/componets/featured";

export default function Heritage() {

  return (
    <div className="bg-white px-4">
       <NewCollectionBanner />

      <Featured />
        

      {/* ✅ Inject ProductSection and pass the query */}
      <ProductSection category="jacket" />
      <Question/> 
    </div>
  );
}