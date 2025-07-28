
"use client";

import { useSearchParams } from "next/navigation";
import ProductSection from "../componets/ProductSection"; // Adjust the path if needed
import NewCollectionBanner from "../componets/NewCollectionBanner";
import Question from "../Pages/HomePage/Question"
import Featured from "../componets/featured";
import LiveSearch from "../componets/LiveSearch";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <div className="bg-[#fdf7ee] p-4">
       <NewCollectionBanner />
       <Featured/>
      {/* ✅ Inject ProductSection and pass the query */}
      <ProductSection searchQuery={query} />
      <Question/> 
    </div>
  );
}
