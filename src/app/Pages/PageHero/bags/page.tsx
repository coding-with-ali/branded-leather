
"use client";
import ProductSection from "../../../componets/ProductSection"; // Adjust the path if needed
import NewCollectionBanner from "../../../componets/NewCollectionBanner";
import Question from "../../HomePage/Question"

export default function Heritage() {

  return (
    <div className="bg-white px-4">
       <NewCollectionBanner />

      {/* ✅ Inject ProductSection and pass the query */}
      <ProductSection category="bag" />
      <Question/> 
    </div>
  );
}